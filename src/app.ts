import { Application } from "https://deno.land/x/oak/mod.ts";

import router from "./routes.ts";

const App = new Application();

App.use(router.routes());

await App.listen("localhost:8000");
