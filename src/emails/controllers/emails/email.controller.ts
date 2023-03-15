import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { EmailService } from '../../services/emails/email.service';
import { CreateEmailDto } from '../../dto/CreateEmailDto.dto';

@Controller('emails')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get()
  async getAll() {
    return this.emailService.findAll();
  }

  @Post()
  async create(@Body() emailDto: CreateEmailDto) {
    return this.emailService.create(emailDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() emailDto: CreateEmailDto) {
    return this.emailService.update(id, emailDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.emailService.delete(id);
  }
}
