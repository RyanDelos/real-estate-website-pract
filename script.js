'use strict';

// //////// ELEMENTS //////////////////////
const yearEl = document.querySelector('.year');
const currentYear = new Date().getFullYear();
const btnNavEl = document.querySelector('.btn-mobile-nav');
const header = document.querySelector('.header');
const allLinks = document.querySelectorAll('a:link');
const nav = document.querySelector('nav');

///////////////////////////////////////////////////////////
// Set current year for copy right section
// console.log(currentYear);
yearEl.textContent = currentYear;

///////////////////////////////////////////////////////////////
// Make the navigation work
btnNavEl.addEventListener('click', function () {
  header.classList.toggle('nav-open');
});

///////////////////////////////////////////////////////////
// smooth scrolling animation
allLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const href = link.getAttribute('href');

    // scroll back to top
    if (href === '#')
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

    // Scroll to other links
    if (href !== '#' && href.startsWith('#')) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: 'smooth' });
    }

    // close mobile navigaion
    if (link.classList.contains('main-nav-link'))
      header.classList.toggle('nav-open');
  });
});

///////////////////////////////////////////////////////////
// menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav_link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav_link');

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

/////////////////////////////
// Sticky animation
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

/////////////////////////////
// Revealing Elements

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

/////////////////////////////
// Lazy Loading Images
const imgTargets = document.querySelectorAll('img[data-src]');

//  testing github change
