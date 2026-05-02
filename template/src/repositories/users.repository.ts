export type NombreDeUsuario = string;
export type UsuarioSinClaveHasheada = Omit<Usuario, "claveHasheada">;
export type UUID = string;
export type Clave = string;
export type ClaveHasheada = string;
export interface Usuario {
  uuid: UUID;
  nombreDeUsuario: NombreDeUsuario;
  claveHasheada: ClaveHasheada;
}

/**
 * Base de datos de usuarios en memoria
 */
const uuidAUsuario: Map<UUID, Usuario> = new Map();
const nombreDeUsuarioAUsuario: Map<NombreDeUsuario, Usuario> = new Map();

/**
 * @description Crea un nuevo usuario y lo guarda en la base de datos
 * @param {NombreDeUsuario} nombreDeUsuario - Nombre de usuario
 * @param {ClaveHasheada} claveHasheada - Clave del usuario
 * @returns {Usuario} Usuario creado
 */
export function crearUsuario(nombreDeUsuario: NombreDeUsuario, claveHasheada: ClaveHasheada): Usuario {
  const uuid = crypto.randomUUID();
  const usuario: Usuario = { uuid, nombreDeUsuario, claveHasheada };
  uuidAUsuario.set(uuid, usuario);
  nombreDeUsuarioAUsuario.set(nombreDeUsuario, usuario);
  return usuario;
}

/**
 * @description Obtiene un usuario por su nombre de usuario
 * @param {NombreDeUsuario} nombreDeUsuario - Nombre de usuario
 * @returns {Usuario} Usuario
 */
export function obtenerUsuarioPorNombreDeUsuario(nombreDeUsuario: NombreDeUsuario): Usuario | undefined {
  return nombreDeUsuarioAUsuario.get(nombreDeUsuario);
}

/**
 * @description Obtiene un usuario por su UUID
 * @param {UUID} uuid - UUID del usuario
 * @returns {Usuario} Usuario
 */
export function obtenerUsuarioPorUuid(uuid: UUID): Usuario | undefined {
  return uuidAUsuario.get(uuid);
}

/**
 * @description Obtiene todos los usuarios sin su clave hasheada
 * @returns {UsuarioSinClaveHasheada[]} Lista de usuarios
 */
export function obtenerTodosLosUsuarios(): UsuarioSinClaveHasheada[] {
  return Array.from(uuidAUsuario.values()).map(({ uuid, nombreDeUsuario }) => ({ uuid, nombreDeUsuario }));
}
