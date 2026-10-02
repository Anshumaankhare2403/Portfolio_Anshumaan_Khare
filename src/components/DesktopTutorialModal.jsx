import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoClose,
  IoHandLeftOutline,
  IoDesktopOutline,
  IoArrowForward,
  IoArrowBack,
  IoCheckmarkCircle,
  IoSparklesOutline,
  IoAppsOutline,
} from "react-icons/io5";

const TUTORIAL_STEPS = [
  {
    id: "intro",
    badge: "Step 1 of 4",
    title: "Welcome to Multiple Desktops",
    subtitle: "Organize your workflow across 4 independent spaces",
    description:
      "Just like modern desktop OS environments, you now have 4 dedicated desktop spaces. Keep your development tools in Desktop 2, media in Desktop 3, and portfolio apps in Desktop 1 without clutter.",
    icon: IoDesktopOutline,
    previewType: "spaces",
  },
  {
    id: "gesture",
    badge: "Step 2 of 4",
    title: "2-Finger Touchpad Gesture",
    subtitle: "Effortless desktop switching with a simple swipe",
    description:
      "Swipe horizontally with 2 fingers on your laptop trackpad or touchscreen. Swiping left slides to the next desktop, and swiping right takes you back — with silky smooth 60fps animations.",
    icon: IoHandLeftOutline,
    previewType: "gesture",
  },
  {
    id: "dock",
    badge: "Step 3 of 4",
    title: "Dock Switcher & Smart Badges",
    subtitle: "One-click jumping and cross-desktop app navigation",
    description:
      "Use the luminous `1  2  3  4` switcher in your bottom Dock anytime. If an app is running on another desktop space, its icon will show a glowing badge — click it to automatically glide to that space.",
    icon: IoAppsOutline,
    previewType: "dock",
  },
  {
    id: "ready",
    badge: "Step 4 of 4",
    title: "You're All Set!",
    subtitle: "Keyboard shortcuts and tips for power users",
    description:
      "You can also use Ctrl+Alt+←/→ or Alt+1..4 to jump across spaces. You can re-open this tutorial or the live gesture tester at any time by clicking the 👆 gesture icon in your Dock.",
    icon: IoSparklesOutline,
    previewType: "shortcuts",
  },
];

function DesktopTutorialModal({
  isOpen,
  onClose,
  workspaces = [],
  activeWorkspace = 0,
  onSelectWorkspace = () => {},
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [dontShowAgain, setDontShowAgain] = useState(true);

  if (!isOpen) return null;

  const step = TUTORIAL_STEPS[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === TUTORIAL_STEPS.length - 1;

  const handleNext = () => {
    if (isLast) {
      onClose(dontShowAgain);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    onClose(dontShowAgain);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xl p-4 select-none"
      onClick={handleSkip}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 15 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/20 bg-slate-950/75 backdrop-blur-2xl p-6 shadow-[0_25px_80px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.2)] text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header: Step Badge & Skip Button */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-white/10 text-white/90 border border-white/20 shadow-sm backdrop-blur-md">
              {step.badge}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Skip Tutorial Button */}
            <button
              type="button"
              onClick={handleSkip}
              className="px-3 py-1 rounded-xl text-xs font-semibold text-white/70 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20 transition cursor-pointer"
            >
              Skip Tutorial
            </button>

            <button
              type="button"
              onClick={handleSkip}
              className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition cursor-pointer"
              title="Close Tutorial"
            >
              <IoClose size={18} />
            </button>
          </div>
        </div>

        {/* Dynamic Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.22 }}
            className="my-5"
          >
            {/* Step Icon & Title */}
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white border border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] backdrop-blur-md shrink-0">
                <step.icon size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight leading-tight">
                  {step.title}
                </h3>
                <p className="text-xs text-white/60">{step.subtitle}</p>
              </div>
            </div>

            <p className="text-xs text-white/80 leading-relaxed mb-4">
              {step.description}
            </p>

            {/* Visual Mini-Preview depending on step */}
            <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-4 shadow-inner shadow-black/40 backdrop-blur-md flex flex-col items-center justify-center min-h-[120px]">
              {step.previewType === "spaces" && (
                <div className="w-full flex items-center justify-center gap-2">
                  {workspaces.map((ws, i) => (
                    <button
                      key={ws.id}
                      type="button"
                      onClick={() => onSelectWorkspace(i)}
                      className={`flex-1 flex flex-col items-center justify-center p-2 rounded-xl border transition-all cursor-pointer ${
                        i === activeWorkspace
                          ? "bg-white/20 border-white/40 text-white shadow-[0_4px_16px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] scale-105"
                          : "bg-white/[0.04] border-white/10 hover:border-white/20 text-white/60 hover:text-white hover:bg-white/[0.08]"
                      }`}
                    >
                      <span className="text-xs font-bold text-white">
                        Space {i + 1}
                      </span>
                      <span className="text-[10px] text-white/70 truncate max-w-full">
                        {ws.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {step.previewType === "gesture" && (
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center gap-3 text-white mb-2">
                    <IoHandLeftOutline className="text-3xl animate-bounce" />
                    <span className="text-2xl font-mono text-white/80">↔</span>
                    <span className="text-xs font-bold bg-white/15 px-2 py-1 rounded-lg border border-white/25 shadow-sm text-white">
                      2 FINGERS
                    </span>
                  </div>
                  <span className="text-xs text-white font-medium">
                    Swipe left or right across your touchpad
                  </span>
                  <span className="text-[11px] text-white/60 mt-0.5">
                    Try swiping right now to experience the smooth slide!
                  </span>
                </div>
              )}

              {step.previewType === "dock" && (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2 bg-black/60 px-4 py-2 rounded-2xl border border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-xl">
                    <span className="text-[11px] font-bold text-white/80 mr-1">Dock:</span>
                    {["1", "2", "3", "4"].map((n, i) => (
                      <div
                        key={n}
                        className={`h-7 w-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                          i === activeWorkspace
                            ? "bg-white text-slate-950 font-bold shadow-md"
                            : "bg-white/10 text-white/60 border border-white/10"
                        }`}
                      >
                        {n}
                      </div>
                    ))}
                  </div>
                  <span className="text-[11px] text-white/60">
                    Always accessible at the bottom of your screen
                  </span>
                </div>
              )}

              {step.previewType === "shortcuts" && (
                <div className="grid grid-cols-2 gap-2 w-full text-xs">
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.05] border border-white/10">
                    <span className="font-mono bg-white/15 px-1.5 py-0.5 rounded text-white text-[10px] border border-white/15">
                      Ctrl+Alt+←/→
                    </span>
                    <span className="text-[11px] text-white/80">Next / Prev</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.05] border border-white/10">
                    <span className="font-mono bg-white/15 px-1.5 py-0.5 rounded text-white text-[10px] border border-white/15">
                      Alt + 1..4
                    </span>
                    <span className="text-[11px] text-white/80">Jump to Space</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer: Progress Dots, Checkbox, & Navigation Buttons */}
        <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            {/* Step Progress Indicators */}
            <div className="flex items-center gap-1.5">
              {TUTORIAL_STEPS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentStep(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    i === currentStep
                      ? "w-6 bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)]"
                      : "w-2 bg-white/20 hover:bg-white/40 border border-white/10"
                  }`}
                  title={`Go to Step ${i + 1}`}
                />
              ))}
            </div>

            {/* "Don't show again" Checkbox */}
            <label className="flex items-center gap-1.5 text-[11px] text-white/70 hover:text-white cursor-pointer">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="rounded accent-slate-400 cursor-pointer"
              />
              <span>Don't show again</span>
            </label>
          </div>

          <div className="flex items-center justify-between">
            {/* Back button */}
            <button
              type="button"
              onClick={handlePrev}
              disabled={isFirst}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                isFirst
                  ? "opacity-30 cursor-not-allowed text-white/40"
                  : "text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
              }`}
            >
              <IoArrowBack size={14} />
              <span>Back</span>
            </button>

            {/* Next or Done button */}
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-white text-slate-950 shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:bg-white/90 active:scale-95 transition cursor-pointer"
            >
              {isLast ? (
                <>
                  <IoCheckmarkCircle size={16} />
                  <span>Start Exploring Desktops</span>
                </>
              ) : (
                <>
                  <span>Next Step</span>
                  <IoArrowForward size={14} />
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default DesktopTutorialModal;
