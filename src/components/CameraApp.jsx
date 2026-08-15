import { useEffect, useRef, useState, useCallback } from "react";
import {
  IoChevronBack,
  IoFlash,
  IoFlashOff,
  IoCameraReverse,
  IoVideocam,
  IoGridOutline,
  IoDownloadOutline,
  IoTrashOutline,
  IoClose,
  IoRefreshOutline,
  IoImageOutline,
} from "react-icons/io5";

export default function CameraApp({ onClose }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  const [stream, setStream] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [facingMode, setFacingMode] = useState("user"); // "user" | "environment"
  const [flashOn, setFlashOn] = useState(false);
  const [gridOn, setGridOn] = useState(false);
  const [cameraMode, setCameraMode] = useState("PHOTO"); // "PHOTO" | "VIDEO" | "PORTRAIT"
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [flashTriggered, setFlashTriggered] = useState(false);
  const [focusPos, setFocusPos] = useState(null);

  // Gallery state
  const [gallery, setGallery] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [showGalleryModal, setShowGalleryModal] = useState(false);

  // Play shutter audio click using Web Audio API
  const playShutterSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (err) {
      // Audio playback might be restricted or unsupported
    }
  };

  // Start Camera Stream
  const initCamera = useCallback(async () => {
    setCameraError(null);

    // Stop existing stream tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError("Camera API is not supported on this browser/device.");
      return;
    }

    try {
      let newStream;
      try {
        newStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: facingMode,
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: cameraMode === "VIDEO",
        });
      } catch (err) {
        // Fallback constraint if detailed constraints fail
        newStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facingMode },
          audio: cameraMode === "VIDEO",
        });
      }

      streamRef.current = newStream;
      setStream(newStream);

      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (err) {
      console.error("Camera access error:", err);
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        setCameraError("Camera permission denied. Please allow camera access in browser settings.");
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        setCameraError("No camera device found on this system.");
      } else {
        setCameraError(err.message || "Failed to access camera.");
      }
    }
  }, [facingMode, cameraMode]);

  useEffect(() => {
    initCamera();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [initCamera]);

  // Handle Recording Timer
  useEffect(() => {
    let timer;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  // Flip Camera
  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  // Tap-to-focus animation
  const handleViewportClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setFocusPos({ x, y });
    setTimeout(() => setFocusPos(null), 1200);
  };

  // Capture Photo
  const capturePhoto = () => {
    if (!videoRef.current) return;

    playShutterSound();
    setFlashTriggered(true);
    setTimeout(() => setFlashTriggered(false), 200);

    const videoEl = videoRef.current;
    const width = videoEl.videoWidth || 1280;
    const height = videoEl.videoHeight || 720;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    // Mirror image if selfie (front camera)
    if (facingMode === "user") {
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(videoEl, 0, 0, width, height);

    // Apply portrait blur/vignette effect if PORTRAIT mode
    if (cameraMode === "PORTRAIT") {
      ctx.fillStyle = "rgba(0,0,0,0.1)";
      ctx.fillRect(0, 0, width, height);
    }

    const photoUrl = canvas.toDataURL("image/jpeg", 0.95);
    const newMedia = {
      id: Date.now(),
      type: "photo",
      url: photoUrl,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setGallery((prev) => [newMedia, ...prev]);
  };

  // Toggle Video Recording
  const toggleRecording = () => {
    if (isRecording) {
      // Stop Recording
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
    } else {
      // Start Recording
      if (!streamRef.current) return;
      recordedChunksRef.current = [];

      try {
        const options = { mimeType: "video/webm;codecs=vp9,opus" };
        let mediaRecorder;
        try {
          mediaRecorder = new MediaRecorder(streamRef.current, options);
        } catch (e) {
          mediaRecorder = new MediaRecorder(streamRef.current);
        }

        mediaRecorder.ondataavailable = (event) => {
          if (event.data && event.data.size > 0) {
            recordedChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
          const videoUrl = URL.createObjectURL(blob);
          const newMedia = {
            id: Date.now(),
            type: "video",
            url: videoUrl,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          };
          setGallery((prev) => [newMedia, ...prev]);
        };

        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Failed to start MediaRecorder:", err);
        setCameraError("Video recording is not supported on this browser.");
      }
    }
  };

  // Action Shutter Button
  const handleShutterClick = () => {
    if (cameraMode === "VIDEO") {
      toggleRecording();
    } else {
      capturePhoto();
    }
  };

  const deleteMedia = (id) => {
    setGallery((prev) => prev.filter((item) => item.id !== id));
    if (selectedMedia && selectedMedia.id === id) {
      setSelectedMedia(null);
    }
  };

  const latestCapture = gallery[0];

  const formatSecs = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black text-white select-none">
      {/* Top Bar Controls */}
      <div className="flex h-14 items-center justify-between border-b border-white/10 bg-black/80 px-4 z-20">
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-white/20 active:scale-95"
        >
          <IoChevronBack size={18} />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-3">
          {isRecording && (
            <div className="flex items-center gap-2 rounded-full bg-red-600/90 px-3 py-1 text-xs font-mono font-bold animate-pulse">
              <span className="h-2 w-2 rounded-full bg-white animate-ping" />
              <span>{formatSecs(recordingTime)}</span>
            </div>
          )}
          <span className="text-xs font-bold tracking-widest text-white/80 uppercase">
            {cameraMode}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Grid Toggle */}
          <button
            onClick={() => setGridOn((prev) => !prev)}
            className={`p-2 rounded-full transition ${gridOn ? "text-emerald-400 bg-emerald-400/20" : "text-white/80 hover:bg-white/10"}`}
            title="Toggle Grid Lines"
          >
            <IoGridOutline size={18} />
          </button>

          {/* Flash Toggle */}
          <button
            onClick={() => setFlashOn((prev) => !prev)}
            className={`p-2 rounded-full transition ${flashOn ? "text-yellow-400 bg-yellow-400/20" : "text-white/80 hover:bg-white/10"}`}
            title="Toggle Flash"
          >
            {flashOn ? <IoFlash size={18} /> : <IoFlashOff size={18} />}
          </button>
        </div>
      </div>

      {/* Main Viewfinder Area */}
      <div
        onClick={handleViewportClick}
        className="relative flex-1 bg-black flex items-center justify-center overflow-hidden cursor-crosshair"
      >
        {/* Flash Overlay when photo taken or flash is ON */}
        {(flashTriggered || (flashOn && cameraMode === "PHOTO" && flashTriggered)) && (
          <div className="absolute inset-0 z-30 bg-white transition-opacity duration-150 pointer-events-none" />
        )}

        {/* Live Camera Stream */}
        {!cameraError ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`h-full w-full object-cover transition-transform duration-300 ${
              facingMode === "user" ? "scale-x-[-1]" : ""
            }`}
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center max-w-sm">
            <div className="h-16 w-16 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center mb-4">
              <IoVideocam size={32} className="text-red-400" />
            </div>
            <p className="text-sm font-semibold text-gray-200 mb-2">{cameraError}</p>
            <p className="text-xs text-gray-400 mb-5">
              Make sure camera permissions are granted in your browser address bar.
            </p>
            <button
              onClick={initCamera}
              className="flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2 text-xs font-bold text-white hover:bg-white/25 active:scale-95 transition"
            >
              <IoRefreshOutline size={16} />
              <span>Retry Camera</span>
            </button>
          </div>
        )}

        {/* Grid Overlay */}
        {gridOn && !cameraError && (
          <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 border border-white/10">
            <div className="border border-white/10" />
            <div className="border border-white/10" />
            <div className="border border-white/10" />
            <div className="border border-white/10" />
            <div className="border border-white/10" />
            <div className="border border-white/10" />
            <div className="border border-white/10" />
            <div className="border border-white/10" />
            <div className="border border-white/10" />
          </div>
        )}

        {/* Tap to Focus Indicator */}
        {focusPos && (
          <div
            className="absolute z-20 h-16 w-16 border-2 border-yellow-400 rounded-full animate-ping pointer-events-none"
            style={{
              top: focusPos.y - 32,
              left: focusPos.x - 32,
            }}
          />
        )}

        {/* Mode Label Overlay */}
        {cameraMode === "PORTRAIT" && !cameraError && (
          <div className="absolute bottom-4 rounded-full bg-black/50 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-yellow-400 border border-yellow-400/30">
            Portrait Depth Enabled
          </div>
        )}
      </div>

      {/* Bottom Camera Dock */}
      <div className="flex flex-col items-center bg-black/90 pb-8 pt-3 px-6 gap-4 z-20 border-t border-white/10">
        {/* Camera Modes Picker */}
        <div className="flex gap-8 text-xs font-bold tracking-widest text-gray-400">
          {["PHOTO", "VIDEO", "PORTRAIT"].map((mode) => (
            <button
              key={mode}
              onClick={() => {
                if (isRecording) toggleRecording();
                setCameraMode(mode);
              }}
              className={`transition-colors py-1 ${
                cameraMode === mode
                  ? "text-yellow-400 border-b-2 border-yellow-400 font-extrabold"
                  : "hover:text-gray-200"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Bottom Action Controls */}
        <div className="flex items-center justify-between w-full max-w-xs px-2">
          {/* Gallery Thumbnail Preview */}
          <button
            onClick={() => {
              if (gallery.length > 0) {
                setSelectedMedia(gallery[0]);
                setShowGalleryModal(true);
              }
            }}
            className={`h-12 w-12 rounded-xl overflow-hidden border-2 transition-transform active:scale-95 ${
              gallery.length > 0
                ? "border-white/60 shadow-lg"
                : "border-white/20 bg-white/10 flex items-center justify-center text-gray-400"
            }`}
          >
            {latestCapture ? (
              latestCapture.type === "video" ? (
                <div className="relative h-full w-full bg-black flex items-center justify-center">
                  <video src={latestCapture.url} className="h-full w-full object-cover" />
                  <IoVideocam size={14} className="absolute text-white drop-shadow" />
                </div>
              ) : (
                <img
                  src={latestCapture.url}
                  alt="Latest photo"
                  className="h-full w-full object-cover"
                />
              )
            ) : (
              <IoImageOutline size={20} />
            )}
          </button>

          {/* Shutter Trigger Button */}
          <button
            onClick={handleShutterClick}
            disabled={!!cameraError}
            className={`h-20 w-20 rounded-full border-4 border-white p-1 shadow-2xl transition active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed ${
              cameraMode === "VIDEO" ? "border-red-500" : ""
            }`}
          >
            <div
              className={`h-full w-full rounded-full transition-all duration-200 ${
                cameraMode === "VIDEO"
                  ? isRecording
                    ? "bg-red-600 scale-75 rounded-md"
                    : "bg-red-500"
                  : "bg-white active:bg-gray-200"
              }`}
            />
          </button>

          {/* Camera Flip Button */}
          <button
            onClick={toggleFacingMode}
            disabled={!!cameraError}
            className="h-12 w-12 flex items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 active:scale-90 disabled:opacity-40"
            title="Switch Camera (Front/Back)"
          >
            <IoCameraReverse size={24} />
          </button>
        </div>
      </div>

      {/* Gallery / Captured Media Modal */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/95 text-white backdrop-blur-lg">
          {/* Header */}
          <div className="flex h-14 items-center justify-between border-b border-white/10 px-4">
            <button
              onClick={() => setShowGalleryModal(false)}
              className="flex items-center gap-1 text-xs font-semibold text-gray-300 hover:text-white"
            >
              <IoClose size={20} />
              <span>Close</span>
            </button>
            <span className="text-xs font-bold tracking-wide">
              Captured Gallery ({gallery.length})
            </span>
            <div className="w-12" />
          </div>

          {/* Main Media Preview Area */}
          <div className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
            {selectedMedia ? (
              selectedMedia.type === "video" ? (
                <video
                  src={selectedMedia.url}
                  controls
                  autoPlay
                  className="max-h-full max-w-full rounded-2xl shadow-2xl"
                />
              ) : (
                <img
                  src={selectedMedia.url}
                  alt="Captured"
                  className="max-h-full max-w-full object-contain rounded-2xl shadow-2xl"
                />
              )
            ) : (
              <p className="text-sm text-gray-400">No media selected</p>
            )}
          </div>

          {/* Media Actions Footer */}
          {selectedMedia && (
            <div className="flex items-center justify-between border-t border-white/10 bg-black/80 px-6 py-4">
              <a
                href={selectedMedia.url}
                download={`portfolio-${selectedMedia.type}-${selectedMedia.id}.${
                  selectedMedia.type === "video" ? "webm" : "jpg"
                }`}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-lg hover:bg-emerald-500 active:scale-95 transition"
              >
                <IoDownloadOutline size={16} />
                <span>Save to Device</span>
              </a>

              <span className="text-xs text-gray-400 font-mono">
                {selectedMedia.timestamp}
              </span>

              <button
                onClick={() => deleteMedia(selectedMedia.id)}
                className="flex items-center gap-1.5 rounded-xl bg-red-600/80 px-3 py-2 text-xs font-bold text-white hover:bg-red-600 active:scale-95 transition"
              >
                <IoTrashOutline size={16} />
                <span>Delete</span>
              </button>
            </div>
          )}

          {/* Gallery Thumbnails List */}
          <div className="flex gap-2 p-3 overflow-x-auto border-t border-white/10 bg-black/60">
            {gallery.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedMedia(item)}
                className={`h-16 w-16 shrink-0 rounded-xl overflow-hidden border-2 transition ${
                  selectedMedia?.id === item.id
                    ? "border-yellow-400 scale-105"
                    : "border-white/20 opacity-70 hover:opacity-100"
                }`}
              >
                {item.type === "video" ? (
                  <div className="relative h-full w-full bg-black flex items-center justify-center">
                    <video src={item.url} className="h-full w-full object-cover" />
                    <IoVideocam size={14} className="absolute text-white" />
                  </div>
                ) : (
                  <img src={item.url} alt="" className="h-full w-full object-cover" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
