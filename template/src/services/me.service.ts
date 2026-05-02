import { obtenerUsuarioPorUuid, type Usuario, type UUID } from "../repositories/users.repository";

/**
 * @description Obtiene el perfil del usuario autenticado
 * @param {UUID} uuid - UUID del usuario
 * @returns {Usuario} Perfil del usuario, incluyendo su clave hasheada
 */
export function obtenerPerfil(uuid: UUID): Usuario {
  const user = obtenerUsuarioPorUuid(uuid);
  if (!user) throw new Error("Usuario no encontrado");
  return user; // Tener en cuenta que en la vida real, uno no debería devolver la clave, ni aunque este hasheada
}
