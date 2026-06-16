const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'portfolio.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening SQLite database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    initializeDatabase();
  }
});

function initializeDatabase() {
  db.serialize(() => {
    // 1. Projects Table
    db.run(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        tags TEXT NOT NULL,
        github_url TEXT,
        live_url TEXT,
        image_path TEXT
      )
    `);

    // 2. Skills Table
    db.run(`
      CREATE TABLE IF NOT EXISTS skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        proficiency INTEGER NOT NULL,
        icon TEXT
      )
    `);

    // 3. Messages Table
    db.run(`
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT,
        message TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Seed Projects
    db.get("SELECT COUNT(*) as count FROM projects", [], (err, row) => {
      if (err) {
        console.error("Error checking projects table:", err);
        return;
      }
      if (row.count === 0) {
        const insertProject = db.prepare(`
          INSERT INTO projects (name, description, tags, github_url, live_url, image_path)
          VALUES (?, ?, ?, ?, ?, ?)
        `);

        // 1. Medical Billing & Pharmacy Management System
        insertProject.run(
          "Medical Billing & Pharmacy Management System",
          "A full-featured Medical Billing and Pharmacy Management System developed to streamline pharmacy operations, inventory tracking, customer management, supplier management and billing processes.",
          "React.js, Node.js, Express.js, SQLite, Bootstrap, Tailwind CSS",
          "https://github.com/ravirajchoughule-spec/medicleproject-main",
          "https://medical-billing-demo.example.com",
          "/assets/projects/medical-billing-dashboard.png"
        );


        // 2. Smart Inventory System
        insertProject.run(
          "Smart Inventory System",
          "Smart Inventory System is a full-stack enterprise inventory and warehouse management platform developed to manage products, stock levels, orders, reports, AI-powered analytics, approvals, and multi-warehouse operations from a centralized administration dashboard.",
          "React.js, Node.js, Express.js, SQLite, Bootstrap, Tailwind CSS",
          "https://github.com/ravirajchoughule-spec/smart-inventory-system",
          "https://smart-inventory-demo.example.com",
          "/assets/projects/smartinventory-dashboard.png"
        );

        // 3. HomeRent Pro - House Rental Management System
        insertProject.run(
          "HomeRent Pro - House Rental Management System",
          "HomeRent Pro is a full-stack property rental management platform developed to manage houses, tenants, rent collection, invoices and financial reports through a centralized administration dashboard.",
          "React.js, Node.js, Express.js, SQLite, Bootstrap, Tailwind CSS",
          "https://github.com/ravirajchoughule-spec/rental",
          "https://house-rental-demo.example.com",
          "/assets/projects/homerent-login.png"
        );

        // 4. Task Manager System
        insertProject.run(
          "Task Manager System",
          "A high-performance SaaS task management and productivity collaboration platform designed for tracking sprints, managing team workloads, planning monthly schedules, and monitoring performance analytics.",
          "React.js, Node.js, Express.js, SQLite, Tailwind CSS",
          "https://github.com/ravirajchoughule-spec/Task-Manager",
          "https://task-manager-demo.example.com",
          "/assets/projects/taskmanager-dashboard.png"
        );

        // 5. Invoice Management System
        insertProject.run(
          "Invoice Management System",
          "A sleek enterprise billing and invoice operations suite built to handle complex customer ledgers, line item cost building, automated tax calculations, transactional reports, and PDF receipt rendering.",
          "React.js, Node.js, Express.js, SQLite, Tailwind CSS",
          "https://github.com/ravirajchoughule-spec/invoice-system",
          "https://invoice-system-demo.example.com",
          "/assets/projects/invoicesystem-dashboard.png"
        );

        insertProject.finalize();
        console.log("Seeded projects table.");
      }
    });

    // Seed Skills
    db.get("SELECT COUNT(*) as count FROM skills", [], (err, row) => {
      if (err) {
        console.error("Error checking skills table:", err);
        return;
      }
      if (row.count === 0) {
        const insertSkill = db.prepare(`
          INSERT INTO skills (name, category, proficiency, icon)
          VALUES (?, ?, ?, ?)
        `);
        // Frontend Skills
        insertSkill.run("HTML5", "Frontend", 95, "HTML");
        insertSkill.run("CSS3", "Frontend", 90, "CSS");
        insertSkill.run("JavaScript", "Frontend", 92, "JS");
        insertSkill.run("Bootstrap", "Frontend", 90, "Bootstrap");
        insertSkill.run("Tailwind CSS", "Frontend", 92, "Tailwind");
        insertSkill.run("React.js", "Frontend", 90, "React");
        
        // Backend Skills
        insertSkill.run("Node.js", "Backend", 85, "Node");
        insertSkill.run("Express.js", "Backend", 88, "Express");
        
        // Database
        insertSkill.run("SQLite", "Database", 80, "SQLite");

        // Currently Learning
        insertSkill.run("Core Java", "Learning", 75, "Java");
        insertSkill.run("Advanced Java", "Learning", 50, "Java");

        insertSkill.finalize();
        console.log("Seeded skills table.");
      }
    });
  });
}

module.exports = db;
