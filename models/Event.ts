import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  duration?: string;
  location?: string;
  maxParticipants?: number;
  registeredCount: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  imageUrl?: string;
  createdAt: Date;
}

const EventSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
  },
  date: {
    type: Date,
    required: [true, 'Event date is required'],
  },
  duration: {
    type: String,
    default: '3 hours',
  },
  location: {
    type: String,
    default: 'Online',
  },
  maxParticipants: {
    type: Number,
    default: null,
  },
  registeredCount: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming',
  },
  imageUrl: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for faster queries
EventSchema.index({ date: 1 });
EventSchema.index({ status: 1 });

const Event: Model<IEvent> = 
  mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);

export default Event;
