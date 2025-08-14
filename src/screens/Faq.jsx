import Title from "../component/Title";
import FaqQuestions from "../component/FaqQuestions";
import { FaqData } from "../data/data";
import Footer from "../component/Footer";
import { useSelector } from "react-redux";

function Faq({ openSidebar }) {
  const walletAddress = useSelector(
    (state) => state.accountDetails.walletAddress
  );
  const backupAddress = useSelector(
    (state) => state.accountDetails.saveMainUserAddress
  );
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
        <Title title="FAQs" />

        <div className="flex-1 flex flex-col gap-3">
          {FaqData.map(({ id, question, answer }) => {
            return (
              <FaqQuestions key={id} question={question} answer={answer} />
            );
          })}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Faq;
