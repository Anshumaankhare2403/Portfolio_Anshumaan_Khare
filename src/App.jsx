import { useState } from "react";
import { IoDesktopOutline } from "react-icons/io5";

import SplashScreen from "./components/SplashScreen";
import HomePage from "./Pages/HomePage";
import wallpaper from "./assets/wallpaper/bioluminescence-3840x2160-25836.jpg";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const isIPad =
    /iPad/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  return (
    <>
      <div className={`${isIPad ? "hidden" : "hidden md:block"} min-h-screen`}>
        {isSignedIn ? (
          <HomePage onLogout={() => setIsSignedIn(false)} />
        ) : (
          <SplashScreen onSignIn={() => setIsSignedIn(true)} />
        )}
      </div>

      <main
        className={`relative min-h-screen items-center justify-center overflow-hidden bg-cover bg-center px-6 text-center ${
          isIPad ? "flex" : "flex md:hidden"
        }`}
        style={{ backgroundImage: `url(${wallpaper})` }}
      >
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]" />

        <section className="relative w-full max-w-sm rounded-3xl border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl border border-white/20 bg-white/10 text-4xl text-cyan-200">
            <IoDesktopOutline />
          </div>

          <h1 className="mt-6 text-2xl font-semibold">
            Best viewed on a PC
          </h1>

          <p className="mt-3 leading-7 text-white/70">
            This portfolio recreates a desktop operating system and is not
            available on phones or iPads. Please open it on a PC or laptop for
            the full experience.
          </p>

          <p className="mt-6 text-sm font-medium text-cyan-200">
            See you on the big screen!
          </p>
        </section>
      </main>
    </>
  );
}

export default App;
