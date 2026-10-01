import { useState } from "react";
import { IoPersonCircleOutline, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { useProcessManager } from "../../hooks/useProcessManager";
import heroAvatar from "../../assets/hero.png";

export default function Users({ searchQuery }) {
  const { currentMetrics } = useProcessManager();
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="flex flex-col h-full overflow-hidden select-none text-white">
      {/* Table Header */}
      <div className="flex items-center text-xs font-semibold text-white/70 border-b border-white/10 bg-[#1f1f1f] px-4 py-2 shrink-0">
        <span className="flex-1 min-w-[200px]">User</span>
        <span className="w-24 text-left hidden sm:block">Status</span>
        <span className="w-24 text-right px-2">CPU</span>
        <span className="w-28 text-right px-2">Memory</span>
        <span className="w-24 text-right px-2 hidden md:block">Disk</span>
        <span className="w-24 text-right px-2 hidden lg:block">Network</span>
      </div>

      {/* User Row */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <div className="border-b border-white/10">
          <div
            onClick={() => setExpanded(!expanded)}
            className="flex items-center text-xs px-4 py-3 hover:bg-white/[0.05] transition cursor-pointer"
          >
            {/* User name & avatar */}
            <div className="flex-1 min-w-[200px] flex items-center gap-2.5">
              <span>
                {expanded ? <IoChevronDown size={14} /> : <IoChevronUp size={14} />}
              </span>
              <img
                src={heroAvatar}
                alt=""
                className="w-7 h-7 rounded-full object-cover border border-white/20"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <div>
                <span className="font-bold text-white block">
                  Anshumaan Khare (Active)
                </span>
                <span className="text-[11px] text-white/50 block">
                  Administrator • Console Session
                </span>
              </div>
            </div>

            {/* Status */}
            <div className="w-24 hidden sm:flex items-center gap-1 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Active</span>
            </div>

            {/* Metrics */}
            <div className="w-24 text-right px-2 font-mono text-white/90">
              {currentMetrics.cpu}%
            </div>
            <div className="w-28 text-right px-2 font-mono text-white/90">
              {currentMetrics.memory} GB
            </div>
            <div className="w-24 text-right px-2 text-white/60 hidden md:block">
              {currentMetrics.disk}%
            </div>
            <div className="w-24 text-right px-2 text-white/60 hidden lg:block">
              {currentMetrics.network} Mbps
            </div>
          </div>

          {/* Sub-processes under user */}
          {expanded && (
            <div className="bg-black/20 pl-10 pr-4 py-2 text-xs divide-y divide-white/[0.03]">
              <div className="flex items-center justify-between py-1.5 text-white/60">
                <span>Desktop Workspace Environment</span>
                <span className="font-mono text-white/80">1.8% CPU • 86 MB</span>
              </div>
              <div className="flex items-center justify-between py-1.5 text-white/60">
                <span>Task Manager Diagnostic Core</span>
                <span className="font-mono text-white/80">1.2% CPU • 44 MB</span>
              </div>
              <div className="flex items-center justify-between py-1.5 text-white/60">
                <span>Windows Shell Experience Host</span>
                <span className="font-mono text-white/80">0.9% CPU • 58 MB</span>
              </div>
              <div className="flex items-center justify-between py-1.5 text-white/60">
                <span>Runtime Broker Security Guard</span>
                <span className="font-mono text-white/80">0.4% CPU • 31 MB</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
