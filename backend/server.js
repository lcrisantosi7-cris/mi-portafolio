const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { Resend } = require("resend");

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

// Confianza en el proxy para Render
app.set('trust proxy', 1);

// ─── Rate Limiter ────────────────────────────────────────────────────────────
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // Un poco más estricto para evitar spam en Resend
  message: { error: "Demasiadas solicitudes. Por favor, intenta de nuevo en 15 minutos." },
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

// ─── Helpers ─────────────────────────────────────────────────────────────────
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const sanitize = (str) => String(str).replace(/<[^>]*>/g, '').trim();

// ─── Ruta de Contacto ─────────────────────────────────────────────────────────
app.post("/api/contact", contactLimiter, async (req, res) => {
  const { name, email, message } = req.body;

  // 1. Validaciones de presencia
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Todos los campos son obligatorios." });
  }

  // 2. Sanitización y validación de longitud
  const cleanName = sanitize(name);
  const cleanEmail = sanitize(email);
  const cleanMessage = sanitize(message);

  if (cleanName.length < 2 || cleanName.length > 100) {
    return res.status(400).json({ error: "Nombre no válido." });
  }
  if (!isValidEmail(cleanEmail)) {
    return res.status(400).json({ error: "Correo electrónico no válido." });
  }
  if (cleanMessage.length < 10 || cleanMessage.length > 1000) {
    return res.status(400).json({ error: "El mensaje debe ser más descriptivo." });
  }

  try {
    // 3. Envío de Email mediante Resend
    // IMPORTANTE: 'from' debe ser 'onboarding@resend.dev' en la capa gratuita.
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'lcrisantosi7@gmail.com', // TU correo donde recibirás las notificaciones
      replyTo: cleanEmail, // Esto permite que si das a "Responder", le escribas al cliente
      subject: `📩 Proyecto: ${cleanName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #09090b; color: #fff; border: 1px solid #27272a; border-radius: 16px; overflow: hidden;">
          <div style="background: #10b981; padding: 30px; text-align: center;">
            <h2 style="margin: 0; color: #000; font-size: 24px;">Nueva Propuesta de Trabajo</h2>
          </div>
          <div style="padding: 40px;">
            <p style="color: #a1a1aa; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Remitente</p>
            <p style="font-size: 18px; margin-top: 0;"><strong>${cleanName}</strong> (${cleanEmail})</p>
            
            <hr style="border: 0; border-top: 1px solid #27272a; margin: 30px 0;" />
            
            <p style="color: #a1a1aa; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Mensaje del Proyecto</p>
            <div style="background: #18181b; padding: 20px; border-radius: 12px; border: 1px solid #27272a; line-height: 1.6;">
              ${cleanMessage}
            </div>
          </div>
          <div style="padding: 20px; background: #18181b; text-align: center; color: #71717a; font-size: 12px; border-top: 1px solid #27272a;">
            Enviado desde tu Portfolio Profesional • ${new Date().toLocaleDateString('es-PE')}
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Error de Resend:", error);
      return res.status(500).json({ error: "Fallo en el servicio de mensajería." });
    }

    return res.status(200).json({ message: "Mensaje enviado correctamente." });

  } catch (err) {
    console.error("Error inesperado en servidor:", err);
    return res.status(500).json({ error: "Error interno. Intenta más tarde." });
  }
});

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/health", (_, res) => res.status(200).json({ status: "ok" }));

app.get("/", (req, res) => {
  res.send("Backend de Luis Crisanto: Resend Engine Online.");
});

// ─── Servidor ─────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});