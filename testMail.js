import dotenv from "dotenv";
import {transporter} from "./src/config/nodemailer.js";

dotenv.config();

async function sendTestEmail() {
  try {
    const info = await transporter.sendMail({
      from: `"Prueba Nodemailer" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // te lo envías a ti mismo
      subject: "Correo de prueba ✔",
      html: "<h2>Hola Miguel 👋</h2><p>Este es un correo de prueba enviado desde tu API con <b>Nodemailer</b>.</p>",
    });

    console.log("✅ Correo enviado correctamente:");
    console.log("🪪 ID del mensaje:", info.messageId);
  } catch (error) {
    console.error("❌ Error al enviar el correo:", error);
  }
}

sendTestEmail();
