import Footer from "../../component/Footer";
import Title from "../../component/Title";
import solidLogoSrc from "../../assets/bnbLogo/circle.png";
import { Rank } from "../../data/data";
import { useState, useEffect } from "react";
import { screenLoaderVisibilty } from "../../features/copyModal/copyModalVisiblilty";
import { useSelector, useDispatch } from "react-redux";
import abiOne from "../../oldAbiOne.json";
import abiTwo from "../../oldAbiTwo.json";
import mainAbi from "../../mainAbi.json";
import Web3 from "web3";
import checkSrc from "../../assets/logos/checkicon.png";
import loadSrc from "../../assets/logos/loader.gif";

function PoolBonus({ openSidebar }) {
  const [incomeArr, setIncomeArr] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0.0);
  const [combUserArr, setCombUserArr] = useState([]);
  const poolArray = [
    2, 4, 8, 16, 32, 64, 128, 216, 512, 1024, 2048, 4096, 8192, 16384, 32768,
  ];

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
      console.log(contractInstances);
      const settledResponses = await Promise.allSettled(
        contractInstances.map((contract) =>
          contract.methods.totalRankWisePoolIncome(CurrentWalletAddress).call()
        )
      );

      console.log(settledResponses);
      const total = settledResponses.map((res) =>
        res.status === "fulfilled"
          ? web3.utils.fromWei(res.value?.["0"] || "0", "ether")
          : "0"
      );
      // console.log({ total });
      const totalincome = total.reduce((acc, item) => {
        return acc + parseFloat(item);
      }, 0);

      setTotalIncome(totalincome);

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

      setIncomeArr(incomeInEther);

      const usersArrays = settledResponses.map((res) =>
        res.status === "fulfilled" ? res.value?.["2"] || [] : []
      );

      const combinedUsers = [];

      for (const incomeArr of usersArrays) {
        incomeArr.forEach((val, i) => {
          combinedUsers[i] = (combinedUsers[i] || 0n) + BigInt(val || 0);
        });
      }
      console.log({ combinedUsers });
      setCombUserArr(combinedUsers);
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
        <Title title="Partner Pool Bonus" />
        <div className=" flex-1 flex flex-col gap-5">
          <div className="flex gap-1 bg-gradient-to-r from-transparent font-bold via-[#B06F03] to-transparent w-full justify-center items-center">
            <div>
              <img className="h-10 w-10" src={solidLogoSrc} />
            </div>
            <div className="flex flex-col text-center">
              <span className="text-sm">Total Earning</span>
              <span className="text-xl">{totalIncome.toFixed(4)} BNB</span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-box border border-white/40">
            <table className="table border-collapse">
              <thead className="bg-gradient-to-r text-white from-[#E08208] via-[#BD4616] to-[#A6201E]">
                <tr>
                  <th className="border border-white/50 w-1/6 min-w-[100px] text-center px-2 py-1">
                    Tire
                  </th>
                  <th className="border border-white/50 w-1/6 min-w-[100px] text-center px-2 py-1">
                    Rank
                  </th>
                  <th className="border border-white/50 text-center px-2 py-1">
                    Income
                  </th>
                  <th className="border border-white/50 text-center px-2 py-1">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gradient-to-r from-white/20 via-white/10 to-white/20">
                {Array.from({ length: 14 }).map((_, index) => (
                  <tr key={index}>
                    <td className="border border-white/50 text-center px-2 py-1">
                      {index + 2}
                    </td>
                    <td className="border border-white/50 text-center px-2 py-1">
                      {Rank[index + 1]}
                    </td>
                    <td className="border border-white/50 text-center px-2 py-1">
                      {parseFloat(incomeArr[index + 1]).toFixed(4)} BNB
                    </td>
                    <td className="border border-white/50 text-center px-2 py-1">
                      <div className="flex justify-center items-center h-full">
                        {poolArray[index + 1] === combUserArr[index + 1] ? (
                          <img className="h-5" src={checkSrc} alt="check" />
                        ) : combUserArr[index + 1] > 0 ? (
                          <img className="h-5" src={loadSrc} alt="loading" />
                        ) : (
                          "-"
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="border border-white/50 text-center font-bold px-2 py-1">
                    Total
                  </td>
                  <td className="border border-white/50 px-2 py-1"></td>
                  <td className="border border-white/50 text-center font-bold px-2 py-1">
                    {totalIncome.toFixed(4)} BNB
                  </td>
                  <td className="border border-white/50 px-2 py-1"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>{" "}
        <Footer />
      </div>
    </div>
  );
}

export default PoolBonus;
