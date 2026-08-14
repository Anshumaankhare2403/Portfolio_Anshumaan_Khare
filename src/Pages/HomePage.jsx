import { useDeferredValue, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import App_icons from "../components/App_icons";
import AppMenu from "../components/AppMenu";
import Dock from "../components/Dock";
import FileExp from "../components/FileExp";
import YtMusice from "../components/YtMusice";
import Terminal from "../components/Terminal";
import Chrome from "../components/Chrome";
import About from "../components/About";

import launcherIcon from "../assets/This PC/Windows11.svg";
import fileExplorerIcon from "../assets/color-lightblue/folder.svg";
import aboutIcon from "../assets/scalable/users.svg";
import chromeIcon from "../assets/scalable/Google_Chrome_icon_(February_2022).svg";
import youtubeIcon from "../assets/scalable/yt.svg";
import terminalIcon from "../assets/scalable/terminal.svg";

function HomePage({ onLogout }) {
  const [isFileExplorerOpen, setIsFileExplorerOpen] = useState(false);
  const [isYtOpen, setYtOpen] = useState(false);
  const [isTerminalOpen, setTerminalOpen] = useState(false);
  const [isChromeOpen, setChromeOpen] = useState(false);
  const [isAboutOpen, setAboutOpen] = useState(false);
  const [isLauncherOpen, setIsLauncherOpen] = useState(false);
  const [launcherQuery, setLauncherQuery] = useState("");
  const deferredLauncherQuery = useDeferredValue(launcherQuery);

  const closeLauncher = () => {
    setIsLauncherOpen(false);
    setLauncherQuery("");
  };

  const toggleLauncher = () => {
    setIsLauncherOpen((current) => !current);
    setLauncherQuery("");
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const isWindowsKey =
        event.key === "Meta" ||
        event.code === "MetaLeft" ||
        event.code === "MetaRight";

      if (isWindowsKey && !event.repeat) {
        event.preventDefault();
        setIsLauncherOpen((current) => !current);
        setLauncherQuery("");
      }

      if (event.key === "Escape") {
        setIsLauncherOpen(false);
        setLauncherQuery("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openFileExplorer = () => setIsFileExplorerOpen(true);
  const openAbout = () => setAboutOpen(true);
  const openChrome = () => setChromeOpen(true);
  const openYouTube = () => setYtOpen(true);
  const openTerminal = () => setTerminalOpen(true);

  const apps = [
    {
      id: "files",
      title: "This PC",
      shortTitle: "This PC",
      image: fileExplorerIcon,
      open: openFileExplorer,
    },
    {
      id: "about",
      title: "About Me",
      shortTitle: "About",
      image: aboutIcon,
      open: openAbout,
    },
    {
      id: "chrome",
      title: "Chrome",
      shortTitle: "Chrome",
      image: chromeIcon,
      open: openChrome,
    },
    {
      id: "youtube",
      title: "YouTube Music",
      shortTitle: "YT Music",
      image: youtubeIcon,
      open: openYouTube,
    },
    {
      id: "terminal",
      title: "Terminal",
      shortTitle: "Terminal",
      image: terminalIcon,
      open: openTerminal,
    },
  ];

  const launchApp = (openApp) => {
    openApp();
    closeLauncher();
  };

  const launcherApps = apps.map((app) => ({
    ...app,
    onOpen: () => launchApp(app.open),
  }));

  const filteredApps = launcherApps.filter((app) =>
    app.title.toLowerCase().includes(deferredLauncherQuery.trim().toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col gap-4">
        {apps.map((app) => (
          <App_icons
            key={app.id}
            image={app.image}
            title={app.title}
            onClick={app.open}
          />
        ))}
      </div>

      <AnimatePresence>
        {isLauncherOpen && (
          <AppMenu
            key="app-menu"
            apps={filteredApps}
            query={launcherQuery}
            onClose={closeLauncher}
            onQueryChange={setLauncherQuery}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isFileExplorerOpen && (
          <FileExp
            key="file-explorer"
            onClose={() => setIsFileExplorerOpen(false)}
            onOpenAbout={openAbout}
            onOpenChrome={openChrome}
            onOpenYouTube={openYouTube}
            onOpenTerminal={openTerminal}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
      </AnimatePresence>

      <AnimatePresence>
        {isYtOpen && (
          <YtMusice key="youtube-music" onClose={() => setYtOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isTerminalOpen && (
          <Terminal key="terminal" onClose={() => setTerminalOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isChromeOpen && (
          <Chrome key="chrome" onClose={() => setChromeOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAboutOpen && (
          <About key="About" onClose={() => setAboutOpen(false)} />
        )}
      </AnimatePresence>
      {/* <FileExp/> */}
      <Dock
        launcherIcon={launcherIcon}
        apps={apps}
        onLauncherToggle={toggleLauncher}
        onLogout={onLogout}
      />

    </>
  );
}

export default HomePage;
