import Footer from "../component/Footer";
import { useSelector } from "react-redux";
import logoSrc from "../assets/cryptocluster/CryptoCluster-logo.png";
import { data } from "../data/cryptocluster";

function CryptoCluster({ openSidebar }) {
  const walletAddress = useSelector(
    (state) => state.accountDetails.saveMainUserAddress
  );
  const currentWalletAddress = useSelector(
    (state) => state.accountDetails.walletAddress
  );

  return (
    <div
      className={`absolute inset-0 overflow-auto backdrop-blur-[1px] ${
        walletAddress == currentWalletAddress
          ? "bg-black/60"
          : "bg-[#490D0D]/80"
      }  flex justify-center sm:py-4 ${openSidebar && "lg:pr-30"}`}
    >
      <div
        className={`${
          openSidebar ? "w-[90%] lg:w-full" : "w-[90%] lg:w-[80%]"
        } flex flex-col gap-5 sm:px-5 max-w-[1320px]`}
      >
        <div className="flex justify-center border-b pb-3 border-gray-500">
          <img src={logoSrc} />
        </div>
        <div className=" flex-1 flex flex-col gap-5">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
            {data.map((item, index) => (
              <div
                key={index}
                className="group sm:w-fit w-fit bg-white/20 border-2 border-white/60 rounded-lg  h-fit p-2 overflow-hidden"
              >
                <div className="flex flex-col gap-2 border-2 border-[#FFB213] pb-2 px-2 rounded-lg">
                  <div className="bg-gradient-to-r self-center rounded-b-lg from-[#FFE033] to-[#FFA107] w-fit text-black px-2">
                    Volume {index + 1}
                  </div>
                  <div className="overflow-hidden self-center">
                    <img
                      className="rounded-lgtransition-transform duration-500 ease-in-out group-hover:scale-[1.2] group-hover:rotate-15"
                      src={item.img}
                      alt="img"
                    />
                  </div>
                  <button
                    onClick={() => window.open(item.link, "_blank")}
                    className="btn-theme3 cursor-pointer"
                  >
                    Read Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default CryptoCluster;
