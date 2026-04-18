import type { Usuario, UUID } from "../databases/users.store";
import * as meService from "../services/me.service";

/**
 * @description Obtiene el perfil del usuario autenticado
 */
export function obtenerPerfil(contexto: { uuid: UUID }): Usuario {
  return meService.obtenerPerfil(contexto.uuid);
}
