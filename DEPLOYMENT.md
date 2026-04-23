# Deployment Guide: LF_SYSTEM

This guide provides instructions for pushing the **Lost & Found Item Management System** to GitHub and deploying it to Render.

## 🐙 Part 1: GitHub Setup

1. **Initialize & Commit**
   Open your terminal in the root directory:
   ```bash
   git init
   git add .
   git commit -m "feat: initial migration to Lost & Found System"
   ```

2. **Push to Remote**
   Create a repository on GitHub, then:
   ```bash
   git remote add origin <your-repo-url>
   git branch -M main
   git push -u origin main
   ```

---

## ☁️ Part 2: Render Deployment

Render works best when you deploy the backend and frontend as separate services.

### 1. Backend (Web Service)
- **Service Type**: Web Service
- **Build Filter**: `server/`
- **Root Directory**: `server`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Environment Variables**:
  - `MONGO_URI`: Your MongoDB connection string
  - `JWT_SECRET`: Your secret key
  - `PORT`: 5000

### 2. Frontend (Static Site)
- **Service Type**: Static Site
- **Build Filter**: `client/`
- **Root Directory**: `client`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- **Redirects/Rewrites**:
  - Render Static Sites need a redirect rule for SPAs:
    - **Source**: `/*`
    - **Destination**: `/index.html`
    - **Action**: `Rewrite`

---

## ⚠️ Pre-Deployment Checklist

### Update API URLs
Currently, the frontend code points to `http://localhost:5000`. Before deploying, you must ensure the frontend can talk to the production backend.

**Recommended Change**:
In `client/src/`, create a `.env` file for local development and use `import.meta.env.VITE_API_URL` in your axios calls.

### Database Whitelisting
If using MongoDB Atlas, remember to whitelist **0.0.0.0/0** in the Network Access tab of Atlas so Render's servers can connect to your database.
