import { crearUsuario, obtenerUsuarioPorNombreDeUsuario } from "../databases/users.store";
import { hashearClave, compararClaves } from "../utils/hash";
import { crearTokenDeAcceso, type TokenDeAcceso } from "../utils/auth";

/**
 * @description Registra un nuevo usuario
 * @param {string} nombreDeUsuario - Nombre de usuario
 * @param {string} clave - Clave en texto plano
 *
 * Ejercicio: Implementar la lógica de registro
 *
 * Cosas a tener en cuenta:
 *  - ¿Qué pasa si el nombre de usuario ya existe?
 *  - ¿Qué pasa si el nombre de usuario o la clave están vacíos?
 *  - ¿Se guarda la clave en texto plano? (usar hashearClave)
 */
export async function registrar(nombreDeUsuario: string, clave: string) {
  // TODO: Implementar
}

/**
 * @description Inicia sesión y devuelve un token de acceso
 * @param {string} nombreDeUsuario - Nombre de usuario
 * @param {string} clave - Clave en texto plano
 *
 * Ejercicio: Implementar la lógica de login
 *
 * Cosas a tener en cuenta:
 *  - ¿Qué pasa si el usuario no existe?
 *  - ¿Qué pasa si la clave es incorrecta? (usar compararClaves)
 *  - ¿Qué devuelvo si todo sale bien? (usar crearTokenDeAcceso)
 */
export async function login(nombreDeUsuario: string, clave: string) {
  // TODO: Implementar
}
