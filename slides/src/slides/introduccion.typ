#import "@preview/touying:0.7.0": *
#import themes.stargazer: *

= Introducción a las APIs

== ¿Qué es una API, y para qué sirve?

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

== Métodos HTTP

Para entender como funcionan las APIs RESTful, es importante conocer los métodos HTTP más comunes:
#align(center)[
  #image("../assets/images/métodos-http.png", width: 73.5%)
]

== ¿Cómo devuelve la información?

Las APIs RESTful suelen devolver la información en formato JSON (JavaScript Object Notation), aunque también pueden usar XML u otros formatos.

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


= Ejercitación de conceptos


