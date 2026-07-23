import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [holdProgress, setHoldProgress] = useState(0);

  // Inquiries Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inquiries, setInquiries] = useState([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  // Audio Context Ref
  const audioCtxRef = useRef(null);
  const oscRef = useRef(null);
  const gainRef = useRef(null);
  const holdIntervalRef = useRef(null);

  // 1. Toast Notification Helper
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  // 2. Navbar Scroll and Active Section Tracking
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
          setActiveSection(section.getAttribute('id'));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. Cinematic Ember Canvas Particles
  useEffect(() => {
    const canvas = document.getElementById('embers-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

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
    let animId;
    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // 4. Ambient Sound Synthesizer
  const toggleAmbientSound = () => {
    if (!isAudioPlaying) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, audioCtx.currentTime);

        gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 2);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        audioCtxRef.current = audioCtx;
        oscRef.current = osc;
        gainRef.current = gain;

        setIsAudioPlaying(true);
        triggerToast('🔊 Ambient sound generator playing');
      } catch (e) {
        console.warn('Audio error', e);
      }
    } else {
      if (gainRef.current && audioCtxRef.current) {
        gainRef.current.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 1);
        setTimeout(() => {
          if (oscRef.current) oscRef.current.stop();
          if (audioCtxRef.current) audioCtxRef.current.close();
          setIsAudioPlaying(false);
          triggerToast('🔇 Ambient audio muted');
        }, 1000);
      }
    }
  };

  // 5. Form Submit Handler (Posts to FastAPI / PostgreSQL)
  const submitForm = async () => {
    const name = formName.trim() || 'Gaming Creator';
    const email = formEmail.trim() || 'creator@example.com';
    const phone = formPhone.trim() || '';
    const message = formMessage.trim() || 'Hello Sadugudu Studios!';

    const getApiUrl = () => {
      if (import.meta.env.VITE_API_URL) {
        return `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api/contacts/`;
      }
      const isLocal =
        window.location.protocol === 'file:' ||
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        !window.location.hostname;
      return isLocal ? 'http://localhost:8000/api/contacts/' : '/api/contacts/';
    };

    const API_URL = getApiUrl();

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message }),
      });

      if (response.ok) {
        const savedItem = await response.json();
        triggerToast(`🚀 Saved to PostgreSQL DB! (ID #${savedItem.id}). Thank you, ${name}.`);
        setFormName('');
        setFormEmail('');
        setFormPhone('');
        setFormMessage('');
      } else {
        const errorData = await response.json().catch(() => ({}));
        triggerToast(`⚠️ Database error (${response.status}): ${errorData.detail || 'Could not save record'}`);
      }
    } catch (err) {
      console.error('PostgreSQL API submit error:', err);
      triggerToast(`⚠️ Cannot reach database: ${err.message}. Backend URL: ${API_URL}`);
    }

    cancelHold();
  };

  // 6. Hold to Submit Button Logic
  const startHold = (e) => {
    e.preventDefault();
    setHoldProgress(0);

    let progress = 0;
    const duration = 1000; // 1s
    const interval = 20;

    holdIntervalRef.current = setInterval(() => {
      progress += (interval / duration) * 100;
      setHoldProgress(Math.min(progress, 100));

      if (progress >= 100) {
        clearInterval(holdIntervalRef.current);
        submitForm();
      }
    }, interval);
  };

  const cancelHold = () => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
    setHoldProgress(0);
  };

  const handleAutoFill = () => {
    setFormName('Sakthi Developer');
    setFormEmail('sakthi@sadugudustudios.com');
    setFormPhone('+91 98765 43210');
    setFormMessage('Hey Sadugudu Studios team! I love your story-driven games and would like to collaborate on an upcoming project.');
    triggerToast('✨ Form auto-filled with sample details!');
  };

  // 7. View Saved Inquiries Modal
  const openInquiriesModal = async () => {
    setIsModalOpen(true);
    setLoadingInquiries(true);

    const getApiUrl = () => {
      if (import.meta.env.VITE_API_URL) {
        return `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api/contacts/`;
      }
      const isLocal =
        window.location.protocol === 'file:' ||
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        !window.location.hostname;
      return isLocal ? 'http://localhost:8000/api/contacts/' : '/api/contacts/';
    };

    const API_URL = getApiUrl();

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch inquiries');
      const data = await response.json();
      setInquiries(data || []);
    } catch (err) {
      triggerToast(`⚠️ Unable to reach backend service: ${err.message}`);
    } finally {
      setLoadingInquiries(false);
    }
  };

  return (
    <div>
      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/919876543210?text=Hello%20Sadugudu%20Studios%20Team!%20I%20read%20your%20story%20and%20want%20to%20connect."
        id="whatsapp-btn"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        title="Chat with Sadugudu Studios on WhatsApp"
        onClick={() => triggerToast('💬 Redirecting to WhatsApp Support...')}
      >
        💬
      </a>

      {/* Navigation Bar */}
      <nav id="navbar" className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#home" className="brand-logo">
            <img src="/logo.png" alt="Sadugudu Studios Logo" className="brand-logo-img" />
            <span>
              Sadugudu <span style={{ color: 'var(--gold-primary)' }}>Studios</span>
            </span>
          </a>

          <ul className="nav-links">
            <li>
              <a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}>
                1. Home
              </a>
            </li>
            <li>
              <a href="#products" className={`nav-link ${activeSection === 'products' ? 'active' : ''}`}>
                2. Product/Service
              </a>
            </li>
            <li>
              <a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>
                3. About Us
              </a>
            </li>
            <li>
              <a href="#founder" className={`nav-link ${activeSection === 'founder' ? 'active' : ''}`}>
                4. About Founder
              </a>
            </li>
            <li>
              <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}>
                5. Contact Us
              </a>
            </li>
          </ul>

          <div className="nav-actions">
            <a
              href="tel:+919876543210"
              className="icon-action-btn"
              title="Call Us Directly"
              onClick={() => triggerToast('📞 Opening Call Dialer: +91 98765 43210')}
            >
              📞 <span style={{ display: 'inline-block' }}>Call</span>
            </a>

            <a
              href="mailto:contact@sadugudustudios.com"
              className="icon-action-btn"
              title="Email Us Directly"
              onClick={() => triggerToast('✉️ Opening Mail Client: contact@sadugudustudios.com')}
            >
              ✉️ <span style={{ display: 'inline-block' }}>Email</span>
            </a>

            <button className="icon-action-btn" onClick={toggleAmbientSound}>
              <span>{isAudioPlaying ? '🔊 Ambient Active' : '🔇 Ambient Sound'}</span>
            </button>

            <button className="icon-action-btn" style={{ borderColor: 'var(--gold-primary)', color: 'var(--gold-primary)' }} onClick={openInquiriesModal}>
              📋 DB Submissions
            </button>
          </div>
        </div>
      </nav>

      {/* SECTION 1: HOME */}
      <section id="home" className="hero grid-lines">
        <canvas id="embers-canvas"></canvas>

        <div className="hero-content">
          <div className="hero-logo-wrapper">
            <img src="/logo.png" alt="Sadugudu Studios Official Logo" className="hero-logo-img" />
          </div>

          <div className="font-tamil hero-tagline tamil-glow">சடுகுடு தொடங்கட்டும்!</div>

          <h1 className="hero-headline">
            Every Great <br />
            <span className="gradient-text">Adventure</span> <br />
            Begins Somewhere.
          </h1>

          <p className="hero-description">
            Where every game begins with a story. We are{' '}
            <strong style={{ color: 'var(--gold-primary)' }}>Sadugudu Studios</strong> — a Tamil game development studio crafting unforgettable, story-driven games from Madurai to global screens.
          </p>

          <div className="hero-cta">
            <a href="#about" className="btn-glow btn-primary">
              📖 Read Our Story
            </a>
            <a href="#products" className="btn-glow btn-outline">
              🎮 Explore Our Games
            </a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section id="stats" className="section">
        <div className="section-container">
          <div className="stats-grid">
            <div className="glass-card stat-card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div className="stat-number" style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--gold-primary)' }}>
                5+
              </div>
              <div className="stat-label" style={{ color: 'var(--text-muted)' }}>Games & Experiences in Dev</div>
            </div>

            <div className="glass-card stat-card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div className="stat-number" style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--gold-primary)' }}>
                100K+
              </div>
              <div className="stat-label" style={{ color: 'var(--text-muted)' }}>Roblox Impressions</div>
            </div>

            <div className="glass-card stat-card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div className="stat-number" style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--gold-primary)' }}>
                100%
              </div>
              <div className="stat-label" style={{ color: 'var(--text-muted)' }}>Tamil Cultural Infusion</div>
            </div>

            <div className="glass-card stat-card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div className="stat-number" style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--gold-primary)' }}>
                2026
              </div>
              <div className="stat-label" style={{ color: 'var(--text-muted)' }}>Global Launch Era</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PRODUCT / SERVICE */}
      <section id="products" className="section" style={{ background: 'rgba(0,0,0,0.3)' }}>
        <div className="section-container">
          <div className="section-header">
            <span className="section-subtitle">2. Products & Services</span>
            <h2 className="section-title">
              Games, Worlds & <span className="gradient-text">Stories</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>
              We build accessible, affordable, and deeply memorable story games across Roblox, Steam, and Epic Games Store.
            </p>
          </div>

          <div className="products-grid">
            <div className="glass-card product-card">
              <div>
                <span className="product-tag">Roblox Experience</span>
                <div className="product-icon">🟥</div>
                <h3 className="product-title">Roblox World Building</h3>
                <p className="product-desc">
                  Affordable, highly accessible multiplayer story games built on Roblox Studio. Free to play, social, and culturally rich for players everywhere.
                </p>
              </div>
              <a href="#contact" className="btn-glow btn-outline" style={{ fontSize: '0.85rem', padding: '0.55rem 1rem' }}>
                Collab on Roblox →
              </a>
            </div>

            <div className="glass-card product-card">
              <div>
                <span className="product-tag">Unreal Engine 5</span>
                <div className="product-icon">🚀</div>
                <h3 className="product-title">PC & Console Story Games</h3>
                <p className="product-desc">
                  Full-fledged indie action RPGs for Steam and Epic Games Store. High fidelity, immersive Tamil voice acting, and deep narrative arcs.
                </p>
              </div>
              <a href="#contact" className="btn-glow btn-outline" style={{ fontSize: '0.85rem', padding: '0.55rem 1rem' }}>
                Join Beta Program →
              </a>
            </div>

            <div className="glass-card product-card">
              <div>
                <span className="product-tag">Original Tamil IP</span>
                <div className="product-icon">📜</div>
                <h3 className="product-title">Tamil Storytelling & Audio</h3>
                <p className="product-desc">
                  Custom game narrative design, Tamil voiceovers, and rich local folklore world-building services for international gaming studios.
                </p>
              </div>
              <a href="#contact" className="btn-glow btn-outline" style={{ fontSize: '0.85rem', padding: '0.55rem 1rem' }}>
                Inquire Services →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: ABOUT US ("OUR STORY") */}
      <section id="about" className="section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-subtitle">3. About Us</span>
            <h2 className="section-title">
              Our <span className="gradient-text">Story</span>
            </h2>
          </div>

          <div className="story-reader-container">
            <h1 className="story-main-title">Our Story</h1>
            <h2 className="story-main-subtitle">Every Great Adventure Begins Somewhere.</h2>

            <p className="story-paragraph" style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
              For us, it didn't begin in a million-dollar office.<br />
              It began in a small home in Madurai.
            </p>

            <p className="story-paragraph" style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
              Long before high-end gaming PCs, before powerful consoles, and before game engines became part of everyday conversations, there was one person who unknowingly started everything—my father.
            </p>

            <div className="story-blockquote">"Technology isn't something to fear. It's something to explore."</div>

            <hr className="story-divider" style={{ border: 'none', borderTop: '1px solid var(--border-glass)', margin: '2rem 0' }} />

            <h2 className="story-section-title" style={{ fontSize: '1.5rem', color: 'var(--gold-primary)', marginBottom: '1rem' }}>
              Before Smartphones, There Were Stories.
            </h2>
            <p className="story-paragraph" style={{ color: 'var(--text-muted)' }}>
              I grew up during the era of keypad phones with tiny screens and physical buttons. One story-driven game called{' '}
              <strong style={{ color: 'var(--gold-primary)' }}>Vampires Dawn</strong> stayed with me forever.
            </p>

            <div className="story-blockquote">
              "Great games are never defined by powerful hardware. They're remembered because of unforgettable stories."
            </div>

            <hr className="story-divider" style={{ border: 'none', borderTop: '1px solid var(--border-glass)', margin: '2rem 0' }} />

            <h2 className="story-section-title" style={{ fontSize: '1.5rem', color: 'var(--gold-primary)', marginBottom: '1rem' }}>
              Why Sadugudu Studios Exists.
            </h2>
            <p className="story-paragraph" style={{ color: 'var(--text-muted)' }}>
              We believe amazing stories shouldn't belong only to those who can afford expensive games. Everyone deserves games that speak their language. We are starting with Roblox, then Steam, and Epic Games.
            </p>

            <div className="font-tamil story-invitation-tag tamil-glow" style={{ fontSize: '1.8rem', textAlign: 'center', marginTop: '2rem', color: 'var(--gold-primary)' }}>
              சடுகுடு தொடங்கட்டும்!
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: ABOUT THE FOUNDER */}
      <section id="founder" className="section" style={{ background: 'rgba(0,0,0,0.3)' }}>
        <div className="section-container">
          <div className="section-header">
            <span className="section-subtitle">4. About The Founder</span>
            <h2 className="section-title">
              Rooted In <span className="gradient-text">Madurai</span>
            </h2>
          </div>

          <div className="glass-card founder-card-box">
            <div className="founder-img-wrapper">
              <img src="/logo.png" alt="Founder of Sadugudu Studios Logo" className="founder-logo-avatar" />
              <h3 style={{ fontSize: '1.4rem', fontWeight: '700' }}>Founder & Lead Developer</h3>
              <p style={{ color: 'var(--gold-primary)', fontWeight: '600' }}>Madurai, Tamil Nadu</p>
              <div className="font-tamil tamil-glow" style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.5rem' }}>
                சடுகுடு தொடங்கட்டும்!
              </div>
            </div>

            <div>
              <blockquote className="story-quote-box" style={{ marginTop: '0' }}>
                "Founder of Sadugudu Studios. Tamil. Self-taught. Passionate about making games that tell stories nobody else is telling — in a language nobody else is using — for a community nobody else is building for."
              </blockquote>

              <p className="story-text">
                Inspired by my father's endless curiosity for technology in Madurai, I embarked on a journey to teach myself game development, storytelling, and world-building.
              </p>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                <a href="#contact" className="btn-glow btn-primary">
                  Connect With Founder
                </a>
                <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="btn-glow btn-outline">
                  💬 Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CONTACT US */}
      <section id="contact" className="section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-subtitle">5. Contact Us</span>
            <h2 className="section-title">
              Collaborate & <span className="gradient-text">Connect Direct</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Reach out to Sadugudu Studios for game collaborations, feedback, or media inquiries.
            </p>
          </div>

          <div className="contact-container">
            <div className="quick-contact-box">
              <a
                href="tel:+919876543210"
                className="glass-card redirect-card"
                onClick={() => triggerToast('📞 Opening Call Dialer: +91 98765 43210')}
              >
                <div className="redirect-icon">📞</div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>Call Studio HQ</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>+91 98765 43210 (Touch to Dial)</div>
                </div>
              </a>

              <a
                href="mailto:contact@sadugudustudios.com"
                className="glass-card redirect-card"
                onClick={() => triggerToast('✉️ Opening Mail Client: contact@sadugudustudios.com')}
              >
                <div className="redirect-icon" style={{ background: 'linear-gradient(135deg, var(--orange-primary), var(--purple-primary))' }}>
                  ✉️
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>Email Studio Mailbox</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>contact@sadugudustudios.com</div>
                </div>
              </a>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="glass-card redirect-card"
                onClick={() => triggerToast('💬 Redirecting to WhatsApp Support...')}
              >
                <div className="redirect-icon" style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', color: '#fff' }}>
                  💬
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>Instant WhatsApp Chat</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Chat with lead developer directly</div>
                </div>
              </a>

              <div className="map-iframe-container">
                <iframe
                  src="https://maps.google.com/maps?q=Madurai,Tamil%20Nadu&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Sadugudu Studios Madurai Map Location"
                ></iframe>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '2.5rem' }}>
              <form onSubmit={(e) => { e.preventDefault(); submitForm(); }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="form-name">Your Name</label>
                  <input
                    type="text"
                    id="form-name"
                    className="form-input"
                    placeholder="e.g. Sakthi Developer"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="form-email">Email Address</label>
                  <input
                    type="email"
                    id="form-email"
                    className="form-input"
                    placeholder="name@example.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="form-phone">Phone Number</label>
                  <input
                    type="tel"
                    id="form-phone"
                    className="form-input"
                    placeholder="+91 98765 43210"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="form-message">Project Message / Inquiry</label>
                  <textarea
                    id="form-message"
                    className="form-textarea"
                    rows="4"
                    placeholder="Tell us about your game idea or message..."
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-glow btn-outline" style={{ fontSize: '0.85rem', padding: '0.75rem 1rem' }} onClick={handleAutoFill}>
                    ⚡ Auto-Fill Form
                  </button>

                  <button
                    type="button"
                    className="btn-glow btn-primary btn-hold-submit"
                    onMouseDown={startHold}
                    onMouseUp={cancelHold}
                    onMouseLeave={cancelHold}
                    onTouchStart={startHold}
                    onTouchEnd={cancelHold}
                  >
                    <div className="hold-progress-bar" style={{ width: `${holdProgress}%` }}></div>
                    <span style={{ position: 'relative', zIndex: 2 }}>Hold to Submit (1s) 🚀</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <a href="#home" className="brand-logo" style={{ justifyContent: 'center' }}>
            <img src="/logo.png" alt="Sadugudu Studios Logo" className="brand-logo-img" />
            <span>
              Sadugudu <span style={{ color: 'var(--gold-primary)' }}>Studios</span>
            </span>
          </a>

          <div className="footer-socials">
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="social-link">💬 WhatsApp</a>
            <a href="tel:+919876543210" className="social-link">📞 Call</a>
            <a href="mailto:contact@sadugudustudios.com" className="social-link">✉️ Email</a>
          </div>

          <p className="footer-copy">&copy; 2026 Sadugudu Studios. All rights reserved. Madurai, Tamil Nadu.</p>
        </div>
      </footer>

      {/* Inquiries Modal */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(10px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setIsModalOpen(false); }}
        >
          <div
            className="glass-card"
            style={{
              maxWidth: '650px',
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto',
              padding: '2rem',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--gold-primary)' }}>Submissions Saved in PostgreSQL DB</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {loadingInquiries ? (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>Loading submissions...</div>
            ) : inquiries.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No contact submissions found in PostgreSQL DB.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {inquiries.map((item) => (
                  <div
                    key={item.id || item.created_at}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '1.25rem',
                      borderRadius: '10px',
                      borderLeft: '4px solid var(--gold-primary)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <strong style={{ color: '#fff', fontSize: '1.05rem' }}>{item.name}</strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {item.created_at ? new Date(item.created_at).toLocaleString() : 'Just now'}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--gold-primary)', marginBottom: '0.25rem' }}>
                      📧 {item.email} {item.phone ? ` | 📞 ${item.phone}` : ''}
                    </div>
                    <div style={{ fontSize: '0.95rem', color: '#ddd', marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>
                      {item.message}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <div className={`toast ${showToast ? 'show' : ''}`}>{toastMessage}</div>
    </div>
  );
}

export default App;
