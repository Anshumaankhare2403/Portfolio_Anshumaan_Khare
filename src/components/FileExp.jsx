import { useState } from "react";
import { motion } from "framer-motion";
import {
  IoArrowBack,
  IoClose,
  IoRemove,
  IoSquareOutline,
} from "react-icons/io5";
import { GoPin } from "react-icons/go";

import desktopIcon from "../assets/color-lightblue/user-home.svg";
import userIcon from "../assets/color-lightblue/user-identity.svg";
import folderIcon from "../assets/color-lightblue/folder.svg";
import codeIcon from "../assets/color-lightblue/folder-code.svg";
import projectsIcon from "../assets/color-lightblue/folder-projects.svg";
import documentsIcon from "../assets/color-lightblue/folder-documents.svg";
import downloadsIcon from "../assets/color-lightblue/folder-download.svg";
import picturesIcon from "../assets/color-lightblue/folder-images.svg";
import musicIcon from "../assets/color-lightblue/folder-music.svg";
import videosIcon from "../assets/color-lightblue/folder-videos.svg";
import chromeIcon from "../assets/scalable/Google_Chrome_icon_(February_2022).svg";
import vscodeIcon from "../assets/scalable/vscode.svg";
import youtubeIcon from "../assets/scalable/yt.svg";
import terminalIcon from "../assets/scalable/terminal.svg";
import windowsIcon from "../assets/This PC/Windows11.svg";

const folders = [
  { name: "Desktop", location: "Anshumaan - Personal", icon: desktopIcon },
  { name: "Downloads", location: "Stored locally", icon: downloadsIcon },
  { name: "Documents", location: "Anshumaan - Personal", icon: documentsIcon },
  { name: "Pictures", location: "Anshumaan - Personal", icon: picturesIcon },
  { name: "Music", location: "Stored locally", icon: musicIcon },
  { name: "Videos", location: "Stored locally", icon: videosIcon },
];

const folderContents = {
  Desktop: [
    { name: "This PC", icon: windowsIcon, section: null },
    { name: "Documents", icon: documentsIcon, section: "Documents" },
    { name: "Downloads", icon: downloadsIcon, section: "Downloads" },
    { name: "Pictures", icon: picturesIcon, section: "Pictures" },
    { name: "Music", icon: musicIcon, section: "Music" },
    { name: "Videos", icon: videosIcon, section: "Videos" },
    { name: "About Me", icon: userIcon, app: "about" },
    { name: "Visual Studio Code", icon: vscodeIcon, app: "vscode" },
    { name: "Chrome", icon: chromeIcon, app: "chrome" },
    { name: "YouTube Music", icon: youtubeIcon, app: "youtube" },
    { name: "Terminal", icon: terminalIcon, app: "terminal" },
  ],
  Documents: [
    { name: "Projects", icon: projectsIcon },
    { name: "Certificates", icon: folderIcon },
    { name: "Skills.txt", icon: documentsIcon },
  ],
  Downloads: [
    { name: "Portfolio Source", icon: codeIcon },
    // { name: "Resume.pdf", icon: documentsIcon, url: resume },
    { name: "Project Assets", icon: folderIcon },
  ],
  Pictures: [
    { name: "Portfolio Preview.png", icon: picturesIcon },
    { name: "Desktop Wallpaper.jpg", icon: picturesIcon },
    { name: "Screenshots", icon: folderIcon },
  ],
  Music: [
    { name: "Coding Playlist", icon: musicIcon },
    { name: "Favourite Tracks", icon: musicIcon },
    { name: "YouTube Music", icon: youtubeIcon },
  ],
  Videos: [
    { name: "Project Demo.mp4", icon: videosIcon },
    { name: "Portfolio Walkthrough.mp4", icon: videosIcon },
    { name: "Recordings", icon: folderIcon },
  ],
};

