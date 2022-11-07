import { UpdateUserDto } from './../dtos/users.dto';
import { Request, Response, NextFunction } from 'express';
import { CreateUserDto, LoginUserDto } from '../dtos/users.dto';
import { IUser } from '../interfaces/user.interface';
import { TokenData } from '../interfaces/auth.interface';
import UserService from '../services/user.service';
import { errorResponse, successResponse } from '../utile/ResponseBuilder';


class UserController {
	public userService = new UserService();

	public signup = async (req: Request, res: Response, next: NextFunction) => {
		const userData: CreateUserDto = req.body;
		try {
			const signupData: IUser = await this.userService.createUser(userData);
			res.send(successResponse(signupData, 'User created successfully'));
		} catch (error: any) {
			res.status(error.status).send(errorResponse(error));
			next(error);
		}
	};

	public login = async (req: Request, res: Response, next: NextFunction) => {
		const userData: LoginUserDto = req.body;
		try {
			const tokenData: TokenData = await this.userService.login(userData);
			res.send(successResponse(tokenData, 'User logged in successfully'));
		} catch (error: any) {
			res.status(error.status).send(errorResponse(error));
			next(error);
		}
	};

	// update user
	public updateUser = async (req: Request, res: Response, next: NextFunction) => {
		const userEmail: string = req.params.email;
		const userData: UpdateUserDto = req.body;
		try {
			const updateUserData: IUser = await this.userService.updateUser(userEmail, userData);
			res.send(successResponse(updateUserData, 'User updated successfully'));
		} catch (error: any) {
			res.status(error.status).send(errorResponse(error));
			next(error);
		}
	};

}

export default UserController;