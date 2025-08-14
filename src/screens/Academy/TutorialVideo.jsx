import Title from "../../component/Title";
import Footer from "../../component/Footer";
import { useSelector } from "react-redux";

function TutorialVideo({ openSidebar }) {
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
        <Title title="Tutorial Video" />

        <div className="flex-1 text-lg">
          <div>No tutorial videos available.</div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default TutorialVideo;
