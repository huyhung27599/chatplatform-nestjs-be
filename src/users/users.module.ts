import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from 'src/utils/constants';
import { Peer, Profile, User, UserPresence } from 'src/utils/typeorm';
import { UserService } from './services/user.service';
import { UsersController } from './controllers/user.controller';
import { ImageStorageModule } from 'src/image-storage/image-storage.module';
import { UserProfileService } from './services/user-profile.service';
import { UserProfilesController } from './controllers/user-profile.controller';
import { UserPresenceService } from './services/user-presence.service';
import { UserPresenceController } from './controllers/user-presence.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Peer, UserPresence, Profile]),
    ImageStorageModule,
  ],
  controllers: [
    UsersController,
    UserProfilesController,
    UserPresenceController,
  ],
  providers: [
    {
      provide: Services.USERS,
      useClass: UserService,
    },
    {
      provide: Services.USERS_PROFILES,
      useClass: UserProfileService,
    },
    {
      provide: Services.USER_PRESENCE,
      useClass: UserPresenceService,
    },
  ],

  exports: [
    {
      provide: Services.USERS,
      useClass: UserService,
    },
    {
      provide: Services.USERS_PROFILES,
      useClass: UserProfileService,
    },
    {
      provide: Services.USER_PRESENCE,
      useClass: UserPresenceService,
    },
  ],
})
export class UsersModule {}
