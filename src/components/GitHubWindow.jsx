import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  IoLogoGithub,
  IoStarOutline,
  IoStar,
  IoGitNetworkOutline,
  IoLocationOutline,
  IoMailOutline,
  IoLinkOutline,
  IoSearchOutline,
  IoChevronBack,
  IoClose,
  IoRemove,
  IoSquareOutline,
  IoBookOutline,
  IoGitBranchOutline,
  IoOpenOutline,
  IoLogoTwitter,
} from "react-icons/io5";

// Real repositories fallback data directly from GitHub @Anshumaankhare2403
const realRepos = [
  {
    id: 1168955846,
    name: "Portfolio_Anshumaan_Khare",
    description: "An interactive operating-system-inspired portfolio web application built with React, Vite, Tailwind CSS, and Framer Motion.",
    language: "JavaScript",
    langColor: "#f1e05a",
    stars: 5,
    forks: 2,
    updated: "Updated recently",
    homepage: "https://portfolio-anshumaan-khare.vercel.app",
    url: "https://github.com/Anshumaankhare2403/Portfolio_Anshumaan_Khare",
  },
  {
    id: 1066497998,
    name: "DSA_prape_in_JS",
    description: "Data Structures and Algorithms implementations, problem solving, and interview preparation in JavaScript.",
    language: "JavaScript",
    langColor: "#f1e05a",
    stars: 3,
    forks: 1,
    updated: "Updated 2 weeks ago",
    url: "https://github.com/Anshumaankhare2403/DSA_prape_in_JS",
  },
  {
    id: 1279192600,
    name: "react_prap_with_three_s",
    description: "3D interactive web experiences and Three.js graphics experiments built with React.",
    language: "JavaScript",
    langColor: "#f1e05a",
    stars: 4,
    forks: 1,
    updated: "Updated last month",
    url: "https://github.com/Anshumaankhare2403/react_prap_with_three_s",
  },
  {
    id: 1311662524,
    name: "Dynamic_Form",
    description: "Dynamic Form rendering engine implemented with JSON schema in Flutter and Dart.",
    language: "Dart",
    langColor: "#00B4AB",
    stars: 2,
    forks: 0,
    updated: "Updated last month",
    url: "https://github.com/Anshumaankhare2403/Dynamic_Form",
  },
  {
    id: 1302340834,
    name: "NimbusApp",
    description: "Weather forecast and real-time environment status tracking utility application.",
    language: "JavaScript",
    langColor: "#f1e05a",
    stars: 2,
    forks: 0,
    updated: "Updated recently",
    url: "https://github.com/Anshumaankhare2403/NimbusApp",
  },
  {
    id: 1148519987,
    name: "HTML_And_CSS",
    description: "Web fundamentals, modern layout practice, responsive CSS components, and UI showcases.",
    language: "HTML",
    langColor: "#e34c26",
    stars: 1,
    forks: 0,
    updated: "Updated recently",
    url: "https://github.com/Anshumaankhare2403/HTML_And_CSS",
  },
];

// Generate synthetic 52-week contribution matrix
const generateContributionGrid = () => {
  const weeks = 52;
  const daysPerWeek = 7;
  const matrix = [];
  for (let w = 0; w < weeks; w++) {
    const weekDays = [];
    for (let d = 0; d < daysPerWeek; d++) {
      const level = Math.random() > 0.35 ? Math.floor(Math.random() * 4) + 1 : 0;
      weekDays.push(level);
    }
    matrix.push(weekDays);
  }
  return matrix;
};

const contributionLevels = [
  "bg-[#161b22]", // Level 0
  "bg-[#0e4429]", // Level 1
  "bg-[#006d32]", // Level 2
  "bg-[#26a641]", // Level 3
  "bg-[#39d353]", // Level 4
];

