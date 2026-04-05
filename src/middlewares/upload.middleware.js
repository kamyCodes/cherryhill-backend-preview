const multer = require('multer');
const path = require('path');
const ApiError = require('../utils/ApiError');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new ApiError(400, 'Only image files are allowed'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter,
});

const uploadSingle = (fieldName) => upload.single(fieldName);

const uploadMultiple = (fields) => {
  return upload.fields(fields);
};

const uploadArray = (fieldName, maxCount) => {
  return upload.array(fieldName, maxCount);
};

module.exports = { uploadSingle, uploadMultiple, uploadArray };