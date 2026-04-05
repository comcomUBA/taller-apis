#import "@preview/touying:0.7.0": *
#import themes.stargazer: *
#import "assets/theme.typ": build-theme, wide-title-slide
#import "@preview/codly:1.3.0": *
#import "@preview/codly-languages:0.1.10": *

#set text(lang: "es")

#let workshop = (
  title: "Clase ABCDEFG",
  date: "- Cuatrimestre 20XX",
  date-footer: "-c20XX",
)

#show: codly-init.with()

#show: build-theme(
  workshop.title,
  workshop.date,
  workshop.date-footer,
)

#wide-title-slide(extra: image("assets/images/comcom-sin-texto.png", height: 2cm))

#outline-slide()

#include "diapos_de_ejemplo.typ"
