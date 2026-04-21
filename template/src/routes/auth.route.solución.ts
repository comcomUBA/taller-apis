import { Elysia } from "elysia";
import * as authController from "../controllers/auth.controller";
import { registrarUnUsuarioSchema, iniciarSesionSchema } from "../schemas/auth.schemas";

export const authRoutes = new Elysia()
  .post("/auth/registrar", authController.registrar, registrarUnUsuarioSchema)
  .post("/auth/login", authController.login, iniciarSesionSchema);
