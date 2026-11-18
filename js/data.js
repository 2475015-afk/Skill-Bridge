// SkillBridge — Core Static Data, Job Profiles, Resources & Presentation Deck

const JOBS_DATA = {
  "data_analyst": {
    "title": "Data Analyst",
    "icon": "📊",
    "description": "Transforms raw transactional and business data into strategic insights using SQL, statistical analysis, and interactive dashboards.",
    "skills": ["python", "sql", "pandas", "excel", "statistics", "power bi", "data visualization", "tableau"]
  },
  "frontend_dev": {
    "title": "Frontend Developer",
    "icon": "💻",
    "description": "Architects responsive, accessible, high-performance web applications and fluid client-side interfaces.",
    "skills": ["html", "css", "javascript", "react", "git", "responsive design", "rest api", "tailwind"]
  },
  "backend_dev": {
    "title": "Backend Developer",
    "icon": "⚙️",
    "description": "Engineers scalable microservices, RESTful APIs, cloud integrations, and robust database architectures.",
    "skills": ["python", "sql", "flask", "rest api", "git", "docker", "database design", "fastapi"]
  },
  "ml_engineer": {
    "title": "Machine Learning Engineer",
    "icon": "🤖",
    "description": "Researches, trains, optimizes, and productionizes deep learning models and predictive AI pipelines.",
    "skills": ["python", "machine learning", "numpy", "pandas", "scikit-learn", "statistics", "deep learning", "pytorch"]
  },
  "fullstack_dev": {
    "title": "Full Stack Developer",
    "icon": "🚀",
    "description": "Bridges end-to-end software engineering across modern frontend frameworks and robust backend services.",
    "skills": ["html", "css", "javascript", "react", "python", "flask", "sql", "git", "rest api", "docker"]
  },
  "devops_engineer": {
    "title": "DevOps & Cloud Engineer",
    "icon": "☁️",
    "description": "Automates CI/CD deployment pipelines, container orchestration, and resilient cloud infrastructures.",
    "skills": ["linux", "docker", "kubernetes", "git", "ci/cd", "aws", "python", "bash", "terraform"]
  },
  "cybersecurity_analyst": {
    "title": "Cybersecurity Analyst",
    "icon": "🛡️",
    "description": "Hardens IT infrastructure, detects intrusions, analyzes threat vulnerabilities, and ensures regulatory compliance.",
    "skills": ["networking", "linux", "python", "wireshark", "ethical hacking", "cryptography", "sql", "firewalls"]
  },
  "mobile_dev": {
    "title": "Mobile App Developer",
    "icon": "📱",
    "description": "Builds high-performance native and cross-platform mobile apps for iOS and Android devices.",
    "skills": ["javascript", "react native", "flutter", "git", "rest api", "mobile ui/ux", "firebase", "sqlite"]
  }
};

const SYNONYMS_DATA = {
  "js": "javascript",
  "ts": "typescript",
  "ml": "machine learning",
  "ai": "machine learning",
  "dl": "deep learning",
  "sklearn": "scikit-learn",
  "scikit learn": "scikit-learn",
  "powerbi": "power bi",
  "power-bi": "power bi",
  "postgres": "sql",
  "postgresql": "sql",
  "mysql": "sql",
  "sqlite": "sql",
  "nosql": "mongodb",
  "html5": "html",
  "css3": "css",
  "tailwind css": "tailwind",
  "tailwindcss": "tailwind",
  "node": "node.js",
  "nodejs": "node.js",
  "reactjs": "react",
  "react.js": "react",
  "react native": "react native",
  "reactnative": "react native",
  "rest": "rest api",
  "restapi": "rest api",
  "apis": "rest api",
  "api": "rest api",
  "k8s": "kubernetes",
  "amazon web services": "aws",
  "py": "python",
  "stats": "statistics",
  "data viz": "data visualization",
  "visualization": "data visualization",
  "pen testing": "ethical hacking",
  "pentesting": "ethical hacking",
  "cyber security": "ethical hacking",
  "network security": "networking",
  "networks": "networking",
  "cicd": "ci/cd",
  "ci-cd": "ci/cd",
  "continuous integration": "ci/cd"
};

