class ApiResponse {
  static success(res, message, data, statusCode = 200) {
    const response = {
      success: true,
      message,
      data,
    };
    return res.status(statusCode).json(response);
  }

  static error(res, message, statusCode = 500, errors) {
    const response = {
      success: false,
      message,
      errors,
    };
    return res.status(statusCode).json(response);
  }

  static paginated(res, message, data, pagination) {
    const response = {
      success: true,
      message,
      data: {
        items: data,
        pagination,
      },
    };
    return res.status(200).json(response);
  }
}

module.exports = ApiResponse;