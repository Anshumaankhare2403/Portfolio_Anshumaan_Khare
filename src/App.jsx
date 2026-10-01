import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import SplashScreen from "./components/SplashScreen";
import HomePage from "./Pages/HomePage";
import HomepageForMobile from "./Pages/HomepageForMobile";
import { SettingsProvider, useSettings } from "./context/SettingsContext";
import { ProcessProvider } from "./context/ProcessContext";

function MainContent() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { desktopWallpaper, lockScreenWallpaper, setDesktopWallpaper } =
    useSettings();

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        className="fixed inset-0 z-0 bg-cover bg-center transition-[background-image] duration-500"
        style={{ backgroundImage: `url(${desktopWallpaper})` }}
        aria-hidden="true"
      />
      <div className="relative z-10 hidden min-h-screen md:block">
        <AnimatePresence mode="wait">
          {isSignedIn ? (
            <motion.div
              key="desktop-home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full h-full min-h-screen"
            >
              <HomePage
                onLogout={() => setIsSignedIn(false)}
                onSetWallpaper={setDesktopWallpaper}
              />
            </motion.div>
          ) : (
            <motion.div
              key="lockscreen-splash"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -24, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-full h-full min-h-screen"
            >
              <SplashScreen
                wallpaper={lockScreenWallpaper}
                onSignIn={() => setIsSignedIn(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="relative z-10 md:hidden">
        <HomepageForMobile
          wallpaper={desktopWallpaper}
          onSetWallpaper={setDesktopWallpaper}
        />
      </div>
    </main>
  );
}

function App() {
  return (
    <SettingsProvider>
      <ProcessProvider>
        <MainContent />
      </ProcessProvider>
    </SettingsProvider>
  );
}

export default App;
