import { cors as elysiaCors } from "@elysiajs/cors";

export const cors = elysiaCors({
  origin: Bun.env.FRONTEND_URL!,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposeHeaders: [],
});
