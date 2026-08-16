# Ultra-Clean Centered Mobile-First EmailJS Outreach Template

This version features a **centered, 100% mobile-friendly responsive layout** that eliminates squished header elements and replaces the core capabilities box with a sleek tech stack tag bar.

---

## 📌 STEP 1: EmailJS Dashboard Field Mapping

| Field Name in EmailJS | Value to Enter |
| :--- | :--- |
| **Template Name** (Top Left) | `Bulk-Outreach-Campaign` |
| **Subject \*** | `{{subject}}` |
| **To Email \*** | `{{to_email}}` |
| **From Name** | `{{developer_name}}` |
| **From Email \*** | Check `Use Default Email Address` (`wa8090666@gmail.com`) |
| **Reply To** | `wa8090666@gmail.com` |

---

## 📌 STEP 2: Paste Ultra-Clean Mobile-First HTML Code

Click **HTML** / **Edit Content** inside EmailJS Content editor and paste the HTML code below:

```html
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{subject}}</title>
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #07080c; }

    /* Mobile Responsive Styles */
    @media screen and (max-width: 600px) {
      .email-card { width: 100% !important; max-width: 100% !important; }
      .content-padding { padding: 18px 14px !important; }
      .cta-btn { display: block !important; width: 100% !important; text-align: center !important; box-sizing: border-box !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #07080c; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0;">

  <!-- Outer Background Canvas -->
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #07080c; padding: 20px 6px;">
    <tr>
      <td align="center">

        <!-- Executive Email Container Card -->
        <table role="presentation" class="email-card" width="100%" max-width="560" border="0" cellspacing="0" cellpadding="0" style="max-width: 560px; width: 100%; background-color: #0d0f17; border: 1px solid #1a1d2e; border-radius: 14px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8);">
          
          <!-- Top Neon Accent Bar -->
          <tr>
            <td height="3" style="background: linear-gradient(90deg, #00ff66 0%, #00e5ff 100%); line-height: 3px; font-size: 3px;">&nbsp;</td>
          </tr>

          <!-- Centered Header Section -->
          <tr>
            <td class="content-padding" align="center" style="padding: 24px 24px; background-color: #111422; border-bottom: 1px solid #1a1d2e;">
              <!-- Centered Developer Avatar -->
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                <tr>
                  <td align="center">
                    <img src="{{avatar_url}}" alt="{{developer_name}}" width="46" height="46" style="border-radius: 50%; border: 2px solid #00ff66; object-fit: cover; display: block; width: 46px; height: 46px; margin-bottom: 10px;">
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <div style="font-size: 16px; font-weight: 800; color: #ffffff; letter-spacing: 0.3px; line-height: 1.2;">{{developer_name}}</div>
                    <div style="font-size: 11px; color: #00ff66; font-family: monospace; margin-top: 4px; font-weight: 600;">{{developer_role}}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Body Section -->
          <tr>
            <td class="content-padding" style="padding: 24px 24px; background-color: #0d0f17;">
              
              <!-- Subject Header Pill -->
              <div style="margin-bottom: 20px; padding: 8px 12px; background-color: #121524; border-left: 3px solid #00ff66; border-radius: 0 6px 6px 0; font-family: monospace; font-size: 11px; color: #94a3b8; text-transform: uppercase;">
                INQUIRY: <span style="color: #ffffff; font-weight: 700;">{{subject}}</span>
              </div>

              <!-- Primary Message Body -->
              <div style="font-size: 14px; line-height: 1.75; color: #cbd5e1; white-space: pre-line; word-wrap: break-word;">
                {{message}}
              </div>

              <!-- Tech Stack Badges Strip -->
              <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid #1a1d2e; text-align: center;">
                <div style="font-family: monospace; font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">
                  FEATURED TECH STACK & ARCHITECTURE
                </div>
                <div style="font-family: monospace; font-size: 10px; font-weight: 700;">
                  <span style="display: inline-block; background-color: #141829; border: 1px solid #222840; color: #00e5ff; padding: 4px 8px; border-radius: 4px; margin: 2px;">REACT 19</span>
                  <span style="display: inline-block; background-color: #141829; border: 1px solid #222840; color: #00e5ff; padding: 4px 8px; border-radius: 4px; margin: 2px;">NEXT.JS</span>
                  <span style="display: inline-block; background-color: #141829; border: 1px solid #222840; color: #00e5ff; padding: 4px 8px; border-radius: 4px; margin: 2px;">NODE.JS</span>
                  <span style="display: inline-block; background-color: #141829; border: 1px solid #222840; color: #00e5ff; padding: 4px 8px; border-radius: 4px; margin: 2px;">FIREBASE</span>
                  <span style="display: inline-block; background-color: #141829; border: 1px solid #222840; color: #00ff66; padding: 4px 8px; border-radius: 4px; margin: 2px;">AI RAG</span>
                </div>
              </div>

              <!-- Primary Call-to-Action Button -->
              <div style="margin-top: 28px; text-align: center;">
                <a href="https://iwaqass.xyz/" target="_blank" class="cta-btn" style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #00ff66 0%, #00e5ff 100%); color: #07080c; font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; border-radius: 8px; box-shadow: 0 0 20px rgba(0, 255, 102, 0.3);">
                  INSPECT LIVE DEVELOPER PORTFOLIO &rarr;
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer Section (GitHub Only) -->
          <tr>
            <td class="content-padding" style="padding: 18px 24px; background-color: #090a10; border-top: 1px solid #1a1d2e; text-align: center;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="font-family: monospace; font-size: 11px; color: #64748b; line-height: 1.6;">
                    <div>PORTFOLIO: <a href="https://iwaqass.xyz/" style="color: #00ff66; text-decoration: none; font-weight: 700;">https://iwaqass.xyz/</a></div>
                    <div style="margin-top: 6px;">
                      <a href="https://github.com/waqas273" target="_blank" style="display: inline-block; color: #38bdf8; text-decoration: none; font-weight: 700; background-color: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.25); padding: 3px 10px; border-radius: 4px; font-size: 10px;">
                        GitHub Repository &rarr; https://github.com/waqas273
                      </a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

        <!-- Footer Transmission Note -->
        <div style="margin-top: 14px; font-family: monospace; font-size: 10px; color: #475569; text-align: center;">
          Transmitted to {{to_name}} ({{to_email}}) &bull; {{developer_name}} Engineering Services
        </div>

      </td>
    </tr>
  </table>

</body>
</html>
```

---

## 📌 STEP 3: Save & Copy Template ID

1. Top right corner par **Save** button click karein.
2. Form ke top se naya **Template ID** copy karein aur Admin Panel mien paste kar lein!
