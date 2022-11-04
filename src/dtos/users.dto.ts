import { IsEmail, IsString, isNotEmpty } from 'class-validator';

export class CreateUserDto {
	constructor () {
		this.name = '';
		this.email = '';
		this.password = '';
	}

	public name: string;
  	public email: string;
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

	public name: string;
  	public password: string;
}
  