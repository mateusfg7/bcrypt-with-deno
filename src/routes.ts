import { Router } from 'https://deno.land/x/oak/mod.ts';

import database from './database/connection.ts';

import User from './models/User.ts';

database.link([User]);
database.sync();

const router = new Router();

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

router.get('/', (context) => {
  context.response.body = { message: 'Hello Word!' };
});

router.post('/signup', async (context) => {
  const requestBody = context.request.body();

  if (requestBody.type != 'json') {
    context.response.status = 400;
    context.response.body = { error: 'Request body needs to be a JSON' };
    return;
  }

  const { name, email, password }: CreateUserRequest = await requestBody.value;

  try {
    const listOfAccountsWithEmail = await User.where('email', email).all();

    if (listOfAccountsWithEmail.length != 0) {
      context.response.status = 400;
      context.response.body = {
        error: 'This email has already been registered',
      };
      return;
    }
  } catch (err) {
    console.log(err);
    context.response.status = 500;
  }

  try {
    await User.create([
      {
        name,
        email,
        password_hash: password,
      },
    ]);

    context.response.status = 201;
  } catch (err) {
    console.log(err);
    context.response.status = 500;
  }
});

export default router;
