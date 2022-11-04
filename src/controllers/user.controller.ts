import { Request, Response, NextFunction } from 'express';
import { CreateUserDto, LoginUserDto } from '../dtos/users.dto';
import { IUser } from '../interfaces/user.interface';
import { TokenData } from '../interfaces/auth.interface';
import UserService from '../services/user.service';

class UserController {
	public userService = new UserService();

	public signup = async (req: Request, res: Response, next: NextFunction) => {
		const userData: CreateUserDto = req.body;
		try {
			const signupData: IUser = await this.userService.createUser(userData);
			res.status(201).send(signupData);
		} catch (error: any) {
			res.status(500).send((error));
			next(error);
		}
	};

	public login = async (req: Request, res: Response, next: NextFunction) => {
		const userData: LoginUserDto = req.body;
		try {
		  	const token: TokenData = await this.userService.login(userData);
		  	res.status(200).send(token);
		} catch (error: any) {
			res.status(error.status).send((error));
			next(error);
		}
	};

	// update user
	public updateUser = async (req: Request, res: Response, next: NextFunction) => {
		const userEmail: string = req.params.args;
		const userData: CreateUserDto = req.body;
		try {
			const updateUserData: IUser = await this.userService.updateUser(userEmail, userData);
			res.status(200).send(updateUserData);
		} catch (error: any) {
			res.status(error.status).send((error));
			next(error);
		}
	};

}

export default UserController;