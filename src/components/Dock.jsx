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
      <div className="flex h-14 sm:h-16 items-center justify-between gap-2 sm:gap-3 rounded-2xl sm:rounded-3xl border border-cyan-500/30 bg-[#041220]/65 px-3 sm:px-4 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_30px_rgba(6,182,212,0.18)] backdrop-blur-2xl transition-all">
        {/* Launcher Button with Bioluminescent Glow */}
        <button
          type="button"
          onClick={onLauncherToggle}
          title="Open App Menu (Super / Windows Key)"
          aria-label="Open App Menu"
          className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-950/40 border border-cyan-500/20 p-1.5 hover:bg-cyan-500/20 hover:border-cyan-400/40 hover:scale-110 active:scale-95 transition-all shadow-[0_0_12px_rgba(6,182,212,0.15)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer"
        >
          <img
            src={launcherIcon}
            alt="Start"
            className="h-7 w-7 sm:h-8 sm:w-8 object-contain"
          />
        </button>

        {/* Desktop Spaces Switcher in Dock (2-Finger Gesture Default) */}
        {workspaces.length > 0 && (
          <div
            className="flex items-center gap-1 bg-cyan-950/50 p-1 rounded-xl sm:rounded-2xl border border-cyan-500/25 shrink-0 shadow-inner shadow-cyan-950/60"
            title="Desktop Spaces (Use 2-finger touchpad swipe to switch)"
          >
            {workspaces.map((ws, i) => {
              const isActive = i === activeWorkspace;
              const count = workspaceWindowCounts[i] || 0;

              return (
                <button
                  key={ws.id}
                  type="button"
                  onClick={() => onSelectWorkspace(i)}
                  title={`${ws.name}: ${ws.label} (${count} active apps)\nTip: 2-finger touchpad swipe to switch spaces`}
                  className={`relative flex items-center justify-center rounded-lg sm:rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "h-8 sm:h-9 px-2.5 sm:px-3 bg-gradient-to-r from-cyan-500/40 via-sky-500/40 to-teal-500/40 text-cyan-100 shadow-[0_0_14px_rgba(6,182,212,0.5)] border border-cyan-400/50 scale-105"
                      : "h-8 sm:h-9 w-7 sm:w-8 text-cyan-200/50 hover:text-cyan-100 hover:bg-cyan-500/15"
                  }`}
                >
                  <span>{ws.shortName}</span>
                  {count > 0 && (
                    <span
                      className={`absolute bottom-1 w-1 h-1 rounded-full ${
                        isActive
                          ? "bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,1)]"
                          : "bg-cyan-400/60"
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Divider */}
        <div className="h-6 sm:h-7 w-[1px] bg-cyan-500/25 shrink-0 mx-0.5" />

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
                className="group relative flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 flex-col items-center justify-center rounded-xl p-1 hover:bg-cyan-500/15 hover:shadow-[0_0_14px_rgba(6,182,212,0.25)] hover:scale-110 active:scale-95 transition-all cursor-pointer"
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
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-sky-600 text-[9px] font-bold text-white shadow-[0_0_8px_rgba(6,182,212,0.9)] border border-cyan-200/60">
                    {appWs + 1}
                  </span>
                )}

                {/* Status Dot with Bioluminescent Glow */}
                {app.isOpen && (
                  <span
                    className={`absolute -bottom-0.5 h-1.5 w-1.5 rounded-full transition-all ${
                      !isOnCurrentWorkspace
                        ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,1)]"
                        : app.isMinimized
                        ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]"
                        : "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,1)]"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="h-6 sm:h-7 w-[1px] bg-cyan-500/25 shrink-0 mx-0.5" />

        {/* System Tray */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3 text-cyan-100">
          {/* Touchpad 2-Finger Gesture Guide Button */}
          <button
            type="button"
            onClick={onOpenGestureGuide}
            title="2-Finger Touchpad & Trackpad Gestures Guide"
            className="flex items-center justify-center p-1.5 rounded-xl hover:bg-cyan-500/20 text-cyan-300 hover:text-cyan-100 border border-transparent hover:border-cyan-500/30 hover:shadow-[0_0_12px_rgba(6,182,212,0.35)] transition cursor-pointer"
          >
            <IoHandLeftOutline size={16} />
          </button>

          <div className="hidden sm:flex items-center gap-2 text-cyan-200/70">
            <FaWifi size={14} />
            <FaVolumeUp size={14} />
            <FaBatteryThreeQuarters size={14} />
          </div>

          <div className="text-right leading-tight">
            <div className="text-xs sm:text-sm font-semibold tracking-tight text-cyan-100">
              {dateTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div className="text-[10px] sm:text-xs font-medium text-cyan-300/70">
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
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl text-lg text-cyan-100/90 hover:bg-red-500/30 hover:text-red-200 hover:shadow-[0_0_14px_rgba(239,68,68,0.4)] active:scale-95 transition cursor-pointer"
          >
            <IoLogOutOutline size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dock;
