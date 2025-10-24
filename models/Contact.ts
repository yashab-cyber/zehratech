import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: Date;
}

const ContactSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied'],
    default: 'new',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for faster queries
ContactSchema.index({ createdAt: -1 });
ContactSchema.index({ status: 1 });

const Contact: Model<IContact> = 
  mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);

export default Contact;
