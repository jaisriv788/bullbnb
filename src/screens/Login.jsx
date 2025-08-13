import LogoSpinner from "../component/LogoSpinner";
import { useDispatch, useSelector } from "react-redux";
import mainAbi from "../mainAbi.json";
import { useNavigate } from "react-router";
import Web3 from "web3";
import {
  saveMainUser,
  isConnected,
  setAddress,
} from "../features/walletAddress/web3WalletInfo";
import Error from "../component/Error";
import imgSrc from "../assets/footer.webp";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mainContractAddress = useSelector(
    (state) => state.accountDetails.mainContractAddress
  );

  async function handelLogin() {
    if (window.ethereum) {
      try {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        // const address = "0x5289CA577B00E87c72671a55Ce9A4D141E2F63a2";
        const address = account[0];

        const web3 = new Web3("https://opbnb-mainnet-rpc.bnbchain.org");

        if (!web3.utils.isAddress(address)) {
          console.log("Invalid Ethereum address.");
          return;
        }

        const contract = new web3.eth.Contract(mainAbi, mainContractAddress);
        const userExist = await contract.methods.isUserExists(address).call();
        // console.log({ contract });
        // console.log({ userExist });
        if (userExist) {
          dispatch(setAddress(address));

          dispatch(saveMainUser(address));
          dispatch(isConnected(true));

          sessionStorage.setItem("walletAddress", address);
          sessionStorage.setItem("walletAddressBackup", address);
          sessionStorage.setItem("walletConnected", true);
          navigate("/dashboard");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-white bgImg">
      {/* Main content area */} <LogoSpinner />
      <div className="absolute inset-0 flex flex-col gap-10 items-center pt-20 w-full h-full bg-black/60 z-20"></div>
      <div className="flex min-h-screen px-3 flex-col justify-center items-center flex-grow z-50">
        <div className="text-center mt-20">
          <div className="text-lg font-bold flex items-center gap-5 text-center text-wrap">
            <div
              className="h-[2px] w-20"
              style={{
                background:
                  "linear-gradient(to right, transparent, #885407, yellow, #7C7524, transparent)",
              }}
            ></div>
            BullBNB Smart Contract
            <div
              className="h-[2px] w-20"
              style={{
                background:
                  "linear-gradient(to right, transparent, #885407, yellow, #7C7524, transparent)",
              }}
            ></div>
          </div>
          <div className="text-center text-3xl font-semibold text-yellow-300">
            Login
          </div>
        </div>

        <div className="rounded-xl bg-[#041321]/30 border border-gray-700 py-5 w-fit flex flex-col items-center">
          <div className="group rounded-full relative w-20 h-20">
            <div className="h-full w-full rounded-full bg-[conic-gradient(from_0deg,_transparent,_transparent,_transparent,#C59742,#DC7C2E,#C03911)] p-1 cursor-pointer spin">
              <div className="h-full w-full rounded-full cursor-pointer bg-[conic-gradient(from_0deg,#151126,#111122,#111122,#221133)] p-2"></div>
            </div>
            <img
              className="w-14 rounded-full absolute top-1/2 left-1/2 cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              src="login.png"
            />
          </div>
          <div className="text-center flex flex-col gap-5 w-3/4 mt-5">
            <div>
              <div className="text-xl font-semibold">
                Login To Your Personal Account
              </div>
              <div className="mt-1">
                For access to all the features of your personal account, log in
                using your wallet.
              </div>
            </div>

            <button
              onClick={handelLogin}
              className="flex-1 font-semibold btn-hover color-2 self-center w-full"
            >
              Connect Wallet
            </button>
          </div>
        </div>

        <footer className="mt-auto z-50 flex relative w-full h-60 bg-cover bg-center bg-[url('../assets/footer.webp')]">
          <img className="z-10" src={imgSrc} />
          <div className="z-50 absolute self-end flex justify-center bottom-0 w-full text-white text-center px-4 py-3">
            <div className="max-w-7xl">
              <p className="text-sm md:text-base mb-1">
                © 2025. All Rights Reserved. Build with passion ❤️ on opBNB.
              </p>
              <p className="text-xs hidden sm:block">
                Disclaimer: Participation in this decentralized community smart
                contract program is entirely voluntary. Under no circumstances
                should any information on this website or in any presentation be
                considered as solicitation, investment advice, or financial
                guidance. All information provided is for general purposes only
                and does not take into account your specific personal or
                financial situation. The decentralized community smart contract
                program is not a get-rich-quick scheme. We strongly recommend
                consulting a qualified professional before making any decisions
                if you are uncertain. Your continued participation in this smart
                contract program indicates your acceptance of our disclaimer.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Login;
