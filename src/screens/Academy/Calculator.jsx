import { useState } from "react";
import Footer from "../../component/Footer";
import Title from "../../component/Title";
import { Rank } from "../../data/data";
import { useSelector } from "react-redux";

function Calculator({ openSidebar }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndex1, setSelectedIndex1] = useState(1);
  const [lastValidBonus, setLastValidBonus] = useState("0.0252");

  const walletAddress = useSelector(
    (state) => state.accountDetails.walletAddress
  );
  const backupAddress = useSelector(
    (state) => state.accountDetails.saveMainUserAddress
  );

  const bonusLabels = [
    "0.0252",
    "0.1260",
    "0.5292",
    "2.1420",
    "8.5932",
    "34.3980",
    "137.6172",
    "550.4940",
    "2202.0012",
    "8808.0300",
    "35232.1452",
    "140928.6060",
    "563714.4492",
    "2254857.8220",
  ];

  const calculateBonus = () => {
    let total = 0;
    let increment = 0.01;

    for (let i = 0; i <= selectedIndex; i++) {
      if (i <= 11) {
        total += increment;
        increment *= 2;
      } else if (i === 12) {
        total = 81.31;
      } else if (i === 13) {
        total = 163.23;
      }
    }

    return total.toFixed(4);
  };

  return (
    <div
      className={`absolute inset-0 overflow-auto backdrop-blur-[1px] ${
        walletAddress == backupAddress ? "bg-black/60" : "bg-[#490D0D]/80"
      }  flex justify-center sm:py-4 ${openSidebar && "lg:pr-30"}`}
    >
      {" "}
      <div
        className={`${
          openSidebar ? "w-[90%] lg:w-full" : "w-[90%] lg:w-[80%]"
        } flex flex-col sm:px-5 max-w-[1320px]`}
      >
        <Title title="Calculator" />

        <div className="flex-1 flex flex-col gap-2">
          <div className="text-3xl sm:text-4xl text-center bg-gradient-to-r from-[#F5A20C] to-[#FF701C] bg-clip-text text-transparent font-bold">
            BullBNB Participant
          </div>
          <div className="text-2xl font-semibold sm:text-3xl text-center">
            Calculator
          </div>
          <div className="text-center w-full md:w-11/12 lg:w-10/12 self-center">
            Estimate your potential earnings from participating in BullBNB by
            selecting the levels you wish to activate below. The results are
            based on the pool bonus of all selected levels. Please note that all
            calculations are for informational purposes only and do not
            constitute a public offer.
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 mt-7">
            {Array.from({ length: 14 }).map((_, index) => {
              const isActive = index <= selectedIndex;
              return (
                <div
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`h-10 cursor-pointer flex items-center justify-center rounded-md 
                    ${
                      isActive
                        ? "bg-gradient-to-r from-[#9F24C4] to-[#5C08D5] text-white"
                        : "bg-black/50 text-white border border-white/50"
                    }`}
                >
                  {Rank[index + 1]}
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-r py-8 px-5 from-white/20 via-transparent to-white/20 border-2 border-white/60 rounded-lg mt-5">
            <div className="flex gap-5 lg:flex-row flex-col">
              <div className="bg-gradient-to-r px-20 rounded-xl py-2 text-2xl flex items-center justify-center sm:text-3xl from-[#F71C20] to-[#650753] ">
                {Rank[selectedIndex + 1]}
              </div>
              <div className="flex items-center lg:w-full w-9/11 text-center self-center">
                An exclusive program offering unparalleled opportunities for
                teamwork and growth.
              </div>
            </div>
            <div className="h-1 border-t my-5"></div>
            <div className="flex gap-5 lg:flex-row flex-col">
              <div className="flex-none lg:flex-1 grid grid-cols-3 gap-3">
                {Array.from({ length: 15 }).map((_, index) => {
                  const isActive = index <= selectedIndex1;
                  const isDisabled = index === 0;

                  return (
                    <div
                      key={index}
                      onClick={() => {
                        if (!isDisabled) {
                          setSelectedIndex1(index);
                          const bonusIndex = index - 1;
                          if (bonusIndex <= selectedIndex && bonusIndex >= 0) {
                            setLastValidBonus(bonusLabels[bonusIndex]);
                          }
                        }
                      }}
                      className={`h-10 flex items-center justify-center rounded-md text-xl font-semibold
                        ${
                          isDisabled
                            ? "text-white/50 bg-black/80 cursor-not-allowed border"
                            : isActive
                            ? "bg-gradient-to-tr cursor-pointer from-[#B55209] to-[#E2A049] text-white"
                            : "bg-black/50 cursor-pointer text-white border border-white/50"
                        }`}
                    >
                      {index + 1}
                    </div>
                  );
                })}
              </div>
              <div>
                <div className="text-center mt-4 text-lg sm:text-xl font-semibold text-white">
                  Cost of all selected package:{" "}
                  <span className="text-[#F5A20C]">{calculateBonus()} BNB</span>
                </div>
                <div className="text-center mt-4 text-lg sm:text-xl font-semibold text-white">
                  Results in pool bonus:{" "}
                  <span className="text-[#F5A20C]">{lastValidBonus} BNB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Calculator;
