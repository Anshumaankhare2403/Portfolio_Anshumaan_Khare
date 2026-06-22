import { useState } from "react";
import { motion } from "framer-motion";
import {
  IoArrowBack,
  IoClose,
  IoRemove,
  IoSquareOutline,
} from "react-icons/io5";
import { GoPin } from "react-icons/go";
import { FaCss3Alt } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import {
  SiAndroidstudio,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiVite,
} from "react-icons/si";

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
import heroImage from "../assets/hero.png";
import wallpaperImage from "../assets/wallpaper/bioluminescence-3840x2160-25836.jpg";
import resumePdf from "../assets/resume/anshumaanKhare.pdf";

const skills = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
  { name: "Vite", icon: SiVite, color: "#BD34FE" },
  { name: "VS Code", icon: VscVscode, color: "#23A8F2" },
  { name: "Android Studio", icon: SiAndroidstudio, color: "#3DDC84" },
];

const folders = [
  { name: "Desktop", location: "Anshumaan - Personal", icon: desktopIcon },
  { name: "Downloads", location: "Stored locally", icon: downloadsIcon },
  { name: "Documents", location: "Anshumaan - Personal", icon: documentsIcon },
  { name: "Skills", location: "Development toolkit", icon: codeIcon },
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
    { name: "Projects", icon: projectsIcon, section: "Projects" },
    { name: "Certificates", icon: folderIcon, section: "Certificates" },
    {
      name: "Skills",
      icon: codeIcon,
      section: "Skills",
    },
    {
      name: "Resume.pdf",
      icon: documentsIcon,
      description: "Open Anshumaan Khare's resume in a new tab.",
      url: resumePdf,
    },
  ],
  Downloads: [
    {
      name: "Portfolio Source",
      icon: codeIcon,
      app: "vscode",
      description: "Open the portfolio source workspace in Visual Studio Code.",
    },
    {
      name: "Resume Copy.pdf",
      icon: documentsIcon,
      description: "Open a downloadable copy of the resume.",
      url: resumePdf,
    },
    { name: "Project Assets", icon: folderIcon, section: "Project Assets" },
  ],
  Pictures: [
    {
      name: "Portfolio Preview.png",
      icon: picturesIcon,
      preview: heroImage,
      description: "Portfolio hero preview.",
    },
    {
      name: "Desktop Wallpaper.jpg",
      icon: picturesIcon,
      preview: wallpaperImage,
      description: "The default desktop wallpaper.",
    },
    { name: "Screenshots", icon: folderIcon, section: "Screenshots" },
  ],
  Music: [
    {
      name: "Coding Playlist",
      icon: musicIcon,
      app: "youtube",
      description: "Open the coding playlist in YouTube Music.",
    },
    {
      name: "Favourite Tracks",
      icon: musicIcon,
      app: "youtube",
      description: "Open favourite tracks in YouTube Music.",
    },
    { name: "YouTube Music", icon: youtubeIcon, app: "youtube" },
  ],
  Videos: [
    {
      name: "Project Demo.mp4",
      icon: videosIcon,
      app: "chrome",
      description: "Open the project demo in Chrome.",
    },
    {
      name: "Portfolio Walkthrough.mp4",
      icon: videosIcon,
      app: "chrome",
      description: "Open the portfolio walkthrough in Chrome.",
    },
    { name: "Recordings", icon: folderIcon, section: "Recordings" },
  ],
  Projects: [
    {
      name: "Portfolio Website",
      icon: codeIcon,
      app: "vscode",
      description: "Open this portfolio project in Visual Studio Code.",
    },
    {
      name: "Live Portfolio",
      icon: chromeIcon,
      app: "chrome",
      description: "Open the live portfolio browser.",
    },
    {
      name: "Project Terminal",
      icon: terminalIcon,
      app: "terminal",
      description: "Open a terminal for project commands.",
    },
  ],
  Certificates: [
    {
      name: "Web Development",
      icon: documentsIcon,
      description: "Web development certificate.",
      content: "Certificate preview will be available here.",
    },
    {
      name: "Frontend Development",
      icon: documentsIcon,
      description: "Frontend development certificate.",
      content: "Certificate preview will be available here.",
    },
  ],
  "Project Assets": [
    {
      name: "Hero Image.png",
      icon: picturesIcon,
      preview: heroImage,
      description: "Hero image used by the portfolio.",
    },
    {
      name: "Wallpaper.jpg",
      icon: picturesIcon,
      preview: wallpaperImage,
      description: "Desktop wallpaper asset.",
    },
    {
      name: "Source Files",
      icon: codeIcon,
      app: "vscode",
      description: "Open project source files in Visual Studio Code.",
    },
  ],
  Screenshots: [
    {
      name: "Home Screen.png",
      icon: picturesIcon,
      preview: wallpaperImage,
      description: "Desktop home-screen preview.",
    },
    {
      name: "About Preview.png",
      icon: picturesIcon,
      preview: heroImage,
      description: "About page preview.",
    },
  ],
  Recordings: [
    {
      name: "Desktop Tour.mp4",
      icon: videosIcon,
      app: "chrome",
      description: "Open the desktop tour in Chrome.",
    },
    {
      name: "Terminal Demo.mp4",
      icon: videosIcon,
      app: "terminal",
      description: "Open Terminal for the command-line demo.",
    },
  ],
  Skills: skills.map((skill) => ({
    name: skill.name,
    skillIcon: skill.icon,
    color: skill.color,
    description: `${skill.name} is part of my development toolkit.`,
  })),
};

