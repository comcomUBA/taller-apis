import * as usersService from "../services/users.service";

/**
 * @description Devuelve la lista de todos los usuarios
 */
export function listarUsuarios() {
  return usersService.listarUsuarios();
}
