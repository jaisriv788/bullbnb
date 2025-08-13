import { Navigation } from "lucide-react";
import img1 from "../../assets/security/cloudflare.jpg";
import img2 from "../../assets/security/DMCA-Protected.jpg";
import img3 from "../../assets/security/site-lock.jpg";

function Security() {
  return (
    <div
      style={{
        backgroundImage: "url('bg3.png')",
        transformOrigin: "center",
      }}
      className="flex flex-col gap-10 items-center py-10"
    >
      <div className="flex flex-col items-center ">
        <div className="text-lg font-bold flex items-center gap-5 text-center text-wrap">
          <div
            className="h-[2px] w-20"
            style={{
              background:
                "linear-gradient(to right, transparent, #885407, yellow, #7C7524, transparent)",
            }}
          ></div>
          Advanced security features protect your data
          <div
            className="h-[2px] w-20"
            style={{
              background:
                "linear-gradient(to right, transparent, #885407, yellow, #7C7524, transparent)",
            }}
          ></div>
        </div>
        <div className="text-center text-3xl font-semibold text-yellow-300">
          Security Partners
        </div>
      </div>
      <div className="flex gap-10 flex-wrap justify-center">
        <div className="flex cursor-pointer justify-center">
          <img
            onClick={() =>
              window.open(
                "https://www.dmca.com/Protection/Status.aspx?ID=2cd2f908-f824-45e9-a8c6-a30dbf573ad3&cdnrdr=1&refurl=https://bullbnb.com/",
                "_blank"
              )
            }
            className="w-60 rounded-xl border-2"
            src={img2}
            alt="img"
          />
        </div>
        <div className="flex cursor-pointer justify-center">
          <img
            onClick={() =>
              window.open("https://www.cloudflare.com/en-gb/", "_blank")
            }
            className="w-60 rounded-xl border-2"
            src={img1}
            alt="img"
          />
        </div>
        <div className="flex cursor-pointer justify-center">
          <img
            onClick={() =>
              window.open(
                "https://secure.sitelock.com/public/verify/bullbnb.com",
                "_blank"
              )
            }
            className="w-60 rounded-xl border-2"
            src={img3}
            alt="img"
          />
        </div>
      </div>
    </div>
  );
}

export default Security;
