import { Module } from '@nestjs/common';
import { GatewayModule } from 'src/gateway/gateway.module';
import { FriendEvents } from './friends.events';

@Module({
  imports: [GatewayModule],
  providers: [FriendEvents],
})
export class EventsModule {}
