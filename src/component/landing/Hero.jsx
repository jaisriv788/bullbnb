import imgSrc from "../../assets/logos/ring-text.png";
import ringSrc from "../../assets/logos/ring-text.png";
import centralImageSrc from "../../assets/logos/ring-transparent.png";
import logoSrc from "../../assets/logos/bullbnb.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import bgSrc from "../../assets/landing.jpg";

function Hero() {
  const [bubbles, setBubbles] = useState([]);
  const [raindrops, setRaindrops] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const createBubble = () => {
      const newBubble = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 15 + 5,
        animationDuration: 15,
      };

      setBubbles((prev) => [...prev, newBubble]);

      setTimeout(() => {
        setBubbles((prev) =>
          prev.filter((bubble) => bubble.id !== newBubble.id)
        );
      }, newBubble.animationDuration * 1000);
    };

    const interval = setInterval(() => {
      createBubble();
    }, Math.random() * 100 + 100); // interval 200–700ms

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const drops = Array.from({ length: 20 }, () => ({
      id: Date.now() + Math.random(),
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 15}s`,
      animationDuration: `15s`,
    }));
    setRaindrops(drops);
  }, []);

  return (
    <section id="hero" className="min-h-screen z-0 relative">
      {/* <div className="absolute inset-0 overflow-hidden"> */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat zoom-animation"
        style={{
          backgroundImage: `url(${bgSrc})`,
          transformOrigin: "center",
        }}
      ></div>
      {/* </div> */}

      <div className="absolute -top-16 inset-0 pointer-events-none z-0">
        {raindrops.map((drop) => (
          <img
            key={drop.id}
            src={imgSrc}
            className="raindrop"
            style={{
              left: drop.left,
              animationDelay: drop.animationDelay,
              animationDuration: drop.animationDuration,
            }}
          />
        ))}
      </div>

      <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-[300px] sm:w-[400px] md:w-[450px] aspect-square">
          <img className="absolute opacity-40" src={ringSrc} alt="" />
          <img
            className="absolute opacity-40 animate-spin"
            style={{ animationDuration: "15s" }}
            src={centralImageSrc}
            alt=""
          />
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="bubble"
            style={{
              top: `${bubble.top}%`,
              left: `${bubble.left}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              animationDuration: `${bubble.animationDuration}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute pt-5 sm:pt-0 w-11/12 md:w-9/12 lg:w-1/2 flex flex-col gap-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
        {" "}
        <img
          className="self-center w-[500px] md:w-[700px]"
          src={logoSrc}
          alt=""
        />
        <div className="flex gap-2 md:gap-5 flex-col">
          <div className="text-4xl md:text-6xl lg:text-6xl font-bold text-center">
            THE WORLD’S FIRST
          </div>
          <div className="text-3xl mdtext-5xl xl:text-6xl font-bold text-center rainbow-text">
            100% DECENTRALIZED MATRIX PLATFORM
          </div>
        </div>
        <div className="flex xl:flex-row flex-col gap-2 md:gap-5">
          <button
            onClick={() => navigate("/registration")}
            className="flex-1 btn-hover color-2"
          >
            Registration
          </button>
          <button
            onClick={() => {
              document
                .getElementById("introvideo")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex-1  btn-hover color-8"
          >
            Introduction video
          </button>
          <button
            onClick={() => navigate("/login")}
            className="flex-1  btn-hover color-7"
          >
            Login
          </button>
        </div>
        <div className="text-center hidden sm:block text-sm md:text-md">
          The BullBNB smart contract is developed exclusively on the opBNB
          blockchain. The website serves only as a reflector of the BullBNB
          smart contract. The BullBNB smart contract is independent of any
          website or domain and can operate indefinitely on the opBNB blockchain
          without requiring a website or domain. All transactional data will be
          permanently stored on the opBNB blockchain.
        </div>
      </div>
    </section>
  );
}

export default Hero;
