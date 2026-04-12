const dns = require('dns');
dns.setDefaultResultOrder('ipv4first'); 

require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const { Resend } = require('resend');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
app.set('trust proxy', 1);

// Validación de variables de entorno al arrancar
const hasGmailCreds = process.env.EMAIL_USER && process.env.EMAIL_PASS;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;
if (!ALLOWED_ORIGIN || (!hasGmailCreds && !RESEND_API_KEY)) {
  console.error('(X) Falta ALLOWED_ORIGIN y/o credenciales de email. Configure ALLOWED_ORIGIN y (EMAIL_USER+EMAIL_PASS) o RESEND_API_KEY.');
  process.exit(1);
}

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const PORT = process.env.PORT || 3000;

// Rate Limiter para la ruta de contacto 
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10,
  message: { error: 'Demasiados mensajes enviados. Intenta de nuevo en 15 minutos.' },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    console.warn(`(!) Rate limit alcanzado desde IP: ${req.ip}`);
    res.status(429).json(options.message);
  },
});

// Middlewares
const allowedOrigins = (ALLOWED_ORIGIN || '').split(',').map(s => s.trim()).filter(Boolean);
if (process.env.NODE_ENV !== 'production') {
  // during local development accept typical Vite localhost origins
  allowedOrigins.push('http://localhost:5173', 'http://127.0.0.1:5173');
}

app.use(cors({
  origin: (origin, callback) => {
    // allow non-browser tools like curl/postman (no origin)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('CORS origin denied'), false);
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

// Enable preflight for all routes
app.options(/.*/, cors());
app.use(express.json({ limit: '20kb' }));

// Configuración de transporte
let transporter = null;
let resendClient = null;

const useResend = Boolean(process.env.RESEND_API_KEY);
if (useResend) {
  resendClient = new Resend(process.env.RESEND_API_KEY);
  console.log('(1) Usando Resend para envío de emails.');
} else if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    pool: true,
    maxConnections: 1,
    tls: { rejectUnauthorized: false },
    connectionTimeout: 20000,
    greetingTimeout: 20000,
  });

  transporter.verify((error) => {
    if (error) {
      console.error('(X) Error al conectar con Gmail SMTP:', error.message);
    } else {
      console.log(`(1) Nodemailer conectado correctamente como ${process.env.EMAIL_USER}`);
    }
  });
} else {
  console.warn('(!) No se configuró método de envío de emails (ni Resend ni Gmail).');
}

// Helpers de validación y sanitización 
const sanitize = (str) =>
  String(str)
    .replace(/<[^>]*>/g, '')   // elimina tags HTML
    .replace(/[\r\n]{3,}/g, '\n\n') // limita saltos de línea
    .trim()
    .slice(0, 2000);           // máximo 2000 caracteres

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email).trim());

// Templates de Email 
const buildNotificationHtml = (name, email, message) => `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0f;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:16px;overflow:hidden;border:1px solid #2a2a2a;">
        
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#10b981,#059669);padding:32px 36px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <p style="margin:0;color:rgba(255,255,255,0.7);font-size:11px;font-family:monospace;letter-spacing:2px;text-transform:uppercase;">Portfolio Contact System</p>
                  <h1 style="margin:8px 0 0;color:#ffffff;font-size:24px;font-weight:700;"> <!> Nuevo Mensaje Recibido</h1>
                </td>
                <td align="right">
                  <div style="background:rgba(255,255,255,0.15);border-radius:50%;width:52px;height:52px;display:inline-flex;align-items:center;justify-content:center;font-size:24px;line-height:52px;text-align:center;">✉️</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Sender Info -->
        <tr>
          <td style="padding:28px 36px 0;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#242424;border-radius:10px;overflow:hidden;">
              <tr>
                <td style="padding:16px 20px;border-bottom:1px solid #2e2e2e;">
                  <p style="margin:0;color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-family:monospace;">Remitente</p>
                  <p style="margin:4px 0 0;color:#f9fafb;font-size:16px;font-weight:600;">${name}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 20px;">
                  <p style="margin:0;color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-family:monospace;">Email de respuesta</p>
                  <a href="mailto:${email}" style="margin:4px 0 0;color:#10b981;font-size:15px;text-decoration:none;display:block;">${email}</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Message -->
        <tr>
          <td style="padding:24px 36px 0;">
            <p style="margin:0 0 10px;color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-family:monospace;">Mensaje</p>
            <div style="background:#242424;border-left:3px solid #10b981;border-radius:0 10px 10px 0;padding:20px 22px;">
              <p style="margin:0;color:#e5e7eb;font-size:15px;line-height:1.7;white-space:pre-wrap;">${message}</p>
            </div>
          </td>
        </tr>

        <!-- Reply CTA -->
        <tr>
          <td style="padding:28px 36px;">
            <a href="mailto:${email}?subject=Re: Tu mensaje en mi portafolio"
               style="display:inline-block;background:#10b981;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:600;font-size:15px;">
              Responder ahora →
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 36px;border-top:1px solid #2a2a2a;">
            <p style="margin:0;color:#4b5563;font-size:12px;font-family:monospace;">
              lc.dev · Sistema automático de contacto · ${new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })}
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
`;

