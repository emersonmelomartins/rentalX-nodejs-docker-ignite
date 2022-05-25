import { v4 as uuid } from 'uuid';
import { hash } from 'bcryptjs';

import createConnection from '../index';

async function create() {
  const connection = await createConnection('localhost');

  const id = uuid();
  const password = await hash('1234', 8);

  connection
    .query(
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
    )
    .finally(() => {
      connection.close();
    });
}

create().then(() => console.log('Admin user created...'));
