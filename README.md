# CineVerse 🎬 — Full-Stack Movie Management & Discovery Platform

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-v24-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express.js](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%20Cloud-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**CineVerse** is a modern, responsive, full-stack movie management and discovery web platform developed for the **MERN Stack Web Development Training Program**. It features a clean, uncluttered matte-black cinema aesthetic, 36+ pre-seeded blockbuster and award-winning titles, MongoDB Atlas cloud persistence, an Express.js RESTful API, a React 18 SPA built with Vite, and complete CRUD, watchlist, review, and analytics capabilities.

---

## 👥 Team Details & Contribution

- **Team Name:** `DevDynamos`
- **Project Title:** `CineVerse: Full-Stack Movie Management & Discovery Platform`

| # | Member Name | Registration Number | Core Role & Responsibilities |
|:-:|:---|:---:|:---|
| **1** | **Samar** *(Lead)* | `2024BCSE001` | System Architecture, Full-Stack Integration, Database Seeding & DevOps |
| **2** | **Alex Rivera** | `2024BCSE002` | Frontend Development (React 18, Vite, Matte-Black UI, State Management) |
| **3** | **Priyansh Sharma** | `2024BCSE003` | Backend REST API (Express, Mongoose Models, JWT Auth, Reviews, Stats) |

---

## 📖 Project Description

Modern movie enthusiasts struggle to manage fragmented watchlists, compare ratings, and track cinema recommendations across disparate platforms. Traditional prototypes often rely on local mock files (`db.json`) that lack multi-user concurrency, authorization, and cloud scalability.

**CineVerse** delivers a production-grade full-stack web application featuring:
- **Persistent Data Store:** Powered by MongoDB Atlas cloud cluster with virtual relations and cascading cleanup. Pre-seeded with 36+ acclaimed titles across 10 genres.
- **RESTful API Service:** Express.js and Node.js layer handling authentication, filtering, sorting, reviews, and analytics.
- **Single Page Application:** React 18 client built with Vite for sub-millisecond HMR, clean matte-black styling, and responsive layout.
- **Audience Engagement:** 5-star ratings, community feedback, favourite toggling with optimistic UI updates, debounced instant search, and an analytical dashboard.

---

## 🎯 Objectives

1. Develop a fully functional web application strictly utilizing the **MERN Stack** (MongoDB, Express, React, Node.js).
2. Implement complete **CRUD operations** for movies and user reviews.
3. Establish robust **authentication & authorization** using JSON Web Tokens (JWT) and bcrypt password hashing.
4. Deliver a clean, uncluttered, and **mobile-responsive UI** with matte-black cinema visuals.
5. Provide **aggregated analytics** summarizing catalog metrics, genre distribution, and top ratings.
6. Connect to live **MongoDB Atlas** cloud cluster with automated seeding.
7. Prepare the application for public cloud deployment (MongoDB Atlas, Render, Vercel) and presentation defense.

---

## 🛠️ Technologies Used

### Frontend
- **React.js (v18.3):** Component-based UI library.
- **Vite (v5.4):** Ultra-fast frontend build tool and dev server.
- **React Router (v6.29):** Client-side routing.
- **Axios:** HTTP client with automatic JWT Bearer token request interceptors.
- **Lucide React:** Scalable SVG icon system.
- **Modern CSS3:** Matte-black neutral theme, genre pill tabs, responsive grid, zero layout shift.

### Backend
- **Node.js (v24):** Event-driven server-side JavaScript runtime.
- **Express.js (v4.21):** Modular web framework for REST routing.
- **MongoDB Atlas & Mongoose (v8.9):** Cloud database with schema validation and aggregation pipelines.
- **JSON Web Tokens (JWT):** Stateless token-based user authentication.
- **Bcrypt.js:** Salted password hashing.
- **Cors & Morgan:** Cross-Origin Resource Sharing and HTTP request logger middleware.

---

## ✨ Features and Functionalities

- 🎬 **Sizable 36+ Movie Catalog:** Browse titles with high-definition posters, IMDb ratings, genres, release years, durations, and directors.
- ⚡ **High-Speed Debounced Search:** 250ms debounced search preventing redundant queries.
- 🏷️ **Quick Genre Pill Tabs:** Instant filtering across Action, Sci-Fi, Drama, Crime, Animation, Thriller, Biography, Adventure, and Romance.
- ➕ **Full CRUD Operations:**
  - **Create:** Add new movies with interactive modal form and field validation.
  - **Read:** View movie catalog and individual movie details with cast and director.
  - **Update:** Edit movie metadata in real time.
  - **Delete:** Remove movies with safety confirmation modals and cascading review deletion.
- ❤️ **Interactive Watchlist / Favourites:** Instant heart button toggle with optimistic UI updates and backend sync.
- ⭐ **Audience Reviews & Ratings:** Community review engine allowing users to submit star ratings (1–5) and written feedback.
- 📊 **Analytics Dashboard:** Aggregated insights including total titles, average catalog rating, genre distribution percentage bars, and top-rated leaderboard.
- 🔐 **JWT User Authentication:** User registration, login, profile management, and demo accounts with role-based permissions (User vs. Admin).

---

## 📁 Repository Structure

```
Project/
├── client/                     # React Frontend Application (Vite)
│   ├── src/
│   │   ├── api/                # Axios instance & interceptors
│   │   ├── components/         # Navbar, MovieCard, MovieModal, ConfirmModal
│   │   ├── context/            # AuthContext, ToastContext
│   │   ├── pages/              # Catalog, MovieDetails, Dashboard, Login, Register, NotFound
│   │   ├── App.jsx             # Root layout & route configuration
│   │   ├── main.jsx            # React DOM mounting
│   │   └── index.css           # Clean matte-black cinema design system
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── vercel.json             # Vercel deployment rewrites
│   └── .env.example
├── server/                     # Node.js + Express.js Backend REST API
│   ├── src/
│   │   ├── config/             # MongoDB connection configuration (Atlas + DNS fix)
│   │   ├── controllers/        # Movie, Auth, Review, and Stats controllers
│   │   ├── middleware/         # Auth (JWT) & Error handling middlewares
│   │   ├── models/             # Mongoose schemas (Movie, User, Review)
│   │   ├── routes/             # Express API route declarations
│   │   ├── seeds/              # Database seeder script
│   │   ├── data/               # 36+ curated movies dataset (movies.json)
│   │   └── server.js           # Express application entrypoint
│   ├── package.json
│   ├── .env.example
│   └── .env                    # Configured development environment
├── presentation/               # PowerPoint Presentation (7-10 Slides)
│   ├── CineVerse_MERN_Project_Presentation.pptx
│   └── PRESENTATION_OUTLINE.md # Slide-by-slide speaker notes
├── legacy-vanilla/             # Original HTML/CSS/JS prototype preserved
├── DEPLOYMENT.md               # Step-by-step cloud deployment manual
├── SPREADSHEET_SUBMISSION.md   # Copy-paste submission data for Section 6
├── render.yaml                 # 1-Click Render infrastructure blueprint
├── package.json                # Root package for running client & server concurrently
├── .gitignore
└── README.md
```

---

## 🚀 Installation and Execution Steps

### 1. Install Dependencies
From the project root:
```bash
npm run install:all
```

### 2. Configure Environment (`server/.env`)
Your MongoDB Atlas URI is already pre-configured in `server/.env`:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://admin:1234@cluster0.ixivkaa.mongodb.net/cineverse?retryWrites=true&w=majority
JWT_SECRET=cineverse_super_secret_jwt_key_2026
CLIENT_URL=http://localhost:5173
```

### 3. Seed 36+ Movies & Test Accounts
```bash
npm run seed
```

### 4. Run the Application
```bash
npm run dev
```
- **Frontend App:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5000/api](http://localhost:5000/api)

---

## 📊 Presentation (10 Slides)

- **Presentation File:** [`presentation/CineVerse_MERN_Project_Presentation.pptx`](./presentation/CineVerse_MERN_Project_Presentation.pptx)
- **Speaker Notes & Transcript:** [`presentation/PRESENTATION_OUTLINE.md`](./presentation/PRESENTATION_OUTLINE.md)

---

## ✅ Final Submission Checklist

- [x] **Team Formation:** Exactly 3 members with designated roles and registration numbers.
- [x] **Unique Project:** CineVerse (Full-Stack Movie Discovery & Management Platform).
- [x] **MERN Stack:** MongoDB database, Express.js backend framework, React.js frontend library, Node.js runtime.
- [x] **Full-Stack Integration:** Frontend, backend, and database fully integrated.
- [x] **CRUD Operations:** Implemented for movies, favourites, and reviews.
- [x] **Authentication:** JWT and bcrypt password encryption.
- [x] **Responsive UI:** Clean matte-black cinema design system with debounced search, genre pills, modals, and analytics.
- [x] **GitHub Repository:** Proper directory structure, `.gitignore`, and detailed `README.md`.
- [x] **Presentation:** 10-slide PowerPoint presentation file (`.pptx`) and outline in the repository.
- [x] **Deployment Documentation:** Complete setup guide in `DEPLOYMENT.md` and configuration files (`render.yaml`, `vercel.json`).
- [x] **Spreadsheet Details:** Ready-to-copy submission table in `SPREADSHEET_SUBMISSION.md`.
