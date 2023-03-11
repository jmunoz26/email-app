import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailSchema, Email } from '../schemas/email.schema';
import { EmailController } from './controllers/emails/email.controller';
import { GatewayModule } from './gateway/gateway.module';
import { EmailService } from './services/emails/email.service';
const password = 'jjKR1Gp4Zzqj4lKN';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://katekyo:${password}@cluster0.af4xc.mongodb.net/midudb?retryWrites=true&w=majority`,
    ),
    MongooseModule.forFeature([{ name: Email.name, schema: EmailSchema }]),
    GatewayModule,
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
