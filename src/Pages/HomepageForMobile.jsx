import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser } from "react-icons/fa";
import {
  IoClose,
  IoChevronBack,
  IoCodeSlashOutline,
  IoDocumentTextOutline,
  IoDownloadOutline,
  IoLogoGithub,
  IoMailOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoCall,
  IoCamera,
  IoFlash,
  IoBackspace,
  IoVideocam,
  IoArrowForward,
  IoEyeOffOutline,
  IoEyeOutline,
  IoWifi,
  IoAccessibilityOutline,
  IoPowerOutline,
  IoBackspaceOutline,
  IoLockOpenOutline,
  IoFingerPrintOutline,
} from "react-icons/io5";

import filesIcon from "../assets/AndroideICONES/icons8-google-files-96.svg";
import chromeIcon from "../assets/AndroideICONES/icons8-chrome-96.svg";
import youtubeIcon from "../assets/scalable/yt.svg";
import terminalIcon from "../assets/scalable/terminal.svg";
import Logo from "../assets/This PC/Windows11.svg";
import wallpaper from "../assets/wallpaper/bioluminescence-3840x2160-25836.jpg";
import heroImage from "../assets/hero.png";
import resume from "../assets/resume/Anshumaankhare.pdf";
import About from "../components/About";
import ChromeWindow from "../components/Chrome";
import FileExp from "../components/FileExp";
import Terminal from "../components/Terminal";
import YtMusice from "../components/YtMusice";
import CameraApp from "../components/CameraApp";
import GitHubWindow from "../components/GitHubWindow";
import ProjectsApp from "../components/ProjectsApp";
import ContactApp from "../components/ContactApp";
import VSCodeWindow from "../components/VSCodeWindow";
import vscodeIcon from "../assets/scalable/vscode.svg";

const categories = ["All", "Tools", "Media", "Info"];

const gridApps = [
  { id: "about", label: "About", icon: IoPersonOutline, color: "#5b6ee1", category: "Info" },
  { id: "projects", label: "Projects", icon: IoCodeSlashOutline, color: "#0b8f84", category: "Info" },
  { id: "contact", label: "Contact", icon: IoMailOutline, color: "#d85a83", category: "Info" },
  { id: "resume", label: "Resume", icon: IoDocumentTextOutline, color: "#db5e50", category: "Info" },
  { id: "github", label: "GitHub", icon: IoLogoGithub, color: "#24292f", category: "Info" },
  { id: "vscode", label: "VS Code", image: vscodeIcon, category: "Tools" },
  { id: "terminal", label: "Terminal", image: terminalIcon, category: "Tools" },
];

const dockApps = [
  { id: "phone", label: "Phone", icon: IoCall, color: "#22c55e", category: "Tools" },
  { id: "camera", label: "Camera", icon: IoCamera, color: "#8b5cf6", category: "Tools" },
  { id: "chrome", label: "Chrome", image: chromeIcon, category: "Tools" },
  { id: "files", label: "Files", image: filesIcon, category: "Tools" },
  { id: "music", label: "Music", image: youtubeIcon, category: "Media" },
];

const portfolioApps = [...gridApps, ...dockApps];

const panels = {
  about: {
    title: "About me",
    body: "I am Anshumaan Khare, a developer who enjoys building polished interfaces and useful web experiences.",
  },
  projects: {
    title: "Projects",
    body: "This portfolio is an interactive desktop and iPhone-inspired experience built with React, Vite, Tailwind CSS, and Framer Motion.",
  },
  github: {
    title: "GitHub",
    body: "Browse my work and development activity on GitHub.",
    action: "Open GitHub",
    href: "https://github.com/",
  },
  resume: {
    title: "Resume",
    body: "Download or view my resume.",
    action: "Download Resume (PDF)",
    href: resume,
  },
  phone: {
    title: "Phone Dialer",
    body: "Call or reach out to Anshumaan Khare.",
  },
  camera: {
    title: "Camera",
    body: "Interactive portfolio camera app.",
  },
  files: {
    title: "Files",
    body: "Portfolio assets, resume, projects, and profile information are available from the desktop experience.",
  },
  music: {
    title: "Music",
    body: "Open the desktop layout to use the music player.",
  },
  terminal: {
    title: "Terminal",
    body: "Open the desktop layout to use the interactive terminal.",
  },
  chrome: {
    title: "Browser",
    body: "Search the web from your portfolio browser.",
  },
  contact: {
    title: "Contact Us",
    body: "Send a message to Anshumaan Khare.",
  },
  vscode: {
    title: "VS Code",
    body: "Interactive code editor and source code viewer.",
  },
};

