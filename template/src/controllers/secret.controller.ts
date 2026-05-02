import * as secretService from "../services/secret.service";
import type { Context } from "elysia";
import type { ObtenerSecretoRouteContract } from "../schemas/secret.schemas";

/**
 * @description Devuelve el mensaje secreto
 * @param {Context<ObtenerSecretoRouteContract>} _contexto
 * @returns {string} Mensaje secreto
 */
export function obtenerSecreto(_contexto: Context<ObtenerSecretoRouteContract>): string {
  return secretService.obtenerMensajeSecreto();
}
