import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
	constructor () {
		this.name = '';
		this.email = '';
		this.password = '';
	}
	@IsString()
	public name: string;
	@IsEmail()
	public email: string;
	@IsString()
	public password: string;
}


export class LoginUserDto {
	constructor () {
		this.email = '';
		this.password = '';
	}
	@IsEmail()
	public email: string;
	@IsString()
	public password: string;
}

export class UpdateUserDto {
	constructor () {
		this.name = '';
		this.password = '';
	}
	@IsString()
	public name: string;
	@IsString()
	public password: string;
}
  