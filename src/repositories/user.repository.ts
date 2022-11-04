import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { IUser } from './../interfaces/user.interface';
import User from '../models/user.model';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from '../dtos/users.dto';
import { config } from '../config/config';
import jwt from 'jsonwebtoken';

class UserRepository {

	public user = User;

	private secret!: string;
	private min!: string;

	constructor() {
		this.secret = config.jwt.secret as string;
		this.min = (config.jwt.min) || '265d' as string;
	}

	public async createUser(userData: CreateUserDto): Promise<any> {
		const user = await this.user.create(userData);
		return user!;
	}

	// find user by email
	public async findUserByEmail (email: string): Promise<IUser> {
		const user = await this.user.findOne({ email });
		return user!;
	}

	public async login(userData: LoginUserDto): Promise<IUser> {
		const user = await this.user.findOne({ email: userData.email });
		return user!;
	}

	// verify password
	public async verifyPassword (password: string, current_password: string): Promise<boolean> {
		const passwordValidation = compareSync(password, current_password);
		return passwordValidation;
	}

	public async generateToken (args: string): Promise<any> {
		return jwt.sign({ args }, this.secret, {
			expiresIn: this.min
		});
	}

	// update user
	public async updateUser (userEmail: string, userData: UpdateUserDto): Promise<IUser> {
		const salt = genSaltSync(10);
		const hashedPassword = hashSync(userData.password, salt);
		const user = await this.user.findOneAndUpdate(
			{ email: userEmail }, 
			{
				name: userData.name,
				password: hashedPassword
			}, 
			{ new: true });
		return user!;
	}
}

export default UserRepository;
