import { describe, expect, it } from "bun:test";
import { app } from "../utils/server";
// https://elysiajs.com/patterns/testing.html
describe("Server Tests ", () => {
  it("return a response from Sanity Check Route", async () => {
    const response = await app
      .handle(new Request("http://localhost:3000/v1/tests/sanity-check"))
      .then((res) => res.text());

    expect(response).toBe("sanity checked!");
  });
});
