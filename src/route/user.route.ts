import { Router } from 'express';
import UserController from '../controllers/user.controller';


class AuthRoute {
	public path = '/user';
	public router = Router();
	public userController = new UserController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes () {
		this.router.post(`${this.path}/signup`, this.userController.signup);
	}
  
}

export default AuthRoute;