const RESOURCES_DATA = {
  "python": { "name": "Python Programming", "resource": "https://www.freecodecamp.org/learn/scientific-computing-with-python/", "priority": 1, "duration": "3-4 Weeks", "description": "Core syntax, data structures, OOP, file I/O, and automation." },
  "sql": { "name": "SQL & Relational Databases", "resource": "https://www.sqlbolt.com/", "priority": 1, "duration": "2 Weeks", "description": "Query syntax, JOINs, group by, window functions, and indexing." },
  "pandas": { "name": "Pandas Data Analysis", "resource": "https://pandas.pydata.org/docs/user_guide/10min.html", "priority": 1, "duration": "1-2 Weeks", "description": "DataFrames, data cleaning, aggregation, reshaping, and exploratory data analysis." },
  "excel": { "name": "Advanced Excel & Spreadsheets", "resource": "https://www.freecodecamp.org/news/excel-tutorial/", "priority": 2, "duration": "1 Week", "description": "VLOOKUP/XLOOKUP, Pivot tables, nested IF logic, and business formulas." },
  "statistics": { "name": "Statistical Thinking & Probability", "resource": "https://www.khanacademy.org/math/statistics-probability", "priority": 1, "duration": "2-3 Weeks", "description": "Hypothesis testing, distributions, regression, and variance." },
  "power bi": { "name": "Power BI Dashboards", "resource": "https://learn.microsoft.com/en-us/power-bi/", "priority": 2, "duration": "2 Weeks", "description": "Data modeling, DAX queries, and executive KPI reporting." },
  "tableau": { "name": "Tableau Visual Analytics", "resource": "https://www.tableau.com/learn/training", "priority": 2, "duration": "2 Weeks", "description": "Interactive dashboards, calculated fields, and visual data storytelling." },
  "data visualization": { "name": "Data Storytelling & Viz", "resource": "https://www.freecodecamp.org/news/data-visualization/", "priority": 2, "duration": "1-2 Weeks", "description": "Chart selection, color theory, Matplotlib, and Seaborn." },
  "html": { "name": "HTML5 Semantic Structure", "resource": "https://www.freecodecamp.org/learn/responsive-web-design/", "priority": 1, "duration": "1 Week", "description": "Semantic markup, web accessibility (a11y), forms, and SEO fundamentals." },
  "css": { "name": "CSS3 & Modern Layouts", "resource": "https://www.freecodecamp.org/learn/responsive-web-design/", "priority": 1, "duration": "2 Weeks", "description": "Flexbox, CSS Grid, custom properties, animations, and responsive breakpoints." },
  "tailwind": { "name": "Tailwind CSS Utility Framework", "resource": "https://tailwindcss.com/docs/utility-first", "priority": 2, "duration": "1 Week", "description": "Rapid modern UI development with utility-first classes and design tokens." },
  "javascript": { "name": "Modern JavaScript (ES6+)", "resource": "https://javascript.info/", "priority": 1, "duration": "3-4 Weeks", "description": "Async/await, Promises, closures, DOM manipulation, and modern ES features." },
  "react": { "name": "React.js Component Framework", "resource": "https://react.dev/learn", "priority": 2, "duration": "3 Weeks", "description": "Hooks (useState, useEffect, useMemo), state lifting, and component lifecycles." },
  "git": { "name": "Git & GitHub Version Control", "resource": "https://git-scm.com/book/en/v2", "priority": 1, "duration": "1 Week", "description": "Branching workflows, commits, pull requests, and merge conflict resolution." },
  "responsive design": { "name": "Responsive Web Design", "resource": "https://www.freecodecamp.org/learn/responsive-web-design/", "priority": 2, "duration": "1 Week", "description": "Mobile-first layouts, media queries, and fluid typography." },
  "rest api": { "name": "RESTful API Architecture", "resource": "https://restfulapi.net/", "priority": 2, "duration": "1-2 Weeks", "description": "HTTP methods, status codes, JSON payload design, and authentication tokens." },
  "flask": { "name": "Flask Python Microframework", "resource": "https://flask.palletsprojects.com/en/3.0.x/tutorial/", "priority": 2, "duration": "2 Weeks", "description": "Routing, blueprinted controllers, request handling, and JSON serialization." },
  "fastapi": { "name": "FastAPI Modern Asynchronous APIs", "resource": "https://fastapi.tiangolo.com/tutorial/", "priority": 2, "duration": "2 Weeks", "description": "High-performance asynchronous Python API development and OpenAPI docs." },
  "docker": { "name": "Docker Containerization", "resource": "https://docs.docker.com/get-started/", "priority": 3, "duration": "2 Weeks", "description": "Dockerfiles, multi-stage builds, container networks, and Docker Compose." },
  "database design": { "name": "Relational Database Design", "resource": "https://www.freecodecamp.org/news/database-design/", "priority": 2, "duration": "1-2 Weeks", "description": "Entity-Relationship modeling, 1NF to 3NF normalization, foreign keys." },
  "machine learning": { "name": "Machine Learning Fundamentals", "resource": "https://www.coursera.org/learn/machine-learning", "priority": 1, "duration": "4 Weeks", "description": "Supervised & unsupervised learning, classification, regression, loss functions." },
  "numpy": { "name": "NumPy Numerical Computing", "resource": "https://numpy.org/learn/", "priority": 1, "duration": "1 Week", "description": "N-dimensional array manipulation, broadcasting, linear algebra operations." },
  "scikit-learn": { "name": "Scikit-Learn ML Library", "resource": "https://scikit-learn.org/stable/tutorial/index.html", "priority": 2, "duration": "2 Weeks", "description": "Pipelines, cross-validation, hyperparameter tuning, metrics evaluation." },
  "deep learning": { "name": "Deep Learning & Neural Networks", "resource": "https://www.deeplearning.ai/", "priority": 3, "duration": "4 Weeks", "description": "Backpropagation, activation functions, CNNs, RNNs, and Transformers." },
  "pytorch": { "name": "PyTorch Deep Learning", "resource": "https://pytorch.org/tutorials/", "priority": 3, "duration": "3 Weeks", "description": "Tensors, autograd, custom neural network modules, DataLoader pipelines." },
  "linux": { "name": "Linux Shell & System Administration", "resource": "https://linuxjourney.com/", "priority": 1, "duration": "2 Weeks", "description": "Command line navigation, file permissions, process management, shell scripts." },
  "kubernetes": { "name": "Kubernetes Container Orchestration", "resource": "https://kubernetes.io/docs/tutorials/", "priority": 3, "duration": "3 Weeks", "description": "Pods, Deployments, Services, Ingress controllers, and Helm charts." },
  "ci/cd": { "name": "CI/CD Pipelines (GitHub Actions)", "resource": "https://docs.github.com/en/actions", "priority": 2, "duration": "1-2 Weeks", "description": "Automated testing, linting, build workflows, and deployment triggers." },
  "aws": { "name": "Amazon Web Services (AWS Cloud)", "resource": "https://aws.amazon.com/training/", "priority": 2, "duration": "3 Weeks", "description": "EC2, S3, Lambda serverless, IAM security, and VPC networking." },
  "bash": { "name": "Bash Automation Scripting", "resource": "https://www.freecodecamp.org/news/bash-scripting-tutorial/", "priority": 2, "duration": "1 Week", "description": "Automating system tasks, cron jobs, text parsing with grep/sed/awk." },
  "terraform": { "name": "Terraform Infrastructure as Code", "resource": "https://developer.hashicorp.com/terraform/tutorials", "priority": 3, "duration": "2 Weeks", "description": "HCL syntax, providers, state management, and reproducible cloud environments." },
  "networking": { "name": "Computer Networks & Protocols", "resource": "https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:the-internet", "priority": 1, "duration": "2 Weeks", "description": "TCP/IP, UDP, DNS, OSI model, subnets, and routing protocols." },
  "wireshark": { "name": "Wireshark Packet Analysis", "resource": "https://www.wireshark.org/docs/", "priority": 2, "duration": "1 Week", "description": "Network traffic sniffing, packet filtering, and security anomaly detection." },
  "ethical hacking": { "name": "Ethical Hacking & Penetration Testing", "resource": "https://www.tryhackme.com/", "priority": 2, "duration": "4 Weeks", "description": "Reconnaissance, vulnerability scanning, exploitation concepts, OWASP Top 10." },
  "cryptography": { "name": "Applied Cryptography & Security", "resource": "https://www.coursera.org/learn/crypto", "priority": 2, "duration": "2 Weeks", "description": "Symmetric/asymmetric encryption, hashing, RSA, TLS, and digital signatures." },
  "firewalls": { "name": "Firewalls & Network Defense", "resource": "https://www.cisco.com/c/en/us/products/security/firewalls/what-is-a-firewall.html", "priority": 2, "duration": "1 Week", "description": "Stateful packet inspection, IDS/IPS configurations, security group policies." },
  "flutter": { "name": "Flutter & Dart App Development", "resource": "https://docs.flutter.dev/get-started/codelab", "priority": 2, "duration": "3 Weeks", "description": "Cross-platform widgets, state management (Provider/Bloc), async APIs." },
  "react native": { "name": "React Native Mobile Apps", "resource": "https://reactnative.dev/docs/getting-started", "priority": 2, "duration": "3 Weeks", "description": "Native UI components, navigation, device sensors, and bundle building." },
  "mobile ui/ux": { "name": "Mobile UI/UX Design Guidelines", "resource": "https://material.io/design", "priority": 2, "duration": "1 Week", "description": "Touch targets, iOS Human Interface Guidelines & Material 3 standards." },
  "firebase": { "name": "Firebase Backend-as-a-Service", "resource": "https://firebase.google.com/docs", "priority": 2, "duration": "1 Week", "description": "Firestore real-time DB, Auth, Cloud Messaging, and serverless functions." },
  "sqlite": { "name": "Embedded SQLite Databases", "resource": "https://www.sqlite.org/quickstart.html", "priority": 2, "duration": "1 Week", "description": "Local embedded storage, schemas, and mobile relational queries." }
};

