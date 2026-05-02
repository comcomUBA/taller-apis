#import "@preview/touying:0.7.0": *
#import themes.stargazer: *

= Controllers, Services y Repositories

== ¿Qué es un Controller?

Un controller *recibe la request* HTTP, llama al service correspondiente, y *decide qué responder* (código de estado + body).

```ts
export function obtenerPerfil(contexto) {
  // Llama al service
  return meService.obtenerPerfil(contexto.uuid);
}
```

#pause

- *No contiene lógica de negocio* (eso va en el service).
- Se encarga de interpretar el resultado y elegir el *status code* adecuado.
- Maneja los *errores* que puede lanzar el service.

== ¿Qué es un Service?

Un service contiene la *lógica de negocio*: aplica reglas, valida precondiciones y usa el *repository* para acceder a los datos.

```ts
export function obtenerPerfil(uuid) {
  const user = usersRepository.obtenerPorUuid(uuid);
  if (!user) throw new Error("Usuario no encontrado");
  return user;
}
```

#pause

- *No conoce HTTP*: no sabe de requests, responses, ni status codes.
- *No accede a la base de datos directamente*: usa el repository.
- Lanza *errores* que el controller traduce a respuestas HTTP.

== ¿Qué es un Repository?

Un repository se encarga del *acceso a los datos*: leer, escribir, actualizar y eliminar registros de la base de datos.

```ts
export function obtenerPorUuid(uuid) {
  return uuidAUsuario.get(uuid);
}

export function crear(nombreDeUsuario, claveHasheada) {
  const uuid = crypto.randomUUID();
  const usuario = { uuid, nombreDeUsuario, claveHasheada };
  uuidAUsuario.set(uuid, usuario);
  return usuario;
}
```

#pause

- Es el *único* que habla con la base de datos.
- Expone operaciones *CRUD* (Create, Read, Update, Delete).
- No tiene lógica de negocio ni conoce HTTP.

== Controller vs Service vs Repository

#align(center)[
  #table(
    columns: 4,
    align: (left, center, center, center),
    table.header([], [*Controller*], [*Service*], [*Repository*]),
    [¿Conoce HTTP?], [✓], [✗], [✗],
    [¿Lógica de negocio?], [✗], [✓], [✗],
    [¿Accede a la DB?], [✗], [✗], [✓],
    [¿Decide status code?], [✓], [✗], [✗],
    [¿Valida datos?], [Puede#footnote[Lo ideal es que no tenga que hacerlo o lo haga lo menos posible, ya veremos por qué.]], [Reglas de negocio], [✗],
  )
]

== Ejercicio 4: Implementar login y register

Ahora que entienden cómo se organiza, van a implementar la autenticación.

*Parte A -- Service (`auth.service.ts`):*
+ Implementar `registrar`: hashear la clave (con `hashearClave`), crear el usuario (con el repository), devolver su UUID.
+ Implementar `login`: buscar el usuario (con el repository), comparar claves (con `compararClaves`), devolver su UUID.

#pause

*Parte B -- Controller (`auth.controller.ts`):*
+ Completar `registrar`: validar campos del body (que existan, largos mínimos), verificar que el usuario no exista, llamar al service, devolver token + status `201`.
+ Completar `login`: validar campos, llamar al service con try/catch, devolver token + status `200` o `401`.

#pause

*Prueben:* registrar un usuario, hacer login, intentar con datos inválidos.

#pagebreak()

#align(center)[
  _¿Cuántos `if` tuvieron que escribir para validar los datos?_

  _¿Qué pasa si agregan un campo nuevo al body? ¿Y si cambian un largo mínimo?_
]
