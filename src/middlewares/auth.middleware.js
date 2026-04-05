const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin.model');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new ApiError(401, 'Not authorized to access this route');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin) {
      throw new ApiError(401, 'Admin not found');
    }

    if (!admin.isActive) {
      throw new ApiError(401, 'Admin account is deactivated');
    }

    req.user = admin;
    next();
  } catch (error) {
    throw new ApiError(401, 'Not authorized to access this route');
  }
});

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new ApiError(403, 'You do not have permission to perform this action');
    }
    next();
  };
};

module.exports = { protect, authorize };