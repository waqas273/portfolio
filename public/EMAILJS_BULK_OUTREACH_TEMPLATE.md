# EmailJS Bulk Outreach Template - Mobile-First Responsive Code & Exact Field Filling Guide

Follow these exact instructions to fill all fields in your **EmailJS Dashboard** -> **Email Templates** -> **Create New Template**.

---

## 📌 STEP 1: Fill All Fields in EmailJS Dashboard (Right Sidebar & Header)

Refer to your screenshot and enter these exact values in the EmailJS editor:

| Field Name in EmailJS | Exact Value to Enter | Notes / Explanation |
| :--- | :--- | :--- |
| **Template Name** (top left) | `Bulk-Outreach-Campaign` | Click `Auto-Reply` at the top and rename it |
| **Subject \*** | `{{subject}}` | **REQUIRED** (Resolves red error line) |
| **To Email \*** | `{{to_email}}` | **REQUIRED** (Sends mail to recipient email) |
| **From Name** | `{{developer_name}}` | Displays "Muhammad Waqas" in recipient inbox |
| **From Email \*** | Check `Use Default Email Address` | Keeps `wa8090666@gmail.com` active |
| **Reply To** | `wa8090666@gmail.com` | Replies go directly to your inbox |
| **Bcc** | *(Leave Empty)* | |
| **Cc** | *(Leave Empty)* | |

---

## 📌 STEP 2: Paste Mobile-First Responsive HTML Code

Click the **HTML** button / **Edit Content** inside EmailJS Content editor and paste the HTML below:

```html
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>{{subject}}</title>
  <style type="text/css">
    /* Client-specific Resets */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #09090b; }
    
    /* Mobile-First Responsive Styles */
    @media screen and (max-width: 600px) {
      .email-container { width: 100% !important; max-width: 100% !important; margin: 0 auto !important; }
      .fluid-padding { padding: 20px 16px !important; }
      .header-stack { display: block !important; width: 100% !important; text-align: center !important; }
      .header-avatar { margin: 0 auto 12px auto !important; float: none !important; }
      .cta-button { display: block !important; width: 100% !important; box-sizing: border-box !important; text-align: center !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #09090b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f4f4f5;">

  <!-- Main Outer Wrapper -->
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #09090b; padding: 20px 0;">
    <tr>
      <td align="center" style="padding: 0 10px;">
        
        <!-- Main Email Container Box -->
        <table role="presentation" class="email-container" width="100%" max-width="580" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; width: 100%; background-color: #121215; border: 1px solid #27272a; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
          
          <!-- Header Banner -->
          <tr>
            <td class="fluid-padding" style="padding: 24px 28px; background: linear-gradient(135deg, #09090b 0%, #18181b 100%); border-bottom: 2px solid #00ff66;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td class="header-stack" valign="middle">
                    <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                      <tr>
                        <td valign="middle" style="padding-right: 14px;">
                          <img src="{{avatar_url}}" alt="{{developer_name}}" width="48" height="48" style="border-radius: 50%; border: 2px solid #00ff66; object-fit: cover; display: block; width: 48px; height: 48px;">
                        </td>
                        <td valign="middle">
                          <div style="font-size: 15px; font-weight: 700; color: #ffffff; letter-spacing: 0.5px; line-height: 1.2;">{{developer_name}}</div>
                          <div style="font-size: 11px; color: #00ff66; font-family: monospace; margin-top: 3px; font-weight: 600;">{{developer_role}}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content Area -->
          <tr>
            <td class="fluid-padding" style="padding: 28px 28px; background-color: #121215;">
              
              <!-- Subject Header Tag -->
              <div style="margin-bottom: 20px; font-family: monospace; font-size: 11px; color: #a1a1aa; text-transform: uppercase; letter-spacing: 1px; line-height: 1.4;">
                // INQUIRY: <span style="color: #00e5ff; font-weight: bold;">{{subject}}</span>
              </div>

              <!-- Message Body -->
              <div style="font-size: 14px; line-height: 1.75; color: #e4e4e7; white-space: pre-line; word-wrap: break-word;">
                {{message}}
              </div>

              <!-- Call to Action Button Container -->
              <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #27272a; text-align: center;">
                <a href="https://iwaqass.xyz/" target="_blank" class="cta-button" style="display: inline-block; padding: 14px 28px; background-color: #00ff66; color: #09090b; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; border-radius: 6px; box-shadow: 0 0 20px rgba(0,255,102,0.25);">
                  INSPECT LIVE DEVELOPER PORTFOLIO &rarr;
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer Area -->
          <tr>
            <td class="fluid-padding" style="padding: 18px 28px; background-color: #09090b; border-top: 1px solid #27272a;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="font-family: monospace; font-size: 11px; color: #71717a; line-height: 1.6;">
                    <div>PORTFOLIO: <a href="https://iwaqass.xyz/" style="color: #00ff66; text-decoration: none; font-weight: bold;">https://iwaqass.xyz/</a></div>
                    <div style="margin-top: 4px;">
                      <a href="https://github.com/waqas273" style="color: #a1a1aa; text-decoration: none; margin: 0 6px;">GitHub</a> &bull; 
                      <a href="https://www.linkedin.com/in/muhammad-waqas-awan" style="color: #a1a1aa; text-decoration: none; margin: 0 6px;">LinkedIn</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

        <!-- Footer Copyright Subnote -->
        <div style="margin-top: 16px; font-family: monospace; font-size: 10px; color: #52525b; text-align: center; line-height: 1.4;">
          Transmitted to {{to_name}} ({{to_email}}) &bull; {{developer_name}} Engineering Services
        </div>

      </td>
    </tr>
  </table>

</body>
</html>
```

---

## 📌 STEP 3: Click Save & Copy Template ID

1. Click **Save** in the top right corner of EmailJS Dashboard.
2. Copy the **Template ID** (e.g. `template_xxxxxxx`).
3. Paste the Template ID into your Portfolio Admin Dashboard under **`[4] Bulk Outreach`**!
