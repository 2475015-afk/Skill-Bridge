from flask import Flask, request, jsonify
import json
import os

try:
    from flask_cors import CORS
    has_cors = True
except ImportError:
    has_cors = False

app = Flask(__name__)
if has_cors:
    CORS(app)
else:
    # Native CORS fallback for zero-dependency execution
    @app.after_request
    def add_cors_headers(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
        response.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,OPTIONS'
        return response

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def load_json(filename):
    filepath = os.path.join(BASE_DIR, 'data', filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)

JOBS = load_json('jobs.json')
SYNONYMS = load_json('synonyms.json')
RESOURCES = load_json('resources.json')

def normalize(skill):
    clean = skill.lower().strip()
    return SYNONYMS.get(clean, clean)

def analyze_gap(target_job, current_skills):
    job = JOBS.get(target_job)
    if not job:
        return None

    required_raw = job.get('skills', [])
    required_norm = [normalize(s) for s in required_raw]
    
    # User's normalized current skills set
    current_norm = set(normalize(s) for s in current_skills if s.strip())

    matched = [skill for skill in required_norm if skill in current_norm]
    missing = [skill for skill in required_norm if skill not in current_norm]

    match_pct = round((len(matched) / len(required_norm)) * 100) if required_norm else 0

    roadmap = []
    for skill in missing:
        info = RESOURCES.get(skill, {
            "name": skill.title(),
            "resource": "https://www.google.com/search?q=" + skill + "+tutorial",
            "priority": 3,
            "duration": "1-2 Weeks",
            "description": f"Learn key concepts and hands-on projects in {skill}."
        })
        roadmap.append({
            "skill": info.get("name", skill.title()),
            "slug": skill,
            "resource": info.get("resource", ""),
            "priority": info.get("priority", 3),
            "duration": info.get("duration", "1-2 Weeks"),
            "description": info.get("description", "")
        })
    
    # Sort roadmap by priority (P1 highest, then P2, P3)
    roadmap.sort(key=lambda x: x["priority"])

    return {
        "job_id": target_job,
        "job_title": job.get('title', target_job),
        "job_description": job.get('description', ''),
        "match": match_pct,
        "total_required": len(required_norm),
        "matched_count": len(matched),
        "missing_count": len(missing),
        "matched": matched,
        "missing": missing,
        "roadmap": roadmap
    }

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "status": "online",
        "message": "SkillBridge API is active and operational 🚀",
        "version": "1.0.0",
        "endpoints": ["/jobs", "/analyze", "/resources"]
    })

@app.route('/jobs', methods=['GET'])
def get_jobs():
    return jsonify({
        "jobs": [
            {
                "id": k, 
                "title": v.get('title'),
                "description": v.get('description', ''),
                "skill_count": len(v.get('skills', []))
            } 
            for k, v in JOBS.items()
        ]
    })

@app.route('/resources', methods=['GET'])
def get_resources():
    return jsonify({
        "resources": RESOURCES,
        "synonyms": SYNONYMS
    })

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json(silent=True) or {}
    target_job = str(data.get('target_job', '')).strip()
    current_skills = data.get('current_skills', [])

    if isinstance(current_skills, str):
        current_skills = [s.strip() for s in current_skills.split(',') if s.strip()]

    if not target_job:
        return jsonify({"error": "Please select a target job role"}), 400

    if not current_skills:
        return jsonify({"error": "Please enter at least one current skill"}), 400

    result = analyze_gap(target_job, current_skills)
    if not result:
        return jsonify({"error": f"Job role '{target_job}' not found"}), 404

    return jsonify(result)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"Starting SkillBridge Flask server on port {port}...")
    app.run(host='0.0.0.0', port=port, debug=True)
