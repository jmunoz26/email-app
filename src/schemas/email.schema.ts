import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmailDocument = Email & Document;

@Schema()
export class Email {
  @Prop()
  _id: string;

  @Prop()
  subject: string;

  @Prop()
  body: string;

  @Prop()
  sender: string;

  @Prop()
  recipient: string;

  @Prop({ default: false, mutable: true }) // set mutable option to true
  isRead: boolean;

  @Prop()
  createdAt: Date;
}

export const EmailSchema = SchemaFactory.createForClass(Email);
