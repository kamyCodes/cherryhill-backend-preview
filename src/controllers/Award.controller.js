const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const AwardService = require('../services/Award.service');

class AwardController {
  constructor() {
    this.awardService = AwardService;
  }

  getAllAwards = asyncHandler(async (req, res) => {
    const activeOnly = req.query.activeOnly === 'true';
    const awards = await this.awardService.getAllAwards(activeOnly);
    return ApiResponse.success(res, 'Awards fetched successfully', awards);
  });

  getAwardById = asyncHandler(async (req, res) => {
    const award = await this.awardService.getAwardById(req.params.id);
    return ApiResponse.success(res, 'Award fetched successfully', award);
  });

  createAward = asyncHandler(async (req, res) => {
    const award = await this.awardService.createAward(req.body, req.file);
    return ApiResponse.success(res, 'Award created successfully', award, 201);
  });

  updateAward = asyncHandler(async (req, res) => {
    const award = await this.awardService.updateAward(req.params.id, req.body, req.file);
    return ApiResponse.success(res, 'Award updated successfully', award);
  });

  deleteAward = asyncHandler(async (req, res) => {
    await this.awardService.deleteAward(req.params.id);
    return ApiResponse.success(res, 'Award deleted successfully');
  });
}

module.exports = new AwardController();