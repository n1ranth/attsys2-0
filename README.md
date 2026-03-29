# ATTSYS 2.0: Automated Attendance Ecosystem

![Status](https://img.shields.io/badge/Status-Development-cyan?style=for-the-badge)
![Stack](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge)
![PWA](https://img.shields.io/badge/PWA-Ready-blueviolet?style=for-the-badge)

**ATTSYS 2.0** is a high-performance, automated attendance management system built to eliminate the inefficiencies of manual tracking. Utilizing a secure QR-integrated verification flow and a modern PWA architecture, it provides a seamless experience for both educators and students.

## 🚀 Key Features

* **PWA Integration:** Installable on Android, iOS, and Desktop for a native app feel with offline caching.
* **Secure QR Verification:** Real-time QR generation and scanning for instantaneous student check-ins.
* **Dual-Portal Architecture:** Dedicated dashboards for **Teachers** (class management, analytics) and **Students** (attendance history).
* **Futuristic UI/UX:** A high-contrast, HUD-inspired aesthetic built with Vanilla CSS for precision and performance.
* **Automated Onboarding:** Optimized flow for user registration and role-based access control.

## 🛠️ Tech Stack

* **Frontend:** React.js, Vite (Build Tool), React Router v6.
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB (MERN Architecture).
* **Editor:** Neovim (Custom Configuration).
* **Environment:** Optimized for Arch Linux / Hyprland.

## 📦 Installation & Setup

### Prerequisites
* Node.js (v18+)
* MongoDB Instance
* Vite PWA Plugin

### Steps
1. **Clone the Repository**
   ```bash
   git clone [https://github.com/bhavi-th/attsys2-0.git](https://github.com/bhavi-th/attsys2-0.git)
   cd attsys2-0
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm start
   ```

### .env.example (frontend)

#### --- VITE URL ---
<code>VITE_URL=http://localhost</code>

#### --- VITE PORT ---
<code>VITE_PORT=5000</code>

### .env.example (backend)

#### --- DATABASE CONFIGURATION ---
<code>MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/attsys2-0</code>

#### --- JWT ---
<code>SECRET_KEY="secret_key"</code>

#### --- CORS ---
<code>ALLOWED_ORIGINS=http://localhost:5173</code>

## 🛠 Project Structure
```text
attsys2-0/
├── frontend/                # React + Vite Frontend
│   ├── src/
│   │   ├── components/    # Reusable UI (NavBar, ProtectedRoute)
│   │   ├── hooks/         # Custom logic (useAuth, usePWAInstall)
│   │   ├── pages/         # View logic (Dashboards, QR Scanner)
│   │   └── styles/        # Pure CSS modules
│   ├── public/            # PWA Assets (Logos, Screenshots)
│   └── .env
├── backend/                # Node.js + Express Backend
└── README.md
```

## 🤝 Contributing

Feel free to fork and adapt. Pull requests welcome for improvements, new themes, or workflow scripts.
