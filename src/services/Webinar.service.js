const Webinar = require('../models/Webinar.model');
const ApiError = require('../utils/ApiError');
const CloudinaryConfig = require('../config/cloudinary');

class WebinarService {
  constructor() {}

  static getInstance() {
    if (!WebinarService.instance) {
      WebinarService.instance = new WebinarService();
    }
    return WebinarService.instance;
  }

  async getAllWebinars(activeOnly = false) {
    const filter = activeOnly ? { isActive: true } : {};
    return await Webinar.find(filter).sort('-date');
  }

  async getUpcomingWebinars() {
    return await Webinar.find({ isUpcoming: true, isActive: true }).sort('date');
  }

  async getPastWebinars() {
    return await Webinar.find({ isUpcoming: false, isActive: true }).sort('-date');
  }

  async getWebinarById(id) {
    const webinar = await Webinar.findById(id);
    if (!webinar) {
      throw new ApiError(404, 'Webinar not found');
    }
    return webinar;
  }

  async createWebinar(webinarData, imageFile) {
    if (imageFile) {
      const { url } = await CloudinaryConfig.uploadImage(imageFile, 'webinars');
      webinarData.image = url;
    }

    const webinar = await Webinar.create(webinarData);
    return webinar;
  }

  async updateWebinar(id, updateData, imageFile) {
    const webinar = await Webinar.findById(id);
    if (!webinar) {
      throw new ApiError(404, 'Webinar not found');
    }

    if (imageFile) {
      if (webinar.image) {
        const publicId = webinar.image.split('/').pop()?.split('.')[0];
        if (publicId) {
          await CloudinaryConfig.deleteImage(`webinars/${publicId}`);
        }
      }
      const { url } = await CloudinaryConfig.uploadImage(imageFile, 'webinars');
      updateData.image = url;
    }

    const updatedWebinar = await Webinar.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedWebinar) {
      throw new ApiError(404, 'Webinar not found');
    }

    return updatedWebinar;
  }

  async deleteWebinar(id) {
    const webinar = await Webinar.findById(id);
    if (!webinar) {
      throw new ApiError(404, 'Webinar not found');
    }

    if (webinar.image) {
      const publicId = webinar.image.split('/').pop()?.split('.')[0];
      if (publicId) {
        await CloudinaryConfig.deleteImage(`webinars/${publicId}`);
      }
    }

    await webinar.deleteOne();
  }
}

module.exports = WebinarService.getInstance();