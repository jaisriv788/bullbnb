function PartnerPoolBonus({ openSidebar }) {
  return (
 <div
      className={`absolute inset-0 overflow-x-hidden backdrop-blur-[1px] bg-black/80 flex justify-center sm:py-4 ${
        openSidebar && "lg:pr-20 "
      }`}
    >
      <div
        className={`${
          openSidebar ? "w-[90%] lg:w-full" : "w-[90%] lg:w-[80%]"
        } flex flex-col sm:px-5 max-w-[1320px]`}
      >
        PartnerPoolBonus
      </div>
    </div>
  )
}

export default PartnerPoolBonus