import { motion } from "framer-motion";
import { IoSearchOutline } from "react-icons/io5";

function AppMenu({ apps, query, onClose, onQueryChange }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/35 px-6 py-10 backdrop-blur-2xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 18 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className="relative w-full max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/20 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.24),_rgba(15,23,42,0.72)_62%)] px-8 py-8 shadow-[0_35px_120px_rgba(15,23,42,0.55)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_38%,rgba(56,189,248,0.12))]" />

        <div className="relative">
          <div className="mx-auto max-w-lg">
            <label className="flex items-center gap-3 rounded-full border border-white/15 bg-black/25 px-5 py-3 shadow-inner shadow-black/20">
              <IoSearchOutline className="text-xl text-white/65" />
              <input
                type="text"
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Search apps"
                autoFocus
                className="w-full bg-transparent text-base text-white outline-none placeholder:text-white/45"
              />
            </label>
          </div>

          <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-5">
            {apps.map((app, index) => (
              <motion.button
                key={app.id}
                type="button"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * index }}
                onClick={app.onOpen}
                className="group flex min-h-40 flex-col items-center justify-center rounded-[1.8rem] border border-white/10 bg-white/[0.08] px-4 py-6 text-center shadow-lg shadow-slate-950/20 transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.14] focus:-translate-y-1 focus:border-white/25 focus:bg-white/[0.14] focus:outline-none"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-[1.6rem] bg-white/95 p-4 shadow-[0_18px_35px_rgba(15,23,42,0.2)] transition group-hover:scale-105">
                  <img
                    src={app.image}
                    alt=""
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="mt-4 text-sm font-medium text-white">
                  {app.title}
                </span>
              </motion.button>
            ))}
          </div>

          {!apps.length && (
            <div className="mt-14 rounded-[2rem] border border-dashed border-white/15 bg-black/20 px-6 py-10 text-center text-white/70">
              No apps matched your search.
            </div>
          )}

          <div className="mt-8 text-center text-sm text-white/55">
            Press Windows or Esc to close
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AppMenu;
