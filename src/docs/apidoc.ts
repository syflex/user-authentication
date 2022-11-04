import { createUser, createUserBody, updateUser, updateUserBody, loginUser, loginUserBody } from './users';

const apiDocumentation = {
	openapi: '3.0.1',
	info: {
		version: '1.0.0',
		title: 'User Authentication - Documentation',
		description: 'Description of my API here',
		termsOfService: '#',
		contact: {
			name: 'Simon Team',
			email: 'syflex360@gmail.com',
			url: 'https://simononazi.com',
		},
		license: {
			name: 'Apache 2.0',
			url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
		},
	},
	servers: [
		{
			url: 'http://localhost:8000/',
			description: 'Local Server',
		},
		{
			url: 'https://api.localhost.com',
			description: 'Dev Server',
		},
		{
			url: 'https://live.localhost.com',
			description: 'Production Server',
		}
	],
	tags: [
		{
			name: 'Authentication',
		},
		{
			name: 'User',
		}
	],
	paths: {
		users: {
			post: createUser,
		},
		'users/update': {
			patch: updateUser,
		},
		'users/login': {
			post: loginUser,
		}
	},
	components: {
		securitySchemes: {
			bearerAuth: {
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
			},
		},
		schemas: {
			createUserBody, updateUserBody, loginUserBody
		},
	},
};
  
export { apiDocumentation };
