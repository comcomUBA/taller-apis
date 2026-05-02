import { Elysia } from "elysia";
import * as authController from "../controllers/auth.controller";

export const authRoutes = new Elysia()
  .post("/auth/register", authController.register)
  .post("/auth/login", authController.login);
