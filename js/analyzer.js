// SkillBridge — Core Gap Analysis Engine, Normalizer & Visualizer

let matchChartInstance = null;
let currentActiveResult = null;
let useBackendApi = false; // Toggle between Client Engine and Flask API

// Normalizes single skill via synonym lookup
function normalizeSkill(skill) {
  if (!skill) return '';
  const clean = skill.toLowerCase().trim().replace(/['"`]/g, '');
  return SYNONYMS_DATA[clean] || clean;
}

// Client-side Gap Analysis Engine (Instant Zero-Dependency Execution)
function analyzeGapClient(targetJobId, currentSkillsList) {
  const job = JOBS_DATA[targetJobId];
  if (!job) return null;

  const requiredRaw = job.skills || [];
  const requiredNorm = requiredRaw.map(s => normalizeSkill(s));

  // User skills normalized
  const userNormSet = new Set(
    currentSkillsList.map(s => normalizeSkill(s)).filter(s => s.length > 0)
  );

  const matched = requiredNorm.filter(s => userNormSet.has(s));
  const missing = requiredNorm.filter(s => !userNormSet.has(s));

  const matchPct = requiredNorm.length > 0
    ? Math.round((matched.length / requiredNorm.length) * 100)
    : 0;

  const roadmap = missing.map(skill => {
    const info = RESOURCES_DATA[skill] || {
      name: skill.charAt(0).toUpperCase() + skill.slice(1),
      resource: `https://www.google.com/search?q=${encodeURIComponent(skill)}+tutorial`,
      priority: 3,
      duration: "1-2 Weeks",
      description: `Learn foundational patterns and hands-on practices in ${skill}.`
    };
    return {
      skill: info.name || skill,
      slug: skill,
      resource: info.resource || "#",
      priority: info.priority || 3,
      duration: info.duration || "1-2 Weeks",
      description: info.description || ""
    };
  });

  // Sort: Priority 1 first, then 2, then 3
  roadmap.sort((a, b) => a.priority - b.priority);

  return {
    job_id: targetJobId,
    job_title: job.title,
    job_icon: job.icon || '🎯',
    job_description: job.description,
    match: matchPct,
    total_required: requiredNorm.length,
    matched_count: matched.length,
    missing_count: missing.length,
    matched: matched,
    missing: missing,
    roadmap: roadmap
  };
}

// API Base URL Manager (Supports Localhost & Render/Cloud Deployment)
function getApiBaseUrl() {
  return localStorage.getItem('skillbridge_api_url') || 'http://localhost:5000';
}

function setApiBaseUrl(url) {
  let clean = url.trim().replace(/\/+$/, '');
  if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
    clean = 'https://' + clean;
  }
  localStorage.setItem('skillbridge_api_url', clean);
  return clean;
}

// Check Backend Availability
async function checkBackendStatus() {
  const currentUrl = getApiBaseUrl();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${currentUrl}/`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      updateBackendBadge(true, currentUrl);
      return true;
    }
  } catch (e) {
    // Backend offline or unreachable
  }
  updateBackendBadge(false, currentUrl);
  return false;
}

function updateBackendBadge(isOnline, url) {
  const badge = document.getElementById('engine-mode-badge');
  if (!badge) return;
  const isCloud = url && !url.includes('localhost') && !url.includes('127.0.0.1');
  const label = isCloud ? 'Cloud API (Live)' : 'Flask API (Local)';

  if (isOnline) {
    badge.innerHTML = `<span class="status-dot online"></span> ${label}`;
    badge.title = `Connected to ${url} (Click to change or toggle engine)`;
    badge.classList.remove('offline');
    badge.classList.add('online');
  } else {
    badge.innerHTML = `<span class="status-dot client"></span> Client Engine (Active)`;
    badge.title = `Running client engine. Click to connect to Flask or Cloud API (${url})`;
    badge.classList.remove('online');
    badge.classList.add('client');
  }
}

// Main Analyze Function (Hybrid Client / API)
async function performAnalysis(targetJobId, skillsRawInput) {
  const skillsArray = typeof skillsRawInput === 'string'
    ? skillsRawInput.split(',').map(s => s.trim()).filter(Boolean)
    : skillsRawInput;

  if (!targetJobId) {
    throw new Error('Please select a target job role.');
  }
  if (!skillsArray || skillsArray.length === 0) {
    throw new Error('Please enter at least one current technical skill.');
  }

  // If user opted for backend API and it's active
  if (useBackendApi) {
    const apiUrl = getApiBaseUrl();
    try {
      const res = await fetch(`${apiUrl}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target_job: targetJobId, current_skills: skillsArray })
      });
      if (res.ok) {
        const data = await res.json();
        if (JOBS_DATA[targetJobId]) {
          data.job_icon = JOBS_DATA[targetJobId].icon;
          data.job_description = JOBS_DATA[targetJobId].description;
        }
        return data;
      }
    } catch (err) {
      console.warn(`API (${apiUrl}) unreachable, falling back to Client Engine:`, err);
    }
  }

  // Instant Client Engine execution
  const result = analyzeGapClient(targetJobId, skillsArray);
  if (!result) {
    throw new Error(`Job role "${targetJobId}" not found in database.`);
  }
  return result;
}

