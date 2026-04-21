import { Elysia } from "elysia";
import { bearer } from '@elysiajs/bearer'
import { obtenerPayloadDelToken, type TokenDeAcceso } from "../utils/auth";

/**
 * @description Middleware de autenticación
 */
export function authenticator(app: Elysia) {
  return app
    .use(bearer())
    .derive(async ({ bearer, status }) => {
      if (!bearer) {
        return status(400, 'Unauthorized')
      }

      const payload = await obtenerPayloadDelToken(bearer as TokenDeAcceso);
      if (!payload.sub) {
        return status(400, 'Unauthorized')
      }

      return { uuid: payload.sub };
    })
}

/**
 * @description Contexto derivado del middleware de autenticación
 */
export interface ContextoAutenticado {
  uuid: string;
}
