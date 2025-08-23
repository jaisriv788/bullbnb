import { AlignJustify, X } from "lucide-react";
import bannerSrc from "../assets/logos/bullbnb.png";
import { useLocation, useNavigate } from "react-router";
import OptionalTopDiv from "../component/OptionalTopDiv";
import iconSrc from "../assets/bg2.png";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  removeAddress,
  isConnected,
  removeId,
} from "../features/walletAddress/web3WalletInfo";
import { clearUserData } from "../features/dashboardData/dashboardDataInfo";

function Navbar({ handleSidebar, openSidebar }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isProfilePage = location.pathname === "/profile";

  const ownerAddress = useSelector(
    (state) => state.accountDetails.walletAddress
  );

  const ownerBackupAddress = useSelector(
    (state) => state.accountDetails.saveMainUserAddress
  );

  // const [handleIcon, setHandleIcon] = useState(false);

  // useEffect(() => {
  //   setHandleIcon(openSidebar);
  // }, [openSidebar]);

  const disconnectWallet = () => {
    handleSidebar(false);
    dispatch(removeAddress());
    dispatch(removeId());
    dispatch(clearUserData());
    dispatch(isConnected(false));
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div
      className={`text-white ${
        ownerAddress == ownerBackupAddress ? "bg-[#01051D]" : "bg-[#791610]"
      } px-[4%] sm:px-[8%] py-3 flex justify-between items-center w-full`}
    >
      <div className="flex items-center gap-1 sm:gap-5">
        {/* <AnimatePresence mode="wait" initial={false}>
          {!handleIcon ? (
            <motion.div
              key="menu"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
              className="h-full cursor-pointer"
            > */}
        <AlignJustify
          className="cursor-pointer"
          onClick={() => {
            const newState = !openSidebar;
            // setHandleIcon(newState);
            handleSidebar(newState);
          }}
          size={30}
          strokeWidth={1.6}
        />
        {/* </motion.div>
          ) : (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
              className="h-full cursor-pointer"
            >
              <X
                onClick={() => {
                  setHandleIcon((prev) => !prev);
                  handleSidebar(false);
                }}
                size={30}
                strokeWidth={1.6}
              />
            </motion.div>
          )}
        </AnimatePresence> */}
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

      {!isProfilePage && (
        <OptionalTopDiv css="hidden lg:flex lg:gap-3 xl:gap-10 py-2 px-2" />
      )}

      <div className="flex sm:gap-5 gap-1">
        <button
          onClick={() => {
            if (ownerAddress) {
              navigator.clipboard
                .writeText(ownerAddress)
                .then(() => {
                  console.log("Address Copied");
                })
                .catch((err) => {
                  console.error("Failed to copy:", err);
                });
            }
          }}
          className="relative group overflow-hidden border-[1.8px] border-[#E39B28] rounded-md h-8 text-sm font-semibold text-white cursor-pointer"
        >
          {/* <span className="absolute inset-0 bg-gradient-to-r from-[#BE340F] via-[#C44316] to-[#DE8231] transition-opacity duration-500 opacity-100 group-hover:opacity-0"></span> */}
          {/* <span className="absolute inset-0 bg-gradient-to-r from-[#DE8231] via-[#C44316] to-[#BE340F] transition-opacity duration-500 opacity-0 group-hover:opacity-100"></span> */}
          <span className="relative z-10 connect-btn">
            {ownerAddress &&
              ownerAddress.slice(0, 5) + "..." + ownerAddress.slice(-4)}
          </span>
        </button>
        {ownerAddress !== 0 && (
          <button
            onClick={disconnectWallet}
            className="relative group overflow-hidden border-[1.8px] border-[#E39B28] rounded-md h-8 text-sm font-semibold text-white cursor-pointer"
          >
            {/* <span className="absolute inset-0 bg-gradient-to-r from-[#BE340F] via-[#C44316] to-[#DE8231] transition-opacity duration-500 opacity-100 group-hover:opacity-0"></span> */}
            {/* <span className="absolute inset-0 bg-gradient-to-r from-[#DE8231] via-[#C44316] to-[#BE340F] transition-opacity duration-500 opacity-0 group-hover:opacity-100"></span> */}
            <span className="relative z-10 connect-btn">Logout</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
