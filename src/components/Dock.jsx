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
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] pointer-events-auto select-none">
      <div className="flex h-14 sm:h-16 items-center justify-between gap-2 sm:gap-3 rounded-2xl sm:rounded-3xl border border-white/20 bg-black/40 px-3 sm:px-4 shadow-2xl backdrop-blur-2xl transition-all">
        {/* App Icons Strip - Dynamic Horizontal Row */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none py-1">
          {/* Launcher Button */}
          <button
            type="button"
            onClick={onLauncherToggle}
            title="Open App Menu"
            aria-label="Open App Menu"
            className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 p-1.5 hover:bg-white/25 hover:scale-110 active:scale-95 transition-all shadow"
          >
            <img
              src={launcherIcon}
              alt="Start"
              className="h-7 w-7 sm:h-8 sm:w-8 object-contain"
            />
          </button>

          {/* Divider */}
          <div className="h-6 sm:h-7 w-[1px] bg-white/20 shrink-0 mx-0.5" />

          {/* App Icons */}
          {apps.map((app) => (
            <button
              key={app.id}
              type="button"
              onClick={app.open}
              title={app.isMinimized ? `${app.title} (Minimized)` : app.title}
              aria-label={app.title}
              className="group relative flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 flex-col items-center justify-center rounded-xl p-1 hover:bg-white/15 hover:scale-110 active:scale-95 transition-all"
            >
              <img
                src={app.image}
                alt={app.title}
                className={`h-7 w-7 sm:h-8 sm:w-8 object-contain transition-transform ${
                  app.isMinimized ? "opacity-60 scale-90 grayscale-[30%]" : ""
                }`}
              />
              {app.isOpen && (
                <span
                  className={`absolute -bottom-0.5 h-1.5 w-1.5 rounded-full transition-all ${
                    app.isMinimized
                      ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]"
                      : "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]"
                  }`}
                />
              )}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="h-6 sm:h-7 w-[1px] bg-white/20 shrink-0 mx-0.5" />

        {/* System Tray */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3 text-white">
          <div className="hidden sm:flex items-center gap-2 text-white/80">
            <FaWifi size={14} />
            <FaVolumeUp size={14} />
            <FaBatteryThreeQuarters size={14} />
          </div>

          <div className="text-right leading-tight">
            <div className="text-xs sm:text-sm font-semibold tracking-tight">
              {dateTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div className="text-[10px] sm:text-xs font-medium text-white/70">
              {dateTime.toLocaleDateString([], {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={onLogout}
            title="Log out"
            aria-label="Log out"
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl text-lg text-white/90 hover:bg-red-500/30 hover:text-red-300 active:scale-95 transition"
          >
            <IoLogOutOutline size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dock;
