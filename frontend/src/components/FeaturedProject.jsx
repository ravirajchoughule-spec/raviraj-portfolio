import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ChevronLeft, ChevronRight, Maximize2, Minimize2, Image, Award, LayoutGrid } from 'lucide-react';

const GithubIcon = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const screenshots = [
  {
    title: "Login Page",
    image: "/assets/projects/smartinventory-login.png",
    description: "Secure authentication for inventory administrators."
  },
  {
    title: "Dashboard Overview",
    image: "/assets/projects/smartinventory-dashboard.png",
    description: "Real-time business analytics and inventory statistics."
  },
  {
    title: "Products Inventory",
    image: "/assets/projects/smartinventory-products.png",
    description: "Manage products, pricing and stock quantities."
  },
  {
    title: "Categories Management",
    image: "/assets/projects/smartinventory-categories.png",
    description: "Organize products into categories."
  },
  {
    title: "Orders Management",
    image: "/assets/projects/smartinventory-orders.png",
    description: "Track customer orders and order status."
  },
  {
    title: "Reports Module",
    image: "/assets/projects/smartinventory-reports.png",
    description: "Generate inventory and sales reports."
  },
  {
    title: "AI Report Builder",
    image: "/assets/projects/smartinventory-aireports.png",
    description: "Generate intelligent AI-powered business reports."
  },
  {
    title: "AI Analytics",
    image: "/assets/projects/smartinventory-aianalytics.png",
    description: "Advanced business insights and performance analysis."
  },
  {
    title: "Warehouse Manager",
    image: "/assets/projects/smartinventory-warehouses.png",
    description: "Multi-warehouse inventory monitoring and transfers."
  },
  {
    title: "Approval Center",
    image: "/assets/projects/smartinventory-approvals.png",
    description: "Manage workflow approvals and support tickets."
  }
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0
  })
};

