import { Elysia } from "elysia";
import { obtenerPayloadDelToken, type TokenDeAcceso } from "../utils/auth";

/**
 * @description Middleware de autenticación
 */
export function authenticator(app: Elysia) {
  return app
    .derive(async ({ request, set }) => {
      const authorization = request.headers.get("Authorization");
      const tokenDeAcceso = authorization?.startsWith("Bearer ") ? authorization.slice(7) : null;
      if (!tokenDeAcceso) {
        set.status = 401;
        throw new Error("Unauthorized");
      }

      const payload = await obtenerPayloadDelToken(tokenDeAcceso as TokenDeAcceso);
      if (!payload.sub) {
        set.status = 401;
        throw new Error("Unauthorized");
      }

      return { uuid: payload.sub };
    })
}
