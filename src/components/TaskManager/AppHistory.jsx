import { useState } from "react";
import { IoTrashOutline, IoTimeOutline } from "react-icons/io5";
import { useProcessManager } from "../../hooks/useProcessManager";

export default function AppHistory({ searchQuery }) {
  const { appHistory, clearAppHistory } = useProcessManager();
  const [sortField, setSortField] = useState("name");
  const [sortAsc, setSortAsc] = useState(true);

  const items = Object.entries(appHistory).map(([id, data]) => ({
    id,
    ...data,
    meteredNetwork: "0 MB",
    tileUpdates: "0.1 MB",
  }));

  const filtered = items
    .filter((item) =>
      item.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
    )
    .sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (sortAsc) return valA.localeCompare(valB);
      return valB.localeCompare(valA);
    });

  return (
    <div className="flex flex-col h-full overflow-hidden select-none text-white">
      {/* Top Action Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#1b1b1b]">
        <span className="text-xs text-white/50">
          Resource usage since system installation
        </span>

        <button
          type="button"
          onClick={clearAppHistory}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/10 transition cursor-pointer"
        >
          <IoTrashOutline size={14} />
          <span>Delete usage history</span>
        </button>
      </div>

      {/* Table Header */}
      <div className="flex items-center text-xs font-semibold text-white/70 border-b border-white/10 bg-[#1f1f1f] px-4 py-2 shrink-0">
        <button
          type="button"
          onClick={() => {
            setSortField("name");
            setSortAsc(!sortAsc);
          }}
          className="flex-1 text-left hover:text-white cursor-pointer"
        >
          Name
        </button>
        <button
          type="button"
          onClick={() => {
            setSortField("cpuTime");
            setSortAsc(!sortAsc);
          }}
          className="w-32 text-right hover:text-white cursor-pointer px-2"
        >
          CPU time
        </button>
        <button
          type="button"
          onClick={() => {
            setSortField("network");
            setSortAsc(!sortAsc);
          }}
          className="w-32 text-right hover:text-white cursor-pointer px-2"
        >
          Network
        </button>
        <span className="w-32 text-right px-2 hidden sm:block">
          Metered network
        </span>
        <span className="w-28 text-right px-2 hidden md:block">
          Tile updates
        </span>
      </div>

      {/* Table Rows */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent divide-y divide-white/[0.04]">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="flex items-center text-xs px-4 py-2.5 hover:bg-white/[0.04] transition"
          >
            <div className="flex-1 flex items-center gap-2 pr-2">
              <IoTimeOutline size={16} className="text-white/40 shrink-0" />
              <span className="font-medium text-white truncate">
                {item.name}
              </span>
            </div>
            <div className="w-32 text-right px-2 font-mono text-white/80">
              {item.cpuTime}
            </div>
            <div className="w-32 text-right px-2 font-mono text-white/80">
              {item.network}
            </div>
            <div className="w-32 text-right px-2 text-white/50 hidden sm:block">
              {item.meteredNetwork}
            </div>
            <div className="w-28 text-right px-2 text-white/50 hidden md:block">
              {item.tileUpdates}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
