import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop()
  content: string;

  @Prop()
  createdBy: string;

  @Prop()
  timestamp: number;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
