import * as authService from "../services/auth.service";
import { crearTokenDeAcceso } from "../utils/auth";
import type { Context } from "elysia";
import type { IniciarSesionRouteContract, RegistrarUnUsuarioRouteContract } from "../schemas/auth.schemas";

/**
 * @description Registra un nuevo usuario
 * @param {RegistrarUnUsuarioRouteContract['body']} body
 * @param {RegistrarUnUsuarioRouteContract['set']} set
 * @returns {RegistrarUnUsuarioRouteContract['response'][201 | 409]}
 *
 * Ejercicio: Completar la validación manual y el manejo de errores.
 *
 * El body tiene: { nombreDeUsuario: string, clave: string }
 *
 * Casos a manejar:
 *  - Si el nombre de usuario ya existe -> 409 (el service lanza un error)
 *  - Si el registro fue exitoso -> 201, devolver el token de acceso
 */
export async function register(contexto: Context<RegistrarUnUsuarioRouteContract>): Promise<RegistrarUnUsuarioRouteContract['response'][201 | 409]> {
  const { body, set } = contexto;
  const { nombreDeUsuario, clave } = body;

  // Usamos try {} catch {} para el manejo de errores
  /*
   * La semántica es: try { bloque de código que intentamos ejecutar } catch {en caso de error, paramos la ejecución del bloque anterior y ejecutamos este }
   */
  try {
    // Llamamos a authService.register, que nos devuelve el uuid del usuario que acabamos de registrar
    const uuid = await authService.register(nombreDeUsuario, clave)

    // TODO: Devolver un objeto con el token de acceso: { tokenDeAcceso: "blah, blah, blah" } y 201 como código de estado (usar set.status = ...)
    const tokenDeAcceso = await crearTokenDeAcceso(uuid)
    set.status = 201
    return {tokenDeAcceso}
  } catch {
    // TODO: Devolver el status code correspondiente en caso de error (para este ejercicio acotado, el único error posible es que el nombre de usuario ya exista (409); usar set.status = ...)
    set.status = 409
    return "Ya existe un usuario con ese nombre de usuario";
  }
}

/**
 * @description Inicia sesión
 * @param {IniciarSesionRouteContract['body']} body
 * @param {IniciarSesionRouteContract['set']} set
 * @returns {IniciarSesionRouteContract['response'][200 | 401]}
 *
 * Ejercicio: Completar la validación manual y el manejo de errores.
 *
 * El body tiene: { nombreDeUsuario: string, clave: string }
 *
 * Casos a manejar:
 *  - Si las credenciales son incorrectas -> 401 (el service lanza un error)
 *  - Si el login fue exitoso -> 200, devolver el token de acceso
 */
export async function login(contexto: Context<IniciarSesionRouteContract>): Promise<IniciarSesionRouteContract['response'][200 | 401]> {
  const { body, set } = contexto;
  const { nombreDeUsuario, clave } = body;

  // Usamos try {} catch {} para el manejo de errores
  /*
   * La semántica es: try { bloque de código que intentamos ejecutar } catch {en caso de error, paramos la ejecución del bloque anterior y ejecutamos este }
   */
  try {
    // Llamamos a authService.login, que nos devuelve el uuid del usuario que quiere iniciar sesión
    const uuid = await authService.login(nombreDeUsuario, clave)

    // TODO: Devolver un objeto con el token de acceso: { tokenDeAcceso: "blah, blah, blah" } y 200 como código de estado (usar set.status = ...)
    const tokenDeAcceso = await crearTokenDeAcceso(uuid)
    set.status = 200
    return {tokenDeAcceso}
  } catch {
    // TODO: Devolver el status code correspondiente en caso de error (para este ejercicio acotado, el único error posible es que las credenciales sean inválidas (401); usar set.status = ...)
    set.status = 401
    return "Credenciales inválidas";
  }
}
