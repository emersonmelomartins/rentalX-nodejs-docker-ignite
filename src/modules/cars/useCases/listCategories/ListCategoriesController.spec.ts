import request from 'supertest';
import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';
import { Connection } from 'typeorm';
import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';

describe('List Categories Controller', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash('1234', 8);

    connection.query(
      `INSERT INTO USERS(
          id, name, email, password, is_admin, driver_license, created_at
        ) VALUES(
          '${id}',
          'Emerson Melo',
          'emerson25xd@gmail.com',
          '${password}',
          true,
          '123abc',
          'now()'
        )`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to list all categories', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'emerson25xd@gmail.com',
      password: '1234',
    });

    const { token } = responseToken.body;

    const createCategoryResponse = await request(app)
      .post('/categories')
      .send({
        name: 'Category Supertest Name',
        description: 'Category Supertest Desc',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app).get('/categories');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
});
