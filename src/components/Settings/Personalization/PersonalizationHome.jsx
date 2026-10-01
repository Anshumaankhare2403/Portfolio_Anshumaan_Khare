import {
  IoImageOutline,
  IoColorPaletteOutline,
  IoBrushOutline,
  IoLockClosedOutline,
  IoAppsOutline,
  IoLayersOutline,
  IoChevronForward,
  IoRefreshOutline,
} from "react-icons/io5";
import { useSettings } from "../../../hooks/useSettings";

export default function PersonalizationHome({ onNavigate, onOpenResetModal }) {
  const { desktopWallpaper, theme, activeAccent } = useSettings();

  const cards = [
    {
      id: "background",
      title: "Background",
      desc: "Desktop background image, picture URL, or local file upload",
      icon: IoImageOutline,
      subPage: "background",
      badge: "Active",
    },
    {
      id: "colors",
      title: "Colors",
      desc: `Accent colors, light/dark appearance (${theme} mode active)`,
      icon: IoColorPaletteOutline,
      subPage: "colors",
      badge: activeAccent.name,
    },
    {
      id: "themes",
      title: "Themes",
      desc: "Apply complete Windows 11 and bioluminescent style themes",
      icon: IoBrushOutline,
      subPage: "themes",
      badge: "6 packs",
    },
    {
      id: "lockscreen",
      title: "Lock screen",
      desc: "Personalize the screen you see when your PC is locked",
      icon: IoLockClosedOutline,
      subPage: "lockscreen",
      badge: "Active",
    },
    {
      id: "start",
      title: "Start",
      desc: "Recently opened applications, recommendations, and search",
      icon: IoAppsOutline,
      badge: "Coming soon",
      disabled: true,
    },
    {
      id: "taskbar",
      title: "Taskbar",
      desc: "Dock alignment, desktop spaces indicator, system tray items",
      icon: IoLayersOutline,
      badge: "Coming soon",
      disabled: true,
    },
  ];

  return (
    <div className="flex flex-col gap-5 p-6 max-w-4xl select-none">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Personalization</h2>
        <p className="text-xs text-white/50 mt-0.5">
          Customize wallpapers, colors, themes, and screen appearance
        </p>
      </div>

      {/* Top Banner Card with Live Wallpaper Preview */}
      <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/40 p-5 flex flex-col sm:flex-row items-center gap-5 shadow-xl">
        <div
          className="relative w-full sm:w-56 aspect-video rounded-xl overflow-hidden border border-white/20 shadow-md shrink-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${desktopWallpaper})` }}
        >
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-1.5 left-2 text-[9px] text-white/80 bg-black/50 px-1.5 py-0.5 rounded backdrop-blur-sm">
            Current Desktop
          </div>
        </div>

        <div className="flex-1 w-full space-y-1.5 text-center sm:text-left">
          <span className="text-xs uppercase tracking-wider font-bold text-[var(--accent-color,#0078d4)]">
            Active Theme & Environment
          </span>
          <h3 className="text-lg font-bold text-white">Custom Portfolio Desktop</h3>
          <p className="text-xs text-white/60">
            Appearance: <strong className="text-white capitalize">{theme}</strong> • Accent:{" "}
            <strong className="text-white">{activeAccent.name}</strong>
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <button
              type="button"
              onClick={() => onNavigate("background")}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/15 transition cursor-pointer"
            >
              Change Wallpaper
            </button>
            <button
              type="button"
              onClick={() => onNavigate("colors")}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/15 transition cursor-pointer"
            >
              Adjust Colors
            </button>
          </div>
        </div>
      </div>

      {/* Windows 11 Setting Navigation Cards */}
      <div className="flex flex-col gap-2">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.id}
              type="button"
              disabled={card.disabled}
              onClick={() => {
                if (!card.disabled && card.subPage) {
                  onNavigate(card.subPage);
                }
              }}
              className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                card.disabled
                  ? "border-white/5 bg-white/[0.02] opacity-60 cursor-not-allowed"
                  : "border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.08] cursor-pointer"
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/90">
                  <Icon size={19} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white truncate">
                      {card.title}
                    </span>
                    {card.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-white/10 text-white/70 border border-white/10">
                        {card.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-white/50 block truncate mt-0.5">
                    {card.desc}
                  </span>
                </div>
              </div>

              {!card.disabled && (
                <IoChevronForward size={16} className="text-white/40 shrink-0 ml-2" />
              )}
            </button>
          );
        })}
      </div>

      {/* Reset All Settings Card */}
      <div className="mt-2 rounded-xl border border-red-500/20 bg-red-950/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-red-300 block">
            Reset all settings
          </span>
          <span className="text-[11px] text-red-200/60">
            Restore desktop wallpaper, lock screen, and colors to default Windows settings
          </span>
        </div>

        <button
          type="button"
          onClick={onOpenResetModal}
          className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30 transition cursor-pointer self-start sm:self-auto active:scale-95"
        >
          <IoRefreshOutline size={15} />
          <span>Reset to Defaults</span>
        </button>
      </div>
    </div>
  );
}
