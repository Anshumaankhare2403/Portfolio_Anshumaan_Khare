import { useState } from "react";
import { useProcessManager } from "../../hooks/useProcessManager";
import { APP_METADATA, SYSTEM_PROCESSES } from "../../context/ProcessContext";

export default function Details({
  searchQuery,
  selectedProcessId,
  onSelectProcess,
  onRequestEndTask,
}) {
  const { openApps, liveProcessMetrics } = useProcessManager();
  const [sortField, setSortField] = useState("cpu");
  const [sortAsc, setSortAsc] = useState(false);

  // Combine apps and system items with .exe executable names
  const allDetailed = [
    ...Object.entries(APP_METADATA).map(([id, meta]) => {
      const live = liveProcessMetrics[id] || { cpu: 0, memory: meta.baseMem };
      const isOpen = Boolean(openApps[id]);
      return {
        id,
        exeName: `${id}.exe`,
        pid: meta.pid,
        status: isOpen ? "Running" : "Suspended",
        user: "Anshumaan",
        cpu: live.cpu,
        memoryKb: `${(live.memory * 1024).toLocaleString()} K`,
        arch: "x64",
        description: meta.description,
        isProtected: meta.isProtected,
      };
    }),
    ...SYSTEM_PROCESSES.map((sys) => {
      const live = liveProcessMetrics[sys.id] || { cpu: sys.baseCpu, memory: sys.baseMem };
      return {
        id: sys.id,
        exeName: `${sys.id.replace("-", "")}.exe`,
        pid: sys.pid,
        status: "Running",
        user: sys.user,
        cpu: live.cpu,
        memoryKb: `${(live.memory * 1024).toLocaleString()} K`,
        arch: sys.arch,
        description: sys.description,
        isProtected: true,
      };
    }),
  ];

  const filtered = allDetailed
    .filter((p) => {
      const q = searchQuery.trim().toLowerCase();
      return (
        !q ||
        p.exeName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        String(p.pid).includes(q)
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
            onClick={() => handleSort("exeName")}
            className="flex-1 min-w-[120px] sm:min-w-[160px] text-left hover:text-white cursor-pointer"
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
            onClick={() => handleSort("status")}
            className="w-20 sm:w-24 text-left px-2 hover:text-white cursor-pointer hidden sm:block"
          >
            Status
          </button>
          <button
            type="button"
            onClick={() => handleSort("user")}
            className="w-24 sm:w-28 text-left px-2 hover:text-white cursor-pointer hidden md:block"
          >
            User name
          </button>
          <button
            type="button"
            onClick={() => handleSort("cpu")}
            className="w-16 sm:w-20 text-right px-2 hover:text-white cursor-pointer"
          >
            CPU
          </button>
          <button
            type="button"
            onClick={() => handleSort("memoryKb")}
            className="w-20 sm:w-28 text-right px-2 hover:text-white cursor-pointer"
          >
            Memory
          </button>
          <span className="w-16 text-center px-1 hidden lg:block">Arch</span>
          <span className="w-64 text-left px-2 hidden xl:block">Description</span>
        </div>

        {/* Table Rows */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent divide-y divide-white/[0.04]">
          {filtered.map((proc) => {
            const isSelected = selectedProcessId === proc.id;
            return (
              <div
                key={proc.id}
                onClick={() => onSelectProcess(proc.id)}
                onDoubleClick={() => {
                  onSelectProcess(proc.id);
                  if (!proc.isProtected) onRequestEndTask(proc);
                }}
                className={`flex items-center text-xs px-3 sm:px-4 py-2 transition-all cursor-pointer font-mono ${
                  isSelected
                    ? "bg-[var(--accent-color,#0078d4)]/25 border-l-4 border-[var(--accent-color,#0078d4)] text-white"
                    : "hover:bg-white/[0.04] text-white/80"
                }`}
              >
                <div className="flex-1 min-w-[120px] sm:min-w-[160px] truncate font-sans font-medium text-white">
                  {proc.exeName}
                </div>
                <div className="w-14 sm:w-16 text-right px-2 text-white/50">{proc.pid}</div>
                <div className="w-20 sm:w-24 px-2 hidden sm:block font-sans text-white/70">
                  {proc.status}
                </div>
                <div className="w-24 sm:w-28 px-2 hidden md:block font-sans text-white/60">
                  {proc.user}
                </div>
                <div className="w-16 sm:w-20 text-right px-2 text-white">
                  {proc.cpu > 0 ? `${proc.cpu}%` : "0%"}
                </div>
                <div className="w-20 sm:w-28 text-right px-2 text-white/90">
                  {proc.memoryKb}
                </div>
                <div className="w-16 text-center px-1 text-white/50 hidden lg:block">
                  {proc.arch}
                </div>
                <div className="w-64 px-2 text-white/50 truncate font-sans hidden xl:block">
                  {proc.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
