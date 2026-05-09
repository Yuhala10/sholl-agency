/* ═══════════════════════════════════════════════════════════════
   SHOLL AGENCY YIWU — script.js
   Ultra-smooth interactions, animations & functionality
═══════════════════════════════════════════════════════════════ */

'use strict';

// ─────────────────────────────────────────────
// 1. PRELOADER
// ─────────────────────────────────────────────
(function initPreloader() {
  const fill = document.querySelector('.pre-fill');
  const text = document.getElementById('preText');
  const loader = document.getElementById('preloader');
  const messages = ['Loading…', 'Connecting to China…', 'Almost ready…', 'Welcome!'];
  let progress = 0;
  let msgIdx = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 18 + 4;
    if (progress > 100) progress = 100;
    fill.style.width = progress + '%';
    msgIdx = Math.floor((progress / 100) * (messages.length - 1));
    text.textContent = messages[msgIdx];

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('done');
        document.body.style.overflow = '';
        initCounters();
      }, 400);
    }
  }, 80);

  document.body.style.overflow = 'hidden';
})();


// ─────────────────────────────────────────────
// 2. CUSTOM CURSOR
// ─────────────────────────────────────────────
(function initCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left  = mouseX + 'px';
    dot.style.top   = mouseY + 'px';
  });

  // ring lags behind for smoothness
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // scale dot on click
  document.addEventListener('mousedown', () => {
    dot.style.transform  = 'translate(-50%,-50%) scale(2)';
    ring.style.transform = 'translate(-50%,-50%) scale(0.7)';
  });
  document.addEventListener('mouseup', () => {
    dot.style.transform  = 'translate(-50%,-50%) scale(1)';
    ring.style.transform = 'translate(-50%,-50%) scale(1)';
  });

  // cursor on links / buttons
  document.querySelectorAll('a, button, .magnetic, select, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.transform  = 'translate(-50%,-50%) scale(0)';
      ring.style.width     = '58px';
      ring.style.height    = '58px';
      ring.style.borderColor = 'var(--gold)';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.transform  = 'translate(-50%,-50%) scale(1)';
      ring.style.width     = '36px';
      ring.style.height    = '36px';
      ring.style.borderColor = 'rgba(204,0,0,0.5)';
    });
  });
})();


// ─────────────────────────────────────────────
// 3. NAVBAR — scroll effect & active link
// ─────────────────────────────────────────────
(function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const backTop  = document.getElementById('backTop');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 50);
    backTop.classList.toggle('show', y > 400);
  }, { passive: true });

  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        closeNav();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
})();


// ─────────────────────────────────────────────
// 4. HAMBURGER / MOBILE NAV
// ─────────────────────────────────────────────
let mobileNavOpen = false;

function toggleNav() {
  mobileNavOpen = !mobileNavOpen;
  document.getElementById('hamburger').classList.toggle('open', mobileNavOpen);

  let mobileNav = document.querySelector('.mobile-nav');
  if (!mobileNav) {
    mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    const links = [
      ['#home','Home','Accueil'],
      ['#services','Services','Services'],
      ['#how','How It Works','Comment ça marche'],
      ['#testimonials','Testimonials','Témoignages'],
      ['#gallery','Gallery','Galerie'],
      ['#contact','Contact','Contact'],
      ['#order','Order Now','Commander']
    ];
    links.forEach(([href, en, fr]) => {
      const a = document.createElement('a');
      a.href = href;
      a.setAttribute('data-en', en);
      a.setAttribute('data-fr', fr);
      a.textContent = currentLang === 'fr' ? fr : en;
      mobileNav.appendChild(a);
    });
    document.body.appendChild(mobileNav);
    applyLang(); // ensure translations on first open
  }
  mobileNav.classList.toggle('open', mobileNavOpen);
  document.body.style.overflow = mobileNavOpen ? 'hidden' : '';
}

function closeNav() {
  mobileNavOpen = false;
  document.getElementById('hamburger').classList.remove('open');
  const mn = document.querySelector('.mobile-nav');
  if (mn) mn.classList.remove('open');
  document.body.style.overflow = '';
}