const fullScreenApps = new Set(["about", "files", "music", "terminal", "chrome", "resume", "phone", "camera", "github", "projects", "contact", "vscode"]);

function HomepageForMobile() {
  const [activeApp, setActiveApp] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dialedNumber, setDialedNumber] = useState("+91 91404 05680");
  const [currentDate, setCurrentDate] = useState(() => new Date());

  const [mobileIsBooting, setMobileIsBooting] = useState(true);
  const [mobileIsSignedIn, setMobileIsSignedIn] = useState(false);
  const [mobilePassword, setMobilePassword] = useState("");
  const [showMobilePassword, setShowMobilePassword] = useState(false);

  useEffect(() => {
    const bootTimer = setTimeout(() => setMobileIsBooting(false), 1200);
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => {
      clearTimeout(bootTimer);
      clearInterval(timer);
    };
  }, []);

  const formattedTime = useMemo(() => {
    return currentDate.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  }, [currentDate]);

  const formattedDate = useMemo(() => {
    return currentDate.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });
  }, [currentDate]);

  const filteredApps = useMemo(() => {
    return portfolioApps.filter((app) => {
      const matchesCategory = selectedCategory === "All" || app.category === selectedCategory;
      const matchesQuery = app.label.toLowerCase().includes(searchQuery.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  if (mobileIsBooting) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black">
        <img
          src={Logo}
          alt="Windows"
          className="h-28 w-28 object-contain sm:h-36 sm:w-36"
        />

        <div className="windows-spinner mt-14" aria-label="Starting Windows" />

        <p className="absolute bottom-8 text-xs tracking-wide text-white/45">
          @Developed by Anshumaan Khare
        </p>
      </div>
    );
  }

  const handleKeypadPress = (digit) => {
    if (mobilePassword.length < 4) {
      const nextPasscode = mobilePassword + digit;
      setMobilePassword(nextPasscode);
      if (nextPasscode.length >= 4) {
        setTimeout(() => {
          setMobileIsSignedIn(true);
        }, 150);
      }
    }
  };

  const handleKeypadDelete = () => {
    setMobilePassword((prev) => prev.slice(0, -1));
  };

  if (!mobileIsSignedIn) {
    return (
      <div
        className="fixed inset-0 z-[9999] overflow-hidden bg-cover bg-center text-white select-none"
        style={{ backgroundImage: `url(${wallpaper})` }}
      >
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-md" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

        <div className="relative flex h-full w-full flex-col items-center justify-between py-6 px-4">
          {/* Header Time & Date */}
          <header className="pt-2 text-center drop-shadow-md">
            <p className="text-4xl sm:text-5xl font-bold tracking-tight">{formattedTime}</p>
            <p className="mt-1 text-xs sm:text-sm font-medium text-gray-200">{formattedDate}</p>
          </header>

          {/* Center Avatar & Passcode Keypad */}
          <main className="flex flex-col items-center justify-center my-auto w-full max-w-xs text-center">
            {/* Avatar & Name */}
            <div className="flex flex-col items-center mb-3">
              <img
                src={heroImage}
                alt="Anshumaan Khare"
                className="h-20 w-20 sm:h-24 sm:w-24 rounded-full border-2 border-white/80 object-cover shadow-2xl mb-2"
              />
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                Anshumaan Khare
              </h1>
              <p className="text-xs text-gray-300 font-medium mt-0.5">Enter Passcode</p>
            </div>

            {/* Passcode Dots */}
            <div className="flex items-center justify-center gap-4 mb-6">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={`h-3.5 w-3.5 rounded-full border-2 border-white/80 transition-all duration-200 ${
                    idx < mobilePassword.length
                      ? "bg-white scale-110 shadow-[0_0_12px_rgba(255,255,255,0.9)]"
                      : "bg-white/10"
                  }`}
                />
              ))}
            </div>

            {/* Phone Numeric Keypad Grid (3x4) */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-[250px] mx-auto">
              {[
                { num: "1", sub: "" },
                { num: "2", sub: "ABC" },
                { num: "3", sub: "DEF" },
                { num: "4", sub: "GHI" },
                { num: "5", sub: "JKL" },
                { num: "6", sub: "MNO" },
                { num: "7", sub: "PQRS" },
                { num: "8", sub: "TUV" },
                { num: "9", sub: "WXYZ" },
              ].map((key) => (
                <button
                  key={key.num}
                  type="button"
                  onClick={() => handleKeypadPress(key.num)}
                  className="flex flex-col items-center justify-center h-16 w-16 sm:h-18 sm:w-18 mx-auto rounded-full bg-white/15 border border-white/20 backdrop-blur-lg hover:bg-white/25 active:bg-white/40 active:scale-95 transition shadow-lg"
                >
                  <span className="text-xl font-bold leading-none">{key.num}</span>
                  {key.sub && (
                    <span className="text-[8px] font-extrabold tracking-widest text-white/70 mt-0.5">
                      {key.sub}
                    </span>
                  )}
                </button>
              ))}

              {/* Bottom Row: Delete, 0, Unlock */}
              <button
                type="button"
                onClick={handleKeypadDelete}
                className="flex items-center justify-center h-16 w-16 sm:h-18 sm:w-18 mx-auto rounded-full bg-white/10 border border-white/15 hover:bg-white/20 active:scale-95 transition text-white/80"
                aria-label="Delete"
              >
                <IoBackspaceOutline size={22} />
              </button>

              <button
                type="button"
                onClick={() => handleKeypadPress("0")}
                className="flex flex-col items-center justify-center h-16 w-16 sm:h-18 sm:w-18 mx-auto rounded-full bg-white/15 border border-white/20 backdrop-blur-lg hover:bg-white/25 active:bg-white/40 active:scale-95 transition shadow-lg"
              >
                <span className="text-xl font-bold leading-none">0</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileIsSignedIn(true)}
                className="flex items-center justify-center h-16 w-16 sm:h-18 sm:w-18 mx-auto rounded-full bg-emerald-500/80 border border-emerald-400/50 hover:bg-emerald-500 active:scale-95 transition text-white shadow-xl"
                aria-label="Unlock"
              >
                <IoLockOpenOutline size={22} />
              </button>
            </div>

            {/* Touch ID / Direct Unlock Action */}
            <button
              type="button"
              onClick={() => setMobileIsSignedIn(true)}
              className="mt-5 flex items-center justify-center gap-1.5 text-xs font-bold text-white/80 hover:text-white transition"
            >
              <IoFingerPrintOutline size={18} className="text-emerald-400" />
              <span>Tap or Touch ID to Unlock</span>
            </button>
          </main>

          {/* Bottom System Action Icons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Network"
              className="rounded p-2 text-lg hover:bg-white/15"
            >
              <IoWifi />
            </button>
            <button
              type="button"
              aria-label="Accessibility"
              className="rounded p-2 text-lg hover:bg-white/15"
            >
              <IoAccessibilityOutline />
            </button>
            <button
              type="button"
              aria-label="Power"
              className="rounded p-2 text-lg hover:bg-white/15"
            >
              <IoPowerOutline />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const activePanel = activeApp ? panels[activeApp] : null;

  const openApp = (app) => {
    setActiveApp(app.id);
  };

  const handleDial = (digit) => {
    setDialedNumber((prev) => (prev === "+91 91404 05680" ? digit : prev + digit));
  };

  const renderAppContent = () => {
    const closeApp = () => setActiveApp(null);
    if (activeApp === "about") return <About mobile onClose={closeApp} />;
    if (activeApp === "files")
      return (
        <FileExp
          mobile
          onClose={closeApp}
          onOpenAbout={() => setActiveApp("about")}
          onOpenChrome={() => setActiveApp("chrome")}
          onOpenYouTube={() => setActiveApp("music")}
          onOpenTerminal={() => setActiveApp("terminal")}
        />
      );
    if (activeApp === "music") return <YtMusice mobile onClose={closeApp} />;
    if (activeApp === "terminal") return <Terminal mobile onClose={closeApp} />;
    if (activeApp === "chrome") return <ChromeWindow mobile onClose={closeApp} />;
    if (activeApp === "github") return <GitHubWindow mobile onClose={closeApp} />;
    if (activeApp === "projects") return <ProjectsApp mobile onClose={closeApp} />;
    if (activeApp === "contact") return <ContactApp mobile onClose={closeApp} />;
    if (activeApp === "vscode") return <VSCodeWindow mobile onClose={closeApp} />;
    if (activeApp === "resume")
      return (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#052541] text-white">
          <div className="flex h-14 items-center justify-between border-b border-white/10 bg-black/40 px-4">
            <button
              onClick={closeApp}
              className="flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold hover:bg-white/20"
            >
              <IoChevronBack size={16} />
              <span>Back</span>
            </button>
            <span className="text-sm font-bold">Resume</span>
            <a
              href={resume}
              download="Anshumaan_Khare_Resume.pdf"
              className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-emerald-500"
            >
              <IoDownloadOutline size={16} />
              <span>PDF</span>
            </a>
          </div>

          <div className="p-3 bg-black/20 text-center">
            <a
              href={resume}
              download="Anshumaan_Khare_Resume.pdf"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-colors hover:bg-emerald-500"
            >
              <IoDownloadOutline size={18} />
              <span>Click to Download Resume PDF</span>
            </a>
          </div>

          <div className="flex-1">
            <iframe className="h-full w-full border-0 bg-white" src={resume} title="Anshumaan Khare resume" />
          </div>
        </div>
      );

    if (activeApp === "phone")
      return (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#07243c] text-white">
          <div className="flex h-14 items-center justify-between border-b border-white/10 bg-black/40 px-4">
            <button
              onClick={closeApp}
              className="flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold hover:bg-white/20"
            >
              <IoChevronBack size={16} />
              <span>Back</span>
            </button>
            <span className="text-sm font-bold">Phone</span>
            <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          </div>

          <div className="flex flex-1 flex-col items-center justify-between p-6">
            <div className="flex flex-col items-center mt-4 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-600 text-3xl font-bold text-white shadow-lg">
                AK
              </div>
              <h2 className="mt-3 text-2xl font-bold">Anshumaan Khare</h2>
              <p className="text-xs text-emerald-400 font-semibold tracking-wide">Software Developer</p>
              <div className="mt-4 text-2xl font-mono tracking-wider text-emerald-200">{dialedNumber || "Enter number"}</div>
            </div>

            <div className="grid w-full max-w-xs grid-cols-3 gap-4 my-6 text-center">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((digit) => (
                <button
                  key={digit}
                  onClick={() => handleDial(digit)}
                  className="flex h-16 w-16 items-center justify-center justify-self-center rounded-full bg-white/10 text-2xl font-semibold transition active:bg-white/30"
                >
                  {digit}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-6 mb-4">
              <button
                onClick={() => setDialedNumber((prev) => prev.slice(0, -1))}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <IoBackspace size={24} />
              </button>

              <a
                href={`tel:${dialedNumber}`}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg transition active:scale-95 hover:bg-emerald-400"
              >
                <IoCall size={30} />
              </a>

              <a
                href="mailto:anshumaankhare@gmail.com"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow hover:bg-blue-500"
              >
                <IoMailOutline size={24} />
              </a>
            </div>
          </div>
        </div>
      );

    if (activeApp === "camera") return <CameraApp onClose={closeApp} />;

    return (
      <>
        <p>{activePanel.body}</p>
        {activePanel.href && (
          <a
            className="android-action flex items-center justify-center gap-2"
            href={activePanel.href}
            download={activeApp === "resume" ? "Anshumaan_Khare_Resume.pdf" : undefined}
            target={activePanel.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
          >
            {activeApp === "resume" && <IoDownloadOutline size={18} />}
            <span>{activePanel.action}</span>
          </a>
        )}
      </>
    );
  };

  return (
    <main className="android-shell">
      <section className="android-home" aria-label="iPhone portfolio home screen">
        <header className="android-status">
          <time>{formattedTime}</time>
          <span
            className={`ios-dynamic-island ${activeApp ? "active" : ""}`}
            aria-label="Dynamic Island"
          />
          <div aria-label="Phone status">5G&nbsp;&nbsp;Wi-Fi&nbsp;&nbsp;100%</div>
        </header>

        {/* Smartphone Live Clock & Date Widget */}
        <div className="ios-profile-widget">
          <p className="tracking-wider">{formattedDate}</p>
          <h1>{formattedTime}</h1>
          <span>Anshumaan Khare • Developer</span>
        </div>

        <div className="android-app-grid">
          {gridApps.map((app) => (
            <button
              className="android-app"
              key={app.id}
              onClick={() => openApp(app)}
              aria-label={`Open ${app.label}`}
            >
              <span
                className="android-app-icon"
                style={app.color ? { backgroundColor: app.color } : undefined}
              >
                {app.image ? <img src={app.image} alt="" /> : <app.icon aria-hidden="true" />}
              </span>
              <span>{app.label}</span>
            </button>
          ))}
        </div>

        {/* Clean Icon-Only Mobile Dock with Phone and Camera */}
        <div className="android-dock" aria-label="Pinned apps">
          {dockApps.map((app) => (
            <button
              className="android-app"
              key={app.id}
              onClick={() => openApp(app)}
              aria-label={`Open ${app.label}`}
            >
              <span
                className="android-app-icon transition-transform active:scale-90 hover:scale-105"
                style={app.color ? { backgroundColor: app.color } : undefined}
              >
                {app.image ? <img src={app.image} alt="" /> : <app.icon aria-hidden="true" className="text-white text-2xl" />}
              </span>
            </button>
          ))}
        </div>

        <button
          className="android-drawer-button"
          onClick={() => setShowDrawer(true)}
          aria-label="Open app library"
        >
          <IoSearchOutline aria-hidden="true" />
          <span>App Library</span>
        </button>

        <button
          className="android-gesture"
          onClick={() => setActiveApp(null)}
          aria-label="Return to home screen"
        />
      </section>

      <AnimatePresence>
        {activeApp && fullScreenApps.has(activeApp) && renderAppContent()}
      </AnimatePresence>

      <AnimatePresence>
        {activePanel && !fullScreenApps.has(activeApp) && (
          <motion.section
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) setActiveApp(null);
            }}
            className="android-sheet ios-app-window"
            role="dialog"
            aria-modal="true"
            aria-labelledby="android-sheet-title"
          >
            <button
              className="android-close"
              onClick={() => setActiveApp(null)}
              aria-label="Close"
            >
              <IoChevronBack />
            </button>
            <p className="android-sheet-kicker">Anshumaan Khare</p>
            <h2 id="android-sheet-title">{activePanel.title}</h2>
            <div className="ios-app-content">{renderAppContent()}</div>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDrawer && (
          <motion.section
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120) setShowDrawer(false);
            }}
            className="android-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="App Library"
          >
            <div className="android-drawer-head">
              <h2>App Library</h2>
              <button onClick={() => setShowDrawer(false)} aria-label="Close App Library">
                <IoClose />
              </button>
            </div>

            {/* App Library Search Input */}
            <div className="google-files-search mb-3">
              <IoSearchOutline size={18} />
              <input
                type="text"
                placeholder="Search apps..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1 hover:text-white"
                  aria-label="Clear search"
                >
                  <IoClose size={16} />
                </button>
              )}
            </div>

            {/* Category Filter Chips */}
            <div className="mobile-category-chips mb-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`mobile-category-chip ${selectedCategory === cat ? "active" : ""}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="android-app-grid android-app-grid-drawer">
              {filteredApps.map((app) => (
                <button
                  className="android-app"
                  key={app.id}
                  onClick={() => {
                    setShowDrawer(false);
                    openApp(app);
                  }}
                >
                  <span
                    className="android-app-icon"
                    style={app.color ? { backgroundColor: app.color } : undefined}
                  >
                    {app.image ? <img src={app.image} alt="" /> : <app.icon aria-hidden="true" />}
                  </span>
                  <span>{app.label}</span>
                </button>
              ))}
              {filteredApps.length === 0 && (
                <div className="col-span-4 py-8 text-center text-sm text-gray-300">
                  No matching apps found.
                </div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}

export default HomepageForMobile;

