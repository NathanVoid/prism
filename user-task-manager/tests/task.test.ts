import request from 'supertest';
import app from '../src/app';

describe('Task API', () => {
  let userId: number;

  beforeAll(async () => {
    const res = await request(app).post('/users').send({ name: 'Bob' });
    userId = res.body.id;
  });

  it('should create a task for a user', async () => {
    const res = await request(app)
      .post(`/users/${userId}/tasks`)
      .send({ title: 'Test Task', completed: false });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('title', 'Test Task');
  });

  it('should get tasks for a user', async () => {
    const res = await request(app).get(`/users/${userId}/tasks`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
