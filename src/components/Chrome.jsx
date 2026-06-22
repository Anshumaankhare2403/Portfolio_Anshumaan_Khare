import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  IoClose,
  IoSearch,
  IoArrowBack,
  IoArrowForward,
  IoRefresh,
  IoRemove,
  IoSquareOutline,
} from "react-icons/io5";

function Chrome({ onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

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
      drag
      dragMomentum={false}
      initial={{ x: 100, y: 40, opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="
        fixed top-10 left-10 z-50
        h-[85vh] w-[85vw]
        overflow-hidden
        rounded-2xl
        bg-black/20
        backdrop-blur-2xl
        border border-white/10
        shadow-2xl
      "
    >
      {/* Window Header */}
      <div className="flex h-10 items-center border-b border-white/10 bg-black/20 px-3 text-white">
        <span className="flex-1 text-sm">Chrome</span>

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

      {/* Browser Bar */}
      <div className="flex h-12 items-center gap-3 bg-black/20 px-4 text-white">
        <IoArrowBack />
        <IoArrowForward />
        <IoRefresh />

        <div className="flex flex-1 items-center rounded-full bg-white/10 px-4 py-2">
          <IoSearch className="mr-2" />

          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && handleSearch()
            }
            className="w-full bg-transparent outline-none"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="h-[calc(100%-88px)] overflow-y-auto p-8 text-white">
        {results.length === 0 ? (
          <div className="flex flex-col items-center pt-20">
            <h1 className="mb-10 text-7xl font-semibold">
              Google
            </h1>

            <div className="flex w-[700px] items-center rounded-full bg-white/10 px-5 py-3">
              <IoSearch className="mr-3" />

              <input
                type="text"
                placeholder="Search anything..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleSearch()
                }
                className="flex-1 bg-transparent outline-none"
              />
            </div>

            <button
              onClick={handleSearch}
              className="mt-6 rounded-lg bg-black/20
        backdrop-blur-2xl px-5 py-2 hover:bg-gray-700"
            >
              Search
            </button>
          </div>
        ) : (
          results.map((item, index) => (
            <div
              key={index}
              className="mb-6 rounded-xl bg-white/5 p-4"
            >
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="text-xl text-blue-400 hover:underline"
              >
                {item.title}
              </a>

              <p className="mt-1 text-sm text-green-400">
                {item.url}
              </p>

              <p className="mt-2 text-gray-300">
                {item.description}
              </p>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}

export default Chrome;