const FeaturedProject = () => {
  const [activeScreenshots, setActiveScreenshots] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [direction, setDirection] = useState(0);

  const cardRef = useRef(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIdx((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIdx((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeScreenshots) {
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'Escape') setActiveScreenshots(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeScreenshots]);

  // Lock body scroll when screenshots modal is active
  useEffect(() => {
    if (activeScreenshots) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeScreenshots]);

  return (
    <section id="featured-project" className="relative py-24 px-6 md:px-12 lg:px-24 bg-[#050507]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none z-0" />

      <div className="mx-auto max-w-7xl w-full relative z-10">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <span className="font-mono text-xs text-slate-500 tracking-widest uppercase block mb-3">01 // HIGHLIGHTED SYSTEM</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight heading-underline">
            🏆 Featured Project
          </h2>
        </div>

        {/* Premium Spotlight Card */}
        <div 
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative p-[1.5px] rounded-3xl overflow-hidden bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 hover:from-blue-500 hover:via-purple-500 hover:to-cyan-500 transition-all duration-500 shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
        >
          {/* Spotlight Highlight Effect */}
          {isHovered && (
            <div 
              className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300 blur-sm"
              style={{
                background: `radial-gradient(400px circle at ${spotlight.x}px ${spotlight.y}px, rgba(14, 165, 233, 0.12), transparent 70%)`
              }}
            />
          )}

          {/* Card Inner Content */}
          <div className="relative rounded-[22px] bg-slate-950/60 backdrop-blur-xl -webkit-backdrop-blur-xl p-6 md:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            
            {/* Visual Preview Thumbnail (Left) */}
            <div className="w-full lg:w-[48%] relative flex-shrink-0">
              {/* Backlight Glow */}
              <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-40 blur-md pointer-events-none" />
              <div className="relative rounded-2xl overflow-hidden border border-white/5 shadow-2xl aspect-[16/10] bg-[#0d0d11]">
                <img 
                  src="/assets/projects/smartinventory-dashboard.png" 
                  alt="Smart Inventory System Dashboard" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-[1.02]"
                />
              </div>
            </div>

            {/* Info Panel (Right) */}
            <div className="flex-1 text-left space-y-5">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 font-mono text-[9px] font-bold uppercase tracking-wider">
                  ⭐ Featured Project
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[9px] font-bold uppercase tracking-wider">
                  🚀 Production Ready
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 text-slate-300 font-mono text-[9px] font-bold uppercase tracking-wider">
                  ✅ Completed
                </span>
              </div>

              <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                Smart Inventory System
              </h3>
              
              <h4 className="text-slate-300 font-display text-sm md:text-base font-semibold leading-relaxed">
                Enterprise Inventory Platform with AI Analytics, Warehouse Management, Reporting Dashboard and Approval Workflows.
              </h4>

              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
                A complete enterprise inventory management platform designed to streamline stock operations, reporting, warehouse management and business intelligence through a centralized dashboard.
              </p>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {["React.js", "Node.js", "Express.js", "SQLite", "Tailwind CSS", "Bootstrap"].map((badge) => (
                  <span 
                    key={badge}
                    className="rounded bg-white/5 border border-white/5 px-2.5 py-1 text-xs font-mono text-slate-300"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
                <button
                  onClick={() => {
                    setActiveScreenshots(true);
                    setCurrentIdx(0);
                  }}
                  className="btn-primary text-xs h-10 px-6 cursor-pointer flex items-center gap-2"
                >
                  <Image size={14} /> Explore Project
                </button>
                <a
                  href="https://github.com/ravirajchoughule-spec/smart-inventory-system"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-border-gradient text-xs h-10 px-6 cursor-pointer flex items-center gap-2"
                >
                  <GithubIcon size={14} /> View Source Code <ExternalLink size={12} className="opacity-70" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Fullscreen Screenshots Gallery Modal */}
      <AnimatePresence>
        {activeScreenshots && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-[#050507]/95 backdrop-blur-md overflow-y-auto select-none"
          >
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0d0d11]/80 backdrop-blur-sm sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-slate-500 tracking-wider">PROJECT SCREENSHOTS</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#0ea5e9]" />
                <span className="font-display text-sm font-semibold text-white">
                  {currentIdx + 1} / {screenshots.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                  title="Toggle Fullscreen"
                >
                  {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
                <button
                  onClick={() => setActiveScreenshots(false)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                  title="Close Gallery"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Showcase Image Area */}
            <div className="flex-1 flex items-center justify-between px-4 sm:px-12 md:px-24 py-8 relative min-h-[300px]">
              <button
                onClick={handlePrev}
                className="absolute left-4 z-20 p-3 bg-white/5 hover:bg-white/10 hover:text-white text-slate-400 rounded-full transition-all border border-white/5 shadow-lg flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft size={24} />
              </button>

              <div className="w-full h-full flex items-center justify-center max-w-5xl mx-auto overflow-hidden">
                <div 
                  className={`relative transition-all duration-300 w-full rounded-2xl bg-[#09090c] border border-white/5 shadow-2xl overflow-hidden flex items-center justify-center ${
                    isFullscreen ? 'h-[80vh]' : 'h-[50vh] sm:h-[60vh] md:h-[65vh]'
                  }`}
                >
                  <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.img
                      key={currentIdx}
                      src={screenshots[currentIdx].image}
                      alt={screenshots[currentIdx].title}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                      }}
                      className="max-w-full max-h-full object-contain p-4 select-none pointer-events-none"
                    />
                  </AnimatePresence>
                </div>
              </div>

              <button
                onClick={handleNext}
                className="absolute right-4 z-20 p-3 bg-white/5 hover:bg-white/10 hover:text-white text-slate-400 rounded-full transition-all border border-white/5 shadow-lg flex items-center justify-center cursor-pointer"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Bottom Caption Bar */}
            <div className="border-t border-white/5 bg-[#0d0d11]/80 backdrop-blur-sm py-6 px-6 md:px-12">
              <div className="max-w-3xl mx-auto text-center md:text-left space-y-1">
                <h4 className="font-display text-base font-bold text-white tracking-tight">
                  {screenshots[currentIdx].title}
                </h4>
                <p className="text-slate-400 text-xs sm:text-sm font-sans leading-relaxed">
                  {screenshots[currentIdx].description}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FeaturedProject;
