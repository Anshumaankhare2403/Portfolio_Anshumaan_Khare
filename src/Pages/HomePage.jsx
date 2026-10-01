import { useDeferredValue, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import App_icons from "../components/App_icons";
import AppMenu from "../components/AppMenu";
import Dock from "../components/Dock";
import FileExp from "../components/FileExp";
import YtMusice from "../components/YtMusice";
import Terminal from "../components/Terminal";
import Chrome from "../components/Chrome";
import About from "../components/About";
import GitHubWindow from "../components/GitHubWindow";
import ProjectsApp from "../components/ProjectsApp";
import ContactApp from "../components/ContactApp";
import VSCodeWindow from "../components/VSCodeWindow";
import WorkspaceOSD from "../components/WorkspaceOSD";
import GestureGuideModal from "../components/GestureGuideModal";

import launcherIcon from "../assets/This PC/Windows11.svg";
import fileExplorerIcon from "../assets/color-lightblue/folder.svg";
import aboutIcon from "../assets/scalable/users.svg";
import chromeIcon from "../assets/scalable/Google_Chrome_icon_(February_2022).svg";
import youtubeIcon from "../assets/scalable/yt.svg";
import terminalIcon from "../assets/scalable/terminal.svg";
import githubIcon from "../assets/color-lightblue/folder-github.svg";
import projectsIcon from "../assets/color-lightblue/folder-projects.svg";
import vscodeIcon from "../assets/scalable/vscode.svg";

const WORKSPACES = [
  { id: 0, name: "Desktop 1", shortName: "1", label: "Main" },
  { id: 1, name: "Desktop 2", shortName: "2", label: "Development" },
  { id: 2, name: "Desktop 3", shortName: "3", label: "Media & Web" },
  { id: 3, name: "Desktop 4", shortName: "4", label: "Files & Tools" },
];

function HomePage({ onLogout, onSetWallpaper }) {
  // App window states: 'closed' | 'open' | 'minimized'
  const [fileExplorerState, setFileExplorerState] = useState("closed");
  const [ytState, setYtState] = useState("closed");
  const [terminalState, setTerminalState] = useState("closed");
  const [chromeState, setChromeState] = useState("closed");
  const [aboutState, setAboutState] = useState("closed");
  const [githubState, setGithubState] = useState("closed");
  const [projectsState, setProjectsState] = useState("closed");
  const [contactState, setContactState] = useState("closed");
  const [vscodeState, setVscodeState] = useState("closed");

  // Multi-Desktop Workspaces State
  const [activeWorkspace, setActiveWorkspace] = useState(0);
  const [appWorkspaces, setAppWorkspaces] = useState({
    files: 0,
    about: 0,
    contact: 0,
    terminal: 1,
    vscode: 1,
    github: 1,
    chrome: 2,
    youtube: 2,
    projects: 3,
  });

  const [isGestureGuideOpen, setIsGestureGuideOpen] = useState(false);
  const [showOsd, setShowOsd] = useState(false);
  const osdTimerRef = useRef(null);

  // App launcher state
  const [isLauncherOpen, setIsLauncherOpen] = useState(false);
  const [launcherQuery, setLauncherQuery] = useState("");
  const deferredLauncherQuery = useDeferredValue(launcherQuery);

  const triggerOsd = () => {
    setShowOsd(true);
    if (osdTimerRef.current) clearTimeout(osdTimerRef.current);
    osdTimerRef.current = setTimeout(() => setShowOsd(false), 1200);
  };

  const goToWorkspace = (newIndex) => {
    if (newIndex < 0 || newIndex >= WORKSPACES.length) return;
    setActiveWorkspace(newIndex);
    triggerOsd();
  };

  const goToNextWorkspace = () => {
    setActiveWorkspace((current) => {
      const next = Math.min(WORKSPACES.length - 1, current + 1);
      if (next !== current) triggerOsd();
      return next;
    });
  };

  const goToPrevWorkspace = () => {
    setActiveWorkspace((current) => {
      const prev = Math.max(0, current - 1);
      if (prev !== current) triggerOsd();
      return prev;
    });
  };

  const closeLauncher = () => {
    setIsLauncherOpen(false);
    setLauncherQuery("");
  };

  const toggleLauncher = () => {
    setIsLauncherOpen((current) => !current);
    setLauncherQuery("");
  };

  // Launch or switch to an app across workspaces
  const handleAppClick = (appId, state, setState) => {
    if (state === "closed") {
      // Open in the current active workspace
      setAppWorkspaces((prev) => ({ ...prev, [appId]: activeWorkspace }));
      setState("open");
    } else {
      const targetWs = appWorkspaces[appId] ?? 0;
      if (targetWs !== activeWorkspace) {
        // App is in another workspace: smoothly glide to it and restore
        goToWorkspace(targetWs);
        setState("open");
      } else {
        // App is on current workspace: toggle minimize/restore
        if (state === "open") {
          setState("minimized");
        } else {
          setState("open");
        }
      }
    }
  };

  const openAbout = () => handleAppClick("about", aboutState, setAboutState);
  const openChrome = () => handleAppClick("chrome", chromeState, setChromeState);
  const openYouTube = () => handleAppClick("youtube", ytState, setYtState);
  const openTerminal = () => handleAppClick("terminal", terminalState, setTerminalState);

  const apps = [
    {
      id: "files",
      title: "This PC",
      shortTitle: "This PC",
      image: fileExplorerIcon,
      open: () => handleAppClick("files", fileExplorerState, setFileExplorerState),
      isOpen: fileExplorerState !== "closed",
      isMinimized: fileExplorerState === "minimized",
      state: fileExplorerState,
      setState: setFileExplorerState,
    },
    {
      id: "about",
      title: "About Me",
      shortTitle: "About",
      image: aboutIcon,
      open: () => handleAppClick("about", aboutState, setAboutState),
      isOpen: aboutState !== "closed",
      isMinimized: aboutState === "minimized",
      state: aboutState,
      setState: setAboutState,
    },
    {
      id: "chrome",
      title: "Chrome",
      shortTitle: "Chrome",
      image: chromeIcon,
      open: () => handleAppClick("chrome", chromeState, setChromeState),
      isOpen: chromeState !== "closed",
      isMinimized: chromeState === "minimized",
      state: chromeState,
      setState: setChromeState,
    },
    {
      id: "youtube",
      title: "YouTube Music",
      shortTitle: "YT Music",
      image: youtubeIcon,
      open: () => handleAppClick("youtube", ytState, setYtState),
      isOpen: ytState !== "closed",
      isMinimized: ytState === "minimized",
      state: ytState,
      setState: setYtState,
    },
    {
      id: "terminal",
      title: "Terminal",
      shortTitle: "Terminal",
      image: terminalIcon,
      open: () => handleAppClick("terminal", terminalState, setTerminalState),
      isOpen: terminalState !== "closed",
      isMinimized: terminalState === "minimized",
      state: terminalState,
      setState: setTerminalState,
    },
    {
      id: "github",
      title: "GitHub",
      shortTitle: "GitHub",
      image: githubIcon,
      open: () => handleAppClick("github", githubState, setGithubState),
      isOpen: githubState !== "closed",
      isMinimized: githubState === "minimized",
      state: githubState,
      setState: setGithubState,
    },
    {
      id: "projects",
      title: "Projects",
      shortTitle: "Projects",
      image: projectsIcon,
      open: () => handleAppClick("projects", projectsState, setProjectsState),
      isOpen: projectsState !== "closed",
      isMinimized: projectsState === "minimized",
      state: projectsState,
      setState: setProjectsState,
    },
    {
      id: "contact",
      title: "Contact Us",
      shortTitle: "Contact",
      image: aboutIcon,
      open: () => handleAppClick("contact", contactState, setContactState),
      isOpen: contactState !== "closed",
      isMinimized: contactState === "minimized",
      state: contactState,
      setState: setContactState,
    },
    {
      id: "vscode",
      title: "VS Code",
      shortTitle: "VS Code",
      image: vscodeIcon,
      open: () => handleAppClick("vscode", vscodeState, setVscodeState),
      isOpen: vscodeState !== "closed",
      isMinimized: vscodeState === "minimized",
      state: vscodeState,
      setState: setVscodeState,
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

  // Compute number of open windows per workspace for dock indicators
  const workspaceWindowCounts = WORKSPACES.reduce((acc, ws) => {
    const count = apps.filter(
      (app) => app.isOpen && appWorkspaces[app.id] === ws.id
    ).length;
    acc[ws.id] = count;
    return acc;
  }, {});

  // ---------------------------------------------------------------------------
  // Touchpad 5-Finger Gestures, Trackpad Wheel, & Keyboard Listeners
  // ---------------------------------------------------------------------------
  useEffect(() => {
    // 1. Touch Events (5-Finger Swipe on Touchscreens & Touchpads)
    let touchStartX = 0;
    let touchStartTime = 0;
    let isFiveFinger = false;

    const handleTouchStart = (e) => {
      if (e.touches.length === 5) {
        isFiveFinger = true;
        touchStartTime = Date.now();
        let totalX = 0;
        for (let i = 0; i < e.touches.length; i++) {
          totalX += e.touches[i].clientX;
        }
        touchStartX = totalX / 5;
      } else {
        isFiveFinger = false;
      }
    };

    const handleTouchMove = (e) => {
      if (!isFiveFinger || e.touches.length !== 5) return;
      if (e.cancelable) e.preventDefault();
    };

    const handleTouchEnd = (e) => {
      if (!isFiveFinger) return;
      isFiveFinger = false;

      if (e.changedTouches.length > 0) {
        let endX = 0;
        const count = e.changedTouches.length;
        for (let i = 0; i < count; i++) {
          endX += e.changedTouches[i].clientX;
        }
        endX /= count;

        const deltaX = endX - touchStartX;
        const deltaTime = Date.now() - touchStartTime;

        if (deltaTime < 900 && Math.abs(deltaX) > 35) {
          if (deltaX < 0) {
            goToNextWorkspace();
          } else {
            goToPrevWorkspace();
          }
        }
      }
    };

    // 2. Trackpad Horizontal Wheel (Standard Laptop Precision Touchpads)
    let accumDeltaX = 0;
    let wheelTimer = null;
    let isWheelLocked = false;

    const handleWheel = (e) => {
      // If gesture guide modal is open, don't trigger workspace switch from wheel
      if (isGestureGuideOpen) return;

      // Check if target is inside an explicitly horizontally scrollable container
      const scrollable = e.target.closest(
        ".overflow-x-auto, .overflow-auto, pre, .xterm-screen, .monaco-editor"
      );
      if (scrollable && scrollable.scrollWidth > scrollable.clientWidth) {
        const canScrollLeft = scrollable.scrollLeft > 2;
        const canScrollRight =
          scrollable.scrollLeft < scrollable.scrollWidth - scrollable.clientWidth - 2;
        if ((e.deltaX < 0 && canScrollLeft) || (e.deltaX > 0 && canScrollRight)) {
          return; // Allow native internal scroll
        }
      }

      // Trackpad horizontal swipe
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 8) {
        accumDeltaX += e.deltaX;
        clearTimeout(wheelTimer);
        wheelTimer = setTimeout(() => {
          accumDeltaX = 0;
        }, 150);

        const SWIPE_THRESHOLD = 45;
        if (!isWheelLocked) {
          if (accumDeltaX > SWIPE_THRESHOLD) {
            goToNextWorkspace();
            accumDeltaX = 0;
            isWheelLocked = true;
            setTimeout(() => {
              isWheelLocked = false;
            }, 400);
          } else if (accumDeltaX < -SWIPE_THRESHOLD) {
            goToPrevWorkspace();
            accumDeltaX = 0;
            isWheelLocked = true;
            setTimeout(() => {
              isWheelLocked = false;
            }, 400);
          }
        }
      }
    };

    // 3. Keyboard Shortcuts
    const handleKeyDown = (e) => {
      // Super (Windows key) -> Toggle App Menu
      const isSuper =
        e.key === "Meta" || e.code === "MetaLeft" || e.code === "MetaRight";
      if (isSuper && !e.repeat) {
        e.preventDefault();
        toggleLauncher();
        return;
      }

      // Ctrl + Alt + Left/Right or Super + Alt + Left/Right
      if ((e.ctrlKey || e.metaKey) && e.altKey) {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          goToNextWorkspace();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          goToPrevWorkspace();
        }
      }

      // Alt + 1..4 -> Direct jump
      if (e.altKey && ["1", "2", "3", "4"].includes(e.key)) {
        e.preventDefault();
        goToWorkspace(parseInt(e.key, 10) - 1);
      }

      // Escape -> Close launcher or modal
      if (e.key === "Escape") {
        setIsLauncherOpen(false);
        setIsGestureGuideOpen(false);
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isGestureGuideOpen]);

  // Render windows assigned to a specific workspace
  const renderWindowsForWorkspace = (wsId) => (
    <>
      <AnimatePresence>
        {fileExplorerState === "open" && appWorkspaces.files === wsId && (
          <FileExp
            key="file-explorer"
            onClose={() => setFileExplorerState("closed")}
            onMinimize={() => setFileExplorerState("minimized")}
            onOpenAbout={openAbout}
            onOpenChrome={openChrome}
            onOpenYouTube={openYouTube}
            onOpenTerminal={openTerminal}
            onSetWallpaper={onSetWallpaper}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {ytState === "open" && appWorkspaces.youtube === wsId && (
          <YtMusice
            key="youtube-music"
            onClose={() => setYtState("closed")}
            onMinimize={() => setYtState("minimized")}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {terminalState === "open" && appWorkspaces.terminal === wsId && (
          <Terminal
            key="terminal"
            onClose={() => setTerminalState("closed")}
            onMinimize={() => setTerminalState("minimized")}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {chromeState === "open" && appWorkspaces.chrome === wsId && (
          <Chrome
            key="chrome"
            onClose={() => setChromeState("closed")}
            onMinimize={() => setChromeState("minimized")}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {aboutState === "open" && appWorkspaces.about === wsId && (
          <About
            key="About"
            onClose={() => setAboutState("closed")}
            onMinimize={() => setAboutState("minimized")}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {githubState === "open" && appWorkspaces.github === wsId && (
          <GitHubWindow
            key="GitHub"
            onClose={() => setGithubState("closed")}
            onMinimize={() => setGithubState("minimized")}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {projectsState === "open" && appWorkspaces.projects === wsId && (
          <ProjectsApp
            key="Projects"
            onClose={() => setProjectsState("closed")}
            onMinimize={() => setProjectsState("minimized")}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {contactState === "open" && appWorkspaces.contact === wsId && (
          <ContactApp
            key="Contact"
            onClose={() => setContactState("closed")}
            onMinimize={() => setContactState("minimized")}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {vscodeState === "open" && appWorkspaces.vscode === wsId && (
          <VSCodeWindow
            key="VSCode"
            onClose={() => setVscodeState("closed")}
            onMinimize={() => setVscodeState("minimized")}
          />
        )}
      </AnimatePresence>
    </>
  );

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none">
      {/* Workspace Switcher On-Screen Display HUD */}
      <WorkspaceOSD
        show={showOsd}
        activeWorkspace={activeWorkspace}
        workspaces={WORKSPACES}
      />

      {/* Main Multi-Desktop Container - Clean Full Screen */}
      <div className="relative w-full h-full overflow-hidden">
        {WORKSPACES.map((ws, i) => (
          <motion.div
            key={ws.id}
            className={`absolute inset-0 w-full h-full overflow-hidden ${
              i === activeWorkspace ? "pointer-events-auto" : "pointer-events-none"
            }`}
            animate={{
              x: `${(i - activeWorkspace) * 100}%`,
            }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 30,
              mass: 0.85,
            }}
          >
            {/* Desktop Icons for this workspace */}
            <div className="flex flex-col flex-wrap max-h-[calc(100vh-90px)] gap-y-1 gap-x-1 content-start p-2 select-none">
              {apps.map((app) => (
                <App_icons
                  key={app.id}
                  image={app.image}
                  title={app.title}
                  onClick={app.open}
                />
              ))}
            </div>

            {/* Open windows belonging to this workspace */}
            {renderWindowsForWorkspace(i)}
          </motion.div>
        ))}
      </div>

      {/* 3-Finger Touchpad & Trackpad Gesture Guide Modal */}
      <AnimatePresence>
        {isGestureGuideOpen && (
          <GestureGuideModal
            isOpen={isGestureGuideOpen}
            onClose={() => setIsGestureGuideOpen(false)}
            activeWorkspace={activeWorkspace}
            workspaces={WORKSPACES}
            onSelectWorkspace={goToWorkspace}
          />
        )}
      </AnimatePresence>

      {/* App Launcher (Super / Windows Menu) */}
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

      {/* Bottom Dock with Integrated Desktop Switcher */}
      <Dock
        launcherIcon={launcherIcon}
        apps={apps}
        onLauncherToggle={toggleLauncher}
        onLogout={onLogout}
        appWorkspaces={appWorkspaces}
        activeWorkspace={activeWorkspace}
        workspaces={WORKSPACES}
        onSelectWorkspace={goToWorkspace}
        workspaceWindowCounts={workspaceWindowCounts}
        onOpenGestureGuide={() => setIsGestureGuideOpen(true)}
      />
    </div>
  );
}

export default HomePage;