const parentFolders = {
  Projects: "Documents",
  Certificates: "Documents",
  Skills: "Documents",
  "Project Assets": "Downloads",
  Screenshots: "Pictures",
  Recordings: "Videos",
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
  const [selectedPreview, setSelectedPreview] = useState(null);

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
      setSelectedPreview(null);
      return;
    }

    setSelectedPreview(item);

    if (item.app && appActions[item.app]) {
      appActions[item.app]();
      return;
    }

    if (item.url) {
      window.open(item.url, "_blank", "noopener,noreferrer");
    }
  };

  const openFolder = (folderName) => {
    setActiveFolder(folderName);
    setSelectedPreview(null);
  };

  const goBack = () => {
    setActiveFolder((current) => parentFolders[current] || null);
    setSelectedPreview(null);
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
                onClick={() => openFolder(folder.name)}
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
                  onClick={goBack}
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
                  onClick={() => openFolder(folder.name)}
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
            <div className="flex gap-5">
              <div className="grid min-w-0 flex-1 grid-cols-[repeat(auto-fill,minmax(130px,1fr))] content-start gap-4">
                {(folderContents[activeFolder] || []).map((item) => (
                  <button
                    type="button"
                    key={item.name}
                    onClick={() => openItem(item)}
                    className={`flex min-h-36 flex-col items-center justify-center gap-3 rounded-xl border p-4 text-center transition hover:border-white/10 hover:bg-white/10 focus:outline-none ${
                      selectedPreview?.name === item.name
                        ? "border-blue-400/40 bg-blue-500/20"
                        : "border-transparent"
                    }`}
                  >
                    {item.skillIcon ? (
                      <item.skillIcon
                        className="h-16 w-16"
                        style={{ color: item.color }}
                        aria-hidden="true"
                      />
                    ) : (
                      <img
                        src={item.icon}
                        alt=""
                        className="h-16 w-16 object-contain"
                      />
                    )}
                    <span className="w-full break-words text-sm">
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>

              {selectedPreview && (
                <aside className="w-64 shrink-0 rounded-xl border border-white/10 bg-black/20 p-4">
                  {selectedPreview.preview ? (
                    <img
                      src={selectedPreview.preview}
                      alt={selectedPreview.name}
                      className="mb-4 h-36 w-full rounded-lg object-cover"
                    />
                  ) : selectedPreview.skillIcon ? (
                    <selectedPreview.skillIcon
                      className="mx-auto mb-4 h-20 w-20"
                      style={{ color: selectedPreview.color }}
                      aria-hidden="true"
                    />
                  ) : (
                    <img
                      src={selectedPreview.icon}
                      alt=""
                      className="mx-auto mb-4 h-20 w-20 object-contain"
                    />
                  )}
                  <h3 className="break-words font-semibold">
                    {selectedPreview.name}
                  </h3>
                  {selectedPreview.description && (
                    <p className="mt-2 text-sm leading-6 text-gray-300">
                      {selectedPreview.description}
                    </p>
                  )}
                  {selectedPreview.content && (
                    <p className="mt-3 rounded-lg bg-white/5 p-3 text-sm leading-6 text-gray-300">
                      {selectedPreview.content}
                    </p>
                  )}
                  {selectedPreview.skills && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {selectedPreview.skills.map((skill) => {
                        const SkillIcon = skill.icon;

                        return (
                          <div
                            key={skill.name}
                            className="flex min-w-0 items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-2"
                          >
                            <SkillIcon
                              className="h-6 w-6 shrink-0"
                              style={{ color: skill.color }}
                              aria-hidden="true"
                            />
                            <span className="truncate text-xs">
                              {skill.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </aside>
              )}
            </div>
          )}
        </main>
      </div>
    </motion.div>
  );
}

export default FileExp;
