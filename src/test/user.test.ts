// import request from 'supertest';
// import app from '../app';



// describe('Test user signup flow', () => {
// 	describe('POST /user/signup', () => {
// 		const data = {
// 			email: 'user1@gmail.com',
// 			password: 'password',
// 			name: 'user',
// 		};

// 		it('should return 201', async () => {
// 			const response = await request(app).post('/user/signup').send(data);
// 			expect(response.status).toBe(201);
// 		});
// 		it('should return 400', async () => {
// 			const response = await request(app).post('/user/signup').send(data);
// 			expect(response.status).toBe(400);
// 		});
// 		it('should return 401', async () => {
// 			const response = await request(app).post('/user/signup').send({});
// 			expect(response.status).toBe(401);
// 		});
// 		it('should return 500', async () => {
// 			const response = await request(app).post('/user/signup').send({});
// 			expect(response.status).toBe(500);
// 		});
// 	});

// 	describe('POST /user/login', () => {
// 		const data = {
// 			email: 'user1@gmail.com',
// 			password: 'password',
// 		};
// 		it('should return 200', async () => {
// 			const response = await request(app).post('/user/login').send(data);
// 			expect(response.status).toBe(200);
// 		});
// 		it('should return 401', async () => {
// 			const response = await request(app).post('/user/login').send({});
// 			expect(response.status).toBe(401);
// 		});
// 		it('should return 500', async () => {
// 			const response = await request(app).post('/user/login').send({});
// 			expect(response.status).toBe(500);
// 		});
// 	});

// 	describe('PATCH /user/update', () => {
// 		let token = '';
// 		const loginData = {
// 			email: 'user1@gmail.com',
// 			password: 'password',
// 		};
// 		const updateData = {
// 			name: 'user1',
// 			password: 'password1',
// 		};
// 		it('should return 200', async () => {
// 			const response = await request(app).post('/user/login').send(loginData);
// 			token = response.body.token;
// 			expect(response.status).toBe(200);
// 		});
// 		it('should return 200', async () => {
// 			const response = await request(app).patch('/user/update').send(updateData).set('Authorization', token);
// 			expect(response.status).toBe(200);
// 		});
// 		it('should return 401', async () => {
// 			const response = await request(app).patch('/user/update').send(updateData);
// 			expect(response.status).toBe(401);
// 		});
// 		it('should return 500', async () => {
// 			const response = await request(app).patch('/user/update').send({}).set('Authorization', token);
// 			expect(response.status).toBe(500);
// 		});
// 	});
// });