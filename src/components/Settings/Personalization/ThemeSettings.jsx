import {
  IoChevronBack,
  IoCheckmark,
  IoLogoGithub,
  IoOpenOutline,
  IoSparkles,
} from "react-icons/io5";
import { useSettings } from "../../../hooks/useSettings";
import { PRESET_WALLPAPERS } from "../../../context/SettingsContext";
import catppuccinSample from "../../../assets/walls-catppuccin-mocha/cat-vibin.png";

const CATPPUCCIN_REPO_URL = "https://github.com/orangci/walls-catppuccin-mocha";

const THEME_PRESETS = [
  {
    id: "theme-catppuccin-mocha",
    title: "Catppuccin Mocha",
    wallpaperUrl: catppuccinSample || PRESET_WALLPAPERS[0].url,
    theme: "dark",
    accent: "purple",
    accentHex: "#cba6f7",
    thumbnail: catppuccinSample || PRESET_WALLPAPERS[0].thumbnail,
  },
  {
    id: "theme-bioluminescence",
    title: "Bioluminescent Glass",
    wallpaperUrl: PRESET_WALLPAPERS[0].url,
    theme: "dark",
    accent: "cyan",
    accentHex: "#00bcf9",
    thumbnail: PRESET_WALLPAPERS[0].thumbnail,
  },
  {
    id: "theme-win11-dark",
    title: "Windows 11 Dark",
    wallpaperUrl: PRESET_WALLPAPERS[1].url,
    theme: "dark",
    accent: "blue",
    accentHex: "#0078d4",
    thumbnail: PRESET_WALLPAPERS[1].thumbnail,
  },
  {
    id: "theme-win11-light",
    title: "Windows 11 Light",
    wallpaperUrl: PRESET_WALLPAPERS[2].url,
    theme: "light",
    accent: "blue",
    accentHex: "#0078d4",
    thumbnail: PRESET_WALLPAPERS[2].thumbnail,
  },
  {
    id: "theme-cyberpunk",
    title: "Neon Cyberpunk",
    wallpaperUrl: PRESET_WALLPAPERS[3].url,
    theme: "dark",
    accent: "purple",
    accentHex: "#881798",
    thumbnail: PRESET_WALLPAPERS[3].thumbnail,
  },
  {
    id: "theme-space",
    title: "Cosmic Odyssey",
    wallpaperUrl: PRESET_WALLPAPERS[4].url,
    theme: "dark",
    accent: "blue",
    accentHex: "#0078d4",
    thumbnail: PRESET_WALLPAPERS[4].thumbnail,
  },
  {
    id: "theme-aurora",
    title: "Sunset Glow",
    wallpaperUrl: PRESET_WALLPAPERS[5].url,
    theme: "dark",
    accent: "orange",
    accentHex: "#f7630c",
    thumbnail: PRESET_WALLPAPERS[5].thumbnail,
  },
];

export default function ThemeSettings({ onBack }) {
  const {
    desktopWallpaper,
    setDesktopWallpaper,
    accentColorId,
    setAccentColor,
    setTheme,
    showToast,
  } = useSettings();

  const handleApplyTheme = (themeItem) => {
    setDesktopWallpaper(themeItem.wallpaperUrl, true);
    setAccentColor(themeItem.accent);
    setTheme(themeItem.theme);
    showToast(`✓ Applied "${themeItem.title}" theme pack`);
  };

  return (
    <div className="flex flex-col gap-5 p-6 max-w-4xl select-none">
      {/* Breadcrumb Header */}
      <div className="flex items-center gap-2 text-xs text-white/50">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-white/70 hover:text-white transition cursor-pointer"
        >
          <IoChevronBack size={14} />
          <span>Personalization</span>
        </button>
        <span>&gt;</span>
        <span className="text-white font-medium">Themes</span>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Themes</h2>
        <p className="text-xs text-white/50 mt-0.5">
          Complete customization packs: wallpaper, color mode, and accent tones
        </p>
      </div>

      {/* Theme Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {THEME_PRESETS.map((item) => {
          const isCurrent =
            desktopWallpaper === item.wallpaperUrl && accentColorId === item.accent;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleApplyTheme(item)}
              className={`group relative flex flex-col rounded-2xl overflow-hidden border text-left transition-all cursor-pointer ${
                isCurrent
                  ? "border-[var(--accent-color,#0078d4)] bg-white/10 ring-2 ring-[var(--accent-color,#0078d4)]/40 shadow-xl scale-[1.02]"
                  : "border-white/10 bg-black/30 hover:border-white/30 hover:bg-white/[0.06] hover:scale-[1.01]"
              }`}
            >
              {/* Wallpaper Thumbnail */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Accent Color Badge */}
                <span
                  className="absolute bottom-2 right-2 flex h-5 w-5 items-center justify-center rounded-full border border-white/40 shadow"
                  style={{ backgroundColor: item.accentHex }}
                />

                {isCurrent && (
                  <span className="absolute top-2 left-2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent-color,#0078d4)] text-white shadow">
                    <IoCheckmark size={14} />
                  </span>
                )}
              </div>

              {/* Title & Info */}
              <div className="p-3">
                <span className="text-xs font-bold text-white block">
                  {item.title}
                </span>
                <span className="text-[10px] text-white/50 capitalize">
                  {item.theme} Mode • {item.accent} Accent
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Catppuccin Mocha Repository Attribution Card */}
      <div className="mt-2 rounded-2xl border border-[#cba6f7]/25 bg-gradient-to-r from-[#1e1e2e]/90 to-[#181825]/90 p-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#cba6f7]/20 border border-[#cba6f7]/40 text-[#cba6f7]">
              <IoSparkles size={20} />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                Catppuccin Mocha Wallpaper Collection
              </span>
              <p className="text-[11px] text-[#a6adc8] mt-0.5">
                Curated by{" "}
                <a
                  href={CATPPUCCIN_REPO_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-semibold text-[#cba6f7] hover:underline inline-flex items-center gap-0.5"
                >
                  orangci/walls-catppuccin-mocha
                  <IoOpenOutline size={11} className="inline ml-0.5" />
                </a>
              </p>
            </div>
          </div>

          <a
            href={CATPPUCCIN_REPO_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/15 transition cursor-pointer self-start sm:self-auto"
          >
            <IoLogoGithub size={15} />
            <span>GitHub Repository</span>
          </a>
        </div>
      </div>
    </div>
  );
}
