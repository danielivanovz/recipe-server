import request from 'supertest';
import createServer from '../server';

const app = createServer();

/* PASS */
// describe('Server check connection', () => {
// 	it("Server instantiated and returns status '200' status", (done) => {
// 		request(app).get('/').expect(200, done);
// 	});
// });

/* DOES NOT */
// describe('route', () => {
// 	it('cccc', async (done) => {
// 		await request(app).get('/ingredients').expect(200, done);
// 	});
// });
