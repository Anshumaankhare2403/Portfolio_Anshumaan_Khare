import { useState } from "react";
// import { IoDesktopOutline } from "react-icons/io5";

import SplashScreen from "./components/SplashScreen";
import HomePage from "./Pages/HomePage";
import HomepageForMobile from "./Pages/HomepageForMobile";
import defaultWallpaper from "./assets/wallpaper/bioluminescence-3840x2160-25836.png";
function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [wallpaper, setWallpaper] = useState(defaultWallpaper);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        className="fixed inset-0 z-0 bg-cover bg-center transition-[background-image] duration-500"
        style={{ backgroundImage: `url(${wallpaper})` }}
        aria-hidden="true"
      />
      <div className="relative z-10 hidden min-h-screen md:block">
        {isSignedIn ? (
          <HomePage
            onLogout={() => setIsSignedIn(false)}
            onSetWallpaper={setWallpaper}
          />
        ) : (
          <SplashScreen onSignIn={() => setIsSignedIn(true)} />
        )}
      </div>
      <div className="relative z-10 md:hidden">
        <HomepageForMobile wallpaper={wallpaper} onSetWallpaper={setWallpaper} />
      </div>
    </main>
  );
}

export default App;
