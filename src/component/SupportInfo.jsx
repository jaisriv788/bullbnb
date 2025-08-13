function SupportInfo({ title, message, link, icon, btnTag }) {
  return (
    <div className="border-2 text-center px-5 h-fit bg-gradient-to-br box-shadow from-white/10 via-transparent to-white/10 border-[#6E6E6E] flex flex-col items-center rounded-xl py-8 gap-3 grow min-w-5/12 lg:max-w-[38rem]">
      <div className="">{icon}</div>
      <h2 className="text-xl">{title}</h2>
      <p>{message}</p>
      <a
        className="text-[#F4E13A]"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {btnTag}
      </a>
    </div>
  );
}

export default SupportInfo;
