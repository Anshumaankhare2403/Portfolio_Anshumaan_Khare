
function App_icons({ image, title, onClick }) {
  return (
    <button
      type="button"
      className="flex w-24 flex-col items-center rounded-lg pt-2 transition hover:bg-sky-700/70 focus:bg-sky-700/70 focus:outline-none"
      onClick={onClick}
    >
      <img src={image} alt={title} className="h-14 w-14 object-contain" />

      <span className="mt-2 text-center text-xs text-white drop-shadow-md">
        {title}
      </span>
    </button>
  );
}

export default App_icons;
