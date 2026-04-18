import * as secretService from "../services/secret.service";

/**
 * @description Redirige al recurso secreto
 */
export function obtenerSecreto(contexto: { set: { redirect?: string } }) {
  contexto.set.redirect = secretService.obtenerUrlSecreta();
}
