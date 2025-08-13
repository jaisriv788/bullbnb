import LogoSpinner from "../component/LogoSpinner";
import img1 from "../assets/download/bullbnb-1.jpg";
import img2 from "../assets/download/bullbnb-2.jpg";
import img3 from "../assets/download/bullbnb-3.jpg";
import img4 from "../assets/download/bullbnb-4.jpg";
import img5 from "../assets/download/bullbnb-5.jpg";
import img6 from "../assets/download/bullbnb-6.jpg";
import img7 from "../assets/download/bullbnb-7.jpg";
import img8 from "../assets/download/bullbnb-8.jpg";
import img9 from "../assets/download/bullbnb-9.jpg";
import img10 from "../assets/download/bullbnb-10.jpg";
import img11 from "../assets/download/bullbnb-11.jpg";
import img12 from "../assets/download/bullbnb-12.jpg";
import img13 from "../assets/download/bullbnb-13.jpg";
import img14 from "../assets/download/bullbnb-14.jpg";
import img15 from "../assets/download/bullbnb-15.jpg";
import img16 from "../assets/download/bullbnb-16.jpg";
import img17 from "../assets/download/bullbnb-17.jpg";
import img18 from "../assets/download/bullbnb-18.jpg";
import img19 from "../assets/download/bullbnb-19.jpg";
import img20 from "../assets/download/bullbnb-20.jpg";
import img21 from "../assets/download/bullbnb-21.jpg";
import img22 from "../assets/download/bullbnb-22.jpg";
import img23 from "../assets/download/bullbnb-23.jpg";
import img24 from "../assets/download/bullbnb-24.jpg";
import img25 from "../assets/download/bullbnb-25.jpg";
import img26 from "../assets/download/bullbnb-26.jpg";
import img27 from "../assets/download/bullbnb-27.jpg";
import img28 from "../assets/download/bullbnb-28.jpg";

const imageArray = [
  { image: img1 },
  { image: img2 },
  { image: img3 },
  { image: img4 },
  { image: img5 },
  { image: img6 },
  { image: img7 },
  { image: img8 },
  { image: img9 },
  { image: img10 },
  { image: img11 },
  { image: img12 },
  { image: img13 },
  { image: img14 },
  { image: img15 },
  { image: img16 },
  { image: img17 },
  { image: img18 },
  { image: img19 },
  { image: img20 },
  { image: img21 },
  { image: img22 },
  { image: img23 },
  { image: img24 },
  { image: img25 },
  { image: img26 },
  { image: img27 },
  { image: img28 },
];

function Download() {
  return (
    <div className="">
      <LogoSpinner />
      <div className="absolute w-full min-h-full bg-black/60">
        <div className="mt-28 flex flex-col gap-10">
          <div className="flex flex-col items-center ">
            <div className="text-lg font-bold flex items-center gap-5 text-center text-wrap">
              <div
                className="h-[2px] w-20"
                style={{
                  background:
                    "linear-gradient(to right, transparent, #885407, yellow, #7C7524, transparent)",
                }}
              ></div>
              BullBNB Promo Banners
              <div
                className="h-[2px] w-20"
                style={{
                  background:
                    "linear-gradient(to right, transparent, #885407, yellow, #7C7524, transparent)",
                }}
              ></div>
            </div>
            <div className="text-center text-3xl font-semibold text-yellow-300">
              Download
            </div>
            <div className="text-center max-w-md text-sm mt-3 font-semibold">
              One of the most effective ways to promote your link online is to
              download the banner and share it on your social media pages.
            </div>
          </div>
          <div className="px-10 sm:px-20 lg:px-40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 ">
            {imageArray.map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-[#00060A]/70 flex flex-col items-center rounded-xl p-5 border-2 border-gray-800 "
                >
                  <img src={item.image} alt="img" className="h-50" />
                  <a
                    href={item.image}
                    download={`bullbnb-${index + 1}.jpg`}
                    className="mt-3 btn-theme3 cursor-pointer text-center"
                  >
                    Download
                  </a>{" "}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Download;
