const cloudinary = require('cloudinary').v2;
require('dotenv').config();

class CloudinaryConfig {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  static getInstance() {
    if (!CloudinaryConfig.instance) {
      CloudinaryConfig.instance = new CloudinaryConfig();
    }
    return CloudinaryConfig.instance;
  }

  getCloudinary() {
    return cloudinary;
  }

  async uploadImage(filePath, folder = 'corporate-platform') {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder,
        resource_type: 'auto',
      });
      return {
        url: result.secure_url,
        publicId: result.public_id,
      };
    } catch (error) {
      throw new Error(`Failed to upload image to Cloudinary: ${error}`);
    }
  }

  async deleteImage(publicId) {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result.result === 'ok';
    } catch (error) {
      throw new Error(`Failed to delete image from Cloudinary: ${error}`);
    }
  }
}

module.exports = CloudinaryConfig.getInstance();