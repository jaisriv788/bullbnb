import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { setAddress } from "../features/walletAddress/web3WalletInfo";
import { useSelector, useDispatch } from "react-redux";
import mainAbi from "../mainAbi.json";
import Web3 from "web3";

function OptionalTopDiv({ css }) {
  const [selectedId, setSelectedId] = useState("");
  const [partners, setPartners] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const walletAddress = useSelector(
    (state) => state.accountDetails.walletAddress
  );

  const backupWalletAddress = useSelector(
    (state) => state.accountDetails.saveMainUserAddress
  );

  const mainContractAddress = useSelector(
    (state) => state.accountDetails.mainContractAddress
  );
  const web3 = new Web3("https://opbnb-mainnet-rpc.bnbchain.org");
  const contract = new web3.eth.Contract(mainAbi, mainContractAddress);

  const handleChange = async (e) => {
    setSelectedId(e.target.value);
    const returningAddress = await contract.methods
      .idToAddress(e.target.value)
      .call();
    dispatch(setAddress(returningAddress));
    console.log({ returningAddress, backupWalletAddress });
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
    if (walletAddress != backupWalletAddress) {
      dispatch(setAddress(backupWalletAddress));
      setSelectedId("");
    }
  };

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        if (!web3.utils.isAddress(walletAddress)) {
          console.log("Invalid Ethereum address.");
          return;
        }

        const partners = await contract.methods
          .partners(backupWalletAddress)
          .call();
        const ids = partners.map((item) => item[0].id);
        setPartners([...ids]);
      } catch (error) {
        console.log("Error fetching partners:", error);
      }
    };

    fetchPartners();
  }, [walletAddress, mainContractAddress]);

  return (
    <div className={`${css} border-2 rounded border-white/20 `}>
      <div className="flex gap-2 items-center">
        <div className="text-xs sm:text-sm">Preview Id</div>
        <select
          value={selectedId}
          onChange={handleChange}
          disabled={backupWalletAddress != walletAddress}
          className="text-xs bg-white disabled:bg-gray-200 disabled:cursor-not-allowed text-black px-1 rounded-xl sm:w-[200px] lg:w-[130px]"
        >
          <option value="">Select Direct Id</option>
          {partners.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div
        onClick={handleBackToDashboard}
        className={`flex justify-center text-center w-18 sm:w-fit items-center gap-1 text-xs cursor-pointer sm:px-2 py-1 rounded-xl 
    ${
      backupWalletAddress !== walletAddress
        ? "animate-pulse-bg"
        : "bg-[#605476]"
    }`}
      >
        <ArrowLeft size={15} className="hidden sm:block" />
        <span><span className="hidden sm:inline">Back To My</span> Dashboard</span>
      </div>
    </div>
  );
}

export default OptionalTopDiv;
