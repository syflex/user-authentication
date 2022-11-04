import { IUser } from '../interfaces/user.interface';
import { CreateUserDto } from '../dtos/users.dto';
import userModel from '../models/user.model';
import UserRepository from '../repositories/user.repository';


class UserService {
 
	public users = userModel;
	private readonly userRepo = new UserRepository();

	public async createUser (userData: CreateUserDto): Promise<IUser> {
		const user = await this.userRepo.createUser(userData);
		return user;
	}
}

export default UserService;
