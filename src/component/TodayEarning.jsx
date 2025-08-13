import { useDispatch, useSelector } from "react-redux";
import { todayEarningVisibility } from "../features/copyModal/copyModalVisiblilty";
import solidLogoSrc from "../assets/logos/bullbnb.png";
import { useEffect, useState } from "react";
import ribbonSrc from "../assets/View/ribbon.png";
import umbrellaBg from "../assets/View/bg-light.png";
import { X } from "lucide-react";
import circleIconSrc from "../assets/bnbLogo/circle.png";

function TodayEarning() {
  const dispatch = useDispatch();
  const [money, setMoney] = useState(0);
  const todayEarnings = useSelector((state) => state.dashboardData.userData);

  async function fetchData() {
    const bnbPriceRes = await fetch(
      "https://min-api.cryptocompare.com/data/price?fsym=BNB&tsyms=USD"
    );

    const bnbPriceData = await bnbPriceRes.json();
    const bnbPriceUSD = bnbPriceData?.USD || 0;

    const incomeInUSD = (todayEarnings.todayEarningInBnb * bnbPriceUSD).toFixed(
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
        dispatch(todayEarningVisibility(false));
      }}
      className="absolute z-90 top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative border-[#DEBC57] p-2 border-3 text-white rounded-3xl shadow-lg flex flex-col h-[340px] w-[380px] items-center gap-4"
        style={{
          backgroundImage: "radial-gradient(circle, #9f1308 0%, #280902 100%)",
        }}
      >
        <span
          onClick={() => {
            dispatch(todayEarningVisibility(false));
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
              <div>{todayEarnings.todayPartnerSponsorBonus} BNB</div>
            </div>
            <div className="flex justify-between w-full border-b border-white/40 py-1">
              <div>Partner Direct Kick Bonus</div>
              <div>{todayEarnings.todayPartnerDirectKickBonusPercent} BNB</div>
            </div>
            <div className="flex justify-between w-full border-b border-white/40 py-1">
              <div>Partner Level Bonus</div>
              <div>{todayEarnings.todayPartnerLevelBonus} BNB</div>
            </div>
            <div className="flex justify-between w-full border-b border-white/40 py-1">
              <div>Partner Pool Bonus</div>
              <div>{todayEarnings.todayPartnerPoolBonus} BNB</div>
            </div>
            <div className="flex justify-between w-full">
              <div>Partner Luxury Bonus</div>
              <div>{todayEarnings.todayLuxuryBonus} BNB</div>
            </div>
          </div>
          <div className="w-11/12 overflow-hidden flex rounded-full  border-3 bg-gradient-to-r from-[#951FC6] to-[#5806D6] border-[#BA70DB]">
            <img className="h-14" src={circleIconSrc} />
            <div className=" text-center flex-1">
              <div className="text-xl font-semibold">Today Earning</div>
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

export default TodayEarning;

//  <div className="absolute z-90 top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center">
//       <div className="bg-[#262626] border-white border-1 pb-5 text-white px-6 py-5 rounded-lg shadow-lg flex flex-col w-[500px] items-center gap-4">
//         <div className="flex gap-1 bg-gradient-to-r from-transparent font-bold via-[#B06F03] to-transparent w-full justify-center items-center">
//           <div>
//             <img className="h-10 w-10" src={solidLogoSrc} />
//           </div>
//           <div className="flex flex-col text-center">
//             <span className="text-sm">Today Earning</span>
//             <span className="text-xl">
//               {todayEarnings.todayEarningInBnb} BNB $ {money}
//             </span>
//           </div>
//         </div>

//         <div className="bg-gradient-to-r text-sm from-[#A52C00] via-[#B06F03] border-2 border-[#C93400] to-[#A52C00] w-full p-1 rounded-lg">
//           <table className=" w-full">
//             <tbody>
//               <tr className="border-b-1 border-white/40 text-white/90">
//                 <td className="w-2/3">Partner Sponsor Bonus</td>
//                 <td className="border-l-1 border-white/40 flex justify-center">
//                   {todayEarnings.todayPartnerSponsorBonus} BNB
//                 </td>
//               </tr>
//               <tr className="border-b-1 border-white/40 text-white/90">
//                 <td className="w-2/3">Partner Direct kick Bonus</td>
//                 <td className=" border-l-1 border-white/40 flex justify-center">
//                   {todayEarnings.todayPartnerDirectKickBonusPercent} BNB
//                 </td>
//               </tr>
//               <tr className="border-b-1 border-white/40 text-white/90">
//                 <td className="w-2/3">Partner Level Bonus</td>
//                 <td className=" border-l-1 border-white/40 flex justify-center">
//                   {todayEarnings.todayPartnerLevelBonus} BNB
//                 </td>
//               </tr>
//               <tr className="border-b-1 border-white/40 text-white/90">
//                 <td className="w-2/3">Partner Pool Bonus</td>
//                 <td className=" border-l-1 border-white/40 flex justify-center">
//                   {todayEarnings.todayPartnerPoolBonus} BNB
//                 </td>
//               </tr>
//               <tr className="text-white/90">
//                 <td className="w-2/3">Partner Luxury Bonus</td>
//                 <td className=" border-l-1 border-white/40 flex justify-center">
//                   {todayEarnings.todayLuxuryBonus} BNB
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         <button
//           onClick={() => {
//             dispatch(todayEarningVisibility(false));
//           }}
//           className="cursor-pointer w-full py-1 transition ease-in-out duration-300 hover:text-black hover:bg-yellow-500  font-semibold rounded-md border-1 border-yellow-500 text-yellow-400 text-lg "
//         >
//           Close
//         </button>
//       </div>
//     </div>
