import { obtenerTodosLosUsuarios, type UsuarioSinClaveHasheada } from "../repositories/users.repository";

/**
 * @description Devuelve la lista de todos los usuarios (sin las claves hasheadas)
 * @returns {UsuarioSinClaveHasheada[]} Lista de usuarios
 */
export function listarUsuarios(): UsuarioSinClaveHasheada[] {
  return obtenerTodosLosUsuarios();
}
