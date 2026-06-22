import { useEffect, useState } from "react";
import { FaWifi, FaVolumeUp, FaBatteryThreeQuarters } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

function Dock({
  launcherIcon,
  apps,
  onLauncherToggle,
  onLogout,
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
                 w-195 h-16 rounded-2xl
                 bg-white/10 backdrop-blur-xl
                 border border-white/20 shadow-lg"
    >
      <div className="flex h-full items-center justify-between gap-4 px-4 py-3">
        {/* App Icons */}
        <div className="flex flex-wrap items-end gap-1">
          <button
            type="button"
            onClick={onLauncherToggle}
            title="Open app menu"
            aria-label="Open app menu"
            className="flex min-w-17 pb-2 flex-col items-center gap-1 rounded-xl px-2 py-1 cursor-pointer object-contain hover:scale-110 transition"
          >
            <img
              src={launcherIcon}
              alt=""
              className="h-8 w-8 object-contain opacity-95"
            />
            
          </button>

          {apps.map((app) => (
            <button
              key={app.id}
              type="button"
              onClick={app.open}
              title={app.title}
              aria-label={app.title}
              className="flex min-w-16 flex-col items-center gap-1 rounded-xl px-2 py-1 cursor-pointer object-contain hover:scale-110 transition"
            >
              <img
                src={app.image}
                alt=""
                className="h-10 w-10 object-contain transition hover:scale-110"
              />
              
            </button>
          ))}
        </div>

        {/* System Tray */}
        <div className="flex shrink-0 items-center gap-3 text-white">
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

          <button
            type="button"
            onClick={onLogout}
            title="Sign out"
            aria-label="Sign out"
            className="grid h-13 w-13 place-items-center rounded-lg text-xl transition hover:bg-white/15 hover:text-red-300"
          >
            <IoLogOutOutline />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dock;
