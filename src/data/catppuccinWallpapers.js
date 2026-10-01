// Catppuccin Mocha Wallpapers collection
// Credited to: https://github.com/orangci/walls-catppuccin-mocha

const wallpaperModules = import.meta.glob(
  "../assets/walls-catppuccin-mocha/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" }
);

export const CATPPUCCIN_REPO_URL = "https://github.com/orangci/walls-catppuccin-mocha";

function formatTitle(filename) {
  return filename
    .replace(/^.*\//, "")
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function detectCategory(name) {
  const lower = name.toLowerCase();

  if (
    /sousou|totoro|kusuriya|genshin|fumo|touhou|hollow-knight|link-click|samurai|tora|isekai|majo|mushishi|degirled|anime|danbo|girl|knight|mage/.test(
      lower
    )
  ) {
    return "Anime & Art";
  }

  if (/pixel|voxel|old-computer|bsod|windows-xp|keyboard|retro|8-bit/.test(lower)) {
    return "Pixel & Retro";
  }

  if (
    /space|galaxy|black-hole|satellite|rocket|scifi|voyager|astronaut|jupiter|moon|star|comet|eclipse/.test(
      lower
    )
  ) {
    return "Space & Sci-Fi";
  }

  if (
    /city|street|building|tower|ruins|castle|bridge|cabin|subway|railroad|train|house|temple|harbor|lighthouse|station|village|diner|cafe|kitchen|venice|pompeii|moscow|rooftop/.test(
      lower
    )
  ) {
    return "City & Places";
  }

  if (
    /flower|tree|forest|mountain|beach|river|valley|clouds|sunset|wheat|waterfall|waves|sakura|aurora|pine|nature|lake|glade|cliff|horizon|underwater|corals|jellyfish/.test(
      lower
    )
  ) {
    return "Nature & Scenery";
  }

  if (/cat|fox|deer|bunnies|koi|whale|dino|tea|coffee|ice-cream|pizza|sushi|orange|toast|berries|kitty/.test(lower)) {
    return "Cozy & Animals";
  }

  return "Abstract & Minimal";
}

export const CATPPUCCIN_WALLPAPERS = Object.entries(wallpaperModules).map(
  ([path, url]) => {
    const rawName = path.split("/").pop();
    const id = rawName.replace(/\.[^/.]+$/, "");
    const title = formatTitle(rawName);
    const category = detectCategory(rawName);

    return {
      id: `catppuccin-${id}`,
      title,
      filename: rawName,
      url,
      thumbnail: url,
      category,
      credit: "orangci/walls-catppuccin-mocha",
      creditUrl: CATPPUCCIN_REPO_URL,
    };
  }
);

// Preset categories for filtering
export const CATPPUCCIN_CATEGORIES = [
  "All",
  "Anime & Art",
  "Pixel & Retro",
  "Space & Sci-Fi",
  "Nature & Scenery",
  "City & Places",
  "Cozy & Animals",
  "Abstract & Minimal",
];
