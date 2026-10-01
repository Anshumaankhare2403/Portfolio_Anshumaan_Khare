import { motion, AnimatePresence } from "framer-motion";
import { IoWarningOutline, IoClose } from "react-icons/io5";

export default function ResetSettingsModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.18 }}
          className="relative w-full max-w-md rounded-2xl border border-white/15 bg-[#202020] p-6 shadow-[0_25px_70px_rgba(0,0,0,0.8)] text-white"
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <IoWarningOutline size={22} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">
                  Reset all settings?
                </h3>
                <p className="text-xs text-white/50">Personalization & Themes</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition cursor-pointer"
            >
              <IoClose size={18} />
            </button>
          </div>

          {/* Description */}
          <p className="mt-4 text-xs text-white/80 leading-relaxed">
            This will restore your desktop wallpaper, lock screen, theme, and personalization settings to default Windows settings.
          </p>

          {/* Actions */}
          <div className="mt-6 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/15 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-950/40 transition cursor-pointer"
            >
              Reset Settings
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
