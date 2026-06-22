import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import App_icons from "../components/App_icons";
import Dock from "../components/Dock";
// import ThreeModel from "../components/ThreeModel";
import FileExp from "../components/FileExp";
import VSCodeWindow from "../components/VSCodeWindow";
import YtMusice from "../components/YtMusice";
import Terminal from "../components/Terminal";
import Chrome from "../components/Chrome";
import About from "../components/About";
// import icons1 from "../assets/color-lightblue/*.svg";

const svgs = import.meta.glob("../assets/color-lightblue/*.svg", {
  eager: true,
  import: "default",
});

const images = Object.values(svgs);

const svgs1 = import.meta.glob("../assets/scalable/*.svg", {
  eager: true,
  import: "default",
});

const imgs = Object.values(svgs1);

function HomePage() {
  const [isFileExplorerOpen, setIsFileExplorerOpen] = useState(false);
  const [isVSCodeOpen, setIsVSCodeOpen] = useState(false);
  const [isYtOpen, setYtOpen] = useState(false);
  const [isTerminalOpen, setTerminalOpen] = useState(false);
  const [isChromeOpen, setChromeOpen] = useState(false);
  const [isAboutOpen, setAboutOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4 ">
        {/* {images.map((image, index) => (
          <App_icons
            key={index}
            image={image}
            title={`File ${index + 1}`}
          />
        ))} */}
        <App_icons
          image={images[23]}
          title={`This PC`}
          onClick={() => setIsFileExplorerOpen(true)}
        />
        <App_icons image={images[24]} 
        title={`About Me`}
        onClick={() => setAboutOpen(true)}
         />
        <App_icons image={imgs[0]} 
        title={`Chrome`} 
        onClick={() => setChromeOpen(true)}
        />
        <App_icons
          image={imgs[5]}
          title={`Visual Studio Code`}
          onClick={() => setIsVSCodeOpen(true)}
        />
        <App_icons
          image={imgs[6]}
          title={`YouTube Music`}
          onClick={() => setYtOpen(true)}
        />
        <App_icons image={imgs[2]} 
        title={`Terminal`} 
        onClick={() => setTerminalOpen(true)}
        />
      </div>

      <AnimatePresence>
        {isFileExplorerOpen && (
          <FileExp
            key="file-explorer"
            onClose={() => setIsFileExplorerOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isVSCodeOpen && (
          <VSCodeWindow key="vscode" onClose={() => setIsVSCodeOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isYtOpen && (
          <YtMusice key="youtube-music" onClose={() => setYtOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isTerminalOpen && (
          <Terminal key="terminal" onClose={() => setTerminalOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isChromeOpen && (
          <Chrome key="chrome" onClose={() => setChromeOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAboutOpen && (
          <About key="About" onClose={() => setAboutOpen(false)} />
        )}
      </AnimatePresence>
      {/* <FileExp/> */}
      <Dock
        image1={images[21]}
        image2={imgs[0]}
        image3={imgs[1]}
        image4={imgs[3]}
        image5={imgs[4]}
        onFilesClick={() => setIsFileExplorerOpen(true)}
        onChromeClick={() => setChromeOpen(true)}
        onAboutClick={() => setAboutOpen(true)}
      />

      {/* <ThreeModel/> */}
    </>
  );
}

export default HomePage;
