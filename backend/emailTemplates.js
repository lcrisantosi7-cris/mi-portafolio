/**
 * emailTemplates.js - Minimalist Edition
 */

const APP_COLOR = '#10b981'; // El verde esmeralda de tu portfolio

// ─── Notification email (Para ti) ──────────────────
const buildNotificationHtml = (name, email, message) => {
  const timestamp = new Date().toLocaleString('es-PE', {
    timeZone: 'America/Lima',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff;padding:48px 24px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="text-align:left;">
          <tr>
            <td style="padding-bottom:40px;">
              <div style="font-size:12px;font-weight:700;letter-spacing:1.5px;color:${APP_COLOR};text-transform:uppercase;margin-bottom:8px;">Incoming Message</div>
              <h1 style="margin:0;font-size:24px;font-weight:800;color:#111111;letter-spacing:-0.5px;">Nuevo contacto en el portafolio</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;background-color:#fafafa;border-radius:12px;border:1px solid #f0f0f0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:24px;">
                    <div style="font-size:11px;color:#888;text-transform:uppercase;margin-bottom:4px;font-weight:600;">Remitente</div>
                    <div style="font-size:15px;color:#111;font-weight:500;">${name} <span style="color:#888;font-weight:400;">&lt;${email}&gt;</span></div>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:32px;">
                    <div style="font-size:11px;color:#888;text-transform:uppercase;margin-bottom:4px;font-weight:600;">Mensaje</div>
                    <div style="font-size:15px;color:#333;line-height:1.6;white-space:pre-wrap;">${message}</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="mailto:${email}" style="display:inline-block;padding:12px 24px;background-color:#111;color:#fff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:600;">Responder directamente</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding-top:24px;font-size:12px;color:#aaa;text-align:center;">
              Enviado el ${timestamp} • lc.dev
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

// ─── Confirmation email (Para el cliente) ───────────────────────
const buildConfirmationHtml = (name) => `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:48px 24px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="text-align:left;">
          <tr>
            <td style="padding-bottom:32px;">
              <h1 style="margin:0;font-size:28px;font-weight:800;color:#111;letter-spacing:-1px;">Hola, ${name}.</h1>
              <p style="font-size:16px;line-height:1.6;color:#444;margin:16px 0 0;">He recibido tu mensaje correctamente. Analizaré tu propuesta y te daré una respuesta en un plazo máximo de <strong>24 horas</strong>.</p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:40px;">
              <div style="font-size:13px;color:#888;margin-bottom:16px;">Mientras tanto, puedes seguir mi actividad en:</div>
              <a href="https://github.com/lcrisantosi7-cris/" style="text-decoration:none;color:#111;font-weight:600;font-size:14px;margin-right:20px;">GitHub ↗</a>
              <a href="https://www.linkedin.com/in/luis-crisanto-silupú" style="text-decoration:none;color:#111;font-weight:600;font-size:14px;">LinkedIn ↗</a>
            </td>
          </tr>
          <tr>
            <td style="border-top:1px solid #eee;padding-top:32px;">
              <div style="font-size:14px;font-weight:700;color:#111;">Luis Crisanto</div>
              <div style="font-size:13px;color:#888;">Full Stack Developer</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

module.exports = { buildNotificationHtml, buildConfirmationHtml };