import { ClipLoader } from "react-spinners";
import Logo from "../assets/This PC/Windows11.svg";

function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/20 backdrop-blur-2xl">
      <img src={Logo} alt="Windows 11" className="w-40 h-40 object-contain" />

      <div className="mt-12">
        <ClipLoader
          color="#ffffff"
          size={50}
          cssOverride={{
            font_weight: "900",
          }}
          speedMultiplier={0.8}
        />
      </div>
      <div className="flex flex-row-20 justify-items-start">
        <p>
            Developed By : Anshumaan Khare
        </p>
      </div>
    </div>
  );
}

export default SplashScreen;
