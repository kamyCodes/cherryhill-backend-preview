const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const AuthService = require('../services/Auth.service');

class AuthController {
  constructor() {
    this.authService = AuthService;
  }

  login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return ApiResponse.error(res, 'Please provide email and password', 400);
    }

    const { token, admin } = await this.authService.login(email, password);

    return ApiResponse.success(res, 'Login successful', {
      token,
      admin,
    });
  });

  getMe = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user) {
      return ApiResponse.error(res, 'User not found', 404);
    }

    const admin = await this.authService.getMe(user._id.toString());
    return ApiResponse.success(res, 'User fetched successfully', admin);
  });

  changePassword = asyncHandler(async (req, res) => {
    const user = req.user;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return ApiResponse.error(res, 'Please provide current and new password', 400);
    }

    if (!user) {
      return ApiResponse.error(res, 'User not found', 404);
    }

    await this.authService.changePassword(
      user._id.toString(),
      currentPassword,
      newPassword
    );

    return ApiResponse.success(res, 'Password changed successfully');
  });
}

module.exports = new AuthController();