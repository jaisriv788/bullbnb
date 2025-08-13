import { FaqData } from "../../data/data";
import FaqsBox from "./FaqsBox";

function Faq() {
  return (
    <section
      id="faq"
      className="min-h-screen bg-black py-15 flex flex-col items-center"
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
          FAQ
          <div
            className="h-[2px] w-20"
            style={{
              background:
                "linear-gradient(to right, transparent, #885407, yellow, #7C7524, transparent)",
            }}
          ></div>
        </div>
        <div className="text-center text-3xl font-semibold text-yellow-300">
          Questions? We have Answers.
        </div>
      </div>
      <div className="mt-10 w-full max-w-3xl px-4">
        <div className="flex-1 flex flex-col gap-3">
          {FaqData.map(({ id, question, answer }) => {
            return <FaqsBox key={id} question={question} answer={answer} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default Faq;