// ─────────────────────────────────────────────
// 5. PARTICLES IN HERO
// ─────────────────────────────────────────────
(function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = window.innerWidth < 768 ? 20 : 50;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1;
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * 10}s;
      background: ${Math.random() > 0.5 ? 'var(--gold)' : 'rgba(204,0,0,0.6)'};
    `;
    container.appendChild(p);
  }
})();


// ─────────────────────────────────────────────
// 6. SCROLL REVEAL (IntersectionObserver)
// ─────────────────────────────────────────────
(function initReveal() {
  const opts = { threshold: 0.1, rootMargin: '0px 0px -60px 0px' };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseFloat(el.style.animationDelay || el.style.transitionDelay || 0) * 1000;
        setTimeout(() => {
          el.classList.add('visible');
          el.style.animationPlayState = 'running';
        }, delay);
        observer.unobserve(el);
      }
    });
  }, opts);

  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
})();


// ─────────────────────────────────────────────
// 7. COUNTER ANIMATION (hero stats)
// ─────────────────────────────────────────────
function initCounters() {
  document.querySelectorAll('.hstat-num').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2200;
    const start = performance.now();
    const suffix = target >= 1000 ? '+' : '+';

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(eased * target);
      el.textContent = current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}


// ─────────────────────────────────────────────
// 8. MAGNETIC BUTTON EFFECT
// ─────────────────────────────────────────────
(function initMagnetic() {
  if (window.innerWidth < 768) return; // disable on mobile

  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.35;
      const dy = (e.clientY - cy) * 0.35;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();


// ─────────────────────────────────────────────
// 9. LANGUAGE TOGGLE (EN / FR)
// ─────────────────────────────────────────────
let currentLang = localStorage.getItem('lang') || 'en';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.toLowerCase() === lang);
  });
  applyLang();
}

function applyLang() {
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute(`data-${currentLang}`) || el.getAttribute('data-en');
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      // do nothing — handled below
    } else if (el.tagName === 'OPTION') {
      el.textContent = text;
    } else {
      el.textContent = text;
    }
  });

  // placeholders
  document.querySelectorAll('[data-placeholder-en]').forEach(el => {
    el.placeholder = el.getAttribute(`data-placeholder-${currentLang}`) || el.getAttribute('data-placeholder-en');
  });

  // select options
  document.querySelectorAll('select option[data-en]').forEach(opt => {
    opt.textContent = opt.getAttribute(`data-${currentLang}`) || opt.getAttribute('data-en');
  });
}

// Init language on load
document.addEventListener('DOMContentLoaded', () => {
  setLang(currentLang);
});


// ─────────────────────────────────────────────
// 10. TRACKING INPUT
// ─────────────────────────────────────────────
function trackPackage() {
  const input = document.getElementById('trackInput');
  const val = input ? input.value.trim() : '';

  if (!val) {
    shakeElement(input);
    showToast(currentLang === 'fr' ? 'Veuillez entrer un numéro de suivi.' : 'Please enter a tracking number.', 'error');
    return;
  }

  const msg = encodeURIComponent(
    currentLang === 'fr'
      ? `Bonjour, je souhaite suivre mon colis. Numéro de suivi: ${val}`
      : `Hello, I'd like to track my package. Tracking number: ${val}`
  );
  window.open(`https://wa.me/8619560125426?text=${msg}`, '_blank');
}


// ─────────────────────────────────────────────
// 11. ORDER FORM SUBMISSION
// ─────────────────────────────────────────────
function submitForm(e) {
  e.preventDefault();

  const fname   = document.getElementById('fname').value.trim();
  const country = document.getElementById('country').value.trim();
  const waNum   = document.getElementById('waNum').value.trim();
  const service = document.getElementById('service').value;
  const details = document.getElementById('details').value.trim();
  const budget  = document.getElementById('budget').value.trim();
  const email   = document.getElementById('email').value.trim();

  if (!fname || !country || !waNum || !service || !details) {
    showToast(
      currentLang === 'fr'
        ? 'Veuillez remplir tous les champs obligatoires.'
        : 'Please fill in all required fields.',
      'error'
    );
    return;
  }

  const message = currentLang === 'fr'
    ? `🌟 Nouvelle demande - Sholl Agency Yiwu

👤 Nom: ${fname}
🌍 Pays: ${country}
📱 WhatsApp: ${waNum}
📧 Email: ${email || 'Non fourni'}
📋 Service: ${service}
📝 Détails: ${details}
💰 Budget: ${budget || 'Non spécifié'}

Envoyé depuis shollagencyyiwu.vercel.app`
    : `🌟 New Request - Sholl Agency Yiwu

👤 Name: ${fname}
🌍 Country: ${country}
📱 WhatsApp: ${waNum}
📧 Email: ${email || 'Not provided'}
📋 Service: ${service}
📝 Details: ${details}
💰 Budget: ${budget || 'Not specified'}

Sent from shollagencyyiwu.vercel.app`;

  window.open(`https://wa.me/8619560125426?text=${encodeURIComponent(message)}`, '_blank');

  showToast(
    currentLang === 'fr'
      ? '✅ Redirection vers WhatsApp…'
      : '✅ Redirecting to WhatsApp…',
    'success'
  );

  setTimeout(() => {
    document.getElementById('orderForm').reset();
  }, 1000);
}


