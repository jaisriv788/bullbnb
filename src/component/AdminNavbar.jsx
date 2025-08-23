import { AlignJustify, X } from "lucide-react";
import bannerSrc from "../assets/logos/bullbnb.png";
import { useNavigate } from "react-router";
import iconSrc from "../assets/bg2.png";
import {
  isAdmin,
  removeAddress,
  saveMainUser,
} from "../features/walletAddress/web3WalletInfo";
import { useSelector, useDispatch } from "react-redux";

function AdminNavbar({ handleSidebar, openSidebar }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ownerAddress = useSelector(
    (state) => state.accountDetails.walletAddress
  );

  const ownerBackupAddress = useSelector(
    (state) => state.accountDetails.saveMainUserAddress
  );

  const disconnectWallet = () => {
    handleSidebar(false);
    dispatch(removeAddress());
    dispatch(saveMainUser(0));
    dispatch(isAdmin(false));
    sessionStorage.clear();
    navigate("/admin/login");
  };

  return (
    <div
      className={`text-white ${
        ownerAddress == ownerBackupAddress ? "bg-[#01051D]" : "bg-[#791610]"
      } px-[4%] sm:px-[8%] py-3 flex justify-between items-center w-full`}
    >
      <div className="flex items-center gap-1 sm:gap-5">
        <AlignJustify
          className="cursor-pointer"
          onClick={() => {
            const newState = !openSidebar;
            handleSidebar(newState);
          }}
          size={30}
          strokeWidth={1.6}
        />
        <img
          src={iconSrc}
          onClick={() => navigate("/dashboard")}
          className="cursor-pointer h-12  sm:hidden"
        />
        <img
          src={bannerSrc}
          onClick={() => navigate("/dashboard")}
          className="cursor-pointer h-10 hidden sm:block"
        />
      </div>

      <div className="flex sm:gap-5 gap-1">
        <button className="relative group overflow-hidden border-[1.8px] border-[#E39B28] rounded-md h-8 text-sm font-semibold text-white cursor-pointer">
          <span className="relative z-10 connect-btn">
            {ownerAddress.slice(0, 4) + "..." + ownerAddress.slice(-4)}
          </span>
        </button>

        <button
          onClick={disconnectWallet}
          className="relative group overflow-hidden border-[1.8px] border-[#E39B28] rounded-md h-8 text-sm font-semibold text-white cursor-pointer"
        >
          <span className="relative z-10 connect-btn">Logout</span>
        </button>
      </div>
    </div>
  );
}

export default AdminNavbar;
