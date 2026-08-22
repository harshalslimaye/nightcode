import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import sessions from "./routes/sessions";
import chat from "./routes/chat";

const app = new Hono();

app.onError((err, c) => {
    if (err instanceof HTTPException) {
        return c.json({ message: err.message || "Request failed" }, err.status);
    }

    return c.json({ message: "Internal Server Error" }, 500);
});

const routes = app
    .route("/sessions", sessions)
    .route("/chat", chat)

export type AppType = typeof routes;

export default { port: 3000, fetch: app.fetch, idleTimeout: 255 };