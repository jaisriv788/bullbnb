import { Download, Eye } from "lucide-react";
import circleSrc from "../assets/bnbLogo/circle.png";
import { useDispatch, useSelector } from "react-redux";
import { todayEarningVisibility } from "../features/copyModal/copyModalVisiblilty";
import axios from "axios";
import { useEffect, useState } from "react";

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

function DashboardFirstBottom({
  totalIncomeInBNB,
  incomeInUSD,
  todayEarningInDollor,
  todayEarningInBNB,
}) {
  const dispatch = useDispatch();
  const currentWalletAddress = useSelector(
    (state) => state.accountDetails.walletAddress
  );
  const data = useSelector((state) => state.dashboardData.userData);
  const loggedInWallet = useSelector(
    (state) => state.accountDetails.saveMainUserAddress
  );
  const baseUrl = useSelector((state) => state.accountDetails.baseUrl);
  const [userData, setUserData] = useState();

  const address = useSelector(
    (state) => state.accountDetails.saveMainUserAddress
  );

  async function fetchData() {
    try {
      const userFormData = new FormData();
      userFormData.append("action", "get_user_info");
      userFormData.append("original_wallet_address", address);

      const userResponse = await axios.post(
        `${baseUrl}api/get-user-data`,
        userFormData
      );
      // console.log(userResponse.data.data);
      setUserData(userResponse.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap gap-3">
      {/* left */}
      <div className="flex-1 p-1 flex gap-1 lg:gap-3 rounded-lg bg-gradient-to-r from-[#EE1A22] via-[#A7103C] to-[#620755] border-2 border-[#bb5d76] ">
        <div className="flex items-center w-8 sm:w-10">
          <img src={circleSrc} className=" h-8 sm:h-10 w-8 sm:w-10" />
        </div>
        <div className="flex items-center gap-1 flex-1 justify-between">
          <div>
            <div className="text-sm ">Total Earning</div>
            <div className=" flex-1 text-nowrap">
              <span className="wt">
                {parseFloat(totalIncomeInBNB).toFixed(4)} BNB
              </span>{" "}
              <span className="text-xs">
                $ {parseFloat(incomeInUSD).toFixed(4)}
              </span>
            </div>
          </div>
          {loggedInWallet == currentWalletAddress && (
            <div
              onClick={() =>
                window.open(
                  `/certificate/${userData?.name}/${
                    rankOptions[data.rank]
                  }/${totalIncomeInBNB}`,
                  "_blank"
                )
              }
              className="btn-theme2 cursor-pointer flex gap-1 items-center mr-2"
            >
              <Download size={15} />
              Certificate
            </div>
          )}
        </div>
      </div>

      {/* bg-gradient-to-r from-[#EE1A22] via-[#A7103C] to-[#620755]  */}
      {/* right */}
      <div className="flex-1 p-1 flex gap-3 rounded-lg border-2 border-[#c08c58] bg-gradient-to-r from-[#B6530A] via-[#D0802F] to-[#E2A049] ">
        <div className="flex items-center w-8 sm:w-10">
          <img src={circleSrc} className=" h-8 sm:h-10 w-8 sm:w-10" />
        </div>
        <div className="flex items-center gap-2 flex-1 justify-between">
          <div>
            <div className="text-sm ">Today Earning</div>
            <div className=" flex-1 text-nowrap">
              <span className="wt">{todayEarningInBNB} BNB</span>{" "}
              <span className="text-xs">$ {todayEarningInDollor}</span>
            </div>
          </div>
          <div
            onClick={() => {
              dispatch(todayEarningVisibility(true));
              // console.log(todayEarningInBNB, todayEarningInDollor);
            }}
            className="btn-theme2 cursor-pointer flex gap-1 items-center mr-2"
          >
            <Eye size={15} />
            View
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardFirstBottom;
