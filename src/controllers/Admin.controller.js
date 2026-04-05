const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const AdminService = require('../services/Admin.service');

class AdminController {
  constructor() {
    this.adminService = AdminService;
  }

  getAllAdmins = asyncHandler(async (req, res) => {
    const admins = await this.adminService.getAllAdmins();
    return ApiResponse.success(res, 'Admins fetched successfully', admins);
  });

  getAdminById = asyncHandler(async (req, res) => {
    const admin = await this.adminService.getAdminById(req.params.id);
    return ApiResponse.success(res, 'Admin fetched successfully', admin);
  });

  createAdmin = asyncHandler(async (req, res) => {
    const admin = await this.adminService.createAdmin(req.body);
    return ApiResponse.success(res, 'Admin created successfully', admin, 201);
  });

  updateAdmin = asyncHandler(async (req, res) => {
    const admin = await this.adminService.updateAdmin(req.params.id, req.body);
    return ApiResponse.success(res, 'Admin updated successfully', admin);
  });

  deleteAdmin = asyncHandler(async (req, res) => {
    await this.adminService.deleteAdmin(req.params.id);
    return ApiResponse.success(res, 'Admin deleted successfully');
  });

  toggleAdminStatus = asyncHandler(async (req, res) => {
    const admin = await this.adminService.toggleAdminStatus(req.params.id);
    return ApiResponse.success(res, 'Admin status toggled successfully', admin);
  });
}

module.exports = new AdminController();