import { motion, AnimatePresence } from "framer-motion";

function WorkspaceOSD({
  show,
  activeWorkspace,
  workspaces,
  onSelectWorkspace,
  onMouseEnter,
  onMouseLeave,
}) {
  const currentWs = workspaces[activeWorkspace] || workspaces[0];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: -24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: -16 }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          className="fixed top-8 left-1/2 -translate-x-1/2 z-50 select-none pointer-events-auto"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.24),_rgba(15,23,42,0.78)_64%)] px-5 py-3.5 sm:px-6 sm:py-4 shadow-[0_25px_80px_rgba(15,23,42,0.65),inset_0_1px_1px_rgba(255,255,255,0.25)] backdrop-blur-2xl text-white">
            {/* Top-left subtle specular glass reflection */}
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_42%)] pointer-events-none" />

            {/* Desktop 1, 2, 3, 4 Glassy Pills */}
            <div className="relative flex items-center gap-2 sm:gap-2.5">
              {workspaces.map((ws, i) => {
                const isActive = i === activeWorkspace;
                const desktopLabel = `Desktop ${i + 1}`;

                return (
                  <button
                    key={ws.id}
                    type="button"
                    onClick={() => onSelectWorkspace && onSelectWorkspace(i)}
                    className={`group relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-2xl transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-white/25 border border-white/40 text-white shadow-[0_6px_20px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.35)] scale-105 backdrop-blur-xl font-bold"
                        : "bg-white/[0.08] border border-white/10 text-white/70 hover:bg-white/[0.15] hover:text-white hover:border-white/25 backdrop-blur-md"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-lg text-[11px] font-bold transition-colors ${
                        isActive
                          ? "bg-white text-slate-950 shadow-sm"
                          : "bg-white/15 text-white/80 group-hover:bg-white/25"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold tracking-tight whitespace-nowrap">
                      {desktopLabel}
                    </span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom Status Row */}
            <div className="relative mt-2.5 flex items-center justify-center gap-2 pt-2 border-t border-white/10 text-xs text-white/90">
              <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] animate-pulse" />
              <span className="font-semibold text-white drop-shadow-sm">
                {currentWs.name}:
              </span>
              <span className="text-white/75 font-normal">
                {currentWs.label}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default WorkspaceOSD;
