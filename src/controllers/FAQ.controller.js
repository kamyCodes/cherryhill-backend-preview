const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const FAQService = require('../services/FAQ.service');

class FAQController {
  constructor() {
    this.faqService = FAQService;
  }

  getAllFAQs = asyncHandler(async (req, res) => {
    const activeOnly = req.query.activeOnly === 'true';
    const faqs = await this.faqService.getAllFAQs(activeOnly);
    return ApiResponse.success(res, 'FAQs fetched successfully', faqs);
  });

  getFAQsByCategory = asyncHandler(async (req, res) => {
    const faqs = await this.faqService.getFAQsByCategory(req.params.category);
    return ApiResponse.success(res, 'FAQs fetched successfully', faqs);
  });

  getCategories = asyncHandler(async (req, res) => {
    const categories = await this.faqService.getCategories();
    return ApiResponse.success(res, 'Categories fetched successfully', categories);
  });

  getFAQById = asyncHandler(async (req, res) => {
    const faq = await this.faqService.getFAQById(req.params.id);
    return ApiResponse.success(res, 'FAQ fetched successfully', faq);
  });

  createFAQ = asyncHandler(async (req, res) => {
    const faq = await this.faqService.createFAQ(req.body);
    return ApiResponse.success(res, 'FAQ created successfully', faq, 201);
  });

  updateFAQ = asyncHandler(async (req, res) => {
    const faq = await this.faqService.updateFAQ(req.params.id, req.body);
    return ApiResponse.success(res, 'FAQ updated successfully', faq);
  });

  deleteFAQ = asyncHandler(async (req, res) => {
    await this.faqService.deleteFAQ(req.params.id);
    return ApiResponse.success(res, 'FAQ deleted successfully');
  });
}

module.exports = new FAQController();