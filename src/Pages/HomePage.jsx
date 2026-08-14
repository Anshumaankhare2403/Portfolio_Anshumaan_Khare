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
  // App window states: 'closed' | 'open' | 'minimized'
  const [fileExplorerState, setFileExplorerState] = useState("closed");
  const [ytState, setYtState] = useState("closed");
  const [terminalState, setTerminalState] = useState("closed");
  const [chromeState, setChromeState] = useState("closed");
  const [aboutState, setAboutState] = useState("closed");

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

  const toggleAppWindow = (state, setState) => {
    if (state === "open") {
      setState("minimized");
    } else {
      setState("open");
    }
  };

  const openAbout = () => setAboutState("open");
  const openChrome = () => setChromeState("open");
  const openYouTube = () => setYtState("open");
  const openTerminal = () => setTerminalState("open");

  const apps = [
    {
      id: "files",
      title: "This PC",
      shortTitle: "This PC",
      image: fileExplorerIcon,
      open: () => toggleAppWindow(fileExplorerState, setFileExplorerState),
      isOpen: fileExplorerState !== "closed",
      isMinimized: fileExplorerState === "minimized",
    },
    {
      id: "about",
      title: "About Me",
      shortTitle: "About",
      image: aboutIcon,
      open: () => toggleAppWindow(aboutState, setAboutState),
      isOpen: aboutState !== "closed",
      isMinimized: aboutState === "minimized",
    },
    {
      id: "chrome",
      title: "Chrome",
      shortTitle: "Chrome",
      image: chromeIcon,
      open: () => toggleAppWindow(chromeState, setChromeState),
      isOpen: chromeState !== "closed",
      isMinimized: chromeState === "minimized",
    },
    {
      id: "youtube",
      title: "YouTube Music",
      shortTitle: "YT Music",
      image: youtubeIcon,
      open: () => toggleAppWindow(ytState, setYtState),
      isOpen: ytState !== "closed",
      isMinimized: ytState === "minimized",
    },
    {
      id: "terminal",
      title: "Terminal",
      shortTitle: "Terminal",
      image: terminalIcon,
      open: () => toggleAppWindow(terminalState, setTerminalState),
      isOpen: terminalState !== "closed",
      isMinimized: terminalState === "minimized",
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
        {fileExplorerState === "open" && (
          <FileExp
            key="file-explorer"
            onClose={() => setFileExplorerState("closed")}
            onMinimize={() => setFileExplorerState("minimized")}
            onOpenAbout={openAbout}
            onOpenChrome={openChrome}
            onOpenYouTube={openYouTube}
            onOpenTerminal={openTerminal}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {ytState === "open" && (
          <YtMusice
            key="youtube-music"
            onClose={() => setYtState("closed")}
            onMinimize={() => setYtState("minimized")}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {terminalState === "open" && (
          <Terminal
            key="terminal"
            onClose={() => setTerminalState("closed")}
            onMinimize={() => setTerminalState("minimized")}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {chromeState === "open" && (
          <Chrome
            key="chrome"
            onClose={() => setChromeState("closed")}
            onMinimize={() => setChromeState("minimized")}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {aboutState === "open" && (
          <About
            key="About"
            onClose={() => setAboutState("closed")}
            onMinimize={() => setAboutState("minimized")}
          />
        )}
      </AnimatePresence>

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
