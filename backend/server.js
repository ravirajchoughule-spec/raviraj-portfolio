const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Configure Nodemailer SMTP Transporter
const smtpConfig = {
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || null,
    pass: process.env.SMTP_PASS || null
  }
};

const hasCredentials = smtpConfig.auth.user && smtpConfig.auth.pass;
const transporter = hasCredentials ? nodemailer.createTransport(smtpConfig) : null;

if (!hasCredentials) {
  console.log("Nodemailer running in Console Logging Mode (No SMTP credentials configured).");
}

// Routes
app.get('/api/projects', (req, res) => {
  db.all("SELECT * FROM projects", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/skills', (req, res) => {
  db.all("SELECT * FROM skills", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    res.status(400).json({ error: "Name, email, and message are required." });
    return;
  }

  // Insert contact message into the SQLite database (including the subject)
  const query = `INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)`;
  db.run(query, [name, email, subject || '', message], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    // Send email notification to ravirajchoughule@gmail.com
    const mailOptions = {
      from: email,
      to: 'ravirajchoughule@gmail.com',
      subject: `New Portfolio Message: ${subject || 'No Subject'}`,
      text: `You have received a new contact message from your portfolio website.\n\n` +
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Subject: ${subject || 'N/A'}\n\n` +
            `Message:\n${message}`
    };

    if (transporter) {
      transporter.sendMail(mailOptions, (mailErr, info) => {
        if (mailErr) {
          console.error("Nodemailer failed to send email notification:", mailErr);
        } else {
          console.log("Nodemailer email notification sent successfully:", info.messageId);
        }
      });
    } else {
      console.log("\n=================== MOCK EMAIL NOTIFICATION ===================");
      console.log(`To:      ${mailOptions.to}`);
      console.log(`From:    ${mailOptions.from}`);
      console.log(`Subject: ${mailOptions.subject}`);
      console.log(`Body:\n${mailOptions.text}`);
      console.log("===============================================================\n");
    }

    res.status(201).json({
      success: true,
      message: "Thank you for contacting me. I will get back to you soon.",
      id: this.lastID
    });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
