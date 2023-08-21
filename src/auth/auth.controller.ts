import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { IUserService } from 'src/users/interfaces/user';
import { Routes, Services } from 'src/utils/constants';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { instanceToPlain } from 'class-transformer';
import { AuthenticationGuard, LocalAuthGuard } from './utils/Guards';
import { Request, Response } from 'express';
import { AuthenticationRequest } from 'src/utils/types';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(@Inject(Services.USERS) private userService: IUserService) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return instanceToPlain(await this.userService.createUser(createUserDto));
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Res() res: Response) {
    return res.send(HttpStatus.OK);
  }

  @Get('status')
  @UseGuards(AuthenticationGuard)
  async status(@Req() req: Request, @Res() res: Response) {
    res.send(req.user);
  }

  @Post('logout')
  @UseGuards(AuthenticationGuard)
  logout(@Req() req: AuthenticationRequest, @Res() res: Response) {
    req.logout((err) => {
      return err ? res.send(400) : res.send(200);
    });
  }
}
