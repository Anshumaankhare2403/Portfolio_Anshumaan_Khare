# Anshumaan Khare — Windows 11 Portfolio OS

An interactive portfolio website engineered as a full **Windows 11 desktop operating system experience** inside the browser. Built with **React 19**, **Vite 8**, **Tailwind CSS v4**, and **Framer Motion**, featuring multi-desktop workspaces, 2-finger touchpad gesture switching, a simulated Windows 11 Task Manager, personalized Settings with Catppuccin wallpapers, draggable windows, and a frosted glass (Mica / Acrylic) aesthetic.

---

## 🌐 Live Demo

[**Explore the Live Portfolio OS**](https://portfolio-anshumaan-khare.vercel.app/)

---

## 📸 Screenshots

### Desktop Experience

<p align="center">
  <img src="./public/screenshots/desktop-login.png" alt="Portfolio desktop login screen" width="32%" />
  <img src="./public/screenshots/desktop-home.png" alt="Portfolio desktop home screen" width="32%" />
  <img src="./public/screenshots/file-explorer.png" alt="Portfolio File Explorer window" width="32%" />
</p>

### Mobile Experience

<p align="center">
  <img src="./public/screenshots/mobile-lock-screen.png" alt="Portfolio mobile lock screen" width="30%" />
  <img src="./public/screenshots/mobile-home.png" alt="Portfolio mobile home screen" width="30%" />
  <img src="./public/screenshots/mobile-about.png" alt="Portfolio mobile about screen" width="30%" />
</p>

---

## ✨ Core Features

### 🪟 Windows 11 UI & Frosted Glass Aesthetic
- **Fluent & Mica Styling:** Frosted glassmorphism design with soft specular reflections, transparent backdrops (`backdrop-blur-2xl`), subtle borders, and smooth transitions.
- **Interactive App Launcher:** Full-screen glassy Windows start menu with instant live search and icon grid.
- **Frosted Dock & System Tray:** Responsive taskbar with running app indicators, space badges, and quick-access utility buttons.
- **Desktop Icons:** Frosted glass hover effects and multi-desktop launch management.

### 🖥️ Multi-Desktop Workspaces & Touchpad Gestures
- **4 Independent Desktop Spaces:**
  - `Desktop 1` — Main Portfolio & Highlights
  - `Desktop 2` — Development (VS Code, GitHub, Terminal)
  - `Desktop 3` — Media & Web (YouTube Music, Chrome)
  - `Desktop 4` — Files & System Tools (File Explorer, Settings, Task Manager)
- **2-Finger Touchpad & Trackpad Gestures:** Native 2-finger horizontal swipe across laptop trackpads or touchscreen devices to glide seamlessly between desktops at 60fps.
- **Keyboard Shortcuts:** `Ctrl + Alt + ← / →` for next/previous space, or `Alt + 1..4` to jump instantly.
- **Glassy Workspace OSD:** Floating on-screen display HUD indicating the active space with clickable `Desktop 1, 2, 3, 4` pills.
- **Dock Desktop Switcher:** Fast one-click `1  2  3  4` switcher with active app dots.
- **Interactive Gesture Guide & Tutorial:** Interactive 2-finger touchpad test pad and introductory modal.

### ⚙️ Windows 11 Task Manager
- **Central Process Management (`ProcessContext`):** Automatically registers, tracks, and manages all running portfolio windows and system background processes.
- **Sidebar Views:**
  - **Processes:** Dynamic process list with simulated CPU, RAM, Disk, and Network usage.
  - **Performance:** Live real-time animated SVG charts for CPU usage and memory utilization, plus hardware telemetry cards.
  - **App History:** Cumulative simulated CPU time and network data usage per application.
  - **Startup Apps:** Startup impact and status toggles for portfolio background tasks.
  - **Users:** Active user profile and session resource breakdown.
  - **Details:** Detailed PID, thread count, architecture, and memory footprint.
  - **Services:** Background services status and control.
- **Safe "End Task" Functionality:** Close applications with a confirmation modal; protected system processes (Desktop, Task Manager) cannot be terminated.

### 🎨 Settings & Personalization
- **Catppuccin Mocha Wallpaper Gallery:** Over 330+ curated wallpapers dynamically categorized (Anime & Art, Pixel & Retro, Space & Sci-Fi, Nature, City, Cozy, Minimal).
- **Personalization:** Light / Dark theme support, accent color selection, wallpaper fit adjustments, and lock screen settings.
- **About Windows:** System specs, portfolio build version, and developer credits.

### 📱 Draggable Portfolio Applications
- **File Explorer:** Windows 11-style explorer browsing Projects, Skills, Resume, and Certificates.
- **VS Code:** Embedded code editor powered by Monaco Editor.
- **Terminal:** Interactive command-line interface powered by xterm.js.
- **Projects App:** Showcase of featured mobile (Flutter), web (React), and backend projects.
- **About Me:** Interactive developer profile with 3D models (Three.js), tech stack badges, and biography.
- **YouTube Music & Chrome:** Working media player and simulated web browser.
- **Contact Me:** Contact form and social media handles.
- **Dedicated Mobile Layout:** Responsive phone experience when accessed on mobile devices.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| --- | --- |
| **React 19** | Modern component architecture, state hooks, and context providers |
| **Vite 8** | High-performance frontend build tool and dev server |
| **Tailwind CSS v4** | Modern utility-first styling with custom glassmorphism and animations |
| **Framer Motion** | Window open/close physics, spring animations, and multi-desktop gestures |
| **Monaco Editor** | In-browser VS Code syntax highlighting and editor |
| **xterm.js** | Browser-based interactive terminal emulation |
| **Three.js** | Interactive 3D graphics on the About Me experience |
| **React Icons** | Windows 11 & Fluent system icons |
| **React RND / Draggable** | Resizable and draggable window management |

---

## 📁 Project Structure

```text
Portfolio_Anshumaan_Khare/
├── public/                                # Static assets served directly
│   ├── favicon.svg
│   └── screenshots/                      # Portfolio showcase screenshots
├── src/
│   ├── assets/                           # SVG icons, wallpapers, resume, images
│   │   ├── scalable/                     # Fluent application SVG icons
│   │   ├── wallpaper/                    # Default system desktop wallpapers
│   │   └── walls-catppuccin-mocha/       # Catppuccin Mocha wallpaper collection
│   ├── components/
│   │   ├── Settings/                     # Windows 11 Settings application
│   │   │   ├── SettingsApp.jsx
│   │   │   ├── SettingsSidebar.jsx
│   │   │   ├── CatppuccinWallpaperGallery.jsx
│   │   │   └── pages/                   # Personalization, System, About pages
│   │   ├── TaskManager/                  # Windows 11 Task Manager
│   │   │   ├── TaskManager.jsx
│   │   │   ├── TaskManagerSidebar.jsx
│   │   │   ├── Processes.jsx
│   │   │   ├── Performance.jsx
│   │   │   ├── AppHistory.jsx
│   │   │   ├── StartupApps.jsx
│   │   │   ├── Users.jsx
│   │   │   ├── Details.jsx
│   │   │   └── Services.jsx
│   │   ├── AppMenu.jsx                   # Glassy Start Menu / App Launcher
│   │   ├── App_icons.jsx                 # Desktop application icon shortcuts
│   │   ├── Dock.jsx                      # Taskbar with desktop switcher & tray
│   │   ├── WorkspaceOSD.jsx              # Floating multi-desktop HUD
│   │   ├── GestureGuideModal.jsx         # 2-Finger touchpad gesture guide & tester
│   │   ├── DesktopTutorialModal.jsx      # Multi-desktop introduction walkthrough
│   │   ├── FileExp.jsx                   # Windows 11 File Explorer
│   │   ├── Terminal.jsx                  # xterm.js interactive terminal
│   │   ├── VSCodeWindow.jsx              # Monaco Editor VS Code window
│   │   ├── ProjectsApp.jsx               # Portfolio projects showcase
│   │   ├── About.jsx                     # About Me & Three.js 3D avatar
│   │   ├── Chrome.jsx                    # Web browser window
│   │   ├── YtMusice.jsx                  # Music player
│   │   ├── ContactApp.jsx                # Contact form
│   │   └── SplashScreen.jsx              # Windows lock & login screen
│   ├── context/
│   │   ├── ProcessContext.jsx            # Central process & telemetry simulation
│   │   └── SettingsContext.jsx           # Wallpaper, theme, & accent color state
│   ├── data/
│   │   └── catppuccinWallpapers.js       # Wallpapers metadata & categorization
│   ├── hooks/
│   │   └── useProcessManager.js          # Process management hook
│   ├── Pages/
│   │   ├── HomePage.jsx                  # Main desktop & multi-workspace manager
│   │   └── HomepageForMobile.jsx         # Dedicated mobile OS layout
│   ├── App.jsx                           # Root router & context hierarchy
│   ├── index.css                         # Tailwind CSS v4 styling & glass effects
│   └── main.jsx                          # React application entry point
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v20 or higher recommended)
- **npm** (v10 or higher)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Anshumaankhare2403/Portfolio_Anshumaan_Khare.git
   cd Portfolio_Anshumaan_Khare
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173` to explore the portfolio desktop.

---

## 📜 Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Runs the Vite development server with Hot Module Replacement (HMR). |
| `npm run build` | Compiles an optimized production build in the `dist/` directory. |
| `npm run preview` | Locally serves and tests the production build. |
| `npm run lint` | Runs ESLint to check for code quality and syntax errors. |

---

## 🙏 Credits & Acknowledgments

- **Catppuccin Mocha Wallpapers:** Wallpapers sourced and credited to the [walls-catppuccin-mocha](https://github.com/orangci/walls-catppuccin-mocha) repository by [@orangci](https://github.com/orangci).
- **Icons:** Microsoft Windows 11 Fluent icons and [React Icons](https://react-icons.github.io/react-icons/).
- **Monaco Editor:** Maintained by Microsoft.

---

## 👨‍💻 Author

**Anshumaan Khare**
- **GitHub:** [@Anshumaankhare2403](https://github.com/Anshumaankhare2403)
- **Portfolio:** [portfolio-anshumaan-khare.vercel.app](https://portfolio-anshumaan-khare.vercel.app/)
