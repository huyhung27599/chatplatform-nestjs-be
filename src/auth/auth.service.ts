import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IAuthService } from './auth';
import { Services } from 'src/utils/constants';
import { IUserService } from 'src/users/interfaces/user';
import { User } from 'src/utils/typeorm';
import { ValidateUserDetails } from 'src/utils/types';
import { compareHash } from 'src/utils/helpers';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {}

  async validateUser(userCredentials: ValidateUserDetails): Promise<User> {
    const user = await this.userService.findUser(
      { username: userCredentials.username },
      { selectAll: true },
    );

    if (!user)
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);

    const isPasswordValid = await compareHash(
      userCredentials.password,
      user.password,
    );

    return isPasswordValid ? user : null;
  }
}
