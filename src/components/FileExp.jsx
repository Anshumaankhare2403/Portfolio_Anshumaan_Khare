import { useState } from "react";
import { motion } from "framer-motion";
import {
  IoClose,
  IoRemove,
  IoSquareOutline,
} from "react-icons/io5";

import {
  FaDesktop,
  FaFileAlt,
  FaDownload,
  FaImage,
  FaMusic,
} from "react-icons/fa";

import { GoPin } from "react-icons/go";

import desktopIcon from "../assets/color-lightblue/user-home.svg";
import documentsIcon from "../assets/color-lightblue/folder-documents.svg";
import downloadsIcon from "../assets/color-lightblue/folder-download.svg";
import picturesIcon from "../assets/color-lightblue/folder-images.svg";
import musicIcon from "../assets/color-lightblue/folder-music.svg";
import videosIcon from "../assets/color-lightblue/folder-videos.svg";

const folders = [
  {
    name: "Desktop",
    location: "Anshumaan - Personal",
    icon: desktopIcon,
  },
  {
    name: "Downloads",
    location: "Stored locally",
    icon: downloadsIcon,
  },
  {
    name: "Documents",
    location: "Anshumaan - Personal",
    icon: documentsIcon,
  },
  {
    name: "Pictures",
    location: "Anshumaan - Personal",
    icon: picturesIcon,
  },
  {
    name: "Music",
    location: "Stored locally",
    icon: musicIcon,
  },
  {
    name: "Videos",
    location: "Stored locally",
    icon: videosIcon,
  },
];

function FileExp({ onClose }) {
  // const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);

  // if (minimized) {
  //   return (
  //     <button
  //       onClick={() => setMinimized(false)}
  //       className="fixed bottom-24 left-5 z-50 rounded-xl
  //                  bg-black/50 px-4 py-2 text-white
  //                  backdrop-blur-xl border border-white/10"
  //     >
  //       📁 File Explorer
  //     </button>
  //   );
  // }

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ x: 120, y: 50, opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
      }}
      className={`
        fixed
        pointer-events-auto
        flex flex-col
        overflow-hidden
        border border-white/20
        bg-black/20
        backdrop-blur-3xl
        shadow-2xl
        text-white
        ${
          maximized
            ? "fixed inset-0 z-50 rounded-none"
            : "absolute left-10 top-10 w-[60vw] h-[70vh] rounded-2xl"
        }
      `}
    >
      {/* Header */}
      <div className="flex h-11 items-center border-b border-white/10 bg-black/20 px-3">
        <span className="flex-1 text-sm font-medium">
          File Explorer
        </span>

        <button
          // onClick={() => setMinimized(true)}
          className="p-2 hover:bg-white/10 rounded"
        >
          <IoRemove />
        </button>

        <button
          onClick={() => setMaximized(!maximized)}
          className="p-2 hover:bg-white/10 rounded"
        >
          <IoSquareOutline />
        </button>

        <button
          onClick={onClose}
          className="p-2 hover:bg-red-600 rounded"
        >
          <IoClose />
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-56 shrink-0 border-r border-white/10 bg-black/10">
          <div className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Quick Access
          </div>

          <div className="space-y-1 px-2">
            <div className="flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-white/10">
              <FaDesktop className="text-blue-400" />
              <span>Desktop</span>
            </div>

            <div className="flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-white/10">
              <FaFileAlt className="text-yellow-400" />
              <span>Documents</span>
            </div>

            <div className="flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-white/10">
              <FaDownload className="text-green-400" />
              <span>Downloads</span>
            </div>

            <div className="flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-white/10">
              <FaImage className="text-purple-400" />
              <span>Pictures</span>
            </div>

            <div className="flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-white/10">
              <FaMusic className="text-pink-400" />
              <span>Music</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">
              Quick Access
            </h2>

            <p className="text-sm text-gray-400">
              Frequently used folders
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
            {folders.map((folder) => (
              <div
                key={folder.name}
                className="
                  group
                  flex items-center gap-4
                  rounded-xl
                  border border-white/10
                  bg-white/5
                  p-4
                  transition-all duration-200
                  hover:bg-white/10
                  hover:border-white/20
                  hover:scale-[1.02]
                  cursor-pointer
                "
              >
                <img
                  src={folder.icon}
                  alt={folder.name}
                  className="h-16 w-16 object-contain"
                />

                <div className="flex flex-col">
                  <span className="font-medium">
                    {folder.name}
                  </span>

                  <span className="text-sm text-gray-400">
                    {folder.location}
                  </span>

                  <div className="mt-1 flex items-center gap-1 text-xs text-blue-400">
                    <GoPin />
                    Pinned
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </motion.div>
  );
}

export default FileExp;