// Render Doughnut Chart using Chart.js
function renderMatchChart(matchPct) {
  const canvas = document.getElementById('matchChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  if (matchChartInstance) {
    matchChartInstance.destroy();
  }

  // Color styling based on DeepSeek SkillBridge palette
  let primaryColor = '#10B981'; // Mint Green (Success/Matched)
  if (matchPct < 40) {
    primaryColor = '#EF4444'; // Red (Danger / Priority 1 / High Gap)
  } else if (matchPct < 70) {
    primaryColor = '#F59E0B'; // Amber (Warning / Missing / Moderate Gap)
  }

  const remaining = 100 - matchPct;

  matchChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Matched Skills', 'Gap to Cover'],
      datasets: [{
        data: [matchPct, remaining],
        backgroundColor: [primaryColor, '#334155'], // Exact #334155 Slate track
        hoverBackgroundColor: [primaryColor, '#475569'],
        borderColor: ['#0F172A', '#0F172A'], // Deep Navy border
        borderWidth: 4,
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '76%',
      animation: {
        animateScale: true,
        animateRotate: true,
        duration: 800
      },
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            color: '#94A3B8', // Cool Grey
            font: { family: 'Inter', size: 12 },
            padding: 16,
            usePointStyle: true
          }
        },
        tooltip: {
          backgroundColor: '#0F172A', // Deep Navy
          titleColor: '#F8FAFC', // Soft White
          bodyColor: '#94A3B8', // Cool Grey
          borderColor: '#334155', // Dark Slate
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: function(ctx) {
              return ` ${ctx.label}: ${ctx.raw}%`;
            }
          }
        }
      }
    }
  });

  // Update center percentage display
  const centerElem = document.getElementById('chart-center-val');
  if (centerElem) {
    centerElem.textContent = `${matchPct}%`;
    centerElem.style.color = primaryColor;
  }
}

// Render Results View
function renderAnalysisResults(data) {
  currentActiveResult = data;
  const resultsContainer = document.getElementById('results-section');
  if (!resultsContainer) return;

  // Title & role info
  document.getElementById('result-job-icon').textContent = data.job_icon || '🎯';
  document.getElementById('result-job-title').textContent = data.job_title;
  document.getElementById('result-job-desc').textContent = data.job_description || '';
  
  // Stats counters
  document.getElementById('stat-match-pct').textContent = `${data.match}%`;
  document.getElementById('stat-matched-count').textContent = `${data.matched.length} / ${data.total_required}`;
  document.getElementById('stat-missing-count').textContent = `${data.missing.length}`;

  // Status Badge
  const statusBadge = document.getElementById('result-status-badge');
  if (statusBadge) {
    if (data.match >= 75) {
      statusBadge.className = 'status-pill ready';
      statusBadge.innerHTML = '✨ Placement Ready';
    } else if (data.match >= 45) {
      statusBadge.className = 'status-pill intermediate';
      statusBadge.innerHTML = '⚡ Solid Foundation';
    } else {
      statusBadge.className = 'status-pill beginner';
      statusBadge.innerHTML = '🌱 Early Career Phase';
    }
  }

  // Render Matched list
  const matchedList = document.getElementById('matched-skills-container');
  matchedList.innerHTML = '';
  if (data.matched.length === 0) {
    matchedList.innerHTML = `
      <div class="empty-state-notice">
        <span>⚠️</span>
        <p>No exact skill matches found yet for this target role. Check your spelling or try adding core foundational skills.</p>
      </div>
    `;
  } else {
    data.matched.forEach(skill => {
      const tag = document.createElement('div');
      tag.className = 'skill-tag matched';
      tag.innerHTML = `
        <span class="icon">✓</span>
        <span class="name">${formatSkillName(skill)}</span>
      `;
      matchedList.appendChild(tag);
    });
  }

  // Render Missing list
  const missingList = document.getElementById('missing-skills-container');
  missingList.innerHTML = '';
  if (data.missing.length === 0) {
    missingList.innerHTML = `
      <div class="empty-state-notice success">
        <span>🎉</span>
        <p>Congratulations! You cover 100% of the core competencies for this role!</p>
      </div>
    `;
  } else {
    data.missing.forEach(skill => {
      const tag = document.createElement('div');
      tag.className = 'skill-tag missing';
      tag.innerHTML = `
        <span class="icon">✕</span>
        <span class="name">${formatSkillName(skill)}</span>
      `;
      missingList.appendChild(tag);
    });
  }

  // Render Learning Roadmap
  renderRoadmapTimeline(data.roadmap, data.job_title);

  // Render Chart
  renderMatchChart(data.match);

  // Unhide results with smooth fade in
  resultsContainer.classList.remove('hidden');
  resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Update AI Career Advisor context
  if (window.updateAiAdvisorContext) {
    window.updateAiAdvisorContext(data);
  }
}

