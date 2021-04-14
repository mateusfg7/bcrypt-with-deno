import type { RouterContext } from 'https://deno.land/x/oak/mod.ts';

import User from '../models/User.ts';

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface LoginUserRequest {
  email: string;
  password: string;
}

export default {
  async signup(context: RouterContext) {
    const requestBody = context.request.body();

    if (requestBody.type != 'json') {
      context.response.status = 400;
      context.response.body = { error: 'Request body needs to be a JSON' };
      return;
    }

    const {
      name,
      email,
      password,
    }: CreateUserRequest = await requestBody.value;

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
  },

  async signin(context: RouterContext) {
    const requestBody = context.request.body();

    if (requestBody.type != 'json') {
      context.response.status = 400;
      context.response.body = { error: 'Request body needs to be a JSON' };
      return;
    }

    const { email, password }: LoginUserRequest = await requestBody.value;

    try {
      const listOfAccountsWithEmail = await User.where('email', email).all();

      if (listOfAccountsWithEmail.length == 0) {
        context.response.status = 403;
        context.response.body = {
          error: 'This account has not been registered',
        };
        return;
      }
    } catch (err) {
      console.log(err);
      context.response.status = 500;
    }

    const account = await User.where('email', email).first();

    if (account.password_hash == password) {
      context.response.status = 200;
      context.response.body = {
        id: account.id,
        name: account.name,
        email: account.email,
      };
    } else {
      context.response.status = 401;
      context.response.body = { error: 'Password Incorrect' };
    }
  },
};
