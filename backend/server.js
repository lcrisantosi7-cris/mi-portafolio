require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { Resend } = require("resend"); // Corregido a sintaxis CommonJS (require)

// Inicializar Resend con tu API Key
const resend = new Resend(process.env.RESEND_API_KEY);

const app = express();

// Soluciona el error de "trust proxy" en Render
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

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Todos los campos son obligatorios." });
  }

  const cleanName = sanitize(name);
  const cleanEmail = sanitize(email);
  const cleanMessage = sanitize(message);

  try {
    // ESTE ES EL ÚNICO CORREO QUE SE ENVÍA (HACIA TI)
    const data = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>', // Email autorizado por Resend gratis
      to: [process.env.EMAIL_USER], // TU correo (debe ser el mismo con el que creaste Resend)
      reply_to: cleanEmail, // ¡Magia! Cuando le des "Responder" en Gmail, le llegará al cliente
      subject: `📩 Nuevo mensaje de ${cleanName} — Portfolio`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; padding: 20px;">
          <h2 style="color: #10b981;">Nuevo prospecto de contacto</h2>
          <p><strong>Nombre:</strong> ${cleanName}</p>
          <p><strong>Email:</strong> ${cleanEmail}</p>
          <hr />
          <p><strong>Mensaje:</strong></p>
          <p style="white-space: pre-wrap;">${cleanMessage}</p>
        </div>
      `,
    });

    // Le decimos al frontend que todo salió bien para que muestre el check verde
    res.status(200).json({ message: "Mensaje enviado exitosamente." });

  } catch (error) {
    console.error("Error definitivo con Resend:", error);
    res.status(500).json({ error: "Error al enviar el mensaje. Intenta de nuevo." });
  }
});

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/health", (_, res) => res.status(200).json({ status: "ok" }));

app.get("/", (req, res) => {
  res.send("Servidor de Portafolio de Luis Crisanto: ¡Online y Seguro con Resend!");
});

// ─── Servidor ─────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});