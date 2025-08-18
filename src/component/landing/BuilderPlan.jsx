import img1 from "../../assets/sponsor.png";
import img2 from "../../assets/direct.png";
import img3 from "../../assets/level.png";
import img4 from "../../assets/pool.png";
import img5 from "../../assets/villa.png";
const data = [
  { image: img1, name: "Sponsor Bonus" },
  { image: img2, name: "Direct Kick Bonus" },
  { image: img3, name: "Level Bonus" },
  { image: img4, name: "Pool Bonus" },
  { image: img5, name: "Luxury Bonus" },
];

function BuilderPlan() {
  return (
    <section
      id="builderplan"
      style={{
        backgroundImage: "url('screen/mask.jpg')",
        transformOrigin: "center",
      }}
      className="bg-[#02080F] relative p-10 bg-center flex justify-center bg-cover bg-no-repeat"
    >
      <div className="flex flex-col justify-between items-center">
        <div className=" flex flex-col gap-3 items-center">
          <div>
            <div className="text-lg font-bold flex items-center gap-5 text-center text-wrap">
              <div
                className="h-[2px] w-20"
                style={{
                  background:
                    "linear-gradient(to right, transparent, #885407, yellow, #7C7524, transparent)",
                }}
              ></div>
              Commission Payout System
              <div
                className="h-[2px] w-20"
                style={{
                  background:
                    "linear-gradient(to right, transparent, #885407, yellow, #7C7524, transparent)",
                }}
              ></div>
            </div>
            <div className="text-center text-3xl font-semibold text-yellow-300">
              Partner Wealth Builder Plan
            </div>
          </div>
        </div>
        <div className="sm:w-9/12">
          <div className="flex flex-wrap justify-between gap-x-3">
            {data.map((item, index) => {
              return (
                <div
                  key={index}
                  className="border-2 flex-1 flex min-w-30 md:min-w-40 lg:min-w-45 xl:min-w-50 mt-5 lg:mt-20 flex-col gap-3 items-center rounded-4xl px-5 py-6 bg-gradient-to-tr from-[#000204] to-[#001C2D] border-white/30"
                >
                  <div className="group rounded-full relative w-20 h-20">
                    <div className="h-full w-full rounded-full bg-[conic-gradient(from_0deg,_transparent,_transparent,_transparent,#C59742,#DC7C2E,#C03911)] p-1 cursor-pointer spin">
                      <div className="h-full w-full rounded-full cursor-pointer bg-[conic-gradient(from_0deg,#151126,#111122,#111122,#221133)] p-2"></div>
                    </div>
                    <img
                      className="w-14 rounded-full absolute top-1/2 left-1/2 cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                      src={item.image}
                    />
                  </div>
                  <div className="text-lg font-semibold text-center text-wrap">
                    {item.name}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center mb-20 py-5 sm:py-16 px-5 sm:px-14 border-dashed border-x-2 border-b-2 sm:text-lg rounded-4xl relative">
            Simultaneous entry into platform one of the Partner Sponsor Bonus,
            Partner Direct Kick Bonus, Partner Level Bonus, Partner Pool Bonus
            and Luxury Bonus matrices occurs automatically upon registration.
            <div className="absolute  left-1/2 -translate-x-1/2 p-1 bg-gradient-to-r from-red-500 via-yellow-500 to-orange-500 rounded-full -bottom-8">
              <div className=" bg-black  flex justify-center items-center gap-3 px-9 py-2 rounded-full">
                <img src="logos/transparent.png" className="h-7" />
                <p className="sm:text-2xl text-nowrap font-semibold">
                  0.0080 BNB TO JOIN
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BuilderPlan;
