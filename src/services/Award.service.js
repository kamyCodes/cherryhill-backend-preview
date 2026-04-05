const Award = require('../models/Award.model');
const ApiError = require('../utils/ApiError');
const CloudinaryConfig = require('../config/cloudinary');

class AwardService {
  constructor() {}

  static getInstance() {
    if (!AwardService.instance) {
      AwardService.instance = new AwardService();
    }
    return AwardService.instance;
  }

  async getAllAwards(activeOnly = false) {
    const filter = activeOnly ? { isActive: true } : {};
    return await Award.find(filter).sort('-year order');
  }

  async getAwardById(id) {
    const award = await Award.findById(id);
    if (!award) {
      throw new ApiError(404, 'Award not found');
    }
    return award;
  }

  async createAward(awardData, imageFile) {
    if (imageFile) {
      const { url } = await CloudinaryConfig.uploadImage(imageFile.path, 'awards');
      awardData.image = url;
    }

    const award = await Award.create(awardData);
    return award;
  }

  async updateAward(id, updateData, imageFile) {
    const award = await Award.findById(id);
    if (!award) {
      throw new ApiError(404, 'Award not found');
    }

    if (imageFile) {
      if (award.image) {
        const publicId = award.image.split('/').pop()?.split('.')[0];
        if (publicId) {
          await CloudinaryConfig.deleteImage(`awards/${publicId}`);
        }
      }
      const { url } = await CloudinaryConfig.uploadImage(imageFile.path, 'awards');
      updateData.image = url;
    }

    const updatedAward = await Award.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedAward) {
      throw new ApiError(404, 'Award not found');
    }

    return updatedAward;
  }

  async deleteAward(id) {
    const award = await Award.findById(id);
    if (!award) {
      throw new ApiError(404, 'Award not found');
    }

    if (award.image) {
      const publicId = award.image.split('/').pop()?.split('.')[0];
      if (publicId) {
        await CloudinaryConfig.deleteImage(`awards/${publicId}`);
      }
    }

    await award.deleteOne();
  }
}

module.exports = AwardService.getInstance();