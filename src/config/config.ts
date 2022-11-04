import dotenv from 'dotenv';

dotenv.config();
const MONGO_URL = process.env.MONGO_URI_REMOTE || '';
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000;

export const config = {
	mongo: {
		url: MONGO_URL
	},
	server: {
		port: SERVER_PORT
	},
	jwt: {
		secret: process.env.ACCESS_TOKEN_PRIVATE_KEY,
		min: process.env.ACCESS_EXPIRES
	}
};