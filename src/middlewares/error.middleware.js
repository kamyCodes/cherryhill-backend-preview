const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return ApiResponse.error(res, err.message, err.statusCode, err.errors);
  }

  console.error('Unhandled Error:', err);

  return ApiResponse.error(
    res,
    process.env.NODE_ENV === 'production'
      ? 'Internal Server Error'
      : err.message,
    500
  );
};

module.exports = errorMiddleware;