/* eslint-disable no-undef */
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  // Get current Date & Time in IST
  const datetime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

  // Get SMTP credentials from Environment Variables
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = parseInt(process.env.SMTP_PORT) || 587;
  const smtpSecure = process.env.SMTP_SECURE === 'true'; // false for 587 (TLS), true for 465 (SSL)
  const smtpUser = process.env.SMTP_USER; // Your email address
  const smtpPass = process.env.SMTP_PASS; // App password

  if (!smtpUser || !smtpPass) {
    console.warn("SMTP credentials are not configured in Vercel. Simulating successful response with console logs.");
    console.log("\n=================== DEMO EMAIL NOTIFICATION ===================");
    console.log(`To:      ravirajchoughule@gmail.com`);
    console.log(`From:    ${email}`);
    console.log(`Subject: New Portfolio Contact Message`);
    console.log(`Date:    ${datetime}`);
    console.log(`Body:\nName: ${name}\nEmail: ${email}\nSubject: ${subject || 'N/A'}\nMessage: ${message}\nDate: ${datetime}`);
    console.log("===============================================================\n");

    return res.status(200).json({
      success: true,
      message: 'Demo mode: Message received (SMTP credentials are not configured on Vercel yet).'
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    // 1. Email notification to the portfolio owner (Raviraj)
    const ownerMailOptions = {
      from: `"${name}" <${smtpUser}>`, // Send as smtpUser to satisfy Gmail SPF
      replyTo: email, // Reply-to will direct replies back to the visitor
      to: 'ravirajchoughule@gmail.com',
      subject: `New Portfolio Contact Message`,
      text: `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Subject: ${subject || 'N/A'}\n` +
            `Message: ${message}\n` +
            `Date: ${datetime}`
    };

    // 2. Auto-confirmation email to the visitor
    const visitorMailOptions = {
      from: `"Raviraj Choughule" <${smtpUser}>`,
      to: email,
      subject: 'Thank You For Contacting Raviraj Choughule',
      text: `Thank you for contacting me.\n` +
            `I have received your message successfully and will get back to you as soon as possible.\n\n` +
            `---\n` +
            `Raviraj Choughule\n` +
            `Java Full Stack Developer\n` +
            `https://ravirajchoughule-spec.github.io/raviraj-portfolio/`
    };

    // Send the notification email to Raviraj
    await transporter.sendMail(ownerMailOptions);
    
    // Attempt sending confirmation email to visitor
    try {
      await transporter.sendMail(visitorMailOptions);
    } catch (visitorErr) {
      console.error("Failed to send auto-confirmation to visitor:", visitorErr);
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you for contacting Raviraj Choughule. Your message has been sent successfully.'
    });
  } catch (error) {
    console.error("Nodemailer error:", error);
    return res.status(500).json({
      error: 'Failed to send email. Error: ' + error.message
    });
  }
}
