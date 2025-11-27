import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import bnbSrc from "../assets/bnbLogo/transparent.png";

function DashboardNewDataBottom() {
    const navigate = useNavigate();

    const data = useSelector((state) => state.dashboardData.userData);

    const cardData = [
        {
            title: "Partner Sponsor Bonus",
            value: data?.totalPartnerSponsorBonus + " BNB",
            icon: bnbSrc,
            path: "/income/sponsor",
        },
        {
            title: "Partner Direct kick Bonus",
            value: data?.totalPartnerDirectKickBonus + " BNB",
            icon: bnbSrc,
            path: "/income/direct",
        },
        {
            title: "Partner Level Bonus",
            value: data?.totalPartnerLevelBonus + " BNB",
            icon: bnbSrc,
            path: "/income/level",
        },
        {
            title: "Partner Pool Bonus",
            value: data?.totalPoolLevelIncome + " BNB",
            icon: bnbSrc,
            path: "/income/pool",
        },
        {
            title: "Partner luxury Bonus",
            value: data?.totalLuxuryBonus + " BNB",
            icon: bnbSrc,
            path: "/income/luxury",
        },
        {
            title: "Partner VIP Bonus",
            value: "0.00 BNB",
            icon: bnbSrc,
            path: "/income/luxury",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {cardData.map((item, index) => (
                <div
                    key={index}
                    onClick={() => {
                        navigate(item.path);
                    }}
                    className="group w-full cursor-pointer hover:text-[#707EF3] flex border-2 border-white/40 rounded-lg sm:px-3 sm:py-2 p-1 justify-between"
                >
                    <div>
                        <div className="text-xs sm:text-sm text-white/40 group-hover:text-[#707EF3]">
                            {item.title}
                        </div>
                        <div className="text-lg sm:text-2xl wt">{item.value}</div>
                    </div>
                    <div className="sm:w-14 w-10 flex items-center">
                        <img
                            src={item.icon}
                            className="sm:h-10 sm:w-10 w-10"
                            alt="icon"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DashboardNewDataBottom;
