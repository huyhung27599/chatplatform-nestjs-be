import { Body, Controller, Inject, Patch, UseGuards } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IUserPresenceService } from '../interfaces/user-presense';
import { AuthenticationGuard } from 'src/auth/utils/Guards';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';
import { UpdatePresenceStatusDto } from '../dtos/UpdatePresenceStatus.dto';

@UseGuards(AuthenticationGuard)
@Controller(Routes.USER_PRESENCE)
export class UserPresenceController {
  constructor(
    @Inject(Services.USER_PRESENCE)
    private readonly userPresenceService: IUserPresenceService,
  ) {}

  @Patch('status')
  updateStatus(
    @AuthUser() user: User,
    @Body() { statusMessage }: UpdatePresenceStatusDto,
  ) {
    return this.userPresenceService.updateStatus({ user, statusMessage });
  }
}
