import { IUser } from '../interfaces/user.interface';
import { CreateUserDto, LoginUserDto } from '../dtos/users.dto';
import userModel from '../models/user.model';
import UserRepository from '../repositories/user.repository';


class UserService {
 
	public users = userModel;
	private readonly userRepo = new UserRepository();

	public async createUser (userData: CreateUserDto): Promise<IUser> {
		const user = await this.userRepo.createUser(userData);
		return user;
	}

	public async signing (userData: LoginUserDto): Promise<any> {
		const token = await this.userRepo.generateToken(userData.email);
		console.log('token', token);
		return token;
	}
}

export default UserService;
