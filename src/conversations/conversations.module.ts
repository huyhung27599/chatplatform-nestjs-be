import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendsModule } from 'src/friends/friends.module';
import { UsersModule } from 'src/users/users.module';
import { isAuthorized } from 'src/utils/helpers';
import { Conversation, Message } from 'src/utils/typeorm';
import { ConversationsController } from './conversations.controller';
import { Services } from 'src/utils/constants';
import { ConversationsService } from './conversations.service';
import { ConversationMiddleware } from './middlewares/conversation.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation, Message]),
    UsersModule,
    FriendsModule,
  ],
  controllers: [ConversationsController],
  exports: [
    {
      provide: Services.CONVERSATIONS,
      useClass: ConversationsService,
    },
  ],
})
export class ConversationsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isAuthorized, ConversationMiddleware)
      .forRoutes('conversations/:id');
  }
}
