import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      description: "Building responsive, modern, and user-centric interfaces.",
      skills: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Tailwind CSS", "React.js"]
    },
    {
      title: "Backend & Database",
      description: "Developing APIs, routing pipelines, and database schemas.",
      skills: ["Node.js", "Express.js", "SQLite"]
    },
    {
      title: "Currently Learning",
      description: "Expanding knowledge into OOP and enterprise Java development.",
      skills: ["Core Java", "Advanced Java"]
    },
    {
      title: "Soft Skills",
      description: "Interpersonal attributes enabling effective collaboration.",
      skills: ["Quick Learner", "Problem Solving", "Communication", "Team Collaboration", "Adaptability", "Self Learning"]
    }
  ];

  return (
    <section id="skills" className="relative py-24 px-6 md:px-12 lg:px-24 bg-[#050507]">
      <div className="mx-auto max-w-7xl w-full">
        
        {/* Section Title */}
        <div className="mb-16 md:mb-24 text-left">
          <span className="font-mono text-xs text-slate-500 tracking-widest uppercase block mb-3">02 // TECHNICAL STACK</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight heading-underline">
            An ecosystem focused on efficiency
          </h2>
        </div>

        {/* Categories Grid (2x2 layout or 3-column with wrap) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card rounded-lg p-8 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-display text-xl font-semibold text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm font-sans mb-8 leading-relaxed">
                  {category.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="rounded bg-white/3 border border-white/5 px-3 py-1.5 text-xs font-mono font-medium text-slate-300 transition-colors duration-300 hover:border-slate-400 hover:text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
