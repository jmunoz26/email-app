import { Document } from 'mongoose';
export interface Email extends Document {
  subject: string;
  body: string;
  to: string;
  from: string;
  isRead: boolean;
  createdAt: Date;
}
