import request from 'supertest';
import app from '../app';
import { config } from '../config/config';
import MongoConnection from '../utile/database';

const mongoConnection = new MongoConnection(config.mongo.url);


describe('Test user signup flow', () => {
	beforeAll(async () => {
		await mongoConnection.connect(
			() => {
				console.log('Connected to database');
			}
		);
	});

	afterAll(async () => {
		await mongoConnection.close(
			() => {
				console.log('Closed database connection');
			}
		);
	});
  
	describe('POST /user/signup', () => {
		const data = {
			email: 'user1@gmail.com',
			password: 'password',
			name: 'user',
		};
		// Test to signup a new user.
		it('should return 200', async () => {
			const response = await request(app).post('/api/user/signup').send(data);
			expect(response.status).toBe(200);
		});
		// Test to signup a new user with existing email.
		it('should return 409', async () => {
			const response = await request(app).post('/api/user/signup').send(data);
			expect(response.status).toBe(409);
		});
		// Test to signup a new user with invalid data.
		it('should return 400', async () => {
			const response = await request(app).post('/api/user/signup').send({});
			expect(response.status).toBe(400);
		});
	});

	describe('POST /user/login', () => {
		const data = {
			email: 'user1@gmail.com',
			password: 'password',
		};
		// Test to login with existing user.
		it('should return 200', async () => {
			const response = await request(app).post('/api/user/login').send(data);
			expect(response.status).toBe(200);
		});
		// Test to login with non-existing data.
		it('should return 400', async () => {
			const response = await request(app).post('/api/user/login').send({});
			expect(response.status).toBe(400);
		});
		// Test to login with non-existing user.
		it('should return 404', async () => {
			const response = await request(app).post('/api/user/login').send({
				email: 'nonUser@gmail.com',
				password: 'password',
			});
			expect(response.status).toBe(404);
		});
		// Test to login with wrong password.
		it('should return 401', async () => {
			const response = await request(app).post('/api/user/login').send({
				email: 'user1@gmail.com',
				password: 'wrongPassword',
			});
			expect(response.status).toBe(401);
		});
	});

	describe('PATCH /user/update', () => {
		let token = '';
		const wrongToken = 'wrongToken';
		const loginData = {
			email: 'user1@gmail.com',
			password: 'password',
		};
		const updateData = {
			name: 'user1',
			password: 'password',
		};
		it('should return 200', async () => {
			const response = await request(app).post('/api/user/login').send(loginData);
			token = response.body.data;
			expect(response.status).toBe(200);
		});
		it('should return 200', async () => {
			const response = await request(app).patch('/api/user/update').send(updateData).set('Authorization', `Bearer ${token}`);
			expect(response.status).toBe(200);
		});
		it('should return 401', async () => {
			const response = await request(app).patch('/api/user/update').send({}).set('Authorization', `Bearer ${wrongToken}`);
			expect(response.status).toBe(401);
		});
		it('should return 400', async () => {
			const response = await request(app).patch('/api/user/update').send({}).set('Authorization', `Bearer ${token}`);
			expect(response.status).toBe(400);
		});
	});
});