// ─────────────────────────────────────────────
// 12. TOAST NOTIFICATION
// ─────────────────────────────────────────────
function showToast(message, type = 'success') {
  // remove existing toast
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed; bottom: 100px; left: 50%; z-index: 9999;
    transform: translateX(-50%) translateY(20px);
    background: ${type === 'success' ? '#1a8c4e' : '#cc0000'};
    color: white; padding: 14px 28px;
    border-radius: 50px; font-size: 0.92rem; font-weight: 600;
    font-family: 'Outfit', sans-serif;
    box-shadow: 0 8px 30px rgba(0,0,0,0.25);
    opacity: 0; transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1);
    pointer-events: none;
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.opacity  = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
  });

  setTimeout(() => {
    toast.style.opacity   = '0';
    toast.style.transform = 'translateX(-50%) translateY(-10px)';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}


// ─────────────────────────────────────────────
// 13. SHAKE ANIMATION (form validation)
// ─────────────────────────────────────────────
function shakeElement(el) {
  if (!el) return;
  el.style.animation = 'none';
  el.style.borderColor = 'var(--red)';
  el.style.boxShadow = '0 0 0 4px rgba(204,0,0,0.15)';

  const keyframes = [
    { transform: 'translateX(0)' },
    { transform: 'translateX(-8px)' },
    { transform: 'translateX(8px)' },
    { transform: 'translateX(-6px)' },
    { transform: 'translateX(6px)' },
    { transform: 'translateX(0)' }
  ];
  el.animate(keyframes, { duration: 400, easing: 'ease-in-out' });
  setTimeout(() => {
    el.style.borderColor = '';
    el.style.boxShadow = '';
  }, 2000);
}


// ─────────────────────────────────────────────
// 14. PARALLAX ON HERO (subtle)
// ─────────────────────────────────────────────
(function initParallax() {
  const hero = document.querySelector('.hero');
  const skyline = document.querySelector('.skyline-silhouette');
  if (!hero || !skyline || window.innerWidth < 768) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      skyline.style.transform = `translateY(${y * 0.3}px)`;
    }
  }, { passive: true });
})();


// ─────────────────────────────────────────────
// 15. TYPING EFFECT ON HERO TAGLINE
// ─────────────────────────────────────────────
(function initTyping() {
  const sub = document.querySelector('.hero-sub');
  if (!sub) return;

  const textEN = 'Visas · Sourcing · Shipping · Currency · Tracking — handled with speed, discretion and full professionalism.';
  const textFR = 'Visas · Sourcing · Expédition · Devises · Suivi — gérés avec rapidité, discrétion et professionnalisme.';

  function typeText(text, el, speed = 28) {
    el.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
      el.textContent += text[i];
      i++;
      if (i >= text.length) clearInterval(timer);
    }, speed);
  }

  // Run after preloader
  setTimeout(() => {
    typeText(currentLang === 'fr' ? textFR : textEN, sub);
  }, 1200);
})();


