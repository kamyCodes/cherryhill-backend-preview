const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const LeadershipService = require('../services/Leadership.service');

class LeadershipController {
  constructor() {
    this.leadershipService = LeadershipService;
  }

  getAllLeadership = asyncHandler(async (req, res) => {
    const activeOnly = req.query.activeOnly === 'true';
    const leaders = await this.leadershipService.getAllLeadership(activeOnly);
    return ApiResponse.success(res, 'Leadership members fetched successfully', leaders);
  });

  getLeadershipById = asyncHandler(async (req, res) => {
    const leader = await this.leadershipService.getLeadershipById(req.params.id);
    return ApiResponse.success(res, 'Leadership member fetched successfully', leader);
  });

  createLeadership = asyncHandler(async (req, res) => {
    const leader = await this.leadershipService.createLeadership(req.body, req.file);
    return ApiResponse.success(res, 'Leadership member created successfully', leader, 201);
  });

  updateLeadership = asyncHandler(async (req, res) => {
    const leader = await this.leadershipService.updateLeadership(req.params.id, req.body, req.file);
    return ApiResponse.success(res, 'Leadership member updated successfully', leader);
  });

  deleteLeadership = asyncHandler(async (req, res) => {
    await this.leadershipService.deleteLeadership(req.params.id);
    return ApiResponse.success(res, 'Leadership member deleted successfully');
  });
}

module.exports = new LeadershipController();