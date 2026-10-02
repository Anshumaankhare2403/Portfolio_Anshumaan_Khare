import { useEffect, useState } from "react";
import { FaWifi, FaVolumeUp, FaBatteryThreeQuarters } from "react-icons/fa";
import { IoLogOutOutline, IoHandLeftOutline, IoHelpCircleOutline } from "react-icons/io5";

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
  onOpenTutorial = () => {},
}) {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 max-w-[96vw] pointer-events-auto select-none">
      <div className="flex h-14 sm:h-16 items-center justify-between gap-1.5 sm:gap-3 rounded-2xl sm:rounded-3xl border border-white/20 bg-black/40 px-2.5 sm:px-4 shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)] backdrop-blur-2xl transition-all">
        {/* Launcher Button with Frosted Glass */}
        <button
          type="button"
          onClick={onLauncherToggle}
          title="Open App Menu (Super / Windows Key)"
          aria-label="Open App Menu"
          className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-white/[0.08] border border-white/15 p-1.5 hover:bg-white/[0.18] hover:border-white/30 hover:scale-105 active:scale-95 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)] cursor-pointer"
        >
          <img
            src={launcherIcon}
            alt="Start"
            className="h-6 w-6 sm:h-7 sm:w-7 object-contain"
          />
        </button>

        {/* Desktop Spaces Switcher in Dock (Glassy Pill) */}
        {workspaces.length > 0 && (
          <div
            className="flex items-center gap-1 bg-white/[0.08] p-1 rounded-xl sm:rounded-2xl border border-white/15 shrink-0 shadow-inner backdrop-blur-md"
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
                  className={`relative flex items-center justify-center rounded-lg sm:rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "h-8 sm:h-9 px-2 sm:px-3 bg-white/25 text-white shadow-[0_4px_14px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.35)] border border-white/35 scale-105 backdrop-blur-md font-bold"
                      : "h-8 sm:h-9 px-2 sm:px-2.5 text-white/60 hover:text-white hover:bg-white/[0.12]"
                  }`}
                >
                  <span className="hidden md:inline mr-1 text-[11px]">Desktop</span>
                  <span>{i + 1}</span>
                  {count > 0 && (
                    <span
                      className={`absolute bottom-1 w-1 h-1 rounded-full ${
                        isActive
                          ? "bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]"
                          : "bg-white/50"
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Divider */}
        <div className="h-6 sm:h-7 w-[1px] bg-white/15 shrink-0 mx-0.5" />

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
                className="group relative flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 flex-col items-center justify-center rounded-xl p-1 border border-transparent hover:border-white/15 hover:bg-white/15 hover:shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <img
                  src={app.image}
                  alt={app.title}
                  className={`h-7 w-7 sm:h-8 sm:w-8 object-contain transition-transform ${
                    app.isMinimized ? "opacity-60 scale-90 grayscale-[20%]" : ""
                  }`}
                />

                {/* Workspace badge if open on another workspace */}
                {app.isOpen && !isOnCurrentWorkspace && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white/25 text-[9px] font-bold text-white shadow-sm border border-white/40 backdrop-blur-md">
                    {appWs + 1}
                  </span>
                )}

                {/* Status Dot with Clean Glass Glow */}
                {app.isOpen && (
                  <span
                    className={`absolute -bottom-0.5 h-1.5 w-1.5 rounded-full transition-all ${
                      !isOnCurrentWorkspace
                        ? "bg-white/70 shadow-[0_0_6px_rgba(255,255,255,0.7)]"
                        : app.isMinimized
                        ? "bg-amber-300 shadow-[0_0_6px_rgba(252,211,77,0.8)]"
                        : "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="h-6 sm:h-7 w-[1px] bg-white/15 shrink-0 mx-0.5" />

        {/* System Tray */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5 text-white/80">
          {/* Touchpad 2-Finger Gesture Guide Button */}
          <button
            type="button"
            onClick={onOpenGestureGuide}
            title="2-Finger Touchpad & Trackpad Gestures Guide"
            className="flex items-center justify-center p-1.5 rounded-xl hover:bg-white/15 text-white/70 hover:text-white border border-transparent hover:border-white/20 transition cursor-pointer"
          >
            <IoHandLeftOutline size={16} />
          </button>

          {/* Desktop & 2-Finger Gesture Tutorial Button */}
          <button
            type="button"
            onClick={onOpenTutorial}
            title="Interactive Desktop & Gesture Tutorial"
            className="flex items-center justify-center p-1.5 rounded-xl hover:bg-white/15 text-white/70 hover:text-white border border-transparent hover:border-white/20 transition cursor-pointer"
          >
            <IoHelpCircleOutline size={17} />
          </button>

          <div className="hidden sm:flex items-center gap-2 text-white/60">
            <FaWifi size={14} />
            <FaVolumeUp size={14} />
            <FaBatteryThreeQuarters size={14} />
          </div>

          <div className="text-right leading-tight px-1">
            <div className="text-xs sm:text-sm font-medium tracking-tight text-white/95">
              {dateTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div className="text-[10px] sm:text-xs font-normal text-white/50">
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
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl text-white/70 hover:bg-red-500/25 hover:text-red-200 border border-transparent hover:border-red-400/30 active:scale-95 transition cursor-pointer"
          >
            <IoLogOutOutline size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dock;
