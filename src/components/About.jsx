import { useState } from "react";
import { motion } from "framer-motion";
import { IoChevronBack, IoClose, IoDownloadOutline, IoRemove, IoSquareOutline } from "react-icons/io5";
import localResume from "../assets/resume/Anshumaankhare.pdf";

function About({ onClose, onMinimize, mobile = false }) {
  const [maximized, setMaximized] = useState(true);

  return (
    <motion.div
      drag={mobile || maximized ? false : true}
      dragMomentum={false}
      initial={mobile ? { opacity: 0, scale: 0.95 } : { x: 0, y: 0, opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`fixed z-30 overflow-hidden border border-white/20 bg-black/20 text-white shadow-2xl backdrop-blur-3xl ${
        mobile
          ? "inset-0 h-[100svh] w-full rounded-none mobile-glass-app"
          : maximized
          ? "inset-0 h-full w-full rounded-none z-50"
          : "left-10 top-10 h-[85vh] w-[75vw] rounded-2xl"
      }`}
    >
      {/* Adaptive Header Bar */}
      {mobile ? (
        <div className="flex h-14 items-center justify-between border-b border-white/10 bg-black/30 px-4 text-white">
          <button
            onClick={onClose}
            className="flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold hover:bg-white/20"
            aria-label="Back"
          >
            <IoChevronBack size={16} />
            <span>Back</span>
          </button>
          <span className="text-sm font-bold text-gray-200">About Me & Resume</span>
          <a
            href={localResume}
            download="Anshumaan_Khare_Resume.pdf"
            className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-emerald-500"
            aria-label="Download Resume PDF"
          >
            <IoDownloadOutline size={16} />
            <span>PDF</span>
          </a>
        </div>
      ) : (
        <div className="flex h-10 items-center border-b border-white/10 bg-black/20 px-3 text-white">
          <span className="text-sm font-medium">About Me & Resume</span>

          <a
            href={localResume}
            download="Anshumaan_Khare_Resume.pdf"
            className="ml-4 flex items-center gap-1.5 rounded-md bg-emerald-600/90 px-3 py-1 text-xs font-semibold text-white shadow transition-colors hover:bg-emerald-500"
          >
            <IoDownloadOutline size={15} />
            <span>Download Resume PDF</span>
          </a>

          <div className="flex-1" />

          <button
            onClick={onMinimize || onClose}
            className="p-2 hover:bg-white/10 text-xs"
            aria-label="Minimize"
          >
            <IoRemove />
          </button>
          <button
            onClick={() => setMaximized((prev) => !prev)}
            className="p-2 hover:bg-white/10 text-xs"
            aria-label={maximized ? "Restore" : "Maximize"}
          >
            <IoSquareOutline />
          </button>
          <button onClick={onClose} className="p-2 hover:bg-red-600" aria-label="Close">
            <IoClose />
          </button>
        </div>
      )}

      <div className={`w-full ${mobile ? "h-[calc(100%-56px)]" : "h-[calc(100%-40px)]"}`}>
        <iframe
          src="https://drive.google.com/file/d/18JMIryHKjqNDkUVY7VHZ7KfBldjn9Mju/preview"
          title="Resume"
          className="w-full h-full border-0"
        />
      </div>
    </motion.div>
  );
}

export default About;
