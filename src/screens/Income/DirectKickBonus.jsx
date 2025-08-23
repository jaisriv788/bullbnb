import Title from "../../component/Title";
import Footer from "../../component/Footer";
import solidLogoSrc from "../../assets/bnbLogo/circle.png";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { screenLoaderVisibilty } from "../../features/copyModal/copyModalVisiblilty";
import { useSelector, useDispatch } from "react-redux";
import abi from "../../abi.json";
import abiOne from "../../oldAbiOne.json";
import abiTwo from "../../oldAbiTwo.json";
import logsAbi from "../../logsAbi.json";
import { Rank } from "../../data/data";
import { Copy, ExternalLink } from "lucide-react";

function DirectKickBonus({ openSidebar }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [totalEarning, setTotalEarning] = useState(0.0);
  const [id, setId] = useState("");
  const dispatch = useDispatch();

  const walletAddress = useSelector(
    (state) => state.accountDetails.saveMainUserAddress
  );
  const CurrentWalletAddress = useSelector(
    (state) => state.accountDetails.walletAddress
  );

  const logsContractAddress = useSelector(
    (state) => state.accountDetails.logsContractAddress
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

  const fetchData = async () => {
    try {
      dispatch(screenLoaderVisibilty(true));
      const web3 = new Web3("https://opbnb-mainnet-rpc.bnbchain.org");

      const contracts = [
        { abi: logsAbi, address: logsContractAddress },
        { abi, address: contractAddress },
        { abi: abiOne, address: previousContractAddressOne },
        { abi: abiTwo, address: previousContractAddressTwo },
      ];

      if (!web3.utils.isAddress(CurrentWalletAddress)) {
        console.log("Invalid Ethereum address.");
        dispatch(screenLoaderVisibilty(false));
        return;
      }

      const contractInstances = contracts.map(
        (c) => new web3.eth.Contract(c.abi, c.address)
      );

      const settledResponses = await Promise.allSettled(
        contractInstances.map((c) =>
          c.methods
            .getTransactionLogByType(
              CurrentWalletAddress,
              "PartnerDirectKickBonusPercent"
            )
            .call()
        )
      );

      const response = settledResponses.map((res) =>
        res.status === "fulfilled" ? res.value?.["1"] || [] : []
      );

      const flatResponse = response.flat();

      const formatted = flatResponse.map((item) => ({
        ...item,
        incomeBNB: web3.utils.fromWei(item.amount.toString(), "ether"),
      }));
      // console.log(formatted);

      const total = formatted.reduce(
        (acc, val) => acc + parseFloat(val.incomeBNB),
        0
      );

      setTotalEarning(total);
      setData(formatted);
      setFilteredData(formatted.reverse());
      dispatch(screenLoaderVisibilty(false));
    } catch (error) {
      dispatch(screenLoaderVisibilty(false));
      console.error("API Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (id === "") {
      setFilteredData(data.reverse());
    } else {
      const filtered = data.filter((item) =>
        String(item.fromID).includes(String(id))
      );
      setFilteredData(filtered.reverse()); // Make sure to set it!
      console.log("Filtered Data:", filtered);
    }
  }, [id, data]);

  return (
    <div
      className={`absolute inset-0 overflow-auto backdrop-blur-[1px] ${
        walletAddress == CurrentWalletAddress
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
        <Title title="Partner Direct Kick Bonus" />
        <div className="flex-1 flex flex-col gap-5">
          <div className="flex gap-1 bg-gradient-to-r from-transparent via-[#B06F03] to-transparent w-full justify-center items-center">
            <div>
              <img className="h-10 w-10" src={solidLogoSrc} />
            </div>
            <div className="flex flex-col text-center">
              <span className="text-sm">Total Earning</span>
              <span className="text-xl">{totalEarning.toFixed(4)} BNB</span>
            </div>
          </div>

          <label className="input self-center bg-black rounded-full text-white border-2 border-white/40">
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              type="number"
              className="grow"
              placeholder="Enter Id"
              min={1}
            />
            <svg
              className="h-[1.5em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.3-4.3" />
              </g>
            </svg>
          </label>

          <div className="overflow-x-auto rounded-box border border-white/40">
            <table className="table border-collapse">
              <thead className="bg-gradient-to-r text-white from-[#E08208] via-[#BD4616] to-[#A6201E]">
                <tr>
                  <th className="border border-white/50 px-2 py-1 text-center">
                    S.No.
                  </th>
                  <th className="border border-white/50 px-2 py-1 text-center">
                    Id
                  </th>
                  <th className="border border-white/50 px-2 py-1 text-center">
                    Address
                  </th>
                  <th className="border border-white/50 px-2 py-1 text-center">
                    Date
                  </th>
                  <th className="border border-white/50 px-2 py-1 text-center">
                    Package
                  </th>
                  <th className="border border-white/50 px-2 py-1 text-center">
                    Income
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gradient-to-r from-white/20 via-white/10 to-white/20">
                {filteredData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center border border-white/50 py-4"
                    >
                      No Data Found
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-white/50 px-2 py-1 text-center">
                        {index + 1}
                      </td>
                      <td className="border border-white/50 px-2 py-1 text-center">
                        {item.fromID}
                      </td>
                      <td className="border border-white/50 px-2 py-1">
                        <div className="flex items-center justify-center gap-2">
                          {item.fromAddress.slice(0, 4) +
                            "..." +
                            item.fromAddress.slice(-4)}
                          <Copy
                            className="hover:text-white/60 cursor-pointer transition duration-300"
                            size={15}
                            onClick={() => {
                              navigator.clipboard.writeText(item.fromAddress);
                              alert("Address Copied!");
                            }}
                          />
                          <ExternalLink
                            className="hover:text-white/60 cursor-pointer transition duration-300"
                            size={15}
                            onClick={() =>
                              window.open(
                                `https://opbnbscan.com/address/${item.fromAddress}`,
                                "_blank"
                              )
                            }
                          />
                        </div>
                      </td>
                      <td className="border border-white/50 px-2 py-1 text-center">
                        {new Date(
                          Number(item.timestamp * 1000n)
                        ).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                      </td>
                      <td className="border border-white/50 px-2 py-1 text-center">
                        {Rank[parseInt(item.package) - 1]}
                      </td>
                      <td className="border border-white/50 px-2 py-1 text-center">
                        {item.incomeBNB} BNB
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="text-sm font-light text-center">
            Note: For every successful referral, you’ll earn a bonus of
            0.00504BNB on partner’s starter package value only.
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default DirectKickBonus;
