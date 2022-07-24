import { Body, Controller, Post } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(
    private service: MessageService,
  ){}

  @Post()
  join(@Body() body) {
    return this.service.create()
  }
}