// ─────────────────────────────────────────────
// 16. SERVICE CARDS — staggered entrance
// ─────────────────────────────────────────────
(function initServiceStagger() {
  const cards = document.querySelectorAll('.srv-card, .testi-card, .currency-card');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${i * 0.08}s, transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 0.08}s`;
  });

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => obs.observe(card));
})();


// ─────────────────────────────────────────────
// 17. NAV ACTIVE LINK on scroll
// ─────────────────────────────────────────────
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const links = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => {
          link.style.color = '';
          const href = link.getAttribute('href');
          if (href === `#${entry.target.id}`) {
            link.style.color = 'var(--gold)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();


// ─────────────────────────────────────────────
// 18. FLOATING WA — hide/show on scroll
// ─────────────────────────────────────────────
(function initFloatingWA() {
  const wa = document.getElementById('floatingWa');
  if (!wa) return;
  let lastY = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < 100) {
      wa.style.transform = 'scale(1)';
      wa.style.opacity = '1';
    } else if (y > lastY + 10) {
      // scrolling down — hide slightly
      wa.style.transform = 'scale(0.85)';
      wa.style.opacity = '0.7';
    } else if (lastY > y + 5) {
      // scrolling up — show
      wa.style.transform = 'scale(1)';
      wa.style.opacity = '1';
    }
    lastY = y;
  }, { passive: true });
})();


// ─────────────────────────────────────────────
// 19. GALLERY ITEMS — tilt effect
// ─────────────────────────────────────────────
(function initGalleryTilt() {
  if (window.innerWidth < 768) return;
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mousemove', e => {
      const rect = item.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      item.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.03)`;
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
    });
  });
})();


// ─────────────────────────────────────────────
// 20. SMOOTH HOVER RIPPLE ON BUTTONS
// ─────────────────────────────────────────────
(function initRipple() {
  document.querySelectorAll('.btn-hero-primary, .btn-submit, .srv-btn, .btn-primary').forEach(btn => {
    btn.addEventListener('click', e => {
      const ripple = document.createElement('span');
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position: absolute;
        left: ${e.clientX - rect.left - size/2}px;
        top: ${e.clientY - rect.top - size/2}px;
        width: ${size}px; height: ${size}px;
        background: rgba(255,255,255,0.25);
        border-radius: 50%; pointer-events: none;
        animation: rippleAnim 0.6s ease-out forwards;
      `;
      if (getComputedStyle(btn).position === 'static') btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  // Add ripple keyframe
  if (!document.querySelector('#rippleStyle')) {
    const style = document.createElement('style');
    style.id = 'rippleStyle';
    style.textContent = `
      @keyframes rippleAnim {
        from { transform: scale(0); opacity: 1; }
        to   { transform: scale(2.5); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
})();


// ─────────────────────────────────────────────
// 21. TRUST STRIP pause on hover
// ─────────────────────────────────────────────
(function initStripHover() {
  const track = document.querySelector('.strip-track');
  if (!track) return;
  track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
  track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
})();


// ─────────────────────────────────────────────
// 22. STEP ITEMS — line fill animation
// ─────────────────────────────────────────────
(function initStepsLine() {
  const line = document.querySelector('.steps-line');
  if (!line) return;

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      line.style.transition = 'opacity 2s ease';
      line.style.opacity = '0.3';
      observer.disconnect();
    }
  }, { threshold: 0.2 });

  observer.observe(line);
})();


// ─────────────────────────────────────────────
// 23. INPUT FLOAT LABEL EFFECT
// ─────────────────────────────────────────────
(function initFloatLabels() {
  document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => {
      input.style.borderColor = 'var(--red)';
      input.style.boxShadow = '0 0 0 4px rgba(204,0,0,0.08)';
    });
    input.addEventListener('blur', () => {
      input.style.borderColor = '';
      input.style.boxShadow = '';
    });
  });
})();


// ─────────────────────────────────────────────
// 24. PAGE LOAD — hero elements stagger
// ─────────────────────────────────────────────
window.addEventListener('load', () => {
  document.querySelectorAll('.hero-content .reveal-up').forEach((el, i) => {
    el.style.animationDelay = (0.1 + i * 0.15) + 's';
    el.style.animationPlayState = 'running';
    el.style.opacity = '';
  });
});


// ─────────────────────────────────────────────
// 25. KEYBOARD ACCESSIBILITY
// ─────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeNav();
  if (e.key === 'Enter' && document.activeElement.classList.contains('track-btn')) {
    trackPackage();
  }
});


// ─────────────────────────────────────────────
// EXPOSE GLOBAL FUNCTIONS
// ─────────────────────────────────────────────
window.toggleNav = toggleNav;
window.closeNav  = closeNav;
window.setLang   = setLang;
window.trackPackage = trackPackage;
window.submitForm   = submitForm;
