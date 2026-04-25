const CompanyInfo = require('../models/CompanyInfo.model');
const ApiError = require('../utils/ApiError');
const CloudinaryConfig = require('../config/cloudinary');

class CompanyInfoService {
  constructor() {}

  static getInstance() {
    if (!CompanyInfoService.instance) {
      CompanyInfoService.instance = new CompanyInfoService();
    }
    return CompanyInfoService.instance;
  }

  async getCompanyInfo() {
    const companyInfo = await CompanyInfo.findOne();
    if (!companyInfo) {
      throw new ApiError(404, 'Company information not found. Please create it via admin panel.');
    }
    return companyInfo;
  }

  async createCompanyInfo(companyData, logoFile, faviconFile) {
    // Check if company info already exists
    const existing = await CompanyInfo.findOne();
    if (existing) {
      throw new ApiError(400, 'Company info already exists. Use update instead.');
    }

    if (logoFile) {
      const { url } = await CloudinaryConfig.uploadImage(logoFile, 'company');
      companyData.logo = url;
    }

    if (faviconFile) {
      const { url } = await CloudinaryConfig.uploadImage(faviconFile, 'company');
      companyData.favicon = url;
    }

    const companyInfo = await CompanyInfo.create(companyData);
    return companyInfo;
  }

  async updateCompanyInfo(updateData, logoFile, faviconFile) {
    const companyInfo = await this.getCompanyInfo();

    if (logoFile) {
      if (companyInfo.logo) {
        const publicId = companyInfo.logo.split('/').pop()?.split('.')[0];
        if (publicId) {
          await CloudinaryConfig.deleteImage(`company/${publicId}`);
        }
      }
      const { url } = await CloudinaryConfig.uploadImage(logoFile, 'company');
      updateData.logo = url;
    }

    if (faviconFile) {
      if (companyInfo.favicon) {
        const publicId = companyInfo.favicon.split('/').pop()?.split('.')[0];
        if (publicId) {
          await CloudinaryConfig.deleteImage(`company/${publicId}`);
        }
      }
      const { url } = await CloudinaryConfig.uploadImage(faviconFile, 'company');
      updateData.favicon = url;
    }

    const updatedCompanyInfo = await CompanyInfo.findByIdAndUpdate(
      companyInfo._id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedCompanyInfo) {
      throw new ApiError(404, 'Company info not found');
    }

    return updatedCompanyInfo;
  }

  async updateStats(statsData) {
    const companyInfo = await this.getCompanyInfo();
    
    // Ensure numeric fields are correctly parsed and handle the nested structure if provided
    const newStats = { ...companyInfo.stats };
    
    const fields = ['clients', 'yearsOfExperience', 'teamMembers'];
    fields.forEach(field => {
      if (statsData[field] !== undefined) {
        newStats[field] = Number(statsData[field]);
      }
    });
    
    if (statsData.assetsManaged !== undefined) {
      newStats.assetsManaged = String(statsData.assetsManaged);
    }
    
    companyInfo.stats = newStats;
    
    // Mark as modified if it's a nested object
    companyInfo.markModified('stats');
    
    await companyInfo.save();
    return companyInfo;
  }
}

module.exports = CompanyInfoService.getInstance();