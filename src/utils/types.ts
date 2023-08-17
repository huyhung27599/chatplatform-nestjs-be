import { GroupMessageAttachment, MessageAttachment } from './typeorm';

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
