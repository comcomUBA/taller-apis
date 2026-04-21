import * as usersService from "../services/users.service";
import type { UsuarioSinClaveHasheada } from "../databases/users.store";

/**
 * @description Devuelve la lista de todos los usuarios
 * @returns {UsuarioSinClaveHasheada[]}
 */
export function listarUsuarios(): UsuarioSinClaveHasheada[] {
  return usersService.listarUsuarios();
}