const SAMPLE_PROFILES = [
  {
    "label": "🎓 College Grad (CS Basics)",
    "skills": "python, html, css, git, sql",
    "target": "backend_dev"
  },
  {
    "label": "🌐 Self-Taught Frontend Explorer",
    "skills": "html5, css3, js, react, git, responsive design",
    "target": "frontend_dev"
  },
  {
    "label": "📈 Data Analyst Aspirant",
    "skills": "excel, sql, stats, python",
    "target": "data_analyst"
  },
  {
    "label": "🧠 AI Enthusiast",
    "skills": "python, numpy, stats, pandas, ml",
    "target": "ml_engineer"
  }
];

// All 16 Slides from DeepSeek Presentation Deck
const PRESENTATION_SLIDES = [
  {
    "number": 1,
    "title": "SkillBridge",
    "subtitle": "Personalized Skill Gap Analyzer & Learning Roadmap",
    "type": "title",
    "badge": "Project Overview",
    "content": {
      "tagline": "Empowering students and job-seekers to bridge the gap between classroom knowledge and industry requirements.",
      "meta": [
        { "label": "Academic Scope", "val": "3rd Year Engineering Capstone Project" },
        { "label": "Core Domain", "val": "EdTech & Career Intelligence" },
        { "label": "Stack", "val": "Python, Flask, JavaScript, Chart.js" },
        { "label": "Status", "val": "Live & Operable Prototype" }
      ]
    },
    "notes": "Welcome the audience. Introduce SkillBridge as an automated platform that translates career aspirations into actionable learning roadmaps."
  },
  {
    "number": 2,
    "title": "The Problem",
    "subtitle": "The Career Readiness Dilemma for Modern Students",
    "type": "bullets",
    "badge": "Problem Discovery",
    "items": [
      { "title": "Ambiguous Job Requirements", "desc": "Job postings are scattered, filled with industry buzzwords, and vary wildly between employers." },
      { "title": "Lack of Personalized Guidance", "desc": "Students know where they want to go, but have no way to quantify what specific skills they are missing." },
      { "title": "Wasted Time & Misguided Effort", "desc": "Learners spend months on tutorials for skills that aren't critical, while skipping prerequisite industry standards." },
      { "title": "The Information Overload Paradox", "desc": "Thousands of courses exist, yet zero unified tools connect a student's current profile directly to a prioritized roadmap." }
    ],
    "notes": "Highlight how 80% of engineering students struggle to identify their technical gap before applying for campus placements."
  },
  {
    "number": 3,
    "title": "Problem Statement",
    "subtitle": "Defining the Core Challenge",
    "type": "quote",
    "badge": "Core Thesis",
    "quote": "There is currently no unified, accessible platform that quantitatively maps a student's existing skillset against real-world job requirements and produces an immediate, prioritized learning roadmap with verified free resources.",
    "attribution": "SkillBridge Research & Engineering Thesis",
    "notes": "Deliver the problem statement clearly. Emphasize that existing resume checkers only fix formatting, not actual technical skills."
  },
  {
    "number": 4,
    "title": "Our Solution: SkillBridge",
    "subtitle": "How SkillBridge Solves the Skill Gap",
    "type": "features",
    "badge": "Solution Architecture",
    "items": [
      { "icon": "🎯", "title": "Target Role Selection", "desc": "Select from real-world curated job profiles covering Data, Web, Cloud, AI, and Security." },
      { "icon": "⚡", "title": "Smart Skill Normalization", "desc": "Synonym engine normalizes varying terminologies (e.g., 'postgres' to 'SQL', 'js' to 'JavaScript')." },
      { "icon": "📊", "title": "Quantitative Gap Scoring", "desc": "Instant match percentage gauge highlighting both possessed strengths and missing requirements." },
      { "icon": "🗺️", "title": "Prioritized Roadmap", "desc": "Actionable P1 (Critical), P2 (Recommended), and P3 (Nice-to-have) milestones with free learning links." }
    ],
    "notes": "Walk through the four pillars of the solution. Emphasize the synonym normalization engine which prevents false negatives."
  },
  {
    "number": 5,
    "title": "Project Objectives",
    "subtitle": "Key Goals Accomplished by SkillBridge",
    "type": "bullets",
    "badge": "Milestones",
    "items": [
      { "title": "Automated Skill Extraction", "desc": "Accept structured or free-text skills and extract normalized technical capabilities." },
      { "title": "Benchmarking Against Industry Profiles", "desc": "Match against standardized role profiles derived from active tech postings." },
      { "title": "Transparent Visual Analytics", "desc": "Deliver responsive Chart.js doughnut visualizations and clear status badges." },
      { "title": "Curated Free Learning Pathways", "desc": "Link missing competencies directly to high-quality, verified free courses and documentation." },
      { "title": "Modular & Extensible Architecture", "desc": "Design a clean REST API backend decoupled from a high-performance modern client." }
    ],
    "notes": "Outline how these objectives were turned into functional code modules."
  },
  {
    "number": 6,
    "title": "Existing Solutions & Gaps",
    "subtitle": "Competitive Landscape Comparison",
    "type": "table",
    "badge": "Market Research",
    "table": {
      "headers": ["Platform", "What It Offers", "Critical Gap"],
      "rows": [
        ["LinkedIn Jobs", "Aggregates job postings and general criteria", "No personal gap analysis or tailored curriculum"],
        ["Coursera / Udemy", "Extensive video course catalogs", "Catalog-first, not aligned to an individual's target job"],
        ["Resume Checkers", "ATS keyword parsing and layout checks", "Focuses on formatting, not actual competence gap"],
        ["roadmap.sh", "Static, comprehensive developer roadmaps", "Generic broad path, not customized to what you already know"],
        ["SkillBridge (Ours)", "Dynamic gap analysis + prioritized roadmap", "Unified, personalized, instant, and completely free"]
      ]
    },
    "notes": "Show how SkillBridge fills the exact intersection between career assessment and structured learning."
  },
  {
    "number": 7,
    "title": "Tech Stack & Tools",
    "subtitle": "Modern, Lightweight & Scalable Technologies",
    "type": "stack",
    "badge": "Technology",
    "stack": [
      { "category": "Frontend Layer", "techs": ["HTML5 / Semantic UI", "CSS3 / Custom Glassmorphic Theme", "Vanilla JavaScript (ES6+)", "Chart.js Visualizations"] },
      { "category": "Backend Layer", "techs": ["Python 3.10+", "Flask Microframework", "Flask-CORS Middleware", "Gunicorn Production Server"] },
      { "category": "Data & Engines", "techs": ["JSON Datastores", "Synonym Normalization Engine", "Mathematical Set-Difference Logic"] },
      { "category": "Tooling & Deployment", "techs": ["Git & GitHub Versioning", "Google Antigravity Agentic IDE", "Render / Vercel Ready"] }
    ],
    "notes": "Explain why vanilla JS and Flask were chosen: near-instant load times, minimal dependencies, and high maintainability."
  },
  {
    "number": 8,
    "title": "System Architecture",
    "subtitle": "End-to-End Data Flow & Component Interaction",
    "type": "architecture",
    "badge": "System Design",
    "steps": [
      { "step": "1. User Input", "desc": "User selects Target Role and inputs current skills via tags or pasted text." },
      { "step": "2. Client Normalizer", "desc": "Sanitizes strings and maps abbreviations to canonical taxonomy via synonyms." },
      { "step": "3. Analysis Engine", "desc": "Performs set-difference and intersection against job schema: Matched vs Missing." },
      { "step": "4. Resource Synthesizer", "desc": "Queries resource catalog, assigns priority tiers (P1/P2/P3) and estimated weeks." },
      { "step": "5. Interactive Dashboard", "desc": "Renders real-time Chart.js doughnut chart, skill pills, and interactive checklist." }
    ],
    "notes": "Present the clean decoupled architecture. Mention both client-side and Flask REST API execution modes."
  },
  {
    "number": 9,
    "title": "Key System Modules",
    "subtitle": "Modular Architecture Breakdown",
    "type": "modules",
    "badge": "Software Architecture",
    "modules": [
      { "code": "MOD-01", "name": "Input & Tagging Module", "desc": "Handles interactive chip creation, autocomplete, and raw resume text extraction." },
      { "code": "MOD-02", "name": "Normalization & Taxonomy Engine", "desc": "Standardizes aliases (e.g. 'postgres', 'psql' -> 'sql') to eliminate mismatch errors." },
      { "code": "MOD-03", "name": "Gap Matching Logic", "desc": "Calculates quantitative match percentage and segments competencies." },
      { "code": "MOD-04", "name": "Roadmap Generator", "desc": "Generates structured milestones sorted by importance with duration and direct links." },
      { "code": "MOD-05", "name": "Visualization & Export Module", "desc": "Canvas-based dynamic charting and formatted printable PDF report generation." }
    ],
    "notes": "Walk through the single-responsibility design of each module."
  },
  {
    "number": 10,
    "title": "Team Roles & Responsibilities",
    "subtitle": "Division of Engineering Tasks",
    "type": "table",
    "badge": "Team Organization",
    "table": {
      "headers": ["Member", "Primary Responsibilities", "Key Deliverables"],
      "rows": [
        ["Developer A (Backend / Data)", "Data scraping, schema design, synonym taxonomy, Flask endpoints", "jobs.json, synonyms.json, app.py, /analyze endpoint"],
        ["Developer B (Frontend / UI)", "UI/UX design, Chart.js integrations, responsive layouts, presentation deck", "index.html, styles.css, analyzer.js, interactive slide deck"]
      ]
    },
    "notes": "Explain how the workload was evenly divided between data/backend logic and user experience/visualization."
  },
  {
    "number": 11,
    "title": "8-Week Implementation Timeline",
    "subtitle": "Agile Sprint Breakdown & Milestones",
    "type": "timeline",
    "badge": "Project Management",
    "weeks": [
      { "weeks": "Weeks 1–2", "phase": "Research & Requirements", "desc": "Problem formulation, literature review, role data collection, schema definitions." },
      { "weeks": "Weeks 3–4", "phase": "Backend & Algorithm Engine", "desc": "Flask API setup, synonym normalization, set-difference gap calculations, unit tests." },
      { "weeks": "Weeks 5–6", "phase": "Frontend UI & Visualizations", "desc": "Interactive dashboard layout, Chart.js charts, tag inputs, responsive styling." },
      { "weeks": "Week 7", "phase": "Roadmap & Integration", "desc": "Resource linkage, checklist persistence, dual engine implementation." },
      { "weeks": "Week 8", "phase": "Testing, Presentation & Docs", "desc": "End-to-end testing, slide deck integration, documentation, deployment prep." }
    ],
    "notes": "Highlight adherence to the 8-week timeline and on-time delivery of all functional milestones."
  },
  {
    "number": 12,
    "title": "Expected Outcomes & Deliverables",
    "subtitle": "Measurable Results of SkillBridge",
    "type": "bullets",
    "badge": "Deliverables",
    "items": [
      { "title": "Fully Functional Web Application", "desc": "Interactive, production-ready system with instant response time (< 50ms)." },
      { "title": "Verified Synonym Normalization", "desc": "Over 40+ industry aliases correctly mapped to canonical skills without false negatives." },
      { "title": "Comprehensive Learning Curricula", "desc": "Verified free learning links for all supported tech skills across top engineering roles." },
      { "title": "Embedded Interactive Presentation", "desc": "Browser-based slide deck directly integrated inside the application for project review." },
      { "title": "Clean, Extensible Codebase", "desc": "Well-documented GitHub repository with modular files ready for campus deployment." }
    ],
    "notes": "Reiterate that all promised outcomes are fully demonstrated in today's live application."
  },
  {
    "number": 13,
    "title": "Future Scope & Enhancements",
    "subtitle": "Roadmap for Next-Phase Expansion",
    "type": "features",
    "badge": "Future Roadmap",
    "items": [
      { "icon": "📄", "title": "PDF Resume Parsing", "desc": "Direct PDF upload with NLP-based named entity recognition for automated skill extraction." },
      { "icon": "🌐", "title": "Live Job Portal Sync", "desc": "Real-time scrapers and API feeds from LinkedIn, Indeed, and Naukri for dynamic trends." },
      { "icon": "🤖", "title": "Generative AI Career Mentor", "desc": "LLM-powered conversational agent for mock interviews and personalized project advice." },
      { "icon": "🔥", "title": "Learning Streaks & Gamification", "desc": "Daily progress tracker, milestone badges, and calendar study reminders." },
      { "icon": "📱", "title": "Mobile Application", "desc": "Cross-platform mobile app using React Native for learning on the go." }
    ],
    "notes": "Showcase forward-thinking vision for scaling SkillBridge into an enterprise or university campus placement tool."
  },
  {
    "number": 14,
    "title": "References & Data Sources",
    "subtitle": "Scholarly & Industry Citations",
    "type": "bullets",
    "badge": "References",
    "items": [
      { "title": "Industry Role Benchmarks", "desc": "LinkedIn Global Talent Trends & Indeed Hiring Lab Job Role Taxonomy (2024–2026)." },
      { "title": "Curated Open Educational Resources", "desc": "freeCodeCamp Foundation, Khan Academy Computing, Kaggle Learn, and Roadmap.sh." },
      { "title": "Framework Documentation", "desc": "Pallets Projects Flask Docs (v3.0), Chart.js (v4.4), MDN Web Docs (JavaScript APIs)." },
      { "title": "Pedagogical Frameworks", "desc": "Bloom's Revised Taxonomy for categorized technical skill progression." }
    ],
    "notes": "Acknowledge the reputable data sources and open education resources supporting the project."
  },
  {
    "number": 15,
    "title": "Live Demonstration & Workflow",
    "subtitle": "Experience SkillBridge in Action",
    "type": "features",
    "badge": "Live Demo",
    "items": [
      { "icon": "1️⃣", "title": "Step 1: Role Selection", "desc": "Select 'Data Analyst' or 'Machine Learning Engineer' from the dropdown." },
      { "icon": "2️⃣", "title": "Step 2: Enter Skills", "desc": "Type 'python, sql' or click a demo sample profile button." },
      { "icon": "3️⃣", "title": "Step 3: Analyze Gap", "desc": "View the match score gauge, matched skills, and prioritized learning steps." },
      { "icon": "4️⃣", "title": "Step 4: Execute Roadmap", "desc": "Click free tutorial links and track your progress with interactive checkboxes." }
    ],
    "notes": "Transition from slides directly to the live analyzer section for hands-on demonstration."
  },
  {
    "number": 16,
    "title": "Thank You & Q&A",
    "subtitle": "Bridging Careers, Empowering Futures",
    "type": "title",
    "badge": "Conclusion",
    "content": {
      "tagline": "Thank you for your time and guidance. We are ready for questions and live evaluation!",
      "meta": [
        { "label": "Project Repository", "val": "github.com/[team]/skillbridge" },
        { "label": "Live Demo URL", "val": "skillbridge.app" },
        { "label": "Academic Year", "val": "2026 / 3rd Year Capstone" },
        { "label": "Feedback", "val": "Open for Discussion" }
      ]
    },
    "notes": "Conclude presentation gracefully. Open the floor to professor and peer evaluation questions."
  }
];

