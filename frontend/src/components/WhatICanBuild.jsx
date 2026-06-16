import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Layers, 
  Receipt, 
  LayoutDashboard, 
  Globe, 
  Monitor, 
  Network 
} from 'lucide-react';

const servicesData = [
  {
    id: 1,
    title: "Business Management Systems",
    description: "Enterprise software solutions designed to streamline business workflows, schedule operations, track resource distributions, and organize administrative processes.",
    icon: Building2,
    color: "#3b82f6" // Blue
  },
  {
    id: 2,
    title: "Inventory Management Systems",
    description: "Comprehensive systems to manage product stock levels, multi-warehouse storage transfers, sales orders tracking, and generate real-time product logs.",
    icon: Layers,
    color: "#8b5cf6" // Purple
  },
  {
    id: 3,
    title: "Billing Applications",
    description: "Custom invoice generators supporting tax/GST calculations, customer credit records tracking, transaction receipting, and detailed financial summaries.",
    icon: Receipt,
    color: "#06b6d4" // Cyan
  },
  {
    id: 4,
    title: "Admin Dashboards",
    description: "Centralized administrator panels providing graphical business intelligence, reporting suites, data charts, and role-based permissions.",
    icon: LayoutDashboard,
    color: "#10b981" // Emerald
  },
  {
    id: 5,
    title: "Full Stack Web Applications",
    description: "End-to-end, recruiter-ready software applications bridging reactive user interfaces (React) with secure backend servers (Node/Express) and relational databases.",
    icon: Globe,
    color: "#f59e0b" // Gold
  },
  {
    id: 6,
    title: "Responsive Websites",
    description: "Modern, search-engine-optimized frontend websites built with fluid column grids and CSS styling to look stunning across desktop, tablet, and mobile browsers.",
    icon: Monitor,
    color: "#f43f5e" // Rose
  },
  {
    id: 7,
    title: "REST APIs",
    description: "Fast, secure, and fully documented server-side REST routing endpoints connecting clients, databases, and third-party APIs.",
    icon: Network,
    color: "#3b82f6" // Blue
  }
];

const WhatICanBuild = () => {
  return (
    <section id="what-i-can-build" className="relative py-24 px-6 md:px-12 lg:px-24 bg-[#050507]">
      <div className="mx-auto max-w-7xl w-full relative z-10">
        
        {/* Section Heading */}
        <div className="mb-16 md:mb-20 text-center">
          <span className="font-mono text-xs text-slate-500 tracking-widest uppercase block mb-3">02 // SERVICES & CAPABILITIES</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight heading-underline">
            What I Can Build
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-sans mt-4 max-w-3xl mx-auto leading-relaxed">
            Software solutions I can design, build, and deploy.
          </p>
        </div>

        {/* 7 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, idx) => {
            const IconComponent = service.icon;
            // Center the 7th item (REST APIs) on desktop/large screens
            const isLastOnDesktop = idx === 6;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
                whileHover={{ y: -5 }}
                className={`stats-card-container group relative cursor-pointer ${
                  isLastOnDesktop ? 'lg:col-span-3 lg:max-w-md lg:mx-auto w-full' : ''
                }`}
                style={{
                  '--stats-glow': `${service.color}40`
                }}
              >
                {/* Glow backlight overlay in Dark Theme */}
                <div 
                  className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300 pointer-events-none"
                  style={{ backgroundColor: service.color }}
                />

                <div className="stats-card-inner min-h-[200px]">
                  {/* Card Header: Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="p-3 rounded-xl bg-white/5 border border-white/5 dark:border-slate-800 transition-all duration-300 flex items-center justify-center group-hover:scale-110"
                      style={{ color: service.color }}
                    >
                      <IconComponent size={20} className="transition-transform duration-300 group-hover:scale-110" />
                    </div>
                  </div>

                  {/* Card Body: Title & Description */}
                  <div className="space-y-2 text-left mt-auto">
                    <h4 className="font-display text-base font-bold text-white tracking-tight group-hover:text-sky-400 transition-colors duration-300">
                      {service.title}
                    </h4>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-sans leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
};

export default WhatICanBuild;
