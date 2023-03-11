import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class EmailsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server!: Server;
  users = [];

  handleConnection(client: any) {
    //this.users.push(client.id);

    client.emit('connection', 'Successfully connected to server');

    this.server.emit('users', this.users);
  }

  handleDisconnect(client: any) {
    this.users = this.users.filter((user) => user !== client.id);

    this.server.emit('users', this.users);
  }

  @SubscribeMessage('msgToServer')
  handleMessage(clientId: string, payload: string): void {
    this.server.emit('msgToClient', payload);
  }
}
