import { motion, AnimatePresence } from "framer-motion";

function WorkspaceOSD({ show, activeWorkspace, workspaces }) {
  const currentWs = workspaces[activeWorkspace] || workspaces[0];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -15 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="fixed top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none select-none"
        >
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-white/20 bg-black/65 px-6 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl text-white">
            <div className="flex items-center gap-2">
              {workspaces.map((ws, i) => (
                <div
                  key={ws.id}
                  className={`flex items-center justify-center rounded-xl font-bold transition-all ${
                    i === activeWorkspace
                      ? "h-8 px-4 bg-sky-500 text-white shadow-[0_0_16px_rgba(14,165,233,0.8)] text-sm scale-105"
                      : "h-7 w-7 bg-white/10 text-white/50 text-xs"
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-1.5 text-xs font-semibold text-white/90">
              <span className="text-sky-400">●</span>
              <span>{currentWs.name}:</span>
              <span className="text-white/70 font-normal">{currentWs.label}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default WorkspaceOSD;
