const mongoose = require('mongoose');
const slugify = require('slugify');

const ServiceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    summary: {
      type: String,
      required: [true, 'Summary is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    icon: {
      type: String,
    },
    image: {
      type: String,
    },
    features: [{
      type: String,
    }],
    callToAction: {
      type: String,
      default: 'Contact Us',
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

ServiceSchema.pre('save', function(next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Service', ServiceSchema);