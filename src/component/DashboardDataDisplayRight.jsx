import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { screenLoaderVisibilty } from "../features/copyModal/copyModalVisiblilty";
import { TriangleAlert } from "lucide-react";
import { useNavigate } from "react-router";
import Web3 from "web3";
import logoSrc from "../assets/bnbLogo/circle.png";
import ABI from "../mainAbi.json";

function DashboardDataDisplayRight({ luxuryBonus, lapsIncome }) {
  const [timeLeft, setTimeLeft] = useState(null); // in seconds
  const [claimEnabled, setClaimEnabled] = useState(false);
  const [timerEnded, setTimerEnded] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mainContractAddress = useSelector(
    (state) => state.accountDetails.mainContractAddress
  );

  const walletAddress = useSelector(
    (state) => state.accountDetails.walletAddress
  );

  useEffect(() => {
    if (!mainContractAddress || timerEnded) return;

    let timer;

    async function fetchTimer() {
      try {
        const web3 = new Web3("https://opbnb-mainnet-rpc.bnbchain.org");
        const contract = new web3.eth.Contract(ABI, mainContractAddress);
        const royaltyLastDist = await contract.methods.royaltyLastDist().call();

        const futureTimestamp = parseFloat(royaltyLastDist) + 24 * 60 * 60;

        function updateCountdown() {
          const now = Date.now() / 1000;
          const remaining = Math.floor(futureTimestamp - now);
          setTimeLeft(remaining > 0 ? remaining : 0);

          if (remaining <= 0) {
            clearInterval(timer);
            setClaimEnabled(true);
            setTimerEnded(true);
          }
        }

        updateCountdown();
        timer = setInterval(updateCountdown, 1000);
      } catch (err) {
        console.error("Error fetching timer:", err);
      }
    }

    fetchTimer();
    return () => clearInterval(timer);
  }, [mainContractAddress, timerEnded]);

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}h : ${mins}m : ${secs}s`;
  };

  //have to work here
  const handleClaimBonus = async () => {
    try {
      dispatch(screenLoaderVisibilty(true));
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(ABI, mainContractAddress);

      await contract.methods.LuxuryBonus().send({ from: walletAddress });

      setTimerEnded(false);
      setClaimEnabled(false);
      setTimeLeft(null);
      dispatch(screenLoaderVisibilty(false));
    } catch (err) {
      dispatch(screenLoaderVisibilty(false));

      console.error("Claim Bonus Failed", err);
    }
  };

  return (
    <div className="flex-1 flex gap-3 flex-col">
      <div className="bg-gradient-to-tr p-2 flex-3 rounded-lg from-[#FA1C1E] via-[#AA113B] to-[#620755]">
        <div className="bg-gradient-to-tr from-[#FFEA3A] to-[#FF9A01] h-full rounded-lg p-1">
          <div className="bg-gradient-to-tr flex flex-col items-center text-center p-2 lg:p-1 from-[#FA1C1E] via-[#AA113B] to-[#620755] rounded-lg h-full">
            <div>Partner Luxury Bonus</div>
            <div className="text-[26px]">{luxuryBonus} BNB</div>
            <div
              onClick={() => {
                navigate("/income/luxury");
              }}
              className="text-xs px-3 py-[1px] cursor-pointer rounded bg-white text-black w-fit"
            >
              View Details
            </div>
            <div className="my-3 border-t-[1px] border-white/30 w-full"></div>
            <div className="text-lg">Next bonus unlock after</div>
            <div
              className="bg-gradient-to-r rounded-lg border-3 border-[#C675D8] w-full py-1 lg:py-[1px] text-2xl font-semibold from-[#A326C3] via-[#7B15CC] to-[#5706D6]"
              id="countdown"
            >
              {timeLeft !== null ? formatTime(timeLeft) : "Loading..."}
            </div>
            <button
              id="claim-bonus"
              className={` ${
                !claimEnabled
                  ? "cursor-not-allowed text-white/50 border-2 border-gray-500 bg-gray-700 py-[2px] px-[15px] rounded-[5px] mt-[10px]"
                  : "btn-theme3 cursor-pointer"
              }`}
              disabled={!claimEnabled}
              onClick={handleClaimBonus}
            >
              Claim Bonus
            </button>
          </div>
        </div>
      </div>

      <div
        onClick={() => navigate(`/bonus/${lapsIncome}`)}
        className="flex-1 cursor-pointer flex justify-between py-2 lg:py-0 px-5 rounded-lg bg-gradient-to-r from-[#B6530A] via-[#D0802F] to-[#E2A049]"
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <TriangleAlert size={16} />
            Total Lost Bonus
          </div>
          <span className="text-2xl">{lapsIncome ? lapsIncome : "00"} BNB</span>
          <span className="text-xs">Take action now to keep your bonus!</span>
        </div>
        <div className="flex items-center">
          <img className="h-16" src={logoSrc} />
        </div>
      </div>
    </div>
  );
}

export default DashboardDataDisplayRight;
