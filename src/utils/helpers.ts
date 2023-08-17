import * as sharp from 'sharp';
import { Attachment } from './types';

export const compressImage = (attachment: Attachment) =>
  sharp(attachment.buffer).resize(300).jpeg().toBuffer();
