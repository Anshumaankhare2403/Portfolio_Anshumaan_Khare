import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoClose,
  IoRemove,
  IoSquareOutline,
  IoSearchOutline,
  IoPlayOutline,
  IoStopCircleOutline,
  IoWarningOutline,
  IoCheckmarkCircle,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";

import TaskManagerSidebar from "./TaskManagerSidebar";
import Processes from "./Processes";
import Performance from "./Performance";
import AppHistory from "./AppHistory";
import StartupApps from "./StartupApps";
import Users from "./Users";
import Details from "./Details";
import Services from "./Services";

import { useProcessManager } from "../../hooks/useProcessManager";
import { APP_METADATA } from "../../context/ProcessContext";
import tmIcon from "../../assets/scalable/taskmanager.svg";

export default function TaskManager({
  onClose,
  onMinimize,
  onOpenSettings,
  mobile = false,
}) {
  const [maximized, setMaximized] = useState(false);
  const [activeSection, setActiveSection] = useState("processes");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Process Selection & End Task Dialog
  const [selectedProcessId, setSelectedProcessId] = useState(null);
  const [confirmProcess, setConfirmProcess] = useState(null);

  // Run New Task Modal
  const [isRunModalOpen, setIsRunModalOpen] = useState(false);
  const [runCommand, setRunCommand] = useState("");

  const {
    openApps,
    endProcess,
    runNewTask,
    currentMetrics,
    toast,
    showToast,
  } = useProcessManager();

  // Find info about selected process
  const selectedMeta = selectedProcessId
    ? APP_METADATA[selectedProcessId]
    : null;
  const isSelectedOpen = selectedProcessId ? Boolean(openApps[selectedProcessId]) : false;
  const isSelectedProtected = selectedMeta?.isProtected ?? true;

  // Request to end task
  const handleRequestEndTask = (proc) => {
    if (proc.isProtected) {
      showToast("⚠️ This process cannot be ended.", "error");
      return;
    }
    setConfirmProcess(proc);
  };

  // Confirm and execute end task
  const handleConfirmEndTask = () => {
    if (!confirmProcess) return;
    endProcess(confirmProcess.id);
    setConfirmProcess(null);
    setSelectedProcessId(null);
  };

  // Submit Run New Task
  const handleRunSubmit = (e) => {
    e.preventDefault();
    if (runCommand.trim()) {
      runNewTask(runCommand.trim());
      setRunCommand("");
      setIsRunModalOpen(false);
    }
  };

  return (
    <>
      <motion.div
        drag={mobile || maximized ? false : true}
        dragMomentum={false}
        initial={
          mobile
            ? { opacity: 0, scale: 0.96 }
            : { x: 0, y: 0, opacity: 0, scale: 0.95 }
        }
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.18 }}
        className={`fixed z-50 flex flex-col overflow-hidden border border-white/20 bg-[#202020]/95 text-white shadow-[0_30px_90px_rgba(0,0,0,0.85)] backdrop-blur-3xl ${
          mobile
            ? "inset-0 h-[100svh] w-full rounded-none"
            : maximized
            ? "inset-0 h-full w-full rounded-none z-50"
            : "top-12 left-1/2 -translate-x-1/2 w-[92vw] max-w-5xl h-[82vh] rounded-2xl"
        }`}
      >
        {/* Windows 11 Title Bar */}
        <div className="flex h-10 shrink-0 items-center justify-between border-b border-white/10 bg-[#1c1c1c] px-3 select-none">
          {/* Title & Icon */}
          <div className="flex items-center gap-2.5">
            <img src={tmIcon} alt="" className="h-4 w-4 object-contain" />
            <span className="text-xs font-semibold tracking-wide text-white/90">
              Task Manager
            </span>
          </div>

          {/* Window Control Buttons */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={onMinimize || onClose}
              className="flex h-8 w-11 items-center justify-center hover:bg-white/10 text-white/80 transition cursor-pointer"
              title="Minimize"
              aria-label="Minimize"
            >
              <IoRemove size={16} />
            </button>
            <button
              type="button"
              onClick={() => setMaximized((prev) => !prev)}
              className="flex h-8 w-11 items-center justify-center hover:bg-white/10 text-white/80 transition cursor-pointer"
              title={maximized ? "Restore" : "Maximize"}
              aria-label={maximized ? "Restore" : "Maximize"}
            >
              <IoSquareOutline size={12} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-11 items-center justify-center hover:bg-red-600 text-white/80 hover:text-white transition cursor-pointer"
              title="Close"
              aria-label="Close"
            >
              <IoClose size={18} />
            </button>
          </div>
        </div>

        {/* Windows 11 Command Bar / Action Toolbar */}
        <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-[#242424] px-3 py-1.5 shrink-0 select-none">
          {/* Left Action Buttons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Run new task */}
            <button
              type="button"
              onClick={() => setIsRunModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/10 transition cursor-pointer active:scale-95"
            >
              <IoPlayOutline size={14} className="text-emerald-400" />
              <span>Run new task</span>
            </button>

            {/* End task (Enabled when terminable process is selected) */}
            <button
              type="button"
              disabled={!selectedProcessId || !isSelectedOpen || isSelectedProtected}
              onClick={() => {
                if (selectedMeta) handleRequestEndTask(selectedMeta);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                selectedProcessId && isSelectedOpen && !isSelectedProtected
                  ? "bg-red-600/30 hover:bg-red-600/40 text-red-200 border-red-500/40 shadow-sm cursor-pointer active:scale-95"
                  : "bg-white/5 text-white/30 border-white/5 cursor-not-allowed"
              }`}
            >
              <IoStopCircleOutline size={15} />
              <span>End task</span>
            </button>
          </div>

          {/* Right Search Input Filter */}
          <div className="relative flex items-center w-40 sm:w-64">
            <div className="flex items-center w-full rounded-lg bg-black/40 border border-white/15 px-2.5 py-1 focus-within:border-[var(--accent-color,#0078d4)] focus-within:ring-1 focus-within:ring-[var(--accent-color,#0078d4)] transition">
              <IoSearchOutline className="text-white/40 text-xs mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search processes..."
                className="w-full bg-transparent text-xs text-white placeholder-white/30 outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-white/40 hover:text-white"
                >
                  <IoClose size={13} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Task Manager Body: Sidebar + Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Navigation Sidebar */}
          <TaskManagerSidebar
            activeSection={activeSection}
            onSelectSection={(sec) => setActiveSection(sec)}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            onOpenSettings={onOpenSettings}
          />

          {/* Main Tab View */}
          <main className="flex-1 overflow-hidden bg-[#1c1c1c]/90">
            {activeSection === "processes" && (
              <Processes
                searchQuery={searchQuery}
                selectedProcessId={selectedProcessId}
                onSelectProcess={(id) => setSelectedProcessId(id)}
                onRequestEndTask={handleRequestEndTask}
              />
            )}
            {activeSection === "performance" && <Performance />}
            {activeSection === "history" && (
              <AppHistory searchQuery={searchQuery} />
            )}
            {activeSection === "startup" && (
              <StartupApps searchQuery={searchQuery} />
            )}
            {activeSection === "users" && <Users searchQuery={searchQuery} />}
            {activeSection === "details" && (
              <Details
                searchQuery={searchQuery}
                selectedProcessId={selectedProcessId}
                onSelectProcess={(id) => setSelectedProcessId(id)}
                onRequestEndTask={handleRequestEndTask}
              />
            )}
            {activeSection === "services" && (
              <Services searchQuery={searchQuery} />
            )}
          </main>
        </div>

        {/* Bottom Windows Status Bar */}
        <div className="flex items-center justify-between border-t border-white/10 bg-[#191919] px-4 py-1 text-[11px] text-white/50 shrink-0 select-none">
          <div className="flex items-center gap-4">
            <span>Processes: 138</span>
            <span>CPU: {currentMetrics.cpu}%</span>
            <span>Memory: {Math.round((currentMetrics.memory / 16) * 100)}%</span>
            <span className="hidden sm:inline">Disk: {currentMetrics.disk}%</span>
            <span className="hidden md:inline">Network: {currentMetrics.network} Mbps</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/40">
            <span>Windows 11 Diagnostics</span>
          </div>
        </div>

        {/* In-App Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-9 right-5 z-50 pointer-events-none"
            >
              <div
                className={`flex items-center gap-2.5 rounded-xl border px-4 py-2.5 shadow-2xl backdrop-blur-xl text-white ${
                  toast.type === "error"
                    ? "border-red-500/40 bg-red-950/85 text-red-100"
                    : "border-cyan-400/40 bg-black/85 text-white"
                }`}
              >
                {toast.type === "error" ? (
                  <IoWarningOutline className="text-red-400 text-lg shrink-0" />
                ) : (
                  <IoCheckmarkCircle className="text-cyan-400 text-lg shrink-0" />
                )}
                <span className="text-xs font-semibold">{toast.message}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* End Task Confirmation Dialog */}
      <AnimatePresence>
        {confirmProcess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.16 }}
              className="relative w-full max-w-sm rounded-2xl border border-white/15 bg-[#222222] p-6 shadow-2xl text-white"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <IoWarningOutline size={22} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      End task?
                    </h3>
                    <p className="text-xs text-white/50">{confirmProcess.name}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setConfirmProcess(null)}
                  className="p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition cursor-pointer"
                >
                  <IoClose size={18} />
                </button>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs text-white/80 leading-relaxed">
                Are you sure you want to end{" "}
                <strong className="text-white">"{confirmProcess.name}"</strong>?
                <br />
                Unsaved work may be lost.
              </p>

              {/* Actions */}
              <div className="mt-6 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setConfirmProcess(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/15 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmEndTask}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-950/40 transition cursor-pointer"
                >
                  End task
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Run New Task Dialog */}
      <AnimatePresence>
        {isRunModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.16 }}
              className="relative w-full max-w-md rounded-2xl border border-white/15 bg-[#222222] p-6 shadow-2xl text-white"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <IoPlayOutline size={22} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Create new task
                    </h3>
                    <p className="text-xs text-white/50">Run application</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsRunModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition cursor-pointer"
                >
                  <IoClose size={18} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleRunSubmit} className="mt-4 space-y-4">
                <p className="text-xs text-white/70">
                  Type the name of a program (e.g. <code>chrome</code>,{" "}
                  <code>terminal</code>, <code>vscode</code>, <code>settings</code>
                  , <code>files</code>, <code>youtube</code>), and Windows will open
                  it for you.
                </p>

                <div className="flex items-center gap-2 rounded-xl bg-black/50 border border-white/20 px-3 py-2 focus-within:border-[var(--accent-color,#0078d4)] focus-within:ring-1 focus-within:ring-[var(--accent-color,#0078d4)]">
                  <span className="text-xs text-white/40">Open:</span>
                  <input
                    type="text"
                    value={runCommand}
                    onChange={(e) => setRunCommand(e.target.value)}
                    placeholder="chrome, terminal, vscode..."
                    autoFocus
                    className="w-full bg-transparent text-xs text-white placeholder-white/30 outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 text-xs text-white/70">
                  <input
                    type="checkbox"
                    id="admin-chk"
                    defaultChecked
                    className="rounded accent-[var(--accent-color,#0078d4)]"
                  />
                  <label htmlFor="admin-chk" className="cursor-pointer">
                    Create this task with administrative privileges
                  </label>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsRunModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/15 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-semibold bg-[var(--accent-color,#0078d4)] hover:brightness-110 text-white shadow-md transition cursor-pointer active:scale-95"
                  >
                    OK
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
