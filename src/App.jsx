import { useState } from "react";
// import { IoDesktopOutline } from "react-icons/io5";

import SplashScreen from "./components/SplashScreen";
import HomePage from "./Pages/HomePage";
// import wallpaper from "./assets/wallpaper/bioluminescence-3840x2160-25836.jpg";
import HomepageForMobile from "./Pages/HomepageForMobile";
function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    <>
      <div className="hidden min-h-screen md:block">
        {isSignedIn ? (
          <HomePage onLogout={() => setIsSignedIn(false)} />
        ) : (
          <SplashScreen onSignIn={() => setIsSignedIn(true)} />
        )}
      </div>
{/* 
      <main
        className={` min-h-screen pt-5 pb-5 bg-cover bg-center px-3 text-center gap-2.5 ${
          isIPad ? "flex " : "grid md:hidden"
        }`}
        style={{ backgroundImage: `url(${wallpaper})` }}
      > */}
      <div className="md:hidden">
        <HomepageForMobile />
      </div>
      {/* </main> */}
    </>
  );
}

export default App;
