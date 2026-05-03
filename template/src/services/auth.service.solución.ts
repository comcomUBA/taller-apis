import { crearUsuario, obtenerUsuarioPorNombreDeUsuario, type Clave, type NombreDeUsuario, type UUID } from "../repositories/users.repository";
import { hashearClave, compararClaves } from "../utils/hash";

/**
 * @description Registra un nuevo usuario
 * @param {NombreDeUsuario} nombreDeUsuario - Nombre de usuario
 * @param {Clave} clave - Clave en texto plano
 *
 * Ejercicio: Implementar la lógica de registro
 *
 * Precondición/requiere:
 * - nombreDeUsuario.length >= 3
 * - clave.length >= 6
 *
 * Casos a manejar:
 *  - Si el nombre de usuario ya existe -> lanzar error (ya implementado)
 *
 * Cosas a tener en cuenta:
 *  - ¿Se guarda la clave en texto plano? (usar hashearClave)
 *  - Devolvemos el UUID del usuario
 */
export async function register(nombreDeUsuario: NombreDeUsuario, clave: Clave): Promise<UUID> {
  // Verifica que el nombre de usuario esté disponible (utilizar obtenerUsuarioPorNombreDeUsuario(nombreDeUsuario))
  if (obtenerUsuarioPorNombreDeUsuario(nombreDeUsuario)) throw new Error("El nombre de usuario ya existe")

  // TODO: Implementar
  const claveHasheada = await hashearClave(clave)
  const usuario = crearUsuario(nombreDeUsuario, claveHasheada)
  return usuario.uuid
}

/**
 * @description Inicia sesión y devuelve un token de acceso
 * @param {NombreDeUsuario} nombreDeUsuario - Nombre de usuario
 * @param {Clave} clave - Clave en texto plano
 *
 * Ejercicio: Implementar la lógica de login
 *
 * Cosas a tener en cuenta:
 *  - ¿Qué pasa si el usuario no existe? (usar obtenerUsuarioPorNombreDeUsuario)
 *  - ¿Qué pasa si la clave es incorrecta? (usar compararClaves)
 *  - Si los datos son válidos, devolvemos el UUID del usuario
 */
export async function login(nombreDeUsuario: NombreDeUsuario, clave: Clave): Promise<UUID> {
  // TODO: Implementar
  const usuario = obtenerUsuarioPorNombreDeUsuario(nombreDeUsuario)
  if (!usuario) throw new Error("El usuario no existe")
  const esLaClaveCorrecta = await compararClaves(clave, usuario.claveHasheada)
  if (!esLaClaveCorrecta) throw new Error("Clave incorrecta")
  return usuario.uuid
}
