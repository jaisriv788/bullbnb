import { useDispatch } from "react-redux";
import { copyModalVisibilty } from "../features/copyModal/copyModalVisiblilty";

function CopyModel() {
  const dispatch = useDispatch();

  return (
    <div className="absolute z-90 top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center">
      <div className="bg-[#262626] pb-5 text-white px-6 py-3 rounded-lg shadow-lg flex flex-col w-[300px] items-center gap-4">
        <div className="mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 130.2 130.2"
            className="w-20 h-20"
          >
            <circle
              className="circle-animation"
              fill="none"
              stroke="#FFEB3B"
              strokeWidth="8"
              strokeMiterlimit="10"
              cx="65.1"
              cy="65.1"
              r="61.1"
            />
            <polyline
              className="check-animation"
              fill="none"
              stroke="#FFEB3B"
              strokeWidth="6"
              strokeLinecap="round"
              strokeMiterlimit="10"
              points="29.8,67.5 51.5,88.8 100.2,40.2"
            />
          </svg>
        </div>
        <div>Successfully Copied</div>
        <button
          onClick={() => {
            dispatch(copyModalVisibilty(false));
          }}
          className="cursor-pointer bg-gradient-to-r hover:border-blue-400 from-[#9F24C4] to-[#5906D6] w-full py-1 rounded-md border-1 border-[#ba85ca]"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default CopyModel;
