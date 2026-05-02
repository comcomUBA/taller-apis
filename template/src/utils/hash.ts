import type { Clave, ClaveHasheada } from "../repositories/users.repository";

/**
 * @description Hashea una contraseña
 * @param {string} clave - Clave a hashear
 * @returns {string} Hash de la contraseña
 */
export async function hashearClave(clave: Clave): Promise<ClaveHasheada> {
  return Bun.password.hash(clave);
}

/**
 * @description Compara una contraseña en texto plano contra un hash
 * @param {string} clave - Clave en texto plano
 * @param {string} claveHasheada - Hash de la contraseña
 * @returns {boolean} True si la contraseña es correcta, false en caso contrario
 */
export async function compararClaves(clave: Clave, claveHasheada: ClaveHasheada): Promise<boolean> {
  return Bun.password.verify(clave, claveHasheada);
}
