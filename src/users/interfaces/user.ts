import { User } from 'src/utils/typeorm';
import {
  CreateUserDetails,
  FindUserOptions,
  FindUserParams,
} from 'src/utils/types';

export interface IUserService {
  createUser(userDetails: CreateUserDetails): Promise<User>;
  findUser(
    findUserParams: FindUserParams,
    options?: FindUserOptions,
  ): Promise<User>;
  saveUser(user: User): Promise<User>;
  searchUser(query: string): Promise<User[]>;
}
