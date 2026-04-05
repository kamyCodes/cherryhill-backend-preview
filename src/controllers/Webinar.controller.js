const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const WebinarService = require('../services/Webinar.service');

class WebinarController {
  constructor() {
    this.webinarService = WebinarService;
  }

  getAllWebinars = asyncHandler(async (req, res) => {
    const activeOnly = req.query.activeOnly === 'true';
    const webinars = await this.webinarService.getAllWebinars(activeOnly);
    return ApiResponse.success(res, 'Webinars fetched successfully', webinars);
  });

  getUpcomingWebinars = asyncHandler(async (req, res) => {
    const webinars = await this.webinarService.getUpcomingWebinars();
    return ApiResponse.success(res, 'Upcoming webinars fetched successfully', webinars);
  });

  getPastWebinars = asyncHandler(async (req, res) => {
    const webinars = await this.webinarService.getPastWebinars();
    return ApiResponse.success(res, 'Past webinars fetched successfully', webinars);
  });

  getWebinarById = asyncHandler(async (req, res) => {
    const webinar = await this.webinarService.getWebinarById(req.params.id);
    return ApiResponse.success(res, 'Webinar fetched successfully', webinar);
  });

  createWebinar = asyncHandler(async (req, res) => {
    const webinar = await this.webinarService.createWebinar(req.body, req.file);
    return ApiResponse.success(res, 'Webinar created successfully', webinar, 201);
  });

  updateWebinar = asyncHandler(async (req, res) => {
    const webinar = await this.webinarService.updateWebinar(req.params.id, req.body, req.file);
    return ApiResponse.success(res, 'Webinar updated successfully', webinar);
  });

  deleteWebinar = asyncHandler(async (req, res) => {
    await this.webinarService.deleteWebinar(req.params.id);
    return ApiResponse.success(res, 'Webinar deleted successfully');
  });
}

module.exports = new WebinarController();