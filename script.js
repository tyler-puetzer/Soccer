//
// SITE FAVICON
// Replace any legacy favicon references with the site's custom icon.
//
const siteIconPath = 'media/site-icon.png';

document.querySelectorAll('link[rel~="icon"], link[rel="shortcut icon"]').forEach(link => {
  link.remove();
});

const siteIcon = document.createElement('link');
siteIcon.rel = 'icon';
siteIcon.type = 'image/png';
siteIcon.href = siteIconPath;
document.head.appendChild(siteIcon);

//
// MOBILE NAV TOGGLE
//

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // close the mobile menu after a link is tapped
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

}


//
// HERO MEDIA CAROUSEL
//

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

  currentSlide =
    (index + slides.length) % slides.length;

  slides[currentSlide].classList.add('active');
  dots[currentSlide]?.classList.add('active');
}


function nextSlide() {
  goToSlide(currentSlide + 1);
}


function prevSlide() {
  goToSlide(currentSlide - 1);
}


nextBtn?.addEventListener('click', () => {
  nextSlide();
  resetAutoplay();
});


prevBtn?.addEventListener('click', () => {
  prevSlide();
  resetAutoplay();
});


dots.forEach(dot => {

  dot.addEventListener('click', () => {

    goToSlide(
      Number(dot.dataset.index)
    );

    resetAutoplay();

  });

});


// auto-advance every 5 seconds; resets whenever the user interacts
function resetAutoplay() {

  clearInterval(autoplayTimer);

  autoplayTimer = setInterval(
    nextSlide,
    5000
  );

}


if (slides.length) {
  resetAutoplay();
}


// ======================================================================
// SCROLL REVEALS
// ======================================================================

const revealItems = document.querySelectorAll(
  '.reveal-up, .reveal-left, .reveal-right'
);


if ('IntersectionObserver' in window) {

  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          entry.target.classList.add(
            'is-visible'
          );

          observer.unobserve(
            entry.target
          );

        });

      },
      {
        root: null,
        threshold: 0.14,
        rootMargin: '0px 0px -60px 0px'
      }
    );


  revealItems.forEach(
    (element, index) => {

      if (
        !element.style.transitionDelay &&
        element.closest('.honors-grid')
      ) {

        const columnIndex =
          index % 3;

        element.style.transitionDelay =
          `${columnIndex * 0.07}s`;

      }

      revealObserver.observe(element);

    }
  );


} else {

  revealItems.forEach(
    element => {
      element.classList.add(
        'is-visible'
      );
    }
  );

}


//
// FOOTER YEAR
//

const yearEl =
  document.getElementById('year');

if (yearEl) {
  yearEl.textContent =
    new Date().getFullYear();
}
