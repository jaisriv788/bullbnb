import innerSrc from "../assets/logos/ring-text.png";
import ringSrc from "../assets/logos/ring-transparent.png";

function ScreenLoader() {
  return (
  <div className="absolute z-90 top-0 left-0 w-full h-full bg-black/95 flex justify-center items-center">
  <div className="pb-5 text-white px-6 py-3 rounded-lg shadow-lg flex flex-col w-[300px] items-center gap-4 relative">
    <div className="absolute w-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <img className="animate-spin" src={ringSrc} alt="ring" style={{animationDuration:"15s"}} />
      <img className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src={innerSrc} alt="inner" />
    </div>
  </div>
</div>

  );
}

export default ScreenLoader;
