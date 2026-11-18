// SkillBridge — Main Application Controller & UI Coordinator

document.addEventListener('DOMContentLoaded', () => {
  initApplication();
});

async function initApplication() {
  populateJobSelectOptions();
  setupSampleProfileButtons();
  setupPopularSkillChips();
  setupAnalyzerForm();
  setupResumeExtractor();
  renderComparisonTable();
  setupNavigation();
  initPresentationDeck();
  initAiAdvisor();
  
  // Check backend server status
  checkBackendStatus();

  // Re-check backend periodically
  setInterval(checkBackendStatus, 15000);
}

// Populate Target Job Dropdown
function populateJobSelectOptions() {
  const select = document.getElementById('target_job');
  if (!select) return;

  select.innerHTML = '<option value="">-- Choose Your Target Role --</option>';

  Object.entries(JOBS_DATA).forEach(([id, job]) => {
    const opt = document.createElement('option');
    opt.value = id;
    opt.textContent = `${job.icon || '💼'} ${job.title} (${job.skills.length} core skills)`;
    select.appendChild(opt);
  });

  // Default select first role for immediate convenience
  select.value = 'data_analyst';
  onRoleSelectionChanged('data_analyst');

  select.addEventListener('change', (e) => {
    onRoleSelectionChanged(e.target.value);
  });
}

function onRoleSelectionChanged(roleId) {
  const job = JOBS_DATA[roleId];
  const rolePreview = document.getElementById('selected-role-preview');
  if (!rolePreview) return;

  if (job) {
    rolePreview.innerHTML = `
      <div class="role-preview-card">
        <div class="icon">${job.icon}</div>
        <div class="details">
          <h4>${job.title}</h4>
          <p>${job.description}</p>
          <div class="benchmarks-row">
            <span>Core Industry Skills:</span>
            ${job.skills.map(s => `<span class="preview-skill-pill">${formatSkillName(s)}</span>`).join('')}
          </div>
        </div>
      </div>
    `;
    rolePreview.classList.remove('hidden');
  } else {
    rolePreview.classList.add('hidden');
  }
}

// Setup Demo Sample Profiles
function setupSampleProfileButtons() {
  const container = document.getElementById('sample-profiles-container');
  if (!container) return;
  container.innerHTML = '';

  SAMPLE_PROFILES.forEach(profile => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'sample-profile-btn';
    btn.textContent = profile.label;
    btn.addEventListener('click', () => {
      const select = document.getElementById('target_job');
      const input = document.getElementById('current_skills');
      if (select) {
        select.value = profile.target;
        onRoleSelectionChanged(profile.target);
      }
      if (input) {
        input.value = profile.skills;
        input.focus();
      }
      // Auto analyze for quick demo!
      triggerAnalysis();
    });
    container.appendChild(btn);
  });
}

// Setup Popular Skill Chips for 1-Click Adding
function setupPopularSkillChips() {
  const container = document.getElementById('popular-skills-chips');
  if (!container) return;

  const popular = [
    "python", "sql", "javascript", "react", "html", "css", 
    "pandas", "excel", "git", "docker", "machine learning", "statistics"
  ];

  container.innerHTML = '';
  popular.forEach(skill => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'skill-chip';
    chip.innerHTML = `+ ${formatSkillName(skill)}`;
    chip.addEventListener('click', () => {
      addSkillToInput(skill);
    });
    container.appendChild(chip);
  });
}

function addSkillToInput(skillName) {
  const input = document.getElementById('current_skills');
  if (!input) return;

  let current = input.value.split(',').map(s => s.trim()).filter(Boolean);
  const normalized = normalizeSkill(skillName);

  if (!current.some(s => normalizeSkill(s) === normalized)) {
    current.push(skillName);
    input.value = current.join(', ');
  }
  input.focus();
}

// Setup Analyzer Form
function setupAnalyzerForm() {
  const form = document.getElementById('analyze-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await triggerAnalysis();
  });
}

