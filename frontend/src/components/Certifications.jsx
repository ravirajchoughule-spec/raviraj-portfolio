import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, FileText, Code, GraduationCap, Download, Eye, ZoomIn, ZoomOut, Maximize2, Minimize2, ChevronLeft, ChevronRight, X, Calendar, Building, Sparkles } from 'lucide-react';

const certificatesData = [
  {
    id: 3,
    name: "Internship Completion Letter",
    org: "A2Z IT HUB Pvt. Ltd.",
    date: "May 15, 2026",
    category: "Internship Credentials",
    pdf: "/assets/certificates/a2z-internship-completion.pdf",
    description: "Successfully completed a 3-Month Full Stack Web Developer Internship and gained hands-on experience working on real-world software projects including Medical Billing Software and modern web applications.",
    color: "#6366f1",
    featured: true
  },
  {
    id: 2,
    name: "Internship Joining Letter",
    org: "A2Z IT HUB Pvt. Ltd.",
    date: "Feb 12, 2026",
    category: "Internship Credentials",
    pdf: "/assets/certificates/a2z-internship-joining.pdf",
    description: "Formal joining and acceptance letter for industrial training in Full Stack Web Development.",
    color: "#3b82f6"
  },
  {
    id: 1,
    name: "Internship Offer Letter",
    org: "A2Z IT HUB Pvt. Ltd.",
    date: "Feb 10, 2026",
    category: "Internship Credentials",
    pdf: "/assets/certificates/a2z-internship-offer.pdf",
    description: "Official internship appointment letter confirming selection as a Full Stack Web Developer Intern.",
    color: "#a855f7"
  },
  {
    id: 10,
    name: "Full Stack Development Certificate",
    org: "iBase Electrosoft LLP",
    date: "Oct 03, 2025",
    category: "Technical Skill Certifications",
    pdf: "/assets/certificates/ibase-internship-certificate.pdf",
    description: "Successfully completed a Web Development Internship and gained practical experience in modern web development technologies.",
    color: "#f43f5e"
  },
  {
    id: 9,
    name: "Node.js Certificate",
    org: "A2Z IT HUB Pvt. Ltd.",
    date: "Apr 24, 2026",
    category: "Technical Skill Certifications",
    pdf: "/assets/certificates/a2z-express-certificate.pdf",
    description: "Completed Node.js backend development training covering server-side programming, APIs, and databases.",
    color: "#10b981"
  },
  {
    id: 11,
    name: "Express.js Certificate",
    org: "A2Z IT HUB Pvt. Ltd.",
    date: "Apr 24, 2026",
    category: "Technical Skill Certifications",
    pdf: "/assets/certificates/a2z-express-certificate.pdf",
    description: "Completed professional Express.js training covering RESTful routing, middleware, and backend architectures.",
    color: "#10b981"
  },
  {
    id: 7,
    name: "JavaScript Certificate",
    org: "A2Z IT HUB Pvt. Ltd.",
    date: "Nov 14, 2025",
    category: "Technical Skill Certifications",
    pdf: "/assets/certificates/a2z-javascript-certificate.pdf",
    description: "Completed JavaScript training including DOM manipulation, ES6 concepts and frontend application logic.",
    color: "#f59e0b"
  },
  {
    id: 6,
    name: "Bootstrap Certificate",
    org: "A2Z IT HUB Pvt. Ltd.",
    date: "Oct 03, 2025",
    category: "Technical Skill Certifications",
    pdf: "/assets/certificates/a2z-bootstrap-certificate.pdf",
    description: "Learned modern responsive frontend development using Bootstrap framework and component systems.",
    color: "#d946ef"
  },
  {
    id: 4,
    name: "HTML Certificate",
    org: "A2Z IT HUB Pvt. Ltd.",
    date: "Aug 19, 2025",
    category: "Technical Skill Certifications",
    pdf: "/assets/certificates/a2z-html-certificate.pdf",
    description: "Completed professional HTML training covering website structure, semantic elements and responsive web development.",
    color: "#f97316"
  },
  {
    id: 5,
    name: "CSS Certificate",
    org: "A2Z IT HUB Pvt. Ltd.",
    date: "Sep 20, 2025",
    category: "Technical Skill Certifications",
    pdf: "/assets/certificates/a2z-css-certificate.pdf",
    description: "Completed advanced CSS training covering layouts, animations, responsive design and UI styling.",
    color: "#06b6d4"
  },
  {
    id: 8,
    name: "jQuery Certificate",
    org: "A2Z IT HUB Pvt. Ltd.",
    date: "Nov 28, 2025",
    category: "Technical Skill Certifications",
    pdf: "/assets/certificates/a2z-jquery-certificate.pdf",
    description: "Learned dynamic web interactions, event handling and AJAX using jQuery.",
    color: "#0ea5e9"
  }
];

