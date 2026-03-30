// ============================================================
// script.js — Salesforce Admin Prep interactive logic
// ============================================================

// ── TOPIC CARDS ─────────────────────────────────────────────
function toggleTopic(id) {
  const body = document.getElementById('body-' + id);
  const chevron = document.getElementById('chevron-' + id);
  if (!body) return;

  const isOpen = body.style.display === 'block';
  const isMobile = window.innerWidth <= 768;

  // Accordion on mobile (and always): close all others first
  document.querySelectorAll('.topic-body').forEach(b => {
    if (b !== body) b.style.display = 'none';
  });
  document.querySelectorAll('.topic-card').forEach(c => {
    if (!c.contains(body)) c.classList.remove('open');
  });

  // Toggle this one
  body.style.display = isOpen ? 'none' : 'block';
  if (chevron) {
    const card = chevron.closest('.topic-card');
    if (card) card.classList.toggle('open', !isOpen);
  }
}

function toggleNav() {
  const links = document.querySelector('.nav-links');
  const btn = document.getElementById('nav-hamburger');
  if (!links || !btn) return;
  const open = links.classList.toggle('nav-open');
  btn.classList.toggle('active', open);
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}

// Close nav when a link is clicked
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      document.querySelector('.nav-links')?.classList.remove('nav-open');
      document.getElementById('nav-hamburger')?.classList.remove('active');
    });
  });
});

// ── FLASHCARD ENGINE ─────────────────────────────────────────
let allCards = typeof FLASHCARDS !== 'undefined' ? [...FLASHCARDS] : [];
let filtered = [...allCards];
let current = 0;
let activeFilter = 'all';
let activeModule = 'all';

const FILTER_MAP = { all: null, concept: 'Concepts', mcq: 'MCQ', tricky: 'Tricky' };

const MODULE_MAP = {
  all:          null,
  config:       ['Config & Setup'],
  objmgr:       ['Object Manager', 'App Builder'],
  automation:   ['Automation'],
  data:         ['Data & Analytics'],
  security:     ['Security & Sharing', 'Security'],
  sales:        ['Sales & Marketing'],
  service:      ['Service & Support'],
  productivity: ['Productivity'],
  agentforce:   ['Agentforce'],
};

function buildCard(card) {
  const category = document.getElementById('card-category');
  const question = document.getElementById('card-question');
  const answer = document.getElementById('card-answer');
  const inner = document.getElementById('card-inner');
  const back = document.getElementById('card-back');

  if (!category || !question || !answer) return;

  // Reset flip
  if (inner) inner.classList.remove('flipped');

  // Reset back category colour (back has its own .card-category if we inject one)
  category.textContent = card.topic + ' · ' + card.category;

  // Front: question + options + images
  let html = card.question;
  if (card.options) {
    html += '<ul class="card-options">';
    card.options.forEach(opt => { html += `<li>${opt}</li>`; });
    html += '</ul>';
  }
  if (card.images && card.images.length > 0) {
    html += '<div class="card-images">';
    card.images.forEach(src => { html += `<img src="${src}" alt="" class="card-img" loading="lazy">`; });
    html += '</div>';
  }
  question.innerHTML = html;

  // Back: answer + explanation
  answer.innerHTML = `
    <div class="answer-label">${card.answer}</div>
    <div class="explanation">${card.explanation}</div>
  `;

  // Sync back category badge
  const backCat = back ? back.querySelector('.card-category') : null;
  if (backCat) backCat.textContent = card.topic;

  updateCounter();
}

function updateCounter() {
  const el = document.getElementById('card-counter');
  if (el) el.textContent = `${current + 1} / ${filtered.length}`;
}

function flipCard() {
  const inner = document.getElementById('card-inner');
  if (!inner) return;

  const flipped = inner.classList.toggle('flipped');

  // Highlight correct MCQ option on flip to answer
  if (flipped && filtered[current] && filtered[current].options) {
    const correctAnswer = filtered[current].answer;
    const lis = document.querySelectorAll('#card-front .card-options li');
    lis.forEach(li => {
      // Match by leading letter e.g. "B." or full text match
      const liText = li.textContent.trim();
      if (correctAnswer.startsWith(liText.substring(0, 2)) || liText === correctAnswer) {
        li.classList.add('correct');
      }
    });
  } else if (!flipped) {
    // Un-highlight when flipping back
    document.querySelectorAll('#card-front .card-options li.correct')
      .forEach(li => li.classList.remove('correct'));
  }
}

function nextCard() {
  if (filtered.length === 0) return;
  current = (current + 1) % filtered.length;
  buildCard(filtered[current]);
}

function prevCard() {
  if (filtered.length === 0) return;
  current = (current - 1 + filtered.length) % filtered.length;
  buildCard(filtered[current]);
}

function shuffleCards() {
  for (let i = filtered.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
  }
  current = 0;
  if (filtered.length > 0) buildCard(filtered[current]);
}

function applyFilters() {
  const catMatch  = FILTER_MAP[activeFilter];
  const modTopics = MODULE_MAP[activeModule];

  filtered = allCards.filter(c => {
    const matchCat = !catMatch  || c.category === catMatch;
    const matchMod = !modTopics || modTopics.includes(c.topic);
    return matchCat && matchMod;
  });

  current = 0;
  if (filtered.length > 0) {
    buildCard(filtered[current]);
  } else {
    const q = document.getElementById('card-question');
    if (q) q.innerHTML = 'No cards match this filter.';
    const counter = document.getElementById('card-counter');
    if (counter) counter.textContent = '0 / 0';
  }
}

function resetCards() {
  applyFilters();
}

function filterCards(category) {
  activeFilter = category;
  document.querySelectorAll('.filter-btn:not(.module-btn)').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('onclick').includes(`'${category}'`));
  });
  applyFilters();
}

function filterModule(module) {
  activeModule = module;
  document.querySelectorAll('.filter-btn.module-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('onclick').includes(`'${module}'`));
  });
  applyFilters();
}

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  allCards = typeof FLASHCARDS !== 'undefined' ? [...FLASHCARDS] : [];
  filtered = [...allCards];

  if (filtered.length > 0) {
    buildCard(filtered[0]);
  }

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    const section = document.getElementById('flashcards');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.top > window.innerHeight || rect.bottom < 0) return;

    if (e.key === 'ArrowRight') nextCard();
    else if (e.key === 'ArrowLeft') prevCard();
    else if (e.key === ' ') { e.preventDefault(); flipCard(); }
  });
});
