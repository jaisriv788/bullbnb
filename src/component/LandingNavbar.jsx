import { useNavigate, useLocation, useMatch } from "react-router";
import ringSrc from "../assets/logos/ring-text.png";
import centralImageSrc from "../assets/logos/ring-transparent.png";
import { useState } from "react";
import Error from "../component/Error";
//redux
import { useSelector } from "react-redux";

import Web3 from "web3";
import mainAbi from "../mainAbi.json";

function LandingNavbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showError, setShowError] = useState(false);
  const [msg, setMsg] = useState("");
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";
  const isRegistrationPage =
    useMatch("/registration/:id") || location.pathname === "/registration";
  const idDownloadPage = location.pathname === "/download";
  const isHomePage = location.pathname === "/";

  const ownerAddress = useSelector(
    (state) => state.accountDetails.walletAddress
  );
  const mainContractAddress = useSelector(
    (state) => state.accountDetails.mainContractAddress
  );

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        // console.log({ accounts });
        const address = account[0];
        //  "0xab513BA75c3544532DC4499F2Ee025164c9dc966"; 808900863
        // console.log(address);
        // accounts[0]
        // "0x5289CA577B00E87c72671a55Ce9A4D141E2F63a2"
        // "0x5D35295866907cdF6172984E4904a35a7BC60D9a"
        //0xab513BA75c3544532DC4499F2Ee025164c9dc966

        const web3 = new Web3("https://opbnb-mainnet-rpc.bnbchain.org");

        if (!web3.utils.isAddress(address)) {
          console.log("Invalid Ethereum address.");
          return;
        }

        const contract = new web3.eth.Contract(mainAbi, mainContractAddress);

        const userExist = await contract.methods.isUserExists(address).call();

        if (!userExist) {
          navigate("/registration");
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setMsg("Metamask Wallet Not found");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        setMsg("");
      }, 1800);
    }
  };

  return (
    <div className="fixed z-500 backdrop-blur-lg w-full text-white bg-black/80 px-[8%] py-3 flex justify-between items-center">
      {/* Logo / Home Click */}
      {showError && <Error msg={msg} />}
      <div
        onClick={() => navigate("/")}
        className="absolute cursor-pointer z-50"
      >
        <div className="relative bg-black rounded-full -bottom-5 sm:-bottom-9 w-[80px] sm:w-[110px] aspect-square">
          <img className="absolute" src={ringSrc} />
          <img
            className="absolute animate-spin"
            style={{ animationDuration: "15s" }}
            src={centralImageSrc}
          />
        </div>
      </div>

      {/* Dynamic Navigation Items */}
      {(() => {
        const navItems = [];
        if (isLoginPage || isRegistrationPage) {
          navItems.push(
            { label: "HOME", action: () => navigate("/") },
            { label: "LOGIN", action: () => navigate("/login") },
            { label: "REGISTRATION", action: () => navigate("/registration") }
          );
        }
        if (isHomePage || idDownloadPage) {
          navItems.push(
            {
              label: "HOME",
              action: () => {
                navigate("/", { state: { scrollToHero: true } });
                document
                  .getElementById("hero")
                  ?.scrollIntoView({ behavior: "smooth" });
              },
            },
            {
              label: "PLATFORM",
              action: () => {
                navigate("/", { state: { scrollToPlatform: true } });
                document
                  .getElementById("platform")
                  ?.scrollIntoView({ behavior: "smooth" });
              },
            },
            {
              label: "FAQ",
              action: () => {
                navigate("/", { state: { scrollToFaq: true } });
                document
                  .getElementById("faq")
                  ?.scrollIntoView({ behavior: "smooth" });
              },
            },
            { label: "DOWNLOAD", action: () => navigate("/download") }
          );
        }

        return (
          <>
            {/* Desktop Nav */}
            <div className="md:flex hidden justify-end text-[16px] px-[15px] w-full gap-3">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  className="cursor-pointer hover:text-yellow-400 transition ease-in-out duration-300"
                  onClick={item.action}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right Section: Wallet + Mobile Menu */}
            <div className="flex w-full md:w-fit justify-end sm:gap-3 items-center relative">
              {/* Wallet Connect Button */}
              <button
                onClick={connectWallet}
                className="relative group overflow-hidden border-[1.8px] border-[#E39B28] rounded-md h-8 text-xs font-semibold text-white cursor-pointer"
              >
                <span className="relative z-10 connect-btn">
                  {ownerAddress
                    ? `${ownerAddress.slice(0, 5)}...${ownerAddress.slice(-4)}`
                    : "WALLET CONNECT"}
                </span>
              </button>

              {/* Mobile Menu Icon */}
              <div className="md:hidden relative">
                <button
                  onClick={() => {
                    const menu = document.getElementById("mobile-menu");
                    if (menu) {
                      menu.classList.toggle("hidden");
                      setMenuOpen(!menuOpen);
                    }
                  }}
                  className="p-2 rounded-md"
                >
                  {menuOpen ? (
                    // X Icon
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    // Hamburger Icon
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>

                {/* Mobile Dropdown Menu */}
                <div
                  id="mobile-menu"
                  className="hidden absolute right-0 mt-2 w-40 bg-black/90 rounded shadow-lg text-white z-50"
                >
                  {navItems.map((item) => (
                    <button
                      key={item.label}
                      className="block w-full text-left px-4 py-2 hover:bg-yellow-500/20"
                      onClick={() => {
                        item.action();
                        document
                          .getElementById("mobile-menu")
                          ?.classList.add("hidden");
                        setMenuOpen(false);
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        );
      })()}
    </div>
  );
}

export default LandingNavbar;
