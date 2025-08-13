import ringSrc from "../assets/logos/ring-text.png";
import centralImageSrc from "../assets/logos/ring-transparent.png";

function LogoSpinner() {
  return (
    <div className="absolute rounded-full  -z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="relative rounded-full  w-[350px] lg:w-[450px] aspect-square">
        <img className="absolute rounded-full " src={ringSrc} />
        <img
          className="absolute rounded-full animate-spin"
          style={{ animationDuration: "15s" }}
          src={centralImageSrc}
        />
      </div>
    </div>
  );
}

export default LogoSpinner;
