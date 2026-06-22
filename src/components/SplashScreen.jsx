import { motion } from "framer-motion";
import Logo from "../assets/This PC/Windows11.svg"
function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center backdrop-blur-xl bg-black/20">
      
      {/* Windows Logo */}
      <div className="mb-10">
       <img
  src={Logo}
  alt="Windows 11"
  className="w-40 h-40 object-contain"
/>
      </div>

      {/* Loading  */}
      <div className="mt-12">
  <motion.div
    animate={{ rotate: 360 }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: "linear",
    }}
    className="relative h-10 w-10"
  >
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="absolute h-2 w-2 rounded-full bg-white"
        style={{
          top: "50%",
          left: "50%",
          transform: `
            rotate(${i * 45}deg)
            translateY(-18px)
          `,
          opacity: (i + 1) / 8,
        }}
      />
    ))}
  </motion.div>
</div>

      <p className="mt-8 text-sm text-gray-400">
        Loading...
      </p>
    </div>
  );
}

export default SplashScreen;