# CineVerse Deployment Guide 🚀

This guide provides end-to-end instructions for deploying both the backend API and frontend React client of **CineVerse** with full MongoDB database connectivity.

---

## Step 1: Free MongoDB Database Setup (MongoDB Atlas)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and register or log in.
2. Click **"Build a Database"** and choose the **M0 Free Tier** cluster.
3. Select your preferred provider (AWS) and closest region.
4. **Create Database Credentials**:
   - Username: `cineverse_admin`
   - Password: `<generate-strong-password>` (copy this)
5. **Network Access**:
   - Go to **Network Access** in the left sidebar.
   - Click **Add IP Address** -> Select **Allow Access From Anywhere (`0.0.0.0/0`)** -> Confirm.
6. **Get Connection String**:
   - Go to **Database Deployments** -> Click **Connect** -> Choose **Drivers (Node.js)**.
   - Copy connection string:
     ```
     mongodb+srv://cineverse_admin:<password>@cluster0.xxxxx.mongodb.net/cineverse?retryWrites=true&w=majority
     ```
   - Replace `<password>` with your database user password.

---

## Step 2: Deploy Backend API (Render.com)

1. Push your repository to GitHub (see GitHub setup below).
2. Go to [Render.com](https://render.com) and log in with GitHub.
3. Click **New +** -> **Web Service**.
4. Select your GitHub repository (`CineVerse`).
5. Configure the service settings:
   - **Name**: `cineverse-api`
   - **Region**: Choose closest (e.g., Singapore / Frankfurt / Oregon)
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node src/server.js`
   - **Instance Type**: `Free`
6. Add **Environment Variables**:
   | Key | Value |
   |-----|-------|
   | `NODE_ENV` | `production` |
   | `PORT` | `5000` |
   | `MONGO_URI` | *Your MongoDB Atlas connection URI from Step 1* |
   | `JWT_SECRET` | *Any long random secret string* |
   | `CLIENT_URL` | *Your frontend URL (update after Step 3)* |
7. Click **Create Web Service**.
8. Once built and healthy, copy the backend public URL (e.g., `https://cineverse-api.onrender.com`).
9. Optional: In Render shell, run `npm run seed` to seed initial movies, or let the server auto-seed on startup.

---

## Step 3: Deploy Frontend React App (Vercel)

1. Go to [Vercel](https://vercel.com) and log in with GitHub.
2. Click **Add New...** -> **Project**.
3. Import your `CineVerse` GitHub repository.
4. Configure Project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click `Edit` and select `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add **Environment Variables**:
   | Name | Value |
   |------|-------|
   | `VITE_API_URL` | `https://cineverse-api.onrender.com` *(from Step 2)* |
6. Click **Deploy**.
7. Vercel will build and deploy your app in under 1 minute and assign a domain:
   `https://cineverse-client.vercel.app`

---

## Step 4: Final Linkage & Verification

1. Go back to Render Dashboard -> `cineverse-api` -> **Environment Variables**.
2. Set `CLIENT_URL` to your Vercel URL: `https://cineverse-client.vercel.app`.
3. Open your deployed Vercel URL in your browser:
   - Verify movie cards load from MongoDB Atlas.
   - Test adding a new movie.
   - Test liking a movie (heart toggle).
   - Test viewing details and posting a review.
   - Check the Analytics dashboard.
4. Paste your working URLs into `SPREADSHEET_SUBMISSION.md` and the final training spreadsheet.

