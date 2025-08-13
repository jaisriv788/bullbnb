import solidLogoSrc from "../../assets/bnbLogo/circle.png";
import { useParams } from "react-router";
import Title from "../../component/Title";
import Footer from "../../component/Footer";
import { useSelector, useDispatch } from "react-redux";
import { screenLoaderVisibilty } from "../../features/copyModal/copyModalVisiblilty";
import { useEffect, useState } from "react";
import logsAbi from "../../logsAbi.json";
import Web3 from "web3";

function LuxuryBonusDetails({ openSidebar }) {
  const { title, value, id } = useParams();
  const [data, setData] = useState([]);

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

  const fetchData = async () => {
    try {
      dispatch(screenLoaderVisibilty(true));

      const web3 = new Web3("https://opbnb-mainnet-rpc.bnbchain.org");

      if (!web3.utils.isAddress(CurrentWalletAddress)) {
        console.warn("Invalid Ethereum address.");
        dispatch(screenLoaderVisibilty(false));
        return;
      }

      const contractInstances = new web3.eth.Contract(
        logsAbi,
        logsContractAddress
      );

      const response = await contractInstances.methods
        .getTransactionLogByType(CurrentWalletAddress, "luxuryBonus")
        .call();

      const trxArr = response[1];

      const filteredData = trxArr
        .filter((tx) => tx[6] == id)
        .map((tx) => ({
          ...tx,
          income: web3.utils.fromWei(tx["amount"].toString(), "ether"),
        }));

      console.log(filteredData);
      setData(filteredData);
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
        <Title title={title} />

        <div className="flex-1 flex flex-col gap-5">
          <div className="flex gap-1 bg-gradient-to-r from-transparent font-bold via-[#B06F03] to-transparent w-full justify-center items-center">
            <div>
              <img className="h-10 w-10" src={solidLogoSrc} />
            </div>
            <div className="flex flex-col text-center">
              <span className="text-sm">Total Earning</span>
              <span className="text-xl">{value} BNB</span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-box border border-white/40">
            <table className="table border-collapse">
              <thead className="bg-gradient-to-r text-white from-[#E08208] via-[#BD4616] to-[#A6201E]">
                <tr>
                  <th className="border border-white/50 px-2 py-1 text-center">
                    S.No.
                  </th>
                  <th className="border border-white/50 px-2 py-1 text-center">
                    Date
                  </th>
                  <th className="border border-white/50 px-2 py-1 text-center">
                    Income
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gradient-to-r from-white/20 via-white/10 to-white/20">
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="text-center border border-white/50 py-4"
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
                        {new Date(
                          Number(item.timestamp * 1000n)
                        ).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: false,
                        })}
                      </td>
                      <td className="border border-white/50 px-2 py-1 text-center">
                        {Number(item.income).toFixed(5)} BNB
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

export default LuxuryBonusDetails;
