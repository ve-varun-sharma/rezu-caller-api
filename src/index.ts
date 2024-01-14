import { app, App } from "./utils/server";
const PORT = process.env.PORT || 3000;

app.listen(PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
