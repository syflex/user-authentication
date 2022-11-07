import { Request } from 'express';
import { IUser } from '../interfaces/user.interface';


export interface TokenData {
  token: string;
  expiresIn: string;
}

export interface RequestWithUser extends Request {
  user: IUser;
}