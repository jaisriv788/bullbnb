import { Copy } from "lucide-react";
import centralImageSrc from "../assets/logos/ring-transparent.png";
import imgSrc from "../assets/logos/ring-text.png";
import iconSrc from "../assets/icon/icon.png";
import { copyModalVisibilty } from "../features/copyModal/copyModalVisiblilty";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

function DashboardFirstTop({ walletAddress, usersData, id, referer }) {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState();

  const address = useSelector(
    (state) => state.accountDetails.saveMainUserAddress
  );
  const baseUrl = useSelector((state) => state.accountDetails.baseUrl);

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
  const handleCopy = () => {
    navigator.clipboard
      .writeText(`http://bullbnb.com/reactdemo/registration/${id}`)
      .then(() => {
        dispatch(copyModalVisibilty(true));
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="flex flex-wrap gap-5">
      {/* left */}
      <div className="flex-1 flex justify-between sm:justify-start relative gap-3">
        <div className="flex items-center">
          <div className="relative flex items-center justify-center w-[70px] aspect-square">
            <img
              className="h-full rounded-full"
              src={
                usersData?.profile_image
                  ? `${baseUrl}user/${usersData?.profile_image}`
                  : imgSrc
              }
            />
            <img
              className="absolute animate-spin"
              style={{ animationDuration: "15s" }}
              src={centralImageSrc}
            />
          </div>
        </div>
        <div className=" flex flex-col gap-1 justify-center">
          <div className="flex items-center gap-3">
            <div className="font-semibold lg:text-lg">
              {userData?.name ? userData?.name : "Bull BNB"}
            </div>
            <div className="text-sm px-2 rounded-lg text-[#FFEB3B] bg-[#1F1F1F] font-semibold">
              ID {id}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm">
              {walletAddress &&
                walletAddress?.slice(0, 5) + "..." + walletAddress?.slice(-4)}
              {/* {walletAddress.slice(0, 5) + "..." + walletAddress.slice(-4)} */}
            </div>
            <Copy
              onClick={() => {
                navigator.clipboard.writeText(walletAddress);
              }}
              className="-rotate-90 text-blue-800 cursor-pointer"
              size={15}
            />
          </div>
          <div className="flex text-nowrap items-center gap-3">
            <div className="text-xs">Invited By</div>
            <div className="text-sm px-2 rounded-lg bg-[#1F1F1F]  font-semibold">
              ID {!referer || referer == "0" ? "No Referral..." : referer}
            </div>
          </div>
        </div>
      </div>

      {/* right */}
      <div className="flex-1 bg-[#432B2B]/80 rounded-xl flex flex-col justify-center gap-3">
        <div className="font-semibold mx-3">My Referral Id</div>
        <div className="mx-3 pb-2 md:pb-0 text-sm flex justify-between">
          <div className="flex gap-2 items-center">
            <img src={iconSrc} style={{ height: "25px" }} />
            {id}
          </div>
          <div
            onClick={handleCopy}
            className="flex items-center gap-2 px-2 rounded border-1 hover:border-blue-700 cursor-pointer border-[#b07cbe] bg-gradient-to-r from-[#A225C4] to-[#5D08D4] "
          >
            <Copy size={15} /> Copy
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardFirstTop;
