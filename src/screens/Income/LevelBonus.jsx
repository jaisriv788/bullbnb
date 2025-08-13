import Footer from "../../component/Footer";
import Title from "../../component/Title";
import solidLogoSrc from "../../assets/bnbLogo/circle.png";
import { useState, useEffect } from "react";
import { screenLoaderVisibilty } from "../../features/copyModal/copyModalVisiblilty";
import { useSelector, useDispatch } from "react-redux";
import abiOne from "../../oldAbiOne.json";
import abiTwo from "../../oldAbiTwo.json";
import mainAbi from "../../mainAbi.json";
import Web3 from "web3";

function LevelBonus({ openSidebar }) {
  const [data, setData] = useState([]);
  const [levelWiseUser, setLevelWiseUsers] = useState([]);
  const [levelWiseIncome, setLevelWiseIncome] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const dispatch = useDispatch();

  const walletAddress = useSelector(
    (state) => state.accountDetails.saveMainUserAddress
  );
  const CurrentWalletAddress = useSelector(
    (state) => state.accountDetails.walletAddress
  );
  const mainContractAddress = useSelector(
    (state) => state.accountDetails.mainContractAddress
  );
  const previousContractAddressOne = useSelector(
    (state) => state.accountDetails.previousContractAddressOne
  );
  const previousContractAddressTwo = useSelector(
    (state) => state.accountDetails.previousContractAddressTwo
  );

  const fetchData = async () => {
    try {
      dispatch(screenLoaderVisibilty(true));

      const web3 = new Web3("https://opbnb-mainnet-rpc.bnbchain.org");

      if (!web3.utils.isAddress(CurrentWalletAddress)) {
        console.warn("Invalid Ethereum address.");
        dispatch(screenLoaderVisibilty(false));
        return;
      }

      const contracts = [
        { abi: mainAbi, address: mainContractAddress },
        { abi: abiOne, address: previousContractAddressOne },
        { abi: abiTwo, address: previousContractAddressTwo },
      ];

      const contractInstances = contracts.map(
        ({ abi, address }) => new web3.eth.Contract(abi, address)
      );

      const settledResponses = await Promise.allSettled(
        contractInstances.map((contract) =>
          contract.methods.levelWiseUsers(CurrentWalletAddress).call()
        )
      );

      const firstValidResponse = settledResponses.find(
        (res) => res.status === "fulfilled"
      );

      const levelUserArray = firstValidResponse?.value?.["0"] || [];
      setLevelWiseUsers(levelUserArray);
      console.log(levelUserArray);

      const totalUsers = levelUserArray
        .slice(1)
        .reduce((acc, val) => acc + Number(val || 0), 0);
      setTotalUsers(totalUsers);

      const incomeArrays = settledResponses.map((res) =>
        res.status === "fulfilled" ? res.value?.["1"] || [] : []
      );

      const combinedIncome = [];

      for (const incomeArr of incomeArrays) {
        incomeArr.forEach((val, i) => {
          combinedIncome[i] = (combinedIncome[i] || 0n) + BigInt(val || 0);
        });
      }

      const incomeInEther = combinedIncome.map((val) =>
        web3.utils.fromWei(val.toString(), "ether")
      );
      setLevelWiseIncome(incomeInEther);

      const totalIncome = incomeInEther.slice(1).reduce((acc, val) => {
        return acc + (parseFloat(val) || 0);
      }, 0);
      setData(totalIncome);
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
    } finally {
      dispatch(screenLoaderVisibilty(false));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className={`absolute inset-0 overflow-auto backdrop-blur-[1px] ${
        walletAddress == CurrentWalletAddress
          ? "bg-black/60"
          : "bg-[#490D0D]/80"
      }  flex justify-center sm:p-4`}
    >
      {" "}
      <div
        className={`${
          openSidebar ? "w-[90%] lg:w-full" : "w-[90%] lg:w-[80%]"
        } flex flex-col`}
      >
        <Title title="Partner Level Bonus" />
        <div className=" flex-1 flex flex-col gap-5">
          <div className="flex gap-1 bg-gradient-to-r from-transparent font-bold via-[#B06F03] to-transparent w-full justify-center items-center">
            <div>
              <img className="h-10 w-10" src={solidLogoSrc} />
            </div>
            <div className="flex flex-col text-center">
              <span className="text-sm">Total Earning</span>
              <span className="text-xl">{data} BNB</span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-box border border-white/40">
            <table className="table border-collapse">
              <thead className="bg-gradient-to-r text-white from-[#E08208] via-[#BD4616] to-[#A6201E]">
                <tr>
                  <th className="border border-white/50 w-1/6 min-w-[150px] text-center px-2 py-1">
                    Level
                  </th>
                  <th className="border border-white/50 w-1/6 min-w-[150px] text-center px-2 py-1">
                    Partner
                  </th>
                  <th className="border border-white/50 text-center px-2 py-1">
                    Income
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gradient-to-r from-white/20 via-white/10 to-white/20">
                {Array.from({ length: 14 }).map((_, index) => (
                  <tr key={index}>
                    <td className="border border-white/50 text-center px-2 py-1">
                      {index + 1}
                    </td>
                    <td className="border border-white/50 text-center px-2 py-1">
                      {levelWiseUser[index]}
                    </td>
                    <td className="border border-white/50 text-center px-2 py-1">
                      {Number(levelWiseIncome[index]).toFixed(4)} BNB
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="border border-white/50 text-center font-semibold px-2 py-1">
                    Total
                  </td>
                  <td className="border border-white/50 text-center font-semibold px-2 py-1">
                    {totalUsers}
                  </td>
                  <td className="border border-white/50 text-center font-semibold px-2 py-1">
                    {data} BNB
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-sm font-light text-center">
            To qualify for this bonus: Executive and above rank holder, must
            have two direct referrals. <br />
            Please note that the Partner Level Bonus is only applicable to
            communities within your current rank level or lower rank level. For
            instance, a Pioneer will earn the level bonus from Pioneer-level
            communities and lower.
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default LevelBonus;
