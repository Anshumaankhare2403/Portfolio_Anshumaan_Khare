import { useEffect, useState } from "react";
import {
  IoAccessibilityOutline,
  IoArrowForward,
  IoEyeOffOutline,
  IoEyeOutline,
  IoPowerOutline,
  IoWifi,
} from "react-icons/io5";

import Logo from "../assets/This PC/Windows11.svg";
import userAvatar from "../assets/color-lightblue/user-identity.svg";
import wallpaper from "../assets/wallpaper/bioluminescence-3840x2160-25836.jpg";

function SplashScreen({ onSignIn }) {
  const [isBooting, setIsBooting] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const bootTimer = setTimeout(() => setIsBooting(false), 1200);
    const clockTimer = setInterval(() => setNow(new Date()), 1000);

    return () => {
      clearTimeout(bootTimer);
      clearInterval(clockTimer);
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSignIn();
  };

  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = now.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  if (isBooting) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black">
        <img
          src={Logo}
          alt="Windows"
          className="h-28 w-28 object-contain sm:h-36 sm:w-36"
        />

        <div className="windows-spinner mt-14" aria-label="Starting Windows" />

        <p className="absolute bottom-8 text-xs tracking-wide text-white/45">
          @Developed by Anshumaan Khare
        </p>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[9999] overflow-hidden bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      <div className="absolute inset-0 bg-slate-950/35 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/45" />

      <div className="relative flex h-full min-h-[560px] flex-col items-center">
        <header className="pt-[6vh] text-center drop-shadow-lg">
          <p className="text-6xl font-light tracking-tight sm:text-7xl">{time}</p>
          <p className="mt-2 text-lg font-light sm:text-xl">{date}</p>
        </header>

        <main className="flex flex-1 items-center justify-center pb-[8vh]">
          <div className="w-[min(88vw,320px)] text-center">
            <div className="mx-auto flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border border-white/50 bg-white/90 shadow-2xl sm:h-36 sm:w-36">
              <img
                src={userAvatar}
                alt="Users"
                className="h-[82%] w-[82%] object-contain"
              />
            </div>

            <h1 className="mt-5 text-2xl font-medium tracking-tight sm:text-3xl">
              User
            </h1>

            <form onSubmit={handleSubmit} className="mt-6">
              <div className="flex h-10 overflow-hidden border-2 border-white/75 bg-white/90 shadow-lg transition focus-within:border-white focus-within:bg-white">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Password"
                  aria-label="Password"
                  autoFocus
                  className="min-w-0 flex-1 bg-transparent px-3 text-sm text-gray-900 outline-none placeholder:text-gray-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="grid w-10 place-items-center text-lg text-gray-700 hover:bg-black/10"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </button>
                <button
                  type="submit"
                  className="grid w-10 place-items-center bg-gray-200 text-xl text-gray-800 hover:bg-gray-300"
                  aria-label="Sign in"
                >
                  <IoArrowForward />
                </button>
              </div>

              <button
                type="submit"
                className="mt-4 rounded px-3 py-1 text-sm font-medium text-white/90 drop-shadow hover:bg-white/10 hover:text-white"
              >
                Sign in to explore my portfolio
              </button>
            </form>
          </div>
        </main>

        <div className="absolute bottom-7 right-7 flex items-center gap-1 sm:bottom-9 sm:right-10">
          <button
            type="button"
            aria-label="Network"
            className="rounded p-3 text-xl hover:bg-white/15"
          >
            <IoWifi />
          </button>
          <button
            type="button"
            aria-label="Accessibility"
            className="rounded p-3 text-xl hover:bg-white/15"
          >
            <IoAccessibilityOutline />
          </button>
          <button
            type="button"
            aria-label="Power"
            className="rounded p-3 text-xl hover:bg-white/15"
          >
            <IoPowerOutline />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;
