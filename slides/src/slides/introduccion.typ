#import "@preview/touying:0.7.0": *
#import themes.stargazer: *

= Introducción a las APIs

== ¿Qué es una API, y para qué sirve?

#align(center)[
  _¿Cómo se comunican dos programas que no se conocen?_
]

#pause

Las API (Application Programming Interface) son mecanismos que permiten a dos *componentes* de *software* *comunicarse* entre sí mientras ambos sistemas *cumplan* con un *contrato/especificación*.

#pause

=== Ejemplos

- El lector de tarjetas cuando pagás en un local se comunica con la API de la pasarela de pagos.
- Tu IDE#footnote[Visual Studio Code, Zed, los de JetBrains, Neovim, emacs, etc.] favorito habla mediante una API con tu IA/Agente/LLM#footnote[Claude, Codex, Gemini, etc.] de confianza.

== Tipos de APIs

Existen varios tipos de APIs, algunas son:
- RPC
- WebSocket
- *RESTful*

Siendo estas últimas las más famosas, y las que nos interesarán en el transcurso del taller.

#pause

#align(center)[
  #image("../images/why-apis.jpeg", width: 75%)
]

== ¿Qué es una API RESTful?

Las APIs RESTful son un tipo de API que sigue los #link("https://www.redhat.com/es/topics/api/what-is-a-rest-api")[principios de diseño de REST] (Representational State Transfer).

- Utilizan HTTP para realizar operaciones CRUD (Create, Read, Update, Delete) sobre recursos.

- *Un recurso es cualquier entidad que se pueda identificar, como un usuario, un producto, una publicación, etc.*
  - Se puede pensar _vagamente_ como "información almacenada identificable".

== Métodos/verbos HTTP

Para entender como funcionan las APIs RESTful, es importante conocer los métodos HTTP más comunes:
#align(center)[
  #image("../images/métodos-http.png", width: 68%)
]

== ¿Cómo devuelven la información?

Las APIs RESTful suelen devolver la información en formato JSON, aunque también pueden usar XML u otros formatos. A su vez, utilizan códigos de estado HTTP.

```json
{
  "id": 1,
  "name": "Juan Pérez",
  "email": "jperez@dc.uba.ar",
  ...
}
```
#align(right)[
  `HTTP/1.1 200 OK`
]


#pagebreak()

#grid(
  columns: (1fr, 1fr),
  [
    #align(center)[

      Es importante remarcar que *no toda request devuelve contenido* en el cuerpo.

      Por ejemplo, una request de eliminación exitosa del verbo `DELETE` suele devolver un código de estado `204 No Content`, indicando que la operación fue exitosa pero no hay contenido para devolver.
    ]
  ],
  [
    #pause
    #align(center)[
      #block(
        radius: 4pt,
        clip: true,
        image("../images/códigos_de_error_correctos_y_mensajes_importantes.jpeg", width: 85%),
      )

      También está bueno *ser consistentes* con los códigos de error y *no devolver mensajes redundantes*.
    ]
  ],
)

== Códigos de estado HTTP

#grid(
  columns: (1fr, 1fr),
  [
    Los códigos de estado HTTP son respuestas estándar que indican el resultado de la solicitud realizada a la API.

    - 1xx: Informativos
    - 2xx: Éxito
    - 3xx: Redirección
    - 4xx: Error del cliente
    - 5xx: Error del servidor
  ],
  [
    #image("../images/http-status-ranges-in-a-nutshell.png", width: 100%)
  ],
)

== Headers HTTP

Los headers (encabezados) son *metadatos* que viajan junto a la request (cliente $->$ servidor) o la response (servidor $->$ cliente).

Contienen información adicional que no va en el body.

#pause

```
GET /me HTTP/1.1
Host: api.ejemplo.com
Authorization: Bearer eyJhbGciOiJIUz...
Content-Type: application/json
```

#pause

Algunos headers comunes:
- `Content-Type`: indica el formato del body (p. ej. `application/json`).
- `Authorization`: información de autenticación y autorización.

== Cómo interactuar con una API RESTful

Hay varias formas de interactuar con una API RESTful, algunas de las más comunes son:

- Desde la terminal usando herramientas como `curl` o `httpie`.
- Usando clientes HTTP como Postman o Insomnia.
- Usando la propia documentación de la API, si esta tiene una interfaz interactiva (como Swagger UI o Scalar).

== Terminal (p. ej.: #link("https://curl.se/")[#text(black)[curl]] y #link("https://httpie.io/")[#text(black)[httpie]])

#align(center)[
  #block(
    radius: 4pt,
    clip: true,
    image("../images/curl.png"),
  )

  #block(
    radius: 4pt,
    clip: true,
    image("../images/httpie.png"),
  )
]

== Clientes HTTP (p. ej.: #link("https://postman.com/")[#text(black)[Postman]])

#align(center)[
  #block(
    radius: 4pt,
    clip: true,
    image("../images/postman.png"),
  )
]

== Documentación interactiva (p. ej.: #link("https://scalar.com/")[#text(black)[Scalar]])

#align(center)[
  #block(
    radius: 4pt,
    clip: true,
    image("../images/scalar.png"),
  )
]

= Interactuando con una API RESTful

== Ejercicio 1: Strings anónimos
// Objetivo: familiarizarse con la documentación de la API y con las herramientas para interactuar con ella

Levantamos un servidor, este expone una API RESTful lista para usar. La idea de este ejercicio es familiarizarse con alguna forma para interactuar con la API (terminal, cliente HTTP o documentación interactiva) y probar los distintos endpoints que expone la API.

Esta API RESTful expone:

- `/items`: permite solicitudes `GET` y `POST`.
- `/items/{id}`: permite solicitudes `GET`, `PUT`, `PATCH` y `DELETE`.

*Consignas:*
- Entren a *\/docs* de la API, donde van a encontrar la documentación interactiva.
- Prueben los distintos verbos HTTP sobre las rutas indicadas y observen las respuestas que devuelve la API.#footnote[En el taller usaremos la documentación interactiva, pero pueden usar cURL o lo que prefieran.]
