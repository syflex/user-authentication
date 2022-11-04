import request from 'supertest';
import app from '../app';
import { config } from '../config/config';
import MongoConnection from '../utile/database';

const mongoConnection = new MongoConnection(config.mongo.url);


describe('Test user signup flow', () => {
	/* Connecting to the database before each test. */
	beforeEach(async () => {
		await mongoConnection.connect(
			() => {
				console.log('Connected to database');
			}
		);
	});

	/* Closing database connection after each test. */
	afterEach(async () => {
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

		it.only('should return 201', async () => {
			const response = await request(app).post('/api/user/signup').send(data);
			expect(response.status).toBe(201);
		});
		it('should return 400', async () => {
			const response = await request(app).post('/api/user/signup').send(data);
			expect(response.status).toBe(400);
		});
		it('should return 401', async () => {
			const response = await request(app).post('/api/user/signup').send({});
			expect(response.status).toBe(401);
		});
		it('should return 500', async () => {
			const response = await request(app).post('/api/user/signup').send({});
			expect(response.status).toBe(500);
		});
	});

	describe('POST /user/login', () => {
		const data = {
			email: 'user1@gmail.com',
			password: 'password',
		};
		it('should return 200', async () => {
			const response = await request(app).post('/user/login').send(data);
			expect(response.status).toBe(200);
		});
		it('should return 401', async () => {
			const response = await request(app).post('/user/login').send({});
			expect(response.status).toBe(401);
		});
		it('should return 500', async () => {
			const response = await request(app).post('/user/login').send({});
			expect(response.status).toBe(500);
		});
	});

	describe('PATCH /user/update', () => {
		let token = '';
		const loginData = {
			email: 'user1@gmail.com',
			password: 'password',
		};
		const updateData = {
			name: 'user1',
			password: 'password1',
		};
		it('should return 200', async () => {
			const response = await request(app).post('/user/login').send(loginData);
			token = response.body.token;
			expect(response.status).toBe(200);
		});
		it('should return 200', async () => {
			const response = await request(app).patch('/user/update').send(updateData).set('Authorization', token);
			expect(response.status).toBe(200);
		});
		it('should return 401', async () => {
			const response = await request(app).patch('/user/update').send(updateData);
			expect(response.status).toBe(401);
		});
		it('should return 500', async () => {
			const response = await request(app).patch('/user/update').send({}).set('Authorization', token);
			expect(response.status).toBe(500);
		});
	});
});