import { Elysia } from "elysia";
import { bearer } from '@elysiajs/bearer'
import { obtenerPayloadDelToken, type TokenDeAcceso } from "../utils/auth";

/**
 * @description Middleware de autenticación
 * @param {Elysia} app
 * @returns {Elysia}
 */
export function authenticator(app: Elysia) {
  return app
    .use(bearer())
    .derive(async ({ bearer, status }) => {
      if (!bearer) {
        return status(400, 'Falta el token de autenticación')
      }

      try {
        const payload = await obtenerPayloadDelToken(bearer as TokenDeAcceso);
        if (!payload.sub) return status(400, 'Al token le falta el campo "sub"')
        return { uuid: payload.sub };
      } catch {
        return status(400, 'Token de autenticación inválido')
      }
    })
}

/**
 * @description Contexto derivado del middleware de autenticación
 */
export interface ContextoAutenticado {
  uuid: string;
}
