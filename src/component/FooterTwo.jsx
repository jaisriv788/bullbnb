import imgSrc from "../assets/footer.webp";

function FooterTwo() {
  return (
    <footer className="mt-auto z-50 flex relative w-full h-130 sm:h-90 bg-cover bg-center bg-[url('../assets/footer.webp')]">
      <img className="z-10" src={imgSrc} />
      <div className="z-50 absolute self-end flex justify-center bottom-0 w-full text-white text-center sm:px-4 py-3">
        <div className="w-full sm:max-w-7xl">
          <p className="text-[12px] sm:text-sm md:text-base mb-1">
            © 2025. All Rights Reserved. Build with passion ❤️ on opBNB.
          </p>
          <p className="text-[10px] sm:text-sm ">
            Disclaimer: Participation in this decentralized community smart
            contract program is entirely voluntary. Under no circumstances
            should any information on this website or in any presentation be
            considered as solicitation, investment advice, or financial
            guidance. All information provided is for general purposes only and
            does not take into account your specific personal or financial
            situation. The decentralized community smart contract program is not
            a get-rich-quick scheme. We strongly recommend consulting a
            qualified professional before making any decisions if you are
            uncertain. Your continued participation in this smart contract
            program indicates your acceptance of our disclaimer.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default FooterTwo;
