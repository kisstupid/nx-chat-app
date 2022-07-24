import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../user/user.schema';

export type ConversationDocument = Conversation & Document;

@Schema()
export class Conversation {
  @Prop({ required: true })
  roomId: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    required: true,
  })
  users: User[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  createdBy: User;

  @Prop({ type: Date, required: false })
  deletedAt?: Date;
}

const ConversationSchema = SchemaFactory.createForClass(Conversation);

ConversationSchema.index({ roomId: 1, deletedAt: 1 }, { unique: true });

export { ConversationSchema };
