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
import FooterTwo from "../component/FooterTwo";
import ringSrc from "../assets/logos/ring-text.png";
import centralImageSrc from "../assets/logos/ring-transparent.png";
import loginSrc from "../assets/login.png";

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
        const address = "0xB7059B4db7eC58722F30128b547a59ED797529EA";

        // const address = "0x5289CA577B00E87c72671a55Ce9A4D141E2F63a2";
        // const address = "0x25e3f68858dfAFCeb59255a28020E0A8f46d2c6B";
        // const address = account[0];
        // const address = "0xCe1C96A56a87282Bae02561bDE5071a37755d101";
        // const address = "0xBcb0633409Be7D1b1A91640e0bB5a17582E8658D";
        // const address = "0x8a607B2bDb8B067CEc27382009f3b86c4E818896";
        // const address = "0x31C3681a597866124cA61E5c417F2Abe00955f41";
        // const address = "0xAD567970842a780E73d14f1640b0B4A995A4A3C6";
        // const address = "0x4787727A35e6948A0f896561de9b612979E36BB6";

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
    <div className="min-h-screen overflow-x-hidden flex flex-col bg-white text-white bgImg">
      <div className="absolute rounded-full  -z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative rounded-full w-[200px]  sm:w-[350px] lg:w-[450px] aspect-square">
          <img className="absolute rounded-full " src={ringSrc} />
          <img
            className="absolute rounded-full animate-spin"
            style={{ animationDuration: "15s" }}
            src={centralImageSrc}
          />
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col gap-10 items-center pt-20 w-full h-full bg-black/60 z-20"></div>
      <div className="flex min-h-screen sm:px-3 flex-col justify-center items-center flex-grow z-50">
        <div className="text-center mt-25 sm:mt-35">
          <div className="text-lg  text-nowrap font-bold flex items-center gap-5 text-center">
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

        <div className="rounded-xl mt-5 min-w-[200px] bg-[#041321]/30 border max-w-screen border-gray-700 py-5 w-[500px] flex flex-col items-center">
          <div className="group rounded-full relative w-20 h-20">
            <div className="h-full w-full rounded-full bg-[conic-gradient(from_0deg,_transparent,_transparent,_transparent,#C59742,#DC7C2E,#C03911)] p-1 cursor-pointer spin">
              <div className="h-full w-full rounded-full cursor-pointer bg-[conic-gradient(from_0deg,#151126,#111122,#111122,#221133)] p-2"></div>
            </div>
            <img
              className="w-14 rounded-full absolute top-1/2 left-1/2 cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              src={loginSrc}
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

        <FooterTwo />
      </div>
    </div>
  );
}

export default Login;
