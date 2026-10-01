import { useEffect, useState } from "react";
import { FaWifi, FaVolumeUp, FaBatteryThreeQuarters } from "react-icons/fa";
import { IoLogOutOutline, IoHandLeftOutline } from "react-icons/io5";

function Dock({
  launcherIcon,
  apps,
  onLauncherToggle,
  onLogout,
  appWorkspaces = {},
  activeWorkspace = 0,
  workspaces = [],
  onSelectWorkspace = () => {},
  workspaceWindowCounts = {},
  onOpenGestureGuide = () => {},
}) {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] pointer-events-auto select-none">
      <div className="flex h-14 sm:h-16 items-center justify-between gap-2 sm:gap-3 rounded-2xl sm:rounded-3xl border border-white/20 bg-black/45 px-3 sm:px-4 shadow-[0_15px_45px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-all">
        {/* Launcher Button */}
        <button
          type="button"
          onClick={onLauncherToggle}
          title="Open App Menu (Super / Windows Key)"
          aria-label="Open App Menu"
          className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 p-1.5 hover:bg-white/25 hover:scale-110 active:scale-95 transition-all shadow cursor-pointer"
        >
          <img
            src={launcherIcon}
            alt="Start"
            className="h-7 w-7 sm:h-8 sm:w-8 object-contain"
          />
        </button>

        {/* Desktop Spaces Switcher in Dock */}
        {workspaces.length > 0 && (
          <div
            className="flex items-center gap-1 bg-white/10 p-1 rounded-xl sm:rounded-2xl border border-white/10 shrink-0"
            title="Desktop Spaces (Use 5-finger touchpad swipe to switch)"
          >
            {workspaces.map((ws, i) => {
              const isActive = i === activeWorkspace;
              const count = workspaceWindowCounts[i] || 0;

              return (
                <button
                  key={ws.id}
                  type="button"
                  onClick={() => onSelectWorkspace(i)}
                  title={`${ws.name}: ${ws.label} (${count} active apps)\nTip: 5-finger touchpad swipe to switch spaces`}
                  className={`relative flex items-center justify-center rounded-lg sm:rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "h-8 sm:h-9 px-2.5 sm:px-3 bg-white/25 text-white shadow-md border border-white/30 scale-105"
                      : "h-8 sm:h-9 w-7 sm:w-8 text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span>{ws.shortName}</span>
                  {count > 0 && (
                    <span
                      className={`absolute bottom-1 w-1 h-1 rounded-full ${
                        isActive ? "bg-emerald-400" : "bg-white/50"
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Divider */}
        <div className="h-6 sm:h-7 w-[1px] bg-white/20 shrink-0 mx-0.5" />

        {/* App Icons Strip */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none py-1">
          {apps.map((app) => {
            const appWs = appWorkspaces[app.id] ?? 0;
            const isOnCurrentWorkspace = appWs === activeWorkspace;

            let tooltipText = app.title;
            if (app.isOpen) {
              if (!isOnCurrentWorkspace) {
                tooltipText = `${app.title} (Open on Desktop ${appWs + 1})`;
              } else if (app.isMinimized) {
                tooltipText = `${app.title} (Minimized on this Desktop)`;
              } else {
                tooltipText = `${app.title} (Active on this Desktop)`;
              }
            }

            return (
              <button
                key={app.id}
                type="button"
                onClick={app.open}
                title={tooltipText}
                aria-label={app.title}
                className="group relative flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 flex-col items-center justify-center rounded-xl p-1 hover:bg-white/15 hover:scale-110 active:scale-95 transition-all cursor-pointer"
              >
                <img
                  src={app.image}
                  alt={app.title}
                  className={`h-7 w-7 sm:h-8 sm:w-8 object-contain transition-transform ${
                    app.isMinimized ? "opacity-60 scale-90 grayscale-[30%]" : ""
                  }`}
                />

                {/* Workspace badge if open on another workspace */}
                {app.isOpen && !isOnCurrentWorkspace && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[9px] font-bold text-white shadow-[0_0_6px_rgba(6,182,212,0.8)] border border-white/40">
                    {appWs + 1}
                  </span>
                )}

                {/* Status Dot */}
                {app.isOpen && (
                  <span
                    className={`absolute -bottom-0.5 h-1.5 w-1.5 rounded-full transition-all ${
                      !isOnCurrentWorkspace
                        ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]"
                        : app.isMinimized
                        ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]"
                        : "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="h-6 sm:h-7 w-[1px] bg-white/20 shrink-0 mx-0.5" />

        {/* System Tray */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3 text-white">
          {/* Touchpad 5-Finger Gesture Button */}
          <button
            type="button"
            onClick={onOpenGestureGuide}
            title="5-Finger Touchpad & Trackpad Gestures Guide"
            className="flex items-center justify-center p-1.5 rounded-xl hover:bg-white/15 text-white/70 hover:text-white transition cursor-pointer"
          >
            <IoHandLeftOutline size={16} />
          </button>

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
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl text-lg text-white/90 hover:bg-red-500/30 hover:text-red-300 active:scale-95 transition cursor-pointer"
          >
            <IoLogOutOutline size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dock;
