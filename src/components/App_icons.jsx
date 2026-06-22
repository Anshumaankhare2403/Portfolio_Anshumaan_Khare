
function App_icons({ image, title,onClick }) {

  return (
    <>
      <div
        className="pt-2 w-24 flex flex-col items-center cursor-pointer hover:bg-sky-700 hover:rounded-sm"
        onClick={onClick}
      >
        <img
          src={image}
          alt={title}
          className="w-13 h-13 object-contain"
        />

        <span className="mt-2 text-white text-xs text-center drop-shadow-md">
          {title}
        </span>
      </div>

    </>
  );
}

export default App_icons;