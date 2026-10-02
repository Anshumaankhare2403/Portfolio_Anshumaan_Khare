function App_icons({ image, title, onClick }) {
  return (
    <button
      type="button"
      className="relative flex w-20 flex-col items-center rounded-xl p-1.5 transition-all duration-150 border border-transparent hover:bg-white/[0.12] hover:border-white/25 hover:shadow-[0_8px_20px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:backdrop-blur-md hover:z-20 focus:bg-white/20 focus:border-white/30 focus:outline-none cursor-pointer group"
      onClick={onClick}
    >
      <img
        src={image}
        alt={title}
        className="h-12 w-12 object-contain group-hover:scale-105 transition-transform"
      />

      <span className="mt-1 text-center text-xs font-medium text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-tight line-clamp-2 group-hover:text-white">
        {title}
      </span>
    </button>
  );
}

export default App_icons;
