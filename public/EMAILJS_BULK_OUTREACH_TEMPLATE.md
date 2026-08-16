# Ultra-Professional Executive Tech EmailJS Outreach Template

This redesigned **Mobile-First HTML Email Template** delivers a hyper-sleek, executive tech-grade aesthetic for cold outreach campaigns.

---

## 📌 STEP 1: Fill Fields in EmailJS Dashboard (Right Sidebar & Header)

| Field Name in EmailJS | Exact Value to Enter |
| :--- | :--- |
| **Template Name** (Top Left) | `Bulk-Outreach-Campaign` |
| **Subject \*** | `{{subject}}` |
| **To Email \*** | `{{to_email}}` |
| **From Name** | `{{developer_name}}` |
| **From Email \*** | Check `Use Default Email Address` (`wa8090666@gmail.com`) |
| **Reply To** | `wa8090666@gmail.com` |

---

## 📌 STEP 2: Paste Ultra-Professional Mobile-First HTML Code

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
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #08090d; }

    /* Mobile First Responsive Adjustments */
    @media screen and (max-width: 600px) {
      .email-card { width: 100% !important; max-width: 100% !important; }
      .content-padding { padding: 20px 16px !important; }
      .header-flex { display: block !important; text-align: center !important; }
      .header-left { margin-bottom: 12px !important; }
      .cta-btn { display: block !important; width: 100% !important; text-align: center !important; box-sizing: border-box !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #08090d; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0;">

  <!-- Outer Background Canvas -->
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #08090d; padding: 24px 8px;">
    <tr>
      <td align="center">

        <!-- Executive Email Container Card -->
        <table role="presentation" class="email-card" width="100%" max-width="580" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; width: 100%; background-color: #0f111a; border: 1px solid #1e2333; border-radius: 14px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.75);">
          
          <!-- Top Gradient Cyber Border Bar -->
          <tr>
            <td height="4" style="background: linear-gradient(90deg, #00ff66 0%, #00e5ff 100%); line-height: 4px; font-size: 4px;">&nbsp;</td>
          </tr>

          <!-- Header Section -->
          <tr>
            <td class="content-padding" style="padding: 24px 28px; background-color: #131622; border-bottom: 1px solid #1e2333;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td class="header-left" valign="middle">
                    <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td valign="middle" style="padding-right: 14px;">
                          <!-- Developer Avatar with Status Indicator -->
                          <div style="position: relative; display: inline-block;">
                            <img src="{{avatar_url}}" alt="{{developer_name}}" width="50" height="50" style="border-radius: 50%; border: 2px solid #00ff66; object-fit: cover; display: block; width: 50px; height: 50px;">
                          </div>
                        </td>
                        <td valign="middle">
                          <div style="font-size: 16px; font-weight: 800; color: #ffffff; letter-spacing: 0.3px; line-height: 1.2;">{{developer_name}}</div>
                          <div style="font-size: 11px; color: #00ff66; font-family: monospace; margin-top: 3px; font-weight: 600;">{{developer_role}}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" valign="middle" class="header-flex">
                    <span style="font-family: monospace; font-size: 10px; font-weight: 700; color: #00e5ff; background-color: rgba(0, 229, 255, 0.1); border: 1px solid rgba(0, 229, 255, 0.25); padding: 5px 10px; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.5px;">
                      FULL-STACK / AI SERVICES
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Body Section -->
          <tr>
            <td class="content-padding" style="padding: 28px 28px; background-color: #0f111a;">
              
              <!-- Subject Header Box -->
              <div style="margin-bottom: 22px; padding: 10px 14px; background-color: #141724; border-left: 3px solid #00ff66; border-radius: 0 6px 6px 0; font-family: monospace; font-size: 11px; color: #94a3b8; text-transform: uppercase;">
                SUBJECT: <span style="color: #ffffff; font-weight: 700;">{{subject}}</span>
              </div>

              <!-- Primary Message Body -->
              <div style="font-size: 14px; line-height: 1.8; color: #cbd5e1; white-space: pre-line; word-wrap: break-word;">
                {{message}}
              </div>

              <!-- High Impact Engineering Capabilities Banner -->
              <div style="margin-top: 28px; padding: 18px 20px; background-color: #141724; border: 1px solid #1e2333; border-radius: 10px;">
                <div style="font-family: monospace; font-size: 10px; font-weight: 700; color: #00ff66; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">
                  // CORE ENGINEERING CAPABILITIES
                </div>
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 12px; color: #e2e8f0; line-height: 1.8;">
                  <tr>
                    <td style="padding: 3px 0;">⚡ <strong style="color: #ffffff;">Custom Web Platforms:</strong> React 19, Next.js, Node.js & MERN Stack</td>
                  </tr>
                  <tr>
                    <td style="padding: 3px 0;">🧠 <strong style="color: #ffffff;">AI Workflows:</strong> Vector Search RAG Pipelines & Automated LLM Integrations</td>
                  </tr>
                  <tr>
                    <td style="padding: 3px 0;">☁️ <strong style="color: #ffffff;">Cloud Architecture:</strong> Real-Time Firebase & MongoDB Cloud Databases</td>
                  </tr>
                </table>
              </div>

              <!-- Primary Call-to-Action Button -->
              <div style="margin-top: 32px; text-align: center;">
                <a href="https://iwaqass.xyz/" target="_blank" class="cta-btn" style="display: inline-block; padding: 15px 32px; background: linear-gradient(135deg, #00ff66 0%, #00e5ff 100%); color: #08090d; font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.2px; text-decoration: none; border-radius: 8px; box-shadow: 0 0 25px rgba(0, 255, 102, 0.35);">
                  EXPLORE DEVELOPER PORTFOLIO & LIVE DEMOS &rarr;
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer Section (GitHub Only - No LinkedIn) -->
          <tr>
            <td class="content-padding" style="padding: 20px 28px; background-color: #0b0c12; border-top: 1px solid #1e2333; text-align: center;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="font-family: monospace; font-size: 11px; color: #64748b; line-height: 1.6;">
                    <div>PORTFOLIO NODE: <a href="https://iwaqass.xyz/" style="color: #00ff66; text-decoration: none; font-weight: 700;">https://iwaqass.xyz/</a></div>
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
        <div style="margin-top: 16px; font-family: monospace; font-size: 10px; color: #475569; text-align: center;">
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

1. Click **Save** in top right corner of EmailJS Dashboard.
2. Copy the **Template ID** (e.g. `template_xxxxxxx`).
3. Paste into your Admin Panel under **`[4] Bulk Outreach`**!
