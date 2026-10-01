import { useState } from "react";

import SplashScreen from "./components/SplashScreen";
import HomePage from "./Pages/HomePage";
import HomepageForMobile from "./Pages/HomepageForMobile";
import { SettingsProvider, useSettings } from "./context/SettingsContext";

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
        {isSignedIn ? (
          <HomePage
            onLogout={() => setIsSignedIn(false)}
            onSetWallpaper={setDesktopWallpaper}
          />
        ) : (
          <SplashScreen
            wallpaper={lockScreenWallpaper}
            onSignIn={() => setIsSignedIn(true)}
          />
        )}
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
      <MainContent />
    </SettingsProvider>
  );
}

export default App;
