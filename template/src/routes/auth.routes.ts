import { Elysia } from "elysia";
import * as authController from "../controllers/auth.controller";

export const authRoutes = new Elysia()
  .post("/auth/registrar", authController.registrar)
  .post("/auth/login", authController.login);