// Format skill slug for display
function formatSkillName(slug) {
  if (!slug) return '';
  if (RESOURCES_DATA[slug] && RESOURCES_DATA[slug].name) {
    return RESOURCES_DATA[slug].name;
  }
  return slug
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// Render Interactive Roadmap with Checkboxes
function renderRoadmapTimeline(roadmap, jobTitle) {
  const container = document.getElementById('roadmap-timeline-items');
  if (!container) return;
  container.innerHTML = '';

  if (!roadmap || roadmap.length === 0) {
    container.innerHTML = `
      <div class="roadmap-complete-card">
        <h3>🎉 Target Reached!</h3>
        <p>You have demonstrated all required skills for <strong>${jobTitle}</strong>. We recommend building a portfolio capstone project or applying for junior/intern roles now!</p>
      </div>
    `;
    return;
  }

  // Load saved checked status from localStorage
  const savedChecks = JSON.parse(localStorage.getItem('skillbridge_completed_skills') || '{}');

  roadmap.forEach((item, index) => {
    const card = document.createElement('div');
    const isChecked = !!savedChecks[item.slug];
    const priorityClass = `priority-p${item.priority}`;
    const priorityLabel = item.priority === 1 ? 'P1 Critical' : (item.priority === 2 ? 'P2 Recommended' : 'P3 Advanced');

    card.className = `roadmap-item-card ${isChecked ? 'completed' : ''}`;
    card.id = `roadmap-card-${item.slug}`;

    card.innerHTML = `
      <div class="roadmap-header">
        <div class="step-num">${index + 1}</div>
        <div class="step-meta">
          <div class="title-row">
            <h4>${item.skill}</h4>
            <span class="priority-badge ${priorityClass}">${priorityLabel}</span>
            <span class="duration-badge">⏱️ ${item.duration}</span>
          </div>
          <p class="description">${item.description}</p>
        </div>
      </div>
      <div class="roadmap-footer">
        <label class="custom-checkbox">
          <input type="checkbox" data-skill="${item.slug}" ${isChecked ? 'checked' : ''} onchange="toggleSkillCompleted('${item.slug}', this.checked)" />
          <span class="checkmark"></span>
          <span class="check-label">${isChecked ? 'Mastered ✓' : 'Mark as learned'}</span>
        </label>
        ${item.resource && item.resource !== '#' ? `
          <a href="${item.resource}" target="_blank" rel="noopener noreferrer" class="resource-link-btn">
            Free Tutorial <span>↗</span>
          </a>
        ` : ''}
      </div>
    `;
    container.appendChild(card);
  });
}

// Toggle Skill Completion in localStorage
function toggleSkillCompleted(skillSlug, isChecked) {
  const savedChecks = JSON.parse(localStorage.getItem('skillbridge_completed_skills') || '{}');
  if (isChecked) {
    savedChecks[skillSlug] = true;
  } else {
    delete savedChecks[skillSlug];
  }
  localStorage.setItem('skillbridge_completed_skills', JSON.stringify(savedChecks));

  const card = document.getElementById(`roadmap-card-${skillSlug}`);
  if (card) {
    const label = card.querySelector('.check-label');
    if (isChecked) {
      card.classList.add('completed');
      if (label) label.textContent = 'Mastered ✓';
    } else {
      card.classList.remove('completed');
      if (label) label.textContent = 'Mark as learned';
    }
  }
}

// Resume Text Auto-Extractor
function extractSkillsFromText(text) {
  if (!text || typeof text !== 'string') return [];
  const lower = text.toLowerCase();
  const detected = new Set();

  // 1. Check all canonical skills from jobs
  Object.values(JOBS_DATA).forEach(job => {
    job.skills.forEach(skill => {
      const regex = new RegExp(`\\b${escapeRegExp(skill)}\\b`, 'i');
      if (regex.test(lower)) {
        detected.add(skill);
      }
    });
  });

  // 2. Check synonyms
  Object.entries(SYNONYMS_DATA).forEach(([syn, canonical]) => {
    const regex = new RegExp(`\\b${escapeRegExp(syn)}\\b`, 'i');
    if (regex.test(lower)) {
      detected.add(canonical);
    }
  });

  // 3. Check resources
  Object.keys(RESOURCES_DATA).forEach(skill => {
    const regex = new RegExp(`\\b${escapeRegExp(skill)}\\b`, 'i');
    if (regex.test(lower)) {
      detected.add(skill);
    }
  });

  return Array.from(detected);
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Export / Print Report
function exportGapReport() {
  if (!currentActiveResult) {
    alert('Please run a gap analysis first before exporting a report!');
    return;
  }
  window.print();
}
