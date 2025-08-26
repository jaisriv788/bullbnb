import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import mainAbi from "../../mainAbi.json";
import Web3 from "web3";
import teamSrc from "../../assets/bnbLogo/my-team.png";
import Footer from "../../component/Footer";
import { screenLoaderVisibilty } from "../../features/copyModal/copyModalVisiblilty";
import axios from "axios";

const packages = [
  { label: "", amount: "" },
  { label: "STARTER", amount: "0.0080" },
  { label: "EXECUTIVE", amount: "0.01" },
  { label: "ACHIEVER", amount: "0.02" },
  { label: "POINEER", amount: "0.04" },
  { label: "DIRECTOR", amount: "0.08" },
  { label: "STAR", amount: "0.16" },
  { label: "CHAMPION", amount: "0.32" },
  { label: "MENTOR", amount: "0.64" },
  { label: "TITAN", amount: "1.28" },
  { label: "PLATINUM", amount: "2.56" },
  { label: "DIAMOND", amount: "5.12" },
  { label: "ICON", amount: "10.28" },
  { label: "LEGEND", amount: "20.48" },
  { label: "AMBASSADOR", amount: "40.36" },
  { label: "PRESIDENT", amount: "81.92" },
];

function AdminDashboard({ openSidebar }) {
  const [users, setUsers] = useState(0);
  const [usersCount, setUsersCount] = useState(null);
  const [lastSevenDaysUsers, setLastSevenDaysUsers] = useState(0);
  const [lastThirtyDaysUsers, setLastThirtyDaysUsers] = useState(0);

  const dispatch = useDispatch();

  const mainContract = useSelector(
    (state) => state.accountDetails.mainContractAddress
  );
  const baseUrl = useSelector((state) => state.accountDetails.baseUrl);
  const walletAddress = useSelector(
    (state) => state.accountDetails.walletAddress
  );

  async function getData() {
    try {
      const sessionData = sessionStorage.getItem("package_data");
      // console.log(sessionData);
      dispatch(screenLoaderVisibilty(true));
      const web3 = new Web3("https://opbnb-mainnet-rpc.bnbchain.org");

      if (!web3.utils.isAddress(walletAddress)) {
        console.log("Invalid Ethereum address.");
        return;
      }
      let package_data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
      const contract = new web3.eth.Contract(mainAbi, mainContract);

      const totalUsers = await contract.methods.totalUsers().call();
      setUsers(parseInt(totalUsers) + 1);

      if (!sessionData) {
        const levelCalls = Array.from({ length: 32 }, (_, i) =>
          contract.methods
            .getLevelWiseUsers(
              "0x5289CA577B00E87c72671a55Ce9A4D141E2F63a2",
              i + 1
            )
            .call()
            .catch(() => null)
        );

        const results = await Promise.all(levelCalls);

        const allUsers = results.filter(
          (res) => Array.isArray(res) && res.length > 0
        );

        const allMergedUsers = allUsers.flat();

        for (let i = 0; i < allMergedUsers.length; i++) {
          package_data[allMergedUsers[i][0][6]]++;
        }
        sessionStorage.setItem("package_data", package_data);
        setUsersCount(package_data);
        // console.log(typeof package_data);
      } else {
        setUsersCount(sessionData.split(","));
        // console.log(typeof sessionData);
        // console.log(sessionData.split(","));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(screenLoaderVisibilty(false));
    }
  }

  async function getApiData() {
    try {
      const userFormData1 = new FormData();
      userFormData1.append("action", "users_last_7_days");
      // userFormData.append("value", "total_users");

      const sevenDays = await axios.post(
        `${baseUrl}api/admin-api`,
        userFormData1
      );
      setLastSevenDaysUsers(sevenDays.data.total_users);
      // console.log(sevenDays.data);

      const userFormData2 = new FormData();
      userFormData2.append("action", "users_last_30_days");
      // userFormData.append("value", "total_users");

      const thirtyDays = await axios.post(
        `${baseUrl}api/admin-api`,
        userFormData2
      );
      setLastThirtyDaysUsers(thirtyDays.data.total_users);
      // console.log(thirtyDays.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getData();
    getApiData();
  }, []);

  const data = [
    { title: "Today Users", val: 10 },
    { title: "Last 7 Days", val: lastSevenDaysUsers },
    { title: "Last 30 Days", val: lastThirtyDaysUsers },
  ];
  return (
    <div
      className={`absolute inset-0 overflow-x-hidden backdrop-blur-[1px] bg-black/80 flex justify-center sm:py-4 ${
        openSidebar && "lg:pr-26 "
      }`}
    >
      <div
        className={`${
          openSidebar ? "w-[90%] lg:w-full" : "w-[90%] lg:w-[80%]"
        } flex flex-col sm:px-5 max-w-[1320px] justify-between`}
      >
        <div>
          <div className="flex sm:flex-row flex-col gap-2 mt-8 flex-wrap">
            {data.map((item, i) => (
              <div
                key={i}
                className="flex-1 group cursor-pointer sm:min-w-[150px] flex border-2 border-white/40 rounded-lg sm:px-3 sm:py-2 p-1 justify-between"
              >
                <div>
                  <div className="text-xs text-nowrap text-white/40 group-hover:text-[#707EF3]">
                    {item.title}
                  </div>
                  <div className="text-lg group-hover:text-[#707EF3] sm:text-2xl wt">
                    {item.val ? item.val : "Loading.."}
                  </div>
                </div>
                <div className="sm:w-14 w-10 flex items-center">
                  <img
                    src={teamSrc}
                    className="sm:h-14 sm:w-14 w-10"
                    alt="icon"
                  />
                </div>
              </div>
            ))}
          </div>
          <>
            <div className="mt-14 flex gap-5 justify-evenly flex-wrap pt-16 lg:px-10 bg-gradient-to-b from-[#564017] to-transparent rounded-t-xl relative">
              <div
                className={`absolute -top-4 px-5 text-lg rounded-2xl border-2 border-[#B96FDB] text-nowrap  left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#A024C3] via-[#7B15CD] to-[#5B07D5]`}
              >
                Total Users : {users}
              </div>
              {packages.slice(1).map((pkg, index) => (
                <div
                  key={index}
                  className="relative text-sm sm:text-base hover:shadow-[0_0_20px_5px_rgba(56,165,850,0.6)] overflow-hidden cursor-pointer w-30 h-15 sm:h-20 sm:w-40 rounded-b-full bg-gradient-to-tr from-[#E21927] via-[#B21238] to-[#790A4D] "
                >
                  <div className="bg-gradient-to-r sm:text-lg text-black font-bold text-center from-[#FFE033] to-[#FFA006]">
                    {usersCount ? usersCount[index + 1] : "Loading..."}
                  </div>
                  <div className="text-center font-semibold pt-2">
                    {pkg.label}
                  </div>
                </div>
              ))}
            </div>
          </>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default AdminDashboard;
