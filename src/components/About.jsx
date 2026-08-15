import { useState } from "react";
import { motion } from "framer-motion";
import {
  IoChevronBack,
  IoClose,
  IoDownloadOutline,
  IoRemove,
  IoSquareOutline,
  IoTrophy,
  IoRibbonOutline,
  IoBriefcaseOutline,
  IoSchoolOutline,
  IoCodeSlashOutline,
  IoMailOutline,
  IoCallOutline,
  IoLogoGithub,
  IoLogoLinkedin,
  IoLocationOutline,
  IoCheckmarkCircle,
  IoOpenOutline,
  IoLayersOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";
import { FaCss3Alt } from "react-icons/fa";
import {
  SiJavascript,
  SiDart,
  SiNodedotjs,
  SiExpress,
  SiReact,
  SiFlutter,
  SiHtml5,
  SiBootstrap,
  SiMysql,
  SiMongodb,
  SiGit,
  SiGithub,
  SiPostman,
  SiLinux,
  SiFirebase,
} from "react-icons/si";

import localResume from "../assets/resume/Anshumaankhare.pdf";
import heroImage from "../assets/hero.png";

export default function About({ onClose, onMinimize, mobile = false }) {
  const [maximized, setMaximized] = useState(true);
  const [activeTab, setActiveTab] = useState("profile"); // "profile" | "skills" | "experience" | "projects" | "resume"

  const skillsData = [
    {
      category: "Programming Languages",
      items: [
        { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
        { name: "Dart", icon: SiDart, color: "#0175C2" },
      ],
    },
    {
      category: "Development & Frameworks",
      items: [
        { name: "React.js", icon: SiReact, color: "#61DAFB" },
        { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
        { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
        { name: "Flutter", icon: SiFlutter, color: "#02569B" },
        { name: "REST APIs", icon: IoLayersOutline, color: "#38BDF8" },
        { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
        { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
        { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
      ],
    },
    {
      category: "Databases",
      items: [
        { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
        { name: "MySQL", icon: SiMysql, color: "#4479A1" },
        { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
      ],
    },
    {
      category: "Tools & Platforms",
      items: [
        { name: "Git", icon: SiGit, color: "#F05032" },
        { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
        { name: "Postman", icon: SiPostman, color: "#FF6C37" },
        { name: "Linux", icon: SiLinux, color: "#FCC624" },
        { name: "WSL2", icon: IoCodeSlashOutline, color: "#4ADE80" },
      ],
    },
  ];

  return (
    <motion.div
      drag={mobile || maximized ? false : true}
      dragMomentum={false}
      initial={mobile ? { opacity: 0, scale: 0.95 } : { x: 0, y: 0, opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`fixed z-30 flex flex-col overflow-hidden border border-white/20 bg-slate-950/90 text-white shadow-2xl backdrop-blur-3xl ${
        mobile
          ? "inset-0 h-[100svh] w-full rounded-none mobile-glass-app"
          : maximized
          ? "inset-0 h-full w-full rounded-none z-50"
          : "left-10 top-10 h-[85vh] w-[75vw] rounded-2xl"
      }`}
    >
      {/* Header Bar */}
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
          <span className="text-sm font-bold tracking-wide text-gray-200">About Anshumaan Khare</span>
          <a
            href={localResume}
            download="Anshumaan_Khare_Resume.pdf"
            className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-emerald-500 active:scale-95 transition"
            aria-label="Download Resume PDF"
          >
            <IoDownloadOutline size={16} />
            <span>PDF</span>
          </a>
        </div>
      ) : (
        <div className="flex h-11 shrink-0 items-center border-b border-white/10 bg-black/30 px-4 text-white">
          <span className="text-sm font-semibold tracking-wide">About Anshumaan Khare — Developer Profile</span>

          <a
            href={localResume}
            download="Anshumaan_Khare_Resume.pdf"
            className="ml-5 flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1 text-xs font-bold text-white shadow transition-colors hover:bg-emerald-500"
          >
            <IoDownloadOutline size={15} />
            <span>Download Resume PDF</span>
          </a>

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

      {/* Navigation Sub-Header Tabs */}
      <div className="flex gap-2 sm:gap-6 overflow-x-auto border-b border-white/10 bg-black/20 px-4 pt-3 text-xs sm:text-sm font-semibold text-gray-300 scrollbar-none">
        {[
          { id: "profile", label: "About & Bio", icon: IoSchoolOutline },
          { id: "skills", label: "Skills", icon: IoCodeSlashOutline },
          { id: "experience", label: "Experience", icon: IoBriefcaseOutline },
          { id: "projects", label: "Projects", icon: IoLayersOutline },
          { id: "resume", label: "Resume PDF", icon: IoDocumentTextOutline },
        ].map((tab) => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-3 border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "border-emerald-400 text-emerald-400 font-bold"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              <TabIcon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8">
        {activeTab === "profile" && (
          <div className="mx-auto max-w-4xl space-y-8">
            {/* Top Profile Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-xl">
              <img
                src={heroImage}
                alt="Anshumaan Khare"
                className="h-28 w-28 sm:h-36 sm:w-36 rounded-2xl object-cover border-2 border-emerald-400/40 shadow-2xl"
              />
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Anshumaan Khare
                  </h1>
                  <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-0.5 text-xs font-bold text-emerald-400">
                    Available for Opportunities
                  </span>
                </div>
                <p className="mt-1 text-sm font-semibold text-emerald-300">
                  Software Developer | MERN & Flutter Specialist
                </p>

                <p className="mt-3 text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Passionate developer dedicated to building polished web & mobile applications with clean interfaces, high performance, and robust APIs. Experienced with React, Node.js, Express, MongoDB, and Flutter.
                </p>

                {/* Quick Action Badges */}
                <div className="mt-5 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs font-semibold">
                  <a
                    href="mailto:anshumaankhare2403@gmail.com"
                    className="flex items-center gap-1.5 rounded-xl bg-blue-600/30 border border-blue-500/40 px-3 py-1.5 text-blue-200 hover:bg-blue-600/50 transition"
                  >
                    <IoMailOutline size={15} />
                    <span>anshumaankhare2403@gmail.com</span>
                  </a>
                  <a
                    href="https://github.com/Anshumaankhare2403"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-xl bg-gray-800 border border-gray-600 px-3 py-1.5 text-white hover:bg-gray-700 transition"
                  >
                    <IoLogoGithub size={15} />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Awards & Achievements Banner */}
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-amber-500/5 p-6 backdrop-blur-xl shadow-lg relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-400/40 shadow-lg">
                  <IoTrophy size={26} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
                      Hackathon Award Winner
                    </span>
                  </div>
                  <h3 className="mt-1 text-lg font-bold text-white">
                    Hack The Space – Postman Track Winner
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-gray-300 leading-relaxed">
                    Won the prestigious Postman track at the Hack The Space hackathon, demonstrating exceptional expertise in RESTful API design, integration, and backend architecture.
                  </p>
                </div>
              </div>
            </div>

            {/* Certifications Grid */}
            <div>
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <IoRibbonOutline className="text-emerald-400" size={22} />
                <span>Certifications</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                  <IoCheckmarkCircle className="text-emerald-400 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-bold text-sm text-white">Postman API Fundamentals Student Expert</h4>
                    <p className="text-xs text-gray-400 mt-1">Verified expertise in API testing, requests, documentation & workflows.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                  <IoCheckmarkCircle className="text-emerald-400 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-bold text-sm text-white">The Linux Command Line Bootcamp</h4>
                    <p className="text-xs text-gray-400 mt-1">Beginner to Power User — shell scripting, process management & system administration.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Education Timeline */}
            <div>
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <IoSchoolOutline className="text-emerald-400" size={22} />
                <span>Education</span>
              </h2>
              <div className="space-y-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-bold text-base text-white">Master of Computer Applications (MCA)</h3>
                    <span className="text-xs font-semibold text-emerald-400">2025 – 2027</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-300 mt-1">
                    JAIN (Deemed-to-be University), Bengaluru, Karnataka
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-bold text-base text-white">B.Voc in Software Development</h3>
                    <span className="text-xs font-semibold text-emerald-400">2021 – 2024</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-300 mt-1">
                    Bhilai Institute of Technology, Durg, Chhattisgarh, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "skills" && (
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-extrabold text-white">Technical Skills & Expertise</h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Comprehensive development stack across frontend, backend, databases, mobile, and DevOps platforms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillsData.map((group) => (
                <div
                  key={group.category}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl shadow-lg"
                >
                  <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-4 border-b border-white/10 pb-2">
                    {group.category}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {group.items.map((skill) => {
                      const IconComp = skill.icon;
                      return (
                        <div
                          key={skill.name}
                          className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-black/30 p-2.5 transition hover:border-white/20 hover:bg-white/10"
                        >
                          <IconComp size={22} style={{ color: skill.color }} />
                          <span className="text-xs font-semibold text-gray-200 truncate">
                            {skill.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "experience" && (
          <div className="mx-auto max-w-4xl space-y-6">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              <IoBriefcaseOutline className="text-emerald-400" size={24} />
              <span>Professional Work Experience</span>
            </h2>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 mb-4 gap-2">
                <div>
                  <h3 className="text-lg font-bold text-white">Freelance Frontend Developer</h3>
                  <p className="text-xs font-semibold text-emerald-400">Remote • Client Projects</p>
                </div>
                <span className="rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs font-semibold text-gray-300 self-start sm:self-auto">
                  6 months duration
                </span>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-gray-300 leading-relaxed list-disc list-inside">
                <li>Designed and developed a responsive UI using React.js, Bootstrap, and CSS for a client-facing web application.</li>
                <li>Deployed the application on Netlify, ensuring smooth performance and fast global content delivery.</li>
                <li>Implemented dynamic menu display, order tracking, and real-time updates using Formspree and Google Sheets integration.</li>
                <li>
                  <strong className="text-emerald-300">Optimized website performance and responsiveness</strong>, achieving a <span className="text-emerald-400 font-bold">20% reduction in page load time</span>.
                </li>
              </ul>

              <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
                <span className="text-xs font-bold text-gray-400 mr-2">Tech Stack:</span>
                {["React.js", "Formspree", "Bootstrap", "Google Sheets", "Netlify"].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 text-[11px] font-semibold text-emerald-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="mx-auto max-w-4xl space-y-6">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              <IoLayersOutline className="text-emerald-400" size={24} />
              <span>Featured Projects</span>
            </h2>

            <div className="grid grid-cols-1 gap-6">
              {/* Project 1: CarbonSense */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">CarbonSense: Carbon Footprint Calculator</h3>
                    <p className="text-xs text-emerald-400 font-semibold">Flutter Mobile Application</p>
                  </div>
                  <a
                    href="https://github.com/Anshumaankhare2403"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-xs font-bold text-blue-400 hover:underline"
                  >
                    <span>GitHub Repo</span>
                    <IoOpenOutline size={14} />
                  </a>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-gray-300 leading-relaxed list-disc list-inside mb-4">
                  <li>Developed a Flutter mobile app helping users monitor daily carbon emissions and understand environmental impact.</li>
                  <li>Integrated real-time air quality data via RESTful API for location-aware environmental insights.</li>
                  <li>Implemented behavioral analysis providing personalized eco-friendly suggestions and daily sustainability tips.</li>
                  <li>Engaged users through gamified challenges, quizzes, and a rewards system to encourage consistent usage.</li>
                </ul>

                <div className="flex flex-wrap items-center gap-2 border-t border-white/10 pt-3">
                  {["Flutter", "Firebase", "RESTful API"].map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg bg-blue-500/15 border border-blue-500/30 px-2.5 py-1 text-[11px] font-semibold text-blue-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project 2: D-Mart Barcode Scanner */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">Product Scanner for D-Mart</h3>
                    <p className="text-xs text-emerald-400 font-semibold">Barcode Detection App</p>
                  </div>
                  <a
                    href="https://github.com/Anshumaankhare2403"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-xs font-bold text-blue-400 hover:underline"
                  >
                    <span>GitHub Repo</span>
                    <IoOpenOutline size={14} />
                  </a>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-gray-300 leading-relaxed list-disc list-inside mb-4">
                  <li>Developed a barcode scanner application using Flutter to scan product barcodes and retrieve product information in real time.</li>
                  <li>Implemented camera access and real-time barcode detection using the Barcode_Scanner library for quick scanning.</li>
                  <li>Fetched product details from a Firebase-backed database upon successful scan, improving checkout efficiency.</li>
                  <li>Designed a clean, user-friendly UI to enhance the scanning experience for retail customers.</li>
                </ul>

                <div className="flex flex-wrap items-center gap-2 border-t border-white/10 pt-3">
                  {["Flutter", "Firebase", "Barcode Scanner Library"].map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg bg-purple-500/15 border border-purple-500/30 px-2.5 py-1 text-[11px] font-semibold text-purple-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "resume" && (
          <div className="h-full w-full flex flex-col items-center min-h-[500px]">
            <div className="mb-4 flex items-center justify-between w-full">
              <span className="text-sm font-bold text-white">Official Resume PDF</span>
              <a
                href={localResume}
                download="Anshumaan_Khare_Resume.pdf"
                className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-emerald-500"
              >
                <IoDownloadOutline size={16} />
                <span>Download PDF File</span>
              </a>
            </div>
            <iframe
              src={localResume}
              title="Anshumaan Khare Resume PDF"
              className="w-full h-[650px] rounded-xl border border-white/10 bg-white"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
