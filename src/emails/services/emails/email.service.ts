import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmailDto } from '../../dto/CreateEmailDto.dto';
import { Email } from '../../../schemas/email.schema';

@Injectable()
export class EmailService {
  constructor(
    @InjectModel('Email') private readonly emailModel: Model<Email>,
  ) {}

  async findAll(): Promise<Email[]> {
    return this.emailModel.find();
  }

  async findOne(id: string): Promise<Email | null> {
    return this.emailModel.findById(id);
  }

  async update(
    id: string,
    updateEmailDto: CreateEmailDto,
  ): Promise<Email | null> {
    const existingEmail = await this.emailModel.findById(id);
    if (!existingEmail) {
      throw new Error(`Email with id ${id} not found`);
    }
    const updatedEmail = await this.emailModel.findByIdAndUpdate(
      id,
      updateEmailDto,
      { new: true },
    );
    return updatedEmail;
  }

  async create(createEmailDto: CreateEmailDto): Promise<Email> {
    const createdEmail = new this.emailModel(createEmailDto);
    return createdEmail.save();
  }

  async delete(id: string): Promise<Email> {
    const deletedEmail = await this.emailModel.findByIdAndDelete(id);
    if (!deletedEmail) {
      throw new NotFoundException(`Email with id ${id} not found`);
    }
    return deletedEmail;
  }
}
