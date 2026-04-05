const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const PressReleaseService = require('../services/PressRelease.service');

class PressReleaseController {
  constructor() {
    this.pressReleaseService = PressReleaseService;
  }

  getAllPressReleases = asyncHandler(async (req, res) => {
    const activeOnly = req.query.activeOnly === 'true';
    const pressReleases = await this.pressReleaseService.getAllPressReleases(activeOnly);
    return ApiResponse.success(res, 'Press releases fetched successfully', pressReleases);
  });

  getPressReleaseById = asyncHandler(async (req, res) => {
    const pressRelease = await this.pressReleaseService.getPressReleaseById(req.params.id);
    return ApiResponse.success(res, 'Press release fetched successfully', pressRelease);
  });

  getPressReleaseBySlug = asyncHandler(async (req, res) => {
    const pressRelease = await this.pressReleaseService.getPressReleaseBySlug(req.params.slug);
    return ApiResponse.success(res, 'Press release fetched successfully', pressRelease);
  });

  createPressRelease = asyncHandler(async (req, res) => {
    const pressRelease = await this.pressReleaseService.createPressRelease(req.body, req.file);
    return ApiResponse.success(res, 'Press release created successfully', pressRelease, 201);
  });

  updatePressRelease = asyncHandler(async (req, res) => {
    const pressRelease = await this.pressReleaseService.updatePressRelease(req.params.id, req.body, req.file);
    return ApiResponse.success(res, 'Press release updated successfully', pressRelease);
  });

  deletePressRelease = asyncHandler(async (req, res) => {
    await this.pressReleaseService.deletePressRelease(req.params.id);
    return ApiResponse.success(res, 'Press release deleted successfully');
  });
}

module.exports = new PressReleaseController();