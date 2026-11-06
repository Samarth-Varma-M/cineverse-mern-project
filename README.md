# CineVerse 🎬 — Full-Stack MERN Movie Management & Discovery Platform

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-v24-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express.js](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**CineVerse** is a modern, responsive, full-stack movie management and discovery web platform developed as part of the **MERN Stack Web Development Training Program**. It provides an end-to-end cinema platform with persistent MongoDB storage, Express.js RESTful API, React 18 frontend with dark cinema aesthetics, and Node.js backend runtime.

---

## 👥 Team Details & Contribution

- **Team Name:** `DevDynamos`
- **Project Title:** `CineVerse: Full-Stack Movie Management & Discovery Platform`

| # | Member Name | Registration Number | Core Role & Responsibilities |
|:-:|:---|:---:|:---|
| **1** | **Samar** *(Lead)* | `2024BCSE001` | System Architecture, Full-Stack Integration, Seed & Deployment |
| **2** | **Alex Rivera** | `2024BCSE002` | Frontend Development (React, Vite, CSS Design System, State) |
| **3** | **Priyansh Sharma** | `2024BCSE003` | Backend REST API (Express, Mongoose Models, JWT Auth, Reviews) |

---

## 📖 Project Description

Modern movie enthusiasts struggle to manage fragmented watchlists, compare ratings, and track cinema recommendations across diverse platforms. Traditional basic prototypes often rely on local mock files (`db.json`) that lack multi-user concurrency, authorization, and cloud scalability.

**CineVerse** solves this by delivering a production-grade full-stack web application featuring:
- **Persistent Data Store:** Powered by MongoDB & Mongoose schemas with virtual relations and cascading cleanup.
- **RESTful API Service:** Express.js and Node.js layer handling authentication, filtering, sorting, reviews, and analytics.
- **Single Page Application:** React 18 client built with Vite for sub-millisecond HMR and responsive design.
- **Audience Engagement:** 5-star ratings, community feedback, favourite toggling with optimistic UI updates, and an analytical dashboard.

---

## 🎯 Objectives

1. Develop a fully functional web application strictly utilizing the **MERN Stack** (MongoDB, Express, React, Node.js).
2. Implement complete **CRUD operations** for movies and user reviews.
3. Establish robust **authentication & authorization** using JSON Web Tokens (JWT) and bcrypt password hashing.
4. Deliver an engaging, accessible, and **mobile-responsive UI** with cinema-inspired dark mode visuals.
5. Provide **aggregated analytics** summarizing catalog metrics, genre distribution, and top ratings.
6. Prepare the application for public cloud deployment (MongoDB Atlas, Render, Vercel) and comprehensive presentation defense.

---

## 🛠️ Technologies Used

### Frontend
- **React.js (v18.3):** Declarative component-based UI library.
- **Vite (v5.4):** Ultra-fast modern frontend build tool and dev server.
- **React Router (v6.29):** Declarative client-side routing for multi-view navigation.
- **Axios:** HTTP client with automatic JWT Bearer token request interceptors.
- **Lucide React:** Scalable SVG icon system.
- **CSS3 Design System:** Custom glassmorphism, responsive grid layout, and dark cinema theme.

### Backend
- **Node.js (v24):** Event-driven server-side JavaScript runtime.
- **Express.js (v4.21):** Modular web framework for robust REST routing.
- **MongoDB & Mongoose (v8.9):** Object Data Modeling (ODM) with schema validation and aggregation pipelines.
- **JSON Web Tokens (JWT):** Stateless token-based user authentication.
- **Bcrypt.js:** Secure salted password hashing.
- **Cors & Morgan:** Cross-Origin Resource Sharing and HTTP request logger middleware.

### Tools & DevOps
- **Git & GitHub:** Version control and repository hosting.
- **Render & Vercel:** Production hosting platforms for backend API and frontend SPA.
- **Python (python-pptx):** Automated creation of the 10-slide PowerPoint presentation.

---

## ✨ Features and Functionalities

- 🎬 **Comprehensive Movie Catalog:** Browse titles with high-definition posters, IMDb ratings, genres, release years, and durations.
- ➕ **Full CRUD Operations:**
  - **Create:** Add new movies with interactive modal form and field validation.
  - **Read:** View movie catalog and individual movie details with cast and director.
  - **Update:** Edit movie metadata in real time.
  - **Delete:** Remove movies with safety confirmation modals and cascading review deletion.
- 🔍 **Real-Time Live Search:** Multi-attribute filtering across title, genre, and synopsis with immediate keystroke response.
- 🏷️ **Multi-Genre Filter & Sorting:** Filter by genres (Sci-Fi, Action, Drama, etc.) and sort by rating (high/low), release year (new/old), or title.
- ❤️ **Interactive Favourites / Watchlist:** Instant heart button toggle with optimistic UI updates and backend sync.
- ⭐ **Audience Reviews & Ratings:** Community review engine allowing users to submit star ratings (1–5) and written feedback.
- 📊 **Analytics Dashboard:** Aggregated insights including total movies, average catalog rating, genre distribution percentage bars, and top-rated leaderboard.
- 🔐 **JWT User Authentication:** User registration, login, profile management, and demo accounts with role-based permissions (User vs. Admin).
- 🔔 **Toast Notification System:** Instant user feedback for all CRUD operations, errors, and session status.

---

## 📁 Repository Structure

```
Project/
├── client/                     # React Frontend Application (Vite)
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── api/                # Axios instance & interceptors
│   │   ├── components/         # Navbar, MovieCard, MovieModal, ConfirmModal
│   │   ├── context/            # AuthContext, ToastContext
│   │   ├── pages/              # Catalog, MovieDetails, Dashboard, Login, Register, NotFound
│   │   ├── App.jsx             # Root layout & route configuration
│   │   ├── main.jsx            # React DOM mounting
│   │   └── index.css           # Modern dark cinema design system
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── vercel.json             # Vercel deployment rewrites
│   └── .env.example
├── server/                     # Node.js + Express.js Backend REST API
│   ├── src/
│   │   ├── config/             # MongoDB connection configuration
│   │   ├── controllers/        # Movie, Auth, Review, and Stats controllers
│   │   ├── middleware/         # Auth (JWT) & Error handling middlewares
│   │   ├── models/             # Mongoose schemas (Movie, User, Review)
│   │   ├── routes/             # Express API route declarations
│   │   ├── seeds/              # Database seeder script
│   │   ├── data/               # Seed movies dataset (movies.json)
│   │   └── server.js           # Express application entrypoint
│   ├── package.json
│   ├── .env.example
│   └── .env
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

### Prerequisites
- [Node.js](https://nodejs.org) (v18.0 or higher recommended)
- [npm](https://www.npmjs.com) (comes with Node.js)
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) account (or a local MongoDB instance)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/cineverse-mern-project.git
cd cineverse-mern-project
```

### 2. Install Dependencies
You can install dependencies for all packages with a single root command:
```bash
npm run install:all
```
*Or install separately:*
```bash
# Server
cd server && npm install
# Client
cd ../client && npm install
cd ..
```

### 3. Configure Environment Variables

**Server (`server/.env`):**
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/cineverse?retryWrites=true&w=majority
JWT_SECRET=cineverse_super_secret_jwt_key_2026
CLIENT_URL=http://localhost:5173
```
> *(If running local MongoDB, use `MONGO_URI=mongodb://127.0.0.1:27017/cineverse`)*

**Client (`client/.env`):**
```env
VITE_API_URL=
```
*(Leave blank for local development proxy; specify full backend URL in production)*

### 4. Seed Starter Movie Catalog
Populate the database with starter movies and demo users:
```bash
npm run seed
```

### 5. Run the Application

**Option A: Run Both Frontend & Backend Concurrently (Recommended)**
```bash
npm run dev
```
- **Backend API:** Runs at [http://localhost:5000](http://localhost:5000)
- **Frontend App:** Runs at [http://localhost:5173](http://localhost:5173)

**Option B: Run Separately**
```bash
# Terminal 1: Backend
npm run server

# Terminal 2: Frontend
npm run client
```

### 6. Demo User Credentials
You can log in using either the one-click demo autofill buttons or these credentials:
- **Admin Account:** `admin@cineverse.com` / `admin123`
- **Student Account:** `student@cineverse.com` / `student123`

---

## 📡 REST API Reference

| Method | Endpoint | Access | Description |
|:---:|:---|:---:|:---|
| `GET` | `/api/health` | Public | System status and database connectivity check |
| `GET` | `/api/movies` | Public | List movies (supports `?search=`, `?genre=`, `?sort=`, `?isFavourite=true`) |
| `GET` | `/api/movies/:id` | Public | Retrieve single movie details with populated reviews |
| `POST` | `/api/movies` | Public / Auth | Create a new movie |
| `PUT` | `/api/movies/:id` | Public / Auth | Update an existing movie by ID |
| `DELETE` | `/api/movies/:id` | Public / Auth | Delete movie and cascade-delete its reviews |
| `PATCH` | `/api/movies/:id/favourite` | Public | Toggle watchlist favourite status |
| `GET` | `/api/movies/:id/reviews` | Public | Fetch all reviews for a movie |
| `POST` | `/api/movies/:id/reviews` | Auth | Post a 5-star review and comment |
| `DELETE` | `/api/reviews/:id` | Auth | Delete a review (Author or Admin only) |
| `GET` | `/api/stats` | Public | Get aggregated catalog analytics |
| `POST` | `/api/auth/register` | Public | Register new user account |
| `POST` | `/api/auth/login` | Public | Login and receive JWT Bearer token |
| `GET` | `/api/auth/me` | Private | Retrieve authenticated user profile |

---

## 🌐 Deployment Instructions

CineVerse is pre-configured for instant zero-hassle cloud deployment:
- **Backend on Render:** Point to `server/` root directory, run command `node src/server.js`, and set `MONGO_URI` environment variable from MongoDB Atlas.
- **Frontend on Vercel:** Point to `client/` root directory, build command `npm run build`, and configure `VITE_API_URL` to your Render API.
- For detailed, step-by-step instructions, see [`DEPLOYMENT.md`](./DEPLOYMENT.md).

---

## 📊 Presentation (7–10 Slides)

A 10-slide widescreen (16:9) PowerPoint presentation is included directly in the repository:
- **Presentation File:** [`presentation/CineVerse_MERN_Project_Presentation.pptx`](./presentation/CineVerse_MERN_Project_Presentation.pptx)
- **Speaker Notes & Transcript:** [`presentation/PRESENTATION_OUTLINE.md`](./presentation/PRESENTATION_OUTLINE.md)

### Presentation Topics Covered:
1. Project Title & Team Details
2. Introduction & Problem Statement
3. Project Objectives
4. Technologies & Tools Used (MERN Stack)
5. System Architecture & Workflow
6. Features & Functionalities
7. Database Design & API Integration
8. Screenshots & UI Walkthrough
9. Challenges Faced & Future Scope
10. Conclusion

---

## ✅ Final Submission Checklist

- [x] **Team Formation:** Exactly 3 members with designated roles and registration numbers.
- [x] **Unique Project:** CineVerse (Full-Stack Movie Discovery & Management Platform).
- [x] **MERN Stack:** MongoDB database, Express.js backend framework, React.js frontend library, Node.js runtime.
- [x] **Full-Stack Integration:** Frontend, backend, and database fully integrated.
- [x] **CRUD Operations:** Implemented for movies, favourites, and reviews.
- [x] **Authentication:** JWT and bcrypt password encryption.
- [x] **Responsive UI:** Dark cinema design system, modals, search, filters, and analytics dashboard.
- [x] **GitHub Repository:** Proper directory structure, `.gitignore`, and detailed `README.md`.
- [x] **Presentation:** 10-slide PowerPoint presentation file (`.pptx`) and outline in the repository.
- [x] **Deployment Documentation:** Complete setup guide in `DEPLOYMENT.md` and configuration files (`render.yaml`, `vercel.json`).
- [x] **Spreadsheet Details:** Ready-to-copy submission table in `SPREADSHEET_SUBMISSION.md`.
