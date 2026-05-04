import { Elysia } from "elysia";
import { bearer } from "@elysiajs/bearer";

const resetToken = Bun.env.RESET_TOKEN ?? "comcomdcuba";

/**
 * @description Middleware de autenticación
 * @param {Elysia} app
 * @returns {Elysia}
 */
// oxlint-disable-next-line typescript/explicit-function-return-type
export function authenticator(app: Elysia) {
  return app.use(bearer()).derive(async ({ bearer: token, status }) => {
    if (!token) {
      return status(400, "Falta el token de autenticación");
    }

    if (token !== resetToken) {
      return status(401, "Token de autenticación inválido");
    }

    return {};
  });
}
