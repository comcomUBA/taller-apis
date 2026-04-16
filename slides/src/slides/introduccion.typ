#import "@preview/touying:0.7.0": *
#import themes.stargazer: *

= Introducción a las APIs

== ¿Qué es una API, y para qué sirve?

#align(center)[
  _¿Cómo se comunican dos programas que no se conocen?_
]

#pause

Las API (Application Programming Interface) son mecanismos que permiten a dos componentes de software comunicarse entre sí mientras ambos sistemas cumplan con un contrato/especificación.

== Tipos de APIs

Existen varios tipos de APIs, algunas son:
- RPC
- WebSocket
- *RESTful*

Siendo estas últimas las más famosas, y las que nos interesarán en el transcurso del taller.

= APIs RESTful

== ¿Qué es una API RESTful?

Las APIs RESTful son un tipo de API que sigue los #link("https://www.redhat.com/es/topics/api/what-is-a-rest-api")[principios de diseño de REST] (Representational State Transfer).

- Utilizan HTTP para realizar operaciones CRUD (Create, Read, Update, Delete) sobre recursos.

== Métodos/verbos HTTP

Para entender como funcionan las APIs RESTful, es importante conocer los métodos HTTP más comunes:
#align(center)[
  #image("../assets/images/Métodos HTTP.png", width: 69%)
]

== ¿Cómo devuelven la información?

Las APIs RESTful suelen devolver la información en formato JSON#footnote[JavaScript Object Notation.], aunque también pueden usar XML u otros formatos. A su vez, utilizan códigos de estado HTTP.

`HTTP/1.1 200 OK`
```json
{
  "id": 1,
  "name": "Juan Pérez",
  "email": "jperez@dc.uba.ar",
  ...
}
```

#align(center)[
  Es importante remarcar que *no toda request devuelve contenido* en el cuerpo.

  Por ejemplo, una request de eliminación exitosa del verbo `DELETE` suele devolver un código de estado `204 No Content`, indicando que la operación fue exitosa pero no hay contenido para devolver.
]

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
    #image("../assets/images/http-status-ranges-in-a-nutshell.png", width: 100%)
  ],
)

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
    image("../assets/images/curl.png"),
  )

  #block(
    radius: 4pt,
    clip: true,
    image("../assets/images/httpie.png"),
  )
]

== Clientes HTTP (p. ej.: #link("https://hoppscotch.io/")[#text(black)[Hoppscotch]])

#align(center)[
  #block(
    radius: 4pt,
    clip: true,
    image("../assets/images/hoppscotch.png"),
  )
]

== Documentación interactiva (p. ej.: #link("https://scalar.com/")[#text(black)[Scalar]])

#align(center)[
  #block(
    radius: 4pt,
    clip: true,
    image("../assets/images/swagger.png"),
  )
]

= Ejercitación de conceptos

== Ejercicio 1: Lista anónima

