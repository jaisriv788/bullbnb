import webBannerOne from "../assets/Web-Banners/one.gif";
import webBannerTwo from "../assets/Web-Banners/two.gif";
import webBannerThree from "../assets/Web-Banners/three.gif";
import webBannerFour from "../assets/Web-Banners/four.gif";
import webBannerFive from "../assets/Web-Banners/five.gif";
import webBannerSix from "../assets/Web-Banners/six.gif";

import WebBannerCard from "./WebBannerCard";

const BannerData = [
  {
    height: "200px",
    src: webBannerOne,
    name: "Ads Banner 160x600",
    code: "<a href='808520741' target='_blank'><img src=\"https://bullbnb.com/opbullbnb/user/assets/img/Web-Banners/BullBNB-Ads-160x600.gif\"></a>",
  },
  {
    height:"210px",
    src: webBannerSix,
    name: "Ads Banner 300X250",
    code: "<a href='808520741' target='_blank'><img src=\"https://bullbnb.com/opbullbnb/user/assets/img/Web-Banners/BullBNB-Ads-300X250.gif\"></a>",
  },
  {
    height: "210px",
    src: webBannerTwo,
    name: "Ads Banner 300X250",
    code: "<a href='808520741' target='_blank'><img src=\"https://bullbnb.com/opbullbnb/user/assets/img/Web-Banners/BullBNB-Ads-300X250-1.gif\"></a>",
  },
  {
    height: "210px",
    src: webBannerFour,
    name: "Ads Banner 300X250",
    code: "<a href='808520741' target='_blank'><img src=\"https://bullbnb.com/opbullbnb/user/assets/img/Web-Banners/BullBNB-Ads-300X250-2.gif\"></a>",
  },
  {
    height: "60px",
    src: webBannerThree,
    name: "Ads Banner 300x50",
    code: "<a href='808520741' target='_blank'><img src=\"https://bullbnb.com/opbullbnb/user/assets/img/Web-Banners/BullBNB-Ads-300X50.gif\"></a>",
  },
  {
    height: "60px",
    src: webBannerFive,
    name: "Ads Banner 728x90",
    code: "<a href='808520741' target='_blank'><img src=\"https://bullbnb.com/opbullbnb/user/assets/img/Web-Banners/BullBNB-Ads-728x90.gif\"></a>",
  },
];

function WebBanners() {
  return (
    <div className="flex flex-col gap-10">
      <div className="text-[16px]">
        One of the most effective ways to promote your link online is to simply
        copy the banner code and insert it on your website or in your marketing
        campaign.
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {BannerData.map((item, index) => {
          return (
            <WebBannerCard
              key={index}
              name={item.name}
              code={item.code}
              src={item.src}
              height={item.height}
            />
          );
        })}
      </div>
    </div>
  );
}

export default WebBanners;
