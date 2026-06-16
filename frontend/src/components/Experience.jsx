import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  const experiences = [
    {
      year: "Fresher",
      title: "Fresher",
      organization: "0 Years Professional Experience",
      description: "Graduate eager to leverage technical skills in engineering and software development to build production applications."
    },
    {
      year: "Completed",
      title: "Bachelor of Technology (B.Tech)",
      organization: "Computer Engineering",
      description: "Completed B.Tech successfully. Specialized in computer systems, programming methodologies, databases, and software design principles."
    },
    {
      year: "Career Goal",
      title: "Aspiring Java Developer",
      organization: "Enterprise Application Focus",
      description: "My goal is to become a professional Java Developer and continue growing in Java, Advanced Java, enterprise framework architecture, and large-scale backend systems."
    }
  ];

  return (
    <section id="experience" className="relative py-24 px-6 md:px-12 lg:px-24 bg-[#050507]">
      <div className="mx-auto max-w-7xl w-full">
        
        {/* Section Title */}
        <div className="mb-16 md:mb-24 text-left">
          <span className="font-mono text-xs text-slate-500 tracking-widest uppercase block mb-3">04 // EXPERIENCE & EDUCATION</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight heading-underline">
            Professional journey
          </h2>
        </div>

        {/* Timeline Grid */}
        <div className="max-w-4xl mr-auto relative border-l border-white/5 pl-6 sm:pl-8 space-y-12">
          {experiences.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group text-left"
            >
              {/* Timeline Bullet Node with Cobalt-to-Purple Gradient */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-gradient-to-r from-sky-400 to-purple-500 group-hover:scale-125 transition-all duration-300 border border-white/20" />

              {/* Year */}
              <span className="font-mono text-xs text-slate-500 tracking-wider block mb-1">
                {item.year}
              </span>

              {/* Title & Organization */}
              <h3 className="font-display text-lg font-semibold text-white group-hover:text-slate-300 transition-colors">
                {item.title}
              </h3>
              <span className="text-xs font-mono text-slate-400 block mt-0.5">
                {item.organization}
              </span>

              {/* Description */}
              <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed font-sans max-w-2xl">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
