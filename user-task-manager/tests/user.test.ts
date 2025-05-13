import request from 'supertest';
import app from '../src/app';

describe('User API', () => {
  it('should create a user', async () => {
    const res = await request(app).post('/users').send({ name: 'Alice' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('name', 'Alice');
  });

  it('should list all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
