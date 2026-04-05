const Testimonial = require('../models/Testimonial.model');
const ApiError = require('../utils/ApiError');
const CloudinaryConfig = require('../config/cloudinary');

class TestimonialService {
  constructor() {}

  static getInstance() {
    if (!TestimonialService.instance) {
      TestimonialService.instance = new TestimonialService();
    }
    return TestimonialService.instance;
  }

  async getAllTestimonials(approvedOnly = false) {
    const filter = approvedOnly ? { isApproved: true, isActive: true } : {};
    return await Testimonial.find(filter).sort('order');
  }

  async getTestimonialById(id) {
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      throw new ApiError(404, 'Testimonial not found');
    }
    return testimonial;
  }

  async createTestimonial(testimonialData, imageFile) {
    if (imageFile) {
      const { url } = await CloudinaryConfig.uploadImage(imageFile.path, 'testimonials');
      testimonialData.clientImage = url;
    }

    const testimonial = await Testimonial.create(testimonialData);
    return testimonial;
  }

  async updateTestimonial(id, updateData, imageFile) {
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      throw new ApiError(404, 'Testimonial not found');
    }

    if (imageFile) {
      if (testimonial.clientImage) {
        const publicId = testimonial.clientImage.split('/').pop()?.split('.')[0];
        if (publicId) {
          await CloudinaryConfig.deleteImage(`testimonials/${publicId}`);
        }
      }
      const { url } = await CloudinaryConfig.uploadImage(imageFile.path, 'testimonials');
      updateData.clientImage = url;
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedTestimonial) {
      throw new ApiError(404, 'Testimonial not found');
    }

    return updatedTestimonial;
  }

  async deleteTestimonial(id) {
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      throw new ApiError(404, 'Testimonial not found');
    }

    if (testimonial.clientImage) {
      const publicId = testimonial.clientImage.split('/').pop()?.split('.')[0];
      if (publicId) {
        await CloudinaryConfig.deleteImage(`testimonials/${publicId}`);
      }
    }

    await testimonial.deleteOne();
  }

  async approveTestimonial(id) {
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      throw new ApiError(404, 'Testimonial not found');
    }

    testimonial.isApproved = true;
    await testimonial.save();
    return testimonial;
  }
}

module.exports = TestimonialService.getInstance();