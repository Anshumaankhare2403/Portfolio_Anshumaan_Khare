import { useState, useMemo } from "react";
import {
  IoChevronDown,
  IoChevronUp,
  IoAlertCircleOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { useProcessManager } from "../../hooks/useProcessManager";
import { APP_METADATA, SYSTEM_PROCESSES } from "../../context/ProcessContext";

import chromeIcon from "../../assets/scalable/Google_Chrome_icon_(February_2022).svg";
import ytIcon from "../../assets/scalable/yt.svg";
import termIcon from "../../assets/scalable/terminal.svg";
import vscodeIcon from "../../assets/scalable/vscode.svg";
import settingsIcon from "../../assets/scalable/settings.svg";
import tmIcon from "../../assets/scalable/taskmanager.svg";
import usersIcon from "../../assets/scalable/users.svg";
import folderIcon from "../../assets/color-lightblue/folder.svg";
import githubIcon from "../../assets/color-lightblue/folder-github.svg";
import projectsIcon from "../../assets/color-lightblue/folder-projects.svg";
import winLogo from "../../assets/This PC/Windows11.svg";

const APP_ICONS = {
  chrome: chromeIcon,
  youtube: ytIcon,
  terminal: termIcon,
  vscode: vscodeIcon,
  settings: settingsIcon,
  taskmanager: tmIcon,
  files: folderIcon,
  about: usersIcon,
  projects: projectsIcon,
  github: githubIcon,
  contact: usersIcon,
};

// Heatmap color generator for CPU & Memory
function getCpuHeatStyle(cpu) {
  if (cpu >= 15) return "bg-amber-500/35 text-amber-200 font-semibold";
  if (cpu >= 5) return "bg-amber-500/20 text-amber-100";
  if (cpu >= 2) return "bg-amber-500/10 text-white/90";
  return "text-white/70";
}

function getMemHeatStyle(mem) {
  if (mem >= 150) return "bg-amber-500/35 text-amber-200 font-semibold";
  if (mem >= 80) return "bg-amber-500/20 text-amber-100";
  if (mem >= 45) return "bg-amber-500/10 text-white/90";
  return "text-white/70";
}

export default function Processes({
  searchQuery,
  selectedProcessId,
  onSelectProcess,
  onRequestEndTask,
}) {
  const { openApps, liveProcessMetrics, currentMetrics } = useProcessManager();

  const [sortField, setSortField] = useState("cpu");
  const [sortAsc, setSortAsc] = useState(false);
  const [appsExpanded, setAppsExpanded] = useState(true);
  const [bgExpanded, setBgExpanded] = useState(true);

  // Group processes into Apps and Background/System
  const { appProcesses, backgroundProcesses } = useMemo(() => {
    const appsList = [];
    const bgList = [];

    // 1. Portfolio Apps
    Object.entries(APP_METADATA).forEach(([id, meta]) => {
      const live = liveProcessMetrics[id] || {
        cpu: 0,
        memory: meta.baseMem,
        disk: 0,
        network: 0,
        status: openApps[id] ? "Running" : "Suspended",
      };

      const item = {
        id,
        name: meta.name,
        description: meta.description,
        icon: APP_ICONS[id] || winLogo,
        status: openApps[id] ? "Running" : "Suspended",
        cpu: live.cpu,
        memory: live.memory,
        disk: live.disk,
        network: live.network,
        isProtected: meta.isProtected,
        isApp: true,
        isOpen: Boolean(openApps[id]),
      };

      if (openApps[id]) {
        appsList.push(item);
      } else {
        bgList.push(item);
      }
    });

    // 2. System Processes
    SYSTEM_PROCESSES.forEach((sys) => {
      const live = liveProcessMetrics[sys.id] || {
        cpu: sys.baseCpu,
        memory: sys.baseMem,
        disk: 0,
        network: 0,
      };

      bgList.push({
        id: sys.id,
        name: sys.name,
        description: sys.description,
        icon: winLogo,
        status: "Running",
        cpu: live.cpu,
        memory: live.memory,
        disk: live.disk,
        network: live.network,
        isProtected: true,
        isApp: false,
        isOpen: true,
      });
    });

    return { appProcesses: appsList, backgroundProcesses: bgList };
  }, [openApps, liveProcessMetrics]);

  // Handle Sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc((prev) => !prev);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const sortItems = (list) => {
    const q = searchQuery.trim().toLowerCase();
    const filtered = q
      ? list.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
        )
      : list;

    return [...filtered].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === "string") {
        return sortAsc
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }
      return sortAsc ? valA - valB : valB - valA;
    });
  };

  const sortedApps = sortItems(appProcesses);
  const sortedBg = sortItems(backgroundProcesses);

  // Totals for headers
  const totalCpuPercent = currentMetrics.cpu;
  const totalMemoryGB = currentMetrics.memory;

  return (
    <div className="flex flex-col h-full overflow-hidden select-none text-white">
      {/* Table Header */}
      <div className="flex items-center text-xs font-semibold text-white/70 border-b border-white/10 bg-[#1f1f1f] px-4 py-2 shrink-0">
        {/* Name Column */}
        <button
          type="button"
          onClick={() => handleSort("name")}
          className="flex-1 min-w-[200px] flex items-center gap-1.5 text-left hover:text-white transition cursor-pointer"
        >
          <span>Name</span>
          {sortField === "name" && (
            <span>{sortAsc ? <IoChevronUp size={12} /> : <IoChevronDown size={12} />}</span>
          )}
        </button>

        {/* Status Column */}
        <button
          type="button"
          onClick={() => handleSort("status")}
          className="w-24 text-left hover:text-white transition cursor-pointer hidden sm:flex items-center gap-1"
        >
          <span>Status</span>
          {sortField === "status" && (
            <span>{sortAsc ? <IoChevronUp size={12} /> : <IoChevronDown size={12} />}</span>
          )}
        </button>

        {/* CPU Column */}
        <button
          type="button"
          onClick={() => handleSort("cpu")}
          className="w-24 text-right hover:text-white transition cursor-pointer flex items-center justify-end gap-1 px-2"
        >
          <div className="flex flex-col items-end">
            <span>CPU</span>
            <span className="text-[10px] text-white/40">{totalCpuPercent}%</span>
          </div>
          {sortField === "cpu" && (
            <span>{sortAsc ? <IoChevronUp size={12} /> : <IoChevronDown size={12} />}</span>
          )}
        </button>

        {/* Memory Column */}
        <button
          type="button"
          onClick={() => handleSort("memory")}
          className="w-28 text-right hover:text-white transition cursor-pointer flex items-center justify-end gap-1 px-2"
        >
          <div className="flex flex-col items-end">
            <span>Memory</span>
            <span className="text-[10px] text-white/40">{totalMemoryGB} GB</span>
          </div>
          {sortField === "memory" && (
            <span>{sortAsc ? <IoChevronUp size={12} /> : <IoChevronDown size={12} />}</span>
          )}
        </button>

        {/* Disk Column */}
        <button
          type="button"
          onClick={() => handleSort("disk")}
          className="w-24 text-right hover:text-white transition cursor-pointer hidden md:flex items-center justify-end gap-1 px-2"
        >
          <div className="flex flex-col items-end">
            <span>Disk</span>
            <span className="text-[10px] text-white/40">{currentMetrics.disk}%</span>
          </div>
          {sortField === "disk" && (
            <span>{sortAsc ? <IoChevronUp size={12} /> : <IoChevronDown size={12} />}</span>
          )}
        </button>

        {/* Network Column */}
        <button
          type="button"
          onClick={() => handleSort("network")}
          className="w-24 text-right hover:text-white transition cursor-pointer hidden lg:flex items-center justify-end gap-1 px-2"
        >
          <div className="flex flex-col items-end">
            <span>Network</span>
            <span className="text-[10px] text-white/40">{currentMetrics.network} Mbps</span>
          </div>
          {sortField === "network" && (
            <span>{sortAsc ? <IoChevronUp size={12} /> : <IoChevronDown size={12} />}</span>
          )}
        </button>
      </div>

      {/* Process Rows List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent divide-y divide-white/[0.04]">
        {/* Apps Group */}
        <div>
          <button
            type="button"
            onClick={() => setAppsExpanded((prev) => !prev)}
            className="w-full flex items-center gap-2 px-4 py-2 text-xs font-bold text-white/80 bg-white/[0.03] hover:bg-white/[0.06] transition text-left cursor-pointer"
          >
            <span>{appsExpanded ? <IoChevronDown size={13} /> : <IoChevronUp size={13} />}</span>
            <span>Apps ({sortedApps.length})</span>
          </button>

          {appsExpanded && (
            <div className="divide-y divide-white/[0.03]">
              {sortedApps.length === 0 ? (
                <div className="px-6 py-4 text-xs text-white/40 italic">
                  No active apps running on the desktop. Open an app to view it here.
                </div>
              ) : (
                sortedApps.map((proc) => {
                  const isSelected = selectedProcessId === proc.id;
                  return (
                    <div
                      key={proc.id}
                      onClick={() => onSelectProcess(proc.id)}
                      onDoubleClick={() => {
                        onSelectProcess(proc.id);
                        if (!proc.isProtected) onRequestEndTask(proc);
                      }}
                      className={`flex items-center text-xs px-4 py-2 transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[var(--accent-color,#0078d4)]/25 border-l-4 border-[var(--accent-color,#0078d4)] text-white"
                          : "hover:bg-white/[0.05] text-white/90"
                      }`}
                    >
                      {/* Name & Icon */}
                      <div className="flex-1 min-w-[200px] flex items-center gap-2.5 pr-2">
                        <img
                          src={proc.icon}
                          alt=""
                          className="h-5 w-5 object-contain shrink-0"
                        />
                        <div className="truncate">
                          <span className="font-medium text-white truncate block">
                            {proc.name}
                          </span>
                          <span className="text-[10px] text-white/40 truncate block sm:hidden">
                            {proc.status}
                          </span>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="w-24 hidden sm:flex items-center gap-1.5 text-white/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>{proc.status}</span>
                      </div>

                      {/* CPU */}
                      <div
                        className={`w-24 text-right px-2 py-1 rounded transition-colors ${getCpuHeatStyle(
                          proc.cpu
                        )}`}
                      >
                        {proc.cpu > 0 ? `${proc.cpu}%` : "0%"}
                      </div>

                      {/* Memory */}
                      <div
                        className={`w-28 text-right px-2 py-1 rounded transition-colors ${getMemHeatStyle(
                          proc.memory
                        )}`}
                      >
                        {proc.memory} MB
                      </div>

                      {/* Disk */}
                      <div className="w-24 text-right px-2 text-white/60 hidden md:block">
                        {proc.disk > 0 ? `${proc.disk} MB/s` : "0 MB/s"}
                      </div>

                      {/* Network */}
                      <div className="w-24 text-right px-2 text-white/60 hidden lg:block">
                        {proc.network > 0 ? `${proc.network} Mbps` : "0 Mbps"}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Background Processes Group */}
        <div>
          <button
            type="button"
            onClick={() => setBgExpanded((prev) => !prev)}
            className="w-full flex items-center gap-2 px-4 py-2 text-xs font-bold text-white/80 bg-white/[0.03] hover:bg-white/[0.06] transition text-left cursor-pointer"
          >
            <span>{bgExpanded ? <IoChevronDown size={13} /> : <IoChevronUp size={13} />}</span>
            <span>Background processes ({sortedBg.length})</span>
          </button>

          {bgExpanded && (
            <div className="divide-y divide-white/[0.03]">
              {sortedBg.map((proc) => {
                const isSelected = selectedProcessId === proc.id;
                return (
                  <div
                    key={proc.id}
                    onClick={() => onSelectProcess(proc.id)}
                    className={`flex items-center text-xs px-4 py-2 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[var(--accent-color,#0078d4)]/25 border-l-4 border-[var(--accent-color,#0078d4)] text-white"
                        : "hover:bg-white/[0.05] text-white/70"
                    }`}
                  >
                    {/* Name & Icon */}
                    <div className="flex-1 min-w-[200px] flex items-center gap-2.5 pr-2">
                      <img
                        src={proc.icon}
                        alt=""
                        className="h-4 w-4 object-contain opacity-80 shrink-0"
                      />
                      <div className="truncate">
                        <span className="font-medium text-white/90 truncate block">
                          {proc.name}
                        </span>
                        <span className="text-[10px] text-white/40 truncate block">
                          {proc.description}
                        </span>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="w-24 hidden sm:flex items-center gap-1.5 text-white/50 text-[11px]">
                      {proc.isProtected ? (
                        <span title="Protected Windows process" className="flex items-center gap-1 text-sky-400">
                          <IoShieldCheckmarkOutline size={12} />
                          <span>System</span>
                        </span>
                      ) : (
                        <span>{proc.status}</span>
                      )}
                    </div>

                    {/* CPU */}
                    <div
                      className={`w-24 text-right px-2 py-0.5 rounded transition-colors ${getCpuHeatStyle(
                        proc.cpu
                      )}`}
                    >
                      {proc.cpu > 0 ? `${proc.cpu}%` : "0%"}
                    </div>

                    {/* Memory */}
                    <div
                      className={`w-28 text-right px-2 py-0.5 rounded transition-colors ${getMemHeatStyle(
                        proc.memory
                      )}`}
                    >
                      {proc.memory} MB
                    </div>

                    {/* Disk */}
                    <div className="w-24 text-right px-2 text-white/50 hidden md:block">
                      {proc.disk > 0 ? `${proc.disk} MB/s` : "0 MB/s"}
                    </div>

                    {/* Network */}
                    <div className="w-24 text-right px-2 text-white/50 hidden lg:block">
                      {proc.network > 0 ? `${proc.network} Mbps` : "0 Mbps"}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
