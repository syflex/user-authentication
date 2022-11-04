import mongoose from 'mongoose';
import { UserType } from '../types/user';
import { hashSync, genSaltSync } from 'bcrypt';

const userSchema = new mongoose.Schema<UserType>(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true
		},
		password: {
			type: String,
			required: true
		},
	},
	{
		timestamps: true,
	},
);

userSchema.pre('save', function (next) {
	if (this.password !== undefined) {
		const salt = genSaltSync(10);
		this.password = hashSync(this.password, salt);
	}
	next();
});

const User = mongoose.model('User', userSchema);

export default User;
