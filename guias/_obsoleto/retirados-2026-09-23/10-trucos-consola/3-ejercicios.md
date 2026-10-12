---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 3 · Avanzado
tema: "10"
tipo: Ejercicios
competencias: CM4
herramientas: H4 (terminal Linux y Bash)
duracion: 2-3 h, o repartido en sesiones de 20 minutos
---

# Ejercicios · Trucos y superpoderes de la consola

> **Nota.** Esta página acompaña a la [explicación del tema](1-explicacion.md). Léela antes de ponerte con los ejercicios.

## El desafío de la consola

Actividad de aula por equipos, cronometrada. Cada reto vale un punto; gana el equipo que más
consigue en 30 minutos. **Sólo vale una línea de comandos por reto.**

1. Crea 100 ficheros llamados `dato001.txt` … `dato100.txt` de una sola vez.
2. Borra sólo los que tengan número par. *(pista: `{002..100..2}`)*
3. Cuenta cuántos usuarios del sistema tienen su carpeta personal dentro de `/home`.
4. Muestra las 5 extensiones de fichero más frecuentes de `/etc`.
5. Encuentra el fichero más grande de todo `/var`, ignorando los errores de permisos.
6. Escribe un comando que muestre `CORRECTO` si `/etc/passwd` existe y `FALLO` si no.
7. Renombra todos los `.txt` de una carpeta a `.md` conservando el nombre.
8. Muestra la lista de procesos ordenada por consumo de CPU, sólo el nombre y el porcentaje, los
   5 primeros.
9. Cuenta cuántas líneas en total tienen todos los ficheros `.conf` de `/etc`.
10. Sin usar `nano` ni ningún editor, crea un fichero con tres líneas de texto.
11. Averigua qué día de la semana caerá el 1 de enero de 2030.
12. Copia `/etc/passwd` a tu carpeta añadiéndole la fecha de hoy al nombre, en un solo comando.
13. Muestra la diferencia entre el listado de `/bin` y el de `/usr/bin` sin crear ficheros
    temporales.
14. Deja corriendo un comando que te muestre cada 2 segundos cuántos ficheros hay en `/tmp`.
15. **Reto final:** de `/etc/passwd`, saca la lista de shells distintos que se usan, cuántos
    usuarios usan cada uno, ordenado de más a menos, y guárdalo en un fichero **y** muéstralo por
    pantalla al mismo tiempo.

## Entregable

**Tarea Moodle: «Trucos de consola»** — se puede plantear como actividad de ampliación o
integrarla en el entregable del taller de personalización.
Calificación de 0 a 10 · Se aprueba con 5.

1. Los 15 retos del desafío resueltos: comando y salida.
2. **Desarma tres recetas** del [apartado 9](2-chuleta.md#quince-recetas-de-una-línea) a tu elección:
   ejecuta la tubería quitando un eslabón cada vez, pega la salida de cada paso y explica qué
   aporta cada trozo.
3. Captura de una sesión de `tmux` con la pantalla dividida en al menos dos paneles, y
   demostración de que sobrevive a cerrar el terminal (`tmux ls` después de cerrarlo).
4. **Tus cinco atajos favoritos** de este documento, con una frase explicando en qué situación
   real te han ahorrado tiempo esta semana. Tienen que ser situaciones tuyas, no inventadas.

*Instrumento de evaluación: lista de cotejo de los retos + observación en el aula durante el
desafío.*
