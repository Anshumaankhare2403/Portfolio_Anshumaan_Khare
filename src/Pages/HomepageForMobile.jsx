import { useMemo, useState } from "react";
import {
  IoClose,
  IoChevronBack,
  IoCodeSlashOutline,
  IoDocumentTextOutline,
  IoLogoGithub,
  IoMailOutline,
  IoPersonOutline,
  IoSearchOutline,
} from "react-icons/io5";

import filesIcon from "../assets/AndroideICONES/icons8-google-files-96.svg";
import chromeIcon from "../assets/AndroideICONES/icons8-chrome-96.svg";
import youtubeIcon from "../assets/scalable/yt.svg";
import terminalIcon from "../assets/scalable/terminal.svg";
import resume from "../assets/resume/Anshumaankhare.pdf";
import About from "../components/About";
import ChromeWindow from "../components/Chrome";
import FileExp from "../components/FileExp";
import Terminal from "../components/Terminal";
import YtMusice from "../components/YtMusice";

const portfolioApps = [
  { id: "about", label: "About", icon: IoPersonOutline, color: "#5b6ee1" },
  { id: "projects", label: "Projects", icon: IoCodeSlashOutline, color: "#0b8f84" },
  { id: "resume", label: "Resume", icon: IoDocumentTextOutline, color: "#db5e50" },
  { id: "github", label: "GitHub", icon: IoLogoGithub, color: "#24292f" },
  { id: "contact", label: "Contact", icon: IoMailOutline, color: "#d85a83" },
  { id: "files", label: "Files", image: filesIcon },
  { id: "music", label: "Music", image: youtubeIcon },
  { id: "terminal", label: "Terminal", image: terminalIcon },
  { id: "chrome", label: "Chrome", image: chromeIcon },
];

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
    body: "Open my resume to view my experience, education, and skills.",
    action: "Open resume",
    href: resume,
  },
  contact: {
    title: "Get in touch",
    body: "For opportunities or collaboration, send me an email.",
    action: "Email Anshumaan",
    href: "mailto:anshumaankhare@gmail.com",
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

const fullScreenApps = new Set(["about", "files", "music", "terminal", "chrome"]);

function HomepageForMobile() {
  const [activeApp, setActiveApp] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const time = useMemo(
    () => new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(new Date()),
    []
  );
  const activePanel = activeApp ? panels[activeApp] : null;

  const openApp = (app) => {
    setActiveApp(app.id);
  };

  const renderAppContent = () => {
    const closeApp = () => setActiveApp(null);
    if (activeApp === "about") return <About mobile onClose={closeApp} />;
    if (activeApp === "files") return <FileExp mobile onClose={closeApp} onOpenAbout={() => setActiveApp("about")} onOpenChrome={() => setActiveApp("chrome")} onOpenYouTube={() => setActiveApp("music")} onOpenTerminal={() => setActiveApp("terminal")} />;
    if (activeApp === "music") return <YtMusice mobile onClose={closeApp} />;
    if (activeApp === "terminal") return <Terminal mobile onClose={closeApp} />;
    if (activeApp === "chrome") return <ChromeWindow mobile onClose={closeApp} />;
    if (activeApp === "resume") return <iframe className="ios-resume" src={resume} title="Anshumaan Khare resume" />;

    return <><p>{activePanel.body}</p>{activePanel.href && <a className="android-action" href={activePanel.href} target={activePanel.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{activePanel.action}</a>}</>;
  };

  return (
    <main className="android-shell">
      <section className="android-home" aria-label="iPhone portfolio home screen">
        <header className="android-status">
          <time>{time}</time>
          <span className="ios-dynamic-island" aria-label="Dynamic Island" />
          <div aria-label="Phone status">5G&nbsp;&nbsp;Wi-Fi&nbsp;&nbsp;100%</div>
        </header>

        <div className="ios-profile-widget">
          <p>Portfolio</p>
          <h1>Anshumaan Khare</h1>
          <span>Developer and interface builder</span>
        </div>

        <div className="android-app-grid">
          {portfolioApps.slice(0, 8).map((app) => (
            <button className="android-app" key={app.id} onClick={() => openApp(app)} aria-label={`Open ${app.label}`}>
              <span className="android-app-icon" style={app.color ? { backgroundColor: app.color } : undefined}>
                {app.image ? <img src={app.image} alt="" /> : <app.icon aria-hidden="true" />}
              </span>
              <span>{app.label}</span>
            </button>
          ))}
        </div>

        <div className="android-dock" aria-label="Pinned apps">
          {portfolioApps.slice(8).map((app) => (
            <button className="android-app" key={app.id} onClick={() => openApp(app)} aria-label={`Open ${app.label}`}>
              <span className="android-app-icon"><img src={app.image} alt="" /></span>
              <span>{app.label}</span>
            </button>
          ))}
        </div>

        <button className="android-drawer-button" onClick={() => setShowDrawer(true)} aria-label="Open app library">
          <IoSearchOutline aria-hidden="true" />
          <span>Search</span>
        </button>
        <div className="android-gesture" aria-hidden="true" />
      </section>

      {activePanel && fullScreenApps.has(activeApp) && renderAppContent()}

      {activePanel && !fullScreenApps.has(activeApp) && (
        <section className="android-sheet ios-app-window" role="dialog" aria-modal="true" aria-labelledby="android-sheet-title">
          <button className="android-close" onClick={() => setActiveApp(null)} aria-label="Close"><IoChevronBack /></button>
          <p className="android-sheet-kicker">Anshumaan Khare</p>
          <h2 id="android-sheet-title">{activePanel.title}</h2>
          <div className="ios-app-content">{renderAppContent()}</div>
        </section>
      )}

      {showDrawer && (
        <section className="android-drawer" role="dialog" aria-modal="true" aria-label="App Library">
          <div className="android-drawer-head"><h2>App Library</h2><button onClick={() => setShowDrawer(false)} aria-label="Close App Library"><IoClose /></button></div>
          <div className="android-app-grid android-app-grid-drawer">
            {portfolioApps.map((app) => (
              <button className="android-app" key={app.id} onClick={() => { setShowDrawer(false); openApp(app); }}>
                <span className="android-app-icon" style={app.color ? { backgroundColor: app.color } : undefined}>{app.image ? <img src={app.image} alt="" /> : <app.icon aria-hidden="true" />}</span>
                <span>{app.label}</span>
              </button>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default HomepageForMobile;