export default function GitHubWindow({ onClose, onMinimize, mobile = false }) {
  const [maximized, setMaximized] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [starredMap, setStarredMap] = useState({});
  const [contributionMatrix] = useState(generateContributionGrid);

  // Live profile & repos state
  const [repos, setRepos] = useState(realRepos);
  const [profile, setProfile] = useState({
    login: "Anshumaankhare2403",
    name: "Anshumaan Khare",
    avatar_url: "https://avatars.githubusercontent.com/u/191150152?v=4",
    bio: "Building the web & apps, one commit at a time 🚀 | ⚛️ React | 🟢 Node.js | Express | 🗄️ MongoDB | MySQL | ☁️ AWS",
    location: "Bangalore, India",
    public_repos: 39,
    followers: 2,
    following: 5,
    twitter_username: "khare_anshumaan",
  });

  // Optionally fetch live repos & profile from GitHub API
  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const userRes = await fetch("https://api.github.com/users/Anshumaankhare2403");
        if (userRes.ok) {
          const userData = await userRes.json();
          setProfile((prev) => ({
            ...prev,
            avatar_url: userData.avatar_url || prev.avatar_url,
            name: userData.name || prev.name,
            bio: userData.bio || prev.bio,
            location: userData.location || prev.location,
            public_repos: userData.public_repos || prev.public_repos,
            followers: userData.followers || prev.followers,
            following: userData.following || prev.following,
            twitter_username: userData.twitter_username || prev.twitter_username,
          }));
        }

        const reposRes = await fetch("https://api.github.com/users/Anshumaankhare2403/repos?sort=updated&per_page=30");
        if (reposRes.ok) {
          const reposData = await reposRes.json();
          if (Array.isArray(reposData) && reposData.length > 0) {
            const mapped = reposData.map((r) => ({
              id: r.id,
              name: r.name,
              description: r.description || "Public repository by Anshumaan Khare",
              language: r.language || "JavaScript",
              langColor:
                r.language === "Dart"
                  ? "#00B4AB"
                  : r.language === "HTML"
                  ? "#e34c26"
                  : r.language === "CSS"
                  ? "#563d7c"
                  : "#f1e05a",
              stars: r.stargazers_count || 0,
              forks: r.forks_count || 0,
              updated: `Updated ${new Date(r.updated_at).toLocaleDateString()}`,
              homepage: r.homepage,
              url: r.html_url,
            }));
            setRepos(mapped);
          }
        }
      } catch (err) {
        // Use initial fallback data if offline or API rate-limited
      }
    }

    fetchGitHubData();
  }, []);

  const toggleStar = (repoId) => {
    setStarredMap((prev) => ({
      ...prev,
      [repoId]: !prev[repoId],
    }));
  };

  const filteredRepos = repos.filter(
    (repo) =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <motion.div
      drag={mobile || maximized ? false : true}
      dragMomentum={false}
      initial={mobile ? { opacity: 0, scale: 0.95 } : { x: 0, y: 0, opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`fixed pointer-events-auto flex flex-col overflow-hidden border border-[#30363d] bg-[#0d1117] text-[#c9d1d9] font-sans shadow-2xl ${
        mobile
          ? "inset-0 z-50 h-[100svh] w-full rounded-none"
          : maximized
          ? "inset-0 z-50 rounded-none"
          : "absolute left-10 top-10 h-[78vh] w-[68vw] rounded-2xl"
      }`}
    >
      {/* Top Window Bar */}
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-[#30363d] bg-[#161b22] px-4">
        <div className="flex items-center gap-3">
          {mobile && (
            <button
              onClick={onClose}
              className="flex items-center gap-1 rounded-lg bg-[#21262d] px-2.5 py-1 text-xs font-semibold text-white hover:bg-[#30363d]"
            >
              <IoChevronBack size={16} />
              <span>Back</span>
            </button>
          )}
          <IoLogoGithub size={24} className="text-white" />
          <span className="text-sm font-semibold text-white tracking-wide">GitHub</span>
          <span className="hidden sm:inline rounded-full bg-[#21262d] border border-[#30363d] px-2.5 py-0.5 text-xs text-[#8b949e]">
            {profile.login}
          </span>
        </div>

        {!mobile && (
          <div className="flex items-center gap-1">
            <button
              onClick={onMinimize || onClose}
              className="rounded p-1.5 hover:bg-[#21262d] text-[#8b949e] hover:text-white"
              aria-label="Minimize"
            >
              <IoRemove />
            </button>
            <button
              onClick={() => setMaximized(!maximized)}
              className="rounded p-1.5 hover:bg-[#21262d] text-[#8b949e] hover:text-white"
              aria-label={maximized ? "Restore" : "Maximize"}
            >
              <IoSquareOutline />
            </button>
            <button
              onClick={onClose}
              className="rounded p-1.5 hover:bg-red-600 text-[#8b949e] hover:text-white"
              aria-label="Close"
            >
              <IoClose />
            </button>
          </div>
        )}
      </div>

      {/* GitHub Sub-Header / Search & Navigation Tabs */}
      <div className="border-b border-[#30363d] bg-[#161b22] px-4 pt-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          {/* GitHub Search Input */}
          <div className="flex items-center gap-2 rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-1.5 text-xs text-[#8b949e] focus-within:border-[#58a6ff] focus-within:ring-1 focus-within:ring-[#58a6ff] w-full sm:w-80">
            <IoSearchOutline size={16} />
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-white outline-none placeholder:text-[#8b949e]"
            />
          </div>

          <a
            href="https://github.com/Anshumaankhare2403"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-md bg-[#238636] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#2ea043] transition-colors shadow-sm"
          >
            <IoOpenOutline size={15} />
            <span>View on GitHub.com</span>
          </a>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-6 text-sm font-medium text-[#8b949e]">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 pb-3 border-b-2 transition ${
              activeTab === "overview"
                ? "border-[#f78166] text-white font-semibold"
                : "border-transparent hover:text-[#c9d1d9]"
            }`}
          >
            <IoBookOutline size={16} />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab("repositories")}
            className={`flex items-center gap-2 pb-3 border-b-2 transition ${
              activeTab === "repositories"
                ? "border-[#f78166] text-white font-semibold"
                : "border-transparent hover:text-[#c9d1d9]"
            }`}
          >
            <IoGitBranchOutline size={16} />
            <span>Repositories</span>
            <span className="rounded-full bg-[#30363d] px-2 py-0.5 text-xs font-mono text-white">
              {profile.public_repos || repos.length}
            </span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Profile Card */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <div className="flex items-center lg:flex-col lg:items-start gap-4">
              <div className="relative">
                <img
                  src={profile.avatar_url}
                  alt={profile.name}
                  className="h-20 w-20 lg:h-48 lg:w-48 rounded-full border-2 border-[#30363d] object-cover shadow-xl"
                />
                <div className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-[#0d1117]" title="Online" />
              </div>

              <div className="flex flex-col">
                <h1 className="text-xl lg:text-2xl font-bold text-white leading-tight">
                  {profile.name}
                </h1>
                <p className="text-sm text-[#8b949e] font-mono">@{profile.login}</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#c9d1d9] leading-relaxed">
              {profile.bio}
            </p>

            {/* Profile Meta Details */}
            <div className="flex flex-col gap-2 text-xs text-[#8b949e] border-t border-[#30363d] pt-4">
              <div className="flex items-center gap-2 text-[#c9d1d9]">
                <IoLocationOutline size={16} />
                <span>{profile.location}</span>
              </div>
              <a
                href="mailto:anshumaankhare@gmail.com"
                className="flex items-center gap-2 hover:text-[#58a6ff] transition"
              >
                <IoMailOutline size={16} />
                <span className="truncate">anshumaankhare@gmail.com</span>
              </a>
              {profile.twitter_username && (
                <a
                  href={`https://x.com/${profile.twitter_username}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-[#58a6ff] transition"
                >
                  <IoLogoTwitter size={16} />
                  <span>@{profile.twitter_username}</span>
                </a>
              )}
              <div className="flex items-center gap-2">
                <IoLinkOutline size={16} />
                <span className="text-[#58a6ff]">Portfolio OS Live</span>
              </div>
            </div>

            {/* Follow Stats */}
            <div className="flex items-center gap-4 text-xs text-[#8b949e] border-t border-[#30363d] pt-4">
              <div>
                <strong className="text-white">{profile.followers}</strong> followers
              </div>
              <div>
                <strong className="text-white">{profile.following}</strong> following
              </div>
            </div>
          </div>

          {/* Main Repos & Contributions View */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {activeTab === "overview" && (
              <>
                {/* Pinned Repositories Section */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-semibold text-white tracking-wide">
                      Pinned Repositories
                    </h2>
                    <a
                      href="https://github.com/Anshumaankhare2403"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-[#8b949e] hover:text-[#58a6ff]"
                    >
                      View on GitHub
                    </a>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredRepos.slice(0, 6).map((repo) => {
                      const isStarred = starredMap[repo.id];
                      const starCount = repo.stars + (isStarred ? 1 : 0);

                      return (
                        <div
                          key={repo.id}
                          className="flex flex-col justify-between rounded-md border border-[#30363d] bg-[#161b22] p-4 hover:border-[#8b949e] transition shadow-sm"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <a
                                href={repo.url}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 text-sm font-semibold text-[#58a6ff] hover:underline truncate"
                              >
                                <IoBookOutline size={16} className="shrink-0 text-[#8b949e]" />
                                <span className="truncate">{repo.name}</span>
                              </a>
                              <span className="rounded-full border border-[#30363d] px-2 py-0.5 text-[10px] font-semibold text-[#8b949e]">
                                Public
                              </span>
                            </div>

                            <p className="text-xs text-[#8b949e] leading-relaxed mb-4 line-clamp-2">
                              {repo.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between text-xs text-[#8b949e] pt-2 border-t border-[#21262d]">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1.5">
                                <span
                                  className="h-3 w-3 rounded-full"
                                  style={{ backgroundColor: repo.langColor }}
                                />
                                <span>{repo.language}</span>
                              </div>

                              <button
                                onClick={() => toggleStar(repo.id)}
                                className={`flex items-center gap-1 hover:text-white transition ${
                                  isStarred ? "text-amber-400 font-bold" : ""
                                }`}
                              >
                                {isStarred ? <IoStar size={14} /> : <IoStarOutline size={14} />}
                                <span>{starCount}</span>
                              </button>

                              <div className="flex items-center gap-1">
                                <IoGitNetworkOutline size={14} />
                                <span>{repo.forks}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 52-Week Contribution Matrix */}
                <div className="rounded-md border border-[#30363d] bg-[#161b22] p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xs font-semibold text-white">
                      Contributions in the last year
                    </h2>
                    <div className="flex items-center gap-1 text-[10px] text-[#8b949e]">
                      <span>Less</span>
                      {contributionLevels.map((lvlClass, idx) => (
                        <div key={idx} className={`h-2.5 w-2.5 rounded-sm ${lvlClass}`} />
                      ))}
                      <span>More</span>
                    </div>
                  </div>

                  {/* Matrix Squares Grid */}
                  <div className="overflow-x-auto pb-2">
                    <div className="flex gap-1 min-w-[640px]">
                      {contributionMatrix.map((week, wIdx) => (
                        <div key={wIdx} className="flex flex-col gap-1">
                          {week.map((level, dIdx) => (
                            <div
                              key={dIdx}
                              title={`Contributions on week ${wIdx + 1}`}
                              className={`h-2.5 w-2.5 rounded-sm ${contributionLevels[level]} transition-transform hover:scale-125`}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "repositories" && (
              <div className="flex flex-col gap-3">
                {filteredRepos.map((repo) => (
                  <div
                    key={repo.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#30363d] pb-4 pt-2"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-base font-semibold text-[#58a6ff] hover:underline"
                        >
                          {repo.name}
                        </a>
                        <span className="rounded-full border border-[#30363d] px-2 py-0.5 text-[10px] font-semibold text-[#8b949e]">
                          Public
                        </span>
                      </div>
                      <p className="text-xs text-[#8b949e]">{repo.description}</p>
                      <div className="flex items-center gap-4 text-xs text-[#8b949e] mt-2">
                        <div className="flex items-center gap-1">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: repo.langColor }}
                          />
                          <span>{repo.language}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <IoStarOutline size={14} />
                          <span>{repo.stars}</span>
                        </div>
                        <span>{repo.updated}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleStar(repo.id)}
                      className="flex items-center gap-1.5 rounded-md border border-[#30363d] bg-[#21262d] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#30363d] transition self-start sm:self-auto"
                    >
                      {starredMap[repo.id] ? (
                        <>
                          <IoStar size={14} className="text-amber-400" />
                          <span>Starred</span>
                        </>
                      ) : (
                        <>
                          <IoStarOutline size={14} />
                          <span>Star</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
