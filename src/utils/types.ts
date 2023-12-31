import {
  Friend,
  FriendRequest,
  GroupMessageAttachment,
  Message,
  MessageAttachment,
  User,
} from './typeorm';
import { Request } from 'express';

export type FriendRequestStatus = 'accepted' | 'pending' | 'rejected';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Attachment extends Express.Multer.File {}

export type UploadMessageAttachmentParams = {
  file: Attachment;
  messageAttachment: MessageAttachment;
};

export type UploadGroupMessageAttachmentParams = {
  file: Attachment;
  messageAttachment: GroupMessageAttachment;
};

export type UploadImageParams = {
  key: string;
  file: Express.Multer.File;
};

export type CreateUserDetails = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type FindUserParams = Partial<{
  id: number;
  email: string;
  username: string;
}>;

export type FindUserOptions = Partial<{
  selectAll: boolean;
}>;

export type UpdateUserProfileParams = Partial<{
  about: string;
  banner: Express.Multer.File;
  avatar: Express.Multer.File;
}>;

export type UpdateStatusMessageParams = {
  user: User;
  statusMessage: string;
};

export type ValidateUserDetails = {
  username: string;
  password: string;
};

export interface AuthenticationRequest extends Request {
  user: User;
}

export type UserProfileFiles = Partial<{
  banner: Express.Multer.File[];
  avatar: Express.Multer.File[];
}>;

export type DeleteFriendRequestParams = {
  id: number;
  userId: number;
};

export type RemoveFriendEventPayload = {
  friend: Friend;
  userId: number;
};

export type FriendRequestParams = {
  id: number;
  userId: number;
};

export type AcceptFriendRequestResponse = {
  friend: Friend;
  friendRequest: FriendRequest;
};

export type CancelFriendRequestParams = {
  id: number;
  userId: number;
};

export type CreateFriendParams = {
  user: User;
  username: string;
};

export type CreateConversationParams = {
  username: string;
  message: string;
};

export type AccessParams = {
  id: number;
  userId: number;
};

export type GetConversationMessagesParams = {
  id: number;
  limit: number;
};

export type UpdateConversationParams = Partial<{
  id: number;
  lastMessageSent: Message;
}>;

export interface AuthenticatedRequest extends Request {
  user: User;
}
