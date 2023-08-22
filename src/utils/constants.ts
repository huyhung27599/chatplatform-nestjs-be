import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export enum Services {
  SPACES_CLIENT = 'SPACES_CLIENT',
  IMAGE_UPLOAD_SERVICE = 'IMAGE_UPLOAD_SERVICE',
  USERS = 'USERS_SERVICE',
  USERS_PROFILES = 'USERS_PROFILES_SERVICE',
  USER_PRESENCE = 'USER_PRESENCE_SERVICE',
  AUTH = 'AUTH_SERVICE',
}

export enum Routes {
  USERS = 'users',
  USERS_PROFILES = 'users/profiles',
  USER_PRESENCE = 'users/presence',
  AUTH = 'auth',
}

export const UserProfileFileFields: MulterField[] = [
  {
    name: 'banner',
    maxCount: 1,
  },
  {
    name: 'avatar',
    maxCount: 1,
  },
];
