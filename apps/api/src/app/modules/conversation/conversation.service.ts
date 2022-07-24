import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { Conversation, ConversationDocument } from './conversation.schema';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<ConversationDocument>,
    private userSrv: UserService
  ) {}

  async createOrJoin(roomId: string, username: string) {
    const conversation = await this.conversationModel
      .findOne({ deletedAt: null, roomId })
      .populate('users')
      .exec();

    if (conversation) {
      const usernameIsExisted = conversation.users.some(
        (u) => u.username === username
      );

      if (usernameIsExisted)
        throw new ConflictException('Username is already taken!');

      const creator = await this.userSrv.create(username);

      creator.conversation = conversation;
      conversation.users.push(creator);

      return conversation.save();
    }

    const user = await this.userSrv.create(username);

    return this.conversationModel.create({
      roomId,
      users: [user],
      createdBy: user,
    });
  }
}
