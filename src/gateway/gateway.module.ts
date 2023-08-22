import { Module } from '@nestjs/common';
import { Services } from 'src/utils/constants';
import { GatewaySessionManager } from './gateway.session';
import { FriendsModule } from 'src/friends/friends.module';
import { MessagingGateway } from './gateway';

@Module({
  imports: [FriendsModule],
  providers: [
    MessagingGateway,
    {
      provide: Services.GATEWAY_SESSION_MANAGER,
      useClass: GatewaySessionManager,
    },
  ],
  exports: [
    MessagingGateway,
    {
      provide: Services.GATEWAY_SESSION_MANAGER,
      useClass: GatewaySessionManager,
    },
  ],
})
export class GatewayModule {}
