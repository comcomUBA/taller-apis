#import "@preview/touying:0.7.0": *
#import themes.stargazer: *
#import "assets/theme.typ": build-theme, wide-title-slide
#import "@preview/codly:1.3.0": *
#import "@preview/codly-languages:0.1.10": *

#set text(lang: "es")

#let workshop = (
  title: "Taller de APIs (RESTful)",
  date: "Primer Cuatrimestre 2026",
  date-footer: "1c2026",
)

#show: codly-init.with()

#show: build-theme(
  workshop.title,
  workshop.date,
  workshop.date-footer,
)

#wide-title-slide(extra: pad(top: 30pt, image("assets/images/logo-sin-texto.min.svg", height: 3.5cm)))

#include "slides/introduccion.typ"
#include "slides/middlewares.typ"
#include "slides/routes.typ"
#include "slides/schemas.typ"
#include "slides/recursos.typ"
