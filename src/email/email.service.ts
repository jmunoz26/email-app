import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Email } from './interfaces/email.interface';
import { EmailDto } from './dto/email.dto';
import { UpdateEmailDto } from './dto/updateEmail.dto';

@Injectable()
export class EmailService {
  constructor(
    @InjectModel('Email') private readonly emailModel: Model<Email>,
  ) {}
  private val = [
    {
      subject: 1,
      body: 'hola',
      sender: 'hola',
      recipient: 'hola',
      read: 'hola',
      timestamp: 'hola',
    },
  ];
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
  async create(email: EmailDto): Promise<EmailDto> {
    const createdEmail = new this.emailModel(email);
    const savedEmail = await createdEmail.save();

    // // Emit a 'new-email' event to all connected clients
    // this.socketServer.emit('new-email', savedEmail);

    return savedEmail;
  }

  async findAll(): Promise<Email[]> {
    return this.emailModel.find().exec();
  }
}
