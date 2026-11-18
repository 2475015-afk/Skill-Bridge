// SkillBridge — Interactive Presentation Deck Controller (16 Slides)

let currentSlideIdx = 0;
let isNotesVisible = false;

function initPresentationDeck() {
  const container = document.getElementById('slides-render-container');
  const thumbsContainer = document.getElementById('slide-thumbnails-grid');
  if (!container) return;

  container.innerHTML = '';
  if (thumbsContainer) thumbsContainer.innerHTML = '';

  PRESENTATION_SLIDES.forEach((slide, idx) => {
    // 1. Create main slide DOM
    const slideElem = document.createElement('div');
    slideElem.className = `presentation-slide ${idx === 0 ? 'active' : ''}`;
    slideElem.id = `slide-deck-item-${idx}`;
    slideElem.innerHTML = renderSlideHTML(slide);
    container.appendChild(slideElem);

    // 2. Create thumbnail entry
    if (thumbsContainer) {
      const thumb = document.createElement('button');
      thumb.className = `thumb-btn ${idx === 0 ? 'active' : ''}`;
      thumb.id = `slide-thumb-${idx}`;
      thumb.innerHTML = `
        <span class="thumb-num">#${slide.number}</span>
        <span class="thumb-title">${slide.title}</span>
      `;
      thumb.addEventListener('click', () => {
        jumpToSlide(idx);
        toggleThumbnailsDrawer(false);
      });
      thumbsContainer.appendChild(thumb);
    }
  });

  updateSlideMeta();

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const deckSection = document.getElementById('presentation');
    if (!deckSection) return;
    
    // Only capture if presentation is currently in view or fullscreen
    const rect = deckSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    const isFullscreen = !!document.fullscreenElement;

    if (isVisible || isFullscreen) {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || (e.key === ' ' && !e.target.matches('input, textarea, select'))) {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        jumpToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        jumpToSlide(PRESENTATION_SLIDES.length - 1);
      } else if (e.key === 'n' || e.key === 'N') {
        toggleSpeakerNotes();
      }
    }
  });
}

