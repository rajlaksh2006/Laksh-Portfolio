/* ===== SURAJ PORTFOLIO - CINEMATIC FANTASY JS ===== */

// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const loading = document.getElementById('loading-screen');
    if (loading) {
      loading.classList.add('hidden');
      document.body.style.overflow = 'visible';
      initRevealAnimations();
    }
  }, 2200);
});

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

if (cursor && cursorFollower) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX - 6 + 'px';
    cursor.style.top = mouseY - 6 + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX - 20) * 0.12;
    followerY += (mouseY - followerY - 20) * 0.12;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card, .magic-card, .gallery-item, .filter-btn, .social-icon');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursorFollower.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hovered'));
  });
}

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translateY(9px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translateY(-9px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
}

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ===== FLOATING PETALS =====
function createPetals() {
  const container = document.getElementById('petals-container');
  if (!container) return;

  const petalCount = window.innerWidth < 768 ? 8 : 18;

  for (let i = 0; i < petalCount; i++) {
    setTimeout(() => {
      const petal = document.createElement('div');
      petal.className = 'petal';
      resetPetal(petal);
      container.appendChild(petal);

      setInterval(() => {
        resetPetal(petal);
      }, parseFloat(petal.style.animationDuration) * 1000);
    }, i * 400);
  }
}

function resetPetal(petal) {
  const size = Math.random() * 8 + 4;
  const duration = Math.random() * 8 + 10;
  const delay = Math.random() * 5;
  const colors = [
    'radial-gradient(circle, #F3B4D8, rgba(243,180,216,0.3))',
    'radial-gradient(circle, #FFD27A, rgba(255,210,122,0.3))',
    'radial-gradient(circle, #D9C8FF, rgba(217,200,255,0.3))',
    'radial-gradient(circle, #FFB36B, rgba(255,179,107,0.3))'
  ];

  petal.style.cssText = `
    left: ${Math.random() * 110}%;
    width: ${size}px;
    height: ${size}px;
    background: ${colors[Math.floor(Math.random() * colors.length)]};
    animation: petalFall ${duration}s ${delay}s linear infinite;
    opacity: ${Math.random() * 0.6 + 0.2};
    border-radius: ${Math.random() > 0.5 ? '50% 0 50% 0' : '50%'};
  `;
}

// ===== PARTICLE CANVAS =====
function initParticleCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = window.innerWidth < 768 ? 30 : 70;

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.maxOpacity = this.opacity;
      this.minOpacity = 0.05;
      this.fadeDir = -1;
      this.fadeSpeed = Math.random() * 0.005 + 0.002;
      const colors = ['255,210,122', '243,180,216', '217,200,255', '255,179,107'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.opacity += this.fadeDir * this.fadeSpeed;
      if (this.opacity <= this.minOpacity || this.opacity >= this.maxOpacity) {
        this.fadeDir *= -1;
      }
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
      grd.addColorStop(0, `rgba(${this.color}, 1)`);
      grd.addColorStop(1, `rgba(${this.color}, 0)`);
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateCanvas);
  }
  animateCanvas();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ===== SCROLL REVEAL ANIMATIONS =====
function initRevealAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, entry.target.dataset.delay || 0);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-reveal]').forEach((el, i) => {
    if (!el.dataset.delay) el.dataset.delay = i * 100;
    observer.observe(el);
  });

  // Timeline items
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('revealed');
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.timeline-item').forEach(el => timelineObserver.observe(el));

  // Gallery items
  const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, index * 80);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.gallery-item').forEach(el => galleryObserver.observe(el));

  // Skill bars
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-bar').forEach(bar => {
          bar.classList.add('animated');
        });
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skills-grid').forEach(el => skillObserver.observe(el));

  // Counter animation
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-number').forEach(el => {
          animateCounter(el);
        });
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statsEl = document.querySelector('.stats-inner');
  if (statsEl) counterObserver.observe(statsEl);
}

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target || el.textContent);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const start = performance.now();

  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ===== PARALLAX =====
function initParallax() {
  const heroScene = document.querySelector('.hero-right');
  if (!heroScene) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const parallaxEls = document.querySelectorAll('[data-parallax]');
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.3;
      el.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });

  document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const moveX = (clientX - centerX) / centerX;
    const moveY = (clientY - centerY) / centerY;

    if (heroScene) {
      heroScene.style.transform = `translate(${moveX * 8}px, ${moveY * 8}px)`;
    }
  });
}

// ===== PORTFOLIO FILTER =====
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      galleryItems.forEach((item, i) => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, i * 60);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => { item.style.display = 'none'; }, 400);
        }
      });
    });
  });
}

// ===== PAGE TRANSITIONS =====
function initPageTransitions() {
  const links = document.querySelectorAll('a[href]');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('mailto') && !href.startsWith('tel') && href.endsWith('.html')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const overlay = document.getElementById('page-transition-overlay');
        if (overlay) {
          overlay.classList.add('active');
          setTimeout(() => { window.location.href = href; }, 700);
        } else {
          window.location.href = href;
        }
      });
    }
  });
}

// ===== CONTACT FORM =====
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    const successMsg = document.getElementById('success-msg');

    btn.innerHTML = '<span>✦ Sending...</span>';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = '<span>✦ Message Sent!</span>';
      if (successMsg) {
        successMsg.style.display = 'block';
      }
      form.reset();
      setTimeout(() => {
        btn.innerHTML = '<span>✦ Send Message</span>';
        btn.disabled = false;
        if (successMsg) successMsg.style.display = 'none';
      }, 3000);
    }, 1500);
  });
}

// ===== LANTERN FLICKER =====
function initLanternFlicker() {
  const lanternBodies = document.querySelectorAll('.lantern-body');
  lanternBodies.forEach(lantern => {
    setInterval(() => {
      const intensity = Math.random() * 0.3 + 0.8;
      lantern.style.opacity = intensity;
    }, 150 + Math.random() * 200);
  });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.overflow = 'hidden';
  createPetals();
  initParticleCanvas();
  initParallax();
  initPortfolioFilter();
  initPageTransitions();
  initContactForm();
  initLanternFlicker();

  // Page transition exit animation
  const overlay = document.getElementById('page-transition-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    overlay.classList.add('exit');
    setTimeout(() => {
      overlay.classList.remove('exit');
    }, 700);
  }
});
