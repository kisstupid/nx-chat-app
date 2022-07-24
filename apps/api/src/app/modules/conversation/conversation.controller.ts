import { Body, Controller, Post } from '@nestjs/common';
import { ConversationService } from './conversation.service';

@Controller('conversation')
export class ConversationController {
  
  constructor(
    private service: ConversationService,
  ){}

  @Post()
  join(@Body() body) {
    return this.service.createOrJoin(body.roomId, body.username)
  }
}
