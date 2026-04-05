const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ServiceService = require('../services/Service.service');

class ServiceController {
  constructor() {
    this.serviceService = ServiceService;
  }

  getAllServices = asyncHandler(async (req, res) => {
    const activeOnly = req.query.activeOnly === 'true';
    const services = await this.serviceService.getAllServices(activeOnly);
    return ApiResponse.success(res, 'Services fetched successfully', services);
  });

  getServiceById = asyncHandler(async (req, res) => {
    const service = await this.serviceService.getServiceById(req.params.id);
    return ApiResponse.success(res, 'Service fetched successfully', service);
  });

  getServiceBySlug = asyncHandler(async (req, res) => {
    const service = await this.serviceService.getServiceBySlug(req.params.slug);
    return ApiResponse.success(res, 'Service fetched successfully', service);
  });

  createService = asyncHandler(async (req, res) => {
    const service = await this.serviceService.createService(req.body, req.file);
    return ApiResponse.success(res, 'Service created successfully', service, 201);
  });

  updateService = asyncHandler(async (req, res) => {
    const service = await this.serviceService.updateService(req.params.id, req.body, req.file);
    return ApiResponse.success(res, 'Service updated successfully', service);
  });

  deleteService = asyncHandler(async (req, res) => {
    await this.serviceService.deleteService(req.params.id);
    return ApiResponse.success(res, 'Service deleted successfully');
  });

  toggleServiceStatus = asyncHandler(async (req, res) => {
    const service = await this.serviceService.toggleServiceStatus(req.params.id);
    return ApiResponse.success(res, 'Service status toggled successfully', service);
  });
}

module.exports = new ServiceController();