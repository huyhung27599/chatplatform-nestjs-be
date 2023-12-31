import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUserService } from '../interfaces/user';
import { InjectRepository } from '@nestjs/typeorm';
import { Peer, User } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import {
  CreateUserDetails,
  FindUserOptions,
  FindUserParams,
} from 'src/utils/types';
import { hashPassword } from 'src/utils/helpers';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Peer) private readonly peerRepository: Repository<Peer>,
  ) {}

  async createUser(userDetails: CreateUserDetails) {
    const existingUser = await this.userRepository.findOne({
      username: userDetails.username,
    });
    if (existingUser)
      throw new HttpException('User already exists', HttpStatus.CONFLICT);

    const pasword = await hashPassword(userDetails.password);
    const peer = this.peerRepository.create();
    const params = { ...userDetails, pasword, peer };
    const newUser = this.userRepository.create(params);
    return this.userRepository.save(newUser);
  }

  async findUser(
    params: FindUserParams,
    options?: FindUserOptions,
  ): Promise<User> {
    const selections: (keyof User)[] = [
      'email',
      'username',
      'firstName',
      'lastName',
      'id',
    ];
    const selectionsWithPassword: (keyof User)[] = [...selections, 'password'];
    return this.userRepository.findOne(params, {
      select: options?.selectAll ? selectionsWithPassword : selections,
      relations: ['profile', 'presence', 'peer'],
    });
  }

  async saveUser(user: User) {
    return this.userRepository.save(user);
  }

  searchUser(query: string) {
    const statement = '(user.username LIKE :query)';
    return this.userRepository
      .createQueryBuilder('user')
      .where(statement, { query: `%${query}` })
      .limit(10)
      .select([
        'user.username',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.id',
        'user.profile',
      ])
      .getMany();
  }
}
