import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Server, Database, Layout, User, Cpu, 
  Sparkles, Building, ChevronRight, Activity, Workflow, Shield 
} from 'lucide-react';

const architecturesData = {
  medical: {
    id: "medical",
    title: "Medical Billing & Pharmacy Management System",
    role: "Pharmacist / Admin",
    badge: "⚕️ Healthcare Architecture",
    badgeTheme: "border-emerald-500/30 text-emerald-400 bg-emerald-500/5",
    color: "#10b981",
    layers: [
      { name: "Frontend Presentation", techs: ["React.js", "Bootstrap", "Tailwind CSS"], desc: "Sleek client billing layouts, prescription trackers and inventory management panels.", icon: Layout, color: "text-sky-400 border-sky-400/20 bg-sky-500/5" },
      { name: "API Router & Security", techs: ["Express.js REST APIs"], desc: "JWT role check handlers, rate limiting, and structured route parameters.", icon: Shield, color: "text-purple-400 border-purple-400/20 bg-purple-500/5" },
      { name: "Business Logic Core", techs: ["Node.js Controller"], desc: "Calculates pharmaceutical stock levels, expiry date warnings, and tax ledger sheets.", icon: Cpu, color: "text-indigo-400 border-indigo-400/20 bg-indigo-500/5" },
      { name: "Relational Storage", techs: ["SQLite Database"], desc: "Indexed schema storing customer credit registries, supplier invoices, and medicine stocks.", icon: Database, color: "text-amber-400 border-amber-400/20 bg-amber-500/5" }
    ],
    modules: [
      { name: "Customer Management", desc: "Maintains billing directory and track unpaid credit files." },
      { name: "Supplier Management", desc: "Coordinates medicine procurement and balances ledger logs." },
      { name: "Medicine Inventory", desc: "Controls real-time stock balances and automatic expiry date flags." },
      { name: "Billing System", desc: "Processes sales transactions with dynamic taxes and discounts." },
      { name: "Online Orders", desc: "Tracks uploaded prescriptions and remote checkout status." },
      { name: "Purchase Management", desc: "Logs incoming shipments and updates stock records." },
      { name: "Reports & Audits", desc: "Generates gross revenue sheets and category purchase sheets." },
      { name: "Expense Tracking", desc: "Audits business overheads, cash balances, and operational costs." },
      { name: "Notes Scheduler", desc: "Schedules accounts receivable alarms and vendor payments." }
    ],
    flow: ["User", "React Frontend", "Express API", "Node.js Business Logic", "SQLite Database"]
  },
  inventory: {
    id: "inventory",
    title: "Smart Inventory System",
    role: "Inventory Manager",
    badge: "⭐ Enterprise Architecture",
    badgeTheme: "border-indigo-500/40 text-indigo-300 bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.2)]",
    color: "#6366f1",
    layers: [
      { name: "Frontend Administration", techs: ["React.js", "Bootstrap", "Tailwind CSS"], desc: "Real-time analytics boards, multi-warehouse monitors, approval desks.", icon: Layout, color: "text-sky-400 border-sky-400/20 bg-sky-500/5" },
      { name: "API Gateways", techs: ["Express.js REST APIs"], desc: "Route registration controllers, token authorization locks, and API routers.", icon: Shield, color: "text-purple-400 border-purple-400/20 bg-purple-500/5" },
      { name: "Core Processing Engine", techs: ["Node.js Services"], desc: "Syncs barcode quantities, aggregates reports, and handles workflow approval signals.", icon: Cpu, color: "text-indigo-400 border-indigo-400/20 bg-indigo-500/5" },
      { name: "Relational Ledger Database", techs: ["SQLite Schema"], desc: "Tracks SKUs, records multi-warehouse logs, and saves secure user activity grids.", icon: Database, color: "text-amber-400 border-amber-400/20 bg-amber-500/5" }
    ],
    modules: [
      { name: "Authentication", desc: "RBAC (Role Based Access Control) and security token validation." },
      { name: "Dashboard Analytics", desc: "Real-time key performance indicators and inventory health status." },
      { name: "Products Management", desc: "Pricing configurations, SKU tracking, and serial number bindings." },
      { name: "Categories", desc: "Hierarchical classification directories for products grouping." },
      { name: "Orders Management", desc: "Client dispatch sales pipeline and delivery tracking schedules." },
      { name: "Reports Module", desc: "PDF financial invoice aggregates and inventory ledger sheets." },
      { name: "AI Report Builder", desc: "GPT-powered smart enterprise report summaries.", highlight: true },
      { name: "AI Analytics", desc: "Intelligent demand forecasting and pricing analysis dashboards.", highlight: true },
      { name: "Warehouse Management", desc: "Multi-facility stock quantity routing and facility-to-facility transfers." },
      { name: "Approval Center", desc: "Manager approval workflow queues and support tickets triage." }
    ],
    flow: ["Admin User", "React Dashboard", "Express REST API", "Node.js Processing Engine", "SQLite Database"],
    additional: [
      { name: "AI Analytics Engine", tech: "TensorFlow / API Client", desc: "Processes stock statistics for forecasting future demand trends.", glow: true },
      { name: "Business Reporting Engine", tech: "PDFKit Document Generator", desc: "Compiles financial spreadsheets and ledger audits into print documents." },
      { name: "Warehouse Control System", tech: "WCS Dispatcher", desc: "Orchestrates cross-dock transfers and keeps warehouse logs consistent." }
    ]
  },
  homerent: {
    id: "homerent",
    title: "HomeRent Pro - Rental Management System",
    role: "Landlord / Property Manager",
    badge: "🏠 Property Workflow Architecture",
    badgeTheme: "border-rose-500/30 text-rose-400 bg-rose-500/5",
    color: "#f43f5e",
    layers: [
      { name: "Frontend Interface", techs: ["React.js", "Bootstrap", "Tailwind CSS"], desc: "Landlord analytics dashboard, payment log tables, and tenant contract registry.", icon: Layout, color: "text-sky-400 border-sky-400/20 bg-sky-500/5" },
      { name: "API Routing Layer", techs: ["Express.js APIs"], desc: "Enforces auth headers gates, handles payment reports, and serves transaction listings.", icon: Shield, color: "text-purple-400 border-purple-400/20 bg-purple-500/5" },
      { name: "Backend Logic Core", techs: ["Node.js Controller"], desc: "Performs dynamic tenant balance calculations, rent due dates tracking, and status updates.", icon: Cpu, color: "text-indigo-400 border-indigo-400/20 bg-indigo-500/5" },
      { name: "Database Schema", techs: ["SQLite Database"], desc: "Relational tables linking house categories, property units, lease files, and rent histories.", icon: Database, color: "text-amber-400 border-amber-400/20 bg-amber-500/5" }
    ],
    modules: [
      { name: "Authentication", desc: "Secure landlord registry gate and encrypted token validation." },
      { name: "House Categories", desc: "Listing directory types manager (Appartments, Duplex, Offices)." },
      { name: "Property Management", desc: "Unit vacancy trackers, features checklist, and rental rate bindings." },
      { name: "Tenant Management", desc: "Lease document registries, tenant contact directories, and log history." },
      { name: "Payments Registry", desc: "Tracks rent collections, invoices, and calculates pending client balances." },
      { name: "Invoices & Receipts", desc: "Generates digital payment receipts and logs transaction references." },
      { name: "Financial Reports", desc: "Detailed cash flow graphs, gross rental returns, and outstanding balance sheets." }
    ],
    flow: ["Property Owner", "React Interface", "Express API", "Node.js Logic", "SQLite Database"]
  },
  taskmanager: {
    id: "taskmanager",
    title: "Task Manager System",
    role: "Team User",
    badge: "📋 Sprint Kanban Architecture",
    badgeTheme: "border-amber-500/30 text-amber-400 bg-amber-500/5",
    color: "#f59e0b",
    layers: [
      { name: "Frontend Client UI", techs: ["React.js", "Tailwind CSS"], desc: "Interactive drag-and-drop Kanban sprint boards, workload calendars, settings.", icon: Layout, color: "text-sky-400 border-sky-400/20 bg-sky-500/5" },
      { name: "API Services Gate", techs: ["Express.js REST Router"], desc: "Session authentication verifications, sprint data routers, task endpoints.", icon: Shield, color: "text-purple-400 border-purple-400/20 bg-purple-500/5" },
      { name: "Business Logic Daemons", techs: ["Node.js Server"], desc: "Sprint completion rate calculators, board state sync daemons, and alert dispatchers.", icon: Cpu, color: "text-indigo-400 border-indigo-400/20 bg-indigo-500/5" },
      { name: "Transactional Database", techs: ["SQLite Schema"], desc: "Structured tables binding workspaces, sprints, task details, assignees, and comments.", icon: Database, color: "text-amber-400 border-amber-400/20 bg-amber-500/5" }
    ],
    modules: [
      { name: "Task Creation", desc: "Rich description fields, checklists, priorities, and deadline schedulers." },
      { name: "Task Assignment", desc: "Maps team members to tasks with interactive avatar markers." },
      { name: "Task Tracking", desc: "Maintains log of board actions, comments, and task timeline checks." },
      { name: "Kanban Board", desc: "Interactive grid showing cards status (Todo, In Progress, Review, Done)." },
      { name: "Calendar Scheduler", desc: "Provides calendar grids mapping sprint deadlines and task milestones." },
      { name: "Reports & Metrics", desc: "Aggregates individual velocity indices and workspace completion rates." }
    ],
    flow: ["User", "Task Manager UI", "API Services", "Business Logic", "Database"]
  },
  invoice: {
    id: "invoice",
    title: "Invoice Management System",
    role: "Accountant / Client",
    badge: "💵 Ledger Architecture",
    badgeTheme: "border-blue-500/30 text-blue-400 bg-blue-500/5",
    color: "#3b82f6",
    layers: [
      { name: "Frontend Presentation", techs: ["HTML", "CSS", "Bootstrap"], desc: "Responsive invoices dashboard, payment status badges, and billing builders.", icon: Layout, color: "text-sky-400 border-sky-400/20 bg-sky-500/5" },
      { name: "Server Logic Core", techs: ["PHP Backend Engine"], desc: "Handles server-side calculations, templates assembly, and triggers PDF builders.", icon: Cpu, color: "text-purple-400 border-purple-400/20 bg-purple-500/5" },
      { name: "Relational Storage", techs: ["MySQL Database"], desc: "Stores client profile tables, tax configuration records, and gross ledger sheets.", icon: Database, color: "text-amber-400 border-amber-400/20 bg-amber-500/5" }
    ],
    modules: [
      { name: "Customer Management", desc: "Saves client directory addresses, emails, and transaction histories." },
      { name: "Invoice Generation", desc: "Performs line item cost aggregates, tax additions, and preview layouts." },
      { name: "Payments Module", desc: "Logs receipt settlements, partial collections, and invoice status registers." },
      { name: "Financial Reports", desc: "Aggregates monthly gross incomes, net income estimates, and tax audits." },
      { name: "Tax & GST Settings", desc: "Configures localized tax percentages, invoice prefixes, and currency formats." }
    ],
    flow: ["Customer", "Invoice System", "PHP Processing", "MySQL Database"]
  }
};

