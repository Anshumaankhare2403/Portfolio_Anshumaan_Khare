
import { useEffect, useState } from "react";
import { FaWifi, FaVolumeUp, FaBatteryThreeQuarters } from "react-icons/fa";

function Dock({
  image1,
  image2,
  image3,
  image4,
  image5,
  onFilesClick,
  onChromeClick,
   onAboutClick,
}) {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="absolute bottom-4 left-1/2 -translate-x-1/2
                 w-130 h-16 rounded-2xl
                 bg-white/10 backdrop-blur-xl
                 border border-white/20 shadow-lg"
    >
      <div className="flex h-full items-center justify-between px-4">
        {/* App Icons */}
        <div className="flex gap-3 ">
          <img
            src={image1}
            alt="Files"
            onClick={onFilesClick}
            className="w-12 h-12 cursor-pointer object-contain hover:scale-110 transition p-[2px]"
          />
          <img
            src={image2}
            alt="Chrome"
            onClick={onChromeClick}
            className="w-11 h-11 cursor-pointer object-contain hover:scale-110 transition p-[2px]"
          />
          <img
            src={image3}
            className="w-11 h-11 object-contain hover:scale-110 transition p-[2px]"
          />
          <img
            src={image4}
            alt="About Me"
            onClick={ onAboutClick}
            className="w-12 h-12 object-contain hover:scale-110 transition p-[2px]"
          />
          <img
            src={image5}
            className="w-12 h-12 object-contain hover:scale-110 transition p-[2px]"
          />
        </div>

        {/* System Tray */}
        <div className="flex items-center gap-4 text-white">
          <FaWifi size={17} />
          <FaVolumeUp size={17} />
          <FaBatteryThreeQuarters size={17} />
          <div className="text-right">
            <div className="text-sm font-medium">
              {dateTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>

            <div className="text-sm font-medium ">
              {dateTime.toLocaleDateString([], {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dock;
