import { useState } from "react";
import {
  IoChevronBack,
  IoCheckmark,
  IoSunnyOutline,
  IoMoonOutline,
  IoDesktopOutline,
} from "react-icons/io5";
import { useSettings } from "../../../hooks/useSettings";
import { ACCENT_COLORS } from "../../../context/SettingsContext";

export default function ColorSettings({ onBack }) {
  const {
    theme,
    setTheme,
    accentColorId,
    setAccentColor,
    activeAccent,
  } = useSettings();

  const [transparency, setTransparency] = useState(true);

  return (
    <div className="flex flex-col gap-4 sm:gap-5 p-3.5 sm:p-5 md:p-6 max-w-4xl select-none">
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
        <span className="text-white font-medium">Colors</span>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Colors</h2>
        <p className="text-xs text-white/50 mt-0.5">
          Accent color, transparency effects, and color themes
        </p>
      </div>

      {/* Mode Selection Card */}
      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 space-y-3">
        <div>
          <span className="text-xs font-semibold text-white block">
            Choose your mode
          </span>
          <span className="text-[11px] text-white/50">
            Select light, dark, or follow system default
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: "dark", title: "Dark", icon: IoMoonOutline, desc: "Default sleek dark palette" },
            { id: "light", title: "Light", icon: IoSunnyOutline, desc: "Clean bright Windows palette" },
            { id: "system", title: "Use system setting", icon: IoDesktopOutline, desc: "Sync with OS preference" },
          ].map((item) => {
            const isSelected = theme === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTheme(item.id)}
                className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "border-[var(--accent-color,#0078d4)] bg-white/10 shadow-md ring-1 ring-[var(--accent-color,#0078d4)]"
                    : "border-white/10 bg-black/20 hover:border-white/25 hover:bg-white/[0.06]"
                }`}
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl border ${
                    isSelected
                      ? "bg-[var(--accent-color,#0078d4)]/20 text-[var(--accent-color,#0078d4)] border-[var(--accent-color,#0078d4)]/40"
                      : "bg-white/5 text-white/60 border-white/10"
                  }`}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-white/50">{item.desc}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Transparency Effects Toggle */}
      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-white block">
            Transparency effects
          </span>
          <span className="text-[11px] text-white/50">
            Windows and surfaces appear translucent with frosted acrylic blur
          </span>
        </div>

        <button
          type="button"
          onClick={() => setTransparency((prev) => !prev)}
          className={`relative h-6 w-11 rounded-full p-0.5 transition-colors cursor-pointer ${
            transparency
              ? "bg-[var(--accent-color,#0078d4)]"
              : "bg-white/20"
          }`}
        >
          <span
            className={`block h-5 w-5 rounded-full bg-white transition-transform ${
              transparency ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* Accent Color Selection */}
      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-white block">
              Accent color
            </span>
            <span className="text-[11px] text-white/50">
              Active color: <strong className="text-white">{activeAccent.name}</strong> ({activeAccent.hex})
            </span>
          </div>

          <div
            className="w-5 h-5 rounded-full border border-white/30 shadow"
            style={{ backgroundColor: activeAccent.hex }}
          />
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {ACCENT_COLORS.map((color) => {
            const isSelected = accentColorId === color.id;
            return (
              <button
                key={color.id}
                type="button"
                onClick={() => setAccentColor(color.id)}
                className={`group relative flex flex-col items-center gap-2 p-3 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? "border-[var(--accent-color,#0078d4)] bg-white/10 shadow-lg scale-105"
                    : "border-white/10 hover:border-white/30 hover:bg-white/[0.05]"
                }`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-transform group-hover:scale-105"
                  style={{ backgroundColor: color.hex }}
                >
                  {isSelected && (
                    <IoCheckmark size={20} className="text-white drop-shadow" />
                  )}
                </div>

                <span className="text-[11px] font-medium text-white/80 group-hover:text-white truncate">
                  {color.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
