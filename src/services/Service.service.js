const Service = require('../models/Service.model');
const ApiError = require('../utils/ApiError');
const CloudinaryConfig = require('../config/cloudinary');

class ServiceService {
  constructor() {}

  static getInstance() {
    if (!ServiceService.instance) {
      ServiceService.instance = new ServiceService();
    }
    return ServiceService.instance;
  }

  async getAllServices(activeOnly = false) {
    const filter = activeOnly ? { isActive: true } : {};
    return await Service.find(filter).sort('order');
  }

  async getServiceById(id) {
    const service = await Service.findById(id);
    if (!service) {
      throw new ApiError(404, 'Service not found');
    }
    return service;
  }

  async getServiceBySlug(slug) {
    const service = await Service.findOne({ slug, isActive: true });
    if (!service) {
      throw new ApiError(404, 'Service not found');
    }
    return service;
  }

  async createService(serviceData, imageFile) {
    if (imageFile) {
      const { url } = await CloudinaryConfig.uploadImage(imageFile.path, 'services');
      serviceData.image = url;
    }

    const service = await Service.create(serviceData);
    return service;
  }

  async updateService(id, updateData, imageFile) {
    const service = await Service.findById(id);
    if (!service) {
      throw new ApiError(404, 'Service not found');
    }

    if (imageFile) {
      if (service.image) {
        const publicId = service.image.split('/').pop()?.split('.')[0];
        if (publicId) {
          await CloudinaryConfig.deleteImage(`services/${publicId}`);
        }
      }
      const { url } = await CloudinaryConfig.uploadImage(imageFile.path, 'services');
      updateData.image = url;
    }

    const updatedService = await Service.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      throw new ApiError(404, 'Service not found');
    }

    return updatedService;
  }

  async deleteService(id) {
    const service = await Service.findById(id);
    if (!service) {
      throw new ApiError(404, 'Service not found');
    }

    if (service.image) {
      const publicId = service.image.split('/').pop()?.split('.')[0];
      if (publicId) {
        await CloudinaryConfig.deleteImage(`services/${publicId}`);
      }
    }

    await service.deleteOne();
  }

  async toggleServiceStatus(id) {
    const service = await Service.findById(id);
    if (!service) {
      throw new ApiError(404, 'Service not found');
    }

    service.isActive = !service.isActive;
    await service.save();
    return service;
  }
}

module.exports = ServiceService.getInstance();