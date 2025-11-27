import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Web3 from "web3";
import { screenLoaderVisibilty } from '../features/copyModal/copyModalVisiblilty';
import ABI from '../mainAbi.json';
import rankSrc from "../assets/bnbLogo/rank.png";
import logoSrc from "../assets/bnbLogo/circle.png";
import { TriangleAlert } from "lucide-react";

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

const DashboardNewDataTop = ({ luxuryBonus, lapsIncome, vipBonus }) => {
  const [timeLeft, setTimeLeft] = useState(null); // in seconds
  const [timeLeft2, setTimeLeft2] = useState(null); // in seconds
  const [claimEnabled, setClaimEnabled] = useState(false);
  const [claimEnabled2, setClaimEnabled2] = useState(false);
  const [timerEnded, setTimerEnded] = useState(false);
  const [timerEnded2, setTimerEnded2] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log(vipBonus)

  const mainContractAddress = useSelector(
    (state) => state.accountDetails.mainContractAddress
  );
  const data = useSelector((state) => state.dashboardData.userData);
  const walletAddress = useSelector(
    (state) => state.accountDetails.walletAddress
  );

  useEffect(() => {
    if (!mainContractAddress || timerEnded) return;

    let timer;
    let timer2;

    async function fetchTimer() {
      try {
        const web3 = new Web3("https://opbnb-mainnet-rpc.bnbchain.org");
        const contract = new web3.eth.Contract(ABI, mainContractAddress);
        const royaltyLastDist = await contract.methods.royaltyLastDist().call();
        const vipLastDist = await contract.methods.vipLastDist().call();

        const futureTimestamp = parseFloat(royaltyLastDist) + 24 * 60 * 60;
        const futureTimestamp2 = parseFloat(vipLastDist) + 24 * 60 * 60;

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

        function updateCountdown2() {
          const now = Date.now() / 1000;
          const remaining = Math.floor(futureTimestamp2 - now);
          setTimeLeft2(remaining > 0 ? remaining : 0);

          if (remaining <= 0) {
            clearInterval(timer2);
            setClaimEnabled2(true);
            setTimerEnded2(true);
          }
        }

        updateCountdown();
        updateCountdown2();

        timer = setInterval(updateCountdown, 1000);
        timer2 = setInterval(updateCountdown2, 1000);
      } catch (err) {
        console.error("Error fetching timer:", err);
      }
    }

    fetchTimer();
    return () => clearInterval(timer);
  }, [mainContractAddress, timerEnded, timerEnded2]);

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

  const handleClaimBonus2 = async () => {
    try {
      dispatch(screenLoaderVisibilty(true));
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(ABI, mainContractAddress);

      await contract.methods.VipBonus().send({ from: walletAddress });

      setTimerEnded(false);
      setClaimEnabled(false);
      setTimeLeft(null);
      dispatch(screenLoaderVisibilty(false));
    } catch (err) {
      dispatch(screenLoaderVisibilty(false));

      console.error("Claim Bonus Failed", err);
    }
  };

  useEffect(() => {
    if (!data) {
      dispatch(screenLoaderVisibilty(true));
    } else {
      dispatch(screenLoaderVisibilty(false));
    }
  }, [data, dispatch]);

  if (!data) return null;

  const rank = rankOptions[data.rank];

  const cardDataLower = [
    {
      title: "Network Partner",
      value: data?.myNetworkPartner,
      path: "/team/network",
    },
    {
      title: "Direct Partner",
      value: data?.myDirectPartner,
      path: "/team/direct",
    },
  ];

  return (

    <div className='flex-1 grid grid-cols-1 md:grid-cols-3 gap-3'>
      <div className='grid grid-cols-1 gap-2 w-full'>
        <div
          className="group flex-1 cursor-pointer hover:text-[#707EF3] sm:min-w-[220px] flex border-2 border-white/40 rounded-lg sm:px-3 sm:py-2 p-1 justify-between"
        >
          <div className=''>
            <div className="text-xs sm:text-sm text-white/40 group-hover:text-[#707EF3]">
              Your Current Rank
            </div>
            <div className="text-lg sm:text-2xl">{rank}</div>
          </div>
          <div className=" w-10 flex items-center">
            <img
              src={rankSrc}
              className="sm:h-10 w-10 "
              alt="icon"
            />
          </div>
        </div>
        <div className="flex flex-row gap-2">
          {cardDataLower.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                navigate(item.path);
              }}
              className="flex-1 group cursor-pointer flex border-2 border-white/40 rounded-lg sm:px-3 sm:py-2 p-1 justify-between"
            >
              <div>
                <div className="text-xs text-white/40 group-hover:text-[#707EF3]">
                  {item.title}
                </div>
                <div className="text-lg group-hover:text-[#707EF3] sm:text-2xl wt">
                  {item.value}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          onClick={() => navigate(`/bonus/${lapsIncome}`)}
          className="flex-1 cursor-pointer flex justify-between py-2 lg:py-0 px-3 rounded-lg bg-gradient-to-r from-[#B6530A] via-[#D0802F] to-[#E2A049]"
        >
          <div className="flex flex-col">
            <div className="flex text-xs items-center gap-1">
              <TriangleAlert size={13} />
              Total Lost Bonus
            </div>
            <span className="text-xl">{lapsIncome ? lapsIncome : "00"} BNB</span>
            <span className="text-xs">Take action now to keep your bonus!</span>
          </div>
          <div className="flex  items-center">
            <img className="h-13 w-13" src={logoSrc} />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-tr p-2 flex-3 rounded-lg from-[#FA1C1E] via-[#AA113B] to-[#620755]">
        <div className="bg-gradient-to-tr from-[#FFEA3A] to-[#FF9A01] h-full rounded-lg p-1">
          <div className="bg-gradient-to-tr flex flex-col items-center text-center py-5 px-2 lg:px-1 from-[#FA1C1E] via-[#AA113B] to-[#620755] rounded-lg h-full">
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
              className="bg-gradient-to-r rounded-lg border-3 border-[#C675D8] w-full py-1 lg:py-[1px] text-nowrap 2xl:text-2xl font-semibold from-[#A326C3] via-[#7B15CC] to-[#5706D6]"
              id="countdown"
            >
              {timeLeft !== null ? formatTime(timeLeft) : "Loading..."}
            </div>
            <button
              id="claim-bonus"
              className={` ${!claimEnabled
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

      <div className="bg-gradient-to-tr p-2 flex-3 rounded-lg from-[#0C044A] via-[#093647] to-[#065D44]">
        <div className="bg-gradient-to-tr from-[#18A93A] to-[#049CE5] h-full rounded-lg p-1">
          <div className="bg-gradient-to-tr flex flex-col items-center text-center py-5 px-2 lg:px-1 from-[#0C044A] via-[#093647] to-[#065D44] rounded-lg h-full">
            <div>Partner VIP Bonus</div>
            <div className="text-[26px]">{vipBonus} BNB</div>
            <div
              onClick={() => {
                navigate("/income/vip");
              }}
              className="text-xs px-3 py-[1px] cursor-pointer rounded bg-white text-black w-fit"
            >
              View Details
            </div>
            <div className="my-3 border-t-[1px] border-white/30 w-full"></div>
            <div className="text-lg">Next bonus unlock after</div>
            <div
              className="bg-gradient-to-r rounded-lg border-3 border-[#C675D8] w-full py-1 lg:py-[1px] text-nowrap 2xl:text-2xl font-semibold from-[#A326C3] via-[#7B15CC] to-[#5706D6]"
              id="countdown"
            >
              {timeLeft2 !== null ? formatTime(timeLeft2) : "Loading..."}
            </div>
            <button
              id="claim-bonus"
              className={` ${!claimEnabled2
                ? "cursor-not-allowed text-white/50 border-2 border-gray-500 bg-gray-700 py-[2px] px-[15px] rounded-[5px] mt-[10px]"
                : "btn-theme3 cursor-pointer"
                }`}
              disabled={!claimEnabled2}
              onClick={handleClaimBonus2}
            >
              Claim Bonus
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardNewDataTop