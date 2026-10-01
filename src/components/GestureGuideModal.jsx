import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  IoClose,
  IoHandLeftOutline,
  IoDesktopOutline,
  IoCheckmarkCircle,
  IoArrowForward,
  IoArrowUp,
} from "react-icons/io5";

function GestureGuideModal({
  isOpen,
  onClose,
  activeWorkspace,
  workspaces,
  onSelectWorkspace,
}) {
  const [touchCount, setTouchCount] = useState(0);
  const [lastGesture, setLastGesture] = useState("None yet — swipe 2 fingers on the pad below!");
  const [testDeltaX, setTestDeltaX] = useState(0);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const testPadRef = useRef(null);

  useEffect(() => {
    const pad = testPadRef.current;
    if (!pad) return;

    let startX = 0;
    let isTracking = false;

    const onTouchStart = (e) => {
      setTouchCount(e.touches.length);
      if (e.touches.length === 2) {
        isTracking = true;
        startX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      }
    };

    const onTouchMove = (e) => {
      setTouchCount(e.touches.length);
      if (!isTracking || e.touches.length !== 2) return;
      if (e.cancelable) e.preventDefault();

      const curX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const dx = curX - startX;
      setTestDeltaX(Math.round(dx));
    };

    const onTouchEnd = (e) => {
      setTouchCount(e.touches.length);
      if (!isTracking) return;
      isTracking = false;

      if (e.changedTouches.length > 0) {
        let endX = 0;
        for (let i = 0; i < e.changedTouches.length; i++) {
          endX += e.changedTouches[i].clientX;
        }
        endX /= e.changedTouches.length;

        const deltaX = endX - startX;

        if (Math.abs(deltaX) > 35) {
          if (deltaX < 0) {
            setLastGesture("Detected: 2-Finger Swipe Left → Next Desktop!");
            setFeedbackSuccess(true);
            const next = Math.min(workspaces.length - 1, activeWorkspace + 1);
            onSelectWorkspace(next);
          } else {
            setLastGesture("Detected: 2-Finger Swipe Right → Previous Desktop!");
            setFeedbackSuccess(true);
            const prev = Math.max(0, activeWorkspace - 1);
            onSelectWorkspace(prev);
          }
        }
      }

      setTimeout(() => setFeedbackSuccess(false), 2000);
    };

    const onWheel = (e) => {
      if (Math.abs(e.deltaX) > 15) {
        setTestDeltaX(Math.round(e.deltaX));
        if (e.deltaX > 25) {
          setLastGesture("Detected: 2-Finger Trackpad Swipe Left → Next Desktop!");
          setFeedbackSuccess(true);
          const next = Math.min(workspaces.length - 1, activeWorkspace + 1);
          onSelectWorkspace(next);
        } else if (e.deltaX < -25) {
          setLastGesture("Detected: 2-Finger Trackpad Swipe Right → Previous Desktop!");
          setFeedbackSuccess(true);
          const prev = Math.max(0, activeWorkspace - 1);
          onSelectWorkspace(prev);
        }
        setTimeout(() => setFeedbackSuccess(false), 2000);
      }
    };

    pad.addEventListener("touchstart", onTouchStart, { passive: false });
    pad.addEventListener("touchmove", onTouchMove, { passive: false });
    pad.addEventListener("touchend", onTouchEnd, { passive: true });
    pad.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      pad.removeEventListener("touchstart", onTouchStart);
      pad.removeEventListener("touchmove", onTouchMove);
      pad.removeEventListener("touchend", onTouchEnd);
      pad.removeEventListener("wheel", onWheel);
    };
  }, [activeWorkspace, workspaces.length, onSelectWorkspace]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#020b14]/75 backdrop-blur-xl p-4 select-none"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
        className="relative w-full max-w-xl rounded-3xl border border-cyan-400/35 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.22),_rgba(3,14,27,0.95)_80%)] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.85),0_0_40px_rgba(6,182,212,0.3)] text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-cyan-500/25">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
              <IoHandLeftOutline size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-cyan-100">
                2-Finger Touchpad & Trackpad Gestures
              </h2>
              <p className="text-xs text-cyan-300/60">
                Seamless Desktop Space Switching
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-cyan-500/20 text-cyan-300/60 hover:text-cyan-100 transition cursor-pointer"
          >
            <IoClose size={20} />
          </button>
        </div>

        {/* Gestures List */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/25">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 font-bold shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.25)]">
              <IoArrowForward size={16} />
            </div>
            <div>
              <span className="font-semibold text-cyan-100 block">
                2-Finger Swipe Left / Right
              </span>
              <p className="text-cyan-200/60 text-[11px] mt-0.5">
                Default: 2-finger horizontal swipe smoothly glides between Desktop 1, 2, 3, and 4.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/25">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-300 font-bold shrink-0">
              <IoDesktopOutline size={16} />
            </div>
            <div>
              <span className="font-semibold text-cyan-100 block">
                Trackpad Horizontal Scroll
              </span>
              <p className="text-cyan-200/60 text-[11px] mt-0.5">
                Standard 2-finger horizontal pan on any laptop trackpad switches desktop spaces.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/25">
            <div className="p-2 rounded-xl bg-teal-500/20 text-teal-300 font-bold shrink-0">
              <IoArrowUp size={16} />
            </div>
            <div>
              <span className="font-semibold text-cyan-100 block">
                Dock Switcher Buttons
              </span>
              <p className="text-cyan-200/60 text-[11px] mt-0.5">
                Click any of the <code className="bg-cyan-900/40 px-1 rounded text-cyan-300 text-[10px]">1  2  3  4</code> pills in your Dock.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/25">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 font-bold shrink-0">
              ⌨️
            </div>
            <div>
              <span className="font-semibold text-cyan-100 block">
                Keyboard Shortcuts
              </span>
              <p className="text-cyan-200/60 text-[11px] mt-0.5">
                <code className="bg-cyan-900/40 px-1 rounded text-cyan-300 text-[10px]">Ctrl+Alt+←/→</code> or{" "}
                <code className="bg-cyan-900/40 px-1 rounded text-cyan-300 text-[10px]">Alt+1..4</code>.
              </p>
            </div>
          </div>
        </div>

        {/* Live Touchpad / Trackpad Interactive Test Pad */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300/70">
              Interactive 2-Finger Test Pad
            </span>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-cyan-300/50">Touches:</span>
              <span
                className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
                  touchCount === 2
                    ? "bg-cyan-400 text-slate-950 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                    : touchCount > 0
                    ? "bg-amber-500/30 text-amber-300"
                    : "bg-cyan-950/50 text-cyan-300/50 border border-cyan-500/20"
                }`}
              >
                {touchCount} {touchCount === 2 ? "✓ 2-Fingers (Default)" : "fingers"}
              </span>
            </div>
          </div>

          <div
            ref={testPadRef}
            className={`relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed transition-all cursor-grab active:cursor-grabbing select-none ${
              feedbackSuccess
                ? "border-cyan-400 bg-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                : "border-cyan-500/30 bg-cyan-950/30 hover:border-cyan-400/50"
            }`}
          >
            {feedbackSuccess ? (
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                <IoCheckmarkCircle size={22} className="text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]" />
                <span>2-Finger Gesture Recognized! Switching desktop...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center">
                <IoHandLeftOutline className="text-3xl text-cyan-400/50 mb-1" />
                <span className="text-xs font-semibold text-cyan-100">
                  Swipe with 2 fingers or scroll trackpad horizontally here!
                </span>
                <span className="text-[11px] text-cyan-300/60 mt-1 max-w-sm">
                  {lastGesture}
                </span>
                {testDeltaX !== 0 && (
                  <span className="text-[10px] text-cyan-300 font-mono mt-1 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
                    Live Swipe DeltaX: {testDeltaX > 0 ? `+${testDeltaX}` : testDeltaX}px
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Current Desktop Status & Quick Jump */}
        <div className="mt-4 pt-3 border-t border-cyan-500/25 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-cyan-200/70">
            <span>Current:</span>
            <span className="font-semibold text-cyan-100">
              {workspaces[activeWorkspace]?.name} ({workspaces[activeWorkspace]?.label})
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {workspaces.map((ws, i) => (
              <button
                key={ws.id}
                type="button"
                onClick={() => onSelectWorkspace(i)}
                className={`h-7 px-2.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  i === activeWorkspace
                    ? "bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-950 font-black shadow-[0_0_12px_rgba(6,182,212,0.8)]"
                    : "bg-cyan-950/40 hover:bg-cyan-500/20 text-cyan-200/70 border border-cyan-500/20"
                }`}
              >
                {ws.shortName}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default GestureGuideModal;
