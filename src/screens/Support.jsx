import Title from "../component/Title";
import SupportInfo from "../component/SupportInfo";
import { Send, MailSearch, Megaphone } from "lucide-react";
import Footer from "../component/Footer";
import { useSelector } from "react-redux";

const boxes = [
  {
    id: 1,
    title: "Drop us a Line",
    message: "If you have any questions or comments, please email us at",
    btnTag: "Email Us",
    link: "https://mail.google.com/mail/?view=cm&fs=1&to=info@bullbnb.com",
    icon: <MailSearch size={35} />,
  },
  {
    id: 2,
    title: "Support",
    message: "Want to talk? We'd love to here from you!",
    btnTag: "Connect",
    link: "https://t.me/opBullBNB_bot",
    icon: <Send size={35} />,
  },
  {
    id: 3,
    title: "Anouncement",
    message:
      "Connect with us to get all alerts, notifications and latest updates.",
    btnTag: "Connect",
    link: "https://t.me/opBullBNB_bot",
    icon: <Megaphone size={35} />,
  },
];

function Support({ openSidebar }) {
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
      }  flex justify-center sm:p-4`}
    >
      {" "}
      <div
        className={`${
          openSidebar ? "w-[90%] lg:w-full" : "w-[90%] lg:w-[80%]"
        }  flex flex-col`}
      >
        <Title title="Support" />
        <div className="flex-1 flex flex-wrap gap-3 justify-evenly">
          {boxes.map(({ id, title, message, link, icon, btnTag }) => {
            return (
              <SupportInfo
                key={id}
                title={title}
                message={message}
                btnTag={btnTag}
                link={link}
                icon={icon}
              />
            );
          })}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Support;
