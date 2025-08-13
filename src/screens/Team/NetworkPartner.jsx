import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Web3 from "web3";
import { Copy, ExternalLink } from "lucide-react";
import Title from "../../component/Title";
import Footer from "../../component/Footer";
import mainAbi from "../../mainAbi.json";
import { screenLoaderVisibilty } from "../../features/copyModal/copyModalVisiblilty";
import { Rank } from "../../data/data";

function NetworkPartner({ openSidebar }) {
  const [data, setData] = useState([]);
  const [level, setLevel] = useState(1);
  const [inputLevel, setInputLevel] = useState("1");
  const dispatch = useDispatch();

  const walletAddress = useSelector(
    (state) => state.accountDetails.saveMainUserAddress
  );
  const contractAddress = useSelector(
    (state) => state.accountDetails.mainContractAddress
  );
  const walletCurrentAddress = useSelector(
    (state) => state.accountDetails.walletAddress
  );

  // Debounce inputLevel -> level
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const parsed = parseInt(inputLevel);
      if (!isNaN(parsed) && parsed > 0) {
        setLevel(parsed);
      }
    }, 1000); // 500ms debounce

    return () => clearTimeout(delayDebounce);
  }, [inputLevel]);

  const fetchDirectPartner = async () => {
    try {
      dispatch(screenLoaderVisibilty(true));
      const web3 = new Web3("https://opbnb-mainnet-rpc.bnbchain.org");

      if (!web3.utils.isAddress(walletAddress)) {
        console.log("Invalid Ethereum address.");
        dispatch(screenLoaderVisibilty(false));
        return;
      }

      const contract = new web3.eth.Contract(mainAbi, contractAddress);
      const response = await contract.methods
        .getLevelWiseUsers(walletAddress, level)
        .call();

      setData(response.reverse());
      // console.log(response);
      dispatch(screenLoaderVisibilty(false));
    } catch (error) {
      dispatch(screenLoaderVisibilty(false));
      console.error("API Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchDirectPartner();
  }, [level]);

  return (
    <div
      className={`absolute inset-0 overflow-auto backdrop-blur-[1px] ${
        walletAddress == walletCurrentAddress
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
        <Title title="My Network Partner" />

        <div className="flex-1 flex flex-col gap-5">
          <label className="input bg-black rounded-full self-center text-white border-2 border-white/40">
            <input
              value={inputLevel}
              onChange={(e) => setInputLevel(e.target.value)}
              type="number"
              className="grow"
              placeholder="Search Level"
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
                    ID
                  </th>
                  <th className="border border-white/50 px-2 py-1 text-center">
                    Wallet Address
                  </th>
                  <th className="border border-white/50 px-2 py-1 text-center">
                    Registration Date
                  </th>
                  <th className="border border-white/50 px-2 py-1 text-center">
                    Package
                  </th>
                  <th className="border border-white/50 px-2 py-1 text-center">
                    Level
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gradient-to-r from-white/20 via-white/10 to-white/20">
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-4 border border-white/50"
                    >
                      No Data Found
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-white/50 px-2 py-1 text-center">
                        {index + 1}
                      </td>
                      <td className="border border-white/50 px-2 py-1 text-center">
                        {item.user.id}
                      </td>
                      <td className="border border-white/50 px-2 py-1">
                        <div className="flex items-center gap-2 justify-center">
                          {item.user.account.slice(0, 3) +
                            "..." +
                            item.user.account.slice(-3)}
                          <Copy
                            className="cursor-pointer hover:text-white/40 transition duration-300"
                            onClick={() => {
                              navigator.clipboard.writeText(item.user.account);
                              alert("Copied to clipboard!");
                            }}
                            size={14}
                            strokeWidth={3}
                          />
                          <ExternalLink
                            onClick={() => {
                              window.open(
                                `https://opbnbscan.com/address/${item.user.account}`,
                                "_blank"
                              );
                            }}
                            className="cursor-pointer hover:text-white/40 transition duration-300"
                            size={14}
                            strokeWidth={3}
                          />
                        </div>
                      </td>
                      <td className="border border-white/50 px-2 py-1 text-center">
                        {new Date(
                          Number(item?.user?.start) * 1000
                        ).toLocaleString("en-GB", {
                          hour12: false,
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="border border-white/50 px-2 py-1 text-center">
                        {Rank[Number(item.user.currentPackage) - 1]}
                      </td>
                      <td className="border border-white/50 px-2 py-1 text-center">
                        {level}
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

export default NetworkPartner;
