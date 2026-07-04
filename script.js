// ======================================================================
// MOBILE NAV TOGGLE
// Opens/closes the nav-links list when the hamburger icon is tapped.
// ======================================================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // close the mobile menu after a link is tapped
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ======================================================================
// HERO MEDIA CAROUSEL
// EDIT ME: this just toggles which .slide has the "active" class.
// Add more slides in index.html (copy a .slide block + a .dot button)
// and this code will pick them up automatically.
// ======================================================================
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentSlide = 0;
let autoplayTimer;

function goToSlide(index) {
  if (!slides.length) return;
  slides[currentSlide].classList.remove('active');
  dots[currentSlide]?.classList.remove('active');

  currentSlide = (index + slides.length) % slides.length;

  slides[currentSlide].classList.add('active');
  dots[currentSlide]?.classList.add('active');
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

nextBtn?.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
prevBtn?.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    goToSlide(Number(dot.dataset.index));
    resetAutoplay();
  });
});

// auto-advance every 5 seconds; resets whenever the user interacts
function resetAutoplay() {
  clearInterval(autoplayTimer);
  autoplayTimer = setInterval(nextSlide, 5000);
}
resetAutoplay();

// ======================================================================
// FOOTER YEAR
// Keeps the copyright year current without hardcoding it.
// ======================================================================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
