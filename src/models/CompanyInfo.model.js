const mongoose = require('mongoose');

const CompanyInfoSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      default: 'Corporate Investment Platform',
    },
    tagline: {
      type: String,
      default: 'Your Trusted Investment Partner',
    },
    description: {
      type: String,
      required: true,
    },
    founded: {
      type: Number,
      required: true,
    },
    headquarters: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    mapUrl: {
      type: String,
    },
    socialMedia: {
      linkedin: String,
      twitter: String,
      instagram: String,
      facebook: String,
    },
    stats: {
      clients: { type: Number, default: 0 },
      assetsManaged: { type: String, default: '$0' },
      yearsOfExperience: { type: Number, default: 0 },
      teamMembers: { type: Number, default: 0 },
    },
    mission: {
      type: String,
      required: true,
    },
    vision: {
      type: String,
      required: true,
    },
    values: [{
      type: String,
    }],
    whyChooseUs: [{
      type: String,
    }],
    logo: {
      type: String,
    },
    favicon: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('CompanyInfo', CompanyInfoSchema);