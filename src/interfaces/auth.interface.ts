import { Request } from 'express';
import { IUser } from '../interfaces/user.interface';


export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: IUser;
}