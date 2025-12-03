import Title from "../component/Title";
import solidLogoSrc from "../assets/bnbLogo/circle.png";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { screenLoaderVisibilty } from "../features/copyModal/copyModalVisiblilty";
import Web3 from "web3";
import { useNavigate } from "react-router";
import mainAbi from "../mainAbi.json"
import Footer from "../component/Footer";
import { vipData } from "../data/data";
import Loader from "../assets/logos/loader.gif"
import { Rank } from "../data/data";

const arr = [4, 5, 6, 7, 8, 9];
const arr2 = [6, 5, 4, 3, 2, 1]
const arr3 = ["directorAndBelow", "Star", "Champion", "Mentor", "Titan", "platinumAndAbove"]
function Vip({ openSidebar }) {
    const [totalIncome, setTotalIncome] = useState(0);
    const [royaltyAchived, setRoyaltyAchived] = useState([]);
    const [income, setIncome] = useState([]);
    const [timeLeft, setTimeLeft] = useState(null);
    const [timerEnded, setTimerEnded] = useState(false);
    const [rankCount, setRankCount] = useState({
        directorAndBelow: 0,
        platinumAndAbove: 0,
        Star: 0,
        Champion: 0,
        Mentor: 0,
        Titan: 0
    })

    const CurrentWalletAddress = useSelector(
        (state) => state.accountDetails.walletAddress
    );
    const walletAddress = useSelector(
        (state) => state.accountDetails.saveMainUserAddress
    );
    const mainContractAddress = useSelector(
        (state) => state.accountDetails.mainContractAddress
    );
    const userData = useSelector(
        (state) => state.dashboardData.userData
    );
    const backupWalletAddress = useSelector(
        (state) => state.accountDetails.saveMainUserAddress
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Contract 

    const web3 = new Web3("https://opbnb-mainnet-rpc.bnbchain.org");
    const contract = new web3.eth.Contract(mainAbi, mainContractAddress);



    useEffect(() => {
        if (!mainContractAddress || timerEnded) return;

        let timer;

        async function fetchTimer() {
            try {
                const web3 = new Web3("https://opbnb-mainnet-rpc.bnbchain.org");
                const contract = new web3.eth.Contract(mainAbi, mainContractAddress);
                const thirtyDays = 30n * 24n * 60n * 60n;
                const royaltyLastDist = await contract.methods.vipLastDist().call();
                const vipLastDist = BigInt(royaltyLastDist) + thirtyDays;
                const futureTimestamp = parseFloat(vipLastDist) + 24 * 60 * 60;

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
                ._checkVipAchieved(CurrentWalletAddress)
                .call();

            // console.log("royaltyAchived:", { royaltyAchived });
            setRoyaltyAchived(royaltyAchived);

            const income = await mainContractInstance.methods
                .totalvipIncome(CurrentWalletAddress)
                .call();

            console.log("income:", { income });

            const incomeInEtherFloat = income.map((v) =>
                parseFloat(web3.utils.fromWei(v.toString(), "ether"))
            );

            // console.log("incomeInEtherFloat:", { incomeInEtherFloat });
            setIncome(incomeInEtherFloat);

            const total = incomeInEtherFloat.reduce((acc, item) => {
                return acc + item;
            }, 0);
            setTotalIncome(total);

            // console.log("totalIncome:", { total });
            dispatch(screenLoaderVisibilty(false));
        } catch (error) {
            dispatch(screenLoaderVisibilty(false));
            console.error("API Error:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const formatTime = (seconds) => {
        const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
        const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
        const secs = String(seconds % 60).padStart(2, "0");
        return `${hrs}h : ${mins}m : ${secs}s`;
    };






    // Get partners



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
                // console.log("Fetched partners:", partners);
                // const ids = partners.map((item) => item[0].id);
                // const partnerAddresses = partners.map((item) => item.user || item[0]);

                const userDetails = await Promise.all(
                    partners.map(async (addr) => {
                        try {
                            const uData = await contract.methods.users(addr).call();
                            // console.log(uData);
                            return { rank: parseInt(uData.currentPackage) };
                        } catch (err) {
                            console.error("Error loading user data for:", addr, err);
                            return { address: addr, id: null };
                        }
                    })
                );

                console.log({ userDetails, Rank });

                const rankCount = {
                    directorAndBelow: 0,
                    platinumAndAbove: 0,
                    Star: 0,
                    Champion: 0,
                    Mentor: 0,
                    Titan: 0
                };

                userDetails.forEach(user => {
                    // Adjust because user.rank is +1
                    const r = user.rank - 1;

                    // 1️⃣ Director & Below (0–4)
                    if (r <= 4) {
                        rankCount.directorAndBelow++;
                    }

                    // 2️⃣ Platinum & Above (9–14)
                    else if (r >= 9) {
                        rankCount.platinumAndAbove++;
                    }

                    // 3️⃣ Middle ranks → individually
                    else if (r === 5) {
                        rankCount.Star++;
                    }
                    else if (r === 6) {
                        rankCount.Champion++;
                    }
                    else if (r === 7) {
                        rankCount.Mentor++;
                    }
                    else if (r === 8) {
                        rankCount.Titan++;
                    }
                });

                console.log(rankCount)
                setRankCount(rankCount);

            } catch (error) {
                console.log("Error fetching partners:", error);
            }
        };

        fetchPartners();
    }, [walletAddress, mainContractAddress]);



    // get partners end





    return (
        <div
            className={`absolute inset-0 overflow-auto backdrop-blur-[1px] ${walletAddress == CurrentWalletAddress
                ? "bg-black/60"
                : "bg-[#490D0D]/80"
                }  flex justify-center sm:py-4 ${openSidebar && "lg:pr-10 xl:pr-30"}`}
        >
            {" "}
            <div
                className={`${openSidebar ? "w-[90%] lg:w-full" : "w-[90%] lg:w-[80%]"
                    } flex flex-col sm:px-5 max-w-[1320px]`}
            >
                <Title title="Partner VIP Bonus" />
                <div className=" flex-1 flex flex-col gap-5">
                    <div className="flex gap-1 bg-gradient-to-r from-transparent via-[#B06F03] to-transparent w-full justify-center items-center">
                        <div>
                            <img className="h-10 w-10" src={solidLogoSrc} />
                        </div>
                        <div className="flex flex-col text-center">
                            <span className="text-sm">Total Earning</span>
                            <span className="text-xl">{totalIncome.toFixed(5)} BNB</span>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="w-full bg-white/10 border-2 border-white/30 rounded-xl p-4 flex flex-col items-center backdrop-blur-sm">

                                {/* Top Value */}
                                <div className="text-white text-2xl font-[500] mb-3">
                                    {parseFloat(income[index]).toFixed(5)} BNB
                                </div>

                                {/* Rank Boxes */}
                                <div className="w-full border border-white/20 rounded-lg overflow-hidden">

                                    {/* Gradient Header Row */}
                                    <div className="grid grid-cols-2 text-center">

                                        {/* Self Rank */}
                                        <div className="py-2 font-semibold text-xs text-white border-r border-white/20
                bg-gradient-to-r from-[#A426C2] to-[#8218CB]">
                                            Self Rank
                                        </div>

                                        {/* Direct Refer */}
                                        <div className="py-2 font-semibold text-xs text-white
                bg-gradient-to-r from-[#8218CB] to-[#5605D7]">
                                            Direct Refer
                                        </div>
                                    </div>

                                    {/* Value Row */}
                                    <div className="grid border-b border-white/20 grid-cols-2 text-center">

                                        <div className="py-1 text-white text-xs border-r border-white/20">
                                            {vipData[index].rank}
                                        </div>

                                        <div className="py-1 text-white text-xs">
                                            {vipData[index].refer}
                                        </div>
                                    </div>

                                    {/* Green Check Icons Row */}
                                    <div className="grid grid-cols-2 text-center">

                                        <div className="py-2 border-r border-white/20 flex justify-center">
                                            {/* {userData.rank}{arr[index]} */}
                                            {userData.rank >= arr[index] + 1 ? <div className="py-2 flex justify-center">
                                                <img
                                                    src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
                                                    className="w-[15px] h-[15px]"
                                                    alt="check"
                                                />

                                            </div> : <img
                                                src={Loader}
                                                className="w-[15px] h-[15px]"
                                                alt="check"
                                            />}

                                        </div>

                                        <div className="py-2 flex justify-center items-center">
                                            {/* {arr2[index]} {rankCount[arr3[index]]} */}
                                            {arr2[index] <= rankCount[arr3[index]] ? <img
                                                src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
                                                className="w-[15px] h-[15px]"
                                                alt="check"
                                            /> : <img
                                                src={Loader}
                                                className="w-[15px] h-[15px]"
                                                alt="check"
                                            />}


                                        </div>
                                    </div>
                                </div>

                                {/* Details Button */}
                                <button onClick={() => {
                                    // navigate(
                                    //     `/income/vip/details/${vipData[index].rank
                                    //     }/${parseFloat(income[index]).toFixed(5)}/${index}`
                                    // );
                                    navigate(
                                        `/income/vip/details/${encodeURIComponent("VIP Bonus History")}/${parseFloat(income[index]).toFixed(5)}/${index}`
                                    );

                                }} className="btn-theme2 cursor-pointer mt-2">
                                    Details
                                </button>
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
    )
}

export default Vip