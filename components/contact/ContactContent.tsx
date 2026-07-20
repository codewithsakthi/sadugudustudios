"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, MapPin, Mail, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { FaLinkedin, FaGithub, FaYoutube, FaInstagram, FaDiscord, FaXTwitter } from "react-icons/fa6";

import GlowButton from "@/components/ui/GlowButton";

const socials = [
  { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn", color: "#0077b5" },
  { icon: FaGithub, href: "https://github.com", label: "GitHub", color: "#fff" },
  { icon: FaYoutube, href: "https://youtube.com", label: "YouTube", color: "#ff0000" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram", color: "#e1306c" },
  { icon: FaDiscord, href: "https://discord.com", label: "Discord", color: "#5865f2" },
  { icon: FaXTwitter, href: "https://x.com", label: "X / Twitter", color: "#fff" },
];

const faqs = [
  {
    q: "What platforms do you develop for?",
    a: "We currently focus on Roblox (2026), with Steam and Epic Games planned for 2027–2028. Future plans include console and mobile platforms.",
  },
  {
    q: "Do you create games in Tamil language?",
    a: "Yes! Tamil language is a core part of our identity. All our games feature Tamil dialogue, UI options, and cultural elements.",
  },
  {
    q: "Are you open to collaborations?",
    a: "Absolutely. We welcome collaborations with Tamil content creators, indie developers, voice artists, and community partners.",
  },
  {
    q: "Do you offer game development services?",
    a: "Yes — game development, UI/UX design, Tamil localization, voice-over, 3D assets, and game consulting are all available.",
  },
  {
    q: "Are you hiring?",
    a: "We're a growing studio. If you're passionate about Tamil gaming and have skills in game dev, art, writing, or marketing — reach out!",
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      className="border border-white/5 rounded-xl overflow-hidden mb-3 last:mb-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/3 transition-colors duration-200 group"
        id={`faq-${index}`}
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
          {faq.q}
        </span>
        {open ? (
          <ChevronUp size={16} className="text-[#f5c242] flex-shrink-0" />
        ) : (
          <ChevronDown size={16} className="text-white/40 flex-shrink-0" />
        )}
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-4 text-sm text-white/45 leading-relaxed">{faq.a}</p>
      </motion.div>
    </motion.div>
  );
}

export default function ContactContent() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(formRef, { once: true, margin: "-80px" });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!formData.subject.trim()) e.subject = "Subject is required";
    if (formData.message.trim().length < 10) e.message = "Message must be at least 10 characters";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const inputClass = (field: string) =>
    `w-full bg-[#111] border rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 outline-none transition-all duration-300 focus:border-[#f5c242]/50 focus:shadow-[0_0_15px_rgba(245,194,66,0.1)] ${
      errors[field] ? "border-[#d62828]/60" : "border-white/8"
    }`;

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0805] to-[#050505]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#ff7a18]/4 blur-[150px]" />
        <div className="grid-lines absolute inset-0 opacity-15" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs tracking-[0.4em] uppercase text-[#f5c242]/60 block mb-6"
          >
            Get In Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Let&apos;s Build Something{" "}
            <span className="gradient-text">Amazing</span>
            <br />
            Together
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-white/50 text-lg max-w-xl mx-auto"
          >
            Whether you want to collaborate, commission work, join the team, or just say hello —
            we&apos;d love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <div ref={formRef} className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="glass rounded-2xl p-8 border border-white/5"
            >
              {submitted ? (
                <div className="text-center py-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="text-6xl mb-4"
                  >
                    🎮
                  </motion.div>
                  <h3 className="text-2xl font-black text-white mb-3" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    Message Received!
                  </h3>
                  <p className="text-white/50 mb-4">We&apos;ll get back to you soon. The adventure continues...</p>
                  <p className="font-tamil text-[#f5c242] tamil-glow text-xl">சடுகுடு தொடங்கட்டும்!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h2 className="text-xl font-black text-white mb-6" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    Send a Message
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className={inputClass("name")}
                      />
                      {errors.name && <p className="text-[#d62828] text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className={inputClass("email")}
                      />
                      {errors.email && <p className="text-[#d62828] text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="mb-4">
                    <input
                      id="contact-subject"
                      type="text"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                      className={inputClass("subject")}
                    />
                    {errors.subject && <p className="text-[#d62828] text-xs mt-1">{errors.subject}</p>}
                  </div>
                  <div className="mb-6">
                    <textarea
                      id="contact-message"
                      rows={5}
                      placeholder="Your message..."
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      className={`${inputClass("message")} resize-none`}
                    />
                    {errors.message && <p className="text-[#d62828] text-xs mt-1">{errors.message}</p>}
                  </div>
                  <button
                    id="contact-submit"
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-black bg-gradient-to-r from-[#ff7a18] to-[#f5c242] hover:shadow-[0_0_30px_rgba(245,194,66,0.4)] transition-all duration-300 disabled:opacity-50 hover:scale-[1.01]"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Info cards */}
            {[
              { icon: MapPin, label: "Location", value: "Madurai, Tamil Nadu, India", color: "#d62828" },
              { icon: Mail, label: "Email", value: "hello@sadugudustudios.com", color: "#f5c242" },
              { icon: Clock, label: "Business Hours", value: "Mon–Sat: 10 AM – 7 PM IST", color: "#ff7a18" },
            ].map((info, i) => (
              <div key={info.label} className="glass rounded-xl p-5 border border-white/5 flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${info.color}15`, border: `1px solid ${info.color}25` }}
                >
                  <info.icon size={18} style={{ color: info.color }} />
                </div>
                <div>
                  <div className="text-xs text-white/30 uppercase tracking-widest mb-0.5">{info.label}</div>
                  <div className="text-sm text-white/80">{info.value}</div>
                </div>
              </div>
            ))}

            {/* Social links */}
            <div className="glass rounded-xl p-5 border border-white/5">
              <div className="text-xs text-white/30 uppercase tracking-widest mb-4">Follow Us</div>
              <div className="grid grid-cols-3 gap-3">
                {socials.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    title={s.label}
                    className="flex flex-col items-center gap-1 glass rounded-lg p-3 border border-white/5 hover:border-white/15 transition-all duration-200 group"
                  >
                    <s.icon size={18} className="text-white/50 group-hover:text-white transition-colors" />
                    <span className="text-[10px] text-white/30 group-hover:text-white/60">{s.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Map embed */}
            <div className="glass rounded-xl overflow-hidden border border-white/5 h-48">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31588.47830012764!2d78.11482!3d9.9252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c582b1189633%3A0xdc7672b698090dad!2sMadurai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.5)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sadugudu Studios - Madurai, Tamil Nadu"
              />
            </div>

            {/* Careers CTA */}
            <div className="glass-gold rounded-xl p-5 border border-[#f5c242]/15 text-center">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-bold text-white mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                Join the Studio
              </h4>
              <p className="text-white/40 text-xs mb-4">Passionate about Tamil gaming? We&apos;re always looking for talent.</p>
              <GlowButton href="/contact" variant="outline" size="sm">
                View Opportunities
              </GlowButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs tracking-[0.4em] uppercase text-[#f5c242]/60 block mb-4">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Common <span className="gradient-text">Questions</span>
          </h2>
        </motion.div>
        <div className="glass rounded-2xl p-2 border border-white/5">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
