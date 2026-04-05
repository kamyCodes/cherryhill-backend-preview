const mongoose = require('mongoose');

const LeadershipSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true,
    },
    bio: {
      type: String,
      required: [true, 'Bio is required'],
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    linkedin: {
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Leadership', LeadershipSchema);