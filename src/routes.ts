import { Router } from "https://deno.land/x/oak/mod.ts";

import database from "./database/connection.ts";

import User from "./models/User.ts";

database.link([User]);
database.sync();

const router = new Router();

router.get("/", (context) => {
  context.response.body = { message: "Hello Word!" };
});

export default router;
