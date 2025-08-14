import { useSelector, useDispatch } from "react-redux";
import { setId } from "../features/walletAddress/web3WalletInfo";
import { setUserData } from "../features/dashboardData/dashboardDataInfo";
import Footer from "../component/Footer";
import { useEffect, useState } from "react";
import DashboardFirstTop from "../component/DashboardFirstTop";
import DashboardFirstBottom from "../component/DashboardFirstBottom";
import DashboardDataDisplayLeft from "../component/DashboardDataDisplayLeft";
import DashboardDataDisplayRight from "../component/DashboardDataDisplayRight";
import Web3 from "web3";
import abi from "../abi.json";
import abiOne from "../oldAbiOne.json";
import abiTwo from "../oldAbiTwo.json";
import logsAbi from "../logsAbi.json";
import OptionalTopDiv from "../component/OptionalTopDiv";
import mainAbi from "../mainAbi.json";
import bannerSrc from "../assets/gifs/book-slide.gif";
import Package from "../component/Package";
import axios from "axios";
import { useNavigate } from "react-router";

function Dashboard({ openSidebar }) {
  const [dashboardData, setDashboardData] = useState({});
  const [usersData, setUsersData] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const txtypes = [
    "partnerSponsorBonus",
    "PartnerDirectKickBonusPercent",
    "PartnerLevelBonus",
    "PartnerPoolBonus",
    "luxuryBonus",
  ];

  const walletAddress = useSelector(
    (state) => state.accountDetails.walletAddress
  );
  const backupAddress = useSelector(
    (state) => state.accountDetails.saveMainUserAddress
  );
  const logsContractAddress = useSelector(
    (state) => state.accountDetails.logsContractAddress
  );
  const mainContractAddress = useSelector(
    (state) => state.accountDetails.mainContractAddress
  );
  const contractAddress = useSelector(
    (state) => state.accountDetails.contractAddress
  );
  const previousContractAddressOne = useSelector(
    (state) => state.accountDetails.previousContractAddressOne
  );
  const previousContractAddressTwo = useSelector(
    (state) => state.accountDetails.previousContractAddressTwo
  );
  const isWalletConnected = useSelector(
    (state) => state.accountDetails.isWalletConnected
  );
  const baseUrl = useSelector((state) => state.accountDetails.baseUrl);

  async function getData() {
    try {
      const userFormData = new FormData();
      userFormData.append("action", "get_user_info");
      userFormData.append("original_wallet_address", walletAddress);

      const userResponse = await axios.post(
        `${baseUrl}api/get-user-data`,
        userFormData
      );

      setUsersData(userResponse.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, [walletAddress]);
  async function getWalletAddressDetails() {
    try {
      const web3 = new Web3("https://opbnb-mainnet-rpc.bnbchain.org");

      const contracts = [
        { abi: mainAbi, address: mainContractAddress },
        { abi, address: contractAddress },
        { abi: abiOne, address: previousContractAddressOne },
        { abi: abiTwo, address: previousContractAddressTwo },
      ];

      if (!web3.utils.isAddress(walletAddress)) {
        console.log("Invalid Ethereum address.");
        return;
      }

      // Initialize contract instances
      const contractInstances = contracts.map(
        (c) => new web3.eth.Contract(c.abi, c.address)
      );

      // Check user existence in any contract
      const userExists = await Promise.all(
        contractInstances.map((c) =>
          c.methods.isUserExists(walletAddress).call()
        )
      );

      if (!userExists.some((exists) => exists)) {
        return;
      }

      // Fetch user/income details from all contracts
      const [userDetailMain, ...incomeResults] = await Promise.allSettled([
        contractInstances[0].methods.users(walletAddress).call(),
        ...contractInstances.map((c) =>
          c.methods.user_details(walletAddress).call()
        ),
      ]);

      // Function to safely parse a single contract's income detail
      const parseIncomeData = (data) => {
        if (data.status !== "fulfilled")
          return {
            totalIncome: 0,
            LuxuryBonus: 0,
            partnerSponsorBonus: 0,
            partnerDirectKickBonus: 0,
            partnerLevelBonus: 0,
            PoolLevelIncome: 0,
            myTeamCount: 0,
            lapsIncome: 0,
          };

        const val = data.value;
        const fromWei = (amount) =>
          parseFloat(Web3.utils.fromWei(amount || "0", "ether"));

        return {
          totalIncome: fromWei(val.totalIncome),
          LuxuryBonus: fromWei(val.LuxuryBonus),
          partnerSponsorBonus: fromWei(val.partnerSponsorBonus),
          partnerDirectKickBonus: fromWei(val.partnerDirectKickBonus),
          partnerLevelBonus: fromWei(val.partnerLevelBonus),
          PoolLevelIncome: fromWei(val.PoolLevelIncome),
          lapsIncome: fromWei(val.lapsIncome),
          myTeamCount: parseInt(val.myTeamCount || 0),
        };
      };

      // Accumulate all incomes
      const totals = {
        totalIncome: 0,
        LuxuryBonus: 0,
        partnerSponsorBonus: 0,
        partnerDirectKickBonus: 0,
        partnerLevelBonus: 0,
        PoolLevelIncome: 0,
        myTeamCount: 0,
        lapsIncome: 0,
      };

      for (const incomeData of incomeResults) {
        const parsed = parseIncomeData(incomeData);
        for (const key in totals) {
          totals[key] += parsed[key];
        }
      }

      const overAllTotal = (totals.totalIncome + totals.LuxuryBonus).toFixed(5);

      // Fetch BNB price in USD
      const bnbPriceRes = await fetch(
        "https://min-api.cryptocompare.com/data/price?fsym=BNB&tsyms=USD"
      );
      const bnbPriceData = await bnbPriceRes.json();
      const bnbPriceUSD = bnbPriceData?.USD || 0;
      // console.log(bnbPriceUSD);

      const incomeInUSD = (overAllTotal * bnbPriceUSD).toFixed(5);

      const userMain =
        userDetailMain.status === "fulfilled" ? userDetailMain.value : {};

      // console.log("userMain", userMain);
      const mainIncomeData = incomeResults[0];
      // console.log(
      //   "mainIncomeData",
      //   incomeResults[1],
      //   incomeResults[2],
      //   incomeResults[3]
      // );

      const logsContract = new web3.eth.Contract(logsAbi, logsContractAddress);

      const logs = await Promise.all(
        txtypes.map((type) =>
          logsContract.methods
            .getTodayTransactionLogByType(walletAddress, type)
            .call()
        )
      );
      // console.log("Logs:", logs);

      const todayValue = logs.map((value) =>
        parseFloat(web3.utils.fromWei(value[0], "ether")).toFixed(4)
      );
      // console.log({ todayValue });

      const todayEarningInBnb = logs.reduce((acc, item) => {
        const ethValue = parseFloat(web3.utils.fromWei(item[0], "ether"));
        return acc + ethValue;
      }, 0);

      const todayEarningInDollor = (todayEarningInBnb * bnbPriceUSD).toFixed(4);
      // console.log(todayEarningInDollor);

      const referrerId = await contractInstances[0].methods
        .users(userMain.referrer)
        .call();

      // console.log(referrerId);
      return {
        id: userMain.id,
        referrer: referrerId.id.toString(),
        totalIncomeInBNB: overAllTotal,
        incomeInUSD,
        totalLuxuryBonus: totals.LuxuryBonus.toFixed(5),
        totalPartnerSponsorBonus: totals.partnerSponsorBonus.toFixed(5),
        totalPartnerDirectKickBonus: totals.partnerDirectKickBonus.toFixed(5),
        totalPartnerLevelBonus: totals.partnerLevelBonus.toFixed(5),
        totalPoolLevelIncome: totals.PoolLevelIncome.toFixed(5),
        totaLapsIncome: totals.lapsIncome.toFixed(5),
        rank: userMain.currentPackage,
        myDirectPartner: userMain.partnercount,
        myNetworkPartner: mainIncomeData.value.myTeamCount.toString(),
        todayEarningInBnb: todayEarningInBnb.toFixed(4),
        todayEarningInDollor,
        todayPartnerSponsorBonus: todayValue[0],
        todayPartnerDirectKickBonusPercent: todayValue[1],
        todayPartnerLevelBonus: todayValue[2],
        todayPartnerPoolBonus: todayValue[3],
        todayLuxuryBonus: todayValue[4],
      };
    } catch (error) {
      console.error("Error fetching wallet details:", error);
    }
  }

  useEffect(() => {
    if (window.ethereum && isWalletConnected) {
      // console.log("i am here");
      getWalletAddressDetails().then((data) => {
        // console.log(data);
        if (!data) return;
        // console.log(data);
        setDashboardData(data);
        dispatch(setId(Number(data.id)));
        sessionStorage.setItem("id", Number(data.id));
        const dashboardData = {
          ...data,
          id: data.id.toString(),
          myDirectPartner: data.myDirectPartner.toString(),
          rank: data.rank.toString(),
          myNetworkPartner: data.myNetworkPartner.toString(),
        };

        dispatch(setUserData(dashboardData));
        sessionStorage.setItem("dashboardData", JSON.stringify(dashboardData));
        // console.log(data);
      });
    }
  }, [walletAddress]);

  return (
    <div
      className={`absolute inset-0 overflow-x-hidden  backdrop-blur-[1px] ${
        walletAddress == backupAddress ? "bg-black/60" : "bg-[#490D0D]/80"
      }  flex justify-center sm:py-4 ${openSidebar && "lg:pr-10 xl:pr-30"}`}
    >
      <div
        className={`${
          openSidebar ? "w-[90%] lg:w-full" : "w-[90%] lg:w-[80%]"
        } flex flex-col sm:px-5 max-w-[1320px] `}
      >
        <div className="flex-1 flex flex-col gap-3">
          <OptionalTopDiv css="flex justify-between items-center lg:hidden px-1 sm:px-3 py-2" />
          {/* first div */}
          <div className="flex flex-col gap-3">
            {/* top */}
            <DashboardFirstTop
              usersData={usersData}
              walletAddress={walletAddress}
              id={dashboardData.id}
              referer={dashboardData.referrer}
            />
            {/* bottom */}
            <DashboardFirstBottom
              totalIncomeInBNB={dashboardData.totalIncomeInBNB}
              incomeInUSD={dashboardData.incomeInUSD}
              todayEarningInDollor={dashboardData.todayEarningInDollor}
              todayEarningInBNB={dashboardData.todayEarningInBnb}
            />
          </div>

          {/* second div */}
          <div
            className={`flex flex-wrap flex-col ${
              openSidebar ? "2xl:flex-row" : "lg:flex-row"
            } gap-3`}
          >
            <DashboardDataDisplayLeft />
            <DashboardDataDisplayRight
              luxuryBonus={dashboardData.totalLuxuryBonus}
              lapsIncome={dashboardData.totaLapsIncome}
            />
          </div>

          {/* third div */}
          <div
            onClick={() => navigate("/cryptocluster")}
            className="border-2 cursor-pointer self-center w-full rounded-xl border-white/50 overflow-hidden"
          >
            <img className="h-24 lg:h-34 w-full" src={bannerSrc} />
          </div>

          {/* fourth div */}
          <Package />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
