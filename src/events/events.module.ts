import { Module } from '@nestjs/common';
import { GatewayModule } from 'src/gateway/gateway.module';
import { FriendEvents } from './friends.events';
import { FriendRequestsEvents } from './friend-request.events';

@Module({
  imports: [GatewayModule],
  providers: [FriendEvents, FriendRequestsEvents],
})
export class EventsModule {}
