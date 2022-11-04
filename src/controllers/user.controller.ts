import { Request, Response, NextFunction } from 'express';
import { CreateUserDto, LoginUserDto } from '../dtos/users.dto';
import { IUser } from '../interfaces/user.interface';
import UserService from '../services/user.service';

class UserController {
	public userService = new UserService();

	public signup = async (req: Request, res: Response, next: NextFunction) => {
		const userData: CreateUserDto = req.body;
		try {
			const signupData: IUser = await this.userService.createUser(
				userData
			);
			res.status(201).send(signupData);
		} catch (error: any) {
			res.status(500).send((error));
			next(error);
		}
	};

	public signing = async (req: Request, res: Response, next: NextFunction) => {
		const userData: LoginUserDto = req.body;
		try {
		  	const signingData: IUser = await this.userService.signing(
				userData
			);
		  	res.status(200).send(signingData);
		} catch (error: any) {
			res.status(error.status).send((error));
			next(error);
		}
	};

}

export default UserController;