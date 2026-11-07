# 🪔 Happy Diwali — Personalized Festive Wishes & Greeting App ✨

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.3.6-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas_Cloud-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Performance-60_FPS_Locked-FFD700?style=for-the-badge" alt="Performance" />
  <img src="https://img.shields.io/badge/Audio-Web_Audio_API-FF6F00?style=for-the-badge" alt="Web Audio" />
</p>

<p align="center">
  <b>A ultra-smooth, lightweight, and modern full-stack web application to create, personalize, and share glowing Diwali greetings with family and friends across the globe! 🎆</b>
</p>

<p align="center">
  🌐 <b>Live Demo:</b> <a href="https://diwali-frontend.onrender.com">https://diwali-frontend.onrender.com</a>
</p>

---

## 🌟 Key Features

### 1. 🪔 Personalized Festive Greetings
* Generate unique, glowing greetings for friends, colleagues, and family with sender and recipient names.
* **Smart Default Blessing**: If a user leaves the personal message field empty, a heartwarming festive blessing is automatically included:
  > *"Wishing you and your family a very Happy, Prosperous, and Joyful Diwali! May this festival of lights bring happiness, good health, peace, and success into your lives."*

### 2. ⚡ Silky-Smooth 60 FPS Performance
* **No Frame Drops**: Completely eliminated CPU-heavy canvas filters (`shadowBlur = 15`) in favor of native GPU additive blending (`globalCompositeOperation = 'lighter'`).
* **Auto-Device Tiering**: Automatically detects device capabilities (`navigator.hardwareConcurrency` and screen resolution) to scale fireworks particle counts from 24 (low-end/mobile) to 46 (desktop).
* **DPR Capping**: Capped at `2.0` to protect mobile 3x/4x Retina screens from fill-rate lag.
* **Background Auto-Pause**: Freezes canvas loop and timers when the tab is switched or minimized (`visibilitychange`) to conserve battery and CPU.

### 3. 🖼️ Download Greeting Card as HD Image ($1080 \times 1080$ PNG)
* 1-Click instantaneous client-side Canvas generator that exports a majestic, high-resolution square greeting card with golden ornate borders, glowing diyas, customized names, and blessings.
* Ready to upload as a WhatsApp Status, Instagram Story, or save to your photo gallery.

### 4. 💥 Interactive Patakha (Cracker) Burst Sound Effects
* Tap or click anywhere on the sky, cards, or background to hear an authentic synthesized firecracker explosion sound and watch vibrant festival sparks burst right at your fingertip!
* 100% synthesized in real time via the native **Web Audio API** — zero external audio files, zero network delay, works offline!

### 5. 🎶 Festive Ambient Music (Shehnai & Temple Bell Chimes)
* Built-in meditative Indian classical drone (Tanpura/Raag Bhupali pentatonic chimes) with a 1-click **Music ON/OFF** toggle button.
* Zero autoplay blocking issues because it starts on explicit user gesture.

### 6. 🔄 Live Real-Time Auto-Sync (Bina Page Refresh Kiye)
* Real-time anti-cache synchronization updates the **Wishes Created** and **Wishes Opened** counters and incoming wishes live without requiring a page reload.
* Features a prominent pulsating green **`🟢 LIVE`** activity indicator badge.

### 7. 📜 Infinite Auto-Scrolling Wishes List
* Displays all community wishes in an elegant, continuous vertical conveyor loop.
* Automatically wraps around to the top when reaching the end.
* **Pause on Hover/Touch**: Users can hover or rest their finger on the list to comfortably read any wish.

### 8. 📱 100% Mobile-First Responsive Design
* Handcrafted with `clamp()` typography and `100dvh` viewport units to prevent mobile browser address bar jumps.
* Safe-area insets (`env(safe-area-inset-*)`) for iPhone notches.
* Minimum $48\text{px}$ touch targets for all interactive buttons.

---

## 🛠️ Tech Stack

* **Frontend**:
  * [React 18](https://react.dev/) (Hooks, `React.memo`, `useCallback`, `useRef`)
  * [Tailwind CSS 3](https://tailwindcss.com/) (Custom festive palette, GPU keyframes)
  * [Lucide React](https://lucide.dev/) (Feather-light modern icons)
  * HTML5 Canvas 2D (Additive blend fireworks engine + HD Card Generator)
  * Native Web Audio API (Ambient synthesizer & sound effects)
* **Backend**:
  * [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
  * [Mongoose 7](https://mongoosejs.com/)
  * [MongoDB Atlas Cloud](https://www.mongodb.com/atlas) (Cluster0 / `Diwali` database)
  * DNS Fallback resolver (`8.8.8.8`, `1.1.1.1`) for resilient SRV resolution on Windows

---

## 📁 Project Structure

```text
diwali-wish/
├── backend/
│   ├── export-db.js        # Automated MongoDB backup script
│   ├── restore-db.js       # Automated MongoDB restore script
│   ├── package.json        # Backend dependencies & npm scripts
│   ├── server.js           # Express API server & MongoDB connection
│   └── .env                # Backend environment configuration
├── frontend/
│   ├── public/
│   │   └── index.html      # Optimized HTML with Google Fonts & viewport-fit
│   ├── src/
│   │   ├── utils/
│   │   │   ├── cardGenerator.js # 1080x1080 HD Greeting Card Canvas generator
│   │   │   └── festiveAudio.js  # Web Audio API ambient chime & patakha synthesizer
│   │   ├── App.js          # Core React application (Fireworks, UI, Sync)
│   │   ├── index.css       # Tailwind CSS & GPU-accelerated keyframe rules
│   │   └── index.js        # React DOM root entry
│   ├── tailwind.config.js  # Theme configuration (Gold, Maroon, Breakpoints)
│   └── package.json        # Frontend dependencies
├── backup/                 # Local offline JSON database backups
│   ├── wishes.json         # Exported wishes collection
│   ├── counters.json       # Exported counters (Created/Opened)
│   └── visitors.json       # Exported visitors collection
├── package.json            # Root full-stack helper scripts
└── README.md               # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
* [npm](https://www.npmjs.com/) (v9+)
* Git

### 1. Clone the Repository
```bash
git clone https://github.com/Rajkumar1813/diwali-wish.git
cd diwali-wish
```

### 2. Configure Environment Variables
Create a `.env` file inside the `backend/` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
```

### 3. Run Backend Server
```bash
cd backend
npm install
npm start
```
*The backend API will run on `http://localhost:5000`.*

### 4. Run Frontend Development Server
In a new terminal window:
```bash
cd frontend
npm install
npm start
```
*The app will automatically launch on `http://localhost:3000`.*

---

## 💾 Database Backup & Restore

To safeguard your data offline, automated scripts are included in the backend:

* **Export entire database to local JSON files (`backup/`):**
  ```bash
  cd backend
  npm run backup
  ```
* **Restore data to any MongoDB database:**
  ```bash
  cd backend
  npm run restore
  ```

---

## 📦 Production Build & Deployment

To create an optimized production build of the frontend:
```bash
cd frontend
npm run build
```
The compiled output is saved in `frontend/build/` (~57 kB gzipped JavaScript, ~5.6 kB CSS).

---

## 🤝 Contributing & Feedback
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Rajkumar1813/diwali-wish/issues).

---

<p align="center">
  <b>Happy Diwali to you and your loved ones! 🪔✨ May your life be filled with light, laughter, and endless success!</b>
</p>

