const dns = require('dns');
dns.setDefaultResultOrder('ipv4first'); // CRÍTICO para Node 18+ y Gmail

require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();
app.set('trust proxy', 1);

// ─── Rate Limiter ────────────────────────────────────────────────────────────
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15, 
  message: { error: "Demasiados mensajes. Intenta de nuevo en un momento." },
  standardHeaders: true,
  legacyHeaders: false,
});

// ─── Middlewares ─────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'https://mi-portafolio-khaki-two.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '50kb' }));

// ─── Nodemailer Transporter (Configuración Blindada) ─────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail', // Usar 'service' es más fiable que configurar host/port manualmente
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // LA APP PASSWORD DE 16 CARACTERES
  },
  // Ajustes de estabilidad para Render
  pool: true, 
  maxConnections: 1,
  connectionTimeout: 20000, // 20 segundos
  greetingTimeout: 20000,
});

// Verificar conexión silenciosa al iniciar
transporter.verify((error) => {
  if (error) console.error('❌ Error SMTP:', error.message);
  else console.log('✅ Nodemailer conectado a Gmail');
});

// ─── Helpers ─────────────────────────────────────────────────────────────────
const sanitize = (str) => String(str).replace(/<[^>]*>/g, '').trim();

// ─── Ruta de Contacto ─────────────────────────────────────────────────────────
app.post("/api/contact", contactLimiter, async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Faltan campos obligatorios." });
  }

  const cleanName = sanitize(name);
  const cleanEmail = sanitize(email);
  const cleanMessage = sanitize(message);

  try {
    // 1. Email que TÚ recibes (Notificación)
    const notificationMail = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `📩 Nuevo mensaje de ${cleanName}`,
      replyTo: cleanEmail,
      html: `
        <div style="font-family: sans-serif; max-width: 500px; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
          <div style="background: #10b981; color: white; padding: 20px; text-align: center;">
            <h2 style="margin:0">Nuevo Contacto</h2>
          </div>
          <div style="padding: 25px; color: #333;">
            <p><strong>De:</strong> ${cleanName} (${cleanEmail})</p>
            <p><strong>Mensaje:</strong></p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #10b981;">
              ${cleanMessage}
            </div>
          </div>
        </div>
      `,
    };

    // 2. Email de cortesía para el CLIENTE (Confirmación)
    const confirmationMail = {
      from: `"Luis Crisanto" <${process.env.EMAIL_USER}>`,
      to: cleanEmail,
      subject: `¡Gracias por contactarme, ${cleanName}!`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Hola, ${cleanName} 👋</h2>
          <p>He recibido tu mensaje correctamente. Revisaré los detalles de tu propuesta y te responderé lo antes posible.</p>
          <p>¡Hablemos pronto!</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #999;">Este es un mensaje automático enviado desde mi portafolio.</p>
        </div>
      `,
    };

    // Ejecutamos ambos envíos
    await Promise.all([
      transporter.sendMail(notificationMail),
      transporter.sendMail(confirmationMail)
    ]);

    res.status(200).json({ message: "Mensaje enviado exitosamente." });

  } catch (error) {
    console.error("Error al enviar email:", error);
    res.status(500).json({ error: "El servidor de correo no respondió a tiempo. Intenta de nuevo." });
  }
});

app.get("/health", (_, res) => res.status(200).json({ status: "ok" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Nodemailer Server listo en puerto ${PORT}`));