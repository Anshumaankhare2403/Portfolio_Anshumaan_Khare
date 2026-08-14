import { useState } from "react";
import { motion } from "framer-motion";
import {
  IoArrowBack,
  IoClose,
  IoDocumentOutline,
  IoEllipsisVertical,
  IoFolderOpenOutline,
  IoGridOutline,
  IoPhonePortraitOutline,
  IoRemove,
  IoSearch,
  IoShareSocialOutline,
  IoSquareOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { GoPin } from "react-icons/go";
import {
  FaAws,
  FaBug,
  FaClock,
  FaCloud,
  FaCode,
  FaComments,
  FaCss3Alt,
  FaDatabase,
  FaExchangeAlt,
  FaKey,
  FaLayerGroup,
  FaMobileAlt,
  FaNetworkWired,
  FaPuzzlePiece,
  FaRegHandshake,
  FaRocket,
  FaServer,
} from "react-icons/fa";
import { VscTerminal, VscVscode } from "react-icons/vsc";
import {
  SiAxios,
  SiBootstrap,
  SiDart,
  SiExpress,
  SiFirebase,
  SiFlutter,
  SiFramer,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiLinux,
  SiMongodb,
  SiMongoose,
  SiMui,
  SiMysql,
  SiNetlify,
  SiNodedotjs,
  SiPostman,
  SiReact,
  SiTailwindcss,
  SiVercel,
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
import youtubeIcon from "../assets/scalable/yt.svg";
import terminalIcon from "../assets/scalable/terminal.svg";
import windowsIcon from "../assets/This PC/Windows11.svg";
import heroImage from "../assets/hero.png";
import wallpaperImage from "../assets/wallpaper/bioluminescence-3840x2160-25836.jpg";

const resumePdf =
  "https://drive.google.com/file/d/18JMIryHKjqNDkUVY7VHZ7KfBldjn9Mju/preview";

const skillGroups = [
  {
    title: "Programming Languages",
    items: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Dart", icon: SiDart, color: "#0175C2" },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "React.js", icon: SiReact, color: "#61DAFB" },
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
      { name: "REST APIs", icon: FaExchangeAlt, color: "#38BDF8" },
    ],
  },
  {
    title: "Mobile Development",
    items: [{ name: "Flutter", icon: SiFlutter, color: "#02569B" }],
  },
  {
    title: "Databases",
    items: [
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
    ],
  },
  {
    title: "Cloud & DevOps",
    items: [
      { name: "AWS EC2", icon: FaAws, color: "#FF9900" },
      { name: "AWS S3", icon: FaAws, color: "#FF9900" },
      { name: "AWS VPC", icon: FaNetworkWired, color: "#FF9900" },
      { name: "AWS IAM", icon: FaKey, color: "#FF9900" },
      { name: "AWS CloudWatch", icon: FaCloud, color: "#FF9900" },
      { name: "AWS SNS", icon: FaComments, color: "#FF9900" },
      { name: "AWS ALB", icon: FaServer, color: "#FF9900" },
      { name: "AWS NAT Gateway", icon: FaNetworkWired, color: "#FF9900" },
      { name: "Netlify", icon: SiNetlify, color: "#00C7B7" },
      { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
    ],
  },
  {
    title: "Tools & Platforms",
    items: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
      { name: "Linux", icon: SiLinux, color: "#FCC624" },
      { name: "WSL2", icon: VscTerminal, color: "#4ADE80" },
      { name: "VS Code", icon: VscVscode, color: "#23A8F2" },
    ],
  },
  {
    title: "Libraries & Frameworks",
    items: [
      { name: "Framer Motion", icon: SiFramer, color: "#F5A9FF" },
      { name: "Axios", icon: SiAxios, color: "#5A29E4" },
      { name: "Mongoose", icon: SiMongoose, color: "#880000" },
      { name: "Material UI", icon: SiMui, color: "#007FFF" },
    ],
  },
  {
    title: "Expertise",
    items: [
      { name: "MERN Stack Development", icon: FaLayerGroup, color: "#61DAFB" },
      { name: "Flutter Development", icon: FaMobileAlt, color: "#42A5F5" },
      { name: "Full Stack Development", icon: FaCode, color: "#A78BFA" },
      { name: "API Integration", icon: FaPuzzlePiece, color: "#38BDF8" },
      {
        name: "Authentication & Authorization (JWT)",
        icon: SiJsonwebtokens,
        color: "#D63AFF",
      },
      { name: "Database Design", icon: FaDatabase, color: "#47A248" },
      { name: "CRUD Operations", icon: FaExchangeAlt, color: "#F59E0B" },
      {
        name: "Responsive Web Design",
        icon: IoPhonePortraitOutline,
        color: "#38BDF8",
      },
      { name: "Performance Optimization", icon: FaRocket, color: "#F43F5E" },
    ],
  },
  {
    title: "Soft Skills",
    items: [
      { name: "Problem Solving", icon: FaPuzzlePiece, color: "#FBBF24" },
      { name: "Communication", icon: FaComments, color: "#60A5FA" },
      { name: "Team Collaboration", icon: FaRegHandshake, color: "#34D399" },
      { name: "Debugging", icon: FaBug, color: "#F87171" },
      { name: "Time Management", icon: FaClock, color: "#C084FC" },
    ],
  },
];

const skills = skillGroups.flatMap((group) =>
  group.items.map((skill) => ({ ...skill, category: group.title }))
);

const readmeSections = [
  {
    title: "About Me",
    content:
      "I am Anshumaan Khare, a Software Developer focused on building modern, responsive, and scalable web and mobile applications. I enjoy transforming ideas into polished digital products with clean interfaces, reliable APIs, and maintainable code.",
  },
  {
    title: "Education",
    content:
      "Master of Computer Applications (MCA)\nJAIN (Deemed-to-be University)\n2025–2027",
  },
  {
    title: "Development Stack",
    content:
      "Frontend: React.js, JavaScript, HTML5, CSS3, Tailwind CSS, and Bootstrap.\nBackend: Node.js, Express.js, REST APIs, JWT authentication, and authorization.\nMobile: Flutter and Dart.\nDatabases: MongoDB, MySQL, Firebase, and Mongoose.",
  },
  {
    title: "Cloud & DevOps",
    content:
      "Experience with AWS EC2, S3, VPC, IAM, CloudWatch, SNS, Application Load Balancer, and NAT Gateway. I also deploy applications using Netlify and Vercel.",
  },
  {
    title: "Tools & Libraries",
    content:
      "Git, GitHub, Postman, Linux, WSL2, VS Code, Framer Motion, Axios, Material UI, and responsive UI development workflows.",
  },
  {
    title: "Core Expertise",
    content:
      "MERN stack development, Flutter development, full-stack application development, API integration, database design, CRUD operations, authentication and authorization, responsive web design, debugging, and performance optimization.",
  },
  {
    title: "Soft Skills",
    content:
      "Problem solving, clear communication, team collaboration, debugging, adaptability, and time management.",
  },
  {
    title: "Portfolio",
    content:
      "This portfolio recreates a desktop operating-system experience in the browser. It includes an interactive File Explorer, application launcher, terminal, browser, music player, code editor, resume viewer, login screen, and desktop dock.",
  },
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
    {
      name: "README.md",
      icon: codeIcon,
      section: "README",
    },
  ],
  Downloads: [
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
    category: skill.category,
    description: `${skill.name} — ${skill.category}`,
  })),
  README: [],
};

