import { Copy } from "lucide-react";
import { copyModalVisibilty } from "../features/copyModal/copyModalVisiblilty";
import { useDispatch } from "react-redux";

function WebBannerCard({ src, name, code, height }) {
  const dispatch = useDispatch();

  const handleCopy = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        dispatch(copyModalVisibilty(true));
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="py-8 rounded-t-3xl flex flex-col items-center gap-5 bg-gradient-to-b from-[#f0b03d59] to-transparent flex-1 max-w-full lg:max-w-1/2 min-w-[350px]">
      <img style={{ height }} src={src} />
      <div className="text-xl">{name}</div>
      <div className="bg-[#242424] mx-3 px-2 py-1 rounded-lg border-2 border-white/30 w-full max-w-full overflow-hidden break-words text-white text-sm">
        {code}
      </div>

      <div
        onClick={handleCopy}
        className="btn-theme1 gap-2 justify-center items-center cursor-pointer"
      >
        <Copy size={16} />
        <a>Copy Code</a>
      </div>
    </div>
  );
}

export default WebBannerCard;
