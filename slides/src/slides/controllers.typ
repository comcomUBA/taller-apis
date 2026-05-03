#import "@preview/touying:0.7.0": *
#import themes.stargazer: *

= Controllers, Services y Repositories

== ¿Qué es un Controller?

Un controller *recibe la request* HTTP, llama al service correspondiente, y *decide qué responder* (código de estado + body).

```ts
export function tweetAnónController(contexto) {
  if (!contexto.body || !contexto.body.textoTweet) {
    set.status = 400;
    return "Falta el body o el texto del tweet";
  }
  return tweetAnónService.publicarTweetAnón(contexto.uuid, contexto.body.textoTweet);
}
```

#pause

- *No contiene lógica de negocio* (eso va en el service).
- Se encarga de interpretar el resultado y elegir el *status code* adecuado.
- Maneja los *errores* que puede lanzar el service.

== ¿Qué es un Service?

Un service contiene la *lógica de negocio*: aplica reglas, valida campos según las reglas de negocio y usa el *repository* para acceder a los datos.

```ts
export function publicarTweetAnón(uuid, textoTweet) {
  const user = usersRepository.obtenerPorUuid(uuid);
  if (!user) throw new Error("Usuario no encontrado");
  if (user.baneado) throw new Error("Usuario baneado");
  if (textoTweet.length > 280) throw new Error("El texto del tweet es demasiado largo");
  const tweet = tweetAnónRepository.crear(uuid, textoTweet);
  return tweet;
}
```

#pause

- *No conoce HTTP*: no sabe de requests, responses, ni status codes.
- *No accede a la base de datos directamente*: usa el repository.
- Lanza *errores* que el controller traduce a respuestas HTTP.

== ¿Qué es un Repository?

Un repository se encarga del *acceso a los datos*: leer, escribir, actualizar y eliminar registros de la base de datos.

- #raw("usersRepository.obtenerPorUuid(uuid)", lang: "ts"):
```ts
export function obtenerPorUuid(uuid) {
  // Código que obtiene el usuario de la base de datos usando su UUID
}
```

- #raw("tweetAnónRepository.crear(uuid, textoTweet)", lang: "ts"):
```ts
export function crear(uuid, textoTweet) {
  // Código que crea un nuevo tweet en la base de datos con el UUID del usuario y el texto del tweet
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

== Promesas, async y await

Algunas operaciones *tardan*: leer un archivo, hacer una consulta a la DB, llamar a otra API...

#pause

TypeScript/JavaScript *no se queda esperando*. En vez de eso, te devuelve una *promesa*: un objeto que dice _"todavía no tengo el resultado, pero te lo voy a dar cuando esté listo"_.

```ts
// Esto NO devuelve el usuario, devuelve una PROMESA de un usuario.
const promesa = db.query("SELECT * FROM users WHERE uuid = ?", [uuid]);
```

#pause

Para decirle a TypeScript/JavaScript _"esperá a que termine antes de seguir"_, usamos `await`:

```ts
// Ahora sí, esperamos a que la promesa se resuelva y obtenemos el usuario.
const usuario = await db.query("SELECT * FROM users WHERE uuid = ?", [uuid]);
```

#pagebreak()

Para poder usar `await` dentro de una función, hay que marcarla como `async`:

```ts
async function obtenerUsuario(uuid) {
  const usuario = await db.query("SELECT * FROM users WHERE uuid = ?", [uuid]);
  return usuario;
}
```

- Si una función es `async`, *siempre devuelve una promesa* (aunque parezca que devuelve un valor directo).
- Si se olvidan de poner `await`, van a recibir el objeto `Promise` en vez del resultado.

== Ejercicio 4: Implementar login y register

*Parte A -- Service (`auth.service.ts`):*
+ Implementen `registrar`: hasheen la clave (con #raw("await hashearClave(clave)", lang: "ts")) y creen el usuario (con #raw("crearUsuario(nombreDeUsuario, claveHasheada)", lang: "ts")), luego devuelvan su UUID.

+ Implementen `login`: obtengan el objeto usuario (con #raw("obtenerUsuarioPorNombreDeUsuario(nombreDeUsuario)", lang: "ts")) y comparen la clave que les pasaron con la clave guardada (con #raw("await compararClaves(clave, usuario.claveHasheada)", lang: "ts")), luego devuelvan su UUID.

*Parte B -- Controller (`auth.controller.ts`):*
+ Completen `registrar`: validen que el body exista, luego sus parámetros (que existan, largos mínimos), llamen al service dentro del try/catch y devuelvan el token con el status code `201` o que el usuario ya existe con el status code `409`, según corresponda.

+ Completen `login`: validen que el body exista, luego sus parámetros (que existan), llamen al service dentro del try/catch y devuelvan el token con el status code `200` o que las credenciales son inválidas con el status code `401`, según corresponda.

#pause

*Prueben:* registrar un usuario, hacer login, intentar con datos inválidos.

#pagebreak()

#align(center)[
  _¿Cuántos `if` tuvieron que escribir para validar los datos?_

  _¿Qué pasa si agregan un campo nuevo al body? ¿Y si cambian un largo mínimo?_
]
