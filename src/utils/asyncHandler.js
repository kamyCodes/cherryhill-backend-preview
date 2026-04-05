const ApiError = require('./ApiError');

const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      if (error instanceof ApiError) {
        next(error);
      } else {
        next(new ApiError(500, error.message || 'Internal Server Error'));
      }
    });
  };
};

module.exports = asyncHandler;