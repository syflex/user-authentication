export class UserType {
	constructor () {
		this._id = '';
		this.name = '';
		this.email = '';
		this.password = '';
		this.validatePassword = () => {
			return true;
		};
	}

	_id: string;
	name: string;
	email: string;
	password: string;
	validatePassword: () => boolean;
}