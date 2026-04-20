// src/controllers/Contact.controller.js
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ContactService = require('../services/Contact.service');
const EmailService = require('../services/Email.service');

class ContactController {
  constructor() {
    this.contactService = ContactService;
    this.emailService = EmailService;
  }

  getAllContacts = asyncHandler(async (req, res) => {
    const isRead = req.query.isRead === 'true'
        ? true
        : req.query.isRead === 'false'
            ? false
            : undefined;

    const contacts = await this.contactService.getAllContacts(isRead);
    return ApiResponse.success(res, 'Contacts fetched successfully', contacts);
  });

  getContactById = asyncHandler(async (req, res) => {
    const contact = await this.contactService.getContactById(req.params.id);
    return ApiResponse.success(res, 'Contact fetched successfully', contact);
  });

  createContact = asyncHandler(async (req, res) => {
    const contact = await this.contactService.createContact(req.body);

    // Send confirmation to user and notification to admin
    await this.emailService.sendContactConfirmation(contact.email, contact.name);
    await this.emailService.sendAdminNotification(contact);

    return ApiResponse.success(res, 'Contact message sent successfully', contact, 201);
  });

  markAsRead = asyncHandler(async (req, res) => {
    const contact = await this.contactService.markAsRead(req.params.id);
    return ApiResponse.success(res, 'Contact marked as read', contact);
  });

  replyToContact = asyncHandler(async (req, res) => {
    const { subject, message } = req.body;
    const contact = await this.contactService.getContactById(req.params.id);

    await this.emailService.sendReplyToContact(contact.email, subject, message);
    await this.contactService.markAsReplied(req.params.id);

    return ApiResponse.success(res, 'Reply sent successfully');
  });

  deleteContact = asyncHandler(async (req, res) => {
    await this.contactService.deleteContact(req.params.id);
    return ApiResponse.success(res, 'Contact deleted successfully');
  });

  getUnreadCount = asyncHandler(async (req, res) => {
    const count = await this.contactService.getUnreadCount();
    return ApiResponse.success(res, 'Unread count fetched successfully', { count });
  });
}

module.exports = new ContactController();