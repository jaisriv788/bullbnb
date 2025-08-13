import mainLogo from "../../assets/bg2.png";
import mainLogo1 from "../../assets/logo/zero-risk.png";
import mainLogo2 from "../../assets/logo/transparency.png";
import mainLogo3 from "../../assets/logo/Instant.png";
import mainLogo4 from "../../assets/logo/online.png";
import mainLogo5 from "../../assets/logo/Immutable.png";
import mainLogo6 from "../../assets/logo/Decentralization.png";
import logo from "../../assets/logos/circle-bg.png";

function Platform() {
  return (
    <section
      id="platform"
      style={{
        backgroundImage: `url(${logo})`,
        transformOrigin: "center",
      }}
      className="bg-[#02080F] relative md:py-10 bg-center flex flex-col md:flex-row justify-center bg-cover bg-no-repeat h-[130%]"
    >
      {/* Top Heading */}
      <div className="flex flex-col justify-between items-center">
        <div className="flex flex-col gap-3 items-center">
          <div>
            <div className="text-lg font-bold flex items-center gap-5 text-center text-wrap">
              <div
                className="h-[2px] w-20"
                style={{
                  background:
                    "linear-gradient(to right, transparent, #885407, yellow, #7C7524, transparent)",
                }}
              ></div>
              Uniting Communities Worldwide
              <div
                className="h-[2px] w-20"
                style={{
                  background:
                    "linear-gradient(to right, transparent, #885407, yellow, #7C7524, transparent)",
                }}
              ></div>
            </div>
            <div className="text-center text-3xl font-semibold text-yellow-300">
              Global Decentralized Ecosystem
            </div>
          </div>
          <div className="text-center hidden sm:block text-sm w-10/12">
            Decentralized marketing is driven by cutting-edge smart contract
            technology.* BullBNB’s smart contract code is fully transparent and
            publicly accessible, ensuring both security and the long-term
            reliability of the project. You can review the smart contract code
            here.
          </div>
        </div>
        <div className="hidden sm:block text-white/40 w-10/12 md:w-8/12 text-center">
          *Smart contract technology is a groundbreaking innovation in the
          modern decentralized economy. It enables the processing and
          distribution of digital asset financial flows according to program
          code. All operations occur within an open, decentralized blockchain
          network built on the Binance Smart Chain, which provides the necessary
          infrastructure for these contracts to function.
        </div>
      </div>

      {/* Desktop Circular Layout */}
      <div className="hidden md:block absolute border-2 w-8/12 md:w-6/12 lg:w-4/12 border-dashed border-red-300 animate-spin-reverse aspect-square rounded-full z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="hidden md:block absolute w-8/12 md:w-6/12 lg:w-4/12 aspect-square rounded-full z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img
          className="w-3/4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          src={mainLogo}
        />
        {/* Desktop Positioned Items */}
        <img
          className="absolute top-[9%] left-[9%]"
          src={mainLogo1}
          alt="img"
        />
        <div className="absolute text-right w-54 lg:w-80 top-0 -left-45 lg:-left-70 text-lg font-semibold">
          Zero Risk
          <p className="text-sm md:text-md font-normal leading-4">
            The BullBNB team has deployed a self-executing smart contract on the
            Binance Blockchain, designed to operate permanently and remain
            unalterable by any entity.
          </p>
        </div>
        <img
          className="absolute top-[9%] right-[9%]"
          src={mainLogo2}
          alt="img"
        />
        <div className="absolute text-left w-54 lg:w-80 top-0 -right-45 lg:-right-70 text-lg font-semibold">
          Transparency and Anonymity
          <p className="text-sm md:text-md font-normal leading-4">
            The smart contract is fully public, allowing anyone to view the code
            and complete transaction history. This ensures the system’s
            integrity and provides accurate project statistics.
          </p>
        </div>
        <img
          className="absolute bottom-[9%] left-[9%]"
          src={mainLogo3}
          alt="img"
        />
        <div className="absolute text-right w-54 lg:w-80 bottom-0 -left-45 lg:-left-70 text-lg font-semibold">
          Instant Transactions
          <p className="text-sm md:text-md font-normal leading-4">
            Profits flow directly from other members into your personal wallet.
            There is no accumulation within the system—your earnings are
            entirely yours.
          </p>
        </div>
        <img
          className="absolute bottom-[9%] right-[9%]"
          src={mainLogo4}
          alt="img"
        />
        <div className="absolute text-left w-54 lg:w-80 bottom-0 -right-45 lg:-right-70 text-lg font-semibold">
          Completely Online
          <p className="text-sm md:text-md font-normal leading-4">
            All funds are transferred directly between members, with no hidden
            fees. The contract balance remains at zero at all times.
          </p>
        </div>
        <img
          className="absolute -left-[7%] top-1/2 -translate-y-1/2"
          src={mainLogo5}
          alt="img"
        />
        <div className="absolute text-right w-54 lg:w-80 text-lg font-semibold -left-63 lg:-left-90 top-1/2 -translate-y-1/2">
          Immutability of Conditions
          <p className="text-sm md:text-md font-normal leading-4">
            The BullBNB smart contract serves solely as a payment gateway,
            enabling seamless peer-to-peer commission payments among its
            participants
          </p>
        </div>
        <img
          className="absolute -right-[7%] top-1/2 -translate-y-1/2"
          src={mainLogo6}
          alt="img"
        />
        <div className="absolute w-54 lg:w-80 text-left text-lg font-semibold -right-63 lg:-right-90 top-1/2 -translate-y-1/2">
          Decentralization
          <p className="text-sm md:text-md font-normal leading-4">
            There are no managers or administrators—only the creators, who are
            equal participants in the project, just like everyone else.
          </p>
        </div>
      </div>

      <div className="md:hidden  mt-10 flex flex-col gap-6  w-full px-6 text-center">
        <div className="text-md font-semibold">
          Zero Risk
          <p className="text-sm font-normal mt-1">
            The BullBNB team has deployed a self-executing smart contract on the
            Binance Blockchain, designed to operate permanently and remain
            unalterable by any entity.
          </p>
        </div>
        <div className="text-md font-semibold">
          Transparency and Anonymity
          <p className="text-sm font-normal mt-1">
            The smart contract is fully public, allowing anyone to view the code
            and complete transaction history. This ensures the system’s
            integrity and provides accurate project statistics.
          </p>
        </div>
        <div className="text-md font-semibold">
          Instant Transactions
          <p className="text-sm font-normal mt-1">
            Profits flow directly from other members into your personal wallet.
            There is no accumulation within the system—your earnings are
            entirely yours.
          </p>
        </div>
        <div className="text-md font-semibold">
          Completely Online
          <p className="text-sm font-normal mt-1">
            All funds are transferred directly between members, with no hidden
            fees. The contract balance remains at zero at all times.
          </p>
        </div>
        <div className="text-md font-semibold">
          Immutability of Conditions
          <p className="text-sm font-normal mt-1">
            The BullBNB smart contract serves solely as a payment gateway,
            enabling seamless peer-to-peer commission payments among its
            participants.
          </p>
        </div>
        <div className="text-md font-semibold">
          Decentralization
          <p className="text-sm font-normal mt-1">
            There are no managers or administrators—only the creators, who are
            equal participants in the project, just like everyone else.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Platform;
