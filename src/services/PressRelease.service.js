const PressRelease = require('../models/PressRelease.model');
const ApiError = require('../utils/ApiError');
const CloudinaryConfig = require('../config/cloudinary');

class PressReleaseService {
  constructor() {}

  static getInstance() {
    if (!PressReleaseService.instance) {
      PressReleaseService.instance = new PressReleaseService();
    }
    return PressReleaseService.instance;
  }

  async getAllPressReleases(activeOnly = false) {
    const filter = activeOnly ? { isActive: true } : {};
    return await PressRelease.find(filter).sort('-publicationDate');
  }

  async getPressReleaseById(id) {
    const pressRelease = await PressRelease.findById(id);
    if (!pressRelease) {
      throw new ApiError(404, 'Press release not found');
    }
    return pressRelease;
  }

  async getPressReleaseBySlug(slug) {
    const pressRelease = await PressRelease.findOne({ slug, isActive: true });
    if (!pressRelease) {
      throw new ApiError(404, 'Press release not found');
    }
    return pressRelease;
  }

  async createPressRelease(pressReleaseData, imageFile) {
    if (imageFile) {
      const { url } = await CloudinaryConfig.uploadImage(imageFile, 'press-releases');
      pressReleaseData.image = url;
    }

    const pressRelease = await PressRelease.create(pressReleaseData);
    return pressRelease;
  }

  async updatePressRelease(id, updateData, imageFile) {
    const pressRelease = await PressRelease.findById(id);
    if (!pressRelease) {
      throw new ApiError(404, 'Press release not found');
    }

    if (imageFile) {
      if (pressRelease.image) {
        const publicId = pressRelease.image.split('/').pop()?.split('.')[0];
        if (publicId) {
          await CloudinaryConfig.deleteImage(`press-releases/${publicId}`);
        }
      }
      const { url } = await CloudinaryConfig.uploadImage(imageFile, 'press-releases');
      updateData.image = url;
    }

    const updatedPressRelease = await PressRelease.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedPressRelease) {
      throw new ApiError(404, 'Press release not found');
    }

    return updatedPressRelease;
  }

  async deletePressRelease(id) {
    const pressRelease = await PressRelease.findById(id);
    if (!pressRelease) {
      throw new ApiError(404, 'Press release not found');
    }

    if (pressRelease.image) {
      const publicId = pressRelease.image.split('/').pop()?.split('.')[0];
      if (publicId) {
        await CloudinaryConfig.deleteImage(`press-releases/${publicId}`);
      }
    }

    await pressRelease.deleteOne();
  }
}

module.exports = PressReleaseService.getInstance();