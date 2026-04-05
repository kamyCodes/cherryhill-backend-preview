import mongoose, { Document, Schema } from 'mongoose';

export interface IStatistic extends Document {
  title: string;
  value: number;
  suffix?: string;
  order: number;
  isActive: boolean;
}

const StatisticSchema = new Schema<IStatistic>({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  value: {
    type: Number,
    required: [true, 'Value is required'],
  },
  suffix: {
    type: String,
  },
  order: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model<IStatistic>('Statistic', StatisticSchema);