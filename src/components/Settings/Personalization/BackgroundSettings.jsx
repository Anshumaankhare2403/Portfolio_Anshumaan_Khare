import { useState, lazy, Suspense } from "react";
import {
  IoChevronBack,
  IoCloudUploadOutline,
  IoLinkOutline,
  IoCheckmarkCircle,
  IoAlertCircleOutline,
  IoCheckmark,
} from "react-icons/io5";
import { useSettings } from "../../../hooks/useSettings";
import { PRESET_WALLPAPERS } from "../../../context/SettingsContext";
const CatppuccinWallpaperGallery = lazy(() => import("./CatppuccinWallpaperGallery"));

export default function BackgroundSettings({ onBack }) {
  const {
    desktopWallpaper,
    setDesktopWallpaper,
    showToast,
  } = useSettings();

  const [bgType, setBgType] = useState("picture");
  const [urlInput, setUrlInput] = useState("");
  const [urlLoading, setUrlLoading] = useState(false);
  const [urlError, setUrlError] = useState("");
  const [urlPreview, setUrlPreview] = useState(null);

  const [fileError, setFileError] = useState("");

  // Validate and apply external image URL
  const handleUrlTestAndApply = () => {
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
    setUrlPreview(null);

    // Pre-test the image loading
    const img = new Image();
    img.onload = () => {
      setUrlLoading(false);
      setUrlPreview(trimmed);
      setDesktopWallpaper(trimmed);
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

    // Validate type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setFileError("Supported formats: JPG, JPEG, PNG, WEBP.");
      return;
    }

    // Validate size (max 8MB for localStorage safety)
    const MAX_SIZE = 8 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setFileError("Image file size is too large (maximum 8MB).");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setDesktopWallpaper(dataUrl);
      showToast("✓ Custom image uploaded and set as desktop wallpaper");
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
        <span className="text-white font-medium">Background</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Background</h2>
          <p className="text-xs text-white/50 mt-0.5">
            Personalize your desktop background with images, URLs, or local files
          </p>
        </div>
      </div>

      {/* Large Live Desktop Wallpaper Preview Mockup */}
      <div className="relative w-full aspect-video max-h-72 rounded-2xl overflow-hidden border border-white/15 bg-black/40 shadow-2xl">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-500"
          style={{ backgroundImage: `url(${desktopWallpaper})` }}
        />

        {/* Semi-transparent Windows 11 Mini Overlay for realistic preview */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Mock window on preview */}
        <div className="absolute top-6 left-8 w-44 h-28 rounded-lg bg-black/40 border border-white/20 backdrop-blur-md p-2 shadow-lg flex flex-col justify-between pointer-events-none">
          <div className="flex items-center gap-1 border-b border-white/10 pb-1">
            <div className="w-2 h-2 rounded-full bg-red-400/80" />
            <div className="w-2 h-2 rounded-full bg-yellow-400/80" />
            <div className="w-2 h-2 rounded-full bg-green-400/80" />
            <span className="text-[8px] text-white/60 ml-1">Desktop Preview</span>
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-16 bg-white/20 rounded" />
            <div className="h-1.5 w-24 bg-white/15 rounded" />
          </div>
          <div className="text-[8px] text-white/40">Active Wallpaper</div>
        </div>

        {/* Mock taskbar on preview */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/50 px-3 py-1 rounded-xl border border-white/20 backdrop-blur-md">
          <div className="w-3 h-3 bg-sky-400 rounded-sm" />
          <div className="w-3 h-3 bg-white/30 rounded-sm" />
          <div className="w-3 h-3 bg-white/30 rounded-sm" />
          <div className="w-3 h-3 bg-white/30 rounded-sm" />
        </div>
      </div>

      {/* Background Mode Dropdown Card */}
      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-white block">
            Personalize your background
          </span>
          <span className="text-[11px] text-white/50">
            Choose how your background should be rendered
          </span>
        </div>

        <select
          value={bgType}
          onChange={(e) => setBgType(e.target.value)}
          className="rounded-lg bg-black/50 border border-white/20 px-3 py-1.5 text-xs text-white outline-none cursor-pointer hover:border-white/40 focus:border-[var(--accent-color,#0078d4)]"
        >
          <option value="picture">Picture</option>
          <option value="solid" disabled>Solid color (Coming soon)</option>
          <option value="slideshow" disabled>Slideshow (Coming soon)</option>
        </select>
      </div>

      {/* Preset & Recent Wallpapers Section */}
      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 space-y-3">
        <span className="text-xs font-semibold text-white block">
          Recent images
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {PRESET_WALLPAPERS.map((preset) => {
            const isSelected = desktopWallpaper === preset.url;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => setDesktopWallpaper(preset.url)}
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

      {/* Catppuccin Mocha Wallpapers Collection (with credit to https://github.com/orangci/walls-catppuccin-mocha) */}
      <Suspense fallback={<div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-xs text-white/50 animate-pulse">Loading Catppuccin Mocha wallpapers…</div>}>
        <CatppuccinWallpaperGallery
          selectedWallpaper={desktopWallpaper}
          onSelectWallpaper={(url, title) => {
            setDesktopWallpaper(url);
            showToast(`✓ Wallpaper set to "${title || "Catppuccin Mocha"}"`);
          }}
          type="desktop"
        />
      </Suspense>

      {/* Choose a photo / File Upload Card */}
      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-semibold text-white block">
              Choose a photo
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

      {/* Set Wallpaper via URL Card */}
      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 space-y-3">
        <div>
          <span className="text-xs font-semibold text-white block">
            Change wallpaper from Image URL
          </span>
          <span className="text-[11px] text-white/50">
            Paste any direct image link to apply it instantly to your desktop
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
                if (e.key === "Enter") handleUrlTestAndApply();
              }}
            />
          </div>

          <button
            type="button"
            disabled={urlLoading || !urlInput.trim()}
            onClick={handleUrlTestAndApply}
            className={`px-5 py-2 rounded-xl text-xs font-semibold text-white transition active:scale-95 shrink-0 ${
              urlLoading || !urlInput.trim()
                ? "bg-white/10 text-white/40 cursor-not-allowed border border-white/10"
                : "bg-[var(--accent-color,#0078d4)] hover:brightness-110 shadow-md cursor-pointer"
            }`}
          >
            {urlLoading ? "Validating..." : "Apply Wallpaper"}
          </button>
        </div>

        {urlError && (
          <p className="flex items-center gap-1.5 text-xs text-red-400">
            <IoAlertCircleOutline size={15} />
            <span>{urlError}</span>
          </p>
        )}

        {urlPreview && (
          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <IoCheckmarkCircle size={16} />
            <span>URL applied successfully!</span>
          </div>
        )}
      </div>
    </div>
  );
}
