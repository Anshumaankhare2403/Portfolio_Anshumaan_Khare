import {
  IoLaptopOutline,
  IoBluetoothOutline,
  IoWifiOutline,
  IoAppsOutline,
  IoPersonOutline,
  IoTimeOutline,
  IoGameControllerOutline,
  IoAccessibilityOutline,
  IoShieldCheckmarkOutline,
  IoRefreshOutline,
  IoConstructOutline,
  IoHardwareChipOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";

const SECTION_CONFIGS = {
  system: {
    title: "System",
    subtitle: "Display, sound, notifications, power, and storage",
    icon: IoLaptopOutline,
    isSystem: true,
  },
  bluetooth: {
    title: "Bluetooth & devices",
    subtitle: "Printers, mouse, keyboard, and other connected hardware",
    icon: IoBluetoothOutline,
    items: [
      { name: "Bluetooth", desc: "Discoverable as 'Portfolio-Device'", toggle: true },
      { name: "Devices", desc: "Mouse, keyboard, audio accessories" },
      { name: "Printers & scanners", desc: "Virtual PDF printer active" },
    ],
  },
  network: {
    title: "Network & internet",
    subtitle: "Wi-Fi, Ethernet, VPN, airplane mode, and proxy",
    icon: IoWifiOutline,
    items: [
      { name: "Wi-Fi", desc: "Connected to Web Portfolio High-Speed", toggle: true },
      { name: "VPN", desc: "Configured secure tunneling" },
      { name: "Proxy & DNS", desc: "Automated network discovery" },
    ],
  },
  apps: {
    title: "Apps",
    subtitle: "Installed apps, default apps, offline maps, and startup apps",
    icon: IoAppsOutline,
    items: [
      { name: "Installed apps", desc: "10 portfolio applications active" },
      { name: "Default apps", desc: "Google Chrome, Terminal, VS Code" },
      { name: "Startup apps", desc: "System desktop launcher and dock" },
    ],
  },
  accounts: {
    title: "Accounts",
    subtitle: "Your accounts, email, sync, work, and family",
    icon: IoPersonOutline,
    items: [
      { name: "Your info", desc: "Anshumaan Khare (Administrator)" },
      { name: "Sign-in options", desc: "Password, PIN, and Lock Screen credentials" },
      { name: "Windows backup", desc: "Local settings synchronized via localStorage" },
    ],
  },
  time: {
    title: "Time & language",
    subtitle: "Speech, region, date, keyboard layout, and clock",
    icon: IoTimeOutline,
    items: [
      { name: "Date & time", desc: "Automatic time synchronization enabled", toggle: true },
      { name: "Language & region", desc: "English (United States)" },
      { name: "Typing & Keyboard", desc: "Standard QWERTY layout" },
    ],
  },
  gaming: {
    title: "Gaming",
    subtitle: "Game bar, captures, graphics settings, and game mode",
    icon: IoGameControllerOutline,
    items: [
      { name: "Game Mode", desc: "Optimize browser FPS for Three.js animations", toggle: true },
      { name: "Graphics performance", desc: "Hardware acceleration active" },
    ],
  },
  accessibility: {
    title: "Accessibility",
    subtitle: "Text size, visual effects, mouse pointer, and narrator",
    icon: IoAccessibilityOutline,
    items: [
      { name: "Text size", desc: "Standard 100% scale" },
      { name: "Visual effects", desc: "Smooth spring animations and transparency active", toggle: true },
      { name: "Touchpad gestures", desc: "2-finger desktop space switching enabled" },
    ],
  },
  privacy: {
    title: "Privacy & security",
    subtitle: "Windows security, app permissions, location, and camera",
    icon: IoShieldCheckmarkOutline,
    items: [
      { name: "Windows Security", desc: "Local client-side sandboxed environment", toggle: true },
      { name: "Camera & Microphone", desc: "Permissions requested per application" },
      { name: "Local Storage Privacy", desc: "All user wallpapers stored safely in browser" },
    ],
  },
  update: {
    title: "Windows Update",
    subtitle: "Check for updates, update history, and advanced options",
    icon: IoRefreshOutline,
    items: [
      { name: "You're up to date", desc: "Last checked: Today, 11:30 PM", isSuccess: true },
      { name: "Advanced options", desc: "Instant hot-reload and Vite production build" },
    ],
  },
};

export default function PlaceholderSection({ sectionId }) {
  const config = SECTION_CONFIGS[sectionId] || {
    title: sectionId,
    subtitle: "Settings section",
    icon: IoConstructOutline,
  };

  const Icon = config.icon;

  return (
    <div className="flex flex-col gap-5 p-6 max-w-4xl select-none">
      {/* Title */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-[var(--accent-color,#0078d4)]">
          <Icon size={22} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {config.title}
          </h2>
          <p className="text-xs text-white/50 mt-0.5">{config.subtitle}</p>
        </div>
      </div>

      {/* System specific specs card if section is System */}
      {config.isSystem ? (
        <div className="space-y-4">
          {/* Device Mock Specs Card */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-lg space-y-4">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <IoHardwareChipOutline className="text-2xl text-[var(--accent-color,#0078d4)]" />
              <div>
                <h3 className="text-sm font-bold text-white">Device Specifications</h3>
                <span className="text-[11px] text-white/50">ANSHUMAAN-PORTFOLIO-PC</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-black/30 border border-white/10">
                <span className="text-[10px] text-white/40 block">Processor</span>
                <strong className="text-white">Portfolio Core™ v2.0 (React 19 + Vite)</strong>
              </div>
              <div className="p-3 rounded-xl bg-black/30 border border-white/10">
                <span className="text-[10px] text-white/40 block">Installed RAM</span>
                <strong className="text-white">16.0 GB (Virtual Web RAM)</strong>
              </div>
              <div className="p-3 rounded-xl bg-black/30 border border-white/10">
                <span className="text-[10px] text-white/40 block">System type</span>
                <strong className="text-white">64-bit operating system, x64 processor</strong>
              </div>
              <div className="p-3 rounded-xl bg-black/30 border border-white/10">
                <span className="text-[10px] text-white/40 block">Edition</span>
                <strong className="text-white">Windows 11 Pro Portfolio Edition</strong>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <IoInformationCircleOutline size={20} className="text-sky-400 shrink-0" />
              <div>
                <span className="text-xs font-semibold text-white block">
                  Looking to change wallpapers?
                </span>
                <span className="text-[11px] text-white/50">
                  Head over to the Personalization section to customize your desktop and lock screen.
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Regular section items */
        <div className="space-y-2">
          {config.items?.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3.5 rounded-xl border border-white/10 bg-white/[0.04]"
            >
              <div>
                <span className="text-xs font-bold text-white block">
                  {item.name}
                </span>
                <span className="text-[11px] text-white/50">{item.desc}</span>
              </div>

              {item.toggle && (
                <div className="relative h-6 w-11 rounded-full p-0.5 bg-[var(--accent-color,#0078d4)]">
                  <span className="block h-5 w-5 rounded-full bg-white translate-x-5" />
                </div>
              )}

              {item.isSuccess && (
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ✓ Active
                </span>
              )}
            </div>
          ))}

          <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-6 text-center mt-4">
            <IoConstructOutline className="text-2xl text-white/30 mx-auto mb-1" />
            <p className="text-xs font-semibold text-white/70">
              {config.title} options are currently running on default system presets
            </p>
            <p className="text-[11px] text-white/40 mt-0.5">
              Additional options will be configurable in future portfolio releases.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
