import { createContext, useContext, useEffect, useState, useCallback, useRef, useMemo } from "react";

// Initial system and app definitions
export const SYSTEM_PROCESSES = [
  {
    id: "desktop-dwm",
    name: "Desktop Window Manager",
    description: "Desktop composition engine & visual manager",
    type: "system",
    group: "system",
    pid: 1024,
    baseCpu: 1.8,
    baseMem: 86,
    isProtected: true,
    user: "SYSTEM",
    arch: "x64",
  },
  {
    id: "explorer-shell",
    name: "Windows Explorer & Shell",
    description: "Desktop workspace, dock, and launcher host",
    type: "system",
    group: "system",
    pid: 1480,
    baseCpu: 0.9,
    baseMem: 58,
    isProtected: true,
    user: "Anshumaan",
    arch: "x64",
  },
  {
    id: "runtime-broker",
    name: "Runtime Broker",
    description: "Windows permissions & sandboxing supervisor",
    type: "system",
    group: "background",
    pid: 1892,
    baseCpu: 0.4,
    baseMem: 31,
    isProtected: true,
    user: "Anshumaan",
    arch: "x64",
  },
  {
    id: "audio-service",
    name: "Windows Audio Device Graph",
    description: "Audio engine audio endpoint isolation",
    type: "system",
    group: "background",
    pid: 2488,
    baseCpu: 0.6,
    baseMem: 24,
    isProtected: true,
    user: "LOCAL SERVICE",
    arch: "x64",
  },
  {
    id: "antivirus-service",
    name: "Microsoft Defender Antivirus Service",
    description: "Antimalware Service Executable",
    type: "system",
    group: "background",
    pid: 3012,
    baseCpu: 0.5,
    baseMem: 94,
    isProtected: true,
    user: "SYSTEM",
    arch: "x64",
  },
];

export const APP_METADATA = {
  taskmanager: {
    id: "taskmanager",
    name: "Task Manager",
    description: "Windows Task Manager & System Diagnostics",
    pid: 2190,
    baseCpu: 1.2,
    baseMem: 44,
    isProtected: true,
  },
  settings: {
    id: "settings",
    name: "Settings",
    description: "Windows 11 Personalization & Environment Settings",
    pid: 5124,
    baseCpu: 1.4,
    baseMem: 48,
    isProtected: false,
  },
  files: {
    id: "files",
    name: "File Explorer (This PC)",
    description: "Storage, Files, and Virtual Drives Manager",
    pid: 3492,
    baseCpu: 2.1,
    baseMem: 68,
    isProtected: false,
  },
  chrome: {
    id: "chrome",
    name: "Google Chrome",
    description: "Chrome Web Browser Sandbox Host",
    pid: 8120,
    baseCpu: 4.8,
    baseMem: 186,
    isProtected: false,
  },
  youtube: {
    id: "youtube",
    name: "YouTube Music",
    description: "Audio & Web Media Streaming Host",
    pid: 7416,
    baseCpu: 2.3,
    baseMem: 82,
    isProtected: false,
  },
  terminal: {
    id: "terminal",
    name: "Windows Terminal (PowerShell)",
    description: "Interactive Command Prompt & UNIX Subsystem",
    pid: 6204,
    baseCpu: 0.8,
    baseMem: 39,
    isProtected: false,
  },
  vscode: {
    id: "vscode",
    name: "Visual Studio Code",
    description: "Monaco Editor & Development Environment",
    pid: 9284,
    baseCpu: 3.5,
    baseMem: 148,
    isProtected: false,
  },
  about: {
    id: "about",
    name: "About Me Portfolio",
    description: "Developer profile, bio, and resume viewer",
    pid: 4028,
    baseCpu: 1.1,
    baseMem: 46,
    isProtected: false,
  },
  projects: {
    id: "projects",
    name: "Projects Showcase",
    description: "Portfolio Projects & Live Demonstrations",
    pid: 4180,
    baseCpu: 1.6,
    baseMem: 56,
    isProtected: false,
  },
  github: {
    id: "github",
    name: "GitHub Client",
    description: "GitHub repositories & activity viewer",
    pid: 4360,
    baseCpu: 1.2,
    baseMem: 49,
    isProtected: false,
  },
  contact: {
    id: "contact",
    name: "Contact Us",
    description: "Email & Direct Inquiry Dispatcher",
    pid: 4420,
    baseCpu: 0.7,
    baseMem: 34,
    isProtected: false,
  },
};

