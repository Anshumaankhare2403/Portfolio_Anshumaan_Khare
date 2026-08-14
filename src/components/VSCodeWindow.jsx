import { useState } from "react";
import { motion } from "framer-motion";
import { IoChevronBack, IoClose, IoRemove, IoSquareOutline } from "react-icons/io5";
import { VscFiles, VscSearch, VscSourceControl } from "react-icons/vsc";
import Editor from "@monaco-editor/react";

const codeSamples = {
  "App.jsx": `import { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import HomePage from "./Pages/HomePage";
import HomepageForMobile from "./Pages/HomepageForMobile";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    <>
      <div className="hidden min-h-screen md:block">
        {isSignedIn ? <HomePage /> : <SplashScreen />}
      </div>
      <div className="md:hidden">
        <HomepageForMobile />
      </div>
    </>
  );
}

export default App;`,
  "HomePage.jsx": `import { useState } from "react";
import Dock from "../components/Dock";
import FileExp from "../components/FileExp";
import Terminal from "../components/Terminal";

function HomePage() {
  const [isFileExplorerOpen, setIsFileExplorerOpen] = useState(false);
  return (
    <div className="relative min-h-screen">
      <Dock />
    </div>
  );
}

export default HomePage;`,
  "VSCodeWindow.jsx": `import Editor from "@monaco-editor/react";

function VSCodeWindow({ mobile }) {
  return (
    <div className="h-full w-full">
      <Editor height="100%" theme="vs-dark" />
    </div>
  );
}

export default VSCodeWindow;`,
};

function VSCodeWindow({ onClose, mobile = false }) {
  const [activeFile, setActiveFile] = useState("HomePage.jsx");
  const [maximized, setMaximized] = useState(true);
  const files = Object.keys(codeSamples);

  return (
    <motion.div
      drag={mobile || maximized ? false : true}
      dragMomentum={false}
      initial={mobile ? { opacity: 0, scale: 0.95 } : { x: 0, y: 0, opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`fixed z-30 overflow-hidden bg-[#07243c]/80 backdrop-blur-3xl border border-[#38bdf8]/25 shadow-[0_16px_48px_rgba(3,24,44,0.7)] ${
        mobile
          ? "inset-0 h-[100svh] w-full rounded-none mobile-glass-app"
          : maximized
          ? "inset-0 h-full w-full rounded-none z-50"
          : "left-10 top-10 h-[80vh] w-[75vw] rounded-2xl"
      }`}
    >
      {/* Top Bar */}
      {mobile ? (
        <div className="flex h-14 items-center justify-between border-b border-[#38bdf8]/20 bg-[#051c2e]/85 px-4 text-white">
          <button
            onClick={onClose}
            className="flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold hover:bg-white/20"
            aria-label="Back"
          >
            <IoChevronBack size={16} />
            <span>Back</span>
          </button>
          <span className="text-sm font-bold text-gray-200">Visual Studio Code</span>
          <button onClick={onClose} className="p-2 hover:text-red-400" aria-label="Close">
            <IoClose size={20} />
          </button>
        </div>
      ) : (
        <div className="flex h-10 items-center border-b border-[#38bdf8]/20 bg-[#051c2e]/85 px-3 text-white">
          <span className="flex-1 text-sm font-medium">Visual Studio Code</span>
          <button onClick={onClose} className="p-2 hover:bg-white/10 text-sm" aria-label="Minimize">
            <IoRemove />
          </button>
          <button onClick={() => setMaximized((prev) => !prev)} className="p-2 hover:bg-white/10 text-xs" aria-label={maximized ? "Restore" : "Maximize"}>
            <IoSquareOutline />
          </button>
          <button onClick={onClose} className="p-2 hover:bg-red-600" aria-label="Close">
            <IoClose />
          </button>
        </div>
      )}

      {/* Mobile File Selector Bar */}
      {mobile && (
        <div className="flex gap-2 overflow-x-auto bg-[#252526] px-3 py-2 text-xs text-white">
          {files.map((file) => (
            <button
              key={file}
              onClick={() => setActiveFile(file)}
              className={`rounded px-3 py-1.5 font-mono transition-colors ${
                activeFile === file
                  ? "bg-[#1e1e1e] font-semibold text-blue-400 border border-blue-500/40"
                  : "bg-white/5 text-gray-400"
              }`}
            >
              📄 {file}
            </button>
          ))}
        </div>
      )}

      <div className={`flex ${mobile ? "h-[calc(100%-100px)]" : "h-[calc(100%-40px)]"}`}>
        {/* Activity Bar (Desktop) */}
        <div className="hidden w-14 flex-col items-center gap-6 bg-[#181818] py-4 text-gray-400 sm:flex">
          <VscFiles size={22} />
          <VscSearch size={22} />
          <VscSourceControl size={22} />
        </div>

        {/* Explorer (Desktop) */}
        <div className="hidden w-60 bg-[#252526] text-white sm:block">
          <div className="border-b border-gray-700 p-3 text-xs font-semibold">EXPLORER</div>

          <div className="p-3 text-sm">
            📁 src
            {files.map((file) => (
              <div
                key={file}
                onClick={() => setActiveFile(file)}
                className={`ml-4 mt-2 cursor-pointer rounded px-2 py-1 ${
                  activeFile === file ? "bg-blue-600/40 text-blue-200" : "hover:bg-white/5"
                }`}
              >
                📄 {file}
              </div>
            ))}
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex flex-1 flex-col">
          {/* Tab Bar (Desktop) */}
          {!mobile && (
            <div className="flex h-10 items-center bg-[#2d2d2d] px-4 text-sm text-white">
              {activeFile}
            </div>
          )}

          {/* Monaco Editor */}
          <div className="flex-1">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={codeSamples[activeFile]}
              options={{
                fontSize: mobile ? 12 : 14,
                minimap: { enabled: !mobile },
                scrollBeyondLastLine: false,
                wordWrap: "on",
              }}
            />
          </div>

          {/* Terminal / Output */}
          <div
            className={`${
              mobile ? "h-24 text-xs" : "h-36 text-sm"
            } border-t border-gray-700 bg-[#181818] p-3 text-green-400 font-mono overflow-auto`}
          >
            PS C:\Portfolio_Anshumaan_Khare&gt; npm run dev
            <br />
            <span className="text-gray-400">
              Vite v8.0.16 ready in 340 ms. Local: http://localhost:5173/
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default VSCodeWindow;
