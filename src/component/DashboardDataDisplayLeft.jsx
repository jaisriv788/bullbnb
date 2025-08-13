import bnbSrc from "../assets/bnbLogo/transparent.png";
import rankSrc from "../assets/bnbLogo/rank.png";
import teamSrc from "../assets/bnbLogo/my-team.png";
import groupSrc from "../assets/bnbLogo/direct.png";
import { useSelector, useDispatch } from "react-redux";
import { screenLoaderVisibilty } from "../features/copyModal/copyModalVisiblilty";
import { useEffect } from "react";
import { useNavigate } from "react-router";
// import { path } from "motion/react-client";

function DashboardDataDisplayLeft() {
  const data = useSelector((state) => state.dashboardData.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!data) {
      dispatch(screenLoaderVisibilty(true));
    } else {
      dispatch(screenLoaderVisibilty(false));
    }
  }, [data, dispatch]);

  if (!data) return null;

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

  const rank = rankOptions[data.rank];
  const cardData = [
    {
      title: "Your Current Rank",
      value: rank,
      icon: rankSrc,
    },
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
      title: "Partner luxury bonus",
      value: data?.totalLuxuryBonus + " BNB",
      icon: bnbSrc,
      path: "/income/luxury",
    },
  ];

  const groupedCards = cardData.reduce((acc, item, index) => {
    const row = Math.floor(index / 2);
    if (!acc[row]) acc[row] = [];
    acc[row].push(item);
    return acc;
  }, []);

  const cardDataLower = [
    {
      title: "My Network Partner",
      value: data?.myNetworkPartner,
      icon: teamSrc,
      path: "/team/network",
    },
    {
      title: "My Direct Partner",
      value: data?.myDirectPartner,
      icon: groupSrc,
      path: "/team/direct",
    },
  ];

  return (
    <div className="flex-2 flex flex-col gap-3">
      <div className="flex flex-wrap gap-3 ">
        {groupedCards.map((pair, rowIndex) => (
          <div key={rowIndex} className="flex sm:flex-row flex-col w-full gap-3 justify-between">
            {pair.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  if (i == 0 && rowIndex == 0) {
                    // console.log("hello", i, rowIndex);
                  } else {
                    navigate(item.path);
                  }
                }}
                className="group flex-1 cursor-pointer hover:text-[#707EF3] sm:min-w-[250px] flex border-2 border-white/40 rounded-lg sm:px-3 sm:py-2 p-1 justify-between"
              >
                <div>
                  <div className="text-sm text-white/40 group-hover:text-[#707EF3]">
                    {item.title}
                  </div>
                  <div className="text-xl sm:text-2xl font-semibold">
                    {item.value}
                  </div>
                </div>
                <div className="sm:w-14 w-10 flex items-center">
                  <img
                    src={item.icon}
                    className="sm:h-14 sm:w-14 w-10 "
                    alt="icon"
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex lg:flex-row flex-col gap-3">
        {cardDataLower.map((item, i) => (
          <div
            key={i}
            onClick={() => {
              navigate(item.path);
            }}
            className="flex-1 group cursor-pointer sm:min-w-[250px] flex border-2 border-white/40 rounded-lg sm:px-3 sm:py-2 p-1 justify-between"
          >
            <div>
              <div className="text-sm text-white/40 group-hover:text-[#707EF3]">
                {item.title}
              </div>
              <div className="text-xl group-hover:text-[#707EF3] sm:text-2xl font-semibold">
                {item.value}
              </div>
            </div>
            <div className="sm:w-14 w-10 flex items-center">
              <img
                src={item.icon}
                className="sm:h-14 sm:w-14 w-10"
                alt="icon"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardDataDisplayLeft;