const buildConfirmationHtml = (name) => `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:40px 20px;">
    <tr><td align="center">
      <table width="540" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#10b981,#059669);padding:40px 36px;text-align:center;">
            <div style="width:64px;height:64px;background:rgba(255,255,255,0.2);border-radius:50%;margin:0 auto 16px;font-size:32px;line-height:64px;text-align:center;">(1)</div>
            <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;">¡Mensaje recibido!</h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:15px;">Gracias por escribirme, ${name}</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 36px 28px;">
            <p style="margin:0 0 16px;color:#374151;font-size:16px;line-height:1.7;">
              He recibido tu mensaje correctamente. Revisaré los detalles de tu propuesta y me pondré en contacto contigo <strong>lo antes posible</strong>.
            </p>
            <p style="margin:0 0 28px;color:#374151;font-size:16px;line-height:1.7;">
              Mientras tanto, puedes echarle un vistazo a mi trabajo en:
            </p>

            <!-- Links -->
            <table cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td style="padding-right:12px;">
                  <a href="https://github.com/lcrisantosi7-cris/"
                     style="display:inline-block;background:#0f0f0f;color:#ffffff;text-decoration:none;padding:10px 20px;border-radius:8px;font-size:14px;font-weight:500;">
                    GitHub →
                  </a>
                </td>
                <td>
                  <a href="https://www.linkedin.com/in/luis-crisanto-silupú"
                     style="display:inline-block;background:#0a66c2;color:#ffffff;text-decoration:none;padding:10px 20px;border-radius:8px;font-size:14px;font-weight:500;">
                    LinkedIn →
                  </a>
                </td>
              </tr>
            </table>

            <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:18px 20px;">
              <p style="margin:0;color:#065f46;font-size:14px;line-height:1.6;">
                🕐 <strong>Tiempo de respuesta:</strong> Normalmente respondo en menos de 24 horas en días laborables.
              </p>
            </div>
          </td>
        </tr>

        <!-- Signature -->
        <tr>
          <td style="padding:0 36px 36px;">
            <p style="margin:0;color:#6b7280;font-size:15px;">Un saludo,</p>
            <p style="margin:4px 0 0;color:#111827;font-size:17px;font-weight:700;">Luis Crisanto</p>
            <p style="margin:2px 0 0;color:#10b981;font-size:13px;font-family:monospace;">Full Stack Developer · lc.dev</p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 36px;border-top:1px solid #e5e7eb;background:#f9fafb;">
            <p style="margin:0;color:#9ca3af;font-size:12px;text-align:center;">
              Este es un mensaje automático enviado desde mi portafolio. Por favor no respondas directamente a este correo.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
`;

