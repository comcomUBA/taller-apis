import * as authService from "../services/auth.service";
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
 *  - Si el nombre de usuario ya existe -> 409 (el service lanza un error)
 *  - Si el registro fue exitoso -> 201, devolver el token de acceso
 */
export async function register(contexto: { body: any; set: { status?: number | string } }) {
  const { body, set } = contexto;

  if (!body) {
    set.status = 400
    return "Falta body en la request" // Al hacer return en el controller, se detiene la ejecución y hace que el router devuelva la respuesta con el mensaje que le pasamos (en este caso, el string "Falta body en la request")
  }

  // Nos guardamos el nombreDeUsuario y la clave en variables
  const { nombreDeUsuario, clave } = body;

  // TODO: Validar que la request cumpla con lo pedido, devolver un string con el nombre del código de error
  if (!nombreDeUsuario || !clave) {
    set.status = 400
    return "Faltan el nombre del usuario y la clave en la request";
  }

  if (nombreDeUsuario.length < 3) {
    set.status = 400
    return "El nombre de usuario debe tener al menos 3 caracteres";
  }

  if (clave.length < 6) {
    set.status = 400
    return "La clave debe tener al menos 6 caracteres";
  }

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
 *
 * Ejercicio: Completar la validación manual y el manejo de errores.
 *
 * El body tiene: { nombreDeUsuario: string, clave: string }
 *
 * Casos a manejar:
 *  - Si falta nombreDeUsuario o clave -> 400
 *  - Si las credenciales son incorrectas -> 401 (el service lanza un error)
 *  - Si el login fue exitoso -> 200, devolver el token de acceso
 */
export async function login(contexto: { body: any; set: { status?: number | string } }) {
  const { body, set } = contexto;

  if (!body) {
    set.status = 400
    return "Falta body en la request" // Al hacer return en el controller, se detiene la ejecución y hace que el router devuelva la respuesta con el mensaje que le pasamos (en este caso, el string "Falta body en la request")
  }

  // Nos guardamos el nombreDeUsuario y la clave en variables
  const { nombreDeUsuario, clave } = body;

  // TODO: Validar que la request cumpla con lo pedido, devolver un string con el nombre del código de error
  if (!nombreDeUsuario || !clave) {
    set.status = 400
    return "Faltan el nombre del usuario y la clave en la request";
  }

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
