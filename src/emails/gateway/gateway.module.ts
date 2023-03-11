import { Module } from '@nestjs/common';
import { EmailsGateway } from './email.gateway';

@Module({
  providers: [EmailsGateway],
})
export class GatewayModule {}
