import Title from "../component/Title";
import Footer from "../component/Footer";
import { useSelector } from "react-redux";

function Token({ openSidebar }) {
  const walletAddress = useSelector(
    (state) => state.accountDetails.walletAddress
  );
  const backupAddress = useSelector(
    (state) => state.accountDetails.saveMainUserAddress
  );
  return (
    <div
      className={`absolute inset-0 overflow-auto backdrop-blur-[1px] ${
        walletAddress == backupAddress ? "bg-black/60" : "bg-[#490D0D]/80"
      }  flex justify-center sm:py-4 ${openSidebar && "lg:pr-30"}`}
    >
      {" "}
      <div
        className={`${
          openSidebar ? "w-[90%] lg:w-full" : "w-[90%] lg:w-[80%]"
        } flex flex-col sm:px-5 max-w-[1320px]`}
      >
        <Title title="Token" />

        <div className=" flex-1 flex flex-col justify-between">
          <div className="flex flex-col items-center gap-3">
            <img
              className="rounded-lg"
              src="https://i.pinimg.com/originals/1f/3f/71/1f3f71f0ef3470c354aa7cfcf1272b56.gif"
              alt="game"
            />
            <p className="text-xl">Comming Soon....</p>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Token;