const ArchitectureViewer = ({ project }) => {
  const [hoveredLayer, setHoveredLayer] = useState(null);
  const [hoveredModule, setHoveredModule] = useState(null);

  // Match the active project by mapping its name
  const getProjKey = () => {
    if (!project) return "medical";
    const name = project.name.toLowerCase();
    if (name.includes("billing") || name.includes("medical")) return "medical";
    if (name.includes("inventory")) return "inventory";
    if (name.includes("rent") || name.includes("homerent")) return "homerent";
    if (name.includes("task")) return "taskmanager";
    if (name.includes("invoice")) return "invoice";
    return "medical";
  };

  const data = architecturesData[getProjKey()];

  return (
    <div className="space-y-12 py-4 text-left">
      {/* Header Info with Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <span className="font-mono text-[10px] text-slate-500 tracking-widest uppercase block mb-1">
            System Topology Map
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
            {data.title} Architecture
          </h3>
        </div>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wide border ${data.badgeTheme}`}>
          {data.badge}
        </span>
      </div>

      {/* Main Architecture Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* LEFT PANEL: Interactive Stack Flow (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Activity size={14} className="text-slate-400" />
            <h4 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest">
              Core Architecture Layers & Data Flow
            </h4>
          </div>

          <div className="space-y-4 relative">
            {/* Marching connector lines behind cards */}
            <div className="absolute left-7 sm:left-9 top-10 bottom-10 w-[2px] bg-white/5 pointer-events-none z-0">
              <div 
                className="w-full h-full bg-gradient-to-b from-rose-500 via-indigo-500 to-emerald-500" 
                style={{
                  maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
                }}
              >
                <div className="w-full h-1/4 bg-white/80 rounded animate-flow-dash-marching absolute top-0" />
              </div>
            </div>

            {/* FLOW STEP 0: Initiator / Role */}
            <div className="relative z-10 flex gap-4 sm:gap-6 items-center pl-3">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white/2 border border-white/10 flex items-center justify-center shadow-lg text-slate-400">
                <User size={16} />
              </div>
              <div className="glass-card rounded-xl border border-white/5 bg-white/2 p-3 px-4 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] text-slate-500 font-bold uppercase tracking-wider">FLOW INITIATOR</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                </div>
                <h5 className="font-display text-sm font-bold text-slate-300 mt-1">{data.role}</h5>
              </div>
            </div>

            {/* LAYER CARDS */}
            {data.layers.map((layer, idx) => {
              const LayerIcon = layer.icon;
              const isHovered = hoveredLayer === idx;

              return (
                <motion.div
                  key={idx}
                  onMouseEnter={() => setHoveredLayer(idx)}
                  onMouseLeave={() => setHoveredLayer(null)}
                  className={`relative z-10 flex gap-4 sm:gap-6 items-start pl-3 transition-all duration-300 ${
                    hoveredLayer !== null && !isHovered ? 'opacity-40 blur-[0.5px]' : 'opacity-100'
                  }`}
                >
                  {/* Layer Indicator Icon Circle */}
                  <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center shadow-lg transition-all duration-300 flex-shrink-0 mt-1 ${
                    isHovered 
                      ? 'bg-white/10 scale-110 border-white/30 text-white' 
                      : 'bg-white/2 border-white/5 text-slate-400'
                  }`}>
                    <LayerIcon size={16} />
                  </div>

                  {/* Layer Content */}
                  <div className={`glass-card rounded-xl border p-4 sm:p-5 flex-1 transition-all duration-300 ${
                    isHovered 
                      ? 'bg-white/5 border-white/20 shadow-xl' 
                      : 'bg-white/2 border-white/5'
                  }`}>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="font-mono text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                        LAYER 0{idx + 1} // {layer.name}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {layer.techs.map((tech) => (
                          <span 
                            key={tech} 
                            className="px-2 py-0.5 rounded bg-white/3 border border-white/5 text-[9px] font-mono text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-slate-400 text-xs font-sans leading-relaxed mt-2.5">
                      {layer.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Core Data Flow Trace */}
          <div className="bg-white/2 border border-white/5 rounded-xl p-4 mt-6">
            <span className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-2">
              Sequential Execution Pipeline
            </span>
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px] text-slate-400">
              {data.flow.map((step, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <ChevronRight size={10} className="text-slate-600 flex-shrink-0" />}
                  <span className={`px-2 py-0.5 rounded font-semibold tracking-wide ${
                    idx === 0 
                      ? 'bg-slate-500/10 text-slate-400 border border-slate-500/25' 
                      : idx === data.flow.length - 1 
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/25' 
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/25'
                  }`}>
                    {step}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: System Modules & Engines (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Workflow size={14} className="text-slate-400" />
            <h4 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest">
              Functional System Modules
            </h4>
          </div>

          {/* Module grid cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {data.modules.map((mod, idx) => {
              const isHovered = hoveredModule === idx;
              const isHighlight = mod.highlight;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredModule(idx)}
                  onMouseLeave={() => setHoveredModule(null)}
                  className={`glass-card rounded-xl border p-3.5 text-left transition-all duration-300 relative group overflow-hidden ${
                    isHighlight
                      ? 'border-emerald-500/30 bg-emerald-500/3 shadow-[0_0_15px_-4px_rgba(16,185,129,0.15)]'
                      : isHovered
                        ? 'bg-white/5 border-white/20'
                        : 'bg-white/2 border-white/5'
                  }`}
                >
                  {isHighlight && (
                    <div className="absolute top-1 right-2 flex items-center gap-1">
                      <Sparkles size={8} className="text-emerald-400 animate-pulse" />
                      <span className="text-[7px] font-mono font-bold text-emerald-400 tracking-wider">AI</span>
                    </div>
                  )}
                  
                  <h5 className={`font-display text-xs font-bold transition-colors ${
                    isHighlight
                      ? 'text-emerald-400'
                      : isHovered
                        ? 'text-rose-400'
                        : 'text-white'
                  }`}>
                    {mod.name}
                  </h5>
                  <p className="text-slate-400 text-[11px] font-sans leading-normal mt-1.5">
                    {mod.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Smart Inventory Additional Components */}
          {data.additional && (
            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                <Sparkles size={13} className="text-indigo-400" />
                <h4 className="font-mono text-xs font-bold text-indigo-400 uppercase tracking-widest">
                  Integrated Engines
                </h4>
              </div>
              <div className="space-y-3">
                {data.additional.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`glass-card rounded-xl border bg-white/2 border-white/5 p-4 relative overflow-hidden ${
                      item.glow ? 'border-indigo-500/35 bg-indigo-500/2 shadow-[0_0_15px_-5px_rgba(99,102,241,0.2)]' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h5 className={`font-display text-xs font-bold ${item.glow ? 'text-indigo-400' : 'text-white'}`}>
                        {item.name}
                      </h5>
                      <span className="font-mono text-[8px] text-slate-500 px-2 py-0.5 rounded border border-white/5">
                        {item.tech}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px] font-sans leading-relaxed mt-2">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* CSS Animation details */}
      <style>{`
        @keyframes flow-dash-marching {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(400%);
          }
        }
        .animate-flow-dash-marching {
          animation: flow-dash-marching 3.5s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ArchitectureViewer;
