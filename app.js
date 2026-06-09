/**
 * Portfolio — Object-Oriented Application
 * Each concern is encapsulated in its own class.
 */

/* ═══════════════════════════ NAVBAR ═══════════════════════════ */
class Navbar {
  constructor() {
    this._navbar   = document.getElementById('navbar');
    this._menuBtn  = document.getElementById('mobile-menu-btn');
    this._menu     = document.getElementById('mobile-menu');
    this._navLinks = document.querySelectorAll('.nav-link');
    this._sections = document.querySelectorAll('section[id]');
    this._init();
  }

  _init() {
    this._setupScrollEffect();
    this._setupMobileMenu();
    this._setupActiveNav();
  }

  _setupScrollEffect() {
    const CLASSES = [
      'bg-surface-container/80', 'glassmorphism',
      'border-b', 'border-outline-variant/10',
      'shadow-lg', 'shadow-black/20'
    ];
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        this._navbar.classList.add(...CLASSES);
      } else {
        this._navbar.classList.remove(...CLASSES);
      }
    });
  }

  _setupMobileMenu() {
    this._menuBtn.addEventListener('click', () => {
      this._menu.classList.toggle('hidden');
    });
    this._menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => this._menu.classList.add('hidden'));
    });
  }

  _setupActiveNav() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        this._navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    this._sections.forEach(s => observer.observe(s));
  }
}

/* ═══════════════════════════ SCROLL ANIMATIONS ═══════════════════════════ */
class ScrollAnimations {
  constructor() {
    this._setupReveal();
    this._setupSkillBars();
  }

  _setupReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('section-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.section-hidden').forEach(el => observer.observe(el));
  }

  _setupSkillBars() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll('.skill-bar').forEach(bar => {
          const targetWidth = bar.style.width;
          bar.style.width = '0';
          setTimeout(() => {
            bar.style.width = targetWidth;
            bar.style.transition = 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
          }, 200);
        });
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('#skills').forEach(el => observer.observe(el));
  }
}

/* ═══════════════════════════ TYPING EFFECT ═══════════════════════════ */
class TypingEffect {
  constructor(elementId, words, { typeSpeed = 100, deleteSpeed = 60, pauseAfterWord = 2000, pauseAfterDelete = 400 } = {}) {
    this._target       = document.getElementById(elementId);
    this._words        = words;
    this._typeSpeed    = typeSpeed;
    this._deleteSpeed  = deleteSpeed;
    this._pauseAfterWord   = pauseAfterWord;
    this._pauseAfterDelete = pauseAfterDelete;
    this._wordIndex    = 0;
    this._charIndex    = 0;
    this._deleting     = false;

    if (this._target) setTimeout(() => this._tick(), 1000);
  }

  _tick() {
    const word = this._words[this._wordIndex];

    if (this._deleting) {
      this._charIndex--;
      this._target.textContent = word.slice(0, this._charIndex);
      if (this._charIndex === 0) {
        this._deleting = false;
        this._wordIndex = (this._wordIndex + 1) % this._words.length;
        setTimeout(() => this._tick(), this._pauseAfterDelete);
        return;
      }
      setTimeout(() => this._tick(), this._deleteSpeed);
    } else {
      this._charIndex++;
      this._target.textContent = word.slice(0, this._charIndex);
      if (this._charIndex === word.length) {
        this._deleting = true;
        setTimeout(() => this._tick(), this._pauseAfterWord);
        return;
      }
      setTimeout(() => this._tick(), this._typeSpeed);
    }
  }
}

/* ═══════════════════════════ CONTACT FORM ═══════════════════════════ */
class ContactForm {
  constructor(formId) {
    this._form = document.getElementById(formId);
    if (this._form) this._init();
  }

  _init() {
    this._form.addEventListener('submit', e => this._handleSubmit(e));
  }

  _handleSubmit(e) {
    e.preventDefault();
    const btn     = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnIcon = document.getElementById('btn-icon');

    btn.disabled       = true;
    btnText.textContent = 'Sending...';
    btnIcon.textContent = 'hourglass_empty';

    setTimeout(() => {
      document.getElementById('form-success').classList.remove('hidden');
      btnText.textContent = 'Sent!';
      btnIcon.textContent = 'check_circle';
      btn.classList.replace('bg-primary', 'bg-primary/50');
      e.target.reset();
    }, 1000);
  }
}

/* ═══════════════════════════ PORTFOLIO (ROOT) ═══════════════════════════ */
class Portfolio {
  constructor() {
    this.navbar      = new Navbar();
    this.animations  = new ScrollAnimations();
    this.typing      = new TypingEffect('typing-word', ['Future.', 'Systems.', 'Infrastructure.', 'Solutions.']);
    this.contactForm = new ContactForm('contact-form');
  }
}

/* ─── Bootstrap ─── */
document.addEventListener('DOMContentLoaded', () => new Portfolio());
