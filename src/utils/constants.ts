import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export enum Services {
  SPACES_CLIENT = 'SPACES_CLIENT',
  IMAGE_UPLOAD_SERVICE = 'IMAGE_UPLOAD_SERVICE',
  USERS = 'USERS_SERVICE',
  USERS_PROFILES = 'USERS_PROFILES_SERVICE',
  USER_PRESENCE = 'USER_PRESENCE_SERVICE',
  AUTH = 'AUTH_SERVICE',
  FRIENDS_SERVICE = 'FRIENDS_SERVICE',
  GATEWAY_SESSION_MANAGER = 'GATEWAY_SESSION_MANAGER',
  FRIENDS_REQUESTS_SERVICE = 'FRIEND_REQUEST_SERVICE',
}

export enum Routes {
  USERS = 'users',
  USERS_PROFILES = 'users/profiles',
  USER_PRESENCE = 'users/presence',
  AUTH = 'auth',
  FRIENDS = 'friends',
  FRIEND_REQUESTS = 'friends/requests',
}

export enum ServerEvents {
  FRIEND_REMOVED = 'friend.removed',
  FRIEND_REQUEST_ACCEPTED = 'friendrequest.accepted',
  FRIEND_REQUEST_REJECTED = 'friendrequest.rejected',
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

export enum WebsocketEvents {
  FRIEND_REQUEST_ACCEPTED = 'onFriendRequestAccepted',
  FRIEND_REQUEST_REJECTED = 'onFriendRequestRejected',
}
