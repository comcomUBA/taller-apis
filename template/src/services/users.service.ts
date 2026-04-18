import { obtenerTodosLosUsuarios, type UsuarioSinClaveHasheada } from "../databases/users.store";

/**
 * @description Devuelve la lista de todos los usuarios (sin las claves hasheadas)
 * @returns {UsuarioSinClaveHasheada[]} Lista de usuarios
 */
export function listarUsuarios(): UsuarioSinClaveHasheada[] {
  return obtenerTodosLosUsuarios();
}
