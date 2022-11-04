import { IUser } from './../interfaces/user.interface';
import userModel from '../models/user.model';
import { CreateUserDto } from '../dtos/users.dto';

class UserRepository {

	public users = userModel;

	public async createUser(userData: CreateUserDto): Promise<any> {
		const user = await this.users.create(userData);
		return user;
	}
}

export default UserRepository;
