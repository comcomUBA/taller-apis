#import "@preview/touying:0.7.0": *
#import themes.stargazer: *

= Schemas

== ¿Qué es un Schema?

Un schema *define la forma de los datos*: qué campos tiene el body, qué tipos tienen, qué restricciones cumplen, y qué devuelve la respuesta.

```ts
const bodySchema = t.Object({
  nombreDeUsuario: t.String({ minLength: 3 }),
  clave: t.String({ minLength: 6 }),
});
```

#pause

Si la request no cumple con el schema, *el framework la rechaza automáticamente* con un `400 Bad Request`, sin necesidad de escribir un solo `if`.

== Sin schema (`register` en `auth.controller.ts`)

```ts
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

  if (obtenerUsuarioPorNombreDeUsuario(nombreDeUsuario)) {
    set.status = 409
    return "Conflict";
  }
```

== Con schema (`register` en `auth.controller.ts`)

```ts
  if (obtenerUsuarioPorNombreDeUsuario(nombreDeUsuario)) {
    set.status = 409
    return "Conflict";
  }
```

== ¿Cómo se usa un Schema?

El schema se pasa como *tercer argumento* en la definición de la ruta:

```ts
// Antes (sin schema):
.post("/auth/register", authController.register)

// Después (con schema):
.post("/auth/register", authController.register, registrarUnUsuarioSchema)
```

#pause

Además, el controller puede tipar sus parámetros con el *contrato* del schema:

```ts
export async function register(
  contexto: Context<RegistrarUnUsuarioRouteContract>
) { ... }
```

Esto da *autocompletado* y *chequeo de tipos* en el editor.

== Bonus: documentación automática

Al definir schemas, la documentación interactiva (Swagger / Scalar) muestra *automáticamente*:

- Los campos esperados en el body, con sus tipos y restricciones.
- Las posibles respuestas con sus códigos de estado.
- Ejemplos de uso.

#pause

*Todo sin escribir documentación a mano.* Solo por definir los schemas.

== Ejercicio 5 (extra): Escribir los schemas de auth

Vamos a hacer que la validación manual desaparezca del controller.

*Parte A -- Schemas (`auth.schemas.ts`):*
+ Completar el schema de `POST /auth/registrar`:
  - Body: `nombreDeUsuario` (string, minLength 3), `clave` (string, minLength 6).
  - Response 201: objeto con `tokenDeAcceso` (string).
+ Completar el schema de `POST /auth/login`:
  - Body: `nombreDeUsuario` (string), `clave` (string).
  - Response 200: objeto con `tokenDeAcceso` (string).
+ Completar las interfaces (`RegistrarUnUsuarioRouteContract`, `IniciarSesionRouteContract`).

#pause

*Parte B -- Integrar:*
+ Modificar `auth.routes.ts`: pasar los schemas como tercer argumento a cada `.post()`.
+ Modificar `auth.controller.ts`: tipar con `Context<...RouteContract>`, *eliminar las validaciones manuales* que ahora son redundantes.
+ Ir a `/docs` y ver la documentación auto-generada.