const COMPARISON_MATRIX = [
  {
    "name": "SkillBridge (Our System)",
    "highlight": true,
    "badge": "Complete Solution",
    "features": {
      "Personalized Gap Score": "✅ Quantitative Match %",
      "Synonym Normalization": "✅ Intelligent (40+ Aliases)",
      "Prioritized Free Roadmap": "✅ P1/P2/P3 with Curated Links",
      "Tailored to Target Job": "✅ Role-Specific Requirements",
      "Interactive Progress Check": "✅ Persistent Checklist",
      "Zero Paywall / Free": "✅ 100% Free & Open Source"
    }
  },
  {
    "name": "LinkedIn Job Insights",
    "highlight": false,
    "badge": "Job Board",
    "features": {
      "Personalized Gap Score": "⚠️ Premium only (Vague)",
      "Synonym Normalization": "⚠️ Basic keyword match",
      "Prioritized Free Roadmap": "❌ None (External links only)",
      "Tailored to Target Job": "✅ Yes",
      "Interactive Progress Check": "❌ None",
      "Zero Paywall / Free": "❌ Requires LinkedIn Premium"
    }
  },
  {
    "name": "Coursera / Udemy",
    "highlight": false,
    "badge": "Course Catalog",
    "features": {
      "Personalized Gap Score": "❌ No gap calculation",
      "Synonym Normalization": "❌ Search engine only",
      "Prioritized Free Roadmap": "❌ Sells individual courses",
      "Tailored to Target Job": "⚠️ Broad specializations",
      "Interactive Progress Check": "⚠️ Course progress only",
      "Zero Paywall / Free": "❌ Paid certificates ($49+/mo)"
    }
  },
  {
    "name": "Resume Checkers (Jobscan/ATS)",
    "highlight": false,
    "badge": "Formatting Tool",
    "features": {
      "Personalized Gap Score": "⚠️ Word frequency score",
      "Synonym Normalization": "⚠️ Literal string matching",
      "Prioritized Free Roadmap": "❌ No educational resources",
      "Tailored to Target Job": "✅ Compares against job text",
      "Interactive Progress Check": "❌ None",
      "Zero Paywall / Free": "❌ Limited free scans"
    }
  },
  {
    "name": "roadmap.sh",
    "highlight": false,
    "badge": "Static Guide",
    "features": {
      "Personalized Gap Score": "❌ No user input or gap score",
      "Synonym Normalization": "❌ Static tree graph",
      "Prioritized Free Roadmap": "⚠️ Static general guides",
      "Tailored to Target Job": "⚠️ Generic career paths",
      "Interactive Progress Check": "⚠️ Account required",
      "Zero Paywall / Free": "✅ Free web trees"
    }
  }
];
