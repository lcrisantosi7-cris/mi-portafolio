require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();

app.set('trust proxy', 1);


// ─── Rate Limiter ────────────────────────────────────────────────────────────
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 30,
  message: { error: "Demasiadas solicitudes, por favor intenta de nuevo más tarde." },
  standardHeaders: true,  // FIX: era "standarHeaders" (typo)
  legacyHeaders: false,
});

// ─── Middlewares ─────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'https://mi-portafolio-khaki-two.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '100kb' })); // Límite de tamaño para evitar payloads enormes

// ─── Nodemailer Transporter ───────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // STARTTLS (puerto 587)
  family: 4, // Forzar IPv4 para evitar problemas en redes cloud
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Usa una App Password de Google, no tu contraseña real
  },
  tls: {
    // Esto ayuda a evitar problemas de resolución de nombres en redes cloud
    rejectUnauthorized: false
  }

});

// Verificar conexión al iniciar
transporter.verify((error) => {
  if (error) {
    console.error('❌ Error al conectar con el servidor de correo:', error.message);
  } else {
    console.log('✅ Servidor de correo listo');
  }
});

// ─── Helpers ─────────────────────────────────────────────────────────────────
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Sanitización básica: elimina tags HTML
const sanitize = (str) => String(str).replace(/<[^>]*>/g, '').trim();

// ─── Ruta de Contacto ─────────────────────────────────────────────────────────
app.post("/api/contact", contactLimiter, async (req, res) => {
  const { name, email, message } = req.body;

  // Validaciones
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Todos los campos son obligatorios." });
  }

  const cleanName = sanitize(name);
  const cleanEmail = sanitize(email);
  const cleanMessage = sanitize(message);

  if (cleanName.length < 2 || cleanName.length > 100) {
    return res.status(400).json({ error: "El nombre debe tener entre 2 y 100 caracteres." });
  }
  if (!isValidEmail(cleanEmail)) {
    return res.status(400).json({ error: "Correo electrónico no válido." });
  }
  if (cleanMessage.length < 10 || cleanMessage.length > 1000) {
    return res.status(400).json({ error: "El mensaje debe tener entre 10 y 1000 caracteres." });
  }

  try {
    // 1. Email que TÚ recibes (notificación)
    const notificationMail = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `📩 Nuevo mensaje de ${cleanName} — Portfolio`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #18181b; color: #fff; border-radius: 12px; overflow: hidden;">
          <div style="background: #10b981; padding: 24px;">
            <h2 style="margin: 0; color: #fff;">Nuevo mensaje de contacto</h2>
          </div>
          <div style="padding: 32px;">
            <p><strong>Nombre:</strong> ${cleanName}</p>
            <p><strong>Email:</strong> <a href="mailto:${cleanEmail}" style="color: #10b981;">${cleanEmail}</a></p>
            <hr style="border-color: #3f3f46; margin: 24px 0;" />
            <p><strong>Mensaje:</strong></p>
            <p style="background: #27272a; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${cleanMessage}</p>
          </div>
          <div style="padding: 16px 32px; background: #09090b; color: #71717a; font-size: 12px;">
            Enviado desde tu portfolio · ${new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })}
          </div>
        </div>
      `,
    };

    // 2. Email de confirmación que recibe el remitente
    const confirmationMail = {
      from: `"Luis Crisanto" <${process.env.EMAIL_USER}>`,
      to: cleanEmail,
      subject: `Recibí tu mensaje, ${cleanName} 👋`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #18181b; color: #fff; border-radius: 12px; overflow: hidden;">
          <div style="background: #10b981; padding: 24px;">
            <h2 style="margin: 0; color: #fff;">¡Gracias por escribirme!</h2>
          </div>
          <div style="padding: 32px;">
            <p>Hola <strong>${cleanName}</strong>,</p>
            <p>Recibí tu mensaje y lo revisaré a la brevedad. Te responderé pronto.</p>
            <p style="color: #a1a1aa;">Tu mensaje:</p>
            <p style="background: #27272a; padding: 16px; border-radius: 8px; color: #a1a1aa; white-space: pre-wrap;">${cleanMessage}</p>
          </div>
          <div style="padding: 16px 32px; background: #09090b; color: #71717a; font-size: 12px;">
            Este es un correo automático, por favor no respondas a este mensaje.
          </div>
        </div>
      `,
    };

    await Promise.all([
      transporter.sendMail(notificationMail),
      transporter.sendMail(confirmationMail),
    ]);

    res.status(200).json({ message: "Mensaje enviado exitosamente." });

  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).json({ error: "Ocurrió un error al enviar el mensaje. Por favor intenta de nuevo." });
  }
});

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/health", (_, res) => res.status(200).json({ status: "ok" }));

app.get("/", (req, res) => {
  res.send("Servidor de Portafolio de Luis Crisanto: ¡Online y Seguro!");
});

// ─── Servidor ─────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});