// SkillBridge — Interactive AI Career Advisor Module

let activeAnalysisContext = null;

function initAiAdvisor() {
  const sendBtn = document.getElementById('ai-send-btn');
  const input = document.getElementById('ai-input-field');

  if (sendBtn && input) {
    sendBtn.addEventListener('click', handleAiSubmit);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAiSubmit();
      }
    });
  }

  // Pre-canned quick prompt chips
  document.querySelectorAll('.ai-quick-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt');
      if (prompt) {
        document.getElementById('ai-input-field').value = prompt;
        handleAiSubmit();
      }
    });
  });
}

function updateAiAdvisorContext(data) {
  activeAnalysisContext = data;
  const badge = document.getElementById('ai-context-indicator');
  if (badge) {
    badge.innerHTML = `Connected: <strong>${data.job_title}</strong> (${data.match}% Match)`;
    badge.classList.remove('hidden');
  }

  // Add contextual greeting in chat if first time
  const messagesBox = document.getElementById('ai-chat-messages');
  if (messagesBox && !messagesBox.getAttribute('data-context-greeted')) {
    messagesBox.setAttribute('data-context-greeted', 'true');
    appendAiMessage(`I noticed you analyzed your profile for **${data.job_title}**! You've matched **${data.matched.length}** skills with a **${data.match}%** match score. Ask me anything about prioritizing your **${data.missing.length} missing skills**, project ideas, or timeline planning!`);
  }
}

function handleAiSubmit() {
  const input = document.getElementById('ai-input-field');
  const userText = input.value.trim();
  if (!userText) return;

  // Append user message
  appendUserMessage(userText);
  input.value = '';

  // Show typing indicator
  showAiTypingIndicator();

  // Generate intelligent contextual response
  setTimeout(() => {
    removeAiTypingIndicator();
    const reply = generateAiCareerAdvice(userText, activeAnalysisContext);
    appendAiMessage(reply);
  }, 600);
}

function appendUserMessage(text) {
  const container = document.getElementById('ai-chat-messages');
  if (!container) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-bubble user-bubble';
  msgDiv.innerHTML = `
    <div class="bubble-text">${escapeHtml(text)}</div>
    <span class="bubble-time">${getCurrentTimeString()}</span>
  `;
  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
}

function appendAiMessage(textMarkdown) {
  const container = document.getElementById('ai-chat-messages');
  if (!container) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-bubble ai-bubble';
  msgDiv.innerHTML = `
    <div class="ai-avatar">🤖</div>
    <div class="bubble-content">
      <div class="bubble-text">${formatMarkdownText(textMarkdown)}</div>
      <span class="bubble-time">SkillBridge AI • ${getCurrentTimeString()}</span>
    </div>
  `;
  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
}

function showAiTypingIndicator() {
  const container = document.getElementById('ai-chat-messages');
  if (!container) return;

  const typingDiv = document.createElement('div');
  typingDiv.className = 'chat-bubble ai-bubble typing-indicator-bubble';
  typingDiv.id = 'ai-typing-loader';
  typingDiv.innerHTML = `
    <div class="ai-avatar">🤖</div>
    <div class="typing-dots">
      <span></span><span></span><span></span>
    </div>
  `;
  container.appendChild(typingDiv);
  container.scrollTop = container.scrollHeight;
}

function removeAiTypingIndicator() {
  const typing = document.getElementById('ai-typing-loader');
  if (typing) typing.remove();
}

function generateAiCareerAdvice(prompt, context) {
  const lower = prompt.toLowerCase();
  const jobTitle = context ? context.job_title : "your target job role";
  const missing = context ? context.missing : ["core skills"];
  const matched = context ? context.matched : ["fundamentals"];
  const p1Missing = context
    ? context.roadmap.filter(r => r.priority === 1).map(r => r.skill)
    : [];

  // 1. Missing skills priority query
  if (lower.includes('which skill') || lower.includes('first') || lower.includes('tackle') || lower.includes('priority')) {
    if (p1Missing.length > 0) {
      return `For **${jobTitle}**, your top priority (P1) should definitely be **${p1Missing.join(' and ')}**. These are non-negotiable fundamentals that interviewers filter for in technical screening rounds. Master these before moving to secondary tooling.`;
    } else if (missing.length > 0) {
      return `Great news: you've already covered the critical P1 fundamentals! Focus next on **${missing.slice(0, 2).join(', ')}** (Priority 2) which will set your portfolio apart from other applicants.`;
    } else {
      return `You already match all core skills for **${jobTitle}**! Start focusing on end-to-end portfolio projects and mock interviews.`;
    }
  }

  // 2. Timeline and study hours
  if (lower.includes('how long') || lower.includes('weeks') || lower.includes('hours') || lower.includes('time')) {
    const totalMissing = missing.length;
    const estWeeks = totalMissing === 0 ? 1 : Math.max(2, Math.min(12, totalMissing * 2));
    return `Based on your **${totalMissing} missing skills**, studying 8–10 hours per week:
- **Estimated Prep Time**: ~**${estWeeks} weeks** to reach industry-readiness.
- **Weekly Strategy**: Dedicate 60% of time to hands-on coding exercises and 40% to theory and tutorials. Check off items in the roadmap above as you complete them!`;
  }

  // 3. Project ideas
  if (lower.includes('project') || lower.includes('portfolio') || lower.includes('build')) {
    if (lower.includes('data') || jobTitle.toLowerCase().includes('data')) {
      return `Here are two standout portfolio projects for a **Data Analyst**:
1. **End-to-End E-Commerce Sales Dashboard**: Use Python/Pandas to clean 100K+ transaction records, SQL to query KPIs, and Power BI or Tableau to build an executive reporting deck.
2. **Customer Churn Analysis**: Explore statistical distributions, identify high-risk segments, and present actionable business retention recommendations.`;
    } else if (lower.includes('machine learning') || jobTitle.toLowerCase().includes('learning')) {
      return `For a **Machine Learning Engineer** portfolio:
1. **End-to-End Predictive API**: Train a Scikit-Learn or PyTorch regression model on Kaggle data, package it into a Flask/FastAPI microservice, and containerize with Docker.
2. **Computer Vision or NLP Pipeline**: Fine-tune a lightweight Transformer model and document performance benchmarks.`;
    } else {
      return `For a **${jobTitle}** portfolio, recruiters love full-lifecycle projects:
1. **Live Production Web Application**: Deploy a responsive front-end integrated with a REST API backend and PostgreSQL database.
2. **Automated CI/CD Deployment**: Include a GitHub Actions workflow, Dockerfile, and clear README documentation showing architectural diagrams.`;
    }
  }

  // 4. Interview preparation
  if (lower.includes('interview') || lower.includes('questions') || lower.includes('exam')) {
    return `For technical rounds in **${jobTitle}**:
1. **Core Concept Tests**: Be prepared to explain fundamentals of ${matched.slice(0, 3).join(', ')}.
2. **Live Problem Solving**: Practice whiteboard algorithmic challenges and database query optimization.
3. **STAR Method Behavioral**: Structure your project stories using *Situation, Task, Action, Result* to showcase problem-solving ability.`;
  }

  // 5. Default smart response
  return `Regarding **"${prompt}"** for **${jobTitle}**:
Focus on combining structured concept learning with immediate project implementation. You currently have a **${context ? context.match : '50'}% match**. Every skill you master from your missing list moves you closer to interview readiness! Would you like specific tutorial recommendations or capstone project templates?`;
}

function formatMarkdownText(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
}

function getCurrentTimeString() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, m => map[m]);
}
