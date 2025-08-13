import Title from "../component/Title";
import starGifSrc from "../assets/gifs/star.gif";
import Footer from "../component/Footer";
import { useSelector } from "react-redux";

function Reviews({ openSidebar }) {
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
      }  flex justify-center sm:p-4`}
    >
      {" "}
      <div
        className={`${
          openSidebar ? "w-[90%] lg:w-full" : "w-[90%] lg:w-[80%]"
        } flex flex-col`}
      >
        <Title title="Reviews" />

        <div className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col items-center gap-3">
            <img className="rounded-lg" src={starGifSrc} alt="game" />
            <p className="text-xl">Comming Soon....</p>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Reviews;
