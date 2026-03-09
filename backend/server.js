require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");
const { tr } = require("framer-motion/client");

conts a = express();

const contactLimiter = rateLimit({
  windowMs: 15* 60 * 1000, 
  max: 3,
  message: "Demasiadas solicitudes, por favor intenta de nuevo más tarde.",
  standarHeaders: true,
  legacyHeaders: false,
});

app.use(cors({
  origin: 'https://mi-portafolio-khaki-two.vercel.app'
}));

app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

app.post("/api/contact", contactLimiter, async (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Todos los campos son obligatorios." });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Correo electrónico no válido." });
  }
  if (message.length > 1000) {
    return res.status(400).json({ error: "El mensaje es demasiado largo. Máximo 1000 caracteres." });
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Nuevo mensaje de contacto de ${name} - Portfolio`,
      text: `Has recibido un mensaje de: ${name} (${email})\n\nMensaje:\n${message}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Mensaje enviado exitosamente." });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).json({ error: "Ocurrió un error al enviar el mensaje. Por favor intenta de nuevo más tarde." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});