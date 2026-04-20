// src/services/Contact.service.js
const Contact = require('../models/Contact.model');
const ApiError = require('../utils/ApiError');

class ContactService {
  constructor() {}

  static getInstance() {
    if (!ContactService.instance) {
      ContactService.instance = new ContactService();
    }
    return ContactService.instance;
  }

  async getAllContacts(isRead) {
    const filter = {};
    if (isRead !== undefined) {
      filter.isRead = isRead;
    }
    return await Contact.find(filter).sort({ createdAt: -1 });
  }

  async getContactById(id) {
    const contact = await Contact.findById(id);
    if (!contact) {
      throw new ApiError(404, 'Contact not found');
    }
    return contact;
  }

  async createContact(contactData) {
    const contact = await Contact.create(contactData);
    return contact;
  }

  async markAsRead(id) {
    const contact = await Contact.findByIdAndUpdate(
        id,
        { isRead: true },
        { new: true, runValidators: true }
    );
    if (!contact) {
      throw new ApiError(404, 'Contact not found');
    }
    return contact;
  }

  async markAsReplied(id) {
    const contact = await Contact.findByIdAndUpdate(
        id,
        {
          replied: true,
          repliedAt: new Date()
        },
        { new: true, runValidators: true }
    );
    if (!contact) {
      throw new ApiError(404, 'Contact not found');
    }
    return contact;
  }

  async deleteContact(id) {
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      throw new ApiError(404, 'Contact not found');
    }
    return contact;
  }

  async getUnreadCount() {
    return await Contact.countDocuments({ isRead: false });
  }
}

module.exports = ContactService.getInstance();