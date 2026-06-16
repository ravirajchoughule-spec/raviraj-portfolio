import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';

const GithubIcon = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-container border-t border-white/5 py-12 px-6 md:px-12 lg:px-24">
      <div className="mx-auto w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo and Branding Block */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
          <a href="#home" className="group/badge inline-block relative">
            {/* Ambient backlight glow on hover (only visible in dark theme via blur-lg hide rules) */}
            <div className="absolute -inset-1 rounded-[22px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-0 group-hover/badge:opacity-30 blur-lg transition-all duration-500 pointer-events-none" />
            <div className="footer-logo-badge">
              <span className="footer-logo-text-redesign select-none">RC</span>
            </div>
          </a>
          
          <div className="space-y-1">
            <h4 className="font-display text-base font-extrabold text-white tracking-tight">
              Raviraj Choughule
            </h4>
            <p className="text-[10px] font-mono tracking-widest text-slate-400 font-semibold uppercase">
              Java Full Stack Developer
            </p>
            <p className="footer-slogan text-xs font-semibold select-none leading-none pt-1.5 pb-1 block">
              Building Ideas Into Digital Solutions.
            </p>
            <p className="text-[11px] footer-copy-text pt-2 font-sans">
              © {new Date().getFullYear()} Raviraj Chougule. All rights reserved.
            </p>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex gap-5">
          {[
            { icon: <GithubIcon size={20} />, href: 'https://github.com/ravirajchoughule-spec', className: 'footer-social-github' },
            { icon: <LinkedinIcon size={20} />, href: 'https://www.linkedin.com/in/raviraj-choughule-559885272/', className: 'footer-social-linkedin' },
            { icon: <Mail size={20} />, href: 'mailto:ravirajchoughule@gmail.com', className: 'footer-social-email' },
          ].map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              target="_blank"
              rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className={`p-3 rounded-xl border transition-all duration-300 ${social.className}`}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex h-10 w-10 items-center justify-center rounded-lg border transition-all duration-300 cursor-pointer"
          aria-label="Back to top"
        >
          <ArrowUp size={16} />
        </button>

      </div>
    </footer>
  );
};

export default Footer;
