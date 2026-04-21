import * as secretService from "../services/secret.service";
import type { Context } from "elysia";
import type { ObtenerSecretoRouteContract } from "../schemas/secret.schemas";

/**
 * @description Redirige al recurso secreto
 */
export function obtenerSecreto(contexto: Context<ObtenerSecretoRouteContract>): void {
  contexto.set.redirect = secretService.obtenerUrlSecreta();
}
