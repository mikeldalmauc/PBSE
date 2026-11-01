---
name: crear-guia
description: Crea una guía nueva de tema o una tarea/práctica nueva para el módulo Sistemas Operativos Monopuesto (PBSE/guias), con el estilo «chaval de 16 años» del CLAUDE.md de PBSE. Úsala cuando Mikel diga «crea una guía sobre…», «nueva práctica de…», «haz la tarea de…» o «rehaz la guía de…».
---

# Crear una guía o una práctica del módulo

Produces un fichero Markdown listo para Moodle, con sus diagramas, exportado y enlazado desde el
`LEEME.md`. No se pregunta cómo escribirlo: eso ya está decidido en `CLAUDE.md`. Se pregunta
sólo lo que no se pueda saber (qué tema, qué se entrega).

## 1. Lee antes de escribir (siempre, en este orden)

1. `CLAUDE.md` de la raíz de PBSE: el contrato. Las diez reglas, el esqueleto, las marcas, las
   tablas, el vocabulario, el flujo.
2. `guias/LEEME.md`: convenciones (`alumno`, `Mint-SMR`, UEFI + GPT, empresa de tres
   departamentos), cuadros de colores, mapa de temas, exportación.
3. La guía modelo, `guias/1-basico/03-procesos/1-guia.md`, para una **guía de tema**. La tarea
   modelo, `guias/1-basico/05-explorar-el-sistema/4-tarea-directorios-linux.md`, para una
   **tarea o práctica suelta**.
4. `guias/_docente/decisiones-y-pendientes.md`: decisiones ya tomadas (qué distribución, qué se
   retiró y por qué, lista de temas pendientes con su nombre).
5. Las guías vecinas del tema (la anterior y la siguiente en el mapa): para enlazarlas y no
   repetir lo que ya explican.

## 2. Qué hace falta saber

Si Mikel no lo ha dicho, pregúntaselo **en un solo mensaje**, con una propuesta para cada punto
para que sólo tenga que corregir:

- **Tema y número** (mira el hueco libre en el mapa de temas del `LEEME.md` y la lista de
  pendientes de `_docente`).
- **Tipo**: guía de tema (`NN-nombre/1-guia.md`) o tarea suelta (`NN-nombre/N-tarea-nombre.md`).
- **Nivel** (1 · Básico, 2 · Intermedio, 3 · Avanzado), **competencias** (CM…), **herramientas**
  (H1 VirtualBox, H2 CMD/PowerShell, H4 terminal Linux…) y **duración**.
- **Qué se entrega y cómo se califica** (de 0 a 10 o Apto / No apto) y qué entra en el examen.
- **En qué máquina** se hace: el equipo del aula (Windows), `Mint-SMR`, `Arch-SMR` o una MV de
  Windows.

Lo que Mikel no conteste, se decide con el criterio del módulo y se dice en el informe.

## 3. Antes de escribir, decide (y anótalo en el informe final)

- Los **5 a 8 apartados** de la Parte 1, cada uno con una idea.
- Los **términos técnicos** nuevos: 10 como mucho. Los que sobren, a «Para saber más» o fuera.
- **Un dibujo por idea difícil**: qué SVG hay que crear y cuáles se reutilizan de otras guías
  (por ruta relativa, no copiados).
- La **analogía** que recorre toda la guía.
- Los **ejercicios que puntúan** y el «Pruébalo» de cada apartado (que no puntúa).

## 4. Escribe

Sigue el esqueleto del `CLAUDE.md` tal cual. Plantillas para empezar:

### Guía de tema

````markdown
---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 1 · Básico
tema: "NN"
tipo: Guía
competencias: CMx
herramientas: H4 (terminal Linux)
duracion: N h
---

# Título corto

> **Antes de empezar.** Qué hace falta (MV, terminal, guía anterior). Dos líneas.

Tres o cuatro líneas que enganchen: qué va a poder hacer y por qué le importa.

> **Analogía.** Una comparación con la vida real que se mantiene en toda la guía.