// Ruta de Contacto 
app.post('/api/contact', contactLimiter, async (req, res) => {
  const { name, email, message } = req.body ?? {};

  // Validación de campos
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'El correo electrónico no es válido.' });
  }

  const cleanName    = sanitize(name);
  const cleanEmail   = sanitize(email);
  const cleanMessage = sanitize(message);

  if (cleanName.length < 2) {
    return res.status(400).json({ error: 'El nombre es demasiado corto.' });
  }
  if (cleanMessage.length < 10) {
    return res.status(400).json({ error: 'El mensaje es demasiado corto (mínimo 10 caracteres).' });
  }

  console.log(`📨 Nuevo contacto de: ${cleanName} <${cleanEmail}>`);

  //1. Email de notificación (para ti) 
  try {
    if (resendClient) {
      // Usar Resend para notificación interna (loguear respuesta para diagnóstico)
      try {
        const result = await resendClient.emails.send({
          from: process.env.RESEND_FROM || process.env.EMAIL_USER,
          to: [process.env.RESEND_TO || process.env.EMAIL_USER],
          subject: `<!> Nuevo mensaje de ${cleanName}`,
          html: buildNotificationHtml(cleanName, cleanEmail, cleanMessage),
        });
        console.log(`(1) Notificación enviada vía Resend a ${process.env.RESEND_TO || process.env.EMAIL_USER}`, result);
      } catch (sendErr) {
        console.error('(X) Error Resend - notificación:', sendErr);
        // Reintentar con Nodemailer si está disponible
        if (transporter) {
          try {
            const info = await transporter.sendMail({
              from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
              to: process.env.EMAIL_USER,
              replyTo: cleanEmail,
              subject: `<!> Nuevo mensaje de ${cleanName}`,
              html: buildNotificationHtml(cleanName, cleanEmail, cleanMessage),
            });
            console.log('(1) Notificación enviada vía Nodemailer como fallback:', info);
          } catch (fallbackErr) {
            console.error('(X) Fallback Nodemailer falló:', fallbackErr);
            throw fallbackErr;
          }
        } else {
          throw sendErr;
        }
      }
    } else if (transporter) {
      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: cleanEmail,
        subject: `<!> Nuevo mensaje de ${cleanName}`,
        html: buildNotificationHtml(cleanName, cleanEmail, cleanMessage),
      });
      console.log(`(1) Notificación enviada a ${process.env.EMAIL_USER}`);
    } else {
      console.error('(X) No hay método de envío configurado para notificación interna.');
      return res.status(500).json({ error: 'Sistema de mensajería no configurado.' });
    }
  } catch (err) {
    console.error('(X) Error enviando notificación:', err.message);
    return res.status(500).json({
      error: 'No se pudo enviar tu mensaje. Por favor intenta de nuevo en unos minutos.',
    });
  }

  // 2. Email de confirmación (para el cliente) — no bloqueante
  try {
    if (resendClient) {
      try {
        const result = await resendClient.emails.send({
          from: process.env.RESEND_FROM || process.env.EMAIL_USER,
          to: [cleanEmail],
          subject: `¡Gracias por contactarme, ${cleanName}! (1)`,
          html: buildConfirmationHtml(cleanName),
        });
        console.log(`(1) Confirmación enviada vía Resend a ${cleanEmail}`, result);
      } catch (sendErr) {
        console.error('(!) Error Resend - confirmación al cliente:', sendErr);
        if (transporter) {
          try {
            const info = await transporter.sendMail({
              from: `"Luis Crisanto" <${process.env.EMAIL_USER}>`,
              to: cleanEmail,
              subject: `¡Gracias por contactarme, ${cleanName}! (1)`,
              html: buildConfirmationHtml(cleanName),
            });
            console.log('(1) Confirmación enviada vía Nodemailer como fallback:', info);
          } catch (fallbackErr) {
            console.error('(!) Fallback Nodemailer confirmación falló:', fallbackErr);
          }
        }
      }
    } else if (transporter) {
      try {
        const info = await transporter.sendMail({
          from: `"Luis Crisanto" <${process.env.EMAIL_USER}>`,
          to: cleanEmail,
          subject: `¡Gracias por contactarme, ${cleanName}! (1)`,
          html: buildConfirmationHtml(cleanName),
        });
        console.log(`(1) Confirmación enviada a ${cleanEmail}`, info);
      } catch (err) {
        console.error('(!) Error enviando confirmación vía Nodemailer:', err);
      }
    } else {
      console.warn('(!) No hay método de envío configurado para confirmación al cliente.');
    }
  } catch (err) {
    console.error(`(!)  No se pudo enviar confirmación a ${cleanEmail}:`, err.message);
    console.error('   → Posible causa: dominio corporativo/universitario bloquea emails externos.');
  }

  return res.status(200).json({ message: 'Mensaje enviado exitosamente.' });
});

// Health Check 
app.get('/health', (_, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
  });
});

// 404 catch-all 
app.use((_, res) => {
  res.status(404).json({ error: 'Ruta no encontrada.' });
});

// ─── Global error handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('💥 Error no controlado:', err.message);
  res.status(500).json({ error: 'Error interno del servidor.' });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Servidor listo en puerto ${PORT}`);
  console.log(`Usando cuenta: ${EMAIL_USER || 'no-configurada'}`);
  console.log(`CORS permitido para: ${allowedOrigins.join(', ')}`);
});