import { GroupMessageAttachment, MessageAttachment, User } from './typeorm';
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
