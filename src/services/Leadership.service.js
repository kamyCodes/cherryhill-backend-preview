const Leadership = require('../models/Leadership.model');
const ApiError = require('../utils/ApiError');
const CloudinaryConfig = require('../config/cloudinary');

class LeadershipService {
  constructor() {}

  static getInstance() {
    if (!LeadershipService.instance) {
      LeadershipService.instance = new LeadershipService();
    }
    return LeadershipService.instance;
  }

  async getAllLeadership(activeOnly = false) {
    const filter = activeOnly ? { isActive: true } : {};
    return await Leadership.find(filter).sort('order');
  }

  async getLeadershipById(id) {
    const leader = await Leadership.findById(id);
    if (!leader) {
      throw new ApiError(404, 'Leadership member not found');
    }
    return leader;
  }

  async createLeadership(leadershipData, imageFile) {
    if (!imageFile) {
      throw new ApiError(400, 'Image is required');
    }

    const { url } = await CloudinaryConfig.uploadImage(imageFile.path, 'leadership');
    leadershipData.image = url;

    const leader = await Leadership.create(leadershipData);
    return leader;
  }

  async updateLeadership(id, updateData, imageFile) {
    const leader = await Leadership.findById(id);
    if (!leader) {
      throw new ApiError(404, 'Leadership member not found');
    }

    if (imageFile) {
      if (leader.image) {
        const publicId = leader.image.split('/').pop()?.split('.')[0];
        if (publicId) {
          await CloudinaryConfig.deleteImage(`leadership/${publicId}`);
        }
      }
      const { url } = await CloudinaryConfig.uploadImage(imageFile.path, 'leadership');
      updateData.image = url;
    }

    const updatedLeader = await Leadership.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedLeader) {
      throw new ApiError(404, 'Leadership member not found');
    }

    return updatedLeader;
  }

  async deleteLeadership(id) {
    const leader = await Leadership.findById(id);
    if (!leader) {
      throw new ApiError(404, 'Leadership member not found');
    }

    if (leader.image) {
      const publicId = leader.image.split('/').pop()?.split('.')[0];
      if (publicId) {
        await CloudinaryConfig.deleteImage(`leadership/${publicId}`);
      }
    }

    await leader.deleteOne();
  }
}

module.exports = LeadershipService.getInstance();