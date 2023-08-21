import * as sharp from 'sharp';
import * as bcrypt from 'bcrypt';
import { Attachment } from './types';
import { v4 as uuidv4 } from 'uuid';

export const compressImage = (attachment: Attachment) =>
  sharp(attachment.buffer).resize(300).jpeg().toBuffer();

export async function hashPassword(rawPassword) {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(rawPassword, salt);
}

export const generateUUIDV4 = () => uuidv4();

export async function compareHash(rawPassword: string, hashedPassword: string) {
  return bcrypt.compare(rawPassword, hashedPassword);
}
