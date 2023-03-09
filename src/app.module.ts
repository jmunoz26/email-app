import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SocketGateway } from 'socket.gateway';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
const password = 'jjKR1Gp4Zzqj4lKN';
@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://katekyo:${password}@cluster0.af4xc.mongodb.net/midudb?retryWrites=true&w=majority`,
    ),
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService, SocketGateway],
})
export class AppModule {}
