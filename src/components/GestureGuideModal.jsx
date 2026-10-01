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
  const [lastGesture, setLastGesture] = useState("None yet — swipe on the pad below!");
  const [testDeltaX, setTestDeltaX] = useState(0);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const testPadRef = useRef(null);

  useEffect(() => {
    const pad = testPadRef.current;
    if (!pad) return;

    let startX = 0;
    let startY = 0;
    let isTracking = false;

    const onTouchStart = (e) => {
      setTouchCount(e.touches.length);
      if (e.touches.length === 5) {
        isTracking = true;
        let totalX = 0;
        let totalY = 0;
        for (let i = 0; i < 5; i++) {
          totalX += e.touches[i].clientX;
          totalY += e.touches[i].clientY;
        }
        startX = totalX / 5;
        startY = totalY / 5;
      }
    };

    const onTouchMove = (e) => {
      setTouchCount(e.touches.length);
      if (!isTracking || e.touches.length !== 5) return;
      if (e.cancelable) e.preventDefault();

      let totalX = 0;
      for (let i = 0; i < 5; i++) {
        totalX += e.touches[i].clientX;
      }
      const curX = totalX / 5;
      const dx = curX - startX;
      setTestDeltaX(Math.round(dx));
    };

    const onTouchEnd = (e) => {
      setTouchCount(e.touches.length);
      if (!isTracking) return;
      isTracking = false;

      if (e.changedTouches.length > 0) {
        let endX = 0;
        let endY = 0;
        for (let i = 0; i < e.changedTouches.length; i++) {
          endX += e.changedTouches[i].clientX;
          endY += e.changedTouches[i].clientY;
        }
        endX /= e.changedTouches.length;
        endY /= e.changedTouches.length;

        const deltaX = endX - startX;
        const deltaY = endY - startY;

        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
          if (deltaX < 0) {
            setLastGesture("Detected: 5-Finger Swipe Left → Next Desktop!");
            setFeedbackSuccess(true);
            const next = Math.min(workspaces.length - 1, activeWorkspace + 1);
            onSelectWorkspace(next);
          } else {
            setLastGesture("Detected: 5-Finger Swipe Right → Previous Desktop!");
            setFeedbackSuccess(true);
            const prev = Math.max(0, activeWorkspace - 1);
            onSelectWorkspace(prev);
          }
        } else if (Math.abs(deltaY) > 40) {
          setLastGesture(deltaY < 0 ? "Detected: 5-Finger Swipe Up!" : "Detected: 5-Finger Swipe Down!");
          setFeedbackSuccess(true);
        }
      }

      setTimeout(() => setFeedbackSuccess(false), 2000);
    };

    const onWheel = (e) => {
      if (Math.abs(e.deltaX) > 15) {
        setTestDeltaX(Math.round(e.deltaX));
        if (e.deltaX > 30) {
          setLastGesture("Detected: Trackpad Swipe Left (deltaX > 0) → Next Desktop!");
          setFeedbackSuccess(true);
          const next = Math.min(workspaces.length - 1, activeWorkspace + 1);
          onSelectWorkspace(next);
        } else if (e.deltaX < -30) {
          setLastGesture("Detected: Trackpad Swipe Right (deltaX < 0) → Previous Desktop!");
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xl p-4 select-none"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
        className="relative w-full max-w-xl rounded-3xl border border-white/20 bg-slate-950/90 p-6 shadow-2xl text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/40">
              <IoHandLeftOutline size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                5-Finger Touchpad & Trackpad Gestures
              </h2>
              <p className="text-xs text-white/50">
                Switch Desktop Spaces with 5-Finger Swipes
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/15 text-white/50 hover:text-white transition cursor-pointer"
          >
            <IoClose size={20} />
          </button>
        </div>

        {/* Gestures List */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/[0.05] border border-white/10">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 font-bold shrink-0">
              <IoArrowForward size={16} />
            </div>
            <div>
              <span className="font-semibold text-white block">
                5-Finger Swipe Left / Right
              </span>
              <p className="text-white/60 text-[11px] mt-0.5">
                Smoothly switches between Desktop 1, 2, 3, and 4.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/[0.05] border border-white/10">
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 font-bold shrink-0">
              <IoArrowUp size={16} />
            </div>
            <div>
              <span className="font-semibold text-white block">
                5-Finger Swipe Up / Down
              </span>
              <p className="text-white/60 text-[11px] mt-0.5">
                Vertical 5-finger gesture feedback and space navigation.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/[0.05] border border-white/10">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold shrink-0">
              <IoDesktopOutline size={16} />
            </div>
            <div>
              <span className="font-semibold text-white block">
                Trackpad Horizontal Swipe
              </span>
              <p className="text-white/60 text-[11px] mt-0.5">
                Horizontal trackpad scroll on your laptop switches desktop spaces.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/[0.05] border border-white/10">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 font-bold shrink-0">
              ⌨️
            </div>
            <div>
              <span className="font-semibold text-white block">
                Keyboard Shortcuts
              </span>
              <p className="text-white/60 text-[11px] mt-0.5">
                <code className="bg-white/10 px-1 rounded text-[10px]">Ctrl+Alt+←/→</code> or{" "}
                <code className="bg-white/10 px-1 rounded text-[10px]">Alt+1..4</code>.
              </p>
            </div>
          </div>
        </div>

        {/* Live Touchpad / Trackpad Interactive Test Pad */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
              Interactive Gesture Test Pad
            </span>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-white/50">Touches:</span>
              <span
                className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
                  touchCount === 5
                    ? "bg-emerald-500 text-white"
                    : touchCount > 0
                    ? "bg-amber-500/30 text-amber-300"
                    : "bg-white/10 text-white/50"
                }`}
              >
                {touchCount} {touchCount === 5 ? "✓ 5-Fingers" : "fingers"}
              </span>
            </div>
          </div>

          <div
            ref={testPadRef}
            className={`relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed transition-all cursor-grab active:cursor-grabbing select-none ${
              feedbackSuccess
                ? "border-emerald-500 bg-emerald-500/15"
                : "border-white/20 bg-white/[0.03] hover:border-white/40"
            }`}
          >
            {feedbackSuccess ? (
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <IoCheckmarkCircle size={22} />
                <span>Gesture Recognized! Switching desktop...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center">
                <IoHandLeftOutline className="text-3xl text-white/40 mb-1" />
                <span className="text-xs font-semibold text-white/90">
                  Swipe with 5 fingers or scroll trackpad horizontally here!
                </span>
                <span className="text-[11px] text-white/50 mt-1 max-w-sm">
                  {lastGesture}
                </span>
                {testDeltaX !== 0 && (
                  <span className="text-[10px] text-emerald-400 font-mono mt-1">
                    Live Swipe DeltaX: {testDeltaX > 0 ? `+${testDeltaX}` : testDeltaX}px
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Current Desktop Status & Quick Jump */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-white/70">
            <span>Current:</span>
            <span className="font-semibold text-white">
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
                    ? "bg-sky-500 text-white shadow-[0_0_10px_rgba(14,165,233,0.8)]"
                    : "bg-white/10 hover:bg-white/20 text-white/60"
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
