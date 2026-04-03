// Global Site Logic

document.addEventListener('DOMContentLoaded', () => {

  // 1. Remove Loader
  const loader = document.getElementById('global-loader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 500);
    }, 500);
  }

  // 2. Mobile Menu Toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // 3. Sticky Navbar & Back to Top Button
  const navbar = document.getElementById('navbar');
  const backTopBtn = document.getElementById('back-top-btn');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      if (navbar) {
        navbar.style.padding = '0';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
      }
      if (backTopBtn) backTopBtn.style.display = 'flex';
    } else {
      if (navbar) {
        navbar.style.padding = '0';
        navbar.style.boxShadow = 'none';
      }
      if (backTopBtn) backTopBtn.style.display = 'none';
    }
    
    // Scroll Reveal active class toggle
    reveal();
  });

  // 4. Scroll Reveal Animation Logic
  const revealElements = document.querySelectorAll('.reveal');
  function reveal() {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;
    
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        el.classList.add('active');
      }
    });
  }
  
  // Trigger reveal on load
  reveal();
  
  // 5. FAQ Accordion Logic
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        // close others
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('active');
        });
        item.classList.toggle('active');
      });
    }
  });

  // 6. Global Appearance & Themes Engine
  function applyAppearance() {
    const storedAppearance = localStorage.getItem('provolt_appearance');
    if (!storedAppearance) return;

    const appearance = JSON.parse(storedAppearance);
    
    // Remove existing theme overlays to avoid duplication
    const existingOverlays = document.querySelectorAll('.theme-overlay');
    existingOverlays.forEach(el => el.remove());

    // Apply Custom Brand Colors
    if (appearance.colorPrimary) document.documentElement.style.setProperty('--clr-primary', appearance.colorPrimary);
    if (appearance.colorDominant) document.documentElement.style.setProperty('--clr-dominant', appearance.colorDominant);
    if (appearance.colorSurface) document.documentElement.style.setProperty('--clr-surface', appearance.colorSurface);



    // Staff Image Injector
    const staff1 = document.getElementById('staff-img-1');
    const staff2 = document.getElementById('staff-img-2');
    const staff3 = document.getElementById('staff-img-3');
    if (staff1 && appearance.staff1) { staff1.src = appearance.staff1; staff1.style.display = 'block'; }
    if (staff2 && appearance.staff2) { staff2.src = appearance.staff2; staff2.style.display = 'block'; }
    if (staff3 && appearance.staff3) { staff3.src = appearance.staff3; staff3.style.display = 'block'; }
  }

  // Initial Load
  applyAppearance();

  // Listen for changes from other tabs (Admin Panel)
  window.addEventListener('storage', (e) => {
    if (e.key === 'provolt_appearance') {
      applyAppearance();
    }
  });

});

