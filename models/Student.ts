import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  class: string;
  school: string;
  email: string;
  phone: string;
  event: string;
  resume?: string;
  createdAt: Date;
}

const StudentSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  class: {
    type: String,
    required: [true, 'Class is required'],
    enum: ['9', '10', '11', '12'],
  },
  school: {
    type: String,
    required: [true, 'School name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number'],
  },
  event: {
    type: String,
    required: [true, 'Event selection is required'],
  },
  resume: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for faster queries
StudentSchema.index({ createdAt: -1 });
StudentSchema.index({ event: 1 });
StudentSchema.index({ email: 1 });

const Student: Model<IStudent> = 
  mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema);

export default Student;
