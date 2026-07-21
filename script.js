/* ==========================================================================
   Sadugudu Studios - Interactive JavaScript Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initScrollAnimations();
  initEmberParticles();
  initStatsCounter();
  initAmbientAudio();
  initHoldToSubmitForm();
  initQuickAutoFill();
  initContactRedirections();
});

/* --------------------------------------------------------------------------
   1. Navbar Scroll Effect & Active Link Highlight
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. Smooth Reveal-on-Scroll Animations
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   3. Cinematic Ember Particles Canvas
   -------------------------------------------------------------------------- */
function initEmberParticles() {
  const canvas = document.getElementById('embers-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = height + Math.random() * 100;
      this.size = Math.random() * 3.5 + 1;
      this.speedY = Math.random() * 1.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.8;
      this.opacity = Math.random() * 0.8 + 0.2;
      this.color = Math.random() > 0.5 ? '#f5c242' : '#ff7a18';
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      this.opacity -= 0.002;

      if (this.y < -10 || this.opacity <= 0) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 12;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  const particles = Array.from({ length: 50 }, () => new Particle());

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   4. Animated Stats Counter
   -------------------------------------------------------------------------- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 2000;
          const stepTime = 30;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target + (counter.getAttribute('data-suffix') || '');
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current) + (counter.getAttribute('data-suffix') || '');
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.getElementById('stats');
  if (statsSection) observer.observe(statsSection);
}

/* --------------------------------------------------------------------------
   5. Ambient Sound Synthesizer
   -------------------------------------------------------------------------- */
function initAmbientAudio() {
  const soundBtn = document.getElementById('sound-toggle');
  const soundText = document.getElementById('sound-text');
  let audioCtx = null;
  let oscillator = null;
  let gainNode = null;
  let isPlaying = false;

  soundBtn.addEventListener('click', () => {
    if (!isPlaying) {
      startAmbientSound();
    } else {
      stopAmbientSound();
    }
  });

  function startAmbientSound() {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      oscillator = audioCtx.createOscillator();
      gainNode = audioCtx.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(220, audioCtx.currentTime);

      gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 2);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      isPlaying = true;
      soundText.textContent = '🔊 Ambient Active';
      showToast('🔊 Ambient sound generator playing');
    } catch (e) {
      console.warn('Audio error', e);
    }
  }

  function stopAmbientSound() {
    if (gainNode && audioCtx) {
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1);
      setTimeout(() => {
        oscillator.stop();
        audioCtx.close();
        isPlaying = false;
        soundText.textContent = '🔇 Ambient Sound';
        showToast('🔇 Ambient audio muted');
      }, 1000);
    }
  }
}

/* --------------------------------------------------------------------------
   6. Hold-to-Submit Form Feature
   -------------------------------------------------------------------------- */
function initHoldToSubmitForm() {
  const holdBtn = document.getElementById('hold-submit-btn');
  const progressBar = document.getElementById('hold-progress');
  const form = document.getElementById('contact-form');
  if (!holdBtn || !form) return;

  let holdTimer = null;
  let holdProgress = 0;
  const holdDuration = 1000; // 1 second hold to submit
  const intervalTime = 20;

  function startHold(e) {
    e.preventDefault();
    holdProgress = 0;
    progressBar.style.width = '0%';

    holdTimer = setInterval(() => {
      holdProgress += (intervalTime / holdDuration) * 100;
      progressBar.style.width = `${Math.min(holdProgress, 100)}%`;

      if (holdProgress >= 100) {
        clearInterval(holdTimer);
        submitForm();
      }
    }, intervalTime);
  }

  function cancelHold() {
    if (holdTimer) {
      clearInterval(holdTimer);
      holdTimer = null;
    }
    holdProgress = 0;
    progressBar.style.width = '0%';
  }

  function submitForm() {
    const name = document.getElementById('form-name').value || 'Gaming Creator';
    showToast(`🚀 Message submitted successfully! Thank you, ${name}.`);
    form.reset();
    cancelHold();
  }

  // Mouse & Touch events for holding down
  holdBtn.addEventListener('mousedown', startHold);
  holdBtn.addEventListener('mouseup', cancelHold);
  holdBtn.addEventListener('mouseleave', cancelHold);

  holdBtn.addEventListener('touchstart', startHold);
  holdBtn.addEventListener('touchend', cancelHold);
  holdBtn.addEventListener('touchcancel', cancelHold);
}

/* --------------------------------------------------------------------------
   7. Quick Auto-Fill Form Feature
   -------------------------------------------------------------------------- */
function initQuickAutoFill() {
  const autoFillBtn = document.getElementById('auto-fill-btn');
  if (!autoFillBtn) return;

  autoFillBtn.addEventListener('click', () => {
    document.getElementById('form-name').value = 'Sakthi Developer';
    document.getElementById('form-email').value = 'sakthi@sadugudustudios.com';
    document.getElementById('form-phone').value = '+91 98765 43210';
    document.getElementById('form-message').value = 'Hey Sadugudu Studios team! I love your story-driven games and would like to collaborate on an upcoming project.';
    
    showToast('✨ Form auto-filled with sample details!');
  });
}

/* --------------------------------------------------------------------------
   8. Contact Redirection & Toast Notification Helpers
   -------------------------------------------------------------------------- */
function initContactRedirections() {
  const callBtn = document.getElementById('call-redirect-btn');
  const mailBtn = document.getElementById('mail-redirect-btn');
  const whatsappBtn = document.getElementById('whatsapp-btn');

  if (callBtn) {
    callBtn.addEventListener('click', () => {
      showToast('📞 Opening Call Dialer: +91 98765 43210');
    });
  }

  if (mailBtn) {
    mailBtn.addEventListener('click', () => {
      showToast('✉️ Opening Mail Client: contact@sadugudustudios.com');
    });
  }

  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      showToast('💬 Redirecting to WhatsApp Support...');
    });
  }
}

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
