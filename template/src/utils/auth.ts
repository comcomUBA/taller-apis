import {SignJWT, jwtVerify, type JWTPayload} from 'jose';
import type { UUID } from "../repositories/users.repository";
export type TokenDeAcceso = string;

const JWT_SECRET = new TextEncoder().encode(Bun.env.JWT_SECRET || "taller-apis-desarrollo");

/**
 * @description Crea un token de acceso
 * @param {string} sub - ID del usuario
 * @returns {Promise<string>} Token de acceso
 */
export async function crearTokenDeAcceso(sub: UUID): Promise<TokenDeAcceso> {
  return new SignJWT({sub})
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt(Date.now() / 1000)
    .setExpirationTime('15m')
    .sign(JWT_SECRET);
}

/**
 * @description Verifica y retorna el payload de un token de acceso
 * @param {TokenDeAcceso} token - Token de acceso
 * @returns {Promise<JWTPayload>} Payload del token
 */
export async function obtenerPayloadDelToken(token: TokenDeAcceso): Promise<JWTPayload> {
  const {payload} = await jwtVerify(token, JWT_SECRET);
  return payload;
}
