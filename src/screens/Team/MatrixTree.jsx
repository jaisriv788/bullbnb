import Footer from "../../component/Footer";
import Title from "../../component/Title";
import { useSelector, useDispatch } from "react-redux";
import Web3 from "web3";
import { useEffect, useState } from "react";
import mainAbi from "../../mainAbi.json";
import { screenLoaderVisibilty } from "../../features/copyModal/copyModalVisiblilty";
import checkSrc from "../../assets/logos/checkicon.png";
import loadSrc from "../../assets/logos/loader.gif";
import { useNavigate } from "react-router";

function MatrixTree({ openSidebar }) {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const poolArray = [
    2, 4, 8, 16, 32, 64, 128, 216, 512, 1024, 2048, 4096, 8192, 16384, 32768,
  ];

  const walletAddress = useSelector(
    (state) => state.accountDetails.saveMainUserAddress
  );
  const contractAddress = useSelector(
    (state) => state.accountDetails.mainContractAddress
  );
  const walletCurrentAddress = useSelector(
    (state) => state.accountDetails.walletAddress
  );
  
  const fetchMatrixTree = async () => {
    try {
      dispatch(screenLoaderVisibilty(true));

      // Check if cached data exists for this wallet
      const cacheKey = `matrixTreeData_${walletAddress}`;
      const cachedData = sessionStorage.getItem(cacheKey);

      if (cachedData) {
        setData(JSON.parse(cachedData));
        dispatch(screenLoaderVisibilty(false));
        return;
      }

      const web3 = new Web3("https://opbnb-mainnet-rpc.bnbchain.org");

      if (!web3.utils.isAddress(walletAddress)) {
        console.log("Invalid Ethereum address.");
        dispatch(screenLoaderVisibilty(false));
        return;
      }

      const contract = new web3.eth.Contract(mainAbi, contractAddress);

      const levels = Array.from({ length: 15 }, (_, i) => i);

      const promises = levels.map((level) =>
        contract.methods.getMatrixUsers(walletAddress, level).call()
      );

      const responses = await Promise.all(promises);

      const userCounts = responses.map((res) => res.length);

      // Save to state and session storage
      setData(userCounts);
      sessionStorage.setItem(cacheKey, JSON.stringify(userCounts));

      dispatch(screenLoaderVisibilty(false));
    } catch (error) {
      dispatch(screenLoaderVisibilty(false));
      console.error("API Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchMatrixTree();
  }, []);

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
        } flex flex-col sm:px-5 max-w-[1320px]`}
      >
        <Title title="My Matrix Tree" />

        <div className="flex-1">
          <div className="overflow-x-auto rounded-box border border-white/40">
            <table className="table border-collapse">
              <thead className="bg-gradient-to-r text-white from-[#E08208] via-[#BD4616] to-[#A6201E]">
                <tr>
                  <th className="border border-white/50 text-center px-2 py-1">
                    Tire
                  </th>
                  <th className="border border-white/50 text-center px-2 py-1">
                    Matrix Tree
                  </th>
                  <th
                    className="border border-white/50 text-center px-2 py-1"
                    colSpan={2}
                  >
                    Matrix Status
                  </th>
                  <th className="border border-white/50 text-center px-2 py-1">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gradient-to-r from-white/20 via-white/10 to-white/20">
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center border border-white/50 py-4"
                    >
                      No Data Found
                    </td>
                  </tr>
                ) : (
                  Array.from({ length: 15 }).map((_, index) => (
                    <tr key={index}>
                      <td className="border border-white/50 text-center px-2 py-1">
                        {index + 1}
                      </td>
                      <td className="border border-white/50 text-center px-2 py-1">
                        {poolArray[index]}
                      </td>
                      <td className="border border-white/50 text-center px-2 py-1">
                        {data[index]}
                      </td>
                      <td className="border border-white/50 relative px-2 py-1 h-[44px] text-center">
                        <img
                          className="h-5 w-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                          src={
                            poolArray[index] === data[index]
                              ? checkSrc
                              : loadSrc
                          }
                          alt={
                            poolArray[index] === data[index]
                              ? "check"
                              : "loading"
                          }
                        />
                      </td>
                      <td className="border border-white/50 relative h-[44px] text-center">
                        <button
                          onClick={() => {
                            navigate(`/matrixtreedetails/${index}`);
                          }}
                          className="bg-white btn-theme1 cursor-pointer px-2 rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black text-sm"
                        >
                          View
                        </button>
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

export default MatrixTree;
