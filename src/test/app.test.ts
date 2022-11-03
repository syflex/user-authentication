import request from 'supertest';
import app from '../app';

describe('/', () => {
	it('should return 200', async () => {
		const response = await request(app).get('/');
		expect(response.status).toBe(200);
	});

	it('should return Hello world', async () => {
		const response = await request(app).get('/');
		expect(response.text).toBe('Hello world');
	});
});