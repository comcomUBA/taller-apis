import * as authService from "../services/auth.service";
import { obtenerUsuarioPorNombreDeUsuario } from "../databases/users.store"
import { crearTokenDeAcceso } from "../utils/auth";

/**
 * @description Registra un nuevo usuario
 *
 * Ejercicio: Completar la validación manual y el manejo de errores.
 *
 * El body tiene: { nombreDeUsuario: string, clave: string }
 *
 * Casos a manejar:
 *  - Si falta nombreDeUsuario o clave -> 400
 *  - Si nombreDeUsuario tiene menos de 3 caracteres -> 400
 *  - Si clave tiene menos de 6 caracteres -> 400
 *  - Si el nombre de usuario ya existe -> 409
 *  - Si el registro fue exitoso -> 201, devolver el token de acceso
 */
export async function registrar(contexto: { body: any; set: { status?: number | string } }) {
  const { body, set } = contexto;
  const { nombreDeUsuario, clave } = body;

  // TODO: Validar que la request cumpla con lo pedido, devolver un string con el nombre del código de error
  if (!nombreDeUsuario || !clave) {
    set.status = 400
    return "Invalid Request";
  }

  if (nombreDeUsuario.length < 3) {
    set.status = 400
    return "Invalid Request";
  }

  if (clave.length < 6) {
    set.status = 400
    return "Invalid Request";
  }

  // TODO: Verificar que el nombre de usuario esté disponible (utilizar obtenerUsuarioPorNombreDeUsuario(nombreDeUsuario))
  if (obtenerUsuarioPorNombreDeUsuario(nombreDeUsuario)) {
    set.status = 409
    return "Conflict";
  }

  // TODO: Llamar a authService.registrar
  const uuid = await authService.registrar(nombreDeUsuario, clave)

  // TODO: Devolver un objeto con el token de acceso: { tokenDeAcceso: "blah, blah, blah" } y 201 como código de estado (usar set.status = ...)
  const tokenDeAcceso = await crearTokenDeAcceso(uuid)
  set.status = 201
  return {tokenDeAcceso}
}

/**
 * @description Inicia sesión
 *
 * Ejercicio: Completar la validación manual y el manejo de errores.
 *
 * El body tiene: { nombreDeUsuario: string, clave: string }
 *
 * Casos a manejar:
 *  - Si falta nombreDeUsuario o clave -> 400
 *  - Si las credenciales son incorrectas -> 401
 *  - Si el login fue exitoso -> 200, devolver el token de acceso
 */
export async function login(contexto: { body: any; set: { status?: number | string } }) {
  const { body, set } = contexto;
  const { nombreDeUsuario, clave } = body;

  // TODO: Validar los campos del body / que la request cumpla con lo pedido, devolver un string con el nombre del código de error
  if (!nombreDeUsuario || !clave) {
    set.status = 400
    return "Invalid Request";
  }

  // TODO: Usamos try {} catch {} para el manejo de errores
  /*
   * La semántica es: try { bloque de código que intentamos ejecutar } catch {en caso de error, paramos la ejecución del bloque anterior y ejecutamos este }
   */
  try {
    // TODO: Llamar a authService.login
    const uuid = await authService.login(nombreDeUsuario, clave)

    // TODO: Devolver un objeto con el token de acceso: { tokenDeAcceso: "blah, blah, blah" } y 200 como código de estado (usar set.status = ...)
    const tokenDeAcceso = await crearTokenDeAcceso(uuid)
    set.status = 200
    return {tokenDeAcceso}
  } catch {
    // TODO: Devolver el status code correspondiente en caso de error (para este ejercicio acotado, el único error posible es que las credenciales sean inválidas (401); usar set.status = ...)
    set.status = 401
    return "Unauthorized";
  }
}
