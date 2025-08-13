import Footer from "../../component/Footer";
import Title from "../../component/Title";
import FixedTree from "../../component/MyTeamTree/FixedTree";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { ArrowUpFromLine, CornerLeftUp } from "lucide-react";
import green from "../../assets/treeCardIcons/green.jpg";
import gold from "../../assets/treeCardIcons/gold.jpg";
import blue from "../../assets/treeCardIcons/blue.jpg";
import blank from "../../assets/treeCardIcons/blank.jpg";

function MyTree({ openSidebar }) {
  const walletAddress = useSelector(
    (state) => state.accountDetails.walletAddress
  );
  const walletCurrentAddress = useSelector(
    (state) => state.accountDetails.saveMainUserAddress
  );
  const [topId, setTopId] = useState(walletAddress);
  const [parentId, setParentId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [debouncedInputId, setDebouncedInputId] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (inputValue) {
        setDebouncedInputId(inputValue);
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [inputValue]);

  const handleTopClick = () => {
    setTopId(walletAddress.toLowerCase());
  };

  const handleUplineClick = () => {
    if (parentId) {
      setTopId(parentId.toLowerCase());
    } else {
      alert("You can not go ubove this ID.");
    }
  };

  return (
    <div
      className={`absolute inset-0 overflow-auto backdrop-blur-[1px] ${
        walletAddress == walletCurrentAddress
          ? "bg-black/60"
          : "bg-[#490D0D]/80"
      }  flex justify-center sm:p-4`}
    >
      {" "}
      <div
        className={`${
          openSidebar ? "w-[90%] lg:w-full" : "w-[90%] lg:w-[80%]"
        } flex flex-col `}
      >
        <Title title="My Team Tree" />

        <div className="flex-1 pb-6">
          <label className="input bg-black rounded-full w-full text-white border-2 border-white/40">
            <input
              type="number"
              className="grow"
              placeholder="Enter Id"
              min={1}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <svg
              className="h-[1.5em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.3-4.3" />
              </g>
            </svg>
          </label>
          <div className="flex justify-between mt-2">
            <button
              onClick={handleTopClick}
              className="border-[#9D66FF] cursor-pointer flex items-center justify-center gap-1 hover:border-blue-600 text-sm bg-gradient-to-r from-[#9A22C5] to-[#5F09D4] w-20 rounded-md border"
            >
              <ArrowUpFromLine size={15} />
              Top
            </button>
            <button
              onClick={handleUplineClick}
              className="border-[#9D66FF] cursor-pointer flex items-center justify-center gap-1 hover:border-blue-600 text-sm bg-gradient-to-r from-[#9A22C5] to-[#5F09D4] w-20 rounded-md border"
            >
              <CornerLeftUp size={15} /> Upline
            </button>
          </div>

          <div className="mt-4 h-fit">
            <FixedTree
              onParentUpdate={setParentId}
              topId={topId}
              setTopId={setTopId}
              debouncedInputId={debouncedInputId}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            <div className="py-4 px-5 relative rounded-t-3xl flex flex-col items-center gap-3 bg-gradient-to-b from-[#f0b03d59] to-transparent text-center">
              <div className="text-xl">
                <img src={green} className="h-15 rounded-full" alt="img" />
              </div>
              <div>Starter, Executive, Achiever, Pioneer, Director</div>
            </div>
            <div className="py-4 px-5 relative rounded-t-3xl flex flex-col items-center gap-3 bg-gradient-to-b from-[#f0b03d59] to-transparent text-center">
              <div className="text-xl">
                <img src={blue} className="h-15 rounded-full" alt="img" />
              </div>
              <div>Star, Champion, Mentor, Titan, Platinum</div>
            </div>
            <div className="py-4 px-5 relative rounded-t-3xl flex flex-col items-center gap-3 bg-gradient-to-b from-[#f0b03d59] to-transparent text-center">
              <div className="text-xl">
                <img src={gold} className="h-15 rounded-full" alt="img" />
              </div>
              <div>Diamond, Icon, Legend, Ambassador, President</div>
            </div>
            <div className="py-4 px-5 relative rounded-t-3xl flex flex-col items-center gap-3 bg-gradient-to-b from-[#f0b03d59] to-transparent text-center">
              <div className="text-xl">
                <img src={blank} className="h-15 rounded-full" alt="img" />
              </div>
              <div>Vacant</div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default MyTree;
