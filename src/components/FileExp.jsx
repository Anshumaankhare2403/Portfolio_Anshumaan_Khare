import { motion } from "framer-motion";
import { IoClose, IoRemove, IoSquareOutline } from "react-icons/io5";
import {
  FaDesktop,
  FaFileAlt,
  FaDownload,
  FaImage,
  FaMusic,
} from "react-icons/fa";

import desktopIcon from "../assets/color-lightblue/user-home.svg";
import documentsIcon from "../assets/color-lightblue/folder-documents.svg";
import downloadsIcon from "../assets/color-lightblue/folder-download.svg";
import picturesIcon from "../assets/color-lightblue/folder-images.svg";
import musicIcon from "../assets/color-lightblue/folder-music.svg";

function FileExp({ onClose }) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      
      initial={{
        x: 180,
        y: 80,
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
      }}
      transition={{
        duration: 0.2,
      }}
      className="pointer-events-auto absolute left-0 top-0
           flex h-[500px] w-[800px] flex-col
           overflow-hidden rounded-lg border border-white/20
           bg-gray-900/40 backdrop-blur-xl shadow-2xl"
    >
      <div className="flex h-10 cursor-grab select-none items-center bg-gray-800 px-3 active:cursor-grabbing">
        <span className="flex-1 text-sm text-white">File Explorer</span>

        <button
          className="p-2 hover:bg-white/10 text-sm"
          onPointerDown={(event) => event.stopPropagation()}
        >
          <IoRemove />
        </button>

        <button
          className="p-2 text-xs hover:bg-white/10"
          onPointerDown={(event) => event.stopPropagation()}
        >
          <IoSquareOutline />
        </button>

        <button
          onClick={onClose}
          onPointerDown={(event) => event.stopPropagation()}
          className="p-2 hover:bg-red-600 "
        >
          <IoClose />
        </button>
      </div>

      <div className="flex flex-row h-full bg-white/10 backdrop-blur-xl text-white">
        {/* <aside className="w-48 border-r bg-gray-100 p-4">
          <p>Desktop</p>
          <p>Documents</p>
          <p>Downloads</p>
          <p>Picture</p>
          <p>Musice</p>
        </aside> */}

        <div className="flex flex-col w-50 h-full p-6 gap-5 border-r border-white/20 bg-black/10">
          <div className="flex cursor-pointer items-center gap-3 hover:text-blue-300">
            <FaDesktop className="text-xl text-blue-400" />
            <p className="text-sm">Desktop</p>
          </div>

          <div className="flex cursor-pointer items-center gap-3 hover:text-yellow-300">
            <FaFileAlt className="text-xl text-yellow-400" />
            <p className="text-sm">Documents</p>
          </div>

          <div className="flex cursor-pointer items-center gap-3 hover:text-green-300">
            <FaDownload className="text-xl text-green-400" />
            <p className="text-sm">Downloads</p>
          </div>

          <div className="flex cursor-pointer items-center gap-3 hover:text-purple-300">
            <FaImage className="text-xl text-purple-400" />
            <p className="text-sm">Pictures</p>
          </div>

          <div className="flex cursor-pointer items-center gap-3 hover:text-pink-300">
            <FaMusic className="text-xl text-pink-400" />
            <p className="text-sm">Music</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 p-5">
          {[
            { name: "Desktop", icon: desktopIcon },
            { name: "Documents", icon: documentsIcon },
            { name: "Downloads", icon: downloadsIcon },
            { name: "Pictures", icon: picturesIcon },
            { name: "Music", icon: musicIcon },
          ].map((item) => (
            <div
              key={item.name}
              className="flex h-20 w-full cursor-pointer items-center gap-3
                 rounded-lg border border-transparent p-3
                 transition-all duration-200
                 hover:border-white/20 hover:bg-white/15"
            >
              <img
                src={item.icon}
                alt=""
                className="h-12 w-12 shrink-0 object-contain"
              />

              <p className="truncate text-sm text-white">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default FileExp;
