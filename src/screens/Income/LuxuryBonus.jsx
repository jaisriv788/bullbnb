import Title from "../../component/Title";
import Footer from "../../component/Footer";
import solidLogoSrc from "../../assets/bnbLogo/circle.png";
import { useEffect, useState } from "react";
import { screenLoaderVisibilty } from "../../features/copyModal/copyModalVisiblilty";
import { useSelector, useDispatch } from "react-redux";
import mainAbi from "../../mainAbi.json";
import Web3 from "web3";
import { luxuryData } from "../../data/data";
import { useNavigate } from "react-router";
import img1 from "../../assets/luxury/img1.jpg";
import img2 from "../../assets/luxury/img2.jpg";
import img3 from "../../assets/luxury/img3.jpg";
import img4 from "../../assets/luxury/img4.jpg";
import img5 from "../../assets/luxury/img5.jpg";
import img6 from "../../assets/luxury/img6.jpg";
import img7 from "../../assets/luxury/img7.jpg";

function LuxuryBonus({ openSidebar }) {
  const [royaltyAchived, setRoyaltyAchived] = useState([]);
  const [income, setIncome] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [timerEnded, setTimerEnded] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const img = [img7, img6, img1, img2, img3, img4, img5];
  const walletAddress = useSelector(
    (state) => state.accountDetails.saveMainUserAddress
  );
  const CurrentWalletAddress = useSelector(
    (state) => state.accountDetails.walletAddress
  );
  const mainContractAddress = useSelector(
    (state) => state.accountDetails.mainContractAddress
  );

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}h : ${mins}m : ${secs}s`;
  };

  useEffect(() => {
    if (!mainContractAddress || timerEnded) return;

    let timer;

    async function fetchTimer() {
      try {
        const web3 = new Web3("https://opbnb-mainnet-rpc.bnbchain.org");
        const contract = new web3.eth.Contract(mainAbi, mainContractAddress);
        const royaltyLastDist = await contract.methods.royaltyLastDist().call();

        const futureTimestamp = parseFloat(royaltyLastDist) + 24 * 60 * 60;

        function updateCountdown() {
          const now = Date.now() / 1000;
          const remaining = Math.floor(futureTimestamp - now);
          setTimeLeft(remaining > 0 ? remaining : 0);

          if (remaining <= 0) {
            clearInterval(timer);
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

  const fetchData = async () => {
    try {
      dispatch(screenLoaderVisibilty(true));
      const web3 = new Web3("https://opbnb-mainnet-rpc.bnbchain.org");

      const mainContractInstance = new web3.eth.Contract(
        mainAbi,
        mainContractAddress
      );

      const royaltyAchived = await mainContractInstance.methods
        ._checkRoyaltyAchieved(CurrentWalletAddress)
        .call();

      setRoyaltyAchived(royaltyAchived);

      const income = await mainContractInstance.methods
        .totalroyaltyIncome(CurrentWalletAddress)
        .call();

      const incomeInEtherFloat = income.map((v) =>
        parseFloat(web3.utils.fromWei(v.toString(), "ether"))
      );

      setIncome(incomeInEtherFloat);

      const total = incomeInEtherFloat.reduce((acc, item) => {
        return acc + item;
      }, 0);
      setTotalIncome(total);

      dispatch(screenLoaderVisibilty(false));
    } catch (error) {
      dispatch(screenLoaderVisibilty(false));
      console.error("API Error:", error.response?.data || error.message);
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
        <Title title="Partner Luxury Bonus" />
        <div className=" flex-1 flex flex-col gap-5">
          <div className="flex gap-1 bg-gradient-to-r from-transparent font-bold via-[#B06F03] to-transparent w-full justify-center items-center">
            <div>
              <img className="h-10 w-10" src={solidLogoSrc} />
            </div>
            <div className="flex flex-col text-center">
              <span className="text-sm">Total Earning</span>
              <span className="text-xl">{totalIncome.toFixed(5)} BNB</span>
            </div>
          </div>
          <div className="grid grid-col-1 lg:grid-cols-3 gap-3">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="bg-gradient-to-r overflow-hidden relative flex gap-3 flex-col from-[#F01B22] via-[#A0103F] to-[#640753] p-3 rounded-2xl"
              >
                {royaltyAchived[index] == 0 && (
                  <div className="absolute cursor-not-allowed bg-black/60 w-full h-full top-0 left-0 z-50"></div>
                )}
                <div className="flex gap-3">
                  <div className="border-2 rounded-full p-1 border-dashed ">
                    <img
                      className="h-22 rounded-full"
                      src={img[index]}
                      alt="img"
                    />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-lg">{luxuryData[index].name}</h1>
                    <div>
                      <p className="text-sm">BONUS</p>
                      <h1 className="text-lg font-semibold">
                        {parseFloat(income[index]).toFixed(5)} BNB
                      </h1>
                    </div>
                    <button
                      onClick={() => {
                        navigate(
                          `/income/luxury/details/${
                            luxuryData[index].name
                          }/${parseFloat(income[index]).toFixed(5)}/${index}`
                        );
                      }}
                      className="btn-theme4 rounded-full"
                    >
                      view
                    </button>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <table className="table  border-collapse">
                    <thead className="bg-gradient-to-r text-white from-[#A426C3] via-[#8017CC] to-[#5505D6]">
                      <tr>
                        <th className="border-b border-white/50 w-1/6 min-w-[150px] text-center px-2 py-1">
                          Self Rank
                        </th>
                        <th className="border-l border-b border-white/50 w-1/6 min-w-[150px] text-center px-2 py-1">
                          Direct Team
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gradient-to-r from-black/20 via-black/10 to-black/20">
                      <tr>
                        <td className="text-center">
                          {luxuryData[index].self}
                        </td>
                        <td className="text-center border-l border-white/50">
                          {luxuryData[index].direct}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col mt-5 items-center">
          <div className="text-lg">Next bonus unlock after</div>
          <div
            className="bg-gradient-to-r px-20 rounded-lg border-3 border-[#C675D8]  py-1 lg:py-[1px] text-2xl font-semibold from-[#A326C3] via-[#7B15CC] to-[#5706D6]"
            id="countdown"
          >
            {timeLeft !== null ? formatTime(timeLeft) : "Loading..."}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default LuxuryBonus;
