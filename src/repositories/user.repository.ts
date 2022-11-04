import { IUser } from './../interfaces/user.interface';
import userModel from '../models/user.model';
import { CreateUserDto, LoginUserDto } from '../dtos/users.dto';
import { config } from '../config/config';
import jwt from 'jsonwebtoken';


class UserRepository {

	public users = userModel;

	private secret!: string;
	private min!: string;

	constructor() {
		this.secret = config.jwt.secret as string;
		this.min = (config.jwt.min) || '265d' as string;
	}

	public async createUser(userData: CreateUserDto): Promise<any> {
		const user = await this.users.create(userData);
		return user;
	}

	public async signin(userData: LoginUserDto): Promise<any> {
		const user = await this.users.findOne({ email: userData.email });
		return user;
	}

	public async generateToken (args: string): Promise<any> {
		return jwt.sign({ args }, this.secret, {
		  	expiresIn: this.min
		});
	}
}

export default UserRepository;
