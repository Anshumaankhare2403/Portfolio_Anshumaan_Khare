import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IoChevronBack, IoClose, IoRemove, IoSquareOutline } from "react-icons/io5";

const USER_NAME = "anshumaan";
const HOST_NAME = "portfolio-ubuntu";
const HOME_SEGMENTS = ["home", USER_NAME];
const HOME_PATH = `/${HOME_SEGMENTS.join("/")}`;

const manPages = {
  help: "help: show the list of supported Ubuntu-style commands in this demo terminal.",
  ls: "ls [path]\nls -a\nls -l\nls -la\nList directory contents.",
  cd: "cd [path]\nChange the current directory. Use .., /, or ~ like Ubuntu.",
  pwd: "pwd\nPrint the current working directory.",
  cat: "cat <file>\nPrint file contents.",
  mkdir: "mkdir <dir>\nmkdir -p <dir>\nCreate directories in the virtual file system.",
  touch: "touch <file>\nCreate an empty file in the virtual file system.",
  rm: "rm <path>\nrm -r <dir>\nRemove files or directories.",
  cp: "cp <source> <destination>\ncp -r <sourceDir> <destinationDir>\nCopy files or directories.",
  mv: "mv <source> <destination>\nMove or rename files and directories.",
  find: "find [path] -name <pattern>\nSearch for files by name.",
  tree: "tree [path]\nShow the directory tree.",
  history: "history\nPrint previous commands from this terminal session.",
  man: "man <command>\nShow a short manual page for a supported command.",
  apt: "apt update\napt install <package>\napt search <term>\nFake Ubuntu package manager output.",
  sudo: "sudo <command>\nRun a supported command in demo mode with elevated flair.",
  uname: "uname\nuname -a\nShow simulated Ubuntu kernel info.",
  neofetch: "neofetch\nShow system information in a classic terminal style.",
  clear: "clear\nClear the terminal screen.",
  exit: "exit\nClose the terminal window.",
};

const commandList = [
  "help",
  "ls",
  "cd",
  "pwd",
  "cat",
  "echo",
  "clear",
  "history",
  "man",
  "find",
  "tree",
  "mkdir",
  "touch",
  "rm",
  "cp",
  "mv",
  "whoami",
  "hostname",
  "uname",
  "neofetch",
  "date",
  "cal",
  "head",
  "tail",
  "wc",
  "apt",
  "apt-get",
  "sudo",
  "git",
  "node",
  "npm",
  "python3",
  "code",
  "vim",
  "nano",
  "exit",
];

function dir(children = {}) {
  return { type: "dir", children };
}

function file(content = "") {
  return { type: "file", content };
}

function createInitialFileSystem() {
  return dir({
    home: dir({
      [USER_NAME]: dir({
        Desktop: dir({
          "welcome.txt": file(
            "Welcome to Anshumaan's Ubuntu-style portfolio shell.\nOpen apps from the desktop, dock, or app menu."
          ),
        }),
        Documents: dir({
          "about.txt": file(
            "Anshumaan Khare\nFrontend-focused developer building a desktop-style portfolio experience."
          ),
          "skills.txt": file(
            "JavaScript\nReact\nTailwind CSS\nNode.js\nThree.js\nUI Prototyping"
          ),
          "resume.pdf": file(
            "Binary PDF preview is disabled in the terminal demo. Open Resume from File Explorer."
          ),
        }),
        Downloads: dir({
          "portfolio-source.zip": file(
            "Source archive placeholder for the portfolio project."
          ),
        }),
        Music: dir({
          "now-playing.txt": file(
            "Lo-fi coding set queued in YouTube Music."
          ),
        }),
        Pictures: dir({
          "wallpaper-info.txt": file(
            "Default desktop wallpaper: bioluminescence-3840x2160-25836.jpg"
          ),
        }),
        Projects: dir({
          "portfolio-app": dir({
            "README.md": file(
              "# Portfolio App\nA Windows-inspired personal site with a macOS-style app launcher."
            ),
            "stack.txt": file("React\nVite\nTailwind CSS\nFramer Motion"),
          }),
        }),
        ".bashrc": file(
          "export PS1='anshumaan@portfolio-ubuntu:\\w$ '\nalias ll='ls -la'"
        ),
        ".profile": file("Welcome back, Anshumaan."),
      }),
    }),
    etc: dir({
      "os-release": file(
        'PRETTY_NAME="Ubuntu 24.04 LTS"\nNAME="Ubuntu"\nVERSION="24.04 LTS"'
      ),
      hostname: file(HOST_NAME),
    }),
    usr: dir({
      bin: dir({
        bash: file("ELF binary"),
        node: file("ELF binary"),
        npm: file("ELF binary"),
      }),
    }),
    var: dir({
      log: dir({
        "syslog": file("Jun 22 portfolio system ready."),
      }),
    }),
  });
}