const CertificateMiniPreview = ({ cert }) => {
  return (
    <div className="relative w-full aspect-[1.414/1] overflow-hidden rounded-lg bg-[var(--cert-preview-bg,#0d0d11)] border border-[var(--cert-preview-border,rgba(255,255,255,0.08))] p-4 flex flex-col justify-between select-none">
      {/* Background radial highlight */}
      <div 
        className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-2xl opacity-10 pointer-events-none"
        style={{ backgroundColor: cert.color }}
      />
      {/* Elegant security borders */}
      <div className="absolute inset-1.5 border border-[var(--cert-preview-border,rgba(255,255,255,0.05))] rounded pointer-events-none" />
      <div 
        className="absolute inset-2 border border-dashed rounded pointer-events-none" 
        style={{ borderColor: `${cert.color}15` }}
      />
      
      {/* Certificate Header */}
      <div className="flex justify-between items-start z-10">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-[var(--cert-preview-border,rgba(255,255,255,0.05))] flex items-center justify-center border border-[var(--cert-preview-border,rgba(255,255,255,0.08))]">
            <Award size={8} style={{ color: cert.color }} />
          </div>
          <span className="font-mono text-[7px] text-[var(--cert-preview-subtext,#94a3b8)] font-bold uppercase tracking-wider">{cert.org}</span>
        </div>
        <span className="font-mono text-[6px] text-[var(--cert-preview-subtext,#94a3b8)] font-medium tracking-widest">{cert.date}</span>
      </div>

      {/* Certificate Body */}
      <div className="text-center my-auto flex flex-col items-center justify-center z-10">
        <span className="font-mono text-[5px] text-[var(--cert-preview-subtext,#94a3b8)] uppercase tracking-widest font-bold mb-0.5">CERTIFICATE OF TRAINING</span>
        <p className="text-[11px] font-semibold text-[var(--cert-preview-text,#ffffff)] tracking-tight font-display mb-1 leading-none">{cert.name}</p>
        <span className="text-[5px] text-[var(--cert-preview-subtext,#94a3b8)] font-sans italic mb-0.5">is proudly awarded to</span>
        <h4 className="text-[9px] font-bold font-display tracking-wider uppercase leading-none mb-1 text-[var(--cert-preview-text,#ffffff)]">Raviraj Ashru Choughule</h4>
        <p className="text-[5.5px] text-[var(--cert-preview-subtext,#94a3b8)] max-w-[85%] leading-normal font-sans line-clamp-1">{cert.description}</p>
      </div>

      {/* Certificate Footer */}
      <div className="flex justify-between items-end border-t border-[var(--cert-preview-border,rgba(255,255,255,0.05))] pt-1.5 z-10">
        <div className="flex flex-col items-start gap-0.5">
          <span className="font-mono text-[5px] text-[var(--cert-preview-subtext,#94a3b8)] font-semibold uppercase">VERIFIED STATUS</span>
          <div className="flex gap-0.5 items-center">
            <div className="w-1 h-1 rounded-full bg-emerald-500/25 flex items-center justify-center">
              <div className="w-0.5 h-0.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <span className="text-[4.5px] font-mono text-emerald-400">ONLINE CONFIRMED</span>
          </div>
        </div>
        
        {/* Dynamic Seal */}
        <div className="relative w-5 h-5 flex items-center justify-center select-none">
          <div 
            className="absolute inset-0 rounded-full border opacity-20" 
            style={{ borderColor: cert.color, backgroundColor: `${cert.color}05` }}
          />
          <Award size={9} style={{ color: cert.color }} />
        </div>
      </div>
    </div>
  );
};

