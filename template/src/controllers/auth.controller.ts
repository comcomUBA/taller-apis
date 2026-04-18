import * as authService from "../services/auth.service";

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
 *  - Si el registro fue exitoso -> 201
 *  - Si el nombre de usuario ya existe -> 409
 */
export async function registrar(contexto: { body: any; set: { status?: number | string } }) {
  const { body, set } = contexto;

  // TODO: Validar los campos del body
  // TODO: Llamar a authService.registrar
  // TODO: Devolver la respuesta adecuada
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
 *  - Si el login fue exitoso -> 200, devolver { token }
 */
export async function login(contexto: { body: any; set: { status?: number | string } }) {
  const { body, set } = contexto;

  // TODO: Validar los campos del body
  // TODO: Llamar a authService.login
  // TODO: Devolver la respuesta adecuada
}
