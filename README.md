

Instagram Stories Clone
A modern Instagram Stories clone built with React, featuring light/dark mode toggle and interactive story viewing experience.

🌟 Features
📱 Instagram-like Stories: Interactive story viewing experience

🌙 Dark/Light Mode: Toggle between themes with smooth transitions

🎯 Active/Inactive Stories: 5 active stories (red border) and 5 inactive stories

⏱️ Auto-advance: Stories automatically progress every 5 seconds

👆 Gesture Controls: Tap left/right to navigate between stories

📱 Responsive Design: Works perfectly on desktop and mobile devices

⚡ Fast Performance: Built with Vite for optimal performance

Frontend: React 18, Vite

Styling: CSS3 with CSS Variables

Icons: Emoji-based icons

Deployment: Vercel

Build Tool: Vite


Install dependencies
npm install

start server

npm run dev

Build for Production

npm run build


instagram-stories-clone/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── StoriesList/
│   │   │   ├── StoriesList.jsx
│   │   │   └── StoriesList.css
│   │   ├── StoryViewer/
│   │   │   ├── StoryViewer.jsx
│   │   │   └── StoryViewer.css
│   │   └── ProgressBar/
│   │       ├── ProgressBar.jsx
│   │       └── ProgressBar.css
│   ├── hooks/
│   │   └── useStories.js
│   ├── data/
│   │   └── storiesData.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── vercel.json
└── README.md



🎨 Features in Detail
Theme System
Toggle between light and dark modes

Smooth color transitions

System preference detection ready

Story Navigation
Auto-advance: Stories progress automatically

Tap Navigation: Tap left/right sides to navigate

Progress Indicators: Visual progress bars for each story

User Switching: Automatically move to next user's stories

