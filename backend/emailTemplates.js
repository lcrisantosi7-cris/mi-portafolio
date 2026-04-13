/**
 * emailTemplates.js
 * HTML templates for outgoing emails.
 * Exported as pure functions — no side effects, no dependencies.
 */

// ─── Notification email (sent to you when someone contacts) ──────────────────
const buildNotificationHtml = (name, email, message) => {
  const timestamp = new Date().toLocaleString('es-PE', {
    timeZone: 'America/Lima',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nuevo mensaje de contacto</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr><td align="center">

      <!-- Card -->
      <table width="560" cellpadding="0" cellspacing="0"
             style="background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e0e0e0;">

        <!-- Top bar -->
        <tr>
          <td style="background:#111111;padding:20px 32px;">
            <p style="margin:0;color:#ffffff;font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">
              lc.dev &nbsp;·&nbsp; Mensaje de contacto
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px 32px 24px;">

            <!-- From -->
            <table width="100%" cellpadding="0" cellspacing="0"
                   style="margin-bottom:24px;border-bottom:1px solid #f0f0f0;padding-bottom:24px;">
              <tr>
                <td width="50%" style="vertical-align:top;">
                  <p style="margin:0 0 4px;color:#888888;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;">De</p>
                  <p style="margin:0;color:#111111;font-size:15px;font-weight:600;">${name}</p>
                </td>
                <td width="50%" style="vertical-align:top;">
                  <p style="margin:0 0 4px;color:#888888;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;">Email</p>
                  <a href="mailto:${email}"
                     style="color:#111111;font-size:15px;text-decoration:underline;">${email}</a>
                </td>
              </tr>
            </table>

            <!-- Message -->
            <p style="margin:0 0 8px;color:#888888;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;">Mensaje</p>
            <p style="margin:0 0 28px;color:#333333;font-size:15px;line-height:1.7;white-space:pre-wrap;">${message}</p>

            <!-- CTA -->
            <a href="mailto:${email}?subject=Re: Tu mensaje en mi portafolio"
               style="display:inline-block;background:#111111;color:#ffffff;text-decoration:none;
                      padding:12px 24px;border-radius:6px;font-size:14px;font-weight:600;">
              Responder →
            </a>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:16px 32px;background:#fafafa;border-top:1px solid #f0f0f0;">
            <p style="margin:0;color:#aaaaaa;font-size:12px;">
              Recibido el ${timestamp}
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`;
};

// ─── Confirmation email (sent to the person who wrote) ───────────────────────
const buildConfirmationHtml = (name) => `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Mensaje recibido</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr><td align="center">

      <!-- Card -->
      <table width="520" cellpadding="0" cellspacing="0"
             style="background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e0e0e0;">

        <!-- Top bar -->
        <tr>
          <td style="background:#111111;padding:20px 32px;">
            <p style="margin:0;color:#ffffff;font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">
              lc.dev &nbsp;·&nbsp; Acuse de recibo
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px 32px 28px;">
            <p style="margin:0 0 20px;color:#111111;font-size:20px;font-weight:700;">
              Hola, ${name}.
            </p>
            <p style="margin:0 0 16px;color:#444444;font-size:15px;line-height:1.7;">
              Recibí tu mensaje. Lo revisaré y te responderé directamente
              <strong>en menos de 24 horas</strong> en días laborables.
            </p>
            <p style="margin:0 0 28px;color:#444444;font-size:15px;line-height:1.7;">
              Mientras tanto puedes ver mi trabajo en:
            </p>

            <!-- Links -->
            <table cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td style="padding-right:10px;">
                  <a href="https://github.com/lcrisantosi7-cris/"
                     style="display:inline-block;background:#111111;color:#ffffff;text-decoration:none;
                            padding:10px 18px;border-radius:6px;font-size:13px;font-weight:600;">
                    GitHub →
                  </a>
                </td>
                <td>
                  <a href="https://www.linkedin.com/in/luis-crisanto-silupú"
                     style="display:inline-block;background:#0a66c2;color:#ffffff;text-decoration:none;
                            padding:10px 18px;border-radius:6px;font-size:13px;font-weight:600;">
                    LinkedIn →
                  </a>
                </td>
              </tr>
            </table>

            <p style="margin:0;color:#888888;font-size:14px;">
              Un saludo,<br />
              <strong style="color:#111111;">Luis Crisanto</strong><br />
              <span style="color:#aaaaaa;font-size:12px;font-family:monospace;">Full Stack Developer · lc.dev</span>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:16px 32px;background:#fafafa;border-top:1px solid #f0f0f0;">
            <p style="margin:0;color:#aaaaaa;font-size:12px;text-align:center;">
              Mensaje automático — no respondas directamente a este correo.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`;

module.exports = { buildNotificationHtml, buildConfirmationHtml };