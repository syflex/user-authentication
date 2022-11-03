import request from 'supertest';
import app from '../app';

describe('base test', () => {
	it('should return 200', async () => {
		const response = await request(app).get('/api/ping');
		expect(response.status).toBe(200);
	});

	it('should return pong', async () => {
		const response = await request(app).get('/api/ping');
		expect(response.text).toBe('pong');
	});
});