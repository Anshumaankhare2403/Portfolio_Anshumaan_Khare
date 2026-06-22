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
                 min-h-20 w-[min(98vw,920px)] rounded-[1.75rem]
                 bg-white/10 backdrop-blur-xl
                 border border-white/20 shadow-lg"
    >
      <div className="flex h-full items-center justify-between gap-4 px-4 py-3">
        {/* App Icons */}
        <div className="flex flex-wrap items-end gap-2">
          <button
            type="button"
            onClick={onLauncherToggle}
            title="Open app menu"
            aria-label="Open app menu"
            className="flex min-w-16 flex-col items-center gap-1 rounded-xl px-2 py-1 transition hover:bg-white/15 focus:bg-white/15 focus:outline-none"
          >
            <img
              src={launcherIcon}
              alt=""
              className="h-8 w-8 object-contain opacity-95"
            />
            <span className="text-[11px] font-medium text-white/80">
              Apps
            </span>
          </button>

          {apps.map((app) => (
            <button
              key={app.id}
              type="button"
              onClick={app.open}
              title={app.title}
              aria-label={app.title}
              className="flex min-w-16 flex-col items-center gap-1 rounded-xl px-2 py-1 transition hover:bg-white/15 focus:bg-white/15 focus:outline-none"
            >
              <img
                src={app.image}
                alt=""
                className="h-10 w-10 object-contain transition hover:scale-110"
              />
              <span className="max-w-16 text-center text-[11px] font-medium leading-tight text-white/80">
                {app.shortTitle || app.title}
              </span>
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
            className="grid h-12 w-12 place-items-center rounded-lg text-xl transition hover:bg-white/15 hover:text-red-300"
          >
            <IoLogOutOutline />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dock;
