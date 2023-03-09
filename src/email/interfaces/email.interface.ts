import { Document } from 'mongoose';

export interface Email extends Document {
  readonly subject: string;
  readonly body: string;
  readonly sender: string;
  readonly recipient: string;
  isRead: boolean;
  readonly createdAt: Date;
}
