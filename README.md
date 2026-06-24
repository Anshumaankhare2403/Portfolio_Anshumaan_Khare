# Anshumaan Khare - Desktop Portfolio

An interactive desktop-style portfolio built with React, Vite, and Tailwind CSS. The website presents Anshumaan Khare's profile, skills, resume, and projects through an operating-system-inspired interface.

## About the Developer

**Anshumaan Khare** is a Software Developer and MCA student at JAIN (Deemed-to-be University), studying from 2025 to 2027.

His primary areas of expertise include:

- MERN stack and full-stack development
- Flutter mobile application development
- REST API development and integration
- JWT authentication and authorization
- Database design and CRUD operations
- Responsive web design
- Cloud deployment and performance optimization

## Features

- Windows-style login screen
- Desktop interface with draggable application windows
- macOS-inspired application launcher
- Dock with application shortcuts and logout
- Windows-key support for opening the application menu
- Interactive File Explorer with connected folders
- Categorized Skills section with technology icons
- Resume viewer using Google Drive
- Simulated Ubuntu terminal and commands
- Browser, YouTube Music, VS Code, and About windows
- Default desktop wallpaper
- Dedicated unsupported-device message for phone and tablet users

## Applications

| Application | Description |
| --- | --- |
| File Explorer | Browse documents, skills, projects, images, downloads, music, and videos |
| About Me | View Anshumaan’s resume and professional information |
| Chrome | Simulated browser window |
| Visual Studio Code | Interactive code-editor experience |
| YouTube Music | Simulated music application |
| Terminal | Ubuntu-inspired command-line experience |
| App Menu | Search for and launch desktop applications |

## Skills Presented

### Programming Languages

- JavaScript
- Dart

### Frontend

- React.js
- HTML5
- CSS3
- Tailwind CSS
- Bootstrap

### Backend

- Node.js
- Express.js
- REST APIs

### Mobile Development

- Flutter

### Databases

- MongoDB
- MySQL
- Firebase
- Mongoose

### Cloud and DevOps

- AWS EC2
- AWS S3
- AWS VPC
- AWS IAM
- AWS CloudWatch
- AWS SNS
- AWS Application Load Balancer
- AWS NAT Gateway
- Netlify
- Vercel

### Tools and Platforms

- Git and GitHub
- Postman
- Linux
- WSL2
- Visual Studio Code

### Libraries and Frameworks

- Framer Motion
- Axios
- Material UI

## Technology Stack

- React 19
- Vite 8
- Tailwind CSS 4
- Framer Motion
- React Icons
- Monaco Editor
- xterm.js
- Three.js

## Getting Started

### Requirements

- Node.js 20 or newer
- npm

### Installation

Clone the repository and enter the project directory:

```bash
git clone <repository-url>
cd "AnshumaanKhare site"
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed by Vite in your browser.

## Available Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create an optimized production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Check the source code with ESLint |

## Project Structure

```text
src/
├── assets/
│   ├── color-lightblue/   # File Explorer icons
│   ├── resume/            # Local resume asset
│   ├── scalable/          # Application SVG icons
│   └── wallpaper/         # Desktop background
├── components/
│   ├── About.jsx          # Resume/About window
│   ├── AppMenu.jsx        # Searchable application launcher
│   ├── App_icons.jsx      # Desktop application icons
│   ├── Chrome.jsx         # Browser window
│   ├── Dock.jsx           # Desktop dock and logout
│   ├── FileExp.jsx        # File Explorer and Skills content
│   ├── SplashScreen.jsx   # Login screen
│   ├── Terminal.jsx       # Simulated Ubuntu terminal
│   ├── VSCodeWindow.jsx   # Code editor window
│   └── YtMusice.jsx       # Music player window
├── Pages/
│   └── HomePage.jsx       # Desktop and window management
├── App.jsx                # Login and device handling
├── index.css              # Global styles
└── main.jsx               # React entry point
```

## Using the Portfolio

1. Enter the portfolio from the login screen.
2. Double-click or select an application icon to open it.
3. Press the Windows/Meta key to toggle the application menu.
4. Use the dock to launch applications or log out.
5. Open File Explorer to browse the Skills, Documents, Downloads, Pictures, Music, and Videos sections.
6. Select `Resume.pdf` to open the Google Drive resume in a new browser tab.
7. Drag application title bars to move windows around the desktop.

## Customization

### Change the Resume

Update the `resumePdf` URL in:

```text
src/components/FileExp.jsx
```

The About window's resume URL can be changed in:

```text
src/components/About.jsx
```

### Add or Edit Skills

Edit the `skillGroups` array in:

```text
src/components/FileExp.jsx
```

Each skill accepts a name, icon component, and display color.

### Change the Wallpaper

Add a new image to `src/assets/wallpaper/`, import it in `src/App.jsx`, and use it as the desktop background.

### Add an Application

1. Create the application component inside `src/components/`.
2. Add its open/close state in `src/Pages/HomePage.jsx`.
3. Add the application to the shared `apps` array.
4. Connect it to the desktop, dock, application menu, or File Explorer.

## Production Build

Create the deployable build:

```bash
npm run build
```

The generated files are placed in the `dist/` directory. Deploy that directory to services such as Netlify, Vercel, or an AWS static hosting setup.

## Browser Support

For the intended desktop experience, use a current version of:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari

The interface is designed primarily for desktop and laptop screens.

## Author

**Anshumaan Khare**

Software Developer

