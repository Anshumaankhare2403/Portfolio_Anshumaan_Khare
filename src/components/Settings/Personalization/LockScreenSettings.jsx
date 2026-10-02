import { useState, useEffect, lazy, Suspense } from "react";
import {
  IoChevronBack,
  IoCloudUploadOutline,
  IoLinkOutline,
  IoAlertCircleOutline,
  IoCheckmarkCircle,
  IoCheckmark,
  IoLockClosedOutline,
} from "react-icons/io5";
import { useSettings } from "../../../hooks/useSettings";
import { PRESET_WALLPAPERS } from "../../../context/SettingsContext";
const CatppuccinWallpaperGallery = lazy(() => import("./CatppuccinWallpaperGallery"));

export default function LockScreenSettings({ onBack, onLockDesktop }) {
  const {
    lockScreenWallpaper,
    setLockScreenWallpaper,
    showToast,
  } = useSettings();

  const [urlInput, setUrlInput] = useState("");
  const [urlLoading, setUrlLoading] = useState(false);
  const [urlError, setUrlError] = useState("");
  const [fileError, setFileError] = useState("");

  const [clockTime, setClockTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setClockTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = clockTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDate = clockTime.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  // Validate and apply external lock screen image URL
  const handleUrlApply = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) {
      setUrlError("Please enter an image URL.");
      return;
    }

    if (!/^https?:\/\/.+/i.test(trimmed)) {
      setUrlError("URL must start with http:// or https://");
      return;
    }

    setUrlLoading(true);
    setUrlError("");

    const img = new Image();
    img.onload = () => {
      setUrlLoading(false);
      setLockScreenWallpaper(trimmed);
      setUrlInput("");
    };
    img.onerror = () => {
      setUrlLoading(false);
      setUrlError(
        "Unable to load this image. Please check the URL and ensure the link is direct and accessible."
      );
    };
    img.src = trimmed;
  };

  // Handle local file upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileError("");

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setFileError("Supported formats: JPG, JPEG, PNG, WEBP.");
      return;
    }

    const MAX_SIZE = 8 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setFileError("Image file size is too large (maximum 8MB).");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setLockScreenWallpaper(dataUrl);
      showToast("✓ Lock screen wallpaper uploaded and set successfully");
    };
    reader.onerror = () => {
      setFileError("Failed to read the selected file.");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-5 p-3.5 sm:p-5 md:p-6 max-w-4xl select-none">
      {/* Breadcrumb Header */}
      <div className="flex items-center gap-2 text-xs text-white/50">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-white/70 hover:text-white transition cursor-pointer"
        >
          <IoChevronBack size={14} />
          <span>Personalization</span>
        </button>
        <span>&gt;</span>
        <span className="text-white font-medium">Lock screen</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Lock screen</h2>
          <p className="text-xs text-white/50 mt-0.5">
            Personalize your Windows lock screen wallpaper and preview security screen
          </p>
        </div>

        {onLockDesktop && (
          <button
            type="button"
            onClick={onLockDesktop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 shadow transition cursor-pointer self-start sm:self-auto"
            title="Lock your screen now to see your custom lock wallpaper"
          >
            <IoLockClosedOutline size={15} />
            <span>Lock Screen Now</span>
          </button>
        )}
      </div>

      {/* Realistic Windows 11 Lock Screen Preview */}
      <div className="relative w-full aspect-video max-h-72 rounded-2xl overflow-hidden border border-white/15 bg-black/40 shadow-2xl flex flex-col justify-between p-6">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-500"
          style={{ backgroundImage: `url(${lockScreenWallpaper})` }}
        />

        <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-[1px] pointer-events-none" />

        {/* Lock Screen Time & Date */}
        <div className="relative z-10 select-none text-left">
          <div className="text-4xl sm:text-5xl font-light tracking-tight text-white drop-shadow-md">
            {formattedTime}
          </div>
          <div className="text-xs sm:text-sm font-medium text-white/90 drop-shadow mt-1">
            {formattedDate}
          </div>
        </div>

        {/* Lock Screen Sign-in Prompt */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 border border-white/20 backdrop-blur-md text-white mb-1 shadow">
            <IoLockClosedOutline size={16} />
          </div>
          <span className="text-xs font-semibold text-white drop-shadow">
            Portfolio • Anshumaan Khare
          </span>
          <span className="text-[10px] text-white/70 drop-shadow mt-0.5">
            Click to unlock
          </span>
        </div>
      </div>

      {/* Preset Lock Screen Wallpapers */}
      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 space-y-3">
        <span className="text-xs font-semibold text-white block">
          Preset lock screen wallpapers
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {PRESET_WALLPAPERS.map((preset) => {
            const isSelected = lockScreenWallpaper === preset.url;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => setLockScreenWallpaper(preset.url)}
                className={`group relative aspect-video rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  isSelected
                    ? "border-[var(--accent-color,#0078d4)] shadow-[0_0_12px_var(--accent-color,#0078d4)] scale-105"
                    : "border-white/15 hover:border-white/40 hover:scale-102"
                }`}
                title={preset.title}
              >
                <img
                  src={preset.thumbnail}
                  alt={preset.title}
                  className="h-full w-full object-cover"
                />

                {isSelected && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--accent-color,#0078d4)] text-white shadow">
                    <IoCheckmark size={12} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Catppuccin Mocha Lock Screen Wallpapers Collection (with credit to https://github.com/orangci/walls-catppuccin-mocha) */}
      <Suspense fallback={<div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-xs text-white/50 animate-pulse">Loading Catppuccin Mocha wallpapers…</div>}>
        <CatppuccinWallpaperGallery
          selectedWallpaper={lockScreenWallpaper}
          onSelectWallpaper={(url, title) => {
            setLockScreenWallpaper(url);
            showToast(`✓ Lock screen wallpaper set to "${title || "Catppuccin Mocha"}"`);
          }}
          type="lockscreen"
        />
      </Suspense>

      {/* Choose a photo / File Upload Card */}
      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-semibold text-white block">
              Choose a lock screen photo
            </span>
            <span className="text-[11px] text-white/50">
              Upload an image from your device (JPG, PNG, WEBP, max 8MB)
            </span>
          </div>

          <label className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition cursor-pointer shadow-sm active:scale-95 shrink-0">
            <IoCloudUploadOutline size={16} />
            <span>Browse files</span>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/jpg"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {fileError && (
          <p className="flex items-center gap-1.5 text-xs text-red-400 mt-2">
            <IoAlertCircleOutline size={15} />
            <span>{fileError}</span>
          </p>
        )}
      </div>

      {/* Set Lock Screen via URL Card */}
      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 space-y-3">
        <div>
          <span className="text-xs font-semibold text-white block">
            Change lock screen from Image URL
          </span>
          <span className="text-[11px] text-white/50">
            Enter a direct image link to set as your lock screen
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="relative flex-1 flex items-center rounded-xl bg-black/40 border border-white/20 px-3 py-2 focus-within:border-[var(--accent-color,#0078d4)] focus-within:ring-1 focus-within:ring-[var(--accent-color,#0078d4)]">
            <IoLinkOutline className="text-white/50 text-sm mr-2 shrink-0" />
            <input
              type="url"
              value={urlInput}
              onChange={(e) => {
                setUrlInput(e.target.value);
                setUrlError("");
              }}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full bg-transparent text-xs text-white placeholder-white/40 outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleUrlApply();
              }}
            />
          </div>

          <button
            type="button"
            disabled={urlLoading || !urlInput.trim()}
            onClick={handleUrlApply}
            className={`px-5 py-2 rounded-xl text-xs font-semibold text-white transition active:scale-95 shrink-0 ${
              urlLoading || !urlInput.trim()
                ? "bg-white/10 text-white/40 cursor-not-allowed border border-white/10"
                : "bg-[var(--accent-color,#0078d4)] hover:brightness-110 shadow-md cursor-pointer"
            }`}
          >
            {urlLoading ? "Validating..." : "Apply Lock Screen"}
          </button>
        </div>

        {urlError && (
          <p className="flex items-center gap-1.5 text-xs text-red-400">
            <IoAlertCircleOutline size={15} />
            <span>{urlError}</span>
          </p>
        )}
      </div>
    </div>
  );
}
