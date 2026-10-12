---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 1 · Básico
tema: "01"
tipo: Ejercicios
competencias: — (se usa en todos los entregables del módulo)
herramientas: Visual Studio Code + extensiones de Markdown
duracion: 3 h
---

# Ejercicios · Guía básica de Markdown

> **Nota.** Esta página acompaña a la [explicación del tema](1-explicacion.md). Léela antes de ponerte con los ejercicios.

## Práctica

**Actividad de clase: «Ficha técnica de mi puesto en Markdown»**
Calificación de 0 a 10 · Se aprueba con 5. Es el ensayo del manual de la [guía de instalación de Mint](../02-instalar-mint-virtualbox/1-explicacion.md):
aquí se practica el formato, allí se evalúa el contenido.

Crea una carpeta `ficha-puesto/` con un documento `ficha-puesto.md` que describa el ordenador del
aula en el que trabajas. Debe contener:

1. Título, tu nombre y grupo, e **índice automático**.
2. Un apartado con una **tabla** del hardware: procesador, memoria RAM, disco y sistema operativo
   con su versión.
3. Un apartado **«Cómo he obtenido los datos»** con una **lista numerada** de pasos que incluya
   **al menos dos capturas** dentro de los pasos, con texto alternativo descriptivo y pie de figura
   numerado, **sin que se rompa la numeración**.
4. La salida del comando `systeminfo` (ejecútalo en CMD) con **solo las líneas del sistema
   operativo y la memoria**, en un bloque de código de texto. No en captura.
5. Un **aviso** con `>` sobre algo que te haya despistado.
6. Un **enlace externo** a la página del fabricante del procesador y un **enlace interno** a otro
   apartado del documento.
7. Una lista de **tareas** con lo que has comprobado antes de entregar.

Entrega en Moodle **dos ficheros**: el PDF exportado y la carpeta `ficha-puesto/` comprimida en
`.zip` (con el `.md` y la carpeta `images/`). El `.md` se entrega porque parte de los criterios se
comprueban en el fichero fuente.

| Criterio | Puntos |
|---|---|
| **Estructura:** un solo `#`, apartados `##` y `###` sin saltos de nivel, índice automático con enlaces que funcionan | 2 |
| **Tabla** de hardware correcta y legible | 1,5 |
| **Lista numerada** con capturas dentro, numeración continua, texto alternativo descriptivo y pies de figura | 2 |
| **Código:** salida de `systeminfo` en bloque de texto, recortada a lo que se pide | 1,5 |
| **Enlaces y aviso:** enlace externo, enlace interno y aviso bien formados | 1 |
| **PDF limpio:** sin encabezados ni pies del navegador, imágenes visibles, nada cortado entre páginas | 2 |
| **Total** | **10** |

El criterio de fondo es el mismo que el de todos los manuales del módulo: **otra persona debe
poder leer tu documento y encontrar cada dato sin preguntarte nada**.
