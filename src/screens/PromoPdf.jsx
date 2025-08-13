import Title from "../component/Title";
import Footer from "../component/Footer";
import PresentationPdf from "../component/PresentationPdf";
import WebBanners from "../component/WebBanners";
import PromoBanners from "../component/PromoBanners";
import PrintMaterial from "../component/PrintMaterial";
import PromoTab from "../component/PromoTab";
import { useState } from "react";
import { useSelector } from "react-redux";

const tabData = [
  "Presentation PDF",
  "Web Banners",
  "Promo Banners",
  "Print Materials",
];

function PromoPdf({ openSidebar }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

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
        <Title title="PromoPDF" />

        <div className="flex-1">
          <div className="bg-gradient-to-br from-white/20 via-transparent to-white/20 flex flex-col gap-5 px-1 sm:px-8 py-8 rounded-lg border-2 border-white/40">
            <div className="flex gap-5 justify-center flex-wrap ">
              {tabData.map((data, index) => {
                return (
                  <PromoTab
                    key={index}
                    name={data}
                    isActive={index === activeTabIndex}
                    handleClick={() => {
                      setActiveTabIndex(index);
                      console.log(index);
                    }}
                  />
                );
              })}
            </div>
            {activeTabIndex === 0 ? (
              <PresentationPdf />
            ) : activeTabIndex === 1 ? (
              <WebBanners />
            ) : activeTabIndex === 2 ? (
              <PromoBanners />
            ) : (
              <PrintMaterial />
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default PromoPdf;
