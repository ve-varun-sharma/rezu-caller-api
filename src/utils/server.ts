import { Elysia } from "elysia";
import { rezuDemoInbound } from "../controllers/rezuDemo.controller";
import { swagger } from "@elysiajs/swagger";
// Automatically generates api documentation in 1 line of code
// https://elysiajs.com/plugins/swagger.html

export type App = typeof app;

export const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: "Rezu Caller API",
          version: "1.0.0",
        },
      },
    })
  )
  .group("/v1", (app) =>
    // Can use as many nested groups as desired
    app
      .get("/", () => "Using v1")
      .group("/tests", (app) =>
        app
          .get("/hello", () => "Hello Bun.js!")
          .get("/sanity-check", () => "sanity checked!")
          .post("/parrot", ({ body }: { body: any }) => {
            const mimicry = body;
            return { success: true, mimicry };
          })
      )
      .group("/demo", (app) =>
        app.post("/rezu-landing-page-inbound", async ({ body }) =>
          rezuDemoInbound(body)
        )
      )
  );
