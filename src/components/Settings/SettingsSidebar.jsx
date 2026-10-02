import { useState } from "react";
import {
  IoSearchOutline,
  IoLaptopOutline,
  IoBluetoothOutline,
  IoWifiOutline,
  IoBrushOutline,
  IoAppsOutline,
  IoPersonOutline,
  IoTimeOutline,
  IoGameControllerOutline,
  IoAccessibilityOutline,
  IoShieldCheckmarkOutline,
  IoRefreshOutline,
  IoClose,
} from "react-icons/io5";

import heroImage from "../../assets/hero.png";

export const SETTINGS_SECTIONS = [
  { id: "system", name: "System", icon: IoLaptopOutline },
  { id: "bluetooth", name: "Bluetooth & devices", icon: IoBluetoothOutline },
  { id: "network", name: "Network & internet", icon: IoWifiOutline },
  { id: "personalization", name: "Personalization", icon: IoBrushOutline, isPrimary: true },
  { id: "apps", name: "Apps", icon: IoAppsOutline },
  { id: "accounts", name: "Accounts", icon: IoPersonOutline },
  { id: "time", name: "Time & language", icon: IoTimeOutline },
  { id: "gaming", name: "Gaming", icon: IoGameControllerOutline },
  { id: "accessibility", name: "Accessibility", icon: IoAccessibilityOutline },
  { id: "privacy", name: "Privacy & security", icon: IoShieldCheckmarkOutline },
  { id: "update", name: "Windows Update", icon: IoRefreshOutline },
];

const SEARCH_ITEMS = [
  { title: "Background settings", section: "personalization", subPage: "background" },
  { title: "Desktop wallpaper", section: "personalization", subPage: "background" },
  { title: "Lock screen background", section: "personalization", subPage: "lockscreen" },
  { title: "Colors & dark mode", section: "personalization", subPage: "colors" },
  { title: "Accent color", section: "personalization", subPage: "colors" },
  { title: "Themes", section: "personalization", subPage: "themes" },
  { title: "Reset all settings", section: "personalization", subPage: "home" },
  { title: "Display & System specs", section: "system", subPage: "home" },
  { title: "Bluetooth & paired devices", section: "bluetooth", subPage: "home" },
  { title: "Network status & Wi-Fi", section: "network", subPage: "home" },
  { title: "Installed apps", section: "apps", subPage: "home" },
  { title: "User accounts", section: "accounts", subPage: "home" },
  { title: "Date & time", section: "time", subPage: "home" },
  { title: "Windows Update status", section: "update", subPage: "home" },
];

export default function SettingsSidebar({
  activeSection,
  onSelectSection,
  onNavigateSubPage,
  onClose,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSearch = searchQuery.trim()
    ? SEARCH_ITEMS.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
    : [];

  return (
    <aside className="w-72 max-w-[85vw] md:w-64 lg:w-72 h-full shrink-0 border-r border-white/10 bg-[#191919] md:bg-[#191919]/60 flex flex-col justify-between p-3 select-none backdrop-blur-xl">
      <div className="flex flex-col gap-2">
        {/* User / Profile Header Area */}
        <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="relative h-9 w-9 shrink-0 rounded-full overflow-hidden border border-white/20 bg-slate-800">
              <img
                src={heroImage}
                alt="Anshumaan Khare"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <span className="absolute inset-0 flex items-center justify-center font-bold text-xs text-white/90">
                AK
              </span>
            </div>

            <div className="min-w-0 flex-1 leading-tight">
              <span className="block text-xs font-bold text-white truncate">
                Anshumaan Khare
              </span>
              <span className="block text-[10px] text-white/50 truncate">
                Local Account • Admin
              </span>
            </div>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white md:hidden transition cursor-pointer shrink-0"
              title="Close navigation"
              aria-label="Close navigation"
            >
              <IoClose size={18} />
            </button>
          )}
        </div>

        {/* Windows 11 "Find a setting" Search Box */}
        <div className="relative my-1">
          <div className="flex items-center gap-2 rounded-lg bg-black/40 border border-white/15 px-3 py-1.5 focus-within:border-[var(--accent-color,#0078d4)] focus-within:ring-1 focus-within:ring-[var(--accent-color,#0078d4)] transition">
            <IoSearchOutline className="text-white/50 text-sm shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find a setting"
              className="w-full bg-transparent text-xs text-white placeholder-white/40 outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-white/40 hover:text-white"
              >
                <IoClose size={14} />
              </button>
            )}
          </div>

          {/* Search Dropdown Results */}
          {filteredSearch.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-56 overflow-y-auto rounded-xl border border-white/20 bg-[#252525] p-1.5 shadow-2xl backdrop-blur-2xl">
              {filteredSearch.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    onSelectSection(item.section);
                    if (item.subPage) onNavigateSubPage(item.subPage);
                    setSearchQuery("");
                    if (onClose) onClose();
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-lg text-left text-xs hover:bg-white/10 text-white/90 transition cursor-pointer"
                >
                  <span className="truncate">{item.title}</span>
                  <span className="text-[10px] text-white/40 uppercase">
                    {item.section}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Categories Navigation List */}
        <nav className="flex flex-col gap-0.5 overflow-y-auto max-h-[calc(100vh-230px)] md:max-h-[calc(100vh-270px)] pr-1 scrollbar-none">
          {SETTINGS_SECTIONS.map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelectSection(item.id);
                  onNavigateSubPage("home");
                  if (onClose) onClose();
                }}
                className={`relative flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                  isActive
                    ? "bg-white/10 text-white font-semibold shadow-sm"
                    : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {/* Active indicator bar on left */}
                {isActive && (
                  <span
                    className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[var(--accent-color,#0078d4)] shadow-[0_0_8px_var(--accent-color,#0078d4)]"
                  />
                )}

                <Icon
                  size={16}
                  className={`shrink-0 ${
                    isActive ? "text-[var(--accent-color,#0078d4)]" : "text-white/60"
                  }`}
                />

                <span className="truncate flex-1">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / Windows specs badge */}
      <div className="pt-2 border-t border-white/10 text-[10px] text-white/40 flex items-center justify-between px-2">
        <span>Windows 11 Portfolio</span>
        <span>v24H2</span>
      </div>
    </aside>
  );
}
