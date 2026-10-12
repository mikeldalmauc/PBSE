---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 3 · Avanzado
tema: "12"
tipo: Ejercicios
caracter: TALLER — parte obligatoria (niveles 1 a 3) y parte de ampliación (niveles 4 a 6)
competencias: CM4
herramientas: H4 (terminal Linux)
duracion: 2 sesiones + trabajo autónomo
---

# Ejercicios · Taller: personaliza tu Linux

> **Nota.** Esta página acompaña a la [explicación del tema](1-explicacion.md). Léela antes de ponerte con los ejercicios.

## Concurso de escritorios

Última sesión del taller. Cada alumno o pareja presenta su escritorio en **3 minutos**.

**No gana el más bonito.** Se puntúa así, y la coevaluación la hace el resto de la clase:

| Criterio | Peso | Qué se mira |
|---|---|---|
| **Lo sabe explicar** | 35 % | Se le pregunta por dos ajustes al azar y explica qué fichero cambió y por qué |
| **Es reproducible** | 30 % | El script del nivel 6 funciona en una máquina limpia delante de todos |
| **Es útil** | 20 % | Los atajos y la información en pantalla resuelven algo real, no son decoración |
| **Está documentado** | 10 % | El README explica cómo instalarlo y cómo deshacerlo |
| **Impresiona** | 5 % | Sí, cuenta. Pero sólo esto |

> Que el apartado estético valga un 5 % es a propósito. Un escritorio espectacular copiado de un
> vídeo, que se rompe en la primera actualización y que su dueño no sabe explicar, es exactamente
> lo que **no** queremos aprender a hacer.

## Entregable

**Tarea Moodle: «Taller de personalización — entorno de trabajo documentado»**
Calificación de 0 a 10 · Se aprueba con 5.

**Parte obligatoria (niveles 1 a 3) — hasta 7 puntos**

1. Capturas del escritorio antes y después.
2. **Tabla de cambios**: para cada ajuste, qué has cambiado, **en qué fichero o comando**, y por
   qué. Sin la columna del fichero no puntúa: el objetivo del taller es saber dónde vive cada
   cosa.
3. Los cinco atajos de teclado que has configurado y en qué situación usas cada uno.
4. Tu configuración de `fastfetch` y una captura de la salida.
5. Tu script de bienvenida y una captura del inicio de sesión en consola.
6. **Comprobación de aislamiento**: crea un usuario nuevo, inicia sesión con él y demuestra con
   capturas que su escritorio está de fábrica. Explica por qué.

**Parte de ampliación (niveles 4 a 6) — hasta 3 puntos**

7. Una tubería propia de al menos tres comandos encadenados, con una explicación de qué hace cada
   eslabón.
8. Un script del nivel 5 funcionando, programado con `cron`, con el log que demuestre que se ha
   ejecutado solo al menos dos veces.
9. **La prueba de fuego del nivel 6**: vídeo o capturas de la restauración completa en una máquina
   limpia a partir de tu carpeta `dotfiles`, con el tiempo que has tardado.

*Instrumento de evaluación: lista de cotejo de la configuración y de su persistencia + rúbrica de
coevaluación del concurso de escritorios.*
