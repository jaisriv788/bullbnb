import Title from "../Title";
import Footer from "../Footer";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { screenLoaderVisibilty } from "../../features/copyModal/copyModalVisiblilty";
import Web3 from "web3";
import mainAbi from "../../mainAbi.json";
import { Rank } from "../../data/data";
import { ExternalLink } from "lucide-react";

function DetailsPage({ openSidebar }) {
  const { level } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const walletAddress = useSelector(
    (state) => state.accountDetails.saveMainUserAddress
  );

  const contractAddress = useSelector(
    (state) => state.accountDetails.mainContractAddress
  );

  const fetchMatrixTreeData = async () => {
    try {
      dispatch(screenLoaderVisibilty(true));

      const web3 = new Web3("https://opbnb-mainnet-rpc.bnbchain.org");

      if (!web3.utils.isAddress(walletAddress)) {
        console.log("Invalid Ethereum address.");
        return;
      }

      //   console.log(level);
      const contract = new web3.eth.Contract(mainAbi, contractAddress);

      const response = await contract.methods
        .getMatrixUsers(walletAddress, parseInt(level))
        .call();

      // console.log(response);
      setData(response);

      dispatch(screenLoaderVisibilty(false));
    } catch (error) {
      dispatch(screenLoaderVisibilty(false));
      console.error("API Error:", error.response?.data || error.message);
    }
  };
  useEffect(() => {
    fetchMatrixTreeData();
  }, []);
  return (
    <div className="absolute inset-0 overflow-auto backdrop-blur-[1px] bg-black/60 flex justify-center sm:p-4">
      <div
        className={`${
          openSidebar ? "w-[90%] lg:w-full" : "w-[90%] lg:w-[80%]"
        } flex flex-col`}
      >
        <Title title="Matrix Tree" />

        <div className="flex-1">
          {" "}
          <div className="overflow-x-auto rounded-box border border-white/40  ">
            <table className="table">
              <thead className="bg-gradient-to-r text-white from-[#E08208] via-[#BD4616] to-[#A6201E] ">
                <tr>
                  <th className="border-r-1 border-white/40">S.No.</th>
                  <th>ID</th>
                  <th className="border-x-1 border-white/40">Address</th>
                  <th>Package</th>
                </tr>
              </thead>
              <tbody className="bg-gradient-to-r from-white/20 via-white/10 to-white/20">
                {data.length == 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center">
                      No Data Found
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="border-r-1 border-t-1 border-white/40">
                          {index + 1}{" "}
                        </td>
                        <td className=" border-t-1 border-white/40">
                          {item.id}
                        </td>
                        <td className="border-x-1 flex items-center gap-2  border-t-1 border-white/40">
                          <ExternalLink
                            className="cursor-pointer"
                            onClick={() => {
                              window.open(
                                `https://opbnbscan.com/address/${item.account}`,
                                "_blank"
                              );
                            }}
                            size={15}
                          />{" "}
                          {item.account.slice(0, 4) +
                            "..." +
                            item.account.slice(-4)}
                        </td>
                        <td className="border-x-1 relative border-t-1 border-white/40">
                          {Rank[parseInt(item.currentPackage) - 1]}
                        </td>
                      </tr>
                    );
                  })
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

export default DetailsPage;
