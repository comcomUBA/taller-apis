import { t } from "elysia";

/**
 * @description Tags para documentación de API
 */
const tags = ["Auth"];

/*
  Schemas generales
*/

/**
 * @description Schema de respuesta 401
 */
const unauthorizedResponseSchema = t.String({
  description: "No autorizado",
  examples: ["Unauthorized"],
});

/**
 * @description Schema de respuesta 409
 */
const conflictResponseSchema = t.String({
  description: "Conflicto",
  examples: ["Conflict"],
});

/*
  POST /register
*/

/**
 * @description Schema de la ruta POST /register
 */

export const registrarUnUsuarioSchema = {
  body: t.Object({
    nombreDeUsuario: t.String({ description: "Nombre de usuario" }),
    clave: t.String({ description: "Clave del usuario" }),
  }),
  response: {
    201: t.Object({
      tokenDeAcceso: t.String({ description: "Token de acceso" }),
    }),
    409: conflictResponseSchema,
  },
  detail: {
    tags,
    summary: "Registrarse",
    description: "Registra un nuevo usuario.",
  },
};

export interface RegistrarUnUsuarioRouteContract {
  body: {
    nombreDeUsuario: string;
    clave: string;
  };
  response: {
    201: {
      tokenDeAcceso: string;
    };
    409: string;
  };
}


/*
  POST /login
*/

/**
 * @description Schema de la ruta POST /login
 */

export const iniciarSesionSchema = {
  body: t.Object({
    nombreDeUsuario: t.String({ description: "Nombre de usuario" }),
    clave: t.String({ description: "Clave del usuario" }),
  }),
  response: {
    200: t.Object({
      tokenDeAcceso: t.String({ description: "Token de acceso" }),
    }),
    401: unauthorizedResponseSchema,
  },
  detail: {
    tags,
    summary: "Login",
    description: "Inicia sesión.",
  },
};

export interface IniciarSesionRouteContract {
  body: {
    nombreDeUsuario: string;
    clave: string;
  };
  response: {
    200: {
      tokenDeAcceso: string;
    };
    401: string;
  };
}