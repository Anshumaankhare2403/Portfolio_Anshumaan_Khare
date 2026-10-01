import { useState, useMemo } from "react";
import {
  IoSearchOutline,
  IoCheckmark,
  IoLogoGithub,
  IoOpenOutline,
  IoSparkles,
  IoClose,
} from "react-icons/io5";
import {
  CATPPUCCIN_WALLPAPERS,
  CATPPUCCIN_CATEGORIES,
  CATPPUCCIN_REPO_URL,
} from "../../../data/catppuccinWallpapers";

export default function CatppuccinWallpaperGallery({
  selectedWallpaper,
  onSelectWallpaper,
  type = "desktop", // "desktop" | "lockscreen"
}) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(24);

  // Filter wallpapers by search and category
  const filteredWallpapers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return CATPPUCCIN_WALLPAPERS.filter((item) => {
      const matchCat =
        activeCategory === "All" || item.category === activeCategory;
      const matchSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.filename.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  const displayedWallpapers = filteredWallpapers.slice(0, visibleCount);
  const hasMore = visibleCount < filteredWallpapers.length;

  return (
    <div className="rounded-2xl border border-[#cba6f7]/25 bg-gradient-to-b from-[#181825]/90 to-[#11111b]/95 p-5 shadow-2xl backdrop-blur-xl space-y-4 select-none">
      {/* Attribution & Credit Header Card */}
      <div className="relative overflow-hidden rounded-xl border border-[#cba6f7]/30 bg-gradient-to-r from-[#313244]/80 via-[#1e1e2e]/90 to-[#181825]/90 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            {/* Catppuccin / GitHub Icon */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#cba6f7] to-[#89b4fa] text-[#11111b] shadow-lg shadow-[#cba6f7]/20">
              <IoSparkles size={22} />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-wide">
                  Catppuccin Mocha Collection
                </h3>
                <span className="rounded-full bg-[#cba6f7]/20 border border-[#cba6f7]/40 px-2 py-0.5 text-[10px] font-semibold text-[#cba6f7]">
                  {CATPPUCCIN_WALLPAPERS.length} Wallpapers
                </span>
                <span className="rounded-full bg-[#89b4fa]/20 border border-[#89b4fa]/40 px-2 py-0.5 text-[10px] font-semibold text-[#89b4fa]">
                  Mocha Palette
                </span>
              </div>

              {/* Credit attribution text */}
              <p className="mt-1 text-xs text-[#a6adc8] leading-relaxed">
                Curated aesthetic wallpapers styled in the warm Catppuccin Mocha color scheme.
                Special credit and thanks to{" "}
                <a
                  href={CATPPUCCIN_REPO_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-semibold text-[#cba6f7] hover:underline inline-flex items-center gap-0.5"
                >
                  orangci/walls-catppuccin-mocha
                  <IoOpenOutline size={11} className="inline ml-0.5" />
                </a>{" "}
                for collecting and color-converting this collection.
              </p>
            </div>
          </div>

          {/* GitHub Repository Link Button */}
          <a
            href={CATPPUCCIN_REPO_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#cba6f7]/15 hover:bg-[#cba6f7]/25 text-[#cba6f7] hover:text-white border border-[#cba6f7]/40 px-3.5 py-2 text-xs font-semibold shadow-md transition-all active:scale-95 shrink-0 self-start sm:self-center"
            title="Open orangci/walls-catppuccin-mocha repository on GitHub"
          >
            <IoLogoGithub size={16} />
            <span>GitHub Repository</span>
            <IoOpenOutline size={12} />
          </a>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          {/* Search Input */}
          <div className="relative flex-1 flex items-center rounded-xl bg-black/40 border border-white/15 px-3 py-1.5 focus-within:border-[#cba6f7] focus-within:ring-1 focus-within:ring-[#cba6f7] transition">
            <IoSearchOutline className="text-white/40 text-sm mr-2 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleCount(24);
              }}
              placeholder="Search 330+ wallpapers (e.g., pixel, cat, space, anime, sakura)..."
              className="w-full bg-transparent text-xs text-white placeholder-white/40 outline-none"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-white/40 hover:text-white"
              >
                <IoClose size={14} />
              </button>
            )}
          </div>

          <div className="text-[11px] text-white/50 shrink-0 self-end sm:self-auto">
            Showing <strong className="text-white">{displayedWallpapers.length}</strong> of{" "}
            <strong className="text-white">{filteredWallpapers.length}</strong>
          </div>
        </div>

        {/* Category Pills Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATPPUCCIN_CATEGORIES.map((cat) => {
            const isCatActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategory(cat);
                  setVisibleCount(24);
                }}
                className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isCatActive
                    ? "bg-[#cba6f7] text-[#11111b] font-bold shadow-md shadow-[#cba6f7]/30 scale-102"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Wallpapers Grid */}
      {displayedWallpapers.length === 0 ? (
        <div className="py-12 text-center text-xs text-white/50">
          No wallpapers matched "{search}". Try searching for something else!
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {displayedWallpapers.map((item) => {
            const isSelected = selectedWallpaper === item.url;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectWallpaper(item.url, item.title)}
                className={`group relative aspect-video w-full rounded-xl overflow-hidden border-2 text-left transition-all cursor-pointer bg-slate-950 ${
                  isSelected
                    ? "border-[#cba6f7] shadow-[0_0_15px_rgba(203,166,247,0.7)] scale-105 z-10 ring-2 ring-[#cba6f7]/50"
                    : "border-white/10 hover:border-[#cba6f7]/60 hover:scale-102 hover:shadow-lg"
                }`}
                title={`Set "${item.title}" as ${type} background`}
              >
                {/* Wallpaper Thumbnail */}
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Gradient shade & Title overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2 pointer-events-none">
                  <span className="text-[10px] font-bold text-white truncate drop-shadow">
                    {item.title}
                  </span>
                  <span className="text-[8px] text-[#cba6f7] truncate">
                    {item.category}
                  </span>
                </div>

                {/* Selected Checkmark Badge */}
                {isSelected && (
                  <span className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#cba6f7] text-[#11111b] shadow-lg font-bold">
                    <IoCheckmark size={14} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Pagination / Load More Controls */}
      {hasMore && (
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 24)}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-[#cba6f7]/20 hover:text-[#cba6f7] text-white border border-white/15 hover:border-[#cba6f7]/40 transition active:scale-95 cursor-pointer shadow"
          >
            Load 24 More ({filteredWallpapers.length - visibleCount} remaining)
          </button>
          <button
            type="button"
            onClick={() => setVisibleCount(filteredWallpapers.length)}
            className="px-4 py-2 rounded-xl text-xs font-medium text-white/60 hover:text-white transition cursor-pointer"
          >
            Show All ({filteredWallpapers.length})
          </button>
        </div>
      )}
    </div>
  );
}