| | |
|---|---|
| 🎯 **Qué vas a aprender** | … |
| 🧰 **Qué necesitas** | … |
| ⏱️ **Tiempo** | … |
| 📦 **Qué entregas** | La tarea «…» ([Parte 4](#parte-4--entrega)) |

**Tu misión, paso a paso:**

- [ ] …  (de 4 a 6)

## Índice

- [Parte 1 · Aprende](#parte-1--aprende)
  - [1. …](#1-)
- [Parte 2 · Lo que te llevas](#parte-2--lo-que-te-llevas)
- [Parte 3 · Practica](#parte-3--practica)
- [Parte 4 · Entrega](#parte-4--entrega)

---

## Parte 1 · Aprende

### 1. Nombre del apartado

Ejemplo concreto o dibujo primero.

![Descripción completa del dibujo](images/nombre.svg)

Explicación en frases cortas. **Término nuevo**: explicado en la misma frase.

> [!TIP]
> **🧪 Pruébalo.**
>
> ```bash
> comando     # qué hace
> ```
>
> 👀 Deberías ver …

**🧠 ¿Lo has pillado?** Pregunta corta.

<details>
<summary>Ver respuesta</summary>

Respuesta.

</details>

**📌 En una frase:** el apartado resumido.

### N. Para saber más

Lo no imprescindible, muy corto.

---

## Parte 2 · Lo que te llevas

**🎒 Si sólo te quedas con N cosas:**

1. …  (de 6 a 12, repitiendo las palabras clave tal cual)

**Chuleta**

| Quiero… | Escribo |
|---|---|
| … | … |  (≤ 8 filas; o un bloque de código con comentarios)

---

## Parte 3 · Practica

**Ejercicio 1 · Nombre.** Enunciado corto. *(Pista: apartado N.)*

---

## Parte 4 · Entrega

**Tarea Moodle: «…»**
Calificación de 0 a 10 · Se aprueba con 5.

1. …

**✅ Antes de entregar, comprueba:**

- [ ] …
````

### Tarea o práctica suelta

Como la tarea modelo del tema 05: cabecera con `tipo: Tarea` y `evaluacion`, «Antes de empezar»,
tres líneas de contexto, analogía, tabla fija, índice corto, apartados numerados en los que cada
paso es **comando → ❓ pregunta en una o dos frases**, una tabla final para resumir (cinco
palabras por casilla), la **plantilla del documento** que tienen que entregar, «Lo que
despista» (dos o tres cuadros) y «Entrega» con los criterios de Apto y el checklist. Menos de
300 líneas.

## 5. Dibujos

- SVG a mano en `images/` del tema, con las normas técnicas del `CLAUDE.md` (fondo `#fcfcfb`,
  paleta en orden, texto en negro o gris, `<title>` y `<desc>`, menos de 10 etiquetas, 13 px o más).
- Renderiza y mira **todos** los que uses, nuevos o reutilizados:
  `powershell -ExecutionPolicy Bypass -File guias\_herramientas\render-svg.ps1 "guias\<nivel>\<tema>\images\*.svg"`
  deja los PNG en `%TEMP%\guias-render\`. Ábrelos con la herramienta de leer imágenes y corrige
  lo que se corte, se solape o se salga.
- Las capturas reales (PNG) se quedan cuando enseñan lo que el alumno verá tal cual.

## 6. Comprueba

1. Enlaces, imágenes y anclajes: el script Bash del `CLAUDE.md`; tiene que salir vacío.
2. Métricas: Parte 1 ≤ 400 líneas (unas 350), guía entera ≤ 600, tablas ≤ 8, términos nuevos
   ≤ 10, un «🧪 Pruébalo» y un «📌 En una frase» por apartado, «Lo que te llevas» con 6-12
   frases.
3. Nada de emojis en los encabezados; nada de `[!TIP]` dentro de listas; nunca tres cuadros
   seguidos.
4. Lee la guía entera como el chaval de 16 años: ¿lo entiende a la primera? ¿sabe qué hacer ahora?

## 7. Integra y exporta

1. Añade la fila del tema al mapa de temas de `guias/LEEME.md` (y al itinerario del terminal si
   es una guía de consola).
2. Apunta en `guias/_docente/decisiones-y-pendientes.md` la decisión con fecha: qué se ha creado,
   qué se ha dejado fuera y por qué; y quita el tema de la lista de pendientes.
3. Exporta desde `guias`: `powershell -ExecutionPolicy Bypass -File _herramientas\exportar.ps1 -Solo "NN-*"`.
   Comprueba que el HTML nuevo está en `_moodle/` con las imágenes incrustadas y el PDF en
   `_moodle/pdf/`. Renderiza una o dos páginas del PDF para verlas.
4. Si rehaces una guía que ya existía: antes de tocarla, cópiala a
   `guias/_obsoleto/antes-de-<qué>-<AAAA-MM-DD>/<tema>/`.

## 8. Informe final a Mikel

Corto y concreto: ruta del fichero; lista de apartados; métricas (líneas, Parte 1, tablas,
términos nuevos); dibujos creados y reutilizados; qué se evalúa y cómo; decisiones tomadas por
falta de datos; lo que no se ha podido comprobar (comandos no probados, versiones). Nada de
repetir el contenido de la guía.

## Lo que no se hace

- No se inventan salidas de comandos: si no se puede comprobar, se describe qué pasa.
- No se usa Python (no hay en el equipo): exportar con `exportar.ps1`.
- No se hacen commits.
- No se toca `_moodle/` a mano ni las guías de otros temas (salvo para añadir un enlace a la nueva).
