import BannerOne from "../assets/Promo-Banners/BullBNB-Ads-banner1.jpg";
import BannerTow from "../assets/Promo-Banners/BullBNB-Ads-banner2.jpg";
import BannerThree from "../assets/Promo-Banners/BullBNB-Ads-banner3.jpg";
import BannerFour from "../assets/Promo-Banners/BullBNB-Ads-banner4.jpg";
import BannerFive from "../assets/Promo-Banners/BullBNB-Ads-banner5.jpg";
import BannerSix from "../assets/Promo-Banners/BullBNB-Ads-banner6.jpg";
import BannerSeven from "../assets/Promo-Banners/BullBNB-Ads-banner7.jpg";
import BannerEight from "../assets/Promo-Banners/BullBNB-Ads-banner8.jpg";

import PromoBannerCard from "./PromoBannerCard";

const Banners = [
  BannerOne,
  BannerTow,
  BannerThree,
  BannerFour,
  BannerFive,
  BannerSix,
  BannerSeven,
  BannerEight,
];

function PromoBanners() {
  return (
    <div className="flex flex-col gap-10">
      <div className="text-[16px]">
        One of the most effective ways to promote your link online is to
        download the banner and share it on your social media pages.
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {Banners.map((itemSrc, index) => {
          return <PromoBannerCard key={index} src={itemSrc} />;
        })}
      </div>
    </div>
  );
}

export default PromoBanners;
