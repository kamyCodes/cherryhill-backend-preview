const FAQ = require('../models/FAQ.model');
const ApiError = require('../utils/ApiError');

class FAQService {
  constructor() {}

  static getInstance() {
    if (!FAQService.instance) {
      FAQService.instance = new FAQService();
    }
    return FAQService.instance;
  }

  async getAllFAQs(activeOnly = false) {
    const filter = activeOnly ? { isActive: true } : {};
    return await FAQ.find(filter).sort('order');
  }

  async getFAQsByCategory(category) {
    return await FAQ.find({ category, isActive: true }).sort('order');
  }

  async getFAQById(id) {
    const faq = await FAQ.findById(id);
    if (!faq) {
      throw new ApiError(404, 'FAQ not found');
    }
    return faq;
  }

  async createFAQ(faqData) {
    const faq = await FAQ.create(faqData);
    return faq;
  }

  async updateFAQ(id, updateData) {
    const updatedFAQ = await FAQ.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedFAQ) {
      throw new ApiError(404, 'FAQ not found');
    }

    return updatedFAQ;
  }

  async deleteFAQ(id) {
    const faq = await FAQ.findById(id);
    if (!faq) {
      throw new ApiError(404, 'FAQ not found');
    }

    await faq.deleteOne();
  }

  async getCategories() {
    const categories = await FAQ.distinct('category');
    return categories;
  }
}

module.exports = FAQService.getInstance();