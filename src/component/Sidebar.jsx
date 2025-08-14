// Sidebar.jsx
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SidebarContent } from "../data/data";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import youtubeSrc from "../assets/logos/youtube.png";
import twitter from "../assets/logos/twitter.png";
import telegram from "../assets/logos/telegram.png";
import { useSelector } from "react-redux";

function Sidebar({ handleSidebar }) {
  const [activeItemId, setActiveItemId] = useState(null);
  const [sidebarWidth, setSidebarWidth] = useState(
    window.innerWidth >= 1024 ? 450 : 350
  );
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setSidebarWidth(window.innerWidth >= 1024 ? 450 : 350);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentWalletAddress = useSelector(
    (state) => state.accountDetails.walletAddress
  );
  const loggedInWallet = useSelector(
    (state) => state.accountDetails.saveMainUserAddress
  );

  const handleNavigate = (path) => {
    navigate(path);
    if (window.innerWidth < 1024) {
      handleSidebar(false); // Close sidebar immediately for mobile/tablet
    }
  };

  return (
    <motion.div
      key="sidebar"
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: sidebarWidth, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="absolute lg:relative top-16 lg:top-0 left-0 z-50 lg:z-0 h-full"
    >
      <div
        className={`custom-scrollbar h-full w-full lg:pl-30 overflow-y-auto px-8 py-5 flex flex-col gap-2 backdrop-blur-md ${
          loggedInWallet == currentWalletAddress
            ? "bg-[#232325] lg:bg-black/60"
            : "bg-[#232325] lg:bg-[#490D0D]"
        } text-white`}
      >
        {SidebarContent.map((data) => {
          const Icon = data.icon;
          const isOpen = activeItemId === data.id;

          const onMainClick = () => {
            if (data.path) {
              handleNavigate(data.path);
            }
            if (data.subRoute) {
              setActiveItemId((prev) => (prev === data.id ? null : data.id));
            }
          };

          return (
            <div key={data.id}>
              {data.id == 2 ? (
                currentWalletAddress == loggedInWallet && (
                  <div
                    onClick={onMainClick}
                    className={`flex hover:bg-[#0E0E0E]  bg-[#201F1F] lg:bg-transparent items-center gap-3 bdr px-4 py-3 rounded-lg cursor-pointer`}
                  >
                    <Icon size={18} />
                    <div className="text-sm">{data.name}</div>
                    {data.subRoute && (
                      <div className="ml-auto">
                        {isOpen ? <ChevronUp /> : <ChevronDown />}
                      </div>
                    )}
                  </div>
                )
              ) : (
                <div
                  onClick={onMainClick}
                  className={`flex ${
                    currentWalletAddress == loggedInWallet
                      ? "hover:bg-[#0E0E0E]"
                      : "hover:bg-[#791610]"
                  }  bg-[#201F1F] lg:bg-transparent items-center gap-3 bdr px-4 py-3 rounded-lg cursor-pointer`}
                >
                  <Icon size={18} />
                  <div className="text-sm">{data.name}</div>
                  {data.subRoute && (
                    <div className="ml-auto">
                      {isOpen ? <ChevronUp /> : <ChevronDown />}
                    </div>
                  )}
                </div>
              )}

              <AnimatePresence initial={false}>
                {isOpen && data.subRoute && (
                  <motion.div
                    key="submenu"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="ml-6 mt-2 flex flex-col gap-1"
                  >
                    {data.subRoute.map((sub) => {
                      const SubIcon = sub.icon;
                      return (
                        <div
                          key={sub.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNavigate(sub.path);
                          }}
                          className="flex items-center gap-2 text-[14px] font-semibold hover:text-[#E69019] cursor-pointer"
                        >
                          <SubIcon size={8} />
                          <span>{sub.name}</span>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
        <div className="flex py-3 mt-3 justify-evenly border-t-2 border-[#474747]">
          <a
            href="https://www.youtube.com/@opBullBNB"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="h-9 rounded-full p-[1px] cursor-pointer bg-white"
              src={youtubeSrc}
              alt="youtube"
            />
          </a>
          <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
            <img
              className="h-9 rounded-full p-[1px] cursor-pointer bg-white"
              src={twitter}
              alt="twitter"
            />
          </a>
          <a
            href="https://t.me/opBullBNB_bot"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="h-9 rounded-full p-[1px] cursor-pointer bg-white"
              src={telegram}
              alt="telegram"
            />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default Sidebar;
