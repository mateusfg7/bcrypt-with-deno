import { Router } from 'https://deno.land/x/oak/mod.ts';

import UserController from './controllers/UserController.ts';

import database from './database/connection.ts';
import User from './models/User.ts';

database.link([User]);
database.sync();

const router = new Router();

router.get('/', (context) => {
  context.response.body = { message: 'Hello Word!' };
});

router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);

export default router;
