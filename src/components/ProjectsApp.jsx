import { useState } from "react";
import { motion } from "framer-motion";
import {
  IoChevronBack,
  IoClose,
  IoRemove,
  IoSquareOutline,
  IoSearchOutline,
  IoOpenOutline,
  IoLogoGithub,
  IoLayersOutline,
  IoPhonePortraitOutline,
  IoDesktopOutline,
  IoCubeOutline,
  IoFlameOutline,
} from "react-icons/io5";

const projectsList = [
  {
    id: "carbonsense",
    title: "CarbonSense: Carbon Footprint Calculator",
    category: "Flutter & Mobile",
    type: "Mobile Application",
    typeIcon: IoPhonePortraitOutline,
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    description:
      "Developed a Flutter mobile application helping users monitor daily carbon emissions and understand environmental impact. Features real-time air quality API integration, behavioral sustainability analysis, and gamified eco challenges.",
    highlights: [
      "Integrated real-time air quality data via RESTful API for location-aware insights.",
      "Implemented behavioral analysis providing personalized eco-friendly tips.",
      "Engaged users through gamified challenges, quizzes, and a rewards system.",
    ],
    techStack: ["Flutter", "Dart", "Firebase", "RESTful API"],
    github: "https://github.com/Anshumaankhare2403",
    featured: true,
  },
  {
    id: "dmart-scanner",
    title: "Product Scanner for D-Mart",
    category: "Flutter & Mobile",
    type: "Mobile Application",
    typeIcon: IoPhonePortraitOutline,
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    description:
      "Barcode scanner mobile application built using Flutter to scan retail product barcodes and fetch real-time product info from a Firebase database for faster customer checkouts.",
    highlights: [
      "Real-time barcode detection using the Barcode_Scanner library.",
      "Instant product data fetching from Firebase database upon successful scan.",
      "Designed a clean, retail-optimized UI for smooth scanning.",
    ],
    techStack: ["Flutter", "Dart", "Firebase", "Barcode Scanner Library"],
    github: "https://github.com/Anshumaankhare2403",
    featured: true,
  },
  {
    id: "portfolio-os",
    title: "Portfolio OS — Interactive Desktop & Phone View",
    category: "React & Web",
    type: "Web Application",
    typeIcon: IoDesktopOutline,
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    description:
      "A complete operating-system-inspired interactive portfolio web app featuring live WebRTC camera app, terminal emulator, Google Files explorer, YouTube music player, VS Code editor, and responsive mobile interface.",
    highlights: [
      "WebRTC camera integration supporting live stream, camera flip & video recording.",
      "Interactive Google Files style category grid & custom terminal emulator.",
      "Seamless responsive switching between Windows Desktop and iOS/Android Phone View.",
    ],
    techStack: ["React.js", "Vite", "Tailwind CSS", "Framer Motion", "JavaScript"],
    github: "https://github.com/Anshumaankhare2403/Portfolio_Anshumaan_Khare",
    liveDemo: "https://portfolio-anshumaan-khare.vercel.app",
    featured: true,
  },
  {
    id: "dsa-js",
    title: "DSA Problem Solving Suite in JavaScript",
    category: "Algorithms & Logic",
    type: "Algorithms Library",
    typeIcon: IoCubeOutline,
    badgeColor: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
    description:
      "Comprehensive repository of Data Structures & Algorithms implementations, problem solving strategies, and interview coding solutions written in clean JavaScript.",
    highlights: [
      "Covers arrays, linked lists, trees, graphs, sorting, searching & dynamic programming.",
      "Clean time and space complexity annotations for competitive coding.",
    ],
    techStack: ["JavaScript", "Data Structures", "Algorithms", "Problem Solving"],
    github: "https://github.com/Anshumaankhare2403/DSA_prape_in_JS",
    featured: false,
  },
  {
    id: "react-three-3d",
    title: "React & Three.js 3D Web Experience",
    category: "React & Web",
    type: "3D Web App",
    typeIcon: IoCubeOutline,
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    description:
      "Interactive 3D web experience built with React, Three.js, and WebGL featuring custom particle systems, 3D model loaders, and camera movement controls.",
    highlights: [
      "3D canvas rendering and mesh animation using Three.js.",
      "Interactive camera controls and ambient lighting shaders.",
    ],
    techStack: ["React.js", "Three.js", "WebGL", "JavaScript"],
    github: "https://github.com/Anshumaankhare2403/react_prap_with_three_s",
    featured: false,
  },
  {
    id: "dynamic-form",
    title: "Dynamic Form Engine (Flutter)",
    category: "Flutter & Mobile",
    type: "Flutter Package",
    typeIcon: IoPhonePortraitOutline,
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    description:
      "Dynamic form rendering engine built with Flutter & Dart allowing dynamic form generation, field validation, and state handling driven by JSON schemas.",
    highlights: [
      "JSON schema-driven UI component generation.",
      "Custom form field validation rules and reactive state management.",
    ],
    techStack: ["Flutter", "Dart", "JSON Schema"],
    github: "https://github.com/Anshumaankhare2403/Dynamic_Form",
    featured: false,
  },
  {
    id: "nimbus-weather",
    title: "NimbusApp: Weather & Status Tracker",
    category: "React & Web",
    type: "Web Application",
    typeIcon: IoDesktopOutline,
    badgeColor: "bg-sky-500/20 text-sky-300 border-sky-500/40",
    description:
      "Real-time weather tracking application providing location-aware weather forecasts, temperature metrics, humidity, and environmental status updates.",
    highlights: [
      "Integrates location weather API for real-time forecast updates.",
      "Clean visual indicators for humidity, wind speed, and daily outlook.",
    ],
    techStack: ["JavaScript", "REST API", "Tailwind CSS"],
    github: "https://github.com/Anshumaankhare2403/NimbusApp",
    featured: false,
  },
  {
    id: "freelance-client-app",
    title: "Client Web Application (Freelance Project)",
    category: "React & Web",
    type: "Client Web Application",
    typeIcon: IoDesktopOutline,
    badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    description:
      "Client-facing web application with responsive UI, dynamic menu display, order tracking, and automated Formspree & Google Sheets integration, achieving a 20% load time reduction.",
    highlights: [
      "Optimized website performance achieving a 20% reduction in page load time.",
      "Implemented order tracking and Google Sheets automated updates.",
    ],
    techStack: ["React.js", "Formspree", "Bootstrap", "Google Sheets", "Netlify"],
    featured: true,
  },
];

