import { motion } from "framer-motion";
import { IoClose, IoRemove, IoSquareOutline } from "react-icons/io5";
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

        <div className="flex flex-col pt-2 self-center w-40 h-full  gap-2 border-r border-white/20 bg-black/10">
          <div className="flex cursor-pointer ps-6  items-center gap-3 hover:bg-white/10 h-10 w-full  rounded-md ">
            <FaDesktop className="text-xl text-blue-400" />
            <p className="text-xs">Desktop</p>
          </div>

          <div className="flex cursor-pointer ps-6 items-center gap-3 hover:bg-white/10 h-10 w-full  rounded-md">
            <FaFileAlt className="text-xl text-yellow-400" />
            <p className="text-xs">Documents</p>
          </div>

          <div className="flex cursor-pointer ps-6 items-center gap-3 hover:bg-white/10 h-10 w-full  rounded-md">
            <FaDownload className="text-xl text-green-400" />
            <p className="text-xs">Downloads</p>
          </div>

          <div className="flex cursor-pointer ps-6 items-center gap-3 hover:bg-white/10 h-10 w-full  rounded-md">
            <FaImage className="text-xl text-purple-400" />
            <p className="text-xs">Pictures</p>
          </div>

          <div className="flex cursor-pointer ps-6 items-center gap-3 hover:bg-white/10 h-10 w-full  rounded-md">
            <FaMusic className="text-xl text-pink-400" />
            <p className="text-xs">Music</p>
          </div>
        </div>

        <div className=" p-6 text-white">
      {/* <h2 className="mb-6 text-lg font-semibold">
        Quick access
      </h2> */}

      <div className="grid grid-cols-2 gap-x-16 gap-y-4">
        {folders.map((folder) => (
          <div
            key={folder.name}
            className="flex items-center gap-4 rounded-md p-2  hover:bg-white/10 cursor-pointer"
          >
            <img
              src={folder.icon}
              alt={folder.name}
              className="h-14 w-14"
            />

            <div className="flex flex-col">
              <span className="text-lg">
                {folder.name}
              </span>

              <span className="text-sm text-gray-400">
                {folder.location}
              </span>

              <span className="text-xs text-gray-500">
                <GoPin />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
      </div>
    </motion.div>
  );
}

export default FileExp;
