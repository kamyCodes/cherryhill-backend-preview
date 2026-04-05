const mongoose = require('mongoose');
const slugify = require('slugify');

const PressReleaseSchema = new mongoose.Schema(
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
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    publicationDate: {
      type: Date,
      required: [true, 'Publication date is required'],
      default: Date.now,
    },
    author: {
      type: String,
    },
    image: {
      type: String,
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

PressReleaseSchema.pre('save', function(next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('PressRelease', PressReleaseSchema);