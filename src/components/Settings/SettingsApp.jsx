import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoClose,
  IoRemove,
  IoSquareOutline,
  IoChevronBack,
  IoSettingsSharp,
  IoCheckmarkCircle,
  IoMenuOutline,
} from "react-icons/io5";

import SettingsSidebar from "./SettingsSidebar";
import PersonalizationHome from "./Personalization/PersonalizationHome";
import BackgroundSettings from "./Personalization/BackgroundSettings";
import LockScreenSettings from "./Personalization/LockScreenSettings";
import ColorSettings from "./Personalization/ColorSettings";
import ThemeSettings from "./Personalization/ThemeSettings";
import PlaceholderSection from "./PlaceholderSection";
import ResetSettingsModal from "./ResetSettingsModal";
import { useSettings } from "../../hooks/useSettings";

export default function SettingsApp({
  onClose,
  onMinimize,
  onLockDesktop,
  mobile = false,
}) {
  const [maximized, setMaximized] = useState(false);
  const [activeSection, setActiveSection] = useState("personalization");
  const [subPage, setSubPage] = useState("home"); // "home" | "background" | "lockscreen" | "colors" | "themes"
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { toast, resetSettings } = useSettings();

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
            : "top-2 sm:top-8 md:top-10 left-1/2 -translate-x-1/2 w-[96vw] sm:w-[92vw] max-w-5xl h-[92vh] sm:h-[86vh] rounded-xl sm:rounded-2xl"
        }`}
      >
        {/* Windows 11 Title Bar */}
        <div className="flex h-10 shrink-0 items-center justify-between border-b border-white/10 bg-[#1c1c1c] px-3 select-none">
          {/* Left Title and Navigation */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Hamburger button on mobile / narrow screens */}
            <button
              type="button"
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="flex items-center justify-center p-1 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition cursor-pointer md:hidden"
              title="Toggle navigation categories"
              aria-label="Toggle navigation categories"
            >
              <IoMenuOutline size={18} />
            </button>

            {subPage !== "home" && (
              <button
                type="button"
                onClick={() => setSubPage("home")}
                className="flex items-center justify-center p-1 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition cursor-pointer"
                title="Back to Personalization"
              >
                <IoChevronBack size={16} />
              </button>
            )}

            <div className="flex items-center gap-2">
              <IoSettingsSharp className="text-cyan-400 text-sm shrink-0" />
              <span className="text-xs font-semibold tracking-wide text-white/90">
                Settings
              </span>
            </div>
          </div>

          {/* Window Control Buttons */}
          <div className="flex items-center">
            {!mobile && (
              <>
                <button
                  type="button"
                  onClick={onMinimize || onClose}
                  className="flex h-8 w-10 sm:w-11 items-center justify-center hover:bg-white/10 text-white/80 transition cursor-pointer"
                  title="Minimize"
                  aria-label="Minimize"
                >
                  <IoRemove size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setMaximized((prev) => !prev)}
                  className="flex h-8 w-10 sm:w-11 items-center justify-center hover:bg-white/10 text-white/80 transition cursor-pointer"
                  title={maximized ? "Restore" : "Maximize"}
                  aria-label={maximized ? "Restore" : "Maximize"}
                >
                  <IoSquareOutline size={12} />
                </button>
              </>
            )}
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-10 sm:w-11 items-center justify-center hover:bg-red-600 text-white/80 hover:text-white transition cursor-pointer"
              title="Close"
              aria-label="Close"
            >
              <IoClose size={18} />
            </button>
          </div>
        </div>

        {/* Windows 11 Settings Body: Sidebar + Main Content */}
        <div className="relative flex-1 flex overflow-hidden">
          {/* Mobile backdrop overlay when sidebar is open */}
          {sidebarOpen && (
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden transition-opacity"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close navigation overlay"
            />
          )}

          {/* Left Sidebar Drawer / Pinned Panel */}
          <div
            className={`absolute md:relative inset-y-0 left-0 z-40 md:z-auto transition-transform duration-200 ease-out h-full ${
              sidebarOpen
                ? "translate-x-0 shadow-2xl"
                : "-translate-x-full md:translate-x-0"
            }`}
          >
            <SettingsSidebar
              activeSection={activeSection}
              onSelectSection={(sec) => {
                setActiveSection(sec);
                setSubPage("home");
                setSidebarOpen(false);
              }}
              onNavigateSubPage={(page) => {
                setSubPage(page);
                setSidebarOpen(false);
              }}
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
          </div>

          {/* Main Settings Content Area */}
          <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {activeSection === "personalization" ? (
              <>
                {subPage === "home" && (
                  <PersonalizationHome
                    onNavigate={(page) => setSubPage(page)}
                    onOpenResetModal={() => setIsResetOpen(true)}
                  />
                )}
                {subPage === "background" && (
                  <BackgroundSettings onBack={() => setSubPage("home")} />
                )}
                {subPage === "lockscreen" && (
                  <LockScreenSettings
                    onBack={() => setSubPage("home")}
                    onLockDesktop={onLockDesktop}
                  />
                )}
                {subPage === "colors" && (
                  <ColorSettings onBack={() => setSubPage("home")} />
                )}
                {subPage === "themes" && (
                  <ThemeSettings onBack={() => setSubPage("home")} />
                )}
              </>
            ) : (
              <PlaceholderSection sectionId={activeSection} />
            )}
          </main>
        </div>

        {/* In-App Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-5 right-5 z-50 pointer-events-none"
            >
              <div className="flex items-center gap-2.5 rounded-xl border border-cyan-400/40 bg-black/85 px-4 py-2.5 shadow-2xl backdrop-blur-xl text-white">
                <IoCheckmarkCircle className="text-cyan-400 text-lg shrink-0" />
                <span className="text-xs font-semibold text-white/90">
                  {toast.message}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Reset Confirmation Dialog */}
      <ResetSettingsModal
        isOpen={isResetOpen}
        onClose={() => setIsResetOpen(false)}
        onConfirm={resetSettings}
      />
    </>
  );
}
