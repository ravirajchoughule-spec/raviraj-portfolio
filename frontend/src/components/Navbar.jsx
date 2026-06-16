import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onViewResume }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Certificates', href: '#certificates', id: 'certificates' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Determine active section based on scroll position
      const scrollPosition = window.scrollY + 150;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-[#050507]/80 backdrop-blur-md border-b border-white/5 py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 md:px-12 lg:px-24">
        {/* Logo */}
        <a href="#home" className="flex items-center text-3xl sm:text-4xl font-extrabold tracking-tight text-white select-none">
          <span className="font-display gradient-text-animated gradient-hover-glow">RC</span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-4">
          <ul className="flex items-center gap-2">
            {navLinks.map((link) => (
              <li key={link.name} className="relative">
                <a
                  href={link.href}
                  onClick={() => setActiveSection(link.id)}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-300 font-display ${
                    activeSection === link.id
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {link.name}
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-x-4 bottom-0 h-[1.5px] bg-white"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
          
          <button
            onClick={onViewResume}
            className="ml-2 px-4 py-1.5 rounded-lg border border-rose-500/30 hover:border-rose-500/50 text-xs font-mono font-bold tracking-wider text-rose-400 hover:text-rose-300 bg-rose-500/5 hover:bg-rose-500/10 transition-all cursor-pointer shadow-[0_0_15px_-3px_rgba(244,63,94,0.1)] flex items-center gap-1.5"
          >
            <FileText size={12} /> Resume
          </button>

          <button
            onClick={toggleTheme}
            className="ml-1 p-2 rounded-lg border border-white/5 hover:border-white/10 bg-white/2 hover:bg-white/5 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center justify-center h-[32px] w-[32px]"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} className="text-indigo-400" />}
          </button>
        </div>

        {/* Mobile Nav Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-400 hover:text-white transition-colors flex items-center justify-center"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-indigo-400" />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full w-full bg-[#050507] border-b border-white/5 shadow-xl md:hidden"
          >
            <ul className="flex flex-col gap-2 px-6 py-6 font-display">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => {
                      setIsOpen(false);
                      setActiveSection(link.id);
                    }}
                    className={`block py-3 text-base font-medium transition-colors duration-300 ${
                      activeSection === link.id
                        ? 'text-white border-l-2 border-white pl-2'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              
              <li className="mt-4 pt-4 border-t border-white/5">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onViewResume();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-rose-500/30 text-rose-400 bg-rose-500/5 hover:bg-rose-500/10 font-mono text-sm font-bold tracking-wider transition-all cursor-pointer"
                >
                  <FileText size={14} /> View Resume
                </button>
              </li>

            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
