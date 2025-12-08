import { useDispatch, useSelector } from "react-redux";
import { totalEarningVisibility } from "../features/copyModal/copyModalVisiblilty";
import solidLogoSrc from "../assets/logos/bullbnb.png";
import { useEffect, useState } from "react";
import ribbonSrc from "../assets/View/ribbon.png";
import umbrellaBg from "../assets/View/bg-light.png";
import { X } from "lucide-react";
import circleIconSrc from "../assets/bnbLogo/circle.png";

function TotalEarning() {
    const dispatch = useDispatch();
    const [money, setMoney] = useState(0);
    const todayEarnings = useSelector((state) => state.dashboardData.userData);

    async function fetchData() {
        const bnbPriceRes = await fetch(
            "https://min-api.cryptocompare.com/data/price?fsym=BNB&tsyms=USD"
        );

        console.log({ todayEarnings })
        const bnbPriceData = await bnbPriceRes.json();
        const bnbPriceUSD = bnbPriceData?.USD || 0;

        const incomeInUSD = (todayEarnings.totalIncomeInBNB * bnbPriceUSD).toFixed(
            5
        );
        setMoney(incomeInUSD);
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div
            onClick={() => {
                dispatch(totalEarningVisibility(false));
            }}
            className="absolute z-90 top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative border-[#DEBC57] sm:p-2 border-3 text-white rounded-3xl shadow-lg flex flex-col h-[370px] w-[320px] sm:w-[380px] items-center gap-2 sm:gap-4"
                style={{
                    backgroundImage: "radial-gradient(circle, #9f1308 0%, #280902 100%)",
                }}
            >
                <span
                    onClick={() => {
                        dispatch(totalEarningVisibility(false));
                    }}
                    className="absolute flex items-center rounded-full cursor-pointer -top-7 -right-7 justify-center h-6 w-6 text-black bg-white"
                >
                    <X size={20} />
                </span>
                <img className="absolute -top-9 z-50 w-[320px]" src={ribbonSrc} />
                <img
                    className="absolute -top-5 z-30 animate-spin"
                    style={{ animationDuration: "18s" }}
                    src={umbrellaBg}
                    alt=""
                />
                <div className="flex flex-col gap-3 items-center bg-[radial-gradient(circle,rgba(200,30,30,1)_0%,_rgba(69,10,10,0.3)_70%,_rgba(69,10,10,0.3)_100%)] rounded-3xl w-full h-full z-40 absolute top-0 left-0">
                    <img className=" w-55 mt-7" src={solidLogoSrc} />
                    <div className="flex flex-col w-full px-4">
                        <div className="flex justify-between w-full border-b border-white/40 py-1">
                            <div>Partner Sponsor Bonus</div>
                            <div>{todayEarnings.totalPartnerSponsorBonus} BNB</div>
                        </div>
                        <div className="flex justify-between w-full border-b border-white/40 py-1">
                            <div>Partner Direct Kick Bonus</div>
                            <div>{todayEarnings.totalPartnerDirectKickBonus} BNB</div>
                        </div>
                        <div className="flex justify-between w-full border-b border-white/40 py-1">
                            <div>Partner Level Bonus</div>
                            <div>{todayEarnings.totalPartnerLevelBonus} BNB</div>
                        </div>
                        <div className="flex justify-between w-full border-b border-white/40 py-1">
                            <div>Partner Pool Bonus</div>
                            <div>{todayEarnings.totalPoolLevelIncome} BNB</div>
                        </div>
                        <div className="flex justify-between w-full border-b border-white/40 py-1">
                            <div>Partner Luxury Bonus</div>
                            <div>{todayEarnings.totalLuxuryBonus} BNB</div>
                        </div>
                        <div className="flex justify-between w-full">
                            <div>Partner Vip Bonus</div>
                            <div>{todayEarnings.vipBonus} BNB</div>
                        </div>
                    </div>
                    <div className="w-11/12 overflow-hidden flex rounded-full  border-3 bg-gradient-to-r from-[#951FC6] to-[#5806D6] border-[#BA70DB]">
                        <img className="h-14" src={circleIconSrc} />
                        <div className=" text-center flex-1">
                            <div className="text-xl font-semibold">Today Earning 123</div>
                            <div className="text-lg font-semibold">
                                {todayEarnings.todayEarningInBnb} BNB ($ {money})
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TotalEarning;