import { useSelector } from "react-redux";
import mainAbi from "../mainAbi.json";
import { useNavigate } from "react-router";
import Web3 from "web3";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import logoSrc from "../assets/registration.png";
import FooterTwo from "../component/FooterTwo";
import ringSrc from "../assets/logos/ring-text.png";
import centralImageSrc from "../assets/logos/ring-transparent.png";

function Registration() {
  const [refId, setRefId] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  const mainContractAddress = useSelector(
    (state) => state.accountDetails.mainContractAddress
  );

  useEffect(() => {
    if (id) {
      setRefId(id);
    }
  }, [id]);

  const baseUrl = useSelector((state) => state.accountDetails.baseUrl);

  async function handelRegistration() {
    // console.log({ mainContractAddress });
    if (!window.ethereum) {
      alert("MetaMask not found.");
      return;
    }

    try {
      if (!refId || refId == 808520741) {
        alert("Enter a valid referral ID");
        return;
      }

      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.requestAccounts();
      const address = accounts[0];

      const contract = new web3.eth.Contract(mainAbi, mainContractAddress);
      console.log({ refId });
      const referdata = await contract.methods.idToAddress(refId).call();
      console.log(referdata);
      if (
        referdata === "0x0000000000000000000000000000000000000000" ||
        referdata === address
      ) {
        alert("Either the user doesn't exist or it's your own ID.");
        return;
      }

      const userExist = await contract.methods.isUserExists(address).call();
      if (userExist) {
        alert("User already exists.");
        return;
      }

      const gasPrice = await web3.eth.getGasPrice();

      const tx = await contract.methods.NewUser(referdata, address, 0, 0).send({
        from: address,
        value: 8000000000000000,
        gasPrice,
      });
      if (!tx || !tx.status) {
        alert("Registration failed");
        return;
      }

      const user_details = await contract.methods.users(address).call();
      const reff_details = await contract.methods
        .users(user_details["referrer"])
        .call();

      // const data = {
      //   wallet_address: address,
      //   user_id: BigInt(user_details["id"]),
      //   referral_id: BigInt(reff_details["id"]),
      // };

      const formData = new FormData();
      formData.append("wallet_address", address);
      formData.append("user_id", Number(user_details["id"]));
      formData.append("referral_id", Number(reff_details["id"]));

      try {
        const response = await axios.post(`${baseUrl}api/save-user`, formData);
        // console.log(data);
        console.log(response);
        if (response.status === 200) {
          navigate("/login");
        } else {
          alert("Registration Unsuccessful.");
        }
      } catch (apiError) {
        console.error("API Error:", apiError);
        alert("API registration failed.");
      }
    } catch (error) {
      console.error("Transaction failed:", error.message || error);
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden flex flex-col bg-white text-white bgImg">
      {/* Main content area */}
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

      {/* Black overlay */}
      <div className="absolute inset-0 flex flex-col gap-10 items-center pt-20 w-full h-full bg-black/60 z-20"></div>

      {/* Main content */}
      <div className="flex min-h-screen sm:px-3 flex-col justify-center items-center flex-grow z-50">
        <div className="text-center mt-25 sm:mt-35">
          <div className="text-lg text-nowrap font-bold flex items-center gap-5 text-center">
            <div
              className="h-[2px] w-20 "
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
            Registration
          </div>
        </div>

        <div className="rounded-xl mt-5 min-w-[200px] bg-[#041321]/30 border max-w-screen border-gray-700 py-5 w-[500px] flex flex-col items-center">
          <div className="group rounded-full relative w-20 h-20">
            <div className="h-full w-full rounded-full bg-[conic-gradient(from_0deg,_transparent,_transparent,_transparent,#C59742,#DC7C2E,#C03911)] p-1 cursor-pointer spin">
              <div className="h-full w-full rounded-full cursor-pointer bg-[conic-gradient(from_0deg,#151126,#111122,#111122,#221133)] p-2"></div>
            </div>
            <img
              className="w-14 rounded-full absolute top-1/2 left-1/2 cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              src={logoSrc}
            />
          </div>
          <div className="text-center flex flex-col gap-5 w-3/4 mt-5">
            <div>
              <div className="text-xl font-semibold">
                User Registration with Wallet Address
              </div>
              <div className="mt-1">Please connect your wallet</div>
            </div>
            <div className="border-t pt-4 border-white/50">
              <div>Sponsor Id</div>
              <label className="input mt-3 bg-black rounded-full w-full text-white border-2 border-white/40">
                <input
                  onChange={(e) => setRefId(e.target.value)}
                  value={refId}
                  type="number"
                  className="grow"
                  placeholder="Enter Id"
                  min={1}
                />
              </label>
            </div>

            <button
              onClick={handelRegistration}
              className="flex-1 btn-hover color-2 self-center w-full"
            >
              Registration
            </button>
          </div>
        </div>

        {/* Footer */}
        <FooterTwo />
      </div>
    </div>
  );
}

export default Registration;