function FileExp({
  onClose,
  onOpenAbout,
  onOpenChrome,
  onOpenVSCode,
  onOpenYouTube,
  onOpenTerminal,
}) {
  const [maximized, setMaximized] = useState(false);
  const [activeFolder, setActiveFolder] = useState(null);

  const appActions = {
    about: onOpenAbout,
    chrome: onOpenChrome,
    vscode: onOpenVSCode,
    youtube: onOpenYouTube,
    terminal: onOpenTerminal,
  };

  const openItem = (item) => {
    if (Object.prototype.hasOwnProperty.call(item, "section")) {
      setActiveFolder(item.section);
      return;
    }

    if (item.app && appActions[item.app]) {
      appActions[item.app]();
      return;
    }

    if (item.url) {
      window.open(item.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ x: 120, y: 50, opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`fixed pointer-events-auto flex flex-col overflow-hidden border border-white/20 bg-black/20 text-white shadow-2xl backdrop-blur-3xl ${
        maximized
          ? "inset-0 z-50 rounded-none"
          : "absolute left-10 top-10 h-[70vh] w-[60vw] rounded-2xl"
      }`}
    >
      <div className="flex h-11 shrink-0 items-center border-b border-white/10 bg-black/20 px-3">
        <span className="flex-1 text-sm font-medium">File Explorer</span>

        <button className="rounded p-2 hover:bg-white/10" aria-label="Minimize">
          <IoRemove />
        </button>
        <button
          onClick={() => setMaximized(!maximized)}
          className="rounded p-2 hover:bg-white/10"
          aria-label={maximized ? "Restore" : "Maximize"}
        >
          <IoSquareOutline />
        </button>
        <button
          onClick={onClose}
          className="rounded p-2 hover:bg-red-600"
          aria-label="Close"
        >
          <IoClose />
        </button>
      </div>

      <div className="flex min-h-0 flex-1">
        <aside className="w-56 shrink-0 overflow-y-auto border-r border-white/10 bg-black/10">
          <div className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Quick Access
          </div>

          <div className="space-y-1 px-2">
            {folders.map((folder) => (
              <button
                type="button"
                key={folder.name}
                onClick={() => setActiveFolder(folder.name)}
                className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition hover:bg-white/10 ${
                  activeFolder === folder.name ? "bg-white/15" : ""
                }`}
              >
                <img
                  src={folder.icon}
                  alt=""
                  className="h-6 w-6 object-contain"
                />
                <span>{folder.name}</span>
              </button>
            ))}
          </div>
        </aside>

        <main className="min-w-0 flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <div className="flex items-center gap-3">
              {activeFolder && (
                <button
                  type="button"
                  onClick={() => setActiveFolder(null)}
                  aria-label="Back to Quick Access"
                  className="rounded-lg p-2 text-lg hover:bg-white/10"
                >
                  <IoArrowBack />
                </button>
              )}
              <h2 className="text-2xl font-semibold">
                {activeFolder || "Quick Access"}
              </h2>
            </div>
            <p className="text-sm text-gray-400">
              {activeFolder
                ? `This PC > ${activeFolder}`
                : "Frequently used folders"}
            </p>
          </div>

          {!activeFolder ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
              {folders.map((folder) => (
                <button
                  type="button"
                  key={folder.name}
                  onClick={() => setActiveFolder(folder.name)}
                  className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 text-left transition-all duration-200 hover:scale-[1.02] hover:border-white/20 hover:bg-white/10"
                >
                  <img
                    src={folder.icon}
                    alt=""
                    className="h-16 w-16 object-contain"
                  />
                  <div className="flex min-w-0 flex-col">
                    <span className="font-medium">{folder.name}</span>
                    <span className="truncate text-sm text-gray-400">
                      {folder.location}
                    </span>
                    <span className="mt-1 flex items-center gap-1 text-xs text-blue-400">
                      <GoPin />
                      Pinned
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-4">
              {folderContents[activeFolder].map((item) => (
                <button
                  type="button"
                  key={item.name}
                  onClick={() => openItem(item)}
                  className="flex min-h-36 flex-col items-center justify-center gap-3 rounded-xl border border-transparent p-4 text-center transition hover:border-white/10 hover:bg-white/10 focus:bg-blue-500/20 focus:outline-none"
                >
                  <img
                    src={item.icon}
                    alt=""
                    className="h-16 w-16 object-contain"
                  />
                  <span className="w-full break-words text-sm">{item.name}</span>
                </button>
              ))}
            </div>
          )}
        </main>
      </div>
    </motion.div>
  );
}

export default FileExp;
