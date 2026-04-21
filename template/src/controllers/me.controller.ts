import type { Context } from "elysia";
import type { Usuario } from "../databases/users.store";
import * as meService from "../services/me.service";
import type { ObtenerPerfilRouteContract } from "../schemas/me.schemas";
import type { ContextoAutenticado } from "../middlewares/authenticator";

/**
 * @description Obtiene el perfil del usuario autenticado
 */
export function obtenerPerfil(contexto: Context<ObtenerPerfilRouteContract> & ContextoAutenticado): Usuario {
  return meService.obtenerPerfil(contexto.uuid);
}