const Certifications = () => {
  const [activeLightboxCert, setActiveLightboxCert] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isLightboxFullscreen, setIsLightboxFullscreen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const featuredCert = certificatesData.find(c => c.id === 3) || certificatesData[0];

  // Lightbox navigation index
  const currentCertIdx = activeLightboxCert 
    ? certificatesData.findIndex(c => c.id === activeLightboxCert.id) 
    : -1;

  const handlePrevCert = () => {
    if (currentCertIdx > 0) {
      setActiveLightboxCert(certificatesData[currentCertIdx - 1]);
      setZoomLevel(1);
    } else {
      // Wrap around
      setActiveLightboxCert(certificatesData[certificatesData.length - 1]);
      setZoomLevel(1);
    }
  };

  const handleNextCert = () => {
    if (currentCertIdx < certificatesData.length - 1) {
      setActiveLightboxCert(certificatesData[currentCertIdx + 1]);
      setZoomLevel(1);
    } else {
      // Wrap around
      setActiveLightboxCert(certificatesData[0]);
      setZoomLevel(1);
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeLightboxCert) {
        if (e.key === 'ArrowLeft') handlePrevCert();
        if (e.key === 'ArrowRight') handleNextCert();
        if (e.key === 'Escape') {
          setActiveLightboxCert(null);
          setZoomLevel(1);
        }
      } else if (isModalOpen) {
        if (e.key === 'Escape') {
          setIsModalOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxCert, isModalOpen, currentCertIdx]);

  // Prevent parent scroll
  useEffect(() => {
    if (activeLightboxCert || isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeLightboxCert, isModalOpen]);

  return (
    <section id="certificates" className="relative py-24 px-6 md:px-12 lg:px-24 bg-[#050507]">
      <div className="mx-auto max-w-7xl w-full relative z-10">
        
        {/* Section Heading */}
        <div className="mb-16 md:mb-20 text-center">
          <span className="font-mono text-xs text-slate-500 tracking-widest uppercase block mb-3">05 // CREDENTIAL PORTFOLIO</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight heading-underline">
            Certifications & Achievements
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-sans mt-4 max-w-3xl mx-auto leading-relaxed">
            Technical certifications, internship credentials and professional learning milestones.
          </p>
        </div>

        {/* Homepage Layout: Large Premium Featured Certificate Card */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="cert-card-container group">
            <div className="cert-card-inner flex flex-col md:flex-row gap-6 md:gap-10 items-center">
              {/* Left Column: Visual Miniature Preview */}
              <div className="w-full md:w-[45%] max-w-sm flex-shrink-0 relative">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 opacity-25 blur-lg group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />
                <div className="relative rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] border border-white/5">
                  <CertificateMiniPreview cert={featuredCert} />
                </div>
              </div>

              {/* Right Column: Information Panel */}
              <div className="flex-1 text-left space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                    ⭐ Featured Achievement
                  </span>
                </div>
                
                <h3 className="cert-card-title font-display text-xl md:text-2xl font-extrabold tracking-tight leading-tight">
                  {featuredCert.name}
                </h3>
                
                <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5"><Building size={14} /> {featuredCert.org}</span>
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> Issued: {featuredCert.date}</span>
                </div>
                
                <p className="cert-card-desc text-sm leading-relaxed font-sans">
                  {featuredCert.description}
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => setActiveLightboxCert(featuredCert)}
                    className="btn-primary text-xs h-10 px-6 cursor-pointer flex items-center gap-2"
                  >
                    <Eye size={14} /> View Certificate
                  </button>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-border-gradient text-xs h-10 px-6 cursor-pointer flex items-center gap-2"
                  >
                    <Award size={14} /> View All Certificates
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* FULLSCREEN GALLERY MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-[#050507]/98 backdrop-blur-md overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-white/5 dark:border-slate-800 bg-[#0d0d11]/80 backdrop-blur-sm sticky top-0 z-30">
              <div className="text-left">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Credential Gallery
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm font-sans mt-1">
                  A complete collection of my verified training certificates and internship credentials.
                </p>
              </div>
              
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                title="Close Gallery"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content - Grid of 11 certificates */}
            <div className="flex-1 px-6 md:px-12 lg:px-24 py-12 max-w-7xl mx-auto w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificatesData.map((cert) => {
                  const isFeatured = cert.id === 3 || cert.id === 2 || cert.id === 1;
                  return (
                    <motion.div 
                      key={cert.id}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="cert-card-container group relative"
                    >
                      {/* Glow element - only visible in dark mode via blur-lg CSS rule */}
                      <div 
                        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300 pointer-events-none"
                        style={{ backgroundColor: cert.color }}
                      />
                      
                      <div className="cert-card-inner">
                        {/* Certificate Thumbnail Preview */}
                        <div className="w-full relative mb-5">
                          <div className="relative rounded-xl overflow-hidden shadow-lg border border-white/5 transition-colors">
                            <CertificateMiniPreview cert={cert} />
                          </div>
                        </div>

                        {/* Card Info */}
                        <div className="space-y-2 mb-6 text-left flex-1">
                          {isFeatured && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-mono text-[9px] font-bold uppercase tracking-wider mb-2">
                              🏆 Featured Internship Certificate
                            </span>
                          )}
                          
                          <span className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-widest block">
                            {cert.org}
                          </span>
                          <h4 className="cert-card-title font-display text-base font-bold tracking-tight transition-colors duration-300">
                            {cert.name}
                          </h4>
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 dark:text-slate-400">
                            <Calendar size={11} /> <span>Issued: {cert.date}</span>
                          </div>
                        </div>

                        {/* View Button */}
                        <div className="flex border-t border-slate-100 dark:border-slate-800/50 pt-4 mt-auto">
                          <button
                            onClick={() => setActiveLightboxCert(cert)}
                            className="w-full btn-primary text-xs h-9 px-4 cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <Eye size={12} /> View
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PREMIUM INTERACTIVE LIGHTBOX VIEWER */}
      <AnimatePresence>
        {activeLightboxCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-55 flex flex-col bg-[#050507]/98 backdrop-blur-md"
          >
            {/* Top Navigation Controls */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0d0d11]/80 backdrop-blur-sm sticky top-0 z-20">
              <div className="flex items-center gap-3 text-left">
                <span className="font-mono text-[10px] text-slate-500 tracking-wider">CREDENTIAL VIEWER</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <h4 className="font-display text-xs sm:text-sm font-bold text-white tracking-tight">
                  {activeLightboxCert.name} ({activeLightboxCert.org})
                </h4>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Zoom out */}
                <button
                  onClick={() => setZoomLevel(prev => Math.max(0.6, prev - 0.2))}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut size={16} />
                </button>
                {/* Reset Zoom */}
                <span className="font-mono text-[10px] text-slate-400 px-1 select-none">
                  {Math.round(zoomLevel * 100)}%
                </span>
                {/* Zoom In */}
                <button
                  onClick={() => setZoomLevel(prev => Math.min(2.5, prev + 0.2))}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn size={16} />
                </button>
                <div className="w-[1px] h-4 bg-white/10 mx-2" />
                {/* Fullscreen */}
                <button
                  onClick={() => setIsLightboxFullscreen(!isLightboxFullscreen)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                  title="Toggle Fullscreen"
                >
                  {isLightboxFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
                {/* Close */}
                <button
                  onClick={() => {
                    setActiveLightboxCert(null);
                    setZoomLevel(1);
                  }}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                  title="Close Viewer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Main Interactive Lightbox Area */}
            <div className="flex-1 flex items-center justify-between px-4 sm:px-12 md:px-24 py-8 relative min-h-[300px]">
              
              {/* Prev Button */}
              <button
                onClick={handlePrevCert}
                className="absolute left-4 z-20 p-3 bg-white/5 hover:bg-white/10 hover:text-white text-slate-400 rounded-full transition-all border border-white/5 shadow-lg flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft size={24} />
              </button>

              {/* PDF Container (iframe pointing directly to the asset) */}
              <div className="w-full h-full flex items-center justify-center max-w-5xl mx-auto overflow-hidden">
                <div 
                  className={`relative transition-all duration-300 w-full rounded-xl bg-[#09090c] border border-white/5 shadow-2xl overflow-hidden ${
                    isLightboxFullscreen ? 'h-[80vh]' : 'h-[50vh] sm:h-[60vh] md:h-[65vh]'
                  }`}
                >
                  <iframe
                    src={activeLightboxCert.pdf}
                    className="w-full h-full border-none transition-transform duration-300 ease-out"
                    style={{ 
                      transform: `scale(${zoomLevel})`,
                      transformOrigin: 'center center'
                    }}
                    title={activeLightboxCert.name}
                  />
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={handleNextCert}
                className="absolute right-4 z-20 p-3 bg-white/5 hover:bg-white/10 hover:text-white text-slate-400 rounded-full transition-all border border-white/5 shadow-lg flex items-center justify-center cursor-pointer"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Lightbox Footer Details */}
            <div className="border-t border-white/5 bg-[#0d0d11]/80 backdrop-blur-sm py-6 px-6 md:px-12">
              <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                <div className="space-y-1">
                  <h4 className="font-display text-base font-bold text-white tracking-tight text-left">
                    {activeLightboxCert.name}
                  </h4>
                  <p className="text-slate-400 text-xs font-sans leading-relaxed text-left">
                    {activeLightboxCert.description}
                  </p>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                  <a
                    href={activeLightboxCert.pdf}
                    download
                    className="btn-live-demo text-xs h-9 px-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md hover:from-amber-600 hover:to-amber-700 cursor-pointer"
                  >
                    <Download size={12} /> Download PDF
                  </a>
                  <button
                    onClick={() => {
                      setActiveLightboxCert(null);
                      setZoomLevel(1);
                    }}
                    className="btn-border-gradient text-xs h-9 px-6 border-white/10 hover:border-slate-500/30 hover:text-white cursor-pointer"
                  >
                    Close Viewer
                  </button>
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
      
    </section>
  );
};

export default Certifications;