function tokenizeInput(input) {
  const tokens = [];
  const matcher = /"([^"]*)"|'([^']*)'|[^\s]+/g;
  let match = matcher.exec(input);

  while (match) {
    tokens.push(match[1] ?? match[2] ?? match[0]);
    match = matcher.exec(input);
  }

  return tokens;
}

function expandHome(path) {
  if (!path) {
    return path;
  }

  if (path === "~") {
    return HOME_PATH;
  }

  if (path.startsWith("~/")) {
    return `${HOME_PATH}/${path.slice(2)}`;
  }

  return path;
}

function normalizePath(path, cwdSegments) {
  const expandedPath = expandHome(path ?? "");
  const isAbsolute = expandedPath.startsWith("/");
  const segments = isAbsolute ? [] : [...cwdSegments];

  expandedPath.split("/").forEach((part) => {
    if (!part || part === ".") {
      return;
    }

    if (part === "..") {
      segments.pop();
      return;
    }

    segments.push(part);
  });

  return segments;
}

function pathFromSegments(segments) {
  return segments.length ? `/${segments.join("/")}` : "/";
}

function promptPath(segments) {
  const fullPath = pathFromSegments(segments);

  if (fullPath === HOME_PATH) {
    return "~";
  }

  if (fullPath.startsWith(`${HOME_PATH}/`)) {
    return `~/${fullPath.slice(HOME_PATH.length + 1)}`;
  }

  return fullPath;
}

function resolveSegments(fileSystem, segments) {
  let current = fileSystem;

  for (const segment of segments) {
    if (current.type !== "dir" || !current.children[segment]) {
      return null;
    }

    current = current.children[segment];
  }

  return current;
}

function resolvePath(fileSystem, cwdSegments, path) {
  const segments = path ? normalizePath(path, cwdSegments) : [...cwdSegments];
  const node = resolveSegments(fileSystem, segments);

  return { node, segments };
}

function resolveParent(fileSystem, cwdSegments, targetPath) {
  const expandedPath = expandHome(targetPath);
  const parts = expandedPath.split("/").filter(Boolean);
  const name = parts.pop();

  if (!name || name === "." || name === "..") {
    return { error: `invalid target: ${targetPath}` };
  }

  const parentPath = expandedPath.startsWith("/")
    ? `/${parts.join("/")}`
    : parts.join("/");

  const parent = resolvePath(fileSystem, cwdSegments, parentPath || ".");

  if (!parent.node || parent.node.type !== "dir") {
    return { error: `cannot access '${targetPath}': No such file or directory` };
  }

  return { parentNode: parent.node, name, parentSegments: parent.segments };
}

function sortEntries(children) {
  return Object.entries(children).sort(([nameA, nodeA], [nameB, nodeB]) => {
    if (nodeA.type !== nodeB.type) {
      return nodeA.type === "dir" ? -1 : 1;
    }

    return nameA.localeCompare(nameB);
  });
}

function wildcardToRegExp(pattern) {
  const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&");
  const wildcard = escaped.replace(/\*/g, ".*").replace(/\?/g, ".");
  return new RegExp(`^${wildcard}$`);
}

function formatCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const title = date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const slots = Array(firstDay).fill("  ");

  for (let day = 1; day <= totalDays; day += 1) {
    slots.push(String(day).padStart(2, " "));
  }

  const weeks = [];

  for (let index = 0; index < slots.length; index += 7) {
    weeks.push(slots.slice(index, index + 7).join(" "));
  }

  return [title, "Su Mo Tu We Th Fr Sa", ...weeks].join("\n");
}

