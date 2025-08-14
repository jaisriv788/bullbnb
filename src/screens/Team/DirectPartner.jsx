import { useEffect, useState } from "react";
import Footer from "../../component/Footer";
import Title from "../../component/Title";
import Web3 from "web3";
import { useSelector, useDispatch } from "react-redux";
import mainAbi from "../../mainAbi.json";
import { Copy, ExternalLink } from "lucide-react";
import checkIcon from "../../assets/logos/checkicon.png";
import { screenLoaderVisibilty } from "../../features/copyModal/copyModalVisiblilty";

function DirectPartner({ openSidebar }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const walletAddress = useSelector(
    (state) => state.accountDetails.saveMainUserAddress
  );
  const walletCurrentAddress = useSelector(
    (state) => state.accountDetails.walletAddress
  );
  const contractAddress = useSelector(
    (state) => state.accountDetails.mainContractAddress
  );

  const fetchDirectPartner = async () => {
    try {
      dispatch(screenLoaderVisibilty(true));
      setIsLoading(true);

      const cacheKey = `directPartner_${walletAddress}`;
      const cachedItem = sessionStorage.getItem(cacheKey);

      if (cachedItem) {
        const { timestamp, data: cachedData } = JSON.parse(cachedItem);
        const cacheValid = Date.now() - timestamp < 5 * 60 * 1000; // 5 minutes

        if (cacheValid) {
          setData(cachedData);
          // console.log("Loaded from cache:", cachedData);
          setIsLoading(false);
          dispatch(screenLoaderVisibilty(false));
          return;
        }
      }

      const web3 = new Web3("https://opbnb-mainnet-rpc.bnbchain.org");

      if (!web3.utils.isAddress(walletAddress)) {
        console.log("Invalid Ethereum address.");
        setIsLoading(false);
        dispatch(screenLoaderVisibilty(false));
        return;
      }

      const contract = new web3.eth.Contract(mainAbi, contractAddress);
      const response = await contract.methods.partners(walletAddress).call();

      // console.log("Raw response from contract:", response);

      const normalizeBigInts = (obj) => {
        if (typeof obj === "bigint") return obj.toString();
        if (Array.isArray(obj)) return obj.map(normalizeBigInts);
        if (obj !== null && typeof obj === "object") {
          return Object.fromEntries(
            Object.entries(obj).map(([k, v]) => [k, normalizeBigInts(v)])
          );
        }
        return obj;
      };

      const normalizedData = normalizeBigInts(
        Array.isArray(response) ? response : [response]
      );
      setData(normalizedData);
      sessionStorage.setItem(
        cacheKey,
        JSON.stringify({ timestamp: Date.now(), data: normalizedData })
      );
      // console.log("Stored in session:", normalizedData);
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
      dispatch(screenLoaderVisibilty(false));
    }
  };

  useEffect(() => {
    if (walletAddress) {
      fetchDirectPartner();
    }
  }, [walletAddress]);

  return (
    <div
      className={`absolute inset-0 overflow-auto backdrop-blur-[1px] ${
        walletAddress == walletCurrentAddress
          ? "bg-black/60"
          : "bg-[#490D0D]/80"
      }  flex justify-center sm:py-4 ${openSidebar && "lg:pr-30"}`}
    >
      {" "}
      <div
        className={`${
          openSidebar ? "w-[90%] lg:w-full" : "w-[90%] lg:w-[80%]"
        } flex flex-col sm:px-5 max-w-[1320px] `}
      >
        <Title title="My Direct Partner" />

        <div className="flex-1">
          <div className="overflow-x-auto rounded-box border border-white/40">
            <table className="table border-collapse">
              <thead className="bg-gradient-to-r text-white from-[#E08208] via-[#BD4616] to-[#A6201E]">
                <tr>
                  {[
                    "S.No.",
                    "ID",
                    "Address",
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
                  ].map((header, i) => (
                    <th
                      key={i}
                      className="border border-white/50 text-center px-2 py-1"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-gradient-to-r from-white/20 via-white/10 to-white/20">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={18}
                      className="text-center border border-white/50"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={18}
                      className="text-center border border-white/50"
                    >
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
                        {item.userData?.id?.toString()}
                      </td>
                      <td className="border border-white/50 text-center px-2 py-1">
                        <div className="flex items-center gap-2 justify-center">
                          {item.userData?.account
                            ? `${item.userData.account.slice(
                                0,
                                3
                              )}...${item.userData.account.slice(-3)}`
                            : "-"}
                          <Copy
                            className="cursor-pointer hover:text-white/40 transition ease-in-out duration-300"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                item.userData.account
                              );
                              alert("Copied to clipboard!");
                            }}
                            size={14}
                            strokeWidth={3}
                          />
                          <ExternalLink
                            className="cursor-pointer hover:text-white/40 transition ease-in-out duration-300"
                            size={14}
                            strokeWidth={3}
                          />
                        </div>
                      </td>
                      {Array.from({ length: 15 }).map((_, i) => (
                        <td
                          key={i}
                          className="border border-white/50 text-center px-2 py-1 min-w-[32px]"
                        >
                          {item.userData?.currentPackage?.toString() >=
                          i + 1 ? (
                            <img
                              className="w-4 h-4 mx-auto"
                              src={checkIcon}
                              alt="✓"
                            />
                          ) : (
                            "-"
                          )}
                        </td>
                      ))}
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

export default DirectPartner;
