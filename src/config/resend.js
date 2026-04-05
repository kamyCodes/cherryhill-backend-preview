const { Resend } = require('resend');
require('dotenv').config();

class ResendConfig {
  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not defined in environment variables');
    }
    this.resend = new Resend(apiKey);
  }

  static getInstance() {
    if (!ResendConfig.instance) {
      ResendConfig.instance = new ResendConfig();
    }
    return ResendConfig.instance;
  }

  getResend() {
    return this.resend;
  }

  async sendEmail({ to, subject, html, from = 'Corporate Investment <onboarding@resend.dev>' }) {
    try {
      const result = await this.resend.emails.send({
        from,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
      });
      return result;
    } catch (error) {
      throw new Error(`Failed to send email: ${error}`);
    }
  }

  async sendContactConfirmationEmail(to, name) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a3e6f;">Thank You for Contacting Us</h2>
        <p>Dear ${name},</p>
        <p>Thank you for reaching out to Corporate Investment Platform. We have received your message and our team will get back to you within 24-48 hours.</p>
        <p>In the meantime, feel free to:</p>
        <ul>
          <li>Explore our <a href="${process.env.FRONTEND_URL}/services">services</a></li>
          <li>Read our <a href="${process.env.FRONTEND_URL}/resources">latest insights</a></li>
          <li>Learn <a href="${process.env.FRONTEND_URL}/about">more about us</a></li>
        </ul>
        <p>Best regards,<br/>Corporate Investment Team</p>
        <hr />
        <p style="font-size: 12px; color: #666;">© 2024 Corporate Investment Platform. All rights reserved.</p>
      </div>
    `;

    return this.sendEmail({
      to,
      subject: 'Thank You for Contacting Corporate Investment Platform',
      html,
    });
  }

  async sendAdminNotificationEmail(contactData) {
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) return null;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a3e6f;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${contactData.name}</p>
        <p><strong>Email:</strong> ${contactData.email}</p>
        ${contactData.phone ? `<p><strong>Phone:</strong> ${contactData.phone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${contactData.message}</p>
        <hr />
        <p>Login to admin panel to reply: ${process.env.FRONTEND_URL}/admin</p>
      </div>
    `;

    return this.sendEmail({
      to: adminEmail,
      subject: 'New Contact Form Submission',
      html,
    });
  }
}

module.exports = ResendConfig.getInstance();