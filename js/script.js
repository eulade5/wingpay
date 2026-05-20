// ====== WingPay Group — Scripts ======

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Nav shadow on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
});

// Mobile menu
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// Counters
const counters = document.querySelectorAll('.count');
const cio = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.target;
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const tick = () => {
      cur += step;
      if (cur >= target) { el.textContent = target; return; }
      el.textContent = cur;
      requestAnimationFrame(tick);
    };
    tick();
    cio.unobserve(el);
  });
}, { threshold: 0.4 });
counters.forEach(c => cio.observe(c));

// Testimonial carousel
const slides = document.getElementById('slides');
const dotsBox = document.getElementById('dots');
const total = slides.children.length;
let idx = 0;
for (let i = 0; i < total; i++) {
  const b = document.createElement('button');
  if (i === 0) b.classList.add('active');
  b.addEventListener('click', () => go(i));
  dotsBox.appendChild(b);
}
function go(i) {
  idx = i;
  slides.style.transform = `translateX(-${i * 100}%)`;
  dotsBox.querySelectorAll('button').forEach((d, j) => d.classList.toggle('active', j === i));
}
setInterval(() => go((idx + 1) % total), 5500);

// FAQ
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => item.classList.toggle('open'));
});

// Contact form (no backend — friendly confirmation)
function handleContact(e) {
  e.preventDefault();
  const note = document.getElementById('formNote');
  note.textContent = '✓ Thanks! We will reply soon. For instant chat, use WhatsApp.';
  e.target.reset();
  return false;
}
