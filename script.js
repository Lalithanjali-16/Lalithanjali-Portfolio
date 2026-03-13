// ============ NAVBAR SCROLL ============
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ============ HAMBURGER MENU ============
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ============ TYPED TEXT ============
const phrases = [
  'Full Stack Engineer',
  'AI/ML Engineer',
  'MERN Developer',
  'RAG Systems Builder',
  'Open Source Enthusiast'
];
let phraseIndex = 0, charIndex = 0, deleting = false;
const typedEl = document.getElementById('typed');

function typeLoop() {
  const current = phrases[phraseIndex];
  if (!deleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 60 : 100);
}
typeLoop();

// ============ PARTICLES ============
const particleContainer = document.getElementById('particles');
const numParticles = 35;
const colors = ['#8b5cf6', '#a78bfa', '#06b6d4', '#ec4899', '#c4b5fd'];

for (let i = 0; i < numParticles; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  const size = Math.random() * 3 + 2;
  p.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${Math.random() * 100}%;
    bottom: ${Math.random() * 30}%;
    background: ${colors[Math.floor(Math.random() * colors.length)]};
    --dur: ${Math.random() * 10 + 8}s;
    --delay-p: ${Math.random() * 10}s;
    --dx: ${(Math.random() - 0.5) * 120}px;
    opacity: 0;
    border-radius: 50%;
  `;
  particleContainer.appendChild(p);
}

// ============ SCROLL REVEAL ============
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${(Array.from(entry.target.parentElement.children).indexOf(entry.target)) * 0.1}s`;
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ============ ACTIVE NAV LINK ============
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.45 });

sections.forEach(s => sectionObserver.observe(s));

// Active link style
const style = document.createElement('style');
style.textContent = `.nav-link.active { color: var(--primary-light) !important; background: rgba(139,92,246,0.1) !important; }`;
document.head.appendChild(style);

// ============ PROJECT CARD TILT ============
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-5px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ============ CONTACT FORM ============
// Netlify handles the form submission automatically, no custom JS needed here.
// ============ SMOOTH COUNTER ANIMATION ============
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const duration = 1500;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Number.isInteger(target)
      ? Math.floor(current) + suffix
      : current.toFixed(2) + suffix;
    if (current >= target) clearInterval(timer);
  }, 16);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statsNumbers = entry.target.querySelectorAll('.stat-num');
      const targets = [4, 9.27, 477];
      const suffixes = ['+', '', ''];
      statsNumbers.forEach((el, i) => {
        if (el.dataset.animated) return;
        el.dataset.animated = true;
        if (i === 2) {
          el.textContent = 'AIR';
          return;
        }
        animateCounter(el, targets[i], suffixes[i]);
      });
      statObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsGroup = document.querySelector('.about-stats');
if (statsGroup) statObserver.observe(statsGroup);
