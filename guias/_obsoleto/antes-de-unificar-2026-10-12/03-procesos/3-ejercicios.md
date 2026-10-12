---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 1 · Básico
tema: "03"
tipo: Ejercicios
competencias: —
herramientas: H2 (CMD/PowerShell), H4 (terminal Linux)
duracion: 5 h
origen: traducción y ampliación de «3-Prosezu Kudeaketa.md» (curso anterior)
---

# Ejercicios · Procesos, hilos y planificación de la CPU

> **Nota.** Esta página acompaña a la [explicación del tema](1-explicacion.md). Léela antes de ponerte con los ejercicios.

## Ejercicios

1. Abre `htop` y responde: ¿cuántos procesos hay en total? ¿Cuántos están en ejecución
   (estado `R`)? ¿Por qué la diferencia es tan grande?
2. Dibuja el diagrama de Gantt de **Round Robin con cuanto = 4** para los procesos del
   [ejemplo del apartado 4](1-explicacion.md#ejemplo-resuelto) y calcula el tiempo medio de espera. Compáralo
   con FCFS y con SJF. ¿Cuál es mejor? ¿Y si los procesos fueran interactivos?
3. Con estos procesos y sus tiempos de llegada, resuelve FCFS y SJF no expropiativo:

   | Proceso | Llegada | Ráfaga |
   |---|---|---|
   | A | 0 | 6 |
   | B | 2 | 3 |
   | C | 4 | 8 |
   | D | 5 | 2 |

4. Lanza `sleep 300 &` tres veces. Localiza los tres PID con `ps` y termínalos de tres formas
   distintas: por PID, por nombre y con `pkill`.
5. Lanza `yes > /dev/null &`. Mira el consumo de CPU con `htop`. Bájale la prioridad con
   `renice` y observa si cambia algo. Termínalo.
6. Encuentra el proceso que más memoria consume en tu equipo con **un solo comando** en Linux
   y con **un solo comando** en PowerShell.
7. Explica qué es un proceso zombi y por qué no se puede «matar» con `kill -9`.

## Entregable

**Tarea Moodle: «Diagramas de planificación resueltos»**
Calificación de 0 a 10 · Se aprueba con 5.

1. Ejercicios 2, 3 y 7 resueltos, con los diagramas de Gantt dibujados y los tiempos calculados.
2. **Informe de proceso anómalo**: captura del administrador de tareas o de `htop` con el proceso
   más pesado de tu equipo, indicando PID, usuario, consumo de CPU y memoria, y una explicación
   de qué es ese proceso y si es normal que consuma eso.
3. Medidas antes y después de la demostración del apartado 9.
4. La [tabla de equivalencias](2-chuleta.md#tabla-de-equivalencias) rellenada de memoria y luego
   comprobada.

*Instrumento de evaluación: corrección de ejercicios y observación de la práctica.*
