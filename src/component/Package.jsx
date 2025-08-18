import { useState } from "react";
import logoSrc from "../assets/bnbLogo/transparent.png";
import { useNavigate } from "react-router";
import checkSrc from "../assets/logos/checkicon.png";
import { useSelector } from "react-redux";
import soildLogoSrc from "../assets/bnbLogo/circle.png";
import { ArrowRight } from "lucide-react";
import Web3 from "web3";
import mainAbi from "../mainAbi.json";
import axios from "axios";

const packages = [
  { label: "", amount: "" },
  { label: "STARTER", amount: "0.0080" },
  { label: "EXECUTIVE", amount: "0.01" },
  { label: "ACHIEVER", amount: "0.02" },
  { label: "POINEER", amount: "0.04" },
  { label: "DIRECTOR", amount: "0.08" },
  { label: "STAR", amount: "0.16" },
  { label: "CHAMPION", amount: "0.32" },
  { label: "MENTOR", amount: "0.64" },
  { label: "TITAN", amount: "1.28" },
  { label: "PLATINUM", amount: "2.56" },
  { label: "DIAMOND", amount: "5.12" },
  { label: "ICON", amount: "10.28" },
  { label: "LEGEND", amount: "20.48" },
  { label: "AMBASSADOR", amount: "40.36" },
  { label: "PRESIDENT", amount: "81.92" },
];
function allPackages() {
  return [
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
}

function Package() {
  const [selectedIndexes, setSelectedIndexes] = useState(new Set());
  const [selectedUpgradeIndex, setSelectedUpgradeIndex] = useState(null);
  const [modelVisible, setModelVisible] = useState(false);
  const [highest, setHighest] = useState(0);

  const baseUrl = useSelector((state) => state.accountDetails.baseUrl);
  const mainContractAddress = useSelector(
    (state) => state.accountDetails.mainContractAddress
  );

  const navigate = useNavigate();
  const level = useSelector((state) => state.dashboardData.userData?.rank);
  // const level = 6;

  const handleClick = (index, amount) => {
    if (index != level) return;
    setSelectedUpgradeIndex(index);
    const newSelected = new Set([index]);
    setSelectedIndexes(newSelected);
    setHighest(parseFloat(amount));
  };

  if (!level) return null;

  async function handleUpgradeClick() {
    setModelVisible(true);
    if (highest === 0) return;
    // console.log(mainContractAddress);
    try {
      const web3 = new Web3(window.ethereum);
      const amountInWei = web3.utils.toWei(highest.toString(), "ether");
      const accounts = await web3.eth.requestAccounts();
      const address = accounts[0];
      const contract = new web3.eth.Contract(mainAbi, mainContractAddress);
      // console.log(contract);
      // const user = await contract.methods.isUserExists(accounts[0]).call();
      // if (!user) {
      //   return;
      // }
      // console.log({user});
      const gasPrice = await web3.eth.getGasPrice();
      console.log({ gasPrice });
      await contract.methods
        .Upgrade(selectedUpgradeIndex + 1)
        .send({
          value: amountInWei,
          from: address,
          gasPrice: gasPrice,
        })
        .once("receipt", async function () {
          try {
            const user_details = await contract.methods.users(address).call();
            let pkg = allPackages()[user_details.currentPackage];

            try {
              const response = await axios.post(
                `${baseUrl}user/telegram_notify`,
                {
                  type: "notification",
                  wallet_address: address,
                  package: pkg,
                }
              );
              console.log("Notification sent:", response.data);
            } catch (error) {
              console.log(
                "Failed to send notification. Error:",
                error.response?.data || error.message
              );
            } finally {
              setTimeout(() => {
                navigate("/dashboard");
                window.location.reload();
              }, 2000);
            }
          } catch (error) {
            console.error("Error fetching user details:", error);
          }
        })
        .on("error", function () {});
      setModelVisible(false);
    } catch (error) {
      setModelVisible(false);
      console.error("Upgrade error:", error);
    }
  }

  return (
    <>
      <div className="mt-14 flex gap-5 justify-evenly flex-wrap pt-16 lg:px-10 bg-gradient-to-b from-[#564017] to-transparent rounded-t-xl relative">
        {modelVisible && (
          <div
            onClick={() => setModelVisible(false)}
            className="absolute z-50 bg-black/80 inset-0  flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-[40rem] z-50 overflow-hidden rounded-xl"
            >
              <div className="text-center bg-gradient-to-r from-[#F54913] to-[#DA8912] py-3 font-semibold text-xl">
                Package Confirmation
              </div>
              <div className="bg-gray-600 text-center py-5">
                <div>You are purchasing</div>
                <div className="text-xl text-[#f7a429]">{highest} BNB</div>
                <div className="text-lg">
                  Please <span className="font-semibold">Confirm</span> to
                  continue.
                </div>
                <div className="flex gap-3 justify-center mt-5">
                  <button
                    onClick={handleUpgradeClick}
                    className="bg-white w-[10em] rounded-lg cursor-pointer border border-gray-600 hover:border-white py-1 transition ease-in-out duration-300 font-semibold bg-gradient-to-r from-[#A024C4] to-[#5806D5]"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => {
                      setModelVisible(false);
                    }}
                    className="bg-white w-[10em] rounded-lg cursor-pointer border border-white hover:border-black py-1 transition ease-in-out duration-300 font-semibold text-black"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div
          className={`absolute px-5 text-lg rounded-2xl border-2 border-[#B96FDB] ${
            modelVisible ? "top-0" : "-top-4"
          }   left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#A024C3] via-[#7B15CD] to-[#5B07D5]`}
        >
          Select Package
        </div>
        {packages.slice(1).map((pkg, index) => (
          <div
            key={index}
            className="relative hover:shadow-[0_0_20px_5px_rgba(56,165,850,0.6)] overflow-hidden cursor-pointer h-40 w-40 rounded-full bg-gradient-to-tr from-[#E21927] via-[#B21238] to-[#790A4D] "
          >
            {index == level && selectedIndexes.has(index) && (
              <div className="absolute bg-blue-800/80 h-full w-full z-40 rounded-full flex items-center justify-center">
                <img src={checkSrc} className="h-10 w-10 pop-animation" />
              </div>
            )}

            {index < level && (
              <div className="absolute bg-gradient-to-tr from-black/60 cursor-not-allowed to-black/80 h-full w-full z-40 rounded-full flex items-end justify-center">
                <img src={checkSrc} className="h-5 w-5 mb-2 pop-animation" />
              </div>
            )}
            <div
              onClick={() => handleClick(index, pkg.amount)}
              className="h-full w-full flex flex-col items-center justify-center gap-2"
            >
              <img className="h-10 w-10 z-20" src={logoSrc} />
              <div className="text-black w-full text-center font-bold text-lg bg-gradient-to-r from-[#FFE033] to-[#FFA006] z-20">
                {pkg.amount} BNB
              </div>
              <div className="font-semibold z-20">{pkg.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-black self-center w-fit flex gap-3 items-center p-1 rounded-full bg-white text-center mt-6">
        <div className="flex items-center text-xl font-bold gap-3">
          <img className="h-8 w-8" src={soildLogoSrc} />
          <div>{highest == 0 ? "00.00" : highest} BNB</div>
        </div>
        <button
          onClick={() => {
            setModelVisible(true);
          }}
          disabled={level >= 15}
          className="bg-gradient-to-r cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex gap-2 items-center px-5 text-sm rounded-full py-1 text-white from-[#2C0C59] to-[#BF0C77]"
        >
          Proceed to Upgrade <ArrowRight size={17} />
        </button>
      </div>
    </>
  );
}

export default Package;
