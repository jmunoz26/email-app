import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Email } from '../../interfaces/email.interface';
import { CreateEmailDto } from '../../dto/CreateEmailDto.dto';
import { UpdateEmailDto } from '../../dto/updateEmail.dto';
import mongoose from 'mongoose';

@Injectable()
export class EmailService {
  constructor(
    @InjectModel('Email') private readonly emailModel: Model<Email>,
  ) {}
  async delete(id: string): Promise<void> {
    await this.emailModel.findByIdAndDelete(id).exec();
  }
  async update(id: string, updateEmailDto: UpdateEmailDto): Promise<Email> {
    const email = await this.emailModel.findById(id);

    if (!email) {
      throw new NotFoundException(`Email with ID ${id} not found`);
    }

    email.isRead = updateEmailDto.isRead;
    await email.save();

    return email;
  }
  async create(email: CreateEmailDto): Promise<Email> {
    const createdEmail = new this.emailModel({
      ...email,
      _id: new mongoose.Types.ObjectId(), // generamos un nuevo ObjectId para el email
    });
    const savedEmail = await createdEmail.save();

    // // Emit a 'new-email' event to all connected clients
    // this.socketServer.emit('new-email', savedEmail);

    return savedEmail;
  }

  async getAll(): Promise<Email[]> {
    return this.emailModel.find().exec();
  }

  // async getEmailById(id: string): Promise<EmailDto> {
  //   const email = await this.emailModel.findById(id).exec();
  //   return email;
  // }
}
