import img1 from "../../assets/landing/dappradar.jpg";
import img2 from "../../assets/landing/hazecrypto.jpg";
import img3 from "../../assets/landing/interfi.jpg";
import img4 from "../../assets/landing/opBNB.jpg";

function Audit() {
  return (
    <div className="flex flex-col gap-10 items-center py-10">
      <div className="flex flex-col items-center ">
        <div className="text-lg font-bold flex items-center gap-5 text-center text-wrap">
          <div
            className="h-[2px] w-20"
            style={{
              background:
                "linear-gradient(to right, transparent, #885407, yellow, #7C7524, transparent)",
            }}
          ></div>
          BullBNB
          <div
            className="h-[2px] w-20"
            style={{
              background:
                "linear-gradient(to right, transparent, #885407, yellow, #7C7524, transparent)",
            }}
          ></div>
        </div>
        <div className="text-center text-3xl font-semibold text-yellow-300">
          Contract address has been successfully audited By
        </div>
      </div>
      <div className="grid grid-cols-1 px-5 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <img className="w-80 rounded-xl border-2" src={img1} alt="img" />
        <img className="w-80 rounded-xl border-2" src={img2} alt="img" />
        <img className="w-80 rounded-xl border-2" src={img3} alt="img" />
        <img className="w-80 rounded-xl border-2" src={img4} alt="img" />
      </div>
    </div>
  );
}

export default Audit;
