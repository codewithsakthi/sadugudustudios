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
  initInquiriesModal();
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

  async function submitForm() {
    const name = document.getElementById('form-name').value.trim() || 'Gaming Creator';
    const email = document.getElementById('form-email').value.trim() || 'creator@example.com';
    const phone = document.getElementById('form-phone').value.trim() || '';
    const message = document.getElementById('form-message').value.trim() || 'Hello Sadugudu Studios!';

    const getApiUrl = () => {
      if (window.VITE_API_URL) {
        return `${window.VITE_API_URL.replace(/\/$/, '')}/api/contacts/`;
      }
      if (window.location.protocol === 'file:') {
        return 'http://localhost:8000/api/contacts/';
      }
      return '/api/contacts/';
    };
    const API_URL = getApiUrl();

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message })
      });

      if (response.ok) {
        const savedItem = await response.json();
        showToast(`🚀 Saved to PostgreSQL DB! (ID #${savedItem.id}). Thank you, ${name}.`);
        form.reset();
      } else {
        const errorData = await response.json().catch(() => ({}));
        showToast(`⚠️ Database error (${response.status}): ${errorData.detail || 'Could not save record'}`);
      }
    } catch (err) {
      console.error('PostgreSQL API submit error:', err);
      showToast(`⚠️ Cannot reach database: ${err.message}. Make sure backend is running on http://localhost:8000`);
    }

    cancelHold();
  }

  // Form submit & click listeners
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitForm();
  });

  // Mouse & Touch events for holding down button
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

function initInquiriesModal() {
  const modal = document.getElementById('inquiries-modal');
  const openBtn = document.getElementById('view-inquiries-btn');
  const closeBtn = document.getElementById('close-inquiries-modal');
  const inquiriesList = document.getElementById('inquiries-list');

  if (!modal || !openBtn || !closeBtn) return;

  openBtn.addEventListener('click', async () => {
    modal.style.display = 'flex';
    inquiriesList.innerHTML = '<div style="text-align: center; color: var(--text-muted); padding: 2rem;">Loading inquiries from PostgreSQL database...</div>';

    const getApiUrl = () => {
      if (window.VITE_API_URL) {
        return `${window.VITE_API_URL.replace(/\/$/, '')}/api/contacts/`;
      }
      if (window.location.protocol === 'file:') {
        return 'http://localhost:8000/api/contacts/';
      }
      return '/api/contacts/';
    };
    const API_URL = getApiUrl();

    try {
      const response = await fetch(API_URL);
      const contentType = response.headers.get('content-type') || '';
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      if (!contentType.includes('application/json')) {
        throw new Error(`Server returned HTML (${response.status}) instead of JSON. Ensure backend API is active at ${API_URL}`);
      }
      const data = await response.json();

      if (!data || data.length === 0) {
        inquiriesList.innerHTML = '<div style="text-align: center; color: var(--text-muted); padding: 2rem;">No inquiries saved in database yet.</div>';
        return;
      }

      inquiriesList.innerHTML = data.map(item => `
        <div style="background: rgba(255, 255, 255, 0.05); padding: 1.25rem; border-radius: 10px; border-left: 4px solid var(--gold-primary);">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <strong style="color: #fff; font-size: 1.05rem;">${item.name}</strong>
            <span style="font-size: 0.8rem; color: var(--text-muted);">${new Date(item.created_at).toLocaleString()}</span>
          </div>
          <div style="font-size: 0.9rem; color: var(--gold-primary); margin-bottom: 0.25rem;">
            📧 ${item.email} ${item.phone ? ' | 📞 ' + item.phone : ''}
          </div>
          <div style="font-size: 0.95rem; color: #ddd; white-space: pre-wrap; margin-top: 0.5rem;">${item.message}</div>
        </div>
      `).join('');
    } catch (err) {
      inquiriesList.innerHTML = `<div style="text-align: center; color: #ff6b6b; padding: 2rem;">⚠️ Unable to reach backend service (${err.message}). Make sure FastAPI server is running on http://localhost:8000</div>`;
    }
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });
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
