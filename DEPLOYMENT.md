# 🚀 SkillBridge Deployment Guide

This guide provides step-by-step instructions to deploy both the **Frontend** and **Backend** to free, production-ready cloud platforms (Render and Vercel / GitHub Pages).

---

## 🏗️ Architecture Overview

SkillBridge is built with a **decoupled hybrid architecture**:
1. **Frontend**: Static Single-Page Application (HTML5, CSS3, ES6+ JavaScript, Chart.js) &rarr; Hosted on **Vercel**, **Netlify**, or **GitHub Pages**.
2. **Backend**: Python Flask REST API with Gunicorn &rarr; Hosted on **Render** (Free Web Service) or any Docker-compatible cloud.
3. **Instant Zero-Config Mode**: Because SkillBridge includes a full client-side matching engine, the frontend can be deployed completely standalone without even needing a backend!

---

## 📦 Part 1: Push Project to GitHub

Before deploying to Render or Vercel, push your code to a GitHub repository:

1. Open your terminal in the project directory:
   ```bash
   cd C:\Users\KIIT\.gemini\antigravity\scratch\skillbridge
   ```
2. Initialize Git and commit all files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of SkillBridge application and presentation"
   ```
3. Create a new repository on [GitHub](https://github.com/new) named `skillbridge`.
4. Link and push your repository:
   ```bash
   git remote add origin https://github.com/<your-username>/skillbridge.git
   git branch -M main
   git push -u origin main
   ```

---

## 🐍 Part 2: Deploy Backend to Render (Free Web Service)

Render provides free hosting for Python/Flask web services.

### Option A: Standard Render Web Service
1. Go to [Render.com](https://render.com) and sign in with GitHub.
2. Click **New +** &rarr; **Web Service**.
3. Select your `skillbridge` GitHub repository.
4. Fill in the deployment details:
   - **Name**: `skillbridge-api`
   - **Region**: Choose the closest region (e.g., `Singapore` or `Frankfurt` or `Oregon`)
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app --bind 0.0.0.0:$PORT`
   - **Instance Type**: `Free`
5. Click **Create Web Service**.
6. Render will build and deploy your API. Once finished, copy your service URL:
   `https://skillbridge-api.onrender.com`

### Test Your Live Backend:
Open `https://skillbridge-api.onrender.com/` in your browser. You should see:
```json
{
  "status": "online",
  "message": "SkillBridge API is active and operational 🚀",
  "version": "1.0.0"
}
```

---

## ⚡ Part 3: Deploy Frontend to Vercel (Recommended)

Vercel offers global edge CDN hosting with automatic SSL certificates.

1. Go to [Vercel.com](https://vercel.com) and log in with GitHub.
2. Click **Add New...** &rarr; **Project**.
3. Select your `skillbridge` repository and click **Import**.
4. In the project settings:
   - **Framework Preset**: `Other`
   - **Root Directory**: `./` (leave default)
   - Configuration file `vercel.json` will be detected automatically!
5. Click **Deploy**.
6. In about 20 seconds, your application will be live at:
   `https://skillbridge-<your-username>.vercel.app`

---

## 🌐 Part 4: Alternative Frontend Deployment (GitHub Pages)

If you prefer GitHub Pages:
1. Go to your repository on GitHub.
2. Click **Settings** &rarr; **Pages** (in the left sidebar).
3. Under **Branch**, select `main` and folder `/ (root)`.
4. Click **Save**.
5. Your application will be live at:
   `https://<your-username>.github.io/skillbridge/`

---

## 🔗 Part 5: Connecting Frontend to Your Live Render Backend

1. Open your live deployed frontend (on Vercel or GitHub Pages).
2. Look at the top navigation bar &rarr; click on the **Engine Mode Pill** (`Client Engine (Active)`).
3. In the prompt, enter your Render API URL:
   ```
   https://skillbridge-api.onrender.com
   ```
4. Click **OK**. The badge will immediately switch to:
   **🟢 Cloud API (Live)**!
5. Your frontend is now communicating directly with your live production Flask API on Render!

*(Note: If Render is ever sleeping or cold-starting, SkillBridge automatically falls back to its built-in client engine so your app never fails or freezes!)*

---

## 🐳 Part 6: Docker Deployment (Optional)

If you wish to deploy via Docker to Railway, Fly.io, or AWS:
```bash
cd backend
docker build -t skillbridge-api .
docker run -p 5000:5000 skillbridge-api
```
The Docker container exposes port 5000 and runs Gunicorn with 2 production workers.
