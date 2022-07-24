import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Conversation } from '../conversation/conversation.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: String, required: true })
  username: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
  })
  conversation: Conversation;

  @Prop({ type: Date, required: false })
  deletedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
