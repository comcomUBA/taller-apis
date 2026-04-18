import { obtenerUsuarioPorUuid, type Usuario, type UUID } from "../databases/users.store";

/**
 * @description Obtiene el perfil del usuario autenticado
 * @param {UUID} uuid - UUID del usuario
 * @returns {Usuario} Perfil del usuario, incluyendo su clave hasheada
 */
export function obtenerPerfil(uuid: UUID): Usuario {
  const user = obtenerUsuarioPorUuid(uuid);
  if (!user) throw new Error("Usuario no encontrado");
  return user;
}
