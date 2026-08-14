import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  IoClose,
  IoSearch,
  IoArrowBack,
  IoArrowForward,
  IoChevronBack,
  IoRefresh,
  IoRemove,
  IoSquareOutline,
} from "react-icons/io5";

function Chrome({ onClose, onMinimize, mobile = false }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [maximized, setMaximized] = useState(true);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const res = await axios.get(
        "https://en.wikipedia.org/w/api.php",
        {
          params: {
            action: "opensearch",
            search: query,
            limit: 15,
            namespace: 0,
            format: "json",
            origin: "*",
          },
        }
      );

      const data = res.data[1].map((title, index) => ({
        title,
        description: res.data[2][index],
        url: res.data[3][index],
      }));

      setResults(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      drag={mobile || maximized ? false : true}
      dragMomentum={false}
      initial={mobile ? { opacity: 0, scale: 0.95 } : { x: 0, y: 0, opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`fixed z-50 overflow-hidden border border-white/20 bg-black/20 text-white shadow-2xl backdrop-blur-3xl ${
        mobile
          ? "inset-0 h-[100svh] w-full rounded-none mobile-glass-app mobile-browser-app"
          : maximized
          ? "inset-0 h-full w-full rounded-none z-50"
          : "top-10 left-10 h-[85vh] w-[85vw] rounded-2xl"
      }`}
    >
      {/* Window Header */}
      {mobile ? (
        <div className="flex h-14 items-center justify-between border-b border-white/10 bg-black/30 px-4 text-white">
          <button
            onClick={onClose}
            className="flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold hover:bg-white/20"
            aria-label="Back"
          >
            <IoChevronBack size={16} />
            <span>Back</span>
          </button>
          <span className="text-sm font-bold text-gray-200">Chrome Browser</span>
          <button onClick={onClose} className="p-2 hover:text-red-400" aria-label="Close">
            <IoClose size={20} />
          </button>
        </div>
      ) : (
        <div className="flex h-10 items-center border-b border-white/10 bg-black/20 px-3 text-white">
          <span className="flex-1 text-sm font-medium">Chrome</span>

          <button onClick={onMinimize || onClose} className="p-2 hover:bg-white/10 text-sm" aria-label="Minimize">
            <IoRemove />
          </button>
          <button
            onClick={() => setMaximized((current) => !current)}
            className="p-2 hover:bg-white/10 text-xs"
            aria-label={maximized ? "Restore" : "Maximize"}
          >
            <IoSquareOutline />
          </button>
          <button onClick={onClose} className="p-2 hover:bg-red-600" aria-label="Close">
            <IoClose />
          </button>
        </div>
      )}

      {/* Browser Bar */}
      <div className="flex h-12 items-center gap-2 border-b border-white/10 bg-black/20 px-3 text-white">
        {!mobile && (
          <>
            <IoArrowBack className="cursor-pointer hover:text-gray-300" />
            <IoArrowForward className="cursor-pointer hover:text-gray-300" />
            <IoRefresh className="cursor-pointer hover:text-gray-300" />
          </>
        )}

        <div className="flex flex-1 items-center rounded-full bg-white/10 px-3 py-1.5">
          <IoSearch className="mr-2 shrink-0 text-gray-300" />

          <input
            type="text"
            placeholder="Search Wikipedia..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setResults([]);
              }}
              className="p-1 hover:text-gray-300"
            >
              <IoClose size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={`h-[calc(100%-88px)] overflow-y-auto ${mobile ? "p-4" : "p-8"} text-white`}>
        {results.length === 0 ? (
          <div className="flex flex-col items-center pt-12 text-center">
            <h1 className="mb-6 text-4xl font-bold sm:text-7xl">Google</h1>

            <div className="flex w-full max-w-[600px] items-center rounded-full bg-white/10 px-4 py-2.5 shadow-lg">
              <IoSearch className="mr-3 text-gray-300" size={20} />

              <input
                type="text"
                placeholder="Search anything on Wikipedia..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 bg-transparent text-base outline-none"
              />
            </div>

            <button
              onClick={handleSearch}
              className="mt-5 rounded-full bg-white/15 px-6 py-2.5 text-sm font-semibold backdrop-blur-2xl hover:bg-white/25"
            >
              Search Wikipedia
            </button>
          </div>
        ) : (
          results.map((item, index) => (
            <div
              key={index}
              className="mb-4 rounded-xl border border-white/10 bg-white/5 p-4 shadow-md backdrop-blur-md"
            >
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="text-lg font-semibold text-blue-400 hover:underline"
              >
                {item.title}
              </a>

              <p className="mt-1 text-xs text-emerald-400 truncate">{item.url}</p>

              <p className="mt-2 text-sm text-gray-300 leading-relaxed">{item.description}</p>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}

export default Chrome;
