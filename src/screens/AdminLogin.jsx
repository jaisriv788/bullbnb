import FooterTwo from "../component/FooterTwo";
import ringSrc from "../assets/logos/ring-text.png";
import centralImageSrc from "../assets/logos/ring-transparent.png";
import loginSrc from "../assets/login.png";
import { useNavigate } from "react-router";
import {
  isAdmin,
  saveMainUser,
  setAddress,
} from "../features/walletAddress/web3WalletInfo";
import { useDispatch } from "react-redux";

const allowedAccounts = [
  "0x5ab326401c49f7ccfc9f41b25832157a998bc36e",
  "0xa529280c9f7c9ef7c98d148a91f7eb3da31426dc",
  "0xdfe7a24a0fa43294212d2af04babbb36f9cde8ac",
  "0x24e7545c7be512c39775044df8911edeb4730436",
  "0x6fdd0f90e8d74e876c59fc24d044e9f2bae13b53",
];

function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handelAdminLogin() {
    if (window.ethereum) {
      try {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const address = account[0];

        if (allowedAccounts.includes(address.toLowerCase())) {
          dispatch(isAdmin(true));
          dispatch(setAddress(address));
          dispatch(saveMainUser(address));
          sessionStorage.setItem("walletAddress", address);
          sessionStorage.setItem("walletAddressBackup", address);
          sessionStorage.setItem("isAdmin", true);
          navigate("/admin/dashboard");
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
            Admin Login
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
                Login To Your Admin Account
              </div>
            </div>

            <button
              onClick={handelAdminLogin}
              className="flex-1 font-semibold btn-hover color-2 self-center w-full"
            >
              Connect
            </button>
          </div>
        </div>

        <FooterTwo />
      </div>
    </div>
  );
}

export default AdminLogin;
