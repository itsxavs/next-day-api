import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { SocketService } from './socket/socket.service';
import { Message } from 'src/models/message.model';
import { Model } from 'mongoose';
import { SocketController } from './socket/socket.controller';

@Module({
  imports: [],
  controllers: [SocketController],
  providers: [
    ChatGateway,
    SocketService,
    { provide: 'MessageModel', useValue: Model<Message> },
  ],
})
export class ChatGateWayModule {}
