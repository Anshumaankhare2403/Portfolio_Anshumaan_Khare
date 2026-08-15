
function App_icons({ image, title, onClick }) {
  return (
    <button
      type="button"
      className="flex w-20 flex-col items-center rounded-lg p-1.5 transition hover:bg-white/20 focus:bg-white/20 focus:outline-none cursor-pointer"
      onClick={onClick}
    >
      <img src={image} alt={title} className="h-12 w-12 object-contain" />

      <span className="mt-1 text-center text-xs font-medium text-white drop-shadow-md leading-tight line-clamp-2">
        {title}
      </span>
    </button>
  );
}

export default App_icons;
