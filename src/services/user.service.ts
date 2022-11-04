import { IUser } from '../interfaces/user.interface';
import { TokenData } from '../interfaces/auth.interface';
import { CreateUserDto, LoginUserDto } from '../dtos/users.dto';
import userModel from '../models/user.model';
import UserRepository from '../repositories/user.repository';
import HttpException from '../utile/HttpException';


class UserService {
 
	public users = userModel;
	private readonly userRepo = new UserRepository();

	public async createUser (userData: CreateUserDto): Promise<IUser> {
		const user = await this.userRepo.findUserByEmail(userData.email);
		if (!user) {
			throw new HttpException(400 ,'User not Already Exist');
		}

		const createUser = await this.userRepo.createUser(userData);
		if (!createUser) {
			throw new HttpException(400 ,'User not created');
		}
			
		return createUser;
	}

	public async login (userData: LoginUserDto): Promise<TokenData> {
		const user = await this.userRepo.findUserByEmail(userData.email);
		if (!user) {
			throw new HttpException(400 ,'User not Already Exist');
		}
		
		const token: TokenData = await this.userRepo.generateToken(userData.email);
		if(!token) {
			throw new HttpException(400 ,'User not found');
		}
		return token;
	}
}

export default UserService;
