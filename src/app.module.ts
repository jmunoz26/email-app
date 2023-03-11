import { Module } from '@nestjs/common';
import { SocketGateway } from 'socket.gateway';
import { EmailModule } from './emails/email.module';
@Module({
  imports: [EmailModule],
  controllers: [],
  providers: [SocketGateway],
})
export class AppModule {}
