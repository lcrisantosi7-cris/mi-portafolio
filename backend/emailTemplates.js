/**
 * emailTemplates.js
 * Neutral corporate style — clean, no color accents, high readability.
 */

// ─── Notification email (para ti) ────────────────────────────────────────────
const buildNotificationHtml = (name, email, message) => {
  const timestamp = new Date().toLocaleString('es-PE', {
    timeZone: 'America/Lima',
    dateStyle: 'long',
    timeStyle: 'short',
  });

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:48px 16px;">
    <tr><td align="center">

      <!-- Wrapper -->
      <table width="580" cellpadding="0" cellspacing="0">

        <!-- Header label -->
        <tr>
          <td style="padding-bottom:16px;">
            <span style="font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#999999;">
              lc.dev &nbsp;/&nbsp; Contacto
            </span>
          </td>
        </tr>

        <!-- Card -->
        <tr>
          <td style="background:#ffffff;border-radius:8px;border:1px solid #e4e4e4;overflow:hidden;">

            <!-- Card header -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:28px 32px 24px;border-bottom:1px solid #eeeeee;">
                  <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#aaaaaa;">
                    Nuevo mensaje
                  </p>
                  <h1 style="margin:0;font-size:20px;font-weight:700;color:#111111;letter-spacing:-0.3px;">
                    ${name}
                  </h1>
                  <a href="mailto:${email}"
                     style="font-size:14px;color:#555555;text-decoration:none;display:block;margin-top:4px;">
                    ${email}
                  </a>
                </td>
              </tr>
            </table>

            <!-- Message body -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:28px 32px 32px;">
                  <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#aaaaaa;">
                    Mensaje
                  </p>
                  <p style="margin:0 0 32px;font-size:15px;color:#333333;line-height:1.75;white-space:pre-wrap;">${message}</p>

                  <!-- CTA -->
                  <a href="mailto:${email}?subject=Re: Tu mensaje en mi portafolio"
                     style="display:inline-block;padding:11px 22px;background:#111111;color:#ffffff;
                            font-size:13px;font-weight:600;text-decoration:none;border-radius:6px;
                            letter-spacing:0.2px;">
                    Responder →
                  </a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 4px 0;font-size:12px;color:#aaaaaa;">
            ${timestamp}
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`;
};

// ─── Confirmation email (para el cliente) ────────────────────────────────────
const buildConfirmationHtml = (name) => {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:48px 16px;">
    <tr><td align="center">

      <!-- Wrapper -->
      <table width="540" cellpadding="0" cellspacing="0">

        <!-- Header label -->
        <tr>
          <td style="padding-bottom:16px;">
            <span style="font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#999999;">
              lc.dev &nbsp;/&nbsp; Acuse de recibo
            </span>
          </td>
        </tr>

        <!-- Card -->
        <tr>
          <td style="background:#ffffff;border-radius:8px;border:1px solid #e4e4e4;padding:36px 32px 32px;">

            <h1 style="margin:0 0 20px;font-size:22px;font-weight:700;color:#111111;letter-spacing:-0.3px;">
              Hola, ${name}.
            </h1>

            <p style="margin:0 0 16px;font-size:15px;color:#444444;line-height:1.75;">
              Tu mensaje llegó correctamente. Lo revisaré y te responderé
              <strong style="color:#111111;">en menos de 24 horas</strong> en días laborables.
            </p>

            <p style="margin:0 0 32px;font-size:15px;color:#444444;line-height:1.75;">
              Mientras tanto puedes ver mi trabajo en:
            </p>

            <!-- Links row -->
            <table cellpadding="0" cellspacing="0" style="margin-bottom:36px;">
              <tr>
                <td style="padding-right:12px;">
                  <a href="https://github.com/lcrisantosi7-cris/"
                     style="display:inline-block;padding:10px 18px;background:#f4f4f4;border:1px solid #e4e4e4;
                            color:#111111;font-size:13px;font-weight:600;text-decoration:none;border-radius:6px;">
                    GitHub ↗
                  </a>
                </td>
                <td>
                  <a href="https://www.linkedin.com/in/luis-crisanto-silupú"
                     style="display:inline-block;padding:10px 18px;background:#f4f4f4;border:1px solid #e4e4e4;
                            color:#111111;font-size:13px;font-weight:600;text-decoration:none;border-radius:6px;">
                    LinkedIn ↗
                  </a>
                </td>
              </tr>
            </table>

            <!-- Signature -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="border-top:1px solid #eeeeee;padding-top:24px;">
                  <p style="margin:0;font-size:14px;font-weight:700;color:#111111;">Luis Crisanto</p>
                  <p style="margin:4px 0 0;font-size:13px;color:#999999;">Full Stack Developer · lc.dev</p>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 4px 0;font-size:12px;color:#aaaaaa;text-align:center;">
            Mensaje automático — no respondas directamente a este correo.
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`;
};

module.exports = { buildNotificationHtml, buildConfirmationHtml };