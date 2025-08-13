import { useState } from "react";

function IntroductionVideo() {
  const [activeLang, setActiveLang] = useState("english");

  const languages = [
    {
      key: "english",
      label: "English",
      url: "https://www.youtube.com/embed/-K-4HVHCDFE?autoplay=1&start=0",
    },
    {
      key: "russian",
      label: "Russian",
      url: "https://www.youtube.com/embed/FjEqIHddRQA?autoplay=1&start=0",
    },
    {
      key: "french",
      label: "French",
      url: "https://www.youtube.com/embed/WkINanOWs5E?autoplay=1&start=0",
    },
    {
      key: "arabic",
      label: "Arabic",
      url: "https://www.youtube.com/embed/-K-4HVHCDFE?autoplay=1&start=0",
    },
  ];

  const renderLanguageButtons = languages.map((lang) => (
    <button
      key={lang.key}
      onClick={() => setActiveLang(lang.key)}
      className={`${
        activeLang === lang.key
          ? "bg-gradient-to-tr from-[#FF8113] to-[#B43213]"
          : "bg-black"
      } border-2 font-semibold border-gray-400`}
      style={{
        cursor: "pointer",
        color: "white",
        padding: "8px 16px",
        borderRadius: "20px",
      }}
    >
      {lang.label}
    </button>
  ));

  return (
    <section
      style={{
        backgroundImage: "url('bg3.png')",
        transformOrigin: "center",
      }}
      id="introvideo"
      className="min-h-screen flex flex-col items-center px-4 py-10"
    >
      <div className="flex flex-col items-center pt-5">
        <div className="text-lg font-bold flex flex-wrap justify-center items-center gap-3 text-center">
          <div
            className="h-[2px] w-20"
            style={{
              background:
                "linear-gradient(to right, transparent, #885407, yellow, #7C7524, transparent)",
            }}
          ></div>
          Unleash the Bull Run with BullBNB!
          <div
            className="h-[2px] w-20"
            style={{
              background:
                "linear-gradient(to right, transparent, #885407, yellow, #7C7524, transparent)",
            }}
          ></div>
        </div>
        <div className="text-center text-2xl md:text-3xl font-semibold text-yellow-300 mt-3">
          A Decentralized Wealth Machine - Your Gateway to <br className="hidden sm:block" /> Financial Freedom!
        </div>
      </div>

      <div className="flex flex-wrap justify-center mt-8 gap-3 sm:gap-5">
        {renderLanguageButtons}
      </div>

      <div className="mt-5 flex-1 w-full flex justify-center items-center">
        <div className="bg-[#0D0D0D] rounded-4xl border-2 border-gray-700 p-4 sm:p-8 w-full max-w-4xl">
          <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-2xl">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={languages.find((lang) => lang.key === activeLang)?.url}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IntroductionVideo;
