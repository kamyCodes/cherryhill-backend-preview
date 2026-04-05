const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const TestimonialService = require('../services/Testimonial.service');

class TestimonialController {
  constructor() {
    this.testimonialService = TestimonialService;
  }

  getAllTestimonials = asyncHandler(async (req, res) => {
    const approvedOnly = req.query.approvedOnly === 'true';
    const testimonials = await this.testimonialService.getAllTestimonials(approvedOnly);
    return ApiResponse.success(res, 'Testimonials fetched successfully', testimonials);
  });

  getTestimonialById = asyncHandler(async (req, res) => {
    const testimonial = await this.testimonialService.getTestimonialById(req.params.id);
    return ApiResponse.success(res, 'Testimonial fetched successfully', testimonial);
  });

  createTestimonial = asyncHandler(async (req, res) => {
    const testimonial = await this.testimonialService.createTestimonial(req.body, req.file);
    return ApiResponse.success(res, 'Testimonial created successfully', testimonial, 201);
  });

  updateTestimonial = asyncHandler(async (req, res) => {
    const testimonial = await this.testimonialService.updateTestimonial(req.params.id, req.body, req.file);
    return ApiResponse.success(res, 'Testimonial updated successfully', testimonial);
  });

  deleteTestimonial = asyncHandler(async (req, res) => {
    await this.testimonialService.deleteTestimonial(req.params.id);
    return ApiResponse.success(res, 'Testimonial deleted successfully');
  });

  approveTestimonial = asyncHandler(async (req, res) => {
    const testimonial = await this.testimonialService.approveTestimonial(req.params.id);
    return ApiResponse.success(res, 'Testimonial approved successfully', testimonial);
  });
}

module.exports = new TestimonialController();