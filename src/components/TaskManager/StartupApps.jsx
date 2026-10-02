import { useProcessManager } from "../../hooks/useProcessManager";
import { IoRocketOutline } from "react-icons/io5";

export default function StartupApps({ searchQuery }) {
  const { startupApps, toggleStartupApp } = useProcessManager();

  const filtered = startupApps.filter((app) =>
    app.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  return (
    <div className="flex flex-col h-full overflow-x-auto overflow-y-hidden select-none text-white">
      <div className="min-w-[340px] sm:min-w-full flex-1 flex flex-col overflow-hidden">
        {/* Header Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-3 sm:px-4 py-2 border-b border-white/10 bg-[#1b1b1b] text-xs text-white/50 gap-1">
          <span>Apps that start automatically when signing in</span>
          <span className="hidden sm:inline">Startup impact measured by CPU load</span>
        </div>

        {/* Table Header */}
        <div className="flex items-center text-xs font-semibold text-white/70 border-b border-white/10 bg-[#1f1f1f] px-3 sm:px-4 py-2 shrink-0">
          <span className="flex-1 min-w-[120px]">Name</span>
          <span className="w-36 md:w-48 hidden sm:block">Publisher</span>
          <span className="w-20 sm:w-28 text-center">Status</span>
          <span className="w-24 sm:w-32 text-right px-2 hidden sm:block">Startup impact</span>
          <span className="w-20 sm:w-24 text-right px-2">Action</span>
        </div>

        {/* Table Rows */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent divide-y divide-white/[0.04]">
          {filtered.map((app) => {
            const isEnabled = app.status === "Enabled";
            return (
              <div
                key={app.id}
                className="flex items-center text-xs px-3 sm:px-4 py-2.5 hover:bg-white/[0.04] transition"
              >
                {/* Name & Icon */}
                <div className="flex-1 min-w-[120px] flex items-center gap-2 sm:gap-2.5 pr-2">
                  <IoRocketOutline size={16} className="text-white/40 shrink-0" />
                  <span className="font-medium text-white truncate">
                    {app.name}
                  </span>
                </div>

                {/* Publisher */}
                <div className="w-36 md:w-48 text-white/50 truncate hidden sm:block">
                  {app.publisher}
                </div>

                {/* Status Badge */}
                <div className="w-20 sm:w-28 flex justify-center">
                  <span
                    className={`px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                      isEnabled
                        ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                        : "bg-white/5 border-white/15 text-white/40"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>

                {/* Startup impact */}
                <div className="w-24 sm:w-32 text-right px-2 hidden sm:block">
                  <span
                    className={`font-medium ${
                      app.impact === "High"
                        ? "text-red-400"
                        : app.impact === "Medium"
                        ? "text-amber-400"
                        : "text-white/60"
                    }`}
                  >
                    {app.impact}
                  </span>
                </div>

                {/* Toggle Action */}
                <div className="w-20 sm:w-24 text-right px-2">
                  <button
                    type="button"
                    onClick={() => toggleStartupApp(app.id)}
                    className={`px-2 sm:px-2.5 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer ${
                      isEnabled
                        ? "bg-red-500/15 hover:bg-red-500/25 text-red-300 border border-red-500/30"
                        : "bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30"
                    }`}
                  >
                    {isEnabled ? "Disable" : "Enable"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
