const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin.model');
const ApiError = require('../utils/ApiError');

class AuthService {
  constructor() {}

  static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  generateToken(id) {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRE || '7d';
    
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    
    return jwt.sign({ id }, secret, { expiresIn });
  }

  async login(email, password) {
    const admin = await Admin.findOne({ email }).select('+password');
    
    if (!admin) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const isPasswordMatch = await admin.comparePassword(password);
    
    if (!isPasswordMatch) {
      throw new ApiError(401, 'Invalid credentials');
    }

    if (!admin.isActive) {
      throw new ApiError(401, 'Account is deactivated');
    }

    admin.lastLogin = new Date();
    await admin.save();

    const token = this.generateToken(admin._id.toString());
    
    const adminObject = admin.toObject();
    delete adminObject.password;

    return { token, admin: adminObject };
  }

  async changePassword(adminId, currentPassword, newPassword) {
    const admin = await Admin.findById(adminId).select('+password');
    
    if (!admin) {
      throw new ApiError(404, 'Admin not found');
    }

    const isPasswordMatch = await admin.comparePassword(currentPassword);
    
    if (!isPasswordMatch) {
      throw new ApiError(401, 'Current password is incorrect');
    }

    admin.password = newPassword;
    await admin.save();
  }

  async getMe(adminId) {
    const admin = await Admin.findById(adminId).select('-password');
    
    if (!admin) {
      throw new ApiError(404, 'Admin not found');
    }

    return admin;
  }
}

module.exports = AuthService.getInstance();