import { useState } from "react";
import {
  IoHardwareChipOutline,
  IoServerOutline,
  IoFlashOutline,
  IoWifiOutline,
} from "react-icons/io5";
import { useProcessManager } from "../../hooks/useProcessManager";

export default function Performance() {
  const { performanceHistory, currentMetrics, formattedUptime } =
    useProcessManager();

  const [activeTab, setActiveTab] = useState("cpu"); // "cpu" | "memory" | "disk" | "network"

  // Graph dimensions
  const graphWidth = 600;
  const graphHeight = 220;

  // Calculate SVG polyline points for active metric
  const points = performanceHistory.map((item, idx) => {
    const x = (idx / (performanceHistory.length - 1)) * graphWidth;
    let val = 0;
    if (activeTab === "cpu") val = item.cpu; // 0 - 100%
    if (activeTab === "memory") val = (item.memory / 16.0) * 100; // 0 - 100%
    if (activeTab === "disk") val = item.disk; // 0 - 100%
    if (activeTab === "network") val = Math.min(100, item.network * 10); // scale

    const y = graphHeight - (val / 100) * (graphHeight - 20) - 10;
    return `${x},${y}`;
  });

  const pointsString = points.join(" ");
  const polygonPoints = `0,${graphHeight} ${pointsString} ${graphWidth},${graphHeight}`;

  return (
    <div className="flex flex-col md:flex-row h-full overflow-hidden select-none text-white">
      {/* Left Metric Selectors List (Windows 11 Fluent Cards) */}
      <div className="w-full md:w-60 border-b md:border-b-0 md:border-r border-white/10 bg-[#191919]/60 p-2 flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-y-auto shrink-0">
        {/* CPU Selector */}
        <button
          type="button"
          onClick={() => setActiveTab("cpu")}
          className={`flex-1 md:flex-none flex items-center justify-between p-3 rounded-xl border text-left transition cursor-pointer min-w-[140px] ${
            activeTab === "cpu"
              ? "border-[var(--accent-color,#0078d4)] bg-white/10 shadow-md ring-1 ring-[var(--accent-color,#0078d4)]/50"
              : "border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/15"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <IoHardwareChipOutline
              size={20}
              className={
                activeTab === "cpu"
                  ? "text-[var(--accent-color,#0078d4)]"
                  : "text-white/60"
              }
            />
            <div>
              <span className="text-xs font-bold text-white block">CPU</span>
              <span className="text-[11px] text-white/50">
                {currentMetrics.cpu}% 4.20 GHz
              </span>
            </div>
          </div>
        </button>

        {/* Memory Selector */}
        <button
          type="button"
          onClick={() => setActiveTab("memory")}
          className={`flex-1 md:flex-none flex items-center justify-between p-3 rounded-xl border text-left transition cursor-pointer min-w-[140px] ${
            activeTab === "memory"
              ? "border-[var(--accent-color,#0078d4)] bg-white/10 shadow-md ring-1 ring-[var(--accent-color,#0078d4)]/50"
              : "border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/15"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <IoServerOutline
              size={20}
              className={
                activeTab === "memory"
                  ? "text-[var(--accent-color,#0078d4)]"
                  : "text-white/60"
              }
            />
            <div>
              <span className="text-xs font-bold text-white block">Memory</span>
              <span className="text-[11px] text-white/50">
                {currentMetrics.memory} / 16.0 GB ({Math.round((currentMetrics.memory / 16) * 100)}%)
              </span>
            </div>
          </div>
        </button>

        {/* Disk Selector */}
        <button
          type="button"
          onClick={() => setActiveTab("disk")}
          className={`flex-1 md:flex-none flex items-center justify-between p-3 rounded-xl border text-left transition cursor-pointer min-w-[140px] ${
            activeTab === "disk"
              ? "border-[var(--accent-color,#0078d4)] bg-white/10 shadow-md ring-1 ring-[var(--accent-color,#0078d4)]/50"
              : "border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/15"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <IoFlashOutline
              size={20}
              className={
                activeTab === "disk"
                  ? "text-[var(--accent-color,#0078d4)]"
                  : "text-white/60"
              }
            />
            <div>
              <span className="text-xs font-bold text-white block">Disk (SSD)</span>
              <span className="text-[11px] text-white/50">
                {currentMetrics.disk}% active time
              </span>
            </div>
          </div>
        </button>

        {/* Network Selector */}
        <button
          type="button"
          onClick={() => setActiveTab("network")}
          className={`flex-1 md:flex-none flex items-center justify-between p-3 rounded-xl border text-left transition cursor-pointer min-w-[140px] ${
            activeTab === "network"
              ? "border-[var(--accent-color,#0078d4)] bg-white/10 shadow-md ring-1 ring-[var(--accent-color,#0078d4)]/50"
              : "border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/15"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <IoWifiOutline
              size={20}
              className={
                activeTab === "network"
                  ? "text-[var(--accent-color,#0078d4)]"
                  : "text-white/60"
              }
            />
            <div>
              <span className="text-xs font-bold text-white block">Wi-Fi</span>
              <span className="text-[11px] text-white/50">
                {currentMetrics.network} Mbps
              </span>
            </div>
          </div>
        </button>
      </div>

      {/* Main Performance Details & Animated Graph */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {/* Top Header of Active Metric */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-white capitalize">
              {activeTab === "cpu" && "CPU"}
              {activeTab === "memory" && "Memory"}
              {activeTab === "disk" && "Disk 0 (C:)"}
              {activeTab === "network" && "Wi-Fi 6 (802.11ax)"}
            </h3>
            <span className="text-xs text-white/50">
              {activeTab === "cpu" && "AMD Ryzen 7 7800X3D 8-Core Processor"}
              {activeTab === "memory" && "16.0 GB DDR5 5200 MHz SODIMM"}
              {activeTab === "disk" && "NVMe Samsung SSD 980 PRO 1TB"}
              {activeTab === "network" && "Intel(R) Wi-Fi 6E AX211 160MHz"}
            </span>
          </div>

          <div className="text-right">
            <span className="text-2xl font-bold text-white">
              {activeTab === "cpu" && `${currentMetrics.cpu}%`}
              {activeTab === "memory" && `${currentMetrics.memory} GB`}
              {activeTab === "disk" && `${currentMetrics.disk}%`}
              {activeTab === "network" && `${currentMetrics.network} Mbps`}
            </span>
            <span className="text-[11px] text-white/40 block">
              {activeTab === "cpu" && "Utilization"}
              {activeTab === "memory" && "In use"}
              {activeTab === "disk" && "Active time"}
              {activeTab === "network" && "Throughput"}
            </span>
          </div>
        </div>

        {/* Real-time Animated Chart Card */}
        <div className="relative rounded-2xl border border-white/15 bg-black/50 p-4 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between text-[11px] text-white/40 mb-2">
            <span>% Utilization (Last 35 seconds)</span>
            <span>100%</span>
          </div>

          {/* SVG Real-time Graph */}
          <div className="relative w-full h-48">
            <svg
              viewBox={`0 0 ${graphWidth} ${graphHeight}`}
              preserveAspectRatio="none"
              className="w-full h-full overflow-visible"
            >
              <defs>
                <linearGradient id="metric-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--accent-color, #0078d4)"
                    stopOpacity="0.45"
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--accent-color, #0078d4)"
                    stopOpacity="0.02"
                  />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line
                x1="0"
                y1="10"
                x2={graphWidth}
                y2="10"
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="3 3"
              />
              <line
                x1="0"
                y1={graphHeight * 0.25}
                x2={graphWidth}
                y2={graphHeight * 0.25}
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="3 3"
              />
              <line
                x1="0"
                y1={graphHeight * 0.5}
                x2={graphWidth}
                y2={graphHeight * 0.5}
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="3 3"
              />
              <line
                x1="0"
                y1={graphHeight * 0.75}
                x2={graphWidth}
                y2={graphHeight * 0.75}
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="3 3"
              />

              {/* Gradient Area Fill */}
              <polygon points={polygonPoints} fill="url(#metric-grad)" />

              {/* Live Trend Polyline */}
              <polyline
                points={pointsString}
                fill="none"
                stroke="var(--accent-color, #0078d4)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="flex items-center justify-between text-[10px] text-white/40 mt-2">
            <span>35s ago</span>
            <span>0s (Live)</span>
          </div>
        </div>

        {/* Detailed Hardware Specifications Table (Windows 11 Task Manager style) */}
        {activeTab === "cpu" && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs">
            <div>
              <span className="text-[11px] text-white/40 block">Utilization</span>
              <span className="font-bold text-white text-sm">{currentMetrics.cpu}%</span>
            </div>
            <div>
              <span className="text-[11px] text-white/40 block">Speed</span>
              <span className="font-bold text-white text-sm">4.20 GHz</span>
            </div>
            <div>
              <span className="text-[11px] text-white/40 block">Processes</span>
              <span className="font-bold text-white text-sm">138</span>
            </div>
            <div>
              <span className="text-[11px] text-white/40 block">Threads</span>
              <span className="font-bold text-white text-sm">1,842</span>
            </div>
            <div>
              <span className="text-[11px] text-white/40 block">Handles</span>
              <span className="font-bold text-white text-sm">64,210</span>
            </div>
            <div>
              <span className="text-[11px] text-white/40 block">Up time</span>
              <span className="font-bold text-white text-sm font-mono">{formattedUptime}</span>
            </div>
            <div>
              <span className="text-[11px] text-white/40 block">Cores</span>
              <span className="font-bold text-white text-sm">8</span>
            </div>
            <div>
              <span className="text-[11px] text-white/40 block">Logical processors</span>
              <span className="font-bold text-white text-sm">16</span>
            </div>
          </div>
        )}

        {activeTab === "memory" && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs">
            <div>
              <span className="text-[11px] text-white/40 block">In use (Compressed)</span>
              <span className="font-bold text-white text-sm">{currentMetrics.memory} GB</span>
            </div>
            <div>
              <span className="text-[11px] text-white/40 block">Available</span>
              <span className="font-bold text-white text-sm">{(16.0 - currentMetrics.memory).toFixed(1)} GB</span>
            </div>
            <div>
              <span className="text-[11px] text-white/40 block">Committed</span>
              <span className="font-bold text-white text-sm">{(currentMetrics.memory + 1.2).toFixed(1)}/18.4 GB</span>
            </div>
            <div>
              <span className="text-[11px] text-white/40 block">Cached</span>
              <span className="font-bold text-white text-sm">3.4 GB</span>
            </div>
            <div>
              <span className="text-[11px] text-white/40 block">Speed</span>
              <span className="font-bold text-white text-sm">5200 MHz</span>
            </div>
            <div>
              <span className="text-[11px] text-white/40 block">Slots used</span>
              <span className="font-bold text-white text-sm">2 of 2</span>
            </div>
            <div>
              <span className="text-[11px] text-white/40 block">Form factor</span>
              <span className="font-bold text-white text-sm">SODIMM</span>
            </div>
            <div>
              <span className="text-[11px] text-white/40 block">Hardware reserved</span>
              <span className="font-bold text-white text-sm">342 MB</span>
            </div>
          </div>
        )}

        {activeTab === "disk" && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs">
            <div>
              <span className="text-[11px] text-white/40 block">Active time</span>
              <span className="font-bold text-white text-sm">{currentMetrics.disk}%</span>
            </div>
            <div>
              <span className="text-[11px] text-white/40 block">Average response time</span>
              <span className="font-bold text-white text-sm">0.8 ms</span>
            </div>
            <div>
              <span className="text-[11px] text-white/40 block">Read speed</span>
              <span className="font-bold text-white text-sm">1.4 MB/s</span>
            </div>
            <div>
              <span className="text-[11px] text-white/40 block">Write speed</span>
              <span className="font-bold text-white text-sm">0.8 MB/s</span>
            </div>
            <div>
              <span className="text-[11px] text-white/40 block">Capacity</span>
              <span className="font-bold text-white text-sm">1,000 GB</span>
            </div>
            <div>
              <span className="text-[11px] text-white/40 block">Formatted</span>
              <span className="font-bold text-white text-sm">931 GB</span>
            </div>
            <div>
              <span className="text-[11px] text-white/40 block">System disk</span>
              <span className="font-bold text-white text-sm">Yes</span>
            </div>
            <div>
              <span className="text-[11px] text-white/40 block">Page file</span>
              <span className="font-bold text-white text-sm">Yes</span>
            </div>
          </div>
        )}

        {activeTab === "network" && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs">
            <div>
              <span className="text-[11px] text-white/40 block">Send</span>
              <span className="font-bold text-white text-sm">0.2 Mbps</span>
            </div>
            <div>
              <span className="text-[11px] text-white/40 block">Receive</span>
              <span className="font-bold text-white text-sm">{currentMetrics.network} Mbps</span>
            </div>
            <div>
              <span className="text-[11px] text-white/40 block">Adapter name</span>
              <span className="font-bold text-white text-sm">Wi-Fi</span>
            </div>
            <div>
              <span className="text-[11px] text-white/40 block">SSID</span>
              <span className="font-bold text-white text-sm">Portfolio-5G</span>
            </div>
            <div>
              <span className="text-[11px] text-white/40 block">Protocol</span>
              <span className="font-bold text-white text-sm">Wi-Fi 6 (802.11ax)</span>
            </div>
            <div>
              <span className="text-[11px] text-white/40 block">Security type</span>
              <span className="font-bold text-white text-sm">WPA3-Personal</span>
            </div>
            <div>
              <span className="text-[11px] text-white/40 block">IPv4 address</span>
              <span className="font-bold text-white text-sm">192.168.1.108</span>
            </div>
            <div>
              <span className="text-[11px] text-white/40 block">Signal strength</span>
              <span className="font-bold text-emerald-400 text-sm">Excellent</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
