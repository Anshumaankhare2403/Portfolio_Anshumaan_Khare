import {
  IoGridOutline,
  IoPulseOutline,
  IoTimeOutline,
  IoRocketOutline,
  IoPersonOutline,
  IoListOutline,
  IoConstructOutline,
  IoMenuOutline,
  IoSettingsOutline,
} from "react-icons/io5";

export const TM_SECTIONS = [
  { id: "processes", label: "Processes", icon: IoGridOutline },
  { id: "performance", label: "Performance", icon: IoPulseOutline },
  { id: "history", label: "App history", icon: IoTimeOutline },
  { id: "startup", label: "Startup apps", icon: IoRocketOutline },
  { id: "users", label: "Users", icon: IoPersonOutline },
  { id: "details", label: "Details", icon: IoListOutline },
  { id: "services", label: "Services", icon: IoConstructOutline },
];

export default function TaskManagerSidebar({
  activeSection,
  onSelectSection,
  collapsed,
  onToggleCollapse,
  onOpenSettings,
}) {
  return (
    <aside
      className={`border-r border-white/10 bg-[#181818] md:bg-[#181818]/90 flex flex-col justify-between py-2 transition-all duration-200 select-none backdrop-blur-xl shrink-0 ${
        collapsed
          ? "w-12 sm:w-14 items-center px-1"
          : "absolute md:relative inset-y-0 left-0 z-40 md:z-auto w-56 px-2.5 shadow-2xl md:shadow-none h-full"
      }`}
    >
      <div className="flex flex-col gap-1 w-full">
        {/* Collapse / Expand Hamburger Toggle */}
        <button
          type="button"
          onClick={onToggleCollapse}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={`flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition cursor-pointer mb-2 ${
            collapsed ? "mx-auto" : "self-start"
          }`}
        >
          <IoMenuOutline size={20} />
        </button>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1 w-full">
          {TM_SECTIONS.map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectSection(item.id)}
                title={collapsed ? item.label : undefined}
                className={`relative flex items-center gap-3 rounded-lg text-xs font-medium transition-all text-left cursor-pointer ${
                  collapsed
                    ? "h-9 w-9 justify-center"
                    : "h-9 px-3 w-full"
                } ${
                  isActive
                    ? "bg-white/10 text-white font-semibold shadow-sm"
                    : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {/* Active Indicator Bar on Left */}
                {isActive && (
                  <span
                    className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-[var(--accent-color,#0078d4)] shadow-[0_0_8px_var(--accent-color,#0078d4)]"
                  />
                )}

                <Icon
                  size={17}
                  className={`shrink-0 ${
                    isActive ? "text-[var(--accent-color,#0078d4)]" : "text-white/60"
                  }`}
                />

                {!collapsed && (
                  <span className="truncate flex-1 tracking-wide">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Settings Link */}
      <div className="pt-2 border-t border-white/10 w-full">
        <button
          type="button"
          onClick={onOpenSettings}
          title={collapsed ? "Settings" : undefined}
          className={`flex items-center gap-3 rounded-lg text-xs font-medium text-white/60 hover:text-white hover:bg-white/10 transition cursor-pointer ${
            collapsed ? "h-9 w-9 justify-center mx-auto" : "h-9 px-3 w-full"
          }`}
        >
          <IoSettingsOutline size={17} className="shrink-0" />
          {!collapsed && <span className="truncate">Settings</span>}
        </button>
      </div>
    </aside>
  );
}
