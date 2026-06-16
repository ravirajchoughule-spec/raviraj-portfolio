import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Premium3DPortrait = () => {
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const springConfig = { damping: 25, stiffness: 100, mass: 0.6 };

  // Rotation max 5 degrees
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

  // Parallax translation of the image itself (subtle: max 8px offset)
  const imgX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  const imgY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-8, 8]), springConfig);

  // Dynamic shadow movement
  const shadowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [15, -15]), springConfig);
  const shadowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, -10]), springConfig);

  // Dynamic light reflection/sheen tracking the cursor
  const sheenBackground = useTransform(
    [mouseX, mouseY],
    ([x, y]) => {
      const px = (Number(x) + 0.5) * 100;
      const py = (Number(y) + 0.5) * 100;
      return `radial-gradient(circle at ${px}% ${py}%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 60%)`;
    }
  );

  return (
    <div className="relative w-full max-w-sm lg:max-w-none mx-auto aspect-[4/5] animate-float-slow group">
      {/* Dynamic Colored Shadow / Glow (Behind outer frame) */}
      <motion.div
        style={{
          x: shadowX,
          y: shadowY,
          filter: "blur(24px)",
        }}
        className="absolute inset-4 rounded-2xl bg-gradient-to-tr from-sky-500/25 to-purple-500/25 opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
      />

      {/* Outer 3D Card Container (Glassmorphic Frame with Gradient Border) */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        className="relative w-full h-full rounded-2xl bg-[#0d0d11]/80 border border-white/5 p-2.5 shadow-2xl transition-all duration-300 hover:border-white/12 cursor-pointer z-10"
      >
        {/* Dynamic Gradient Border Glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-500/10 to-purple-500/10 opacity-30 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Inner Image Frame (Glassmorphism boundary) */}
        <div
          className="relative w-full h-full rounded-xl overflow-hidden bg-black/40"
          style={{
            transform: "translateZ(20px)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Main Profile Photo (with subtle displacement parallax) */}
          <motion.img
            src="/assets/profile.jpg"
            alt="Raviraj Choughule Profile"
            className="h-full w-full object-cover object-top scale-105"
            style={{
              x: imgX,
              y: imgY,
            }}
          />

          {/* Vignette Shadow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          {/* Interactive Light Reflection Sheen */}
          <motion.div
            style={{
              background: sheenBackground,
            }}
            className="absolute inset-0 pointer-events-none z-20"
          />
        </div>
      </motion.div>
    </div>
  );
};

const About = () => {
  const achievements = [
    "B.Tech in Computer Engineering",
    "Full Stack Development Completed",
    "Multiple Full Stack Projects Completed",
    "Currently Learning Core Java",
    "Passionate About Continuous Learning"
  ];

  return (
    <section id="about" className="relative py-24 px-6 md:px-12 lg:px-24 bg-[#050507]">
      <div className="mx-auto max-w-7xl w-full">
        
        {/* Section Title */}
        <div className="mb-16 md:mb-24 text-left">
          <span className="font-mono text-xs text-slate-500 tracking-widest uppercase block mb-3">01 // ABOUT ME</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight heading-underline">
            Engineering robust applications
          </h2>
        </div>

        {/* Content Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Side: Professional Profile Photo (5 columns with 3D Portrait interaction) */}
          <div className="lg:col-span-5 relative">
            <Premium3DPortrait />
          </div>


          {/* Right Side: Professional Biography & Achievements (7 columns) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 text-slate-400 font-sans text-base leading-relaxed"
            >
              <p>
                I am a Computer Engineering graduate who enjoys building real-world software solutions.
              </p>
              <p>
                I have completed Full Stack Development training and developed multiple projects using React.js, Node.js, Express.js, Bootstrap, Tailwind CSS, HTML, CSS and JavaScript.
              </p>
              <p>
                I am currently strengthening my Core Java skills and planning my career path toward Java and Advanced Java development.
              </p>
              <p>
                I enjoy learning new technologies, solving problems and continuously improving my development skills.
              </p>
            </motion.div>

            {/* Achievements List */}
            <div className="pt-10 mt-10 border-t border-white/5">
              <h3 className="font-display text-sm font-mono tracking-wider text-slate-500 uppercase mb-6">
                Key Achievements
              </h3>
              <ul className="space-y-4">
                {achievements.map((achievement, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="flex items-center gap-3 text-sm text-slate-300 font-sans"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-sky-400 to-purple-500" />
                    {achievement}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
