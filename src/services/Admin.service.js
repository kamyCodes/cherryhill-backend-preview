const Admin = require('../models/Admin.model');
const ApiError = require('../utils/ApiError');

class AdminService {
  constructor() {}

  static getInstance() {
    if (!AdminService.instance) {
      AdminService.instance = new AdminService();
    }
    return AdminService.instance;
  }

  async getAllAdmins() {
    return await Admin.find().select('-password').sort('-createdAt');
  }

  async getAdminById(id) {
    const admin = await Admin.findById(id).select('-password');
    if (!admin) {
      throw new ApiError(404, 'Admin not found');
    }
    return admin;
  }

  async createAdmin(adminData) {
    const existingAdmin = await Admin.findOne({ email: adminData.email });
    if (existingAdmin) {
      throw new ApiError(400, 'Admin with this email already exists');
    }

    const admin = await Admin.create(adminData);
    const adminObject = admin.toObject();
    delete adminObject.password;
    return adminObject;
  }

  async updateAdmin(id, updateData) {
    if (updateData.password) {
      delete updateData.password;
    }

    const admin = await Admin.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!admin) {
      throw new ApiError(404, 'Admin not found');
    }

    return admin;
  }

  async deleteAdmin(id) {
    const admin = await Admin.findById(id);
    if (!admin) {
      throw new ApiError(404, 'Admin not found');
    }

    if (admin.role === 'super_admin') {
      const superAdminCount = await Admin.countDocuments({ role: 'super_admin' });
      if (superAdminCount === 1) {
        throw new ApiError(400, 'Cannot delete the only super admin');
      }
    }

    await admin.deleteOne();
  }

  async toggleAdminStatus(id) {
    const admin = await Admin.findById(id);
    if (!admin) {
      throw new ApiError(404, 'Admin not found');
    }

    admin.isActive = !admin.isActive;
    await admin.save();

    const adminObject = admin.toObject();
    delete adminObject.password;
    return adminObject;
  }
}

module.exports = AdminService.getInstance();