function renderSlideHTML(slide) {
  let bodyHTML = '';

  switch (slide.type) {
    case 'title':
      bodyHTML = `
        <div class="slide-title-layout">
          <div class="title-badge-pill">${slide.badge || 'Capstone Project'}</div>
          <h1 class="main-slide-heading">${slide.title}</h1>
          <p class="main-slide-sub">${slide.subtitle}</p>
          <p class="main-slide-tagline">${slide.content?.tagline || ''}</p>
          
          <div class="title-meta-grid">
            ${(slide.content?.meta || []).map(m => `
              <div class="meta-card">
                <span class="meta-lbl">${m.label}</span>
                <span class="meta-val">${m.val}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      break;

    case 'bullets':
      bodyHTML = `
        <div class="slide-header">
          <span class="slide-badge">${slide.badge}</span>
          <h2>${slide.title}</h2>
          <p class="slide-sub">${slide.subtitle}</p>
        </div>
        <div class="bullet-cards-grid">
          ${(slide.items || []).map((item, i) => `
            <div class="bullet-card">
              <div class="bullet-number">0${i + 1}</div>
              <div class="bullet-text">
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      `;
      break;

    case 'quote':
      bodyHTML = `
        <div class="slide-header">
          <span class="slide-badge">${slide.badge}</span>
          <h2>${slide.title}</h2>
          <p class="slide-sub">${slide.subtitle}</p>
        </div>
        <div class="quote-display-box">
          <span class="quote-mark">“</span>
          <blockquote class="quote-text">${slide.quote}</blockquote>
          <div class="quote-author">— ${slide.attribution}</div>
        </div>
      `;
      break;

    case 'features':
      bodyHTML = `
        <div class="slide-header">
          <span class="slide-badge">${slide.badge}</span>
          <h2>${slide.title}</h2>
          <p class="slide-sub">${slide.subtitle}</p>
        </div>
        <div class="features-cards-grid">
          ${(slide.items || []).map(item => `
            <div class="feature-card">
              <div class="feature-icon">${item.icon}</div>
              <h3>${item.title}</h3>
              <p>${item.desc}</p>
            </div>
          `).join('')}
        </div>
      `;
      break;

    case 'table':
      bodyHTML = `
        <div class="slide-header">
          <span class="slide-badge">${slide.badge}</span>
          <h2>${slide.title}</h2>
          <p class="slide-sub">${slide.subtitle}</p>
        </div>
        <div class="table-responsive-wrapper">
          <table class="presentation-table">
            <thead>
              <tr>
                ${(slide.table?.headers || []).map(h => `<th>${h}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${(slide.table?.rows || []).map(row => `
                <tr>
                  ${row.map((cell, cidx) => `<td class="${cidx === 0 ? 'primary-cell' : ''}">${cell}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      break;

    case 'stack':
      bodyHTML = `
        <div class="slide-header">
          <span class="slide-badge">${slide.badge}</span>
          <h2>${slide.title}</h2>
          <p class="slide-sub">${slide.subtitle}</p>
        </div>
        <div class="stack-categories-grid">
          ${(slide.stack || []).map(cat => `
            <div class="stack-category-card">
              <h3>${cat.category}</h3>
              <ul class="tech-pill-list">
                ${cat.techs.map(t => `<li><span class="dot">•</span> ${t}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      `;
      break;

    case 'architecture':
      bodyHTML = `
        <div class="slide-header">
          <span class="slide-badge">${slide.badge}</span>
          <h2>${slide.title}</h2>
          <p class="slide-sub">${slide.subtitle}</p>
        </div>
        <div class="architecture-steps-flow">
          ${(slide.steps || []).map((st, i) => `
            <div class="arch-step-node">
              <div class="step-circle">${i + 1}</div>
              <div class="step-info">
                <h4>${st.step}</h4>
                <p>${st.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      `;
      break;

    case 'modules':
      bodyHTML = `
        <div class="slide-header">
          <span class="slide-badge">${slide.badge}</span>
          <h2>${slide.title}</h2>
          <p class="slide-sub">${slide.subtitle}</p>
        </div>
        <div class="modules-cards-grid">
          ${(slide.modules || []).map(m => `
            <div class="module-card">
              <div class="mod-code-pill">${m.code}</div>
              <h3>${m.name}</h3>
              <p>${m.desc}</p>
            </div>
          `).join('')}
        </div>
      `;
      break;

    case 'timeline':
      bodyHTML = `
        <div class="slide-header">
          <span class="slide-badge">${slide.badge}</span>
          <h2>${slide.title}</h2>
          <p class="slide-sub">${slide.subtitle}</p>
        </div>
        <div class="timeline-sprint-list">
          ${(slide.weeks || []).map(w => `
            <div class="timeline-row-card">
              <div class="timeline-week-badge">${w.weeks}</div>
              <div class="timeline-content">
                <h4>${w.phase}</h4>
                <p>${w.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      `;
      break;

    default:
      bodyHTML = `<div>${slide.title}</div>`;
  }

  return `
    <div class="slide-inner-content">
      ${bodyHTML}
      <div class="slide-footer-branding">
        <span>🌉 SkillBridge Project Deck</span>
        <span>Slide ${slide.number} of ${PRESENTATION_SLIDES.length}</span>
      </div>
    </div>
  `;
}

function showSlide(index) {
  const slides = document.querySelectorAll('.presentation-slide');
  const thumbs = document.querySelectorAll('.thumb-btn');
  if (slides.length === 0) return;

  slides.forEach(s => s.classList.remove('active'));
  thumbs.forEach(t => t.classList.remove('active'));

  currentSlideIdx = (index + slides.length) % slides.length;

  slides[currentSlideIdx].classList.add('active');
  const activeThumb = document.getElementById(`slide-thumb-${currentSlideIdx}`);
  if (activeThumb) activeThumb.classList.add('active');

  updateSlideMeta();
}

function nextSlide() {
  showSlide(currentSlideIdx + 1);
}

function prevSlide() {
  showSlide(currentSlideIdx - 1);
}

function jumpToSlide(idx) {
  showSlide(idx);
}

function updateSlideMeta() {
  const currentSlide = PRESENTATION_SLIDES[currentSlideIdx];
  if (!currentSlide) return;

  // Counter
  const counterElem = document.getElementById('slide-counter-display');
  if (counterElem) {
    counterElem.textContent = `${currentSlideIdx + 1} / ${PRESENTATION_SLIDES.length}`;
  }

  // Progress Bar
  const progressBar = document.getElementById('deck-progress-fill');
  if (progressBar) {
    const pct = ((currentSlideIdx + 1) / PRESENTATION_SLIDES.length) * 100;
    progressBar.style.width = `${pct}%`;
  }

  // Speaker notes
  const notesContent = document.getElementById('speaker-notes-content');
  if (notesContent) {
    notesContent.textContent = currentSlide.notes || "No notes for this slide.";
  }
}

function toggleSpeakerNotes() {
  isNotesVisible = !isNotesVisible;
  const notesPanel = document.getElementById('speaker-notes-panel');
  const notesBtn = document.getElementById('toggle-notes-btn');
  if (!notesPanel) return;

  if (isNotesVisible) {
    notesPanel.classList.remove('hidden');
    if (notesBtn) notesBtn.classList.add('active');
  } else {
    notesPanel.classList.add('hidden');
    if (notesBtn) notesBtn.classList.remove('active');
  }
}

function toggleThumbnailsDrawer(forceState) {
  const drawer = document.getElementById('slide-thumbnails-drawer');
  if (!drawer) return;
  if (typeof forceState === 'boolean') {
    if (forceState) drawer.classList.remove('hidden');
    else drawer.classList.add('hidden');
  } else {
    drawer.classList.toggle('hidden');
  }
}

function toggleFullscreenDeck() {
  const deckWrapper = document.getElementById('presentation-deck-wrapper');
  if (!deckWrapper) return;

  if (!document.fullscreenElement) {
    deckWrapper.requestFullscreen().catch(err => {
      console.warn('Fullscreen request denied:', err);
    });
    deckWrapper.classList.add('fullscreen-mode');
  } else {
    document.exitFullscreen();
    deckWrapper.classList.remove('fullscreen-mode');
  }
}

document.addEventListener('fullscreenchange', () => {
  const deckWrapper = document.getElementById('presentation-deck-wrapper');
  if (deckWrapper && !document.fullscreenElement) {
    deckWrapper.classList.remove('fullscreen-mode');
  }
});
