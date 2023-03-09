// Implement Socket.io in email.gateway.ts
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { EmailService } from './email.service';
import { Email } from '../schemas/email.schema';

@WebSocketGateway()
export class EmailGateway {
  constructor(private readonly emailService: EmailService) {}

  @SubscribeMessage('updateEmail')
  async handleUpdateEmail(@MessageBody() email: Email) {
    const updatedEmail = await this.emailService.update(email._id, email);
    return updatedEmail;
  }
}
