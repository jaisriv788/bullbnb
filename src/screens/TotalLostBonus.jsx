import Title from "../component/Title";
import solidLogoSrc from "../assets/bnbLogo/circle.png";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import Footer from "../component/Footer";
import { useEffect, useState } from "react";
import logsAbi from "../logsAbi.json";
import Web3 from "web3";
import abiOne from "../oldAbiOne.json";
import abiTwo from "../oldAbiTwo.json";
import abi from "../abi.json";
import { screenLoaderVisibilty } from "../features/copyModal/copyModalVisiblilty";
import { Copy, ExternalLink } from "lucide-react";

const rankOptions = [
  "",
  "Starter",
  "Executive",
  "Achiever",
  "Pioneer",
  "Director",
  "Star",
  "Champion",
  "Mentor",
  "Titan",
  "Platinum",
  "Diamond",
  "Icon",
  "Legend",
  "Ambassador",
  "President",
];

function TotalLostBonus({ openSidebar }) {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const walletAddress = useSelector(
    (state) => state.accountDetails.saveMainUserAddress
  );
  const currentWalletAddress = useSelector(
    (state) => state.accountDetails.walletAddress
  );
  const logsContractAddress = useSelector(
    (state) => state.accountDetails.logsContractAddress
  );
  const previousContractAddressOne = useSelector(
    (state) => state.accountDetails.previousContractAddressOne
  );
  const previousContractAddressTwo = useSelector(
    (state) => state.accountDetails.previousContractAddressTwo
  );
  const contractAddress = useSelector(
    (state) => state.accountDetails.contractAddress
  );
  const { bonus } = useParams();

  async function fetchData() {
    try {
      dispatch(screenLoaderVisibilty(true));
      const web3 = new Web3("https://opbnb-mainnet-rpc.bnbchain.org");

      if (!web3.utils.isAddress(walletAddress)) {
        console.log("Invalid Ethereum address.");
        return;
      }

      const contracts = [
        { abi: logsAbi, address: logsContractAddress },
        { abi: abi, address: contractAddress },
        { abi: abiOne, address: previousContractAddressOne },
        { abi: abiTwo, address: previousContractAddressTwo },
      ];

      const contractInstances = contracts.map(
        (c) => new web3.eth.Contract(c.abi, c.address)
      );

      const response = await Promise.allSettled(
        contractInstances.map((c) =>
          c.methods
            .getTransactionLogByType(currentWalletAddress, "LapsIncome")
            .call()
        )
      );

      const successfulResults = response
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value);

      const mergedArray = successfulResults
        .filter((obj) => obj["1"] && Array.isArray(obj["1"]))
        .flatMap((obj) => obj["1"])
        .map((item) => ({
          ...item,
          incomeGen: web3.utils.fromWei(item.amount.toString(), "ether"),
        }));
      dispatch(screenLoaderVisibilty(false));
      // console.log(mergedArray);
      setData(mergedArray);
    } catch (error) {
      dispatch(screenLoaderVisibilty(false));
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div
      className={`absolute inset-0 overflow-auto backdrop-blur-[1px] ${
        walletAddress == currentWalletAddress
          ? "bg-black/60"
          : "bg-[#490D0D]/80"
      }  flex justify-center sm:py-4 ${openSidebar && "lg:pr-30"}`}
    >
      {" "}
      <div
        className={`${
          openSidebar ? "w-[90%] lg:w-full" : "w-[90%] lg:w-[80%]"
        } flex flex-col sm:px-5 max-w-[1320px]`}
      >
        <Title title="Lost Bonus Report" />
        <div className=" flex-1 flex flex-col gap-5">
          <div className="flex gap-1 bg-gradient-to-r from-transparent font-bold via-[#B06F03] to-transparent w-full justify-center items-center">
            <div>
              <img className="h-10 w-10" src={solidLogoSrc} />
            </div>
            <div className="flex flex-col text-center">
              <span className="text-sm">Total Lost Bonus</span>
              <span className="text-xl">{bonus} BNB</span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-box border border-white/40">
            <table className="table border-collapse">
              <thead className="bg-gradient-to-r text-white from-[#E08208] via-[#BD4616] to-[#A6201E]">
                <tr>
                  <th className="border border-white/50 text-center px-2 py-1">
                    S.No.
                  </th>
                  <th className="border border-white/50 text-center px-2 py-1">
                    Id
                  </th>
                  <th className="border border-white/50 text-center px-2 py-1">
                    Address
                  </th>
                  <th className="border border-white/50 text-center px-2 py-1">
                    Date
                  </th>
                  <th className="border border-white/50 text-center px-2 py-1">
                    Package
                  </th>
                  <th className="border border-white/50 text-center px-2 py-1">
                    Income
                  </th>
                  <th className="border border-white/50 text-center px-2 py-1">
                    Income Type
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gradient-to-r from-white/20 via-white/10 to-white/20">
                {data.length == 0 ? (
                  <tr>
                    <td className=" text-center" colSpan={7}>
                      No Data Found
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-white/50 text-center px-2 py-1">
                        {index + 1}
                      </td>
                      <td className="border border-white/50 text-center px-2 py-1">
                        {item.fromID}
                      </td>
                      <td className="border border-white/50 text-center px-2 py-1">
                        <div className="flex items-center justify-center gap-1">
                          <span>
                            {item.fromAddress.slice(0, 4) +
                              "..." +
                              item.fromAddress.slice(-4)}
                          </span>
                          <Copy
                            size={15}
                            onClick={() => {
                              navigator.clipboard
                                .writeText(item.fromAddress)
                                .then(() => alert("Address Copied!"));
                            }}
                            className="hover:text-gray-300 cursor-pointer"
                          />
                          <ExternalLink
                            size={15}
                            onClick={() => {
                              window.open(
                                `https://opbnbscan.com/address/${item.fromAddress}`,
                                "_blank"
                              );
                            }}
                            className="hover:text-gray-300 cursor-pointer"
                          />
                        </div>
                      </td>

                      <td className="border text-nowrap border-white/50 text-center px-2 py-1">
                        {new Date(
                          Number(item?.timestamp) * 1000
                        ).toLocaleString("en-GB", {
                          hour12: false,
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="border border-white/50 text-center px-2 py-1">
                        {rankOptions[item.package]}
                      </td>
                      <td className="border border-white/50 text-center px-2 py-1">
                        {item.incomeGen}
                      </td>
                      <td className="border border-white/50 text-center px-2 py-1">
                        {item.txType}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default TotalLostBonus;
