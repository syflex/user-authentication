import { IUser } from '../interfaces/user.interface';
import { TokenData } from '../interfaces/auth.interface';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from '../dtos/users.dto';
import userModel from '../models/user.model';
import UserRepository from '../repositories/user.repository';
import HttpException from '../utile/HttpException';


class UserService {
 
	public users = userModel;
	private readonly userRepo = new UserRepository();

	public async createUser (userData: CreateUserDto): Promise<IUser> {
		if (!userData.email || !userData.password || !userData.name) {
			throw new HttpException(400, 'Invalid User Data');
		}
		const user = await this.userRepo.findUserByEmail(userData.email);
		if (user) {
			throw new HttpException(409 ,'User Already Exist');
		}
		const createUser = await this.userRepo.createUser(userData);
		if (!createUser) {
			throw new HttpException(500 ,'User not created');
		}
		
		return createUser;
	}

	public async login (userData: LoginUserDto): Promise<TokenData> {
		if (!userData.email || !userData.password) {
			throw new HttpException(400, 'Invalid User Data');
		}
		
		const user = await this.userRepo.findUserByEmail(userData.email);
		if (!user) {
			throw new HttpException(404 ,'User not found');
		}

		const passwordValidation = await this.userRepo.verifyPassword(userData.password, user.password);
		if (!passwordValidation) {
			throw new HttpException(401 ,'Invalid Password');
		}

		const token: TokenData = await this.userRepo.generateToken(userData.email);
		if(!token) {
			throw new HttpException(500 ,'User not found');
		}
		return token;
	}

	public async updateUser (userEmail: string, userData: UpdateUserDto): Promise<IUser> {
		if (!userData.name || !userData.password) {
			throw new HttpException(400, 'Invalid User Data');
		}

		const user = await this.userRepo.findUserByEmail(userEmail);
		if (!user) {
			throw new HttpException(404 ,'User not found');
		}

		const updateUser = await this.userRepo.updateUser(userEmail, userData);
		if (!updateUser) {
			throw new HttpException(500 ,'User not updated');
		}
			
		return updateUser;
	}
}

export default UserService;
