# 🌉 SkillBridge — Personalized Skill Gap Analyzer & Learning Roadmap

> **3rd Year Engineering Capstone Project**  
> An interactive web application and presentation platform that empowers students to bridge the gap between academic knowledge and industry technical standards.

---

## 🌟 Key Features

1. **⚡ Fully Operable Skill Gap Analyzer**
   - **8 Curated Job Profiles**: Data Analyst, Frontend Developer, Backend Developer, Machine Learning Engineer, Full Stack Developer, DevOps & Cloud Engineer, Cybersecurity Analyst, and Mobile App Developer.
   - **Intelligent Synonym Normalization**: Automatically standardizes aliases (e.g., `postgres` &rarr; `sql`, `js` &rarr; `javascript`, `sklearn` &rarr; `scikit-learn`, `k8s` &rarr; `kubernetes`).
   - **Quantitative Readiness Gauge**: Interactive Chart.js doughnut chart calculating live match percentage and readiness category.
   - **Competency Categorization**: Clear segmentation of possessed vs. missing competencies.
   - **Prioritized Learning Roadmap**: Actionable steps categorized by priority (`P1 Critical`, `P2 Recommended`, `P3 Advanced`) with estimated completion time and verified free tutorial links.
   - **Persistent Checklist**: Save your progress across sessions using `localStorage`.
   - **Resume / Bio Auto-Extractor**: Paste raw text, project summaries, or LinkedIn bios to extract technical skills automatically.

2. **🖥️ Embedded 16-Slide Presentation Deck**
   - Seamlessly integrated into the web application.
   - Keyboard navigation (<kbd>&larr;</kbd> / <kbd>&rarr;</kbd> or <kbd>Space</kbd>).
   - Thumbnail drawer for instant jump to any slide.
   - Integrated speaker notes toggle (<kbd>N</kbd>).
   - Distraction-free fullscreen presentation mode.

3. **🏛️ Architecture & System Design**
   - Visual step-by-step pipeline from User Input &rarr; Normalizer &rarr; Gap Matching &rarr; Resource Mapper &rarr; Visual Analytics Dashboard.
   - Modular separation of concerns.

4. **📊 Market Comparison Matrix**
   - Detailed evaluation of existing platforms (LinkedIn Jobs, Coursera/Udemy, Resume Checkers, roadmap.sh) vs. SkillBridge.

5. **🤖 Interactive AI Career Mentor Simulation**
   - Context-aware chatbot widget providing personalized study timelines, project ideas, and interview preparation advice tailored to the student's analyzed gaps.

6. **🖨️ PDF Report Export**
   - Formatted print stylesheet for 1-click clean export of the skill gap analysis and roadmap.

---

## 🧱 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | HTML5 (Semantic), Modern CSS3 (Glassmorphism, Dark Mode), Vanilla JavaScript (ES6+), Chart.js (v4.4) |
| **Backend** | Python 3.10+, Flask, Flask-CORS, Gunicorn |
| **Data & Engines** | JSON-based taxonomies, Synonym normalization dictionary, Mathematical set difference logic |
| **Tooling & IDE** | Google Antigravity Agentic IDE, Git / GitHub |

---

## 📂 Project Directory Structure

```
skillbridge/
├── index.html                      # Complete single-page web application
├── README.md                       # Documentation & setup guide
├── css/
│   └── styles.css                  # Custom styling, dark mode, glassmorphism & print stylesheet
├── js/
│   ├── app.js                      # Main application coordinator & UI event handlers
│   ├── analyzer.js                 # Gap analysis engine, Chart.js renderer & resume extractor
│   ├── presentation.js             # 16-slide interactive deck controller & fullscreen mode
│   ├── ai-advisor.js               # Contextual AI career mentor chat simulator
│   └── data.js                     # Job definitions, synonyms, resources & presentation slides
└── backend/
    ├── app.py                      # Python Flask REST API server (/jobs, /analyze, /resources)
    ├── requirements.txt            # Python dependencies (Flask, flask-cors, gunicorn)
    ├── Procfile                    # Cloud deployment specification
    └── data/
        ├── jobs.json               # Job role requirements and descriptions
        ├── synonyms.json           # 40+ alias normalization mappings
        └── resources.json          # Curated free tutorials, durations, and priorities
```

---

## 🚀 How to Run Locally

### Option A: Instant Client Mode (Zero Installation Required)
SkillBridge includes a high-performance standalone client engine. You can run it immediately without installing any Python packages!

1. Open `index.html` directly in Google Chrome, Microsoft Edge, or Firefox:
   - Double-click `index.html` in File Explorer, OR
   - Run a local static server:
     ```bash
     cd C:\Users\KIIT\.gemini\antigravity\scratch\skillbridge
     python -m http.server 8000
     ```
2. Navigate to `http://localhost:8000` in your web browser.

---

### Option B: Fullstack Flask API Mode

To run with the Python Flask REST API backend:

1. **Start the Backend Server**:
   ```bash
   cd C:\Users\KIIT\.gemini\antigravity\scratch\skillbridge\backend
   pip install -r requirements.txt
   python app.py
   ```
   *The Flask API will start on `http://localhost:5000`.*

2. **Launch the Frontend**:
   - Open `index.html` in your browser (or serve on `http://localhost:8000`).
   - The top navigation bar will automatically detect the Flask server and display **Flask API (Port 5000)**!

---

## 🎮 Presentation Controls

- **Next Slide**: Press <kbd>&rarr;</kbd>, <kbd>PageDown</kbd>, <kbd>Space</kbd>, or click **Next &rarr;**.
- **Previous Slide**: Press <kbd>&larr;</kbd>, <kbd>PageUp</kbd>, or click **&larr; Previous**.
- **Toggle Speaker Notes**: Press <kbd>N</kbd> or click **🎙️ Speaker Notes**.
- **Slide Index**: Click **📑 Slide Index** to jump directly to any of the 16 slides.
- **Fullscreen Mode**: Click **⛶ Fullscreen** for projection defense mode.

---

## 👥 Academic Credits & Team

- **Academic Year**: 2026 (3rd Year Capstone Defense)
- **Domain**: Educational Technology & Career Intelligence
- **Repository**: Open-source MIT License
