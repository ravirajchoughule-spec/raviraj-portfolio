import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProject from './components/FeaturedProject';
import About from './components/About';
import Skills from './components/Skills';
import WhatICanBuild from './components/WhatICanBuild';
import Projects from './components/Projects';
import Highlights from './components/Highlights';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Fast loading screen animation
  useEffect(() => {
    if (loadingProgress < 100) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          const next = prev + Math.floor(Math.random() * 15) + 8;
          return next >= 100 ? 100 : next;
        });
      }, 50);
      return () => clearInterval(interval);
    } else {
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [loadingProgress]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          // Sleek Minimal Loading Screen
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 z-55 flex items-center justify-center bg-[#050507] text-white"
          >
            <div className="flex flex-col items-center w-full max-w-xs px-6">
              <span className="font-mono text-xs tracking-widest text-slate-500 mb-4 uppercase">
                Loading Ecosystem...
              </span>
              <div className="h-[1px] w-full bg-white/5 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-white absolute left-0 top-0"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <span className="font-display font-medium text-sm text-slate-400 mt-3">
                {loadingProgress}%
              </span>
            </div>
          </motion.div>
        ) : (
          // Immersive Redesigned Portfolio Experience
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative w-full min-h-screen bg-[#050507]"
          >
            {/* Sticky Navigation Header */}
            <Navbar onViewResume={() => setIsResumeOpen(true)} />

            {/* Main Sections */}
            <main>
              {/* Home Section */}
              <div id="home">
                <Hero onViewResume={() => setIsResumeOpen(true)} />
              </div>

              {/* Featured Project Section */}
              <FeaturedProject />

              {/* About Section */}
              <About />

              {/* Skills Section */}
              <Skills />

              {/* What I Can Build Section */}
              <WhatICanBuild />

              {/* Projects Section */}
              <Projects />

              {/* Highlights Section */}
              <Highlights />

              {/* Certifications Section */}
              <Certifications />

              {/* Experience & Education Section */}
              <Experience />

              {/* Contact Section */}
              <Contact onViewResume={() => setIsResumeOpen(true)} />
            </main>

            {/* Footer */}
            <Footer />

            {/* Fullscreen Premium Resume Modal */}
            <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
