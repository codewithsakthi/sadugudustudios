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
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="border border-white/5 rounded-xl overflow-hidden mb-3 last:mb-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 text-left hover:bg-white/5 transition-colors duration-200 group"
        aria-expanded={open}
      >
        <span className="text-xs sm:text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
          {faq.q}
        </span>
        {open ? (
          <ChevronUp size={16} className="text-[#f5c242] flex-shrink-0 ml-2" />
        ) : (
          <ChevronDown size={16} className="text-white/40 flex-shrink-0 ml-2" />
        )}
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="px-5 sm:px-6 pb-4 text-xs sm:text-sm text-white/50 leading-relaxed">{faq.a}</p>
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
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const inputClass = (field: string) =>
    `w-full bg-[#111] border rounded-xl px-4 py-3 text-white text-xs sm:text-sm placeholder:text-white/30 outline-none transition-all duration-300 focus:border-[#f5c242]/50 focus:shadow-[0_0_15px_rgba(245,194,66,0.1)] ${
      errors[field] ? "border-[#d62828]/60" : "border-white/10"
    }`;

  return (
    <div className="pt-24 sm:pt-28 md:pt-32">
      {/* Hero */}
      <section className="relative min-h-fit py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0805] to-[#050505]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[300px] sm:h-[400px] rounded-full bg-[#ff7a18]/4 blur-[100px] sm:blur-[140px]" />
        <div className="grid-lines absolute inset-0 opacity-15" />
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[#f5c242]/70 font-semibold block mb-3 sm:mb-4"
          >
            Get In Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6 leading-tight"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Let&apos;s Build Something{" "}
            <span className="gradient-text">Amazing</span>
            <br />
            Together
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-white/60 text-sm sm:text-base md:text-lg max-w-xl mx-auto"
          >
            Whether you want to collaborate, commission work, join the team, or just say hello —
            we&apos;d love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form */}
          <div ref={formRef} className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="glass rounded-2xl p-6 sm:p-8 border border-white/5"
            >
              {submitted ? (
                <div className="text-center py-10 sm:py-14">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="text-5xl sm:text-6xl mb-4"
                  >
                    🎮
                  </motion.div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-3" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    Message Received!
                  </h3>
                  <p className="text-white/60 text-xs sm:text-sm mb-4">We&apos;ll get back to you soon. The adventure continues...</p>
                  <p className="font-tamil text-[#f5c242] tamil-glow text-lg sm:text-xl">சடுகுடு தொடங்கட்டும்!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h2 className="text-lg sm:text-xl font-black text-white mb-6" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    Send a Message
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className={inputClass("name")}
                      />
                      {errors.name && <p className="text-[#d62828] text-[11px] mt-1">{errors.name}</p>}
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
                      {errors.email && <p className="text-[#d62828] text-[11px] mt-1">{errors.email}</p>}
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
                    {errors.subject && <p className="text-[#d62828] text-[11px] mt-1">{errors.subject}</p>}
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
                    {errors.message && <p className="text-[#d62828] text-[11px] mt-1">{errors.message}</p>}
                  </div>
                  <button
                    id="contact-submit"
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-xl font-bold text-black text-sm sm:text-base bg-gradient-to-r from-[#ff7a18] to-[#f5c242] hover:shadow-[0_0_25px_rgba(245,194,66,0.4)] transition-all duration-300 disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={16} />
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
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-2 space-y-4 sm:space-y-5"
          >
            {/* Info cards */}
            {[
              { icon: MapPin, label: "Location", value: "Madurai, Tamil Nadu, India", color: "#d62828" },
              { icon: Mail, label: "Email", value: "hello@sadugudustudios.com", color: "#f5c242" },
              { icon: Clock, label: "Business Hours", value: "Mon–Sat: 10 AM – 7 PM IST", color: "#ff7a18" },
            ].map((info) => (
              <div key={info.label} className="glass rounded-xl p-4 sm:p-5 border border-white/5 flex items-start gap-3.5">
                <div
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${info.color}15`, border: `1px solid ${info.color}25` }}
                >
                  <info.icon size={17} style={{ color: info.color }} />
                </div>
                <div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest mb-0.5 font-semibold">{info.label}</div>
                  <div className="text-xs sm:text-sm text-white/80 font-medium">{info.value}</div>
                </div>
              </div>
            ))}

            {/* Social links */}
            <div className="glass rounded-xl p-4 sm:p-5 border border-white/5">
              <div className="text-[10px] text-white/40 uppercase tracking-widest mb-3 font-semibold">Follow Us</div>
              <div className="grid grid-cols-3 gap-2.5">
                {socials.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    title={s.label}
                    className="flex flex-col items-center justify-center gap-1 glass rounded-lg p-2.5 border border-white/5 hover:border-white/15 transition-all duration-200 group text-center"
                  >
                    <s.icon size={16} className="text-white/50 group-hover:text-white transition-colors" />
                    <span className="text-[9px] sm:text-[10px] text-white/40 group-hover:text-white/70 truncate w-full">{s.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Map embed */}
            <div className="glass rounded-xl overflow-hidden border border-white/5 h-44 sm:h-48">
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
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-20 max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="text-[11px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[#f5c242]/70 font-semibold block mb-3">
            FAQ
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Common <span className="gradient-text">Questions</span>
          </h2>
        </motion.div>
        <div className="glass rounded-2xl p-2 sm:p-3 border border-white/5">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
