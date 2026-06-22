import { motion } from "framer-motion";
import { IoClose, IoRemove, IoSquareOutline } from "react-icons/io5";



function Terminal({onClose}) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ x: 120, y: 50, opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed left-10 top-10 z-30
           h-[60vh] w-[50vw]
           overflow-hidden
           rounded-2xl
           bg-black/20
           backdrop-blur-2xl
           border border-white/20
           shadow-[0_8px_32px_rgba(0,0,0,0.37)]"
    >
      {/* Top Bar */}
      <div className="flex h-10 items-center border-b border-white/10 bg-black/20 px-3 text-white">
        <span className="flex-1 text-sm">Terminal</span>
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

      <div className="ps-4 pt-2">
        <p>
            user@DESKTOP-XXXXX  {":~$"}{" "}
            <span>
              <input className="border-none bg-transparent outline-none focus:outline-none" />
            </span>
        </p>
      </div>
      
    </motion.div>
  )
}

export default Terminal
