import { motion } from "framer-motion";
import { IoClose, IoRemove, IoSquareOutline } from "react-icons/io5";
import { VscFiles, VscSearch, VscSourceControl } from "react-icons/vsc";
import Editor from "@monaco-editor/react";

function VSCodeWindow({ onClose }) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ x: 120, y: 50, opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed left-10 top-10 z-30
           h-[85vh] w-[90vw]
           overflow-hidden
           rounded-2xl
           bg-white/10
           backdrop-blur-2xl
           border border-white/20
           shadow-[0_8px_32px_rgba(0,0,0,0.37)]"
    >
      {/* Top Bar */}
      <div className="flex h-10 items-center bg-[#181818] px-3 text-white">
        <span className="flex-1 text-sm">Visual Studio Code</span>
        <button className="p-2  hover:bg-white/10 text-sm">
          <IoRemove />
        </button>
        <button className="p-2  hover:bg-white/10 text-xs">
          <IoSquareOutline />
        </button>
        <button onClick={onClose} className="p-2 hover:bg-red-600">
          <IoClose />
        </button>
      </div>

      <div className="flex h-[calc(100%-40px)]">
        {/* Activity Bar */}
        <div className="flex w-14 flex-col items-center gap-6 bg-[#181818] py-4 text-gray-400">
          <VscFiles size={22} />
          <VscSearch size={22} />
          <VscSourceControl size={22} />
        </div>

        {/* Explorer */}
        <div className="w-60 bg-[#252526] text-white">
          <div className="border-b border-gray-700 p-3 text-xs font-semibold">
            EXPLORER
          </div>

          <div className="p-3 text-sm">
            📁 src
            <div className="ml-4 mt-2">📄 App.jsx</div>
            <div className="ml-4">📄 HomePage.jsx</div>
            <div className="ml-4">📄 VSCodeWindow.jsx</div>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex flex-1 flex-col">
          {/* Tab Bar */}
          <div className="flex h-10 items-center bg-[#2d2d2d] px-4 text-sm text-white">
            App.jsx
          </div>

          {/* Monaco */}
          <div className="flex-1">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              theme="vs-dark"
              defaultValue={`function App() {
  return <h1>Hello VS Code</h1>;
}

export default App;`}
            />
          </div>

          {/* Terminal */}
          <div className="h-40 border-t border-gray-700 bg-[#181818] p-3 text-green-400">
            PS C:\\Users\\&gt; npm run dev
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default VSCodeWindow;
