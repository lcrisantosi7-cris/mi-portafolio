const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

require('dotenv').config();
const express    = require('express');
const nodemailer = require('nodemailer');
const { Resend } = require('resend');
const cors       = require('cors');
const rateLimit  = require('express-rate-limit');

const { buildNotificationHtml, buildConfirmationHtml } = require('./emailTemplates');

// ─── Environment validation ───────────────────────────────────────────────────
const RESEND_API_KEY   = process.env.RESEND_API_KEY;
const EMAIL_USER       = process.env.EMAIL_USER;
const EMAIL_PASS       = process.env.EMAIL_PASS;
const ALLOWED_ORIGIN   = process.env.ALLOWED_ORIGIN;
const PORT             = process.env.PORT || 3000;

const hasGmailCreds = EMAIL_USER && EMAIL_PASS;

if (!ALLOWED_ORIGIN || (!hasGmailCreds && !RESEND_API_KEY)) {
  console.error('Missing env vars: ALLOWED_ORIGIN and (EMAIL_USER+EMAIL_PASS) or RESEND_API_KEY');
  process.exit(1);
}

// ─── App setup ────────────────────────────────────────────────────────────────
const app = express();
app.set('trust proxy', 1);

// ─── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = ALLOWED_ORIGIN.split(',').map(s => s.trim()).filter(Boolean);
if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.push('http://localhost:5173', 'http://127.0.0.1:5173');
}

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('CORS origin denied'), false);
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));
app.options(/.*/, cors());
app.use(express.json({ limit: '20kb' }));

// ─── Rate limiter ─────────────────────────────────────────────────────────────
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, _next, options) => {
    console.warn(`Rate limit reached from IP: ${req.ip}`);
    res.status(429).json(options.message);
  },
  message: { error: 'Demasiados mensajes enviados. Intenta de nuevo en 15 minutos.' },
});

// ─── Email transport setup ────────────────────────────────────────────────────
const useResend   = Boolean(RESEND_API_KEY);
let resendClient  = null;
let transporter   = null;

if (useResend) {
  resendClient = new Resend(RESEND_API_KEY);
  console.log('Email: using Resend');
} else {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    pool: true,
    maxConnections: 1,
    tls: { rejectUnauthorized: false },
    connectionTimeout: 20000,
    greetingTimeout: 20000,
  });
  transporter.verify((err) => {
    if (err) console.error('Nodemailer connection error:', err.message);
    else console.log(`Email: Nodemailer connected as ${EMAIL_USER}`);
  });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email).trim());

const sanitize = (str) =>
  String(str)
    .replace(/<[^>]*>/g, '')
    .replace(/[\r\n]{3,}/g, '\n\n')
    .trim()
    .slice(0, 2000);

/**
 * sendEmail — unified send helper with optional Nodemailer fallback.
 * @param {object} opts  { to, subject, html }
 */
const sendEmail = async ({ to, subject, html }) => {
  const from = process.env.RESEND_FROM || EMAIL_USER;

  if (resendClient) {
    try {
      await resendClient.emails.send({ from, to: [to], subject, html });
      return;
    } catch (err) {
      console.error('Resend error, trying Nodemailer fallback:', err.message);
      if (!transporter) throw err;
    }
  }

  // Nodemailer (primary or fallback)
  await transporter.sendMail({ from: `"lc.dev" <${EMAIL_USER}>`, to, subject, html });
};

// ─── Routes ───────────────────────────────────────────────────────────────────

// POST /api/contact
app.post('/api/contact', contactLimiter, async (req, res) => {
  const { name, email, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'El correo electrónico no es válido.' });
  }

  const cleanName    = sanitize(name);
  const cleanEmail   = sanitize(email);
  const cleanMessage = sanitize(message);

  if (cleanName.length < 2)     return res.status(400).json({ error: 'El nombre es demasiado corto.' });
  if (cleanMessage.length < 10) return res.status(400).json({ error: 'El mensaje es demasiado corto (mínimo 10 caracteres).' });

  console.log(`New contact from: ${cleanName} <${cleanEmail}>`);

  // 1. Notification to you — blocking (if this fails, return error to client)
  try {
    const notifyTo = process.env.RESEND_TO || EMAIL_USER;
    await sendEmail({
      to:      notifyTo,
      subject: `Nuevo mensaje de ${cleanName}`,
      html:    buildNotificationHtml(cleanName, cleanEmail, cleanMessage),
    });
    console.log(`Notification sent to ${notifyTo}`);
  } catch (err) {
    console.error('Failed to send notification:', err.message);
    return res.status(500).json({ error: 'No se pudo enviar tu mensaje. Intenta de nuevo en unos minutos.' });
  }

  // 2. Confirmation to sender — non-blocking (failure doesn't affect response)
  sendEmail({
    to:      cleanEmail,
    subject: `¡Gracias por escribirme, ${cleanName}!`,
    html:    buildConfirmationHtml(cleanName),
  }).catch((err) => {
    console.warn(`Could not send confirmation to ${cleanEmail}:`, err.message);
  });

  return res.status(200).json({ message: 'Mensaje enviado exitosamente.' });
});

// GET /health
app.get('/health', (_req, res) => {
  res.status(200).json({
    status:    'ok',
    timestamp: new Date().toISOString(),
    uptime:    Math.floor(process.uptime()),
  });
});

// 404
app.use((_req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada.' });
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ error: 'Error interno del servidor.' });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`CORS allowed for: ${allowedOrigins.join(', ')}`);
});