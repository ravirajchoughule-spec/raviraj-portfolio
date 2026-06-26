import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, X, ChevronLeft, ChevronRight, Maximize2, Minimize2, Image, FileText } from 'lucide-react';
import ArchitectureViewer from './ArchitectureViewer';

const ProjectCardImage = ({ src, name, color = "#3b82f6" }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [sheenPos, setSheenPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSheenPos({ x, y });

    const valX = (e.clientX - rect.left) / rect.width - 0.5;
    const valY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(valX * 120); // Scale for angle tilt
    mouseY.set(valY * 120);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-60, 60], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-60, 60], [-8, 8]), springConfig);

  return (
    <div className="relative p-[1.5px] rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 hover:from-blue-500 hover:via-purple-500 hover:to-cyan-500 transition-all duration-500 group w-full">
      {/* Glow shadow behind the card - hidden in light mode via .blur-xl display none */}
      <div 
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: color }}
      />
      
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 1000
        }}
        className="relative aspect-[16/10] w-full overflow-hidden rounded-[14px] bg-[#0d0d11] shadow-2xl cursor-pointer"
      >
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover transition-all duration-500 ease-out grayscale group-hover:grayscale-0 group-hover:scale-105"
          style={{ 
            transform: "translateZ(20px)",
            transformStyle: "preserve-3d"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        
        {/* Dynamic Light Sheen sweep following mouse */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
          style={{
            background: `radial-gradient(150px circle at ${sheenPos.x}% ${sheenPos.y}%, rgba(255, 255, 255, 0.15), transparent 80%)`,
            mixBlendMode: 'overlay'
          }}
        />
      </motion.div>
    </div>
  );
};



const GithubIcon = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

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

const getGithubUrl = (projectName, originalUrl) => {
  const nameLower = projectName.toLowerCase();
  if (nameLower.includes("medical billing")) {
    return "https://github.com/ravirajchoughule-spec/medicleproject-main";
  }
  if (nameLower.includes("smart inventory")) {
    return "https://github.com/ravirajchoughule-spec/smart-inventory-system";
  }
  if (nameLower.includes("homerent") || nameLower.includes("house rental") || nameLower.includes("house-rental")) {
    return "https://github.com/ravirajchoughule-spec/rental";
  }
  if (nameLower.includes("task manager")) {
    return "https://github.com/ravirajchoughule-spec/Task-Manager";
  }
  return originalUrl;
};

const getProjectBadges = (projectName) => {
  const nameLower = projectName.toLowerCase();
  if (nameLower.includes("medical billing")) {
    return [
      { text: "🏥 Real World Solution", bg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400" },
      { text: "🚀 Production Ready", bg: "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400" },
      { text: "✅ Source Code Available", bg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold" }
    ];
  }
  if (nameLower.includes("homerent") || nameLower.includes("house rental") || nameLower.includes("house-rental")) {
    return [
      { text: "🏠 Full Stack Application", bg: "bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400" },
      { text: "🚀 Production Ready", bg: "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400" },
      { text: "✅ Source Code Available", bg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold" }
    ];
  }
  if (nameLower.includes("smart inventory")) {
    return [
      { text: "⭐ Featured Project", bg: "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400" },
      { text: "🚀 Production Ready", bg: "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400" },
      { text: "✅ Source Code Available", bg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold" }
    ];
  }
  if (nameLower.includes("task manager")) {
    return [
      { text: "📋 Task Management", bg: "bg-indigo-500/10 border-indigo-500/20 text-indigo-600 dark:text-indigo-400" },
      { text: "🚀 Production Ready", bg: "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400" },
      { text: "✅ Source Code Available", bg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold" }
    ];
  }
  if (nameLower.includes("invoice")) {
    return [
      { text: "🚧 Work In Progress", bg: "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400 font-bold" }
    ];
  }
  return [];
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [activeScreenshots, setActiveScreenshots] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [direction, setDirection] = useState(0);

  const [activeCaseStudy, setActiveCaseStudy] = useState(null);
  const [caseStudyImgIdx, setCaseStudyImgIdx] = useState(0);
  const [isCaseStudyFullscreen, setIsCaseStudyFullscreen] = useState(false);
  const [caseStudyDirection, setCaseStudyDirection] = useState(0);
  const [caseStudyTab, setCaseStudyTab] = useState('overview'); // 'overview' or 'architecture'

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIdx((prev) => (prev === 0 ? activeScreenshots.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIdx((prev) => (prev === activeScreenshots.length - 1 ? 0 : prev + 1));
  };

  const closeModal = () => {
    setActiveScreenshots(null);
    setCurrentIdx(0);
    setIsFullscreen(false);
  };

  const handleCaseStudyPrev = () => {
    if (!activeCaseStudy || !activeCaseStudy.caseStudy) return;
    setCaseStudyDirection(-1);
    setCaseStudyImgIdx((prev) => (prev === 0 ? activeCaseStudy.caseStudy.screenshots.length - 1 : prev - 1));
  };

  const handleCaseStudyNext = () => {
    if (!activeCaseStudy || !activeCaseStudy.caseStudy) return;
    setCaseStudyDirection(1);
    setCaseStudyImgIdx((prev) => (prev === activeCaseStudy.caseStudy.screenshots.length - 1 ? 0 : prev + 1));
  };

  const closeCaseStudy = () => {
    setActiveCaseStudy(null);
    setCaseStudyImgIdx(0);
    setIsCaseStudyFullscreen(false);
    setCaseStudyTab('overview');
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeScreenshots) {
        if (e.key === 'ArrowLeft') {
          handlePrev();
        } else if (e.key === 'ArrowRight') {
          handleNext();
        } else if (e.key === 'Escape') {
          closeModal();
        }
      } else if (activeCaseStudy) {
        if (e.key === 'ArrowLeft') {
          handleCaseStudyPrev();
        } else if (e.key === 'ArrowRight') {
          handleCaseStudyNext();
        } else if (e.key === 'Escape') {
          closeCaseStudy();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeScreenshots, currentIdx, activeCaseStudy, caseStudyImgIdx]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (activeScreenshots || activeCaseStudy) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeScreenshots, activeCaseStudy]);


  useEffect(() => {
    Promise.reject(new Error("Local static data"))
      .then((res) => res.json())
      .then((data) => {
        // Enforce mock details for rich case studies for all 5 projects
        const enriched = data.map((p, idx) => ({
          ...p,
          challenge: idx === 0 
            ? "Streamlining pharmacy inventory tracking and supplier accounts while monitoring expiry dates and invoice generation."
            : idx === 1
            ? "Real-time sync lag on high-frequency barcode scans, causing race conditions in stock levels."
            : idx === 2
            ? "Managing complex state sync across tenants, rental listings, and payment schedules under high traffic."
            : idx === 3
            ? "Implementing low-latency drag-and-drop state updates and board task organization with offline caching support."
            : "Creating clean, server-side PDF invoice assembly and automated financial aggregates calculations using PHP.",
          results: idx === 0
            ? "Developed customer portals and secure admin analytics to centralize sales, billing, and reminders in a single hub."
            : idx === 1
            ? "100% database lock prevention with parallel scans capacity scaled to support 150+ checkouts."
            : idx === 2
            ? "Reduced property listing update latency by 60% and automated rent due alert cycles."
            : idx === 3
            ? "Achieved instantaneous board status sync, 100% local caching capability, and offline data restoration."
            : "Cut invoice generation latency by 50% and simplified billing processing logs for financial reporting.",
          resultsLabel: "RESULT",
          challengeLabel: "CHALLENGE",
          caseStudy: idx === 0 ? {
            overview: "A full-featured Medical Billing and Pharmacy Management System developed to streamline pharmacy operations, inventory tracking, customer management, supplier management and billing processes.",
            screenshots: [
              {
                title: "Login Page",
                image: "/assets/projects/medical-billing-login.png",
                description: "Secure administrator authentication system."
              },
              {
                title: "Medical Store Dashboard",
                image: "/assets/projects/medical-billing-dashboard.png",
                description: "Real-time overview of customers, suppliers, invoices and inventory."
              },
              {
                title: "Customer Registration",
                image: "/assets/projects/medical-billing-customer.png",
                description: "Add and manage customer records."
              },
              {
                title: "Sales & Billing Module",
                image: "/assets/projects/medical-billing-sales.png",
                description: "Generate bills and process medicine sales."
              },
              {
                title: "Online Orders Management",
                image: "/assets/projects/medical-billing-orders.png",
                description: "Track online prescription orders and delivery status."
              },
              {
                title: "Stock Inventory",
                image: "/assets/projects/medical-billing-stock.png",
                description: "Monitor medicine quantities and expiry information."
              },
              {
                title: "Supplier Management",
                image: "/assets/projects/medical-billing-supplier.png",
                description: "Register and manage suppliers and purchase records."
              },
              {
                title: "Purchase Management",
                image: "/assets/projects/medical-billing-purchase.png",
                description: "Track medicine purchases and stock updates."
              },
              {
                title: "Expense & Credit Management",
                image: "/assets/projects/medical-billing-expense.png",
                description: "Manage business expenses and customer credits."
              },
              {
                title: "Notes Scheduler",
                image: "/assets/projects/medical-billing-notes.png",
                description: "Reminder and receivable tracking system."
              }
            ],
            challenges: [
              "Managing pharmaceutical inventory expiry alerts",
              "Synchronizing billing rates with supplier catalogs",
              "Tracking unpaid credits and customer balances",
              "Securing patient order prescription uploads",
              "Reducing system latencies during high-frequency billing"
            ],
            architecture: {
              frontend: ["React.js", "Bootstrap", "Tailwind CSS"],
              backend: ["Node.js", "Express.js"],
              database: ["SQLite"]
            },
            outcome: "Successfully built a pharmaceutical command center that automates invoice processing, tracks inventory levels, and speeds up customer checkouts by 40%."
          } : idx === 1 ? {
            overview: "Smart Inventory System is an enterprise-grade inventory management solution that helps businesses efficiently manage products, stock movements, warehouses, approvals, reporting, and AI-powered business analytics through a centralized dashboard.",
            screenshots: [
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
            ],
            challenges: [
              "Inventory tracking",
              "Stock management",
              "Product categorization",
              "Order processing",
              "Warehouse monitoring",
              "Business analytics",
              "Approval workflows",
              "Report generation",
              "Multi-module administration",
              "Enterprise inventory control"
            ],
            architecture: {
              frontend: ["React.js", "Bootstrap", "Tailwind CSS"],
              backend: ["Node.js", "Express.js"],
              database: ["SQLite"],
              additional: ["AI Analytics Engine", "Business Reporting System", "Warehouse Management Architecture"]
            },
            outcome: "Successfully developed a complete enterprise inventory management platform capable of handling products, orders, reports, warehouses, AI-powered analytics, approvals, and business operations within a single integrated solution."
          } : idx === 2 ? {
            overview: "This application helps landlords and property managers efficiently manage rental properties, tenants, payments and invoices from one centralized platform.",
            screenshots: [
              {
                title: "Login Page",
                image: "/assets/projects/homerent-login.png",
                description: "Secure property management authentication system."
              },
              {
                title: "Dashboard Overview",
                image: "/assets/projects/homerent-dashboard.png",
                description: "Overview of houses, tenants and rental operations."
              },
              {
                title: "House Categories",
                image: "/assets/projects/homerent-categories.png",
                description: "Create and manage rental property categories."
              },
              {
                title: "House Management",
                image: "/assets/projects/homerent-properties.png",
                description: "Register and manage rental properties."
              },
              {
                title: "Tenant Records",
                image: "/assets/projects/homerent-tenants.png",
                description: "Maintain tenant details and lease information."
              },
              {
                title: "Payments Registry",
                image: "/assets/projects/homerent-payments.png",
                description: "Track rent collections and pending balances."
              },
              {
                title: "Invoices & Transactions",
                image: "/assets/projects/homerent-invoices.png",
                description: "Generate rental invoices and payment records."
              },
              {
                title: "Financial Reports",
                image: "/assets/projects/homerent-reports.png",
                description: "Monitor rental income and outstanding balances."
              }
            ],
            challenges: [
              "Rental property tracking",
              "Tenant management",
              "Rent collection monitoring",
              "Invoice generation",
              "Financial reporting",
              "Property categorization"
            ],
            architecture: {
              frontend: ["React.js", "Bootstrap", "Tailwind CSS"],
              backend: ["Node.js", "Express.js"],
              database: ["SQLite"]
            },
            outcome: "Successfully developed a complete rental management solution capable of handling tenants, properties, invoices and financial operations in a single platform."
          } : idx === 3 ? {
            overview: "Task Manager System is a highly visual, enterprise-grade task tracking and sprint planning platform built to facilitate seamless coordination across engineering teams. It offers interactive Kanban boards, automated productivity tracking, scheduling calendars, and robust workload management.",
            screenshots: [
              {
                title: "SaaS Authentication Portal",
                image: "/assets/projects/taskmanager-login.png",
                description: "Modern authentication screen featuring email/password fields and sleek gradient animations."
              },
              {
                title: "Dashboard Overview",
                image: "/assets/projects/taskmanager-dashboard.png",
                description: "Analytics overview showcasing task statistics, productivity cards, upcoming deadlines, and team performance metrics."
              },
              {
                title: "Task List Registry",
                image: "/assets/projects/taskmanager-dashboard.png",
                description: "Unified task search and filter dashboard showing priority indicators, assignees, and progress statuses."
              },
              {
                title: "Task Creation Panel",
                image: "/assets/projects/taskmanager-kanban.png",
                description: "Enterprise-grade task creation form equipped with user assignment, due dates, description fields, and priority weight selectors."
              },
              {
                title: "Interactive Kanban Board",
                image: "/assets/projects/taskmanager-kanban.png",
                description: "Drag-and-drop workflow visualizer mapping states: To Do, In Progress, Review, and Completed."
              },
              {
                title: "Calendar View Scheduler",
                image: "/assets/projects/taskmanager-calendar.png",
                description: "Monthly calendar view interface allowing drag-and-drop task scheduling and project deadline planning."
              },
              {
                title: "Task Details Drawer",
                image: "/assets/projects/taskmanager-kanban.png",
                description: "Immersive drawer component for progress updates, attachment uploads, and real-time team comments."
              },
              {
                title: "Team Workload & Roles",
                image: "/assets/projects/taskmanager-dashboard.png",
                description: "Administrative view displaying team rosters, workspace roles, and active task distribution graphs."
              },
              {
                title: "Reports & Analytics Module",
                image: "/assets/projects/taskmanager-analytics.png",
                description: "Deep analytics dashboard showing completion statistics, individual speed metrics, and productivity charts."
              },
              {
                title: "User & Security Settings",
                image: "/assets/projects/taskmanager-login.png",
                description: "Clean user profile edit forms, organization preferences, and email notification configurations."
              }
            ],
            challenges: [
              "Establishing drag-and-drop state sync",
              "Ensuring sub-second UI responsiveness",
              "Designing offline-first local task sync",
              "Optimizing nested subtask completion triggers",
              "Formatting real-time multi-user team charts",
              "Securing organization-level authentication",
              "Managing notification dispatch queues",
              "Handling large database indexes on SQLite",
              "Structuring modular layout grids",
              "Building responsive multi-column layouts"
            ],
            architecture: {
              frontend: ["React.js", "Tailwind CSS", "Framer Motion", "Lucide React"],
              backend: ["Node.js", "Express.js"],
              database: ["SQLite"],
              additional: ["Local Caching Layer", "Offline Sync Engine", "Task Notification Daemon"]
            },
            outcome: "Successfully launched an enterprise-grade productivity system that achieves low-latency drag-and-drop card movements, offline resilience via indexDB caching, and real-time workload statistics aggregation."
          } : idx === 4 ? {
            overview: "Invoice Management System is a streamlined client ledger and billing suite designed to automate financial operations, tax filings, custom line-item billing, and professional PDF receipt generation.",
            screenshots: [
              {
                title: "SaaS Login Portal",
                image: "/assets/projects/invoicesystem-login.png",
                description: "Secure sign-in gateway with responsive design, glassmorphism card panels, and robust validation checks."
              },
              {
                title: "Dashboard Overview",
                image: "/assets/projects/invoicesystem-dashboard.png",
                description: "SaaS financial command center tracking total revenue analytics, collection statistics, and client list summaries."
              },
              {
                title: "Invoice Registry list",
                image: "/assets/projects/invoicesystem-list.png",
                description: "Comprehensive invoice database enabling full-text search, status filtering, and swift action drawer toggles."
              },
              {
                title: "Create Invoice Builder",
                image: "/assets/projects/invoicesystem-create.png",
                description: "Dynamic bill form featuring multi-item table inputs, instant tax Calculations, and discount options."
              },
              {
                title: "Invoice PDF Previewer",
                image: "/assets/projects/invoicesystem-preview.png",
                description: "Professional PDF rendering overlay allowing administrators to preview, print, or download invoices instantly."
              },
              {
                title: "Customer Database",
                image: "/assets/projects/invoicesystem-list.png",
                description: "Customer profiling system showing client contact directories, invoice archives, and total sales history."
              },
              {
                title: "Payments Module",
                image: "/assets/projects/invoicesystem-dashboard.png",
                description: "Detailed payment ledger tracking payment methods, txn reference IDs, and collection histories."
              },
              {
                title: "Revenue Reports & Graphs",
                image: "/assets/projects/invoicesystem-preview.png",
                description: "Monthly earnings dashboards with breakdown of gross vs net profit, GST collected, and export filters."
              },
              {
                title: "Tax & GST Configuration",
                image: "/assets/projects/invoicesystem-create.png",
                description: "Advanced configuration panel for tax rates, VAT/GST parameters, custom currency labels, and invoicing prefixes."
              },
              {
                title: "System & Profile Settings",
                image: "/assets/projects/invoicesystem-login.png",
                description: "System branding adjustments, SMTP email configuration, and data backup utility schedules."
              }
            ],
            challenges: [
              "Managing precision decimal floating point calculations",
              "Rendering consistent PDF layouts across browsers",
              "Automating tax calculations and dynamic tables",
              "Structuring database relations for invoicing history",
              "Handling rapid API updates on database updates",
              "Enforcing strict authorization gates on billing routes"
            ],
            architecture: {
              frontend: ["React.js", "Tailwind CSS", "Bootstrap", "Lucide React"],
              backend: ["Node.js", "Express.js"],
              database: ["SQLite"],
              additional: ["PDF Rendering Engine", "SMTP Automatic Dispatcher", "Tax Computation Service"]
            },
            outcome: "Delivered a complete billing operations hub that simplifies invoicing lifecycles, cuts rendering delays by 50%, and automatically calculates localized taxes, improving tenant-landlord trust."
          } : null
        }));

        setProjects(enriched);
      })
      .catch(() => {
        setProjects([
          {
            name: "Medical Billing & Pharmacy Management System",
            description: "A full-featured Medical Billing and Pharmacy Management System developed to streamline pharmacy operations, inventory tracking, customer management, supplier management and billing processes.",
            tags: "React.js, Node.js, Express.js, SQLite, Bootstrap, Tailwind CSS",
            github_url: "https://github.com/ravirajchoughule-spec/medicleproject-main",
            live_url: "https://medical-billing-demo.example.com",
            image_path: "/assets/projects/medical-billing-dashboard.png",
            challenge: "Streamlining pharmacy inventory tracking and supplier accounts while monitoring expiry dates and invoice generation.",
            results: "Developed customer portals and secure admin analytics to centralize sales, billing, and reminders in a single hub.",
            caseStudy: {
              overview: "A full-featured Medical Billing and Pharmacy Management System developed to streamline pharmacy operations, inventory tracking, customer management, supplier management and billing processes.",
              screenshots: [
                {
                  title: "Login Page",
                  image: "/assets/projects/medical-billing-login.png",
                  description: "Secure administrator authentication system."
                },
                {
                  title: "Medical Store Dashboard",
                  image: "/assets/projects/medical-billing-dashboard.png",
                  description: "Real-time overview of customers, suppliers, invoices and inventory."
                },
                {
                  title: "Customer Registration",
                  image: "/assets/projects/medical-billing-customer.png",
                  description: "Add and manage customer records."
                },
                {
                  title: "Sales & Billing Module",
                  image: "/assets/projects/medical-billing-sales.png",
                  description: "Generate bills and process medicine sales."
                },
                {
                  title: "Online Orders Management",
                  image: "/assets/projects/medical-billing-orders.png",
                  description: "Track online prescription orders and delivery status."
                },
                {
                  title: "Stock Inventory",
                  image: "/assets/projects/medical-billing-stock.png",
                  description: "Monitor medicine quantities and expiry information."
                },
                {
                  title: "Supplier Management",
                  image: "/assets/projects/medical-billing-supplier.png",
                  description: "Register and manage suppliers and purchase records."
                },
                {
                  title: "Purchase Management",
                  image: "/assets/projects/medical-billing-purchase.png",
                  description: "Track medicine purchases and stock updates."
                },
                {
                  title: "Expense & Credit Management",
                  image: "/assets/projects/medical-billing-expense.png",
                  description: "Manage business expenses and customer credits."
                },
                {
                  title: "Notes Scheduler",
                  image: "/assets/projects/medical-billing-notes.png",
                  description: "Reminder and receivable tracking system."
                }
              ],
              challenges: [
                "Managing pharmaceutical inventory expiry alerts",
                "Synchronizing billing rates with supplier catalogs",
                "Tracking unpaid credits and customer balances",
                "Securing patient order prescription uploads",
                "Reducing system latencies during high-frequency billing"
              ],
              architecture: {
                frontend: ["React.js", "Bootstrap", "Tailwind CSS"],
                backend: ["Node.js", "Express.js"],
                database: ["SQLite"]
              },
              outcome: "Successfully built a pharmaceutical command center that automates invoice processing, tracks inventory levels, and speeds up customer checkouts by 40%."
            }
          },
          {
            name: "Smart Inventory System",
            description: "Smart Inventory System is a full-stack enterprise inventory and warehouse management platform developed to manage products, stock levels, orders, reports, AI-powered analytics, approvals, and multi-warehouse operations from a centralized administration dashboard.",
            tags: "React.js, Node.js, Express.js, SQLite, Bootstrap, Tailwind CSS",
            github_url: "https://github.com/ravirajchoughule-spec/smart-inventory-system",
            live_url: "https://smart-inventory-demo.example.com",
            image_path: "/assets/projects/smartinventory-dashboard.png",
            challenge: "Real-time sync lag on high-frequency barcode scans, causing race conditions in stock levels.",
            results: "100% database lock prevention with parallel scans capacity scaled to support 150+ checkouts.",
            caseStudy: {
              overview: "Smart Inventory System is an enterprise-grade inventory management solution that helps businesses efficiently manage products, stock movements, warehouses, approvals, reporting, and AI-powered business analytics through a centralized dashboard.",
              screenshots: [
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
              ],
              challenges: [
                "Inventory tracking",
                "Stock management",
                "Product categorization",
                "Order processing",
                "Warehouse monitoring",
                "Business analytics",
                "Approval workflows",
                "Report generation",
                "Multi-module administration",
                "Enterprise inventory control"
              ],
              architecture: {
                frontend: ["React.js", "Bootstrap", "Tailwind CSS"],
                backend: ["Node.js", "Express.js"],
                database: ["SQLite"],
                additional: ["AI Analytics Engine", "Business Reporting System", "Warehouse Management Architecture"]
              },
              outcome: "Successfully developed a complete enterprise inventory management platform capable of handling products, orders, reports, warehouses, AI-powered analytics, approvals, and business operations within a single integrated solution."
            }
          },
          {
            name: "HomeRent Pro - House Rental Management System",
            description: "HomeRent Pro is a full-stack property rental management platform developed to manage houses, tenants, rent collection, invoices and financial reports through a centralized administration dashboard.",
            tags: "React.js, Node.js, Express.js, SQLite, Bootstrap, Tailwind CSS",
            github_url: "https://github.com/ravirajchoughule-spec/rental",
            live_url: "https://house-rental-demo.example.com",
            image_path: "/assets/projects/homerent-login.png",
            challenge: "Managing complex state sync across tenants, rental listings, and payment schedules under high traffic.",
            results: "Reduced property listing update latency by 60% and automated rent due alert cycles.",
            caseStudy: {
              overview: "This application helps landlords and property managers efficiently manage rental properties, tenants, payments and invoices from one centralized platform.",
              screenshots: [
                {
                  title: "Login Page",
                  image: "/assets/projects/homerent-login.png",
                  description: "Secure property management authentication system."
                },
                {
                  title: "Dashboard Overview",
                  image: "/assets/projects/homerent-dashboard.png",
                  description: "Overview of houses, tenants and rental operations."
                },
                {
                  title: "House Categories",
                  image: "/assets/projects/homerent-categories.png",
                  description: "Create and manage rental property categories."
                },
                {
                  title: "House Management",
                  image: "/assets/projects/homerent-properties.png",
                  description: "Register and manage rental properties."
                },
                {
                  title: "Tenant Records",
                  image: "/assets/projects/homerent-tenants.png",
                  description: "Maintain tenant details and lease information."
                },
                {
                  title: "Payments Registry",
                  image: "/assets/projects/homerent-payments.png",
                  description: "Track rent collections and pending balances."
                },
                {
                  title: "Invoices & Transactions",
                  image: "/assets/projects/homerent-invoices.png",
                  description: "Generate rental invoices and payment records."
                },
                {
                  title: "Financial Reports",
                  image: "/assets/projects/homerent-reports.png",
                  description: "Monitor rental income and outstanding balances."
                }
              ],
              challenges: [
                "Rental property tracking",
                "Tenant management",
                "Rent collection monitoring",
                "Invoice generation",
                "Financial reporting",
                "Property categorization"
              ],
              architecture: {
                frontend: ["React.js", "Bootstrap", "Tailwind CSS"],
                backend: ["Node.js", "Express.js"],
                database: ["SQLite"]
              },
              outcome: "Successfully developed a complete rental management solution capable of handling tenants, properties, invoices and financial operations in a single platform."
            }
          },
          {
            name: "Task Manager System",
            description: "A high-performance SaaS task management and productivity collaboration platform designed for tracking sprints, managing team workloads, planning monthly schedules, and monitoring performance analytics.",
            tags: "React.js, Node.js, Express.js, SQLite, Tailwind CSS",
            github_url: "https://github.com/ravirajchoughule-spec/Task-Manager",
            live_url: "https://task-manager-demo.example.com",
            image_path: "/assets/projects/taskmanager-dashboard.png",
            challenge: "Implementing low-latency drag-and-drop state updates and board task organization with offline caching support.",
            results: "Achieved instantaneous board status sync, 100% local caching capability, and offline data restoration.",
            caseStudy: {
              overview: "Task Manager System is a highly visual, enterprise-grade task tracking and sprint planning platform built to facilitate seamless coordination across engineering teams. It offers interactive Kanban boards, automated productivity tracking, scheduling calendars, and robust workload management.",
              screenshots: [
                {
                  title: "SaaS Authentication Portal",
                  image: "/assets/projects/taskmanager-login.png",
                  description: "Modern authentication screen featuring email/password fields and sleek gradient animations."
                },
                {
                  title: "Dashboard Overview",
                  image: "/assets/projects/taskmanager-dashboard.png",
                  description: "Analytics overview showcasing task statistics, productivity cards, upcoming deadlines, and team performance metrics."
                },
                {
                  title: "Task List Registry",
                  image: "/assets/projects/taskmanager-dashboard.png",
                  description: "Unified task search and filter dashboard showing priority indicators, assignees, and progress statuses."
                },
                {
                  title: "Task Creation Panel",
                  image: "/assets/projects/taskmanager-kanban.png",
                  description: "Enterprise-grade task creation form equipped with user assignment, due dates, description fields, and priority weight selectors."
                },
                {
                  title: "Interactive Kanban Board",
                  image: "/assets/projects/taskmanager-kanban.png",
                  description: "Drag-and-drop workflow visualizer mapping states: To Do, In Progress, Review, and Completed."
                },
                {
                  title: "Calendar View Scheduler",
                  image: "/assets/projects/taskmanager-calendar.png",
                  description: "Monthly calendar view interface allowing drag-and-drop task scheduling and project deadline planning."
                },
                {
                  title: "Task Details Drawer",
                  image: "/assets/projects/taskmanager-kanban.png",
                  description: "Immersive drawer component for progress updates, attachment uploads, and real-time team comments."
                },
                {
                  title: "Team Workload & Roles",
                  image: "/assets/projects/taskmanager-dashboard.png",
                  description: "Administrative view displaying team rosters, workspace roles, and active task distribution graphs."
                },
                {
                  title: "Reports & Analytics Module",
                  image: "/assets/projects/taskmanager-analytics.png",
                  description: "Deep analytics dashboard showing completion statistics, individual speed metrics, and productivity charts."
                },
                {
                  title: "User & Security Settings",
                  image: "/assets/projects/taskmanager-login.png",
                  description: "Clean user profile edit forms, organization preferences, and email notification configurations."
                }
              ],
              challenges: [
                "Establishing drag-and-drop state sync",
                "Ensuring sub-second UI responsiveness",
                "Designing offline-first local task sync",
                "Optimizing nested subtask completion triggers",
                "Formatting real-time multi-user team charts",
                "Securing organization-level authentication",
                "Managing notification dispatch queues",
                "Handling large database indexes on SQLite",
                "Structuring modular layout grids",
                "Building responsive multi-column layouts"
              ],
              architecture: {
                frontend: ["React.js", "Tailwind CSS", "Framer Motion", "Lucide React"],
                backend: ["Node.js", "Express.js"],
                database: ["SQLite"],
                additional: ["Local Caching Layer", "Offline Sync Engine", "Task Notification Daemon"]
              },
              outcome: "Successfully launched an enterprise-grade productivity system that achieves low-latency drag-and-drop card movements, offline resilience via indexDB caching, and real-time workload statistics aggregation."
            }
          },
          {
            name: "Invoice Management System",
            description: "A sleek enterprise billing and invoice operations suite built to handle complex customer ledgers, line item cost building, automated tax calculations, transactional reports, and PDF receipt rendering.",
            tags: "React.js, Node.js, Express.js, SQLite, Tailwind CSS",
            github_url: "https://github.com/ravirajchoughule-spec/invoice-system",
            live_url: "https://invoice-system-demo.example.com",
            image_path: "/assets/projects/invoicesystem-dashboard.png",
            challenge: "Creating clean, server-side PDF invoice assembly and automated financial aggregates calculations using PHP.",
            results: "Cut invoice generation latency by 50% and simplified billing processing logs for financial reporting.",
            caseStudy: {
              overview: "Invoice Management System is a streamlined client ledger and billing suite designed to automate financial operations, tax filings, custom line-item billing, and professional PDF receipt generation.",
              screenshots: [
                {
                  title: "SaaS Login Portal",
                  image: "/assets/projects/invoicesystem-login.png",
                  description: "Secure sign-in gateway with responsive design, glassmorphism card panels, and robust validation checks."
                },
                {
                  title: "Dashboard Overview",
                  image: "/assets/projects/invoicesystem-dashboard.png",
                  description: "SaaS financial command center tracking total revenue analytics, collection statistics, and client list summaries."
                },
                {
                  title: "Invoice Registry list",
                  image: "/assets/projects/invoicesystem-list.png",
                  description: "Comprehensive invoice database enabling full-text search, status filtering, and swift action drawer toggles."
                },
                {
                  title: "Create Invoice Builder",
                  image: "/assets/projects/invoicesystem-create.png",
                  description: "Dynamic bill form featuring multi-item table inputs, instant tax Calculations, and discount options."
                },
                {
                  title: "Invoice PDF Previewer",
                  image: "/assets/projects/invoicesystem-preview.png",
                  description: "Professional PDF rendering overlay allowing administrators to preview, print, or download invoices instantly."
                },
                {
                  title: "Customer Database",
                  image: "/assets/projects/invoicesystem-list.png",
                  description: "Customer profiling system showing client contact directories, invoice archives, and total sales history."
                },
                {
                  title: "Payments Module",
                  image: "/assets/projects/invoicesystem-dashboard.png",
                  description: "Detailed payment ledger tracking payment methods, txn reference IDs, and collection histories."
                },
                {
                  title: "Revenue Reports & Graphs",
                  image: "/assets/projects/invoicesystem-preview.png",
                  description: "Monthly earnings dashboards with breakdown of gross vs net profit, GST collected, and export filters."
                },
                {
                  title: "Tax & GST Configuration",
                  image: "/assets/projects/invoicesystem-create.png",
                  description: "Advanced configuration panel for tax rates, VAT/GST parameters, custom currency labels, and invoicing prefixes."
                },
                {
                  title: "System & Profile Settings",
                  image: "/assets/projects/invoicesystem-login.png",
                  description: "System branding adjustments, SMTP email configuration, and data backup utility schedules."
                }
              ],
              challenges: [
                "Managing precision decimal floating point calculations",
                "Rendering consistent PDF layouts across browsers",
                "Automating tax calculations and dynamic tables",
                "Structuring database relations for invoicing history",
                "Handling rapid API updates on database updates",
                "Enforcing strict authorization gates on billing routes"
              ],
              architecture: {
                frontend: ["React.js", "Tailwind CSS", "Bootstrap", "Lucide React"],
                backend: ["Node.js", "Express.js"],
                database: ["SQLite"],
                additional: ["PDF Rendering Engine", "SMTP Automatic Dispatcher", "Tax Computation Service"]
              },
              outcome: "Delivered a complete billing operations hub that simplifies invoicing lifecycles, cuts rendering delays by 50%, and automatically calculates localized taxes, improving tenant-landlord trust."
            }
          }
        ]);
      });
  }, []);

  return (
    <section id="projects" className="relative py-24 px-6 md:px-12 lg:px-24 bg-[#050507]">
      <div className="mx-auto max-w-7xl w-full">
        
        {/* Section Title */}
        <div className="mb-20 md:mb-28 text-left">
          <span className="font-mono text-xs text-slate-500 tracking-widest uppercase block mb-3">03 // FEATURED PROJECTS</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight heading-underline mb-4">
            Featured Projects
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mt-4 font-sans leading-relaxed">
            Real-world applications designed and developed using modern Full Stack technologies.
          </p>
        </div>

        {/* Alternating Project Showcase */}
        <div className="space-y-32 md:space-y-48">
          {projects.map((project, idx) => {
            const isEven = idx % 2 === 0;
            const isSmartInventory = project.name === "Smart Inventory System" || idx === 1;
            return (
              <div
                key={project.name}
                className={`flex flex-col lg:flex-row gap-10 lg:gap-20 items-center relative transition-all duration-700 ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } ${
                  isSmartInventory 
                    ? 'p-6 md:p-8 rounded-3xl bg-white/2 border border-white/5 shadow-[0_0_50px_-12px_rgba(14,165,233,0.03)] hover:border-cyan-500/10 hover:shadow-[0_0_50px_-10px_rgba(14,165,233,0.08)]' 
                    : ''
                }`}
              >
                {/* Futuristic background floating tech graphics for Smart Inventory */}
                {isSmartInventory && (
                  <>
                    <div className="absolute -left-10 top-1/4 w-36 h-36 opacity-10 pointer-events-none z-0 hidden xl:block">
                      <svg viewBox="0 0 100 100" className="w-full h-full text-[#0ea5e9] stroke-current stroke-[0.8] fill-none">
                        <circle cx="30" cy="30" r="2.5" className="fill-[#0ea5e9]" />
                        <circle cx="70" cy="50" r="2.5" className="fill-[#0ea5e9]" />
                        <line x1="30" y1="30" x2="70" y2="50" />
                        <line x1="70" y1="50" x2="50" y2="90" />
                        <circle cx="50" cy="90" r="2.5" className="fill-[#0ea5e9]" />
                      </svg>
                    </div>
                    <div className="absolute -right-10 bottom-1/4 w-36 h-36 opacity-10 pointer-events-none z-0 hidden xl:block">
                      <svg viewBox="0 0 100 100" className="w-full h-full text-[#9d4edd] stroke-current stroke-[0.8] fill-none animate-pulse">
                        <rect x="25" y="25" width="12" height="12" rx="1.5" />
                        <rect x="65" y="55" width="12" height="12" rx="1.5" />
                        <path d="M37 31 L65 61" />
                      </svg>
                    </div>
                  </>
                )}

                {/* Image Panel (Left/Right) */}
                <div className="w-full lg:w-1/2 group relative">
                  {/* Floating HUD graphics overlay on hover for Smart Inventory */}
                  {isSmartInventory && (
                    <>
                      <div className="absolute -top-3 -right-3 z-10 px-2.5 py-1 bg-[#050507]/90 border border-cyan-500/20 rounded-lg text-cyan-400 font-mono text-[9px] font-bold tracking-widest uppercase flex items-center gap-1.5 shadow-[0_4px_12px_rgba(6,182,212,0.15)] select-none">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
                        </span>
                        AI Analytics Engine
                      </div>
                      <div className="absolute -bottom-3 -left-3 z-10 px-2.5 py-1 bg-[#050507]/90 border border-[#9d4edd]/20 rounded-lg text-[#9d4edd] font-mono text-[9px] font-bold tracking-widest uppercase flex items-center gap-1.5 shadow-[0_4px_12px_rgba(157,78,221,0.15)] select-none">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-500"></span>
                        </span>
                        WMS Multi-Warehouse
                      </div>
                    </>
                  )}

                  <ProjectCardImage 
                    src={project.image_path} 
                    name={project.name} 
                    color={
                      project.name.toLowerCase().includes("medical billing") ? "#10b981" :
                      project.name.toLowerCase().includes("smart inventory") ? "#0ea5e9" :
                      project.name.toLowerCase().includes("homerent") || project.name.toLowerCase().includes("house-rental") || project.name.toLowerCase().includes("house rental") ? "#8b5cf6" :
                      project.name.toLowerCase().includes("task manager") ? "#6366f1" :
                      "#f43f5e"
                    }
                  />
                </div>

                {/* Text Panel (Right/Left) */}
                <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                  <span className="font-mono text-xs text-slate-500 tracking-wider mb-2">CASE STUDY 0{idx + 1}</span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
                    {project.name}
                  </h3>

                  {/* Status Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {getProjectBadges(project.name).map((badge) => (
                      <span
                        key={badge.text}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[9px] font-mono font-bold uppercase tracking-wider ${badge.bg}`}
                      >
                        {badge.text}
                      </span>
                    ))}
                  </div>

                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6 font-sans">
                    {project.description}
                  </p>

                  {/* Case Study Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full border-t border-white/5 pt-6 mb-6">
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">CHALLENGE</span>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans mt-1.5">{project.challenge}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">RESULT</span>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans mt-1.5">{project.results}</p>
                    </div>
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.split(',').map((tag) => (
                      <span
                        key={tag.trim()}
                        className="rounded bg-white/3 border border-white/5 px-2.5 py-1 text-xs font-mono text-slate-300"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons with specific gradients or Premium Status Card */}
                  {project.name.toLowerCase().includes("invoice") ? (
                    <div className="w-full glass-card p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 mt-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-500 font-mono text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                          </span>
                          🚧 Work In Progress
                        </span>
                        <button
                          disabled
                          className="opacity-50 cursor-not-allowed px-4 py-1.5 bg-slate-800 border border-white/10 rounded-md text-[11px] font-mono font-semibold tracking-wider text-slate-400 select-none"
                        >
                          Coming Soon
                        </button>
                      </div>
                      <div>
                        <h4 className="font-display text-sm font-bold text-white mb-1">
                          Please wait, I am currently working on something exciting.
                        </h4>
                        <p className="text-xs text-slate-400 font-sans leading-relaxed">
                          The Invoice Management System is under active development and will be available soon.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap items-center gap-4">
                      {project.caseStudy && (
                        <button
                          onClick={() => {
                            setActiveCaseStudy(project);
                            setCaseStudyImgIdx(0);
                          }}
                          className="btn-screenshots"
                        >
                          <Image size={14} /> Explore Project
                        </button>
                      )}
                      <a
                        href={getGithubUrl(project.name, project.github_url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-github-project flex items-center gap-2"
                      >
                        <GithubIcon size={14} /> View Source Code <ExternalLink size={12} className="opacity-70" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Premium Screenshots Modal Gallery */}
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
                  {currentIdx + 1} / {activeScreenshots.length}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                  title={isFullscreen ? "Minimize View" : "Fullscreen View"}
                >
                  {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
                <button
                  onClick={closeModal}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                  title="Close Gallery"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Main Interactive Slider */}
            <div className="flex-1 flex items-center justify-between px-4 sm:px-12 md:px-24 py-8 relative min-h-[300px] md:min-h-[500px]">
              {/* Previous Button */}
              <button
                onClick={handlePrev}
                className="absolute left-4 z-20 p-3 bg-white/5 hover:bg-white/10 hover:text-white text-slate-400 rounded-full transition-all border border-white/5 shadow-lg flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Central Image Showcase */}
              <div className="w-full h-full flex items-center justify-center max-w-5xl mx-auto overflow-hidden">
                <div className={`relative transition-all duration-300 w-full flex justify-center items-center ${isFullscreen ? 'h-[75vh]' : 'h-[50vh] sm:h-[55vh]'}`}>
                  <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.img
                      key={currentIdx}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                      }}
                      src={activeScreenshots[currentIdx].image}
                      alt={activeScreenshots[currentIdx].title}
                      className="max-w-full max-h-full object-contain rounded-lg border border-white/5 shadow-2xl"
                    />
                  </AnimatePresence>
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-4 z-20 p-3 bg-white/5 hover:bg-white/10 hover:text-white text-slate-400 rounded-full transition-all border border-white/5 shadow-lg flex items-center justify-center cursor-pointer"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Case-study Description Footer */}
            <div className="border-t border-white/5 bg-[#0d0d11]/80 backdrop-blur-sm py-8 px-6 md:px-12">
              <div className="max-w-3xl mx-auto text-center md:text-left">
                <motion.div
                  key={currentIdx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 justify-center md:justify-start">
                    <h4 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {activeScreenshots[currentIdx].title}
                    </h4>
                    <span className="hidden md:inline text-slate-600">|</span>
                    <span className="font-mono text-xs text-[#0ea5e9] uppercase tracking-wider">
                      Case-Study Exhibit
                    </span>
                  </div>
                  
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {activeScreenshots[currentIdx].explanation}
                  </p>

                  <div className="bg-white/2 border border-white/5 rounded-lg p-4 mt-6 text-left">
                    <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">
                      RELATED FEATURE DESCRIPTION
                    </span>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed">
                      {activeScreenshots[currentIdx].feature}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Case-Study Immersive Modal */}
      <AnimatePresence>
        {activeCaseStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-[#050507]/97 backdrop-blur-lg overflow-y-auto select-none"
          >
            {/* Top Navigation Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0d0d11]/90 backdrop-blur-sm sticky top-0 z-10">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <span className="font-mono text-xs text-slate-500 tracking-wider">PROJECT CASE STUDY</span>
                <span className="hidden md:inline h-1.5 w-1.5 rounded-full bg-[#0ea5e9]" />
                <h3 className="font-display text-base font-bold text-white tracking-tight">
                  {activeCaseStudy.name}
                </h3>
              </div>
              <button
                onClick={closeCaseStudy}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                title="Close Case Study"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Container */}
            <div className="flex-1 w-full max-w-5xl mx-auto px-6 py-12 md:py-20 space-y-16">
              
              {/* Header Title Intro */}
              <div className="border-b border-white/5 pb-10">
                <div className="flex flex-wrap gap-2 mb-4">
                  {activeCaseStudy.tags.split(',').map((tag) => (
                    <span
                      key={tag.trim()}
                      className="rounded bg-white/3 border border-white/5 px-2.5 py-0.5 text-xs font-mono text-slate-300"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>

                {/* GitHub Repository Button or Premium Status Card */}
                {activeCaseStudy.name.toLowerCase().includes("invoice") ? (
                  <div className="w-full glass-card p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 mb-6 space-y-4 text-left">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-500 font-mono text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                        </span>
                        🚧 Work In Progress
                      </span>
                      <button
                        disabled
                        className="opacity-50 cursor-not-allowed px-4 py-1.5 bg-slate-800 border border-white/10 rounded-md text-[11px] font-mono font-semibold tracking-wider text-slate-400 select-none"
                      >
                        Coming Soon
                      </button>
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-bold text-white mb-1">
                        Please wait, I am currently working on something exciting.
                      </h4>
                      <p className="text-xs text-slate-400 font-sans leading-relaxed">
                        The Invoice Management System is under active development and will be available soon.
                      </p>
                    </div>
                  </div>
                ) : (
                  <a
                    href={getGithubUrl(activeCaseStudy.name, activeCaseStudy.github_url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-github-project px-5 py-2.5 rounded-lg text-xs font-mono font-semibold tracking-wider transition-all duration-300 flex items-center gap-2 w-fit mb-6 hover:scale-[1.02] cursor-pointer"
                  >
                    <GithubIcon size={14} /> View Source Code <ExternalLink size={12} className="opacity-70" />
                  </a>
                )}

                <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Case Study: {activeCaseStudy.name}
                </h2>

                {/* Tabs Navigation Selector */}
                <div className="flex bg-[#0d0d11]/80 p-1 rounded-xl border border-white/5 gap-1 w-fit mt-8">
                  <button
                    onClick={() => setCaseStudyTab('overview')}
                    className={`px-5 py-2 rounded-lg text-xs font-mono font-semibold tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                      caseStudyTab === 'overview'
                        ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold'
                        : 'bg-transparent border border-transparent text-slate-400 hover:text-white'
                    }`}
                  >
                    <FileText size={13} />
                    Overview & Workflow
                  </button>
                  <button
                    onClick={() => setCaseStudyTab('architecture')}
                    className={`px-5 py-2 rounded-lg text-xs font-mono font-semibold tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                      caseStudyTab === 'architecture'
                        ? 'bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold'
                        : 'bg-transparent border border-transparent text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="text-[13px]">🏗️</span>
                    Architecture
                  </button>
                </div>
              </div>

              {caseStudyTab === 'overview' ? (
                <>
                  {/* 1. Project Overview */}
                  <div className="space-y-4">
                    <h3 className="font-mono text-xs font-bold text-slate-500 uppercase tracking-widest block">
                      01 / Project Overview
                    </h3>
                    <div className="glass-card rounded-xl p-6 md:p-8 bg-white/1 border border-white/5">
                      <p className="text-slate-300 text-sm sm:text-base sm:leading-relaxed font-sans">
                        {activeCaseStudy.caseStudy.overview}
                      </p>
                    </div>
                  </div>

                  {/* 2. Screenshot Gallery */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-mono text-xs font-bold text-slate-500 uppercase tracking-widest block">
                        02 / Interactive Screenshot Gallery
                      </h3>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setIsCaseStudyFullscreen(!isCaseStudyFullscreen)}
                          className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                          title={isCaseStudyFullscreen ? "Minimize View" : "Fullscreen View"}
                        >
                          {isCaseStudyFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                        </button>
                        <span className="font-mono text-xs text-slate-400 font-semibold tracking-wider">
                          Screenshot {caseStudyImgIdx + 1} / {activeCaseStudy.caseStudy.screenshots.length}
                        </span>
                      </div>
                    </div>

                    {/* Lightbox / Slider Display */}
                    <div className="relative overflow-hidden rounded-xl border border-white/5 bg-[#0d0d11] shadow-2xl flex flex-col">
                      {/* Image Display */}
                      <div className={`relative flex items-center justify-center p-4 sm:p-12 md:p-16 border-b border-white/5 transition-all duration-300 ${isCaseStudyFullscreen ? 'h-[75vh]' : 'h-[40vh] sm:h-[50vh]'}`}>
                        {/* Left arrow */}
                        <button
                          onClick={handleCaseStudyPrev}
                          className="absolute left-4 z-20 p-2.5 bg-[#050507]/60 hover:bg-[#050507]/80 hover:text-white text-slate-400 rounded-full transition-all border border-white/5 shadow-lg flex items-center justify-center cursor-pointer"
                        >
                          <ChevronLeft size={20} />
                        </button>

                        <div className="w-full h-full flex items-center justify-center overflow-hidden">
                          <AnimatePresence initial={false} custom={caseStudyDirection} mode="wait">
                            <motion.img
                              key={caseStudyImgIdx}
                              custom={caseStudyDirection}
                              variants={slideVariants}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                              }}
                              src={activeCaseStudy.caseStudy.screenshots[caseStudyImgIdx].image}
                              alt={activeCaseStudy.caseStudy.screenshots[caseStudyImgIdx].title}
                              className="max-w-full max-h-full object-contain rounded border border-white/5 shadow-xl transition-transform duration-500 hover:scale-[1.03] cursor-zoom-in"
                            />
                          </AnimatePresence>
                        </div>

                        {/* Right arrow */}
                        <button
                          onClick={handleCaseStudyNext}
                          className="absolute right-4 z-20 p-2.5 bg-[#050507]/60 hover:bg-[#050507]/80 hover:text-white text-slate-400 rounded-full transition-all border border-white/5 shadow-lg flex items-center justify-center cursor-pointer"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>

                      {/* Details Block below screenshot */}
                      <div className="bg-[#0b0b0e] px-6 py-6 md:py-8">
                        <motion.div
                          key={caseStudyImgIdx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-2"
                        >
                          <h4 className="font-display text-lg font-bold text-white">
                            {activeCaseStudy.caseStudy.screenshots[caseStudyImgIdx].title}
                          </h4>
                          <p className="text-sm text-slate-400 font-sans leading-relaxed">
                            {activeCaseStudy.caseStudy.screenshots[caseStudyImgIdx].description}
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* 3. Challenges Solved & 4. Technical Architecture Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Challenges */}
                    <div className="space-y-4">
                      <h3 className="font-mono text-xs font-bold text-slate-500 uppercase tracking-widest block">
                        03 / Challenges Solved
                      </h3>
                      <div className="glass-card rounded-xl p-6 md:p-8 bg-white/1 border border-white/5 h-full">
                        <ul className="grid grid-cols-1 gap-3">
                          {activeCaseStudy.caseStudy.challenges.map((challenge, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-[#0ea5e9] mt-2" />
                              <span className="text-slate-300 text-sm font-sans leading-normal">{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Technical Architecture */}
                    <div className="space-y-4">
                      <h3 className="font-mono text-xs font-bold text-slate-500 uppercase tracking-widest block">
                        04 / Technical Architecture
                      </h3>
                      <div className="glass-card rounded-xl p-6 md:p-8 bg-white/1 border border-white/5 space-y-6 h-full">
                        <div>
                          <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                            Frontend
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {activeCaseStudy.caseStudy.architecture.frontend.map((item) => (
                              <span key={item} className="px-2 py-0.5 rounded bg-[#0ea5e9]/10 text-[#0ea5e9] border border-[#0ea5e9]/20 font-mono text-[10px] font-semibold">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                            Backend API
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {activeCaseStudy.caseStudy.architecture.backend.map((item) => (
                              <span key={item} className="px-2 py-0.5 rounded bg-[#9d4edd]/10 text-[#9d4edd] border border-[#9d4edd]/20 font-mono text-[10px] font-semibold">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                            Database Engine
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {activeCaseStudy.caseStudy.architecture.database.map((item) => (
                              <span key={item} className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono text-[10px] font-semibold">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                        {activeCaseStudy.caseStudy.architecture.additional && (
                          <div>
                            <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                              Enterprise Systems
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {activeCaseStudy.caseStudy.architecture.additional.map((item) => (
                                <span key={item} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[10px] font-semibold">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 5. Project Outcome */}
                  <div className="space-y-4">
                    <h3 className="font-mono text-xs font-bold text-slate-500 uppercase tracking-widest block">
                      05 / Project Outcome
                    </h3>
                    <div className="relative rounded-xl overflow-hidden p-6 md:p-8 bg-gradient-to-r from-[#0ea5e9]/5 via-[#9d4edd]/5 to-transparent border border-white/5">
                      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#0ea5e9] to-[#9d4edd]" />
                      <p className="text-white text-sm sm:text-base font-sans sm:leading-relaxed font-semibold">
                        {activeCaseStudy.caseStudy.outcome}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <ArchitectureViewer project={activeCaseStudy} />
              )}

              {/* Footer Actions */}
              <div className="flex flex-wrap items-center justify-center gap-6 border-t border-white/5 pt-10">
                {activeCaseStudy.name.toLowerCase().includes("invoice") ? (
                  <button
                    disabled
                    className="opacity-50 cursor-not-allowed px-8 py-2.5 bg-slate-800 border border-white/10 rounded-md text-xs font-mono font-semibold tracking-wider text-slate-400 flex items-center gap-2 h-10 select-none"
                  >
                    Coming Soon
                  </button>
                ) : (
                  <a
                    href={getGithubUrl(activeCaseStudy.name, activeCaseStudy.github_url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-github-project px-8 flex items-center gap-2"
                  >
                    <GithubIcon size={16} /> View Source Code <ExternalLink size={14} className="opacity-70" />
                  </a>
                )}
                <button
                  onClick={closeCaseStudy}
                  className="btn-border-gradient px-8"
                >
                  Close Case Study
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
