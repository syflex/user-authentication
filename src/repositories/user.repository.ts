import { TokenData } from './../interfaces/auth.interface';
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

	public async createUser(userData: CreateUserDto): Promise<IUser> {
		const user = await this.users.create(userData);
		return user;
	}

	// find user by email
	public async findUserByEmail (email: string): Promise<IUser> {
		const user = await this.users.findOne({ email });
		if (!user) {
			throw new Error('User not found');
		}
		return user;
	}

	public async login(userData: LoginUserDto): Promise<IUser> {
		const user = await this.users.findOne({ email: userData.email });
		if (!user) {
			throw new Error('User not found');
		}
		return user;
	}

	public async generateToken (args: string): Promise<any> {
		return jwt.sign({ args }, this.secret, {
		  	expiresIn: this.min
		});
	}

	// update user
	public async updateUser (userData: CreateUserDto): Promise<IUser> {
		const user = await this.users.findOne({ email: userData.email });
		if (!user) {
			throw new Error('User not found');
		}
		user.name = userData.name;
		user.email = userData.email;
		user.password = userData.password;
		await user.save();
		return user;
	}
}

export default UserRepository;
