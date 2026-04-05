const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
    },
    clientCompany: {
      type: String,
      trim: true,
    },
    clientImage: {
      type: String,
    },
    feedback: {
      type: String,
      required: [true, 'Feedback is required'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Testimonial', TestimonialSchema);