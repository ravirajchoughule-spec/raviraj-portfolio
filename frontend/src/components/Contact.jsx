import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Download, Check, Eye, Mail, Phone, X } from 'lucide-react';
import emailjs from '@emailjs/browser';

const GithubIcon = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Contact = ({ onViewResume }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [downloadState, setDownloadState] = useState('idle');
  const [honeypot, setHoneypot] = useState('');
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const [toast, setToast] = useState({ show: false, type: 'success', message: '' });

  const showToastMessage = (type, message) => {
    setToast({ show: true, type, message });
  };

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, type: 'success', message: '' });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const handleDownloadResume = (e) => {
    if (e) e.preventDefault();
    setDownloadState('downloading');

    const link = document.createElement('a');
    link.href = '/assets/Raviraj_Choughule_Resume.pdf';
    link.download = 'Raviraj_Choughule_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloadState('success');
      setTimeout(() => {
        setDownloadState('idle');
      }, 2000);
    }, 800);
  };

  // Button Magnetic Mouse Tracking
  const btnX = useMotionValue(0);
  const btnY = useMotionValue(0);
  const btnSpringConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const btnDx = useSpring(btnX, btnSpringConfig);
  const btnDy = useSpring(btnY, btnSpringConfig);

  const handleBtnMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    btnX.set(distanceX * 0.35);
    btnY.set(distanceY * 0.35);
  };

  const handleBtnMouseLeave = () => {
    btnX.set(0);
    btnY.set(0);
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Invalid email format";
    }
    if (!formData.subject.trim()) tempErrors.subject = "Subject is required";
    if (!formData.message.trim()) tempErrors.message = "Message is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const newErrors = { ...errors };
    if (newErrors[name]) delete newErrors[name];
    if (newErrors.submit) delete newErrors.submit;
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Spam protection: Honeypot
    if (honeypot.trim()) {
      setStatus('loading');
      setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setHoneypot('');
        showToastMessage('success', 'Thank you for contacting Raviraj Choughule. Your message has been sent successfully.');
      }, 1000);
      return;
    }

    // Spam protection: Cooldown (10s)
    const now = Date.now();
    if (now - lastSubmitTime < 10000) {
      setErrors({ ...errors, submit: "Please wait a few seconds before sending another message." });
      showToastMessage('error', 'Rate limit: Please wait a few seconds.');
      return;
    }

    if (!validate()) {
      showToastMessage('error', 'Please fill in all required fields correctly.');
      return;
    }

    setStatus('loading');
    setLastSubmitTime(now);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // EmailJS debugging logs
    console.log("Service ID:", serviceId);
    console.log("Template ID:", templateId);
    console.log("Public Key:", publicKey);

    emailjs.send(
      serviceId,
      templateId,
      {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        date_time: new Date().toLocaleString()
      },
      publicKey
    )
    .then((res) => {
      console.log("EmailJS delivered successfully:", res.status, res.text);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      showToastMessage('success', 'Thank you for contacting Raviraj Choughule. Your message has been sent successfully.');
    })
    .catch((err) => {
      console.error("EmailJS delivery error:", err);
      setStatus('error');
      showToastMessage('error', 'Failed to send message. Please try again.');
    });
  };

  return (
    <section id="contact" className="relative py-24 px-6 md:px-12 lg:px-24 bg-[#050507]">
      <div className="mx-auto max-w-7xl w-full">
        
        {/* Section Title */}
        <div className="mb-16 md:mb-24 text-left">
          <span className="font-mono text-xs text-slate-500 tracking-widest uppercase block mb-3">05 // CONTACT</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight heading-underline">
            Let's Build Something Impactful
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-sans mt-4 max-w-3xl leading-relaxed">
            Have a project, opportunity or collaboration in mind? Feel free to reach out.
          </p>
        </div>

        {/* Form Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            <h3 className="font-display text-2xl font-bold text-white mb-6">
              Let's connect.
            </h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-sans mb-10">
              Feel free to reach out if you're looking for a developer, have a project proposal, or just want to chat about software architecture. I'll get back to you within 24 hours.
            </p>

            {/* Clickable Glassmorphic Cards Stack */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 mb-8">
              {[
                {
                  type: 'mail',
                  label: 'Direct Mail',
                  value: 'ravirajchoughule@gmail.com',
                  href: 'mailto:ravirajchoughule@gmail.com',
                  icon: Mail,
                  ringHover: 'var(--icon-mail-color)',
                  glow: 'var(--icon-mail-glow)',
                  iconBg: 'var(--icon-mail-bg)',
                  iconColor: 'var(--icon-mail-color)'
                },
                {
                  type: 'phone',
                  label: 'Call / WhatsApp',
                  value: '+91 70382 65056',
                  href: 'https://wa.me/917038265056',
                  icon: Phone,
                  ringHover: 'var(--icon-phone-color)',
                  glow: 'var(--icon-phone-glow)',
                  iconBg: 'var(--icon-phone-bg)',
                  iconColor: 'var(--icon-phone-color)'
                },
                {
                  type: 'linkedin',
                  label: 'LinkedIn',
                  value: 'linkedin.com/in/raviraj-choughule',
                  href: 'https://www.linkedin.com/in/raviraj-choughule-559885272/',
                  icon: LinkedinIcon,
                  ringHover: 'var(--icon-linkedin-color)',
                  glow: 'var(--icon-linkedin-glow)',
                  iconBg: 'var(--icon-linkedin-bg)',
                  iconColor: 'var(--icon-linkedin-color)'
                },
                {
                  type: 'github',
                  label: 'GitHub',
                  value: 'github.com/ravirajchoughule-spec',
                  href: 'https://github.com/ravirajchoughule-spec',
                  icon: GithubIcon,
                  ringHover: 'var(--icon-github-color)',
                  glow: 'var(--icon-github-glow)',
                  iconBg: 'var(--icon-github-bg)',
                  iconColor: 'var(--icon-github-color)'
                }

              ].map((card, idx) => {
                const Icon = card.icon;
                const isHovered = hoveredIdx === idx;
                return (
                  <a
                    key={idx}
                    href={card.href}
                    target={card.type !== 'mail' ? '_blank' : undefined}
                    rel={card.type !== 'mail' ? 'noopener noreferrer' : undefined}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className="group relative flex items-center gap-4 p-4 rounded-xl glass-card transition-all duration-300 shadow-lg cursor-pointer"
                    style={{
                      borderColor: isHovered ? card.ringHover : 'var(--card-border)',
                      boxShadow: isHovered ? `0 0 20px -3px ${card.glow}` : 'none',
                    }}
                  >
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg border transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: card.iconBg,
                        borderColor: isHovered ? card.ringHover : 'var(--card-border)',
                        color: card.iconColor,
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">{card.label}</p>
                      <p className="text-xs sm:text-sm font-semibold text-slate-200 mt-0.5 group-hover:text-white transition-colors">
                        {card.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Curriculum Vitae Section */}
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">CURRICULUM VITAE</p>
              <div className="flex flex-wrap gap-3 mt-2">
                <motion.button
                  onClick={handleDownloadResume}
                  onMouseMove={handleBtnMouseMove}
                  onMouseLeave={handleBtnMouseLeave}
                  style={{
                    x: btnDx,
                    y: btnDy,
                  }}
                  className="btn-resume-download text-xs h-9 px-4 font-semibold select-none flex items-center gap-1.5 hover:scale-102 transition-transform cursor-pointer"
                >
                  {downloadState === 'success' ? (
                    <>
                      <Check size={12} className="text-emerald-200" /> Saved!
                    </>
                  ) : (
                    <>
                      <Download size={12} className={downloadState === 'downloading' ? 'animate-bounce' : ''} />
                      {downloadState === 'downloading' ? 'Saving...' : 'Download Resume'}
                    </>
                  )}
                </motion.button>

                <button
                  onClick={onViewResume}
                  className="btn-border-gradient text-xs h-9 px-4 font-semibold rounded-lg flex items-center gap-1.5"
                  type="button"
                >
                  <Eye size={12} /> View Resume
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Sleek Form */}
          <div className="lg:col-span-7 w-full">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Honeypot field (Spam protection) */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ display: 'none' }}
                tabIndex="-1"
                autoComplete="off"
              />

              {/* Rate Limit/Cooldown error */}
              {errors.submit && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-lg border border-amber-500/10 bg-amber-500/2 px-4 py-3.5 text-xs font-semibold text-amber-400 font-mono"
                >
                  <AlertCircle size={14} className="flex-shrink-0" />
                  <span>{errors.submit}</span>
                </motion.div>
              )}

              {/* Name Input */}
              <div className="flex flex-col text-left">
                <label htmlFor="name" className="contact-form-label text-[10px] font-bold uppercase tracking-wider font-mono mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Full Name"
                  className="w-full contact-form-input rounded-lg px-4 py-3 text-base outline-none transition-all duration-300 font-sans"
                />
                {errors.name && (
                  <span className="flex items-center gap-1 text-[10px] text-red-500 font-mono font-bold mt-2">
                    <AlertCircle size={10} className="flex-shrink-0" /> {errors.name}
                  </span>
                )}
              </div>

              {/* Email Input */}
              <div className="flex flex-col text-left">
                <label htmlFor="email" className="contact-form-label text-[10px] font-bold uppercase tracking-wider font-mono mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email Address"
                  className="w-full contact-form-input rounded-lg px-4 py-3 text-base outline-none transition-all duration-300 font-sans"
                />
                {errors.email && (
                  <span className="flex items-center gap-1 text-[10px] text-red-500 font-mono font-bold mt-2">
                    <AlertCircle size={10} className="flex-shrink-0" /> {errors.email}
                  </span>
                )}
              </div>

              {/* Subject Input */}
              <div className="flex flex-col text-left">
                <label htmlFor="subject" className="contact-form-label text-[10px] font-bold uppercase tracking-wider font-mono mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter Subject"
                  className="w-full contact-form-input rounded-lg px-4 py-3 text-base outline-none transition-all duration-300 font-sans"
                />
                {errors.subject && (
                  <span className="flex items-center gap-1 text-[10px] text-red-500 font-mono font-bold mt-2">
                    <AlertCircle size={10} className="flex-shrink-0" /> {errors.subject}
                  </span>
                )}
              </div>

              {/* Message Input */}
              <div className="flex flex-col text-left">
                <label htmlFor="message" className="contact-form-label text-[10px] font-bold uppercase tracking-wider font-mono mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Let's build something impactful.........."
                  className="w-full contact-form-input rounded-lg px-4 py-3 text-base outline-none transition-all duration-300 font-sans resize-none"
                />
                {errors.message && (
                  <span className="flex items-center gap-1 text-[10px] text-red-500 font-mono font-bold mt-2">
                    <AlertCircle size={10} className="flex-shrink-0" /> {errors.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full btn-primary font-mono font-bold tracking-widest text-xs h-[52px] rounded-lg mt-4 cursor-pointer"
              >
                {status === 'loading' ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                    <span>Sending Message...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>Send Message</span>
                    <Send size={14} />
                  </div>
                )}
              </button>

              {/* Status Banner */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-lg border border-emerald-500/10 bg-emerald-500/2 px-4 py-3.5 text-xs font-semibold text-emerald-400 font-mono"
                >
                  <CheckCircle2 size={14} className="flex-shrink-0" />
                  <span>Thank you for contacting Raviraj Choughule. Your message has been sent successfully.</span>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-lg border border-red-500/10 bg-red-500/2 px-4 py-3.5 text-xs font-semibold text-red-400 font-mono"
                >
                  <AlertCircle size={14} className="flex-shrink-0" />
                  <span>Something went wrong. Please try again later.</span>
                </motion.div>
              )}
            </form>
          </div>


        </div>

      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 py-4 rounded-xl border backdrop-blur-md shadow-2xl ${
              toast.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0 animate-pulse" />
            ) : (
              <AlertCircle size={18} className="text-red-400 flex-shrink-0 animate-pulse" />
            )}
            <div className="flex flex-col text-left">
              <span className="font-mono text-[9px] font-bold uppercase tracking-wider opacity-60">
                {toast.type === 'success' ? 'SUCCESS' : 'ERROR'}
              </span>
              <span className="text-xs font-semibold font-sans mt-0.5 leading-snug">
                {toast.message}
              </span>
            </div>
            <button
              onClick={() => setToast({ show: false, type: 'success', message: '' })}
              className="ml-4 text-slate-400 hover:text-white transition-colors"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
