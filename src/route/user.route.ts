import { Router } from 'express';
import UserController from '../controllers/user.controller';
import auth from '../middleware/auth.middleware';

class AuthRoute {
	public path = '/user';
	public router = Router();
	public userController = new UserController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes () {
		this.router.post(`${this.path}/signup`, this.userController.signup);
		this.router.post(`${this.path}/login`, this.userController.login);
		this.router.patch(`${this.path}/update/`, auth, this.userController.updateUser);
	}
  
}

export default AuthRoute;
