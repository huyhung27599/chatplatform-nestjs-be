import * as sharp from 'sharp';
import * as bcrypt from 'bcrypt';
import { Attachment, AuthenticatedRequest } from './types';
import { v4 as uuidv4 } from 'uuid';
import { NextFunction, Response } from 'express';
import { HttpException, HttpStatus } from '@nestjs/common';

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

export function isAuthorized(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  if (req.user) next();
  else throw new HttpException('Forbidden', HttpStatus.UNAUTHORIZED);
}
