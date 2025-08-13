function PromoTab({ name, isActive, handleClick }) {
  return (
    <div
      className={`cursor-pointer px-1 sm:px-4 sm:py-1 rounded border-2 ${
        isActive
          ? "bg-gradient-to-tr from-[#B55209] to-[#E2A049] border-[#E2B17D]"
          : "bg-gradient-to-tr from-white/10 via-transparent to-white/10 border-white/40"
      }`}
      onClick={handleClick}
    >
      {name}
    </div>
  );
}

export default PromoTab;
