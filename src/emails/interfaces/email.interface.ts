import { Document } from 'mongoose';
export interface Email extends Document {
  _id: string;
  subject: string;
  body: string;
  to: string;
  from: string;
  isRead: boolean;
  createdAt: Date;
}
