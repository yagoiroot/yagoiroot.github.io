// ===== Mobile Navigation Toggle =====
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });
}

// ===== Navbar Scroll Shadow =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }
});

// ===== Scroll-triggered Fade-in Animations =====
function initFadeAnimations() {
  const targets = document.querySelectorAll(
    '.project-card, .detail-card, .timeline-item, .pub-item, .contact-item'
  );

  targets.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initFadeAnimations);

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-height')) || 64;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== Contact Form Handler =====
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Validate fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      formStatus.textContent = 'Please fill in all fields.';
      formStatus.className = 'form-status error';
      return;
    }

    // Since this is a static site, construct a mailto link as fallback
    const mailtoSubject = encodeURIComponent(data.subject);
    const mailtoBody = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`
    );
    const mailtoLink = `mailto:oroot@gradcenter.cuny.edu?subject=${mailtoSubject}&body=${mailtoBody}`;

    window.location.href = mailtoLink;

    formStatus.textContent = 'Opening your email client...';
    formStatus.className = 'form-status success';

    contactForm.reset();
  });
}
