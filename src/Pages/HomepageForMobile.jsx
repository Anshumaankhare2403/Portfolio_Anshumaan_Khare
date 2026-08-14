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

const categories = ["All", "Tools", "Media", "Info"];

const gridApps = [
  { id: "about", label: "About", icon: IoPersonOutline, color: "#5b6ee1", category: "Info" },
  { id: "projects", label: "Projects", icon: IoCodeSlashOutline, color: "#0b8f84", category: "Info" },
  { id: "resume", label: "Resume", icon: IoDocumentTextOutline, color: "#db5e50", category: "Info" },
  { id: "github", label: "GitHub", icon: IoLogoGithub, color: "#24292f", category: "Info" },
  { id: "contact", label: "Contact", icon: IoMailOutline, color: "#d85a83", category: "Info" },
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
  contact: {
    title: "Get in touch",
    body: "For opportunities or collaboration, send me an email.",
    action: "Email Anshumaan",
    href: "mailto:anshumaankhare@gmail.com",
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
};

const fullScreenApps = new Set(["about", "files", "music", "terminal", "chrome", "resume", "phone", "camera"]);

function HomepageForMobile() {
  const [activeApp, setActiveApp] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dialedNumber, setDialedNumber] = useState("+91 91404 05680");
  const [flashOn, setFlashOn] = useState(false);
  const [cameraMode, setCameraMode] = useState("PHOTO");
  const [captured, setCaptured] = useState(false);
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

  if (!mobileIsSignedIn) {
    return (
      <div
        className="fixed inset-0 z-[9999] overflow-hidden bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${wallpaper})` }}
      >
        <div className="absolute inset-0 bg-slate-950/35 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/45" />

        <div className="relative flex h-full min-h-[560px] flex-col items-center justify-between py-8 px-4">
          <header className="pt-[4vh] text-center drop-shadow-lg">
            <p className="text-5xl font-bold tracking-tight sm:text-7xl">{formattedTime}</p>
            <p className="mt-2 text-base font-bold sm:text-xl">{formattedDate}</p>
          </header>

          <main className="flex flex-1 items-center justify-center py-4">
            <div className="w-[min(88vw,320px)] text-center">
              <FaUser className="mx-auto h-32 w-32 object-contain text-white/90 drop-shadow-xl mb-2" />

              <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                Anshumaan Khare
              </h1>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setMobileIsSignedIn(true);
                }}
                className="mt-6"
              >
                <div className="flex h-10 overflow-hidden border-2 border-white/75 bg-white/90 shadow-lg transition focus-within:border-white focus-within:bg-white">
                  <input
                    type={showMobilePassword ? "text" : "password"}
                    value={mobilePassword}
                    onChange={(event) => setMobilePassword(event.target.value)}
                    placeholder="Password"
                    aria-label="Password"
                    className="min-w-0 flex-1 bg-transparent px-3 text-sm text-gray-900 outline-none placeholder:text-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowMobilePassword((visible) => !visible)}
                    className="grid w-10 place-items-center text-lg text-gray-700 hover:bg-black/10"
                    aria-label={showMobilePassword ? "Hide password" : "Show password"}
                  >
                    {showMobilePassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                  </button>
                  <button
                    type="submit"
                    className="grid w-10 place-items-center bg-gray-200 text-xl text-gray-800 hover:bg-gray-300"
                    aria-label="Sign in"
                  >
                    <IoArrowForward />
                  </button>
                </div>

                <button
                  type="submit"
                  className="mt-4 rounded px-3 py-1 text-sm font-bold text-white/90 drop-shadow hover:bg-white/10 hover:text-white transition-colors"
                >
                  Sign in to explore my portfolio
                </button>
              </form>
            </div>
          </main>

          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Network"
              className="rounded p-3 text-xl hover:bg-white/15"
            >
              <IoWifi />
            </button>
            <button
              type="button"
              aria-label="Accessibility"
              className="rounded p-3 text-xl hover:bg-white/15"
            >
              <IoAccessibilityOutline />
            </button>
            <button
              type="button"
              aria-label="Power"
              className="rounded p-3 text-xl hover:bg-white/15"
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

  const handleCapture = () => {
    setCaptured(true);
    setTimeout(() => setCaptured(false), 500);
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

    if (activeApp === "camera")
      return (
        <div className="fixed inset-0 z-50 flex flex-col bg-black text-white">
          <div className="flex h-14 items-center justify-between border-b border-white/10 bg-black/60 px-4 z-10">
            <button
              onClick={closeApp}
              className="flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold hover:bg-white/20"
            >
              <IoChevronBack size={16} />
              <span>Back</span>
            </button>
            <span className="text-sm font-bold tracking-wide">Camera</span>
            <button
              onClick={() => setFlashOn((prev) => !prev)}
              className={`p-2 rounded-full ${flashOn ? "text-yellow-400 bg-yellow-400/20" : "text-white"}`}
            >
              <IoFlash size={20} />
            </button>
          </div>

          <div className="relative flex-1 bg-gradient-to-b from-[#051c2e] via-[#07243c] to-[#021322] flex items-center justify-center overflow-hidden">
            {captured && <div className="absolute inset-0 z-20 bg-white animate-fade-out" />}

            <div className="absolute inset-8 border border-white/20 rounded-2xl pointer-events-none flex items-center justify-center">
              <div className="h-16 w-16 border-2 border-emerald-400/60 rounded-full animate-ping" />
            </div>

            <div className="text-center p-6 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 max-w-xs">
              <img src={heroImage} alt="Preview" className="h-40 w-full object-cover rounded-xl mb-3 shadow-lg" />
              <p className="text-xs text-gray-300 font-medium">Bioluminescent Camera Viewfinder</p>
            </div>
          </div>

          <div className="flex flex-col items-center bg-black/80 pb-8 pt-4 px-6 gap-5">
            <div className="flex gap-6 text-xs font-bold tracking-widest text-gray-400">
              {["PHOTO", "VIDEO", "PORTRAIT"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setCameraMode(mode)}
                  className={cameraMode === mode ? "text-yellow-400 border-b-2 border-yellow-400 pb-1" : ""}
                >
                  {mode}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between w-full max-w-xs px-4">
              <div className="h-12 w-12 rounded-xl overflow-hidden border border-white/30 bg-white/10">
                <img src={heroImage} alt="Gallery" className="h-full w-full object-cover" />
              </div>

              <button
                onClick={handleCapture}
                className="h-20 w-20 rounded-full border-4 border-white p-1 shadow-2xl transition active:scale-90"
              >
                <div className="h-full w-full rounded-full bg-white" />
              </button>

              <button className="h-12 w-12 flex items-center justify-center rounded-full bg-white/10 text-white">
                <IoVideocam size={22} />
              </button>
            </div>
          </div>
        </div>
      );

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
        {activePanel && fullScreenApps.has(activeApp) && renderAppContent()}
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

