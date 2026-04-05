const ResendConfig = require('../config/resend');
const ApiError = require('../utils/ApiError');

class EmailService {
  constructor() {
    this.resend = ResendConfig.getResend();
  }

  static getInstance() {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  async sendContactConfirmation(to, name) {
    try {
      await ResendConfig.sendContactConfirmationEmail(to, name);
    } catch (error) {
      throw new ApiError(500, 'Failed to send confirmation email');
    }
  }

  async sendAdminNotification(contactData) {
    try {
      await ResendConfig.sendAdminNotificationEmail(contactData);
    } catch (error) {
      console.error('Failed to send admin notification:', error);
    }
  }

  async sendReplyToContact(to, subject, message) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a3e6f;">Response from Corporate Investment Platform</h2>
        <div style="padding: 20px; background-color: #f5f5f5; border-radius: 5px;">
          ${message}
        </div>
        <hr />
        <p style="font-size: 12px; color: #666;">This is an automated response from Corporate Investment Platform.</p>
      </div>
    `;

    try {
      await ResendConfig.sendEmail({
        to,
        subject: `Re: ${subject}`,
        html,
      });
    } catch (error) {
      throw new ApiError(500, 'Failed to send reply email');
    }
  }
}

module.exports = EmailService.getInstance();