const mongoose = require('mongoose');

const WebinarSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    duration: {
      type: String,
    },
    speaker: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
    registrationLink: {
      type: String,
    },
    image: {
      type: String,
    },
    isUpcoming: {
      type: Boolean,
      default: true,
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

WebinarSchema.pre('save', function(next) {
  this.isUpcoming = this.date > new Date();
  next();
});

module.exports = mongoose.model('Webinar', WebinarSchema);