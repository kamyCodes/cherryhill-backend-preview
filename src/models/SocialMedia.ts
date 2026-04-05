import mongoose, { Document, Schema } from 'mongoose';

export interface ISocialMedia extends Document {
  platform: 'linkedin' | 'twitter' | 'instagram' | 'facebook' | 'youtube';
  url: string;
  icon?: string;
  isActive: boolean;
  order: number;
}

const SocialMediaSchema = new Schema<ISocialMedia>({
  platform: {
    type: String,
    enum: ['linkedin', 'twitter', 'instagram', 'facebook', 'youtube'],
    required: [true, 'Platform is required'],
    unique: true,
  },
  url: {
    type: String,
    required: [true, 'URL is required'],
  },
  icon: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.model<ISocialMedia>('SocialMedia', SocialMediaSchema);