async function triggerAnalysis() {
  const btn = document.getElementById('submit-analyze-btn');
  const targetJob = document.getElementById('target_job').value;
  const skillsInput = document.getElementById('current_skills').value;
  const errorBox = document.getElementById('analyzer-error-alert');

  if (errorBox) errorBox.classList.add('hidden');

  if (!targetJob) {
    showFormError('Please select a target job role.');
    return;
  }
  if (!skillsInput.trim()) {
    showFormError('Please enter at least one current technical skill.');
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner"></span> Analyzing Gap...`;
  }

  try {
    const result = await performAnalysis(targetJob, skillsInput);
    renderAnalysisResults(result);
  } catch (err) {
    showFormError(err.message || 'Error occurred during gap analysis.');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<span>⚡ Analyze My Skill Gap</span>`;
    }
  }
}

function showFormError(msg) {
  const errorBox = document.getElementById('analyzer-error-alert');
  if (errorBox) {
    errorBox.textContent = msg;
    errorBox.classList.remove('hidden');
    errorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    alert(msg);
  }
}

// Setup Resume / Bio Scanner
function setupResumeExtractor() {
  const scanBtn = document.getElementById('extract-resume-btn');
  const textarea = document.getElementById('resume-text-input');
  const modalToggle = document.getElementById('toggle-resume-scanner-btn');
  const modal = document.getElementById('resume-scanner-panel');

  if (modalToggle && modal) {
    modalToggle.addEventListener('click', () => {
      modal.classList.toggle('hidden');
      if (!modal.classList.contains('hidden') && textarea) {
        textarea.focus();
      }
    });
  }

  if (scanBtn && textarea) {
    scanBtn.addEventListener('click', () => {
      const text = textarea.value.trim();
      if (!text) {
        alert('Please paste some resume text, project summaries, or LinkedIn bio first.');
        return;
      }

      const extracted = extractSkillsFromText(text);
      if (extracted.length === 0) {
        alert('No technical skills automatically recognized. Try pasting bullet points containing tools like Python, React, SQL, etc.');
        return;
      }

      const input = document.getElementById('current_skills');
      if (input) {
        let existing = input.value.split(',').map(s => s.trim()).filter(Boolean);
        const combined = Array.from(new Set([...existing, ...extracted]));
        input.value = combined.join(', ');
      }

      alert(`Detected and extracted ${extracted.length} technical skills: ${extracted.join(', ')}!`);
      if (modal) modal.classList.add('hidden');
      textarea.value = '';
    });
  }
}

// Render Comparison Table
function renderComparisonTable() {
  const container = document.getElementById('comparison-matrix-table');
  if (!container) return;

  const features = Object.keys(COMPARISON_MATRIX[0].features);

  let theadHTML = `
    <thead>
      <tr>
        <th>Evaluation Criteria</th>
        ${COMPARISON_MATRIX.map(c => `
          <th class="${c.highlight ? 'col-highlight' : ''}">
            <div class="th-name">${c.name}</div>
            <span class="th-badge ${c.highlight ? 'badge-primary' : 'badge-subtle'}">${c.badge}</span>
          </th>
        `).join('')}
      </tr>
    </thead>
  `;

  let tbodyHTML = `
    <tbody>
      ${features.map(f => `
        <tr>
          <td class="feature-name-cell"><strong>${f}</strong></td>
          ${COMPARISON_MATRIX.map(c => `
            <td class="${c.highlight ? 'col-highlight' : ''}">
              ${c.features[f]}
            </td>
          `).join('')}
        </tr>
      `).join('')}
    </tbody>
  `;

  container.innerHTML = `<table class="comparison-table">${theadHTML}${tbodyHTML}</table>`;
}

// Setup Navigation & Smooth Scrolling
function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('main-nav-links');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      mobileToggle.classList.toggle('active');
    });

    // Close mobile nav on click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileToggle.classList.remove('active');
      });
    });
  }

  // Active link on scroll
  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // Engine Mode Toggle (Flask / Render Cloud vs Client Engine)
  const engineBadge = document.getElementById('engine-mode-badge');
  if (engineBadge) {
    engineBadge.addEventListener('click', async () => {
      const currentUrl = getApiBaseUrl();
      const choice = prompt(
        `SkillBridge Engine Settings:\n\n1. Type 'client' to force offline Client Engine\n2. Or enter your backend API URL (Localhost or Render deployment URL):\n\nCurrent API URL: ${currentUrl}`,
        currentUrl
      );

      if (choice === null) return; // Cancelled

      if (choice.trim().toLowerCase() === 'client') {
        useBackendApi = false;
        alert('Switched to Standalone Client Engine mode.');
        updateBackendBadge(false, currentUrl);
        return;
      }

      if (choice.trim()) {
        const newUrl = setApiBaseUrl(choice);
        useBackendApi = true;
        const isOnline = await checkBackendStatus();
        if (isOnline) {
          alert(`Successfully connected to Backend API at: ${newUrl}!`);
        } else {
          alert(`Notice: Could not reach ${newUrl} right now (it might still be starting or offline). Reverting to Client Engine until available.`);
          useBackendApi = false;
        }
        updateBackendBadge(useBackendApi, newUrl);
      }
    });
  }
}