export default function ProjectsApp({ onClose, onMinimize, mobile = false }) {
  const [maximized, setMaximized] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Flutter & Mobile", "React & Web", "Algorithms & Logic"];

  const filteredProjects = projectsList.filter((proj) => {
    const matchesCategory = selectedCategory === "All" || proj.category === selectedCategory;
    const matchesQuery =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <motion.div
      drag={mobile || maximized ? false : true}
      dragMomentum={false}
      initial={mobile ? { opacity: 0, scale: 0.95 } : { x: 0, y: 0, opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`fixed pointer-events-auto flex flex-col overflow-hidden border border-white/20 bg-slate-950/90 text-white shadow-2xl backdrop-blur-3xl ${
        mobile
          ? "inset-0 z-50 h-[100svh] w-full rounded-none mobile-glass-app"
          : maximized
          ? "inset-0 z-50 h-full w-full rounded-none"
          : "absolute left-10 top-10 h-[85vh] w-[75vw] rounded-2xl"
      }`}
    >
      {/* Top Header Bar */}
      {mobile ? (
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 bg-black/40 px-4 text-white">
          <button
            onClick={onClose}
            className="flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold hover:bg-white/20 active:scale-95 transition"
            aria-label="Back"
          >
            <IoChevronBack size={16} />
            <span>Back</span>
          </button>
          <span className="text-sm font-bold tracking-wide text-gray-200">Projects Showcase</span>
          <div className="w-10" />
        </div>
      ) : (
        <div className="flex h-11 shrink-0 items-center border-b border-white/10 bg-black/30 px-4 text-white">
          <IoLayersOutline size={18} className="text-emerald-400 mr-2" />
          <span className="text-sm font-semibold tracking-wide">Projects Showcase — Anshumaan Khare</span>

          <div className="flex-1" />

          <button
            onClick={onMinimize || onClose}
            className="p-2 hover:bg-white/10 text-xs rounded"
            aria-label="Minimize"
          >
            <IoRemove />
          </button>
          <button
            onClick={() => setMaximized((prev) => !prev)}
            className="p-2 hover:bg-white/10 text-xs rounded"
            aria-label={maximized ? "Restore" : "Maximize"}
          >
            <IoSquareOutline />
          </button>
          <button onClick={onClose} className="p-2 hover:bg-red-600 rounded" aria-label="Close">
            <IoClose />
          </button>
        </div>
      )}

      {/* Filter & Search Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 bg-black/20 p-4">
        {/* Category Chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? "bg-emerald-500 text-slate-950 shadow-lg"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-black/40 px-3 py-1.5 text-xs text-gray-300 focus-within:border-emerald-400 w-full sm:w-64">
          <IoSearchOutline size={16} />
          <input
            type="text"
            placeholder="Search projects or tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-white outline-none placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Projects Grid Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => {
            const TypeIcon = project.typeIcon;

            return (
              <div
                key={project.id}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:border-white/25 transition-all shadow-xl group"
              >
                <div>
                  {/* Card Header: Type Badge & Featured Ribbon */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${project.badgeColor}`}
                    >
                      <TypeIcon size={14} />
                      <span>{project.type}</span>
                    </span>

                    {project.featured && (
                      <span className="flex items-center gap-1 rounded-full bg-amber-500/20 border border-amber-500/40 px-2.5 py-0.5 text-[11px] font-bold text-amber-300">
                        <IoFlameOutline size={13} />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-extrabold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights Bullet List */}
                  {project.highlights && (
                    <ul className="mt-3 space-y-1.5 text-xs text-gray-400 list-disc list-inside">
                      {project.highlights.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-3">
                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-white/10 border border-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="flex items-center gap-3 pt-1">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 rounded-xl bg-gray-800 border border-gray-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-gray-700 active:scale-95 transition"
                      >
                        <IoLogoGithub size={15} />
                        <span>GitHub Repo</span>
                      </a>
                    )}

                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg hover:bg-emerald-500 active:scale-95 transition"
                      >
                        <IoOpenOutline size={15} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {filteredProjects.length === 0 && (
            <div className="col-span-full py-16 text-center text-gray-400">
              <IoSearchOutline size={36} className="mx-auto mb-3 text-gray-500" />
              <p className="text-sm font-semibold">No matching projects found.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
