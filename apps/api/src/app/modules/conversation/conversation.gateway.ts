import { OnModuleInit } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { SEND_MESSAGE } from '@nx-chat-app/shared';
import { Server } from 'socket.io';
import { Socket } from 'socket.io-client';

@WebSocketGateway({ path: '/ws', transport: ['websocket'] })
export class ConversationGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit
{
  @WebSocketServer() server: Server;

  handleDisconnect(client: any) {
    console.log(client);
  }

  handleConnection(client: any, ...args: any[]) {
    console.log(client, args);
  }

  onModuleInit() {
    console.log(`Socket is listening`);
  }

  @SubscribeMessage(SEND_MESSAGE)
  sendMessage(@ConnectedSocket() socket: Socket, @MessageBody() data: any) {
    console.log(data);
    socket.emit('receive_msg', data);
  }
}
