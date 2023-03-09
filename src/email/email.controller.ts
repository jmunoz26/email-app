import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailDto } from './dto/email.dto';

@Controller('emails')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get()
  async findAll() {
    return this.emailService.findAll();
  }

  @Post()
  async create(@Body() emailDto: EmailDto) {
    return this.emailService.create(emailDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() emailDto: EmailDto) {
    return this.emailService.update(id, emailDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.emailService.delete(id);
  }
}
