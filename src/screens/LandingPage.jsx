import Hero from "../component/landing/Hero";
import Platform from "../component/landing/Platform";
import BuilderPlan from "../component/landing/BuilderPlan";
import IntroductionVideo from "../component/landing/IntroductionVideo";
import Faq from "../component/landing/Faq";
import Audit from "../component/landing/Audit";
import LandingFooter from "../component/landing/LandingFooter";
import Security from "../component/landing/Security";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

function LandingPage() {
  const [showDiv, setShowDiv] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToHero) {
      setTimeout(() => {
        document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
    if (location.state?.scrollToPlatform) {
      setTimeout(() => {
        document
          .getElementById("platform")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
    if (location.state?.scrollToFaq) {
      setTimeout(() => {
        document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location.state]);

  return (
    <div className="h-full overflow-x-hidden">
      <Hero />
      <Platform />
      <BuilderPlan />
      <IntroductionVideo />
      <Audit />
      <Faq />
      <Security />
      <LandingFooter />
      <div className="fixed w-[96%] md:w-[98%] z-50 lg:w-[99%] -bottom-2 left-0 z--10">
        {showDiv && (
          <div className="bg-black border-t-1 border-white/20 text-center py-2 text-sm">
            By using this website, you agree that we and our partners may set
            cookies for purposes such as customising content and advertising.
            <span
              onClick={() => setShowDiv(false)}
              className="bg-white ml-3 cursor-pointer text-black px-2  rounded-lg border-1"
            >
              Got it.
            </span>
          </div>
        )}
        <marquee className="bg-green-600/30 text-sm">
          Beware of fake resources. Community BULLBNB has only one site address.
          BULLBNB.COM
        </marquee>
      </div>
    </div>
  );
}

export default LandingPage;
