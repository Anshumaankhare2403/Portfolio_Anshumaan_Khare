function App_icons({ image, title, onClick }) {
  return (
    <button
      type="button"
      className="flex w-20 flex-col items-center rounded-xl p-1.5 transition-all duration-200 hover:bg-cyan-500/15 hover:border hover:border-cyan-400/30 hover:shadow-[0_0_16px_rgba(6,182,212,0.25)] focus:bg-cyan-500/20 focus:outline-none cursor-pointer group"
      onClick={onClick}
    >
      <img
        src={image}
        alt={title}
        className="h-12 w-12 object-contain group-hover:scale-105 transition-transform"
      />

      <span className="mt-1 text-center text-xs font-medium text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-tight line-clamp-2 group-hover:text-cyan-100">
        {title}
      </span>
    </button>
  );
}

export default App_icons;
