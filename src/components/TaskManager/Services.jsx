import { useState } from "react";
import { useProcessManager } from "../../hooks/useProcessManager";

export default function Services({ searchQuery }) {
  const { services, toggleService } = useProcessManager();
  const [sortField, setSortField] = useState("name");
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = services
    .filter((svc) => {
      const q = searchQuery.trim().toLowerCase();
      return (
        !q ||
        svc.name.toLowerCase().includes(q) ||
        svc.displayName.toLowerCase().includes(q) ||
        svc.description.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === "string") {
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortAsc ? valA - valB : valB - valA;
    });

  const handleSort = (field) => {
    if (sortField === field) setSortAsc(!sortAsc);
    else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-x-auto overflow-y-hidden select-none text-white">
      <div className="min-w-[340px] sm:min-w-full flex-1 flex flex-col overflow-hidden">
        {/* Table Header */}
        <div className="flex items-center text-xs font-semibold text-white/70 border-b border-white/10 bg-[#1f1f1f] px-3 sm:px-4 py-2 shrink-0">
          <button
            type="button"
            onClick={() => handleSort("name")}
            className="w-32 sm:w-40 text-left hover:text-white cursor-pointer"
          >
            Name
          </button>
          <button
            type="button"
            onClick={() => handleSort("pid")}
            className="w-14 sm:w-16 text-right px-2 hover:text-white cursor-pointer"
          >
            PID
          </button>
          <button
            type="button"
            onClick={() => handleSort("description")}
            className="flex-1 min-w-[100px] text-left px-2 sm:px-3 hover:text-white cursor-pointer"
          >
            Description
          </button>
          <button
            type="button"
            onClick={() => handleSort("status")}
            className="w-20 sm:w-24 text-center px-2 hover:text-white cursor-pointer"
          >
            Status
          </button>
          <button
            type="button"
            onClick={() => handleSort("group")}
            className="w-32 text-left px-2 hover:text-white cursor-pointer hidden md:block"
          >
            Group
          </button>
          <span className="w-16 sm:w-20 text-right px-2">Action</span>
        </div>

        {/* Table Rows */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent divide-y divide-white/[0.04]">
          {filtered.map((svc) => {
            const isRunning = svc.status === "Running";
            return (
              <div
                key={svc.id}
                className="flex items-center text-xs px-3 sm:px-4 py-2.5 hover:bg-white/[0.04] transition"
              >
                <div className="w-32 sm:w-40 font-mono font-medium text-white truncate">
                  {svc.name}
                </div>
                <div className="w-14 sm:w-16 text-right px-2 font-mono text-white/50">
                  {isRunning ? svc.pid : "-"}
                </div>
                <div className="flex-1 min-w-[100px] px-2 sm:px-3 text-white/70 truncate">
                  {svc.description}
                </div>
                <div className="w-20 sm:w-24 text-center px-2">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold border ${
                      isRunning
                        ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                        : "bg-white/5 border-white/15 text-white/40"
                    }`}
                  >
                    {svc.status}
                  </span>
                </div>
                <div className="w-32 text-left px-2 text-white/40 truncate hidden md:block">
                  {svc.group}
                </div>
                <div className="w-16 sm:w-20 text-right px-2">
                  <button
                    type="button"
                    onClick={() => toggleService(svc.id)}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold transition cursor-pointer ${
                      isRunning
                        ? "bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30"
                        : "bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30"
                    }`}
                  >
                    {isRunning ? "Stop" : "Start"}
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
