import { Inject, Injectable } from '@nestjs/common';
import { IImageStorageService } from './image-storage';
import { Services } from 'src/utils/constants';
import { S3 } from '@aws-sdk/client-s3';
import {
  UploadGroupMessageAttachmentParams,
  UploadImageParams,
  UploadMessageAttachmentParams,
} from 'src/utils/types';
import { GroupMessageAttachment, MessageAttachment } from 'src/utils/typeorm';
import { compressImage } from 'src/utils/helpers';

@Injectable()
export class ImageStorageService implements IImageStorageService {
  constructor(
    @Inject(Services.SPACES_CLIENT)
    private readonly spacesClient: S3,
  ) {}

  upload(params: UploadImageParams) {
    return this.spacesClient.putObject({
      Bucket: 'chuachat',
      Key: params.key,
      Body: params.file.buffer,
      ACL: 'public-read',
      ContentType: params.file.mimetype,
    });
  }

  async uploadGroupMessageAttachment(
    params: UploadGroupMessageAttachmentParams,
  ): Promise<GroupMessageAttachment> {
    this.spacesClient.putObject({
      Bucket: 'chuachat',
      Key: `original/${params.messageAttachment.key}`,
      Body: params.file.buffer,
      ACL: 'public-read',
      ContentType: params.file.mimetype,
    });
    await this.spacesClient.putObject({
      Bucket: 'chuachat',
      Key: `preview/${params.messageAttachment.key}`,
      Body: await compressImage(params.file),
      ACL: 'public-read',
      ContentType: params.file.mimetype,
    });

    return params.messageAttachment;
  }

  async uploadMessageAttachment(
    params: UploadMessageAttachmentParams,
  ): Promise<MessageAttachment> {
    this.spacesClient.putObject({
      Bucket: 'chuachat',
      Key: `original/${params.messageAttachment.key}`,
      Body: params.file.buffer,
      ACL: 'public-read',
      ContentType: params.file.mimetype,
    });

    await this.spacesClient.putObject({
      Bucket: 'chuachat',
      Key: `preview/${params.messageAttachment.key}`,
      Body: await compressImage(params.file),
      ACL: 'public-read',
      ContentType: params.file.mimetype,
    });
    return params.messageAttachment;
  }
}
