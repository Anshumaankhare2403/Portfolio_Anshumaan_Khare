import { createContext, useContext, useEffect, useState, useCallback } from "react";
import defaultWallpaper from "../assets/wallpaper/bioluminescence-3840x2160-25836.png";
import {
  CATPPUCCIN_WALLPAPERS,
  CATPPUCCIN_REPO_URL,
} from "../data/catppuccinWallpapers";

export const PRESET_WALLPAPERS = [
  {
    id: "bioluminescence",
    title: "Bioluminescence (Default)",
    category: "Nature & Glow",
    url: defaultWallpaper,
    thumbnail: defaultWallpaper,
  },
  {
    id: "win11-bloom-dark",
    title: "Windows 11 Dark Bloom",
    category: "Windows Classic",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=3840&q=85",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "win11-bloom-light",
    title: "Windows 11 Light Bloom",
    category: "Windows Classic",
    url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=3840&q=85",
    thumbnail: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "cyberpunk-city",
    title: "Neon Cyberpunk",
    category: "Sci-Fi",
    url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=3840&q=85",
    thumbnail: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "deep-space",
    title: "Deep Cosmos Nebula",
    category: "Space",
    url: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=3840&q=85",
    thumbnail: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "mountain-aurora",
    title: "Mountain Aurora",
    category: "Landscape",
    url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=3840&q=85",
    thumbnail: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=600&q=80",
  },
];

export const ACCENT_COLORS = [
  { id: "blue", name: "Windows Blue", hex: "#0078d4", rgb: "0, 120, 212" },
  { id: "cyan", name: "Electric Cyan", hex: "#00bcf9", rgb: "0, 188, 249" },
  { id: "purple", name: "Iris Purple", hex: "#881798", rgb: "136, 23, 152" },
  { id: "green", name: "Emerald Green", hex: "#107c41", rgb: "16, 124, 65" },
  { id: "orange", name: "Sunset Orange", hex: "#f7630c", rgb: "247, 99, 12" },
  { id: "red", name: "Crimson Red", hex: "#e81123", rgb: "232, 17, 35" },
];

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  // 1. Desktop Wallpaper
  const [desktopWallpaper, setDesktopWallpaperState] = useState(() => {
    try {
      return localStorage.getItem("desktopWallpaper") || defaultWallpaper;
    } catch {
      return defaultWallpaper;
    }
  });

  // 2. Lock Screen Wallpaper
  const [lockScreenWallpaper, setLockScreenWallpaperState] = useState(() => {
    try {
      return localStorage.getItem("lockScreenWallpaper") || defaultWallpaper;
    } catch {
      return defaultWallpaper;
    }
  });

  // 3. Theme mode: 'dark' | 'light' | 'system'
  const [theme, setThemeState] = useState(() => {
    try {
      return localStorage.getItem("theme") || "dark";
    } catch {
      return "dark";
    }
  });

  // 4. Accent Color
  const [accentColorId, setAccentColorIdState] = useState(() => {
    try {
      return localStorage.getItem("accentColor") || "blue";
    } catch {
      return "blue";
    }
  });

  // 5. Recent Wallpapers list
  const [recentWallpapers, setRecentWallpapers] = useState(() => {
    try {
      const saved = localStorage.getItem("recentWallpapers");
      return saved ? JSON.parse(saved) : PRESET_WALLPAPERS.map((p) => p.url);
    } catch {
      return PRESET_WALLPAPERS.map((p) => p.url);
    }
  });

  // 6. Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  }, []);

  // Update CSS variables for accent color
  useEffect(() => {
    const activeAccent =
      ACCENT_COLORS.find((c) => c.id === accentColorId) || ACCENT_COLORS[0];
    document.documentElement.style.setProperty("--accent-color", activeAccent.hex);
    document.documentElement.style.setProperty(
      "--accent-color-rgb",
      activeAccent.rgb
    );
  }, [accentColorId]);

  // Set Desktop Wallpaper
  const setDesktopWallpaper = useCallback(
    (url, silent = false) => {
      setDesktopWallpaperState(url);
      try {
        localStorage.setItem("desktopWallpaper", url);
        // Add to recent list
        setRecentWallpapers((prev) => {
          const filtered = prev.filter((item) => item !== url);
          const updated = [url, ...filtered].slice(0, 8);
          try {
            localStorage.setItem("recentWallpapers", JSON.stringify(updated));
          } catch {
            // localstorage quota safety
          }
          return updated;
        });
      } catch (e) {
        console.error("Storage error:", e);
      }
      if (!silent) {
        showToast("✓ Desktop background changed successfully");
      }
    },
    [showToast]
  );

  // Set Lock Screen Wallpaper
  const setLockScreenWallpaper = useCallback(
    (url, silent = false) => {
      setLockScreenWallpaperState(url);
      try {
        localStorage.setItem("lockScreenWallpaper", url);
      } catch (e) {
        console.error("Storage error:", e);
      }
      if (!silent) {
        showToast("✓ Lock screen background updated successfully");
      }
    },
    [showToast]
  );

  // Set Theme
  const setTheme = useCallback(
    (mode) => {
      setThemeState(mode);
      try {
        localStorage.setItem("theme", mode);
      } catch (e) {
        console.error(e);
      }
      showToast(`✓ Appearance mode set to ${mode}`);
    },
    [showToast]
  );

  // Set Accent Color
  const setAccentColor = useCallback(
    (colorId) => {
      setAccentColorIdState(colorId);
      try {
        localStorage.setItem("accentColor", colorId);
      } catch (e) {
        console.error(e);
      }
      const active = ACCENT_COLORS.find((c) => c.id === colorId);
      showToast(`✓ Accent color changed to ${active?.name || colorId}`);
    },
    [showToast]
  );

  // Reset All Settings
  const resetSettings = useCallback(() => {
    try {
      localStorage.removeItem("desktopWallpaper");
      localStorage.removeItem("lockScreenWallpaper");
      localStorage.removeItem("theme");
      localStorage.removeItem("accentColor");
      localStorage.removeItem("recentWallpapers");
    } catch (e) {
      console.error(e);
    }
    setDesktopWallpaperState(defaultWallpaper);
    setLockScreenWallpaperState(defaultWallpaper);
    setThemeState("dark");
    setAccentColorIdState("blue");
    setRecentWallpapers(PRESET_WALLPAPERS.map((p) => p.url));
    showToast("✓ All settings restored to Windows defaults");
  }, [showToast]);

  const value = {
    desktopWallpaper,
    setDesktopWallpaper,
    lockScreenWallpaper,
    setLockScreenWallpaper,
    theme,
    setTheme,
    accentColorId,
    setAccentColor,
    activeAccent:
      ACCENT_COLORS.find((c) => c.id === accentColorId) || ACCENT_COLORS[0],
    recentWallpapers,
    toast,
    showToast,
    resetSettings,
    defaultWallpaper,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
