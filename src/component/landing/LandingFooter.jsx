import imgSrc1 from "../../assets/logos/telegram.png";
import imgSrc2 from "../../assets/logos/twitter.png";
import imgSrc3 from "../../assets/logos/youtube.png";

function LandingFooter() {
  return (
    <div
      className="w-full h-3/4 bg-cover relative bg-center pt-10"
      style={{
        backgroundImage: "url('footer.webp')",
      }}
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
      <div className="flex flex-wrap justify-evenly sm:justify-center sm:gap-10 md:gap-20 mt-10">
        {/* Icon 1 */}
        <div className="flex flex-col items-center">
          <a
            href="https://t.me/opBullBNB_bot"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="group rounded-full relative w-16 h-16">
              <div className="h-full w-full rounded-full bg-[conic-gradient(from_0deg,_transparent,_transparent,_transparent,#C59742,#DC7C2E,#C03911)] p-1 cursor-pointer spin">
                <div className="h-full w-full rounded-full cursor-pointer bg-[conic-gradient(from_0deg,#151126,#111122,#111122,#221133)] p-2"></div>
              </div>
              <div className="bg-white w-12 rounded-full absolute top-1/2 left-1/2 cursor-pointer transform -translate-x-1/2 -translate-y-1/2">
                <img src={imgSrc1} alt="Bot Icon" />
              </div>
            </div>
          </a>
          <div className="text-white text-sm font-semibold mt-2 text-center">
            Support
          </div>
        </div>

        {/* Icon 2 */}
        <div className="flex flex-col items-center">
          <a
            href="https://t.me/opBullBNB_bot"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="group rounded-full relative w-16 h-16">
              <div className="h-full w-full rounded-full bg-[conic-gradient(from_0deg,_transparent,_transparent,_transparent,#C59742,#DC7C2E,#C03911)] p-1 cursor-pointer spin">
                <div className="h-full w-full rounded-full cursor-pointer bg-[conic-gradient(from_0deg,#151126,#111122,#111122,#221133)] p-2"></div>
              </div>
              <div className="bg-white w-12 rounded-full absolute top-1/2 left-1/2 cursor-pointer transform -translate-x-1/2 -translate-y-1/2">
                <img src={imgSrc1} />
              </div>
            </div>
          </a>
          <div className="text-white text-sm font-semibold mt-2 text-center">
            Announcement
          </div>
        </div>

        {/* Icon 3 */}
        <div className="flex flex-col items-center">
          <a
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="group rounded-full relative w-16 h-16">
              <div className="h-full w-full rounded-full bg-[conic-gradient(from_0deg,_transparent,_transparent,_transparent,#C59742,#DC7C2E,#C03911)] p-1 cursor-pointer spin">
                <div className="h-full w-full rounded-full cursor-pointer bg-[conic-gradient(from_0deg,#151126,#111122,#111122,#221133)] p-2"></div>
              </div>
              <div className="bg-white w-12 rounded-full absolute top-1/2 left-1/2 cursor-pointer transform -translate-x-1/2 -translate-y-1/2">
                <img src={imgSrc2} />
              </div>
            </div>
          </a>
          <div className="text-white text-sm font-semibold mt-2 text-center">
            Twitter
          </div>
        </div>

        {/* Icon 4 */}
        <div className="flex flex-col items-center">
          <a
            href="https://www.youtube.com/@opBullBNB"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="group rounded-full relative w-16 h-16">
              <div className="h-full w-full rounded-full bg-[conic-gradient(from_0deg,_transparent,_transparent,_transparent,#C59742,#DC7C2E,#C03911)] p-1 cursor-pointer spin">
                <div className="h-full w-full rounded-full cursor-pointer bg-[conic-gradient(from_0deg,#151126,#111122,#111122,#221133)] p-2"></div>
              </div>
              <div className="bg-white w-12 rounded-full absolute top-1/2 left-1/2 cursor-pointer transform -translate-x-1/2 -translate-y-1/2">
                <img src={imgSrc3} />
              </div>
            </div>
          </a>
          <div className="text-white text-sm font-semibold mt-2 text-center">
            YouTUbe
          </div>
        </div>
      </div>
      <div className="absolute flex flex-col gap-3 items-center bottom-10 sm:bottom-15 w-full text-center text-white text-sm">
        © 2025. All Rights Reserved. Built with passion ❤️ on opBNB
        <div className="w-full sm:w-10/12 hidden sm:block">
          Disclaimer: Participation in this decentralized community smart
          contract program is entirely voluntary. Under no circumstances should
          any information on this website or in any presentation be considered
          as solicitation, investment advice, or financial guidance. All
          information provided is for general purposes only and does not take
          into account your specific personal or financial situation. The
          decentralized community smart contract program is not a get-rich-quick
          scheme. We strongly recommend consulting a qualified professional
          before making any decisions if you are uncertain. Your continued
          participation in this smart contract program indicates your acceptance
          of our disclaimer.
        </div>
      </div>{" "}
    </div>
  );
}

export default LandingFooter;
