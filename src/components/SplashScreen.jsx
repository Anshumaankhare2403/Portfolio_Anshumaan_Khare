import { ClipLoader } from "react-spinners";
import Logo from "../assets/This PC/Windows11.svg";

function SplashScreen() {
  return (
    <div
      className="
        fixed inset-0 z-[9999]
        flex flex-col items-center justify-center
        bg-black
      "
    >
      <img
        src={Logo}
        alt="Windows 11"
        className="h-40 w-40 object-contain"
      />

      <div className="mt-10">
        <ClipLoader
          color="#ffffff"
          size={40}
          speedMultiplier={0.8}
        />
      </div>

      <div className="absolute bottom-8 text-center text-sm text-gray-400">
        Developed By <span className="font-semibold text-white">
          Anshumaan Khare
        </span>
      </div>
    </div>
  );
}

export default SplashScreen;