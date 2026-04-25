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

  async uploadImage(file, folder = 'corporate-platform') {
    try {
      let uploadOptions = {
        folder,
        resource_type: 'auto',
      };

      let uploadResult;
      if (file.buffer) {
        // Handle memory storage (buffer)
        uploadResult = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            uploadOptions,
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          uploadStream.end(file.buffer);
        });
      } else {
        // Handle disk storage (path)
        uploadResult = await cloudinary.uploader.upload(file.path || file, uploadOptions);
      }

      return {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      };
    } catch (error) {
      throw new Error(`Failed to upload image to Cloudinary: ${error.message}`);
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