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
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-cyan-400/35 bg-[radial-gradient(ellipse_at_top,_rgba(14,165,233,0.28),_rgba(3,15,28,0.9)_75%)] px-6 py-3 shadow-[0_15px_50px_rgba(0,0,0,0.75),0_0_30px_rgba(6,182,212,0.3)] backdrop-blur-2xl text-cyan-100">
            <div className="flex items-center gap-2">
              {workspaces.map((ws, i) => (
                <div
                  key={ws.id}
                  className={`flex items-center justify-center rounded-xl font-bold transition-all ${
                    i === activeWorkspace
                      ? "h-8 px-4 bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-950 font-black shadow-[0_0_18px_rgba(6,182,212,0.9)] border border-cyan-200 text-sm scale-105"
                      : "h-7 w-7 bg-cyan-950/40 text-cyan-300/50 border border-cyan-500/20 text-xs"
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-100">
              <span className="text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]">●</span>
              <span className="font-bold">{currentWs.name}:</span>
              <span className="text-cyan-300/80 font-normal">{currentWs.label}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default WorkspaceOSD;