const parentFolders = {
  Projects: "Documents",
  Certificates: "Documents",
  Skills: "Documents",
  README: "Documents",
  "Project Assets": "Downloads",
  Screenshots: "Pictures",
  Recordings: "Videos",
};

function FileExp({
  onClose,
  onOpenAbout,
  onOpenChrome,
  onOpenYouTube,
  onOpenTerminal,
  mobile = false,
}) {
  const [maximized, setMaximized] = useState(false);
  const [activeFolder, setActiveFolder] = useState(null);
  const [selectedPreview, setSelectedPreview] = useState(null);

  const appActions = {
    about: onOpenAbout,
    chrome: onOpenChrome,
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

  if (mobile) {
    return (
      <MobileFileExplorer
        onClose={onClose}
        onOpenAbout={onOpenAbout}
        onOpenChrome={onOpenChrome}
        onOpenYouTube={onOpenYouTube}
        onOpenTerminal={onOpenTerminal}
      />
    );
  }

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ x: 120, y: 50, opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`fixed pointer-events-auto flex flex-col overflow-hidden border border-white/20 bg-black/20 text-white shadow-2xl backdrop-blur-3xl ${
        mobile
          ? "inset-0 z-50 h-[100svh] w-full rounded-none mobile-file-explorer"
          : maximized
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
              <div className="min-w-0 flex-1">
                {activeFolder === "README" ? (
                  <article className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-black/20 shadow-xl">
                    <header className="border-b border-white/10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-7">
                      <p className="text-sm font-medium text-blue-300">
                        README.md
                      </p>
                      <h3 className="mt-2 text-3xl font-bold">
                        Anshumaan Khare
                      </h3>
                      <p className="mt-2 text-lg text-gray-300">
                        Software Developer
                      </p>
                    </header>

                    <div className="space-y-7 p-7">
                      {readmeSections.map((section) => (
                        <section key={section.title}>
                          <h4 className="mb-3 text-xl font-semibold text-blue-300">
                            {section.title}
                          </h4>
                          <p className="whitespace-pre-line leading-7 text-gray-300">
                            {section.content}
                          </p>
                        </section>
                      ))}
                    </div>
                  </article>
                ) : activeFolder === "Skills" ? (
                  <div className="space-y-8">
                    {skillGroups.map((group) => (
                      <section key={group.title}>
                        <h3 className="mb-3 border-b border-white/10 pb-2 text-sm font-semibold uppercase tracking-wider text-blue-300">
                          {group.title}
                        </h3>
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-4">
                          {group.items.map((item) => {
                            const SkillIcon = item.icon;

                            return (
                              <button
                                type="button"
                                key={item.name}
                                onClick={() =>
                                  openItem({
                                    ...item,
                                    skillIcon: item.icon,
                                    category: group.title,
                                    description: `${item.name} — ${group.title}`,
                                  })
                                }
                                className={`flex min-h-36 flex-col items-center justify-center gap-3 rounded-xl border p-4 text-center transition hover:border-white/10 hover:bg-white/10 focus:outline-none ${
                                  selectedPreview?.name === item.name
                                    ? "border-blue-400/40 bg-blue-500/20"
                                    : "border-transparent"
                                }`}
                              >
                                <SkillIcon
                                  className="h-16 w-16"
                                  style={{ color: item.color }}
                                  aria-hidden="true"
                                />
                                <span className="w-full break-words text-sm">
                                  {item.name}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </section>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] content-start gap-4">
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
                        <img
                          src={item.icon}
                          alt=""
                          className="h-16 w-16 object-contain"
                        />
                        <span className="w-full break-words text-sm">
                          {item.name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
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

function MobileFileExplorer({
  onClose,
  onOpenAbout,
  onOpenChrome,
  onOpenYouTube,
  onOpenTerminal,
}) {
  const [activeFolder, setActiveFolder] = useState(null);
  const [activeTab, setActiveTab] = useState("Browse");
  const [query, setQuery] = useState("");
  const appActions = { about: onOpenAbout, chrome: onOpenChrome, youtube: onOpenYouTube, terminal: onOpenTerminal };
  const contents = activeFolder ? folderContents[activeFolder] || [] : folders;
  const filteredContents = contents.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));

  const openItem = (item) => {
    if (Object.prototype.hasOwnProperty.call(folderContents, item.name)) {
      setActiveFolder(item.name);
      return;
    }
    if (item.app && appActions[item.app]) {
      appActions[item.app]();
      return;
    }
    if (item.url) {
      window.open(item.url, "_blank", "noopener,noreferrer");
      return;
    }
    if (Object.prototype.hasOwnProperty.call(item, "section")) setActiveFolder(item.section);
  };

  return (
    <section className="google-files" aria-label="Files">
      <header className="google-files-header">
        <button onClick={activeFolder ? () => setActiveFolder(parentFolders[activeFolder] || null) : onClose} aria-label={activeFolder ? "Back" : "Close Files"}>
          <IoArrowBack />
        </button>
        <h2>{activeFolder || "Files"}</h2>
        <button aria-label="More options"><IoEllipsisVertical /></button>
      </header>

      <label className="google-files-search"><IoSearch /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search in Files" /></label>

      {activeTab === "Browse" ? <>
        {!activeFolder ? <>
          <p className="google-files-label">Categories</p>
          <div className="google-files-categories"><button><IoDocumentOutline /> Documents</button><button><IoGridOutline /> Images</button><button><IoFolderOpenOutline /> Downloads</button></div>
          <p className="google-files-label">Recent</p>
        </> : <p className="google-files-label">{activeFolder === "Skills" ? "Development skills" : "Files"}</p>}
        <div className="google-files-list">
          {filteredContents.map((item) => {
            const Icon = item.skillIcon;
            return <button key={item.name} onClick={() => openItem(item)} className="google-file-row">
              <span className="google-file-icon">{item.icon ? <img src={item.icon} alt="" /> : Icon ? <Icon style={{ color: item.color }} /> : <IoDocumentOutline />}</span>
              <span><strong>{item.name}</strong><small>{item.category || item.location || item.description || (item.section ? "Folder" : "Portfolio file")}</small></span>
              <IoEllipsisVertical />
            </button>;
          })}
          {filteredContents.length === 0 && <p className="google-files-empty">No files found</p>}
        </div>
      </> : <div className="google-files-empty">{activeTab === "Clean" ? "No files need cleaning" : "Shared files will appear here"}</div>}

      <nav className="google-files-nav" aria-label="Files navigation">
        <button className={activeTab === "Clean" ? "active" : ""} onClick={() => setActiveTab("Clean")}><IoTrashOutline /><span>Clean</span></button>
        <button className={activeTab === "Browse" ? "active" : ""} onClick={() => setActiveTab("Browse")}><IoFolderOpenOutline /><span>Browse</span></button>
        <button className={activeTab === "Share" ? "active" : ""} onClick={() => setActiveTab("Share")}><IoShareSocialOutline /><span>Share</span></button>
      </nav>
    </section>
  );
}
