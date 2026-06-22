import { motion } from "framer-motion";
import { IoClose, IoRemove, IoSquareOutline } from "react-icons/io5";

import AkResume from "../assets/resume/anshumaanKhare.pdf"

function About({onClose}) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ x: 120, y: 50, opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed left-10 top-10 z-30
           h-[85vh] w-[75vw]
           overflow-hidden
           rounded-2xl
           bg-black/20
           backdrop-blur-2xl
           border border-white/20
           shadow-[0_8px_32px_rgba(0,0,0,0.37)]"
    >
      {/* Top Bar */}
      <div className="flex h-10 items-center border-b border-white/10 bg-black/20 px-3 text-white">
        <span className="flex-1 text-sm">About Me</span>
        <button className="p-2  hover:bg-white/10 text-sm">
          <IoRemove />
        </button>
        <button className="p-2  hover:bg-white/10 text-xs">
          <IoSquareOutline />
        </button>
        <button onClick={onClose} className="p-2 hover:bg-red-600">
          <IoClose />
        </button>
      </div>

      <div className="h-[calc(100%-40px)]">
  <iframe
    src={AkResume}
    title="Resume"
    className="w-full h-full "
  />
</div>
      
    </motion.div>
  )
}

export default About