// Default Startup Applications
export const INITIAL_STARTUP_APPS = [
  {
    id: "onedrive",
    name: "Microsoft OneDrive",
    publisher: "Microsoft Corporation",
    status: "Enabled",
    impact: "Low",
    startupType: "Registry (Run)",
  },
  {
    id: "security-notify",
    name: "Windows Security notification icon",
    publisher: "Microsoft Corporation",
    status: "Enabled",
    impact: "None",
    startupType: "Registry (Run)",
  },
  {
    id: "discord",
    name: "Discord",
    publisher: "Discord Inc.",
    status: "Enabled",
    impact: "High",
    startupType: "Registry (Run)",
  },
  {
    id: "spotify",
    name: "Spotify",
    publisher: "Spotify AB",
    status: "Disabled",
    impact: "Medium",
    startupType: "Startup folder",
  },
  {
    id: "steam",
    name: "Steam Client Bootstrapper",
    publisher: "Valve Corporation",
    status: "Disabled",
    impact: "High",
    startupType: "Registry (Run)",
  },
  {
    id: "edge",
    name: "Microsoft Edge Assistant",
    publisher: "Microsoft Corporation",
    status: "Enabled",
    impact: "Medium",
    startupType: "Registry (Run)",
  },
];

// Default Services
export const INITIAL_SERVICES = [
  {
    id: "Audiosrv",
    name: "Audiosrv",
    displayName: "Windows Audio",
    pid: 2488,
    status: "Running",
    group: "AudioGroup",
    description: "Manages audio for Windows-based programs.",
  },
  {
    id: "wuauserv",
    name: "wuauserv",
    displayName: "Windows Update",
    pid: 3120,
    status: "Running",
    group: "UpdateGroup",
    description: "Enables the detection, download, and installation of updates.",
  },
  {
    id: "BITS",
    name: "BITS",
    displayName: "Background Intelligent Transfer Service",
    pid: 3244,
    status: "Running",
    group: "NetworkGroup",
    description: "Transfers files in the background using idle network bandwidth.",
  },
  {
    id: "Spooler",
    name: "Spooler",
    displayName: "Print Spooler",
    pid: 3580,
    status: "Running",
    group: "DeviceGroup",
    description: "Spools print jobs and handles interaction with the printer.",
  },
  {
    id: "Themes",
    name: "Themes",
    displayName: "Themes & Visual Styles",
    pid: 1480,
    status: "Running",
    group: "SystemGroup",
    description: "Provides user experience theme management and styling.",
  },
  {
    id: "Netman",
    name: "Netman",
    displayName: "Network Connections",
    pid: 4104,
    status: "Running",
    group: "NetworkGroup",
    description: "Manages objects in the Network and Dial-Up Connections folder.",
  },
  {
    id: "WlanSvc",
    name: "WlanSvc",
    displayName: "WLAN AutoConfig",
    pid: 4212,
    status: "Running",
    group: "NetworkGroup",
    description: "Logic to configure, discover, and connect to 802.11 wireless networks.",
  },
  {
    id: "SysMain",
    name: "SysMain",
    displayName: "SysMain (Superfetch)",
    pid: 4490,
    status: "Running",
    group: "SystemGroup",
    description: "Maintains and improves system performance over time.",
  },
];

const ProcessContext = createContext(null);

