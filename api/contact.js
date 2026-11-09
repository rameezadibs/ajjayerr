/**
 * Serverless API Function: /api/contact
 * Handles project enquiries for AJJAYER Constructions Contracting LLC.
 *
 * Flow:
 * React Form -> /api/contact -> Email Service (Resend) -> sales@ajjayer.com
 *
 * Environment Variables (server-side only):
 * - RESEND_API_KEY (optional in dev, required in production for real email dispatch)
 */

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Please send a POST request.'
    });
  }

  try {
    const {
      fullName,
      company,
      email,
      phone,
      serviceRequired,
      projectLocation,
      projectType,
      projectDetails,
      honeypot // Spam protection hidden field
    } = req.body || {};

    // 1. Spam protection: Honeypot check
    if (honeypot) {
      console.warn('[Security] Honeypot field triggered. Silently dropping enquiry.');
      return res.status(200).json({
        success: true,
        message: 'Enquiry received successfully.'
      });
    }

    // 2. Server-side Validation
    const errors = [];
    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      errors.push('Full Name is required.');
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.push('A valid Email address is required.');
    }
    if (!phone || typeof phone !== 'string' || !phone.trim()) {
      errors.push('Phone Number is required.');
    }
    if (!serviceRequired || typeof serviceRequired !== 'string' || !serviceRequired.trim()) {
      errors.push('Service selection is required.');
    }
    if (!projectDetails || typeof projectDetails !== 'string' || projectDetails.trim().length < 5) {
      errors.push('Project Details must be provided (minimum 5 characters).');
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: errors.join(' ')
      });
    }

    const timestamp = new Date().toISOString();
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'full',
      timeStyle: 'medium',
      timeZone: 'Asia/Dubai'
    }).format(new Date());

    const subject = `New Website Enquiry — [${serviceRequired}] — [${fullName.trim()}]`;

    // 3. Dispatch Email via Resend if API key is present
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 650px; color: #171717; line-height: 1.6; border: 1px solid #e0d8cc; padding: 25px; border-radius: 4px;">
          <h2 style="color: #925131; border-bottom: 2px solid #ca9468; padding-bottom: 10px; margin-top: 0;">
            AJJAYER — New Project Enquiry
          </h2>
          <p style="font-size: 14px; color: #666;">Received on ${formattedDate} (GST)</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; font-weight: bold; width: 35%; color: #4d443a;">Full Name:</td>
              <td style="padding: 10px 0; color: #171717;">${escapeHtml(fullName)}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; font-weight: bold; color: #4d443a;">Company / Organisation:</td>
              <td style="padding: 10px 0; color: #171717;">${escapeHtml(company || 'Not specified')}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; font-weight: bold; color: #4d443a;">Email:</td>
              <td style="padding: 10px 0; color: #171717;"><a href="mailto:${escapeHtml(email)}" style="color: #925131;">${escapeHtml(email)}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; font-weight: bold; color: #4d443a;">Phone:</td>
              <td style="padding: 10px 0; color: #171717;"><a href="tel:${escapeHtml(phone)}" style="color: #925131;">${escapeHtml(phone)}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; font-weight: bold; color: #4d443a;">Service Required:</td>
              <td style="padding: 10px 0; color: #925131; font-weight: bold;">${escapeHtml(serviceRequired)}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; font-weight: bold; color: #4d443a;">Project Location:</td>
              <td style="padding: 10px 0; color: #171717;">${escapeHtml(projectLocation || 'Dubai / UAE')}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; font-weight: bold; color: #4d443a;">Project Type:</td>
              <td style="padding: 10px 0; color: #171717;">${escapeHtml(projectType || 'Commercial / Industrial')}</td>
            </tr>
          </table>

          <div style="margin-top: 25px; padding: 18px; background-color: #f7f4ee; border-left: 3px solid #ca9468;">
            <h4 style="margin-top: 0; color: #4d443a;">Project Scope / Details:</h4>
            <p style="white-space: pre-wrap; margin-bottom: 0; color: #28211b;">${escapeHtml(projectDetails)}</p>
          </div>

          <div style="margin-top: 25px; font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 12px;">
            Sent automatically from AJJAYER Constructions Contracting LLC Website Enquiry System (<a href="https://www.ajjayer.com" style="color: #888;">ajjayer.com</a>).
          </div>
        </div>
      `;

      // Dispatch to AJJAYER Team
      const teamResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`
        },
        body: JSON.stringify({
          from: 'AJJAYER Enquiry <enquiry@ajjayer.com>',
          to: ['sales@ajjayer.com'],
          reply_to: email.trim(),
          subject: subject,
          html: emailHtml
        })
      });

      if (!teamResponse.ok) {
        const errorText = await teamResponse.text();
        console.error('[Resend Error] Team notification failed:', errorText);
      }

      // Auto-response to Customer
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`
        },
        body: JSON.stringify({
          from: 'AJJAYER Technical Desk <sales@ajjayer.com>',
          to: [email.trim()],
          subject: `Enquiry Confirmation: ${serviceRequired} — AJJAYER`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; color: #171717; line-height: 1.6; border: 1px solid #e0d8cc; padding: 25px;">
              <h2 style="color: #925131; border-bottom: 2px solid #ca9468; padding-bottom: 10px; margin-top: 0;">
                AJJAYER Constructions Contracting LLC
              </h2>
              <p>Dear ${escapeHtml(fullName)},</p>
              <p>Thank you for contacting AJJAYER. We have received your enquiry regarding <strong>${escapeHtml(serviceRequired)}</strong>.</p>
              <p>Our engineering and estimation team in Dubai is currently reviewing your project details and will connect with you shortly to discuss technical feasibility, timelines, and next steps.</p>
              <div style="margin: 20px 0; padding: 15px; background-color: #f7f4ee; border-left: 3px solid #925131;">
                <p style="margin: 0; font-size: 14px; color: #4d443a;">
                  <strong>Direct Engineering Desk:</strong> +971 54 169 6975<br />
                  <strong>Email:</strong> sales@ajjayer.com<br />
                  <strong>Headquarters:</strong> Dubai, United Arab Emirates
                </p>
              </div>
              <p style="font-size: 13px; color: #777;">Best regards,<br /><strong>AJJAYER Technical Team</strong></p>
            </div>
          `
        })
      }).catch(err => console.error('[Resend Error] Customer auto-response failed:', err));
    } else {
      // Local development / mock logging
      console.log('----------------------------------------------------');
      console.log('[Dev Mock API] New Project Enquiry Received:');
      console.log('Subject:', subject);
      console.log('Name:', fullName);
      console.log('Email:', email);
      console.log('Phone:', phone);
      console.log('Service:', serviceRequired);
      console.log('Location:', projectLocation || 'Dubai / UAE');
      console.log('Details:', projectDetails);
      console.log('Timestamp:', timestamp);
      console.log('----------------------------------------------------');
    }

    return res.status(200).json({
      success: true,
      message: 'THANK YOU. YOUR ENQUIRY HAS BEEN RECEIVED.',
      subtext: 'Our team will review your requirements and contact you shortly.'
    });

  } catch (error) {
    console.error('[API Error in /api/contact]:', error);
    return res.status(500).json({
      success: false,
      error: "We couldn't send your enquiry. Please try again or contact us directly."
    });
  }
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