function renderTree(node, nodeName = ".", prefix = "") {
  if (!node || node.type !== "dir") {
    return [nodeName];
  }

  const entries = sortEntries(node.children);
  const lines = [nodeName];

  entries.forEach(([name, child], index) => {
    const isLast = index === entries.length - 1;
    const branch = `${prefix}${isLast ? "└── " : "├── "}${name}`;
    lines.push(branch);

    if (child.type === "dir") {
      lines.push(
        ...renderTree(child, "", `${prefix}${isLast ? "    " : "│   "}`).slice(1)
      );
    }
  });

  return lines;
}

function deepClone(node) {
  return structuredClone(node);
}

function countWords(text) {
  const words = text.trim() ? text.trim().split(/\s+/) : [];
  return words.length;
}

function formatLsEntry(name, node, longFormat) {
  if (!longFormat) {
    return name;
  }

  const permissions = node.type === "dir" ? "drwxr-xr-x" : "-rw-r--r--";
  const size =
    node.type === "dir"
      ? Object.keys(node.children).length
      : node.content.length || 0;

  return `${permissions} 1 ${USER_NAME} ${USER_NAME} ${String(size).padStart(
    4,
    " "
  )} Jun 22 ${name}`;
}

function Terminal({ onClose, mobile = false }) {
  const [maximized, setMaximized] = useState(false);
  const [fileSystem, setFileSystem] = useState(() => createInitialFileSystem());
  const [cwdSegments, setCwdSegments] = useState(HOME_SEGMENTS);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(null);
  const [lines, setLines] = useState([
    {
      type: "output",
      value:
        "Welcome to Ubuntu 24.04 LTS portfolio shell.\nType 'help' to see supported commands.",
    },
  ]);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const appendOutput = (value) => {
    if (!value) {
      return;
    }

    setLines((current) => [...current, { type: "output", value }]);
  };

  const runCommand = (command, args, rawInput, isSudo = false) => {
    const currentPath = promptPath(cwdSegments);
    const transcriptEntry = {
      type: "command",
      prompt: `${USER_NAME}@${HOST_NAME}:${currentPath}$`,
      value: rawInput,
    };

    setLines((current) => [...current, transcriptEntry]);

    if (!command) {
      return;
    }

    setHistory((current) => [...current, rawInput]);
    setHistoryIndex(null);

    if (command === "clear") {
      setLines([]);
      return;
    }

    if (command === "exit") {
      onClose();
      return;
    }

    if (command === "help") {
      appendOutput(
        [
          "Supported commands:",
          "basic  : help ls cd pwd cat echo clear history man find tree",
          "files  : mkdir touch rm cp mv head tail wc",
          "system : whoami hostname uname neofetch date cal",
          "dev    : git node npm python3 code vim nano",
          "admin  : apt apt-get sudo exit",
          `all    : ${commandList.join(", ")}`,
        ].join("\n")
      );
      return;
    }

    if (command === "pwd") {
      appendOutput(pathFromSegments(cwdSegments));
      return;
    }

    if (command === "whoami") {
      appendOutput(USER_NAME);
      return;
    }

    if (command === "hostname") {
      appendOutput(HOST_NAME);
      return;
    }

    if (command === "uname") {
      appendOutput(
        args.includes("-a")
          ? "Linux portfolio-ubuntu 6.8.0-portfolio #1 SMP Ubuntu x86_64 GNU/Linux"
          : "Linux"
      );
      return;
    }

    if (command === "date") {
      appendOutput(new Date().toString());
      return;
    }

    if (command === "cal") {
      appendOutput(formatCalendar(new Date()));
      return;
    }

    if (command === "echo") {
      appendOutput(args.join(" "));
      return;
    }

    if (command === "neofetch") {
      appendOutput(
        [
          "            .-/+oossssoo+/-.",
          "        `:+ssssssssssssssssss+:`",
          "      -+ssssssssssssssssssyyssss+-",
          `    .ossssssssssssssssssdMMMNysssso.   ${USER_NAME}@${HOST_NAME}`,
          `   /ssssssssssshdmmNNmmyNMMMMhssssss/  OS: Ubuntu 24.04 LTS`,
          "  +ssssssssshmydMMMMMMMNddddyssssssss+ Kernel: 6.8.0-portfolio",
          " /sssssssshNMMMyhhyyyyhmNMMMNhssssssss/ Shell: bash",
          ".ssssssssdMMMNhsssssssssshNMMMdssssssss. Theme: Glass Desktop",
          "+sssshhhyNMMNyssssssssssssyNMMMysssssss+ Terminal: Portfolio Shell",
          "ossyNMMMNyMMhsssssssssssssshmmmhssssssso Uptime: Always online",
        ].join("\n")
      );
      return;
    }

    if (command === "man") {
      const topic = args[0];
      appendOutput(manPages[topic] || `No manual entry for ${topic || "that topic"}.`);
      return;
    }

    if (command === "history") {
      appendOutput(
        history.length
          ? history.map((entry, index) => `${index + 1}  ${entry}`).join("\n")
          : "No commands in history yet."
      );
      return;
    }

    if (command === "ls") {
      const flags = args.filter((item) => item.startsWith("-")).join("");
      const targetArg = args.find((item) => !item.startsWith("-")) || ".";
      const target = resolvePath(fileSystem, cwdSegments, targetArg);

      if (!target.node) {
        appendOutput(`ls: cannot access '${targetArg}': No such file or directory`);
        return;
      }

      if (target.node.type === "file") {
        appendOutput(targetArg);
        return;
      }

      const showHidden = flags.includes("a");
      const longFormat = flags.includes("l");
      const entries = sortEntries(target.node.children)
        .filter(([name]) => showHidden || !name.startsWith("."))
        .map(([name, node]) => formatLsEntry(name, node, longFormat));

      appendOutput(entries.join(longFormat ? "\n" : "    ") || "");
      return;
    }

    if (command === "cd") {
      const targetArg = args[0] || "~";
      const target = resolvePath(fileSystem, cwdSegments, targetArg);

      if (!target.node) {
        appendOutput(`cd: ${targetArg}: No such file or directory`);
        return;
      }

      if (target.node.type !== "dir") {
        appendOutput(`cd: ${targetArg}: Not a directory`);
        return;
      }

      setCwdSegments(target.segments);
      return;
    }

    if (command === "cat") {
      if (!args.length) {
        appendOutput("cat: missing file operand");
        return;
      }

      const output = [];

      args.forEach((targetArg) => {
        const target = resolvePath(fileSystem, cwdSegments, targetArg);

        if (!target.node) {
          output.push(`cat: ${targetArg}: No such file or directory`);
          return;
        }

        if (target.node.type !== "file") {
          output.push(`cat: ${targetArg}: Is a directory`);
          return;
        }

        output.push(target.node.content);
      });

      appendOutput(output.join("\n"));
      return;
    }

    if (command === "tree") {
      const targetArg = args[0] || ".";
      const target = resolvePath(fileSystem, cwdSegments, targetArg);

      if (!target.node) {
        appendOutput(`tree: '${targetArg}': No such file or directory`);
        return;
      }

      appendOutput(
        target.node.type === "dir"
          ? renderTree(target.node, targetArg === "." ? "." : targetArg).join("\n")
          : targetArg
      );
      return;
    }

    if (command === "find") {
      const pathArg = args.find((item) => !item.startsWith("-")) || ".";
      const nameFlagIndex = args.indexOf("-name");
      const pattern = nameFlagIndex >= 0 ? args[nameFlagIndex + 1] : "*";
      const matcher = wildcardToRegExp(pattern || "*");
      const target = resolvePath(fileSystem, cwdSegments, pathArg);

      if (!target.node) {
        appendOutput(`find: '${pathArg}': No such file or directory`);
        return;
      }

      const results = [];

      const walk = (node, baseSegments) => {
        if (matcher.test(baseSegments[baseSegments.length - 1] || ".")) {
          results.push(pathFromSegments(baseSegments));
        }

        if (node.type === "dir") {
          Object.entries(node.children).forEach(([name, child]) => {
            walk(child, [...baseSegments, name]);
          });
        }
      };

      walk(target.node, target.segments);
      appendOutput(results.join("\n") || "No matches found.");
      return;
    }

    if (command === "head" || command === "tail") {
      const fileArg = args.find((item) => !item.startsWith("-"));

      if (!fileArg) {
        appendOutput(`${command}: missing file operand`);
        return;
      }

      const target = resolvePath(fileSystem, cwdSegments, fileArg);

      if (!target.node || target.node.type !== "file") {
        appendOutput(`${command}: cannot open '${fileArg}'`);
        return;
      }

      const contentLines = target.node.content.split("\n");
      const selected =
        command === "head"
          ? contentLines.slice(0, 10)
          : contentLines.slice(-10);

      appendOutput(selected.join("\n"));
      return;
    }

    if (command === "wc") {
      const fileArg = args[0];

      if (!fileArg) {
        appendOutput("wc: missing file operand");
        return;
      }

      const target = resolvePath(fileSystem, cwdSegments, fileArg);

      if (!target.node || target.node.type !== "file") {
        appendOutput(`wc: ${fileArg}: No such file or directory`);
        return;
      }

      const text = target.node.content;
      appendOutput(
        `${text.split("\n").length} ${countWords(text)} ${text.length} ${fileArg}`
      );
      return;
    }

    if (command === "mkdir") {
      const recursive = args.includes("-p");
      const targets = args.filter((item) => !item.startsWith("-"));

      if (!targets.length) {
        appendOutput("mkdir: missing operand");
        return;
      }

      const nextFileSystem = deepClone(fileSystem);
      const messages = [];

      targets.forEach((targetArg) => {
        const segments = normalizePath(targetArg, cwdSegments);

        if (!segments.length) {
          messages.push(`mkdir: cannot create directory '${targetArg}'`);
          return;
        }

        let current = nextFileSystem;

        for (let index = 0; index < segments.length; index += 1) {
          const segment = segments[index];
          const exists = current.children[segment];
          const isLast = index === segments.length - 1;

          if (!exists) {
            if (!recursive && !isLast) {
              messages.push(
                `mkdir: cannot create directory '${targetArg}': No such file or directory`
              );
              break;
            }

            current.children[segment] = dir();
          } else if (exists.type !== "dir") {
            messages.push(`mkdir: cannot create directory '${targetArg}': File exists`);
            break;
          } else if (isLast && !recursive) {
            messages.push(`mkdir: cannot create directory '${targetArg}': File exists`);
            break;
          }

          current = current.children[segment];
        }
      });

      setFileSystem(nextFileSystem);
      appendOutput(messages.join("\n"));
      return;
    }

    if (command === "touch") {
      if (!args.length) {
        appendOutput("touch: missing file operand");
        return;
      }

      const nextFileSystem = deepClone(fileSystem);
      const messages = [];

      args.forEach((targetArg) => {
        const parent = resolveParent(nextFileSystem, cwdSegments, targetArg);

        if (parent.error) {
          messages.push(`touch: ${parent.error}`);
          return;
        }

        const existing = parent.parentNode.children[parent.name];

        if (existing && existing.type === "dir") {
          messages.push(`touch: cannot touch '${targetArg}': Is a directory`);
          return;
        }

        parent.parentNode.children[parent.name] = existing || file("");
      });

      setFileSystem(nextFileSystem);
      appendOutput(messages.join("\n"));
      return;
    }

    if (command === "rm") {
      const recursive = args.includes("-r") || args.includes("-rf") || args.includes("-fr");
      const force = args.includes("-f") || args.includes("-rf") || args.includes("-fr");
      const targets = args.filter((item) => !item.startsWith("-"));

      if (!targets.length) {
        appendOutput("rm: missing operand");
        return;
      }

      const nextFileSystem = deepClone(fileSystem);
      const messages = [];

      targets.forEach((targetArg) => {
        const parent = resolveParent(nextFileSystem, cwdSegments, targetArg);

        if (parent.error) {
          if (!force) {
            messages.push(`rm: ${parent.error}`);
          }
          return;
        }

        const existing = parent.parentNode.children[parent.name];

        if (!existing) {
          if (!force) {
            messages.push(`rm: cannot remove '${targetArg}': No such file or directory`);
          }
          return;
        }

        if (existing.type === "dir" && !recursive) {
          messages.push(`rm: cannot remove '${targetArg}': Is a directory`);
          return;
        }

        delete parent.parentNode.children[parent.name];
      });

      setFileSystem(nextFileSystem);
      appendOutput(messages.join("\n"));
      return;
    }

    if (command === "cp" || command === "mv") {
      const recursive = args.includes("-r");
      const targets = args.filter((item) => !item.startsWith("-"));

      if (targets.length < 2) {
        appendOutput(`${command}: missing destination file operand after source`);
        return;
      }

      const [sourceArg, destinationArg] = targets;
      const nextFileSystem = deepClone(fileSystem);
      const source = resolvePath(nextFileSystem, cwdSegments, sourceArg);

      if (!source.node) {
        appendOutput(`${command}: cannot stat '${sourceArg}': No such file or directory`);
        return;
      }

      if (source.node.type === "dir" && !recursive) {
        appendOutput(`${command}: -r not specified; omitting directory '${sourceArg}'`);
        return;
      }

      const destination = resolvePath(nextFileSystem, cwdSegments, destinationArg);
      let targetParent;
      let targetName;

      if (destination.node && destination.node.type === "dir") {
        targetParent = destination.node;
        targetName = source.segments[source.segments.length - 1];
      } else {
        const parent = resolveParent(nextFileSystem, cwdSegments, destinationArg);

        if (parent.error) {
          appendOutput(`${command}: ${parent.error}`);
          return;
        }

        targetParent = parent.parentNode;
        targetName = parent.name;
      }

      targetParent.children[targetName] = deepClone(source.node);

      if (command === "mv") {
        const sourceParent = resolveParent(nextFileSystem, cwdSegments, sourceArg);

        if (!sourceParent.error) {
          delete sourceParent.parentNode.children[sourceParent.name];
        }
      }

      setFileSystem(nextFileSystem);
      return;
    }

    if (command === "apt" || command === "apt-get") {
      const action = args[0];
      const packageName = args[1];

      if (action === "update") {
        appendOutput(
          [
            "Hit:1 http://archive.ubuntu.com/ubuntu noble InRelease",
            "Reading package lists... Done",
            "All packages are already up to date in portfolio mode.",
          ].join("\n")
        );
        return;
      }

      if (action === "install") {
        appendOutput(
          [
            `Reading package lists... Done`,
            `Building dependency tree... Done`,
            `The following NEW packages will be installed: ${packageName || "demo-package"}`,
            `Setting up ${packageName || "demo-package"} (1.0-portfolio) ... Done`,
          ].join("\n")
        );
        return;
      }

      if (action === "search") {
        appendOutput(
          `${packageName || "portfolio"} - simulated package available in this Ubuntu demo shell`
        );
        return;
      }

      appendOutput("Usage: apt update | apt install <package> | apt search <term>");
      return;
    }

    if (command === "sudo") {
      if (!args.length) {
        appendOutput("usage: sudo <command>");
        return;
      }

      if (args.join(" ") === "rm -rf /") {
        appendOutput("Nice try. The portfolio shell refuses destructive sudo commands.");
        return;
      }

      appendOutput("[sudo] password for anshumaan: ********");
      runCommand(args[0], args.slice(1), args.join(" "), true);
      return;
    }

    if (command === "git") {
      if (args[0] === "status") {
        appendOutput(
          [
            "On branch main",
            "Your branch is up to date with 'origin/main'.",
            "",
            "nothing to commit, working tree clean",
          ].join("\n")
        );
        return;
      }

      appendOutput("git version 2.43.0");
      return;
    }

    if (command === "node") {
      appendOutput(args[0] === "--version" || args[0] === "-v" ? "v22.15.0" : "Node.js REPL is not available in this demo shell.");
      return;
    }

    if (command === "npm") {
      if (args[0] === "-v" || args[0] === "--version") {
        appendOutput("10.9.2");
        return;
      }

      if (args[0] === "run") {
        appendOutput(`Simulated npm script execution: ${args[1] || "dev"}`);
        return;
      }

      appendOutput("npm supports: npm -v, npm --version, npm run <script>");
      return;
    }

    if (command === "python3") {
      appendOutput(
        args[0] === "--version" || args[0] === "-V"
          ? "Python 3.12.3"
          : "Python REPL is disabled in this portfolio terminal."
      );
      return;
    }

    if (command === "code") {
      appendOutput("VS Code is available from the desktop and app launcher.");
      return;
    }

    if (command === "vim" || command === "nano") {
      appendOutput(
        `${command}: interactive editors are disabled in this demo. Try 'cat <file>' instead.`
      );
      return;
    }

    appendOutput(
      `${isSudo ? "sudo: " : ""}${command}: command not found`
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const rawInput = input;
    const tokens = tokenizeInput(rawInput.trim());
    const [command, ...args] = tokens;

    setInput("");
    runCommand(command, args, rawInput);
  };

  const handleHistoryNavigation = (event) => {
    if (!history.length) {
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      const nextIndex =
        historyIndex === null ? history.length - 1 : Math.max(historyIndex - 1, 0);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (historyIndex === null) {
        return;
      }

      const nextIndex = historyIndex + 1;

      if (nextIndex >= history.length) {
        setHistoryIndex(null);
        setInput("");
        return;
      }

      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    }
  };

  const prompt = `${USER_NAME}@${HOST_NAME}:${promptPath(cwdSegments)}$`;

  return (
    <motion.div
      drag={mobile ? false : !maximized}
      dragMomentum={false}
      initial={{ x: 120, y: 50, opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`fixed z-30 overflow-hidden border border-white/20 bg-black/35 text-[#d7f7cf] shadow-[0_8px_32px_rgba(0,0,0,0.37)] backdrop-blur-2xl ${
        mobile
          ? "inset-0 h-[100svh] w-full rounded-none mobile-glass-app mobile-terminal-app"
          : maximized
          ? "inset-4 rounded-2xl"
          : "left-10 top-10 h-[68vh] w-[62vw] rounded-2xl"
      }`}
      onMouseDown={() => inputRef.current?.focus()}
    >
      {mobile ? (
        <div className="ios-terminal-header">
          <button onClick={onClose} aria-label="Back to home"><IoChevronBack /></button>
          <div><span>Terminal</span><small>portfolio shell</small></div>
          <span className="ios-terminal-status">LIVE</span>
        </div>
      ) : (
        <div className="flex h-10 items-center border-b border-white/10 bg-black/30 px-3 text-white">
          <span className="flex-1 text-sm">Terminal</span>
          <button className="p-2 text-sm hover:bg-white/10" aria-label="Minimize">
            <IoRemove />
          </button>
          <button
            className="p-2 text-xs hover:bg-white/10"
            aria-label={maximized ? "Restore" : "Maximize"}
            onClick={() => setMaximized((current) => !current)}
          >
            <IoSquareOutline />
          </button>
          <button onClick={onClose} className="p-2 hover:bg-red-600" aria-label="Close">
            <IoClose />
          </button>
        </div>
      )}

      <div
        ref={scrollRef}
        className={`${mobile ? "ios-terminal-console" : "h-[calc(100%-2.5rem)] px-4 py-3"} overflow-y-auto font-mono text-sm leading-6`}
      >
        {lines.map((line, index) => (
          <div key={`${line.type}-${index}`} className="whitespace-pre-wrap break-words">
            {line.type === "command" ? (
              <span>
                <span className="text-[#92f69e]">{line.prompt}</span>{" "}
                <span className="text-white">{line.value}</span>
              </span>
            ) : (
              <span>{line.value}</span>
            )}
          </div>
        ))}

        <form onSubmit={handleSubmit} className="mt-1 flex items-start gap-2">
          <label className="shrink-0 text-[#92f69e]" htmlFor="terminal-input">
            {prompt}
          </label>
          <input
            id="terminal-input"
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleHistoryNavigation}
            autoComplete="off"
            spellCheck="false"
            className="min-w-0 flex-1 border-none bg-transparent text-white outline-none"
          />
        </form>
      </div>
    </motion.div>
  );
}

export default Terminal;