export function ProcessProvider({ children }) {
  // Simulation activation flag - defers heavy interval until after login
  const [isActive, setIsActive] = useState(false);
  const activateSimulation = useCallback(() => setIsActive(true), []);

  // App state handlers registered by HomePage (stored in ref to avoid re-rendering context on registration)
  // Format: { [appId]: { close: () => void, open: () => void, isOpen: boolean, state: string } }
  const appHandlersRef = useRef({});

  // Which apps are currently open (derived from handlers or direct tracking)
  const [openApps, setOpenApps] = useState(() => ({
    desktop: true,
    taskmanager: false,
    settings: false,
    files: false,
    chrome: false,
    youtube: false,
    terminal: false,
    vscode: false,
    about: false,
    projects: false,
    github: false,
    contact: false,
  }));

  // Animated live values per process
  const [liveProcessMetrics, setLiveProcessMetrics] = useState({});

  // System-wide Performance History (sliding 35 data points)
  const [performanceHistory, setPerformanceHistory] = useState(() => {
    const initial = [];
    const now = Date.now();
    for (let i = 35; i >= 0; i--) {
      initial.push({
        time: new Date(now - i * 1000).toLocaleTimeString([], {
          minute: "2-digit",
          second: "2-digit",
        }),
        cpu: Math.floor(10 + Math.random() * 8),
        memory: 3.8 + Math.random() * 0.2,
        disk: Math.floor(1 + Math.random() * 4),
        network: (0.4 + Math.random() * 2.5).toFixed(1),
      });
    }
    return initial;
  });

  // Startup Apps & Services
  const [startupApps, setStartupApps] = useState(INITIAL_STARTUP_APPS);
  const [services, setServices] = useState(INITIAL_SERVICES);


  // App History statistics (accumulated)
  const [appHistory, setAppHistory] = useState({
    chrome: { name: "Google Chrome", cpuTime: "0:24:12", network: "412.5 MB" },
    vscode: { name: "Visual Studio Code", cpuTime: "0:38:45", network: "84.2 MB" },
    terminal: { name: "Windows Terminal", cpuTime: "0:09:18", network: "12.8 MB" },
    youtube: { name: "YouTube Music", cpuTime: "0:45:02", network: "620.4 MB" },
    files: { name: "File Explorer", cpuTime: "0:06:50", network: "4.1 MB" },
    settings: { name: "Settings", cpuTime: "0:04:15", network: "1.2 MB" },
    about: { name: "About Me Portfolio", cpuTime: "0:03:20", network: "0.8 MB" },
    projects: { name: "Projects Showcase", cpuTime: "0:05:40", network: "22.3 MB" },
    github: { name: "GitHub Client", cpuTime: "0:07:10", network: "15.6 MB" },
    contact: { name: "Contact Us", cpuTime: "0:01:30", network: "0.4 MB" },
    taskmanager: { name: "Task Manager", cpuTime: "0:02:11", network: "0.2 MB" },
  });

  // In-App Toast
  const [toast, setToast] = useState(null);
  const showToast = useCallback((message, type = "success") => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => setToast(null), 3200);
  }, []);

  // System Uptime counter (in seconds)
  const [uptimeSeconds, setUptimeSeconds] = useState(4820);
  const tickRef = useRef(0);

  // Register app handler from HomePage
  const registerAppHandler = useCallback((appId, handlers) => {
    appHandlersRef.current[appId] = handlers;
  }, []);

  // Synchronize openApps state from handlers whenever they change
  const updateAppOpenState = useCallback((appId, isOpen) => {
    setOpenApps((prev) => {
      if (prev[appId] === isOpen) return prev;
      return { ...prev, [appId]: isOpen };
    });
  }, []);

  // Launch an app
  const launchApp = useCallback(
    (appId) => {
      const handler = appHandlersRef.current[appId];
      if (handler && handler.open) {
        handler.open();
        setOpenApps((prev) => ({ ...prev, [appId]: true }));
        showToast(`✓ Launched ${APP_METADATA[appId]?.name || appId}`);
        return true;
      }
      return false;
    },
    [showToast]
  );

  // Terminate a process (End Task)
  const endProcess = useCallback(
    (processId) => {
      // 1. Check if protected
      const systemItem = SYSTEM_PROCESSES.find((p) => p.id === processId);
      if (systemItem?.isProtected) {
        showToast("⚠️ This process cannot be ended.", "error");
        return { success: false, reason: "protected" };
      }

      const meta = APP_METADATA[processId];
      if (meta?.isProtected) {
        showToast("⚠️ This process cannot be ended.", "error");
        return { success: false, reason: "protected" };
      }

      // 2. Close app via handler
      const handler = appHandlersRef.current[processId];
      if (handler && handler.close) {
        handler.close();
      }

      // 3. Mark app as closed in state
      setOpenApps((prev) => ({ ...prev, [processId]: false }));

      const appName = meta?.name || processId;
      showToast(`✓ ${appName} ended`);
      return { success: true };
    },
    [showToast]
  );

  // Run new task command
  const runNewTask = useCallback(
    (command) => {
      const trimmed = command.trim().toLowerCase();
      if (!trimmed) return false;

      // Match known apps
      const map = {
        chrome: "chrome",
        browser: "chrome",
        google: "chrome",
        terminal: "terminal",
        cmd: "terminal",
        powershell: "terminal",
        code: "vscode",
        vscode: "vscode",
        settings: "settings",
        files: "files",
        explorer: "files",
        "this pc": "files",
        music: "youtube",
        youtube: "youtube",
        about: "about",
        projects: "projects",
        github: "github",
        contact: "contact",
        taskmgr: "taskmanager",
        taskmanager: "taskmanager",
      };

      const matchedId = map[trimmed];
      if (matchedId) {
        return launchApp(matchedId);
      }

      showToast(`Windows cannot find '${command}'. Make sure you typed the name correctly.`, "error");
      return false;
    },
    [launchApp, showToast]
  );

  // Toggle Startup App status
  const toggleStartupApp = useCallback((id) => {
    setStartupApps((prev) =>
      prev.map((app) =>
        app.id === id
          ? { ...app, status: app.status === "Enabled" ? "Disabled" : "Enabled" }
          : app
      )
    );
  }, []);

  // Toggle Service status
  const toggleService = useCallback((id) => {
    setServices((prev) =>
      prev.map((svc) =>
        svc.id === id
          ? { ...svc, status: svc.status === "Running" ? "Stopped" : "Running" }
          : svc
      )
    );
  }, []);

  // Clear app usage history
  const clearAppHistory = useCallback(() => {
    setAppHistory((prev) => {
      const reset = {};
      Object.keys(prev).forEach((k) => {
        reset[k] = { ...prev[k], cpuTime: "0:00:00", network: "0.0 MB" };
      });
      return reset;
    });
    showToast("✓ App usage history deleted");
  }, [showToast]);

  // Periodic simulation loop (every 1000ms)
  useEffect(() => {
    if (!isActive) return;
    const timer = setInterval(() => {
      tickRef.current += 1;
      const tick = tickRef.current;
      setUptimeSeconds((u) => u + 1);

      // Generate dynamic metrics for all apps and system processes
      const newLiveMetrics = {};
      let totalAppCpu = 0;
      let totalAppMemMB = 0;
      let totalAppDisk = 0;
      let totalAppNet = 0;

      // 1. Process active apps
      Object.entries(APP_METADATA).forEach(([id, meta], idx) => {
        const isRunning = openApps[id];
        if (isRunning) {
          const jitterCpu = Math.sin(tick * 0.8 + idx) * 0.7 + (Math.random() * 0.6 - 0.3);
          const cpu = Math.max(0.2, Number((meta.baseCpu + jitterCpu).toFixed(1)));
          const mem = Math.round(meta.baseMem + Math.sin(tick * 0.5 + idx) * 3 + (Math.random() * 2 - 1));
          const disk = Number((Math.random() * 0.4).toFixed(1));
          const net = Number((Math.random() * 1.8).toFixed(1));

          totalAppCpu += cpu;
          totalAppMemMB += mem;
          totalAppDisk += disk;
          totalAppNet += net;

          newLiveMetrics[id] = {
            id,
            status: "Running",
            cpu,
            memory: mem,
            disk,
            network: net,
            powerUsage: cpu > 3.0 ? "Moderate" : "Very low",
          };
        } else {
          newLiveMetrics[id] = {
            id,
            status: "Suspended",
            cpu: 0,
            memory: 0,
            disk: 0,
            network: 0,
            powerUsage: "Very low",
          };
        }
      });

      // 2. Process system background processes
      SYSTEM_PROCESSES.forEach((sys, idx) => {
        const jitterCpu = Math.sin(tick * 0.6 + idx * 2) * 0.3 + (Math.random() * 0.2 - 0.1);
        const cpu = Math.max(0.1, Number((sys.baseCpu + jitterCpu).toFixed(1)));
        const mem = Math.round(sys.baseMem + Math.sin(tick * 0.4 + idx) * 1.5);
        const disk = Number((Math.random() * 0.2).toFixed(1));
        const net = Number((Math.random() * 0.3).toFixed(1));

        totalAppCpu += cpu;
        totalAppMemMB += mem;
        totalAppDisk += disk;
        totalAppNet += net;

        newLiveMetrics[sys.id] = {
          id: sys.id,
          status: "Running",
          cpu,
          memory: mem,
          disk,
          network: net,
          powerUsage: "Very low",
        };
      });

      setLiveProcessMetrics(newLiveMetrics);

      // 3. Update global performance history
      const totalCpuClamped = Math.min(99, Math.max(4, Math.round(totalAppCpu + 3)));
      // Base OS memory: ~3.2 GB + app memory
      const totalMemGB = Number((3.2 + totalAppMemMB / 1024).toFixed(1));
      const totalDiskPct = Math.min(100, Math.max(1, Math.round(totalAppDisk * 4)));
      const totalNetMbps = Number((totalAppNet + 0.3).toFixed(1));

      setPerformanceHistory((prev) => {
        const next = [
          ...prev.slice(1),
          {
            time: new Date().toLocaleTimeString([], {
              minute: "2-digit",
              second: "2-digit",
            }),
            cpu: totalCpuClamped,
            memory: totalMemGB,
            disk: totalDiskPct,
            network: totalNetMbps,
          },
        ];
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [openApps, isActive]);

  // Formatted uptime string (e.g. "0:01:20:25")
  const formattedUptime = (() => {
    const days = Math.floor(uptimeSeconds / 86400);
    const hours = Math.floor((uptimeSeconds % 86400) / 3600);
    const minutes = Math.floor((uptimeSeconds % 3600) / 60);
    const seconds = uptimeSeconds % 60;
    return `${days}:${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  })();

  // Current system metrics
  const currentMetrics = performanceHistory[performanceHistory.length - 1] || {
    cpu: 12,
    memory: 3.8,
    disk: 2,
    network: 1.2,
  };

  const value = useMemo(() => ({
    openApps,
    appHandlers: appHandlersRef.current,
    registerAppHandler,
    updateAppOpenState,
    launchApp,
    endProcess,
    runNewTask,
    liveProcessMetrics,
    performanceHistory,
    currentMetrics,
    startupApps,
    toggleStartupApp,
    services,
    toggleService,
    appHistory,
    clearAppHistory,
    formattedUptime,
    toast,
    showToast,
    isActive,
    activateSimulation,
  }), [
    openApps, registerAppHandler, updateAppOpenState,
    launchApp, endProcess, runNewTask, liveProcessMetrics,
    performanceHistory, currentMetrics, startupApps, toggleStartupApp,
    services, toggleService, appHistory, clearAppHistory,
    formattedUptime, toast, showToast, isActive, activateSimulation,
  ]);

  return (
    <ProcessContext.Provider value={value}>
      {children}
    </ProcessContext.Provider>
  );
}

export function useProcessContext() {
  const ctx = useContext(ProcessContext);
  if (!ctx) {
    throw new Error("useProcessContext must be used within a ProcessProvider");
  }
  return ctx;
}
