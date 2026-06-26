import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate } from 'framer-motion';
import { ArrowRight, Download, Mail, Check, Eye } from 'lucide-react';

const Cursor = () => (
  <motion.span
    initial={{ opacity: 1 }}
    animate={{ opacity: [1, 0, 1] }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: "steps(2, start)"
    }}
    className="ml-1 inline-block font-sans font-normal text-slate-400 select-none"
  >
    |
  </motion.span>
);

const LinkedinIcon = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Hero = ({ onViewResume }) => {
  const [downloadState, setDownloadState] = useState('idle'); // idle, downloading, success

  const line1Full = "Hi, I'm Raviraj Choughule";
  const line2Full = "Java Full Stack Developer";

  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [phase, setPhase] = useState("typing1"); // typing1, typing2, deleting2, deleting1

  useEffect(() => {
    let timer;
    if (phase === "typing1") {
      timer = setTimeout(() => {
        if (line1.length < line1Full.length) {
          setLine1(line1Full.substring(0, line1.length + 1));
        } else {
          setPhase("typing2");
        }
      }, 60);
    } else if (phase === "typing2") {
      timer = setTimeout(() => {
        if (line2.length < line2Full.length) {
          setLine2(line2Full.substring(0, line2.length + 1));
        } else {
          setPhase("deleting2");
        }
      }, 60);
    } else if (phase === "deleting2") {
      timer = setTimeout(() => {
        if (line2.length > 0) {
          setLine2(line2.substring(0, line2.length - 1));
        } else {
          setPhase("deleting1");
        }
      }, 30);
    } else if (phase === "deleting1") {
      timer = setTimeout(() => {
        if (line1.length > 0) {
          setLine1(line1.substring(0, line1.length - 1));
        } else {
          setPhase("typing1");
        }
      }, 30);
    }
    return () => clearTimeout(timer);
  }, [line1, line2, phase]);

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

  // 3D Parallax Mouse Tracking (Profile Photo)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    // Normalized values from -0.5 to 0.5
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    // Scale up for pixel movements
    mouseX.set(x * 300);
    mouseY.set(y * 300);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Spring animations for smooth tilt transitions
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-10, 10]), springConfig);

  // Dynamic light gloss reflect positions
  const glossX = useSpring(useTransform(mouseX, [-150, 150], ['20%', '80%']), springConfig);
  const glossY = useSpring(useTransform(mouseY, [-150, 150], ['20%', '80%']), springConfig);

  const glossTemplate = useMotionTemplate`radial-gradient(circle 180px at ${glossX} ${glossY}, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)`;

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center px-6 md:px-12 lg:px-24 pt-20 bg-[#050507] overflow-hidden"
    >
      <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        
        {/* Left Column: Heading and Info (lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left order-2 lg:order-1">
          {/* Status Badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, cubicBezier: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-2.5 mb-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold tracking-wide shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)] w-fit select-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              🟢 Open To Opportunities
            </div>
            <p className="text-slate-400 text-xs sm:text-sm font-mono mt-1 leading-relaxed max-w-xl">
              Available for Full Stack Developer, Java Developer, Internship and Entry-Level Opportunities.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, cubicBezier: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block font-mono text-xs tracking-widest text-slate-500 uppercase mb-4 min-h-[16px]">
              {line1.substring(0, 8)}
              {line1.length > 8 && (
                <span 
                  className="gradient-text-animated gradient-hover-glow font-bold cursor-default select-none"
                  style={{ fontSize: '1.3em' }}
                >
                  {line1.substring(8)}
                </span>
              )}
              {(phase === 'typing1' || phase === 'deleting1') && <Cursor />}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, cubicBezier: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] mb-2"
          >
            <span className="heading-theme-gradient">{line2 || "\u200B"}</span>
            {(phase === 'typing2' || phase === 'deleting2') && <Cursor />} <br />
            <span className="text-slate-400 font-sans text-xl sm:text-2xl font-normal tracking-wide block mt-3 max-w-2xl leading-relaxed">
              Computer Engineering Graduate
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, cubicBezier: [0.16, 1, 0.3, 1] }}
            className="mt-6 space-y-4 max-w-xl text-base sm:text-lg leading-relaxed text-slate-400 font-sans"
          >
            <p className="font-semibold text-slate-300">
              Passionate Full Stack Developer with a strong foundation in modern web technologies and a growing specialization in Java development.
            </p>
            <p className="text-sm text-slate-400">
              A Computer Engineering Graduate and Full Stack Developer passionate about building modern, scalable and user-friendly web applications.
            </p>
            <p className="text-sm text-slate-400 border-l-2 border-[#0ea5e9]/50 pl-3">
              Currently learning Core Java and preparing for a professional career in Java and Advanced Java Development.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, cubicBezier: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap gap-4 items-center"
          >
            <a
              href="#projects"
              className="btn-primary group h-[48px] px-6 text-sm font-semibold rounded-lg"
            >
              View Projects
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>

            {/* Premium red -> pink gradient Download Resume with magnetic effect */}
            <motion.button
              onClick={handleDownloadResume}
              onMouseMove={handleBtnMouseMove}
              onMouseLeave={handleBtnMouseLeave}
              style={{
                x: btnDx,
                y: btnDy,
              }}
              className="btn-resume-download flex items-center gap-2 select-none hover:scale-102 hover:shadow-[0_10px_25px_-5px_rgba(236,72,153,0.5)] transition-transform duration-300"
            >
              {downloadState === 'success' ? (
                <>
                  <Check size={15} className="text-emerald-200" /> Downloaded!
                </>
              ) : (
                <>
                  <Download size={15} className={downloadState === 'downloading' ? 'animate-bounce' : ''} />
                  {downloadState === 'downloading' ? 'Downloading...' : 'Download Resume'}
                </>
              )}
            </motion.button>

            {/* Fullscreen View Resume Button */}
            <button
              onClick={onViewResume}
              className="btn-border-gradient flex items-center gap-2 h-[48px] px-6 text-sm font-semibold rounded-lg"
            >
              <Eye size={15} /> View Resume
            </button>

            <a
              href="#contact"
              className="btn-border-gradient flex items-center gap-2 h-[48px] px-6 text-sm font-semibold rounded-lg"
            >
              <Mail size={15} /> Contact Me
            </a>

            <a
              href="https://www.linkedin.com/in/raviraj-choughule-559885272/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-linkedin flex items-center gap-2"
            >
              <LinkedinIcon size={16} /> Connect on LinkedIn
            </a>
          </motion.div>

          {/* Status Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, cubicBezier: [0.16, 1, 0.3, 1] }}
            className="mt-10 w-full max-w-3xl flex flex-wrap gap-x-4 gap-y-2.5 items-center select-none"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-white/3 border border-white/5 px-3.5 py-2 rounded-full">
              <span>🚀</span> <span className="font-bold">5+ Projects Built</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-white/3 border border-white/5 px-3.5 py-2 rounded-full">
              <span>🏆</span> <span className="font-bold">10+ Certifications</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-white/3 border border-white/5 px-3.5 py-2 rounded-full">
              <span>💼</span> <span className="font-bold">3-Month Internship</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-white/3 border border-white/5 px-3.5 py-2 rounded-full">
              <span>☕</span> <span className="font-bold">Currently Learning Core Java</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Premium Interactive Profile Image (lg:col-span-5) */}
        <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.1, cubicBezier: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[400px] aspect-square relative flex justify-center items-center group animate-float-slow"
          >
            {/* Subtle glow radial background behind the profile photo */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0ea5e9]/10 via-[#9d4edd]/5 to-transparent rounded-full blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
            
            {/* 3D Tilt interactive frame */}
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
              }}
              className="relative w-full h-full rounded-full p-2 bg-gradient-to-tr from-white/10 via-white/5 to-white/10 border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-md transition-shadow duration-500 group-hover:shadow-[0_25px_70px_-10px_rgba(14,165,233,0.15)] flex items-center justify-center cursor-pointer"
            >
              {/* Circular Inner Frame */}
              <div 
                className="w-full h-full rounded-full overflow-hidden relative border border-white/5 bg-[#0b0b0e]"
                style={{ transform: "translateZ(30px)" }}
              >
                <img
                  src="/assets/profile.jpg"
                  alt="Raviraj Choughule Profile"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-103"
                  style={{ transformStyle: "preserve-3d" }}
                />

                {/* Gloss reflection overlay overlaying the image */}
                <motion.div
                  style={{
                    background: glossTemplate
                  }}
                  className="absolute inset-0 rounded-full pointer-events-none mix-blend-overlay"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 select-none">
        <a 
          href="#projects" 
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/3 border border-white/5 backdrop-blur-sm text-slate-400 hover:text-white transition-all duration-300 hover:bg-white/5 hover:border-white/10 cursor-pointer pointer-events-auto shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
        >
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-2"
          >
            <span className="text-sm font-bold">↓</span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
              Explore My Work
            </span>
          </motion.div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
