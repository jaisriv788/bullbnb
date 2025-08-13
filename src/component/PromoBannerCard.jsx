import { Download } from "lucide-react";

function PromoBannerCard({ src }) {
  return (
    <div className="py-8 relative rounded-t-3xl flex flex-col items-center gap-5 bg-gradient-to-b from-[#f0b03d59] to-transparent flex-1 max-w-FULL lg:max-w-1/2 text-center min-w-[350px]">
      <img className=" h-50" src={src} />
      <div className="btn-theme1 gap-2 justify-center items-center cursor-pointer">
        <Download size={16} />
        <a href={src} download>
          Download
        </a>
      </div>
    </div>
  );
}

export default PromoBannerCard;
