import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Rocket, Trophy, Briefcase, Coffee } from 'lucide-react';

const CountUp = ({ value, duration = 1.5 }) => {
  const [count, setCount] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    const numericMatch = value.match(/\d+/);
    if (!numericMatch) {
      requestAnimationFrame(() => setCount(value));
      return;
    }

    const end = parseInt(numericMatch[0], 10);
    const start = 0;
    let startTime = null;

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const current = Math.floor(progress * (end - start) + start);
      
      const suffix = value.replace(numericMatch[0], '');
      setCount(`${current}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [value, duration, isInView]);

  return <span ref={ref}>{count || '0'}</span>;
};

const Typewriter = ({ text, delay = 100, speed = 80 }) => {
  const [displayText, setDisplayText] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let index = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText((prev) => prev + text.charAt(index));
        index++;
        if (index >= text.length) {
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay, speed, isInView]);

  return (
    <span ref={ref}>
      {displayText}
      {displayText.length < text.length && (
        <span className="animate-pulse text-sky-400">|</span>
      )}
    </span>
  );
};

const TiltCard = ({ children, color, idx }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Tilt factor (max 12 degrees)
    const tiltX = (y / (box.height / 2)) * -12;
    const tiltY = (x / (box.width / 2)) * 12;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      style={{ 
        transformStyle: 'preserve-3d',
        '--stats-glow': `${color}40`
      }}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -5 }}
      className="stats-card-container group relative cursor-pointer"
    >
      {/* Glow overlay in Dark Theme - hidden in light mode via .blur-lg display none */}
      <div 
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300 pointer-events-none"
        style={{ backgroundColor: color }}
      />
      {children}
    </motion.div>
  );
};

const statsData = [
  {
    id: 1,
    value: "5+",
    title: "Projects Built",
    description: "Developed Full Stack applications using React.js, Node.js, Express.js and SQLite including Medical Billing System, Smart Inventory System and HomeRent Pro.",
    icon: Rocket,
    color: "#3b82f6" // Electric Blue
  },
  {
    id: 2,
    value: "10+",
    title: "Professional Certifications",
    description: "Completed certifications in HTML, CSS, JavaScript, Bootstrap, jQuery, Express.js and Full Stack Development along with Internship Credentials.",
    icon: Trophy,
    color: "#8b5cf6" // Purple
  },
  {
    id: 3,
    value: "3 Months",
    title: "Full Stack Internship",
    description: "Completed Full Stack Web Developer Internship at A2Z IT HUB Pvt. Ltd. and worked on real-world software development projects.",
    icon: Briefcase,
    color: "#10b981" // Emerald
  },
  {
    id: 4,
    value: "Core Java",
    title: "Learning Journey",
    description: "Currently focusing on Core Java, Advanced Java and Software Development concepts to build a successful Java Developer career.",
    icon: Coffee,
    color: "#f59e0b" // Gold
  }
];

const Highlights = () => {
  return (
    <section id="highlights" className="relative py-16 px-6 md:px-12 lg:px-24 bg-[#050507] perspective-1000">
      <div className="mx-auto max-w-7xl w-full relative z-10">
        
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <span className="font-mono text-xs text-slate-500 tracking-widest uppercase block mb-3">01 // QUICK OVERVIEW</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight heading-underline">
            Professional Highlights
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-sans mt-4 max-w-2xl mx-auto leading-relaxed">
            A quick overview of my projects, certifications, internship experience and current learning journey.
          </p>
        </div>

        {/* 4 Premium Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, idx) => {
            const IconComponent = stat.icon;
            const hasDigits = /\d+/.test(stat.value);

            return (
              <TiltCard key={stat.id} color={stat.color} idx={idx}>
                <div className="stats-card-inner">
                  {/* Card Header: Icon & Value */}
                  <div className="flex justify-between items-start mb-6" style={{ transform: 'translateZ(30px)' }}>
                    <div 
                      className="p-3 rounded-xl bg-white/5 border border-white/5 dark:border-slate-800 transition-all duration-300 flex items-center justify-center group-hover:scale-110"
                      style={{ color: stat.color }}
                    >
                      <IconComponent size={20} className="transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    
                    <h3 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-none">
                      {hasDigits ? (
                        <CountUp value={stat.value} />
                      ) : (
                        <span className="text-sm md:text-base font-bold text-slate-400 uppercase font-mono tracking-wider text-right block leading-tight max-w-[120px]">
                          <Typewriter text={stat.value} />
                        </span>
                      )}
                    </h3>
                  </div>

                  {/* Card Footer: Title & Description */}
                  <div className="space-y-2 text-left mt-4" style={{ transform: 'translateZ(20px)' }}>
                    <h4 className="font-display text-base font-bold text-white tracking-tight group-hover:text-sky-400 transition-colors duration-300">
                      {stat.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
        
      </div>
    </section>
  );
};

export default Highlights;
