const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const CompanyInfoService = require('../services/CompanyInfo.service');

class CompanyInfoController {
  constructor() {
    this.companyInfoService = CompanyInfoService;
  }

  getCompanyInfo = asyncHandler(async (req, res) => {
    const companyInfo = await this.companyInfoService.getCompanyInfo();
    return ApiResponse.success(res, 'Company info fetched successfully', companyInfo);
  });

  createCompanyInfo = asyncHandler(async (req, res) => {
    const logoFile = req.files?.logo?.[0];
    const faviconFile = req.files?.favicon?.[0];
    
    const companyInfo = await this.companyInfoService.createCompanyInfo(
      req.body,
      logoFile,
      faviconFile
    );
    return ApiResponse.success(res, 'Company info created successfully', companyInfo, 201);
  });

  updateCompanyInfo = asyncHandler(async (req, res) => {
    const logoFile = req.files?.logo?.[0];
    const faviconFile = req.files?.favicon?.[0];
    
    const companyInfo = await this.companyInfoService.updateCompanyInfo(
      req.body,
      logoFile,
      faviconFile
    );
    return ApiResponse.success(res, 'Company info updated successfully', companyInfo);
  });

  updateStats = asyncHandler(async (req, res) => {
    const companyInfo = await this.companyInfoService.updateStats(req.body);
    return ApiResponse.success(res, 'Company stats updated successfully', companyInfo);
  });
}

module.exports = new CompanyInfoController();