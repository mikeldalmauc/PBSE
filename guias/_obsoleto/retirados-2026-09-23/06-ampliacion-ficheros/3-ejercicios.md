---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 2 · Intermedio
tema: "06"
tipo: Ejercicios
competencias: CM3, CM4
herramientas: H4 (terminal Linux y Bash)
duracion: a tu ritmo
---

# Ejercicios · Ampliación: buscar, encadenar y empaquetar en GNU/Linux

> **Nota.** Esta página acompaña a la [explicación del tema](1-explicacion.md). Léela antes de ponerte con los ejercicios.

## Ejercicios

Trabaja en tu máquina virtual `Mint-SMR`. Anota el comando **y** su salida. Varios ejercicios
usan la carpeta `practica/` que creaste en la guía básica.

### Bloque A — Buscar

1. Encuentra todos los ficheros `.conf` de `/etc` modificados en los últimos 30 días, sin que
    aparezcan los errores de «permiso denegado».
2. ¿Cuántas veces aparece la palabra `root` en `/etc/passwd`?
3. Muestra las líneas de `/etc/passwd` que **no** terminan en `/bin/false` ni en `/usr/sbin/nologin`.
4. Encuentra los cinco ficheros más grandes de tu carpeta personal.
5. Busca en `/etc` todos los ficheros en los que aparezca la palabra `network`, mostrando el
    nombre del fichero y el número de línea.

### Bloque B — Tuberías

6. Averigua cuántos usuarios del sistema tienen `/bin/bash` como shell.
7. Saca la lista de extensiones de fichero que hay en `/etc`, con cuántos ficheros hay de cada
    una, ordenada de más a menos.
    *Pista: `ls /etc | grep "\." | rev | cut -d. -f1 | rev | sort | uniq -c | sort -rn`*
    Escríbelo tú primero y luego compáralo.
8. Guarda en `informe.txt` el listado de `/var/log` **y** muéstralo por pantalla a la vez.

### Bloque C — Enlaces

9. Reproduce el experimento del [apartado 5](1-explicacion.md#5-enlaces-duros-y-simbólicos) y explica con tus
    palabras por qué el enlace duro sobrevive y el simbólico no.
10. Intenta crear un enlace duro a un **directorio**. ¿Qué error da? ¿Por qué crees que no está
    permitido?

### Bloque D — Copias

11. Empaqueta y comprime `practica/` en `copia-practica.tar.gz`. Lista su contenido sin
    extraerlo. Extráelo en `/tmp/prueba/`.
12. Haz una copia con `rsync` de `practica/` a `/tmp/espejo/`. Después borra un fichero del
    original y vuelve a lanzar `rsync`, primero con `--dry-run` y luego con `--delete`. Explica
    qué cambia.
13. ¿Cuánto ocupa `practica/` en total? ¿Y cada una de sus subcarpetas?

### Bloque E — Windows

14. Rellena **de memoria** la [tabla de equivalencias](2-chuleta.md#equivalencias-con-windows) (tapa las
    columnas de CMD y PowerShell) y luego corrígela con la guía, marcando lo que habías fallado.

### Reto final — El laberinto

El profesor deja en `/tmp/laberinto/` un árbol de carpetas con cientos de ficheros. Escondido hay
**un único fichero** que cumple las tres condiciones a la vez:

- pesa más de 1 MB,
- se modificó hace menos de 2 días,
- contiene en su interior la palabra `TESORO`.

**Encuéntralo con un solo comando** y di qué pone en la línea siguiente a `TESORO`.

*(Se puede resolver con `find` + `-exec grep`, o con `find` + tubería + `xargs`. Las dos valen.)*

## Entrega

**Voluntaria.** Mismo formato que la guía básica: Markdown exportado a PDF, con comando **y**
salida en bloques de código (no en captura), las respuestas razonadas de los ejercicios 9, 10 y 12,
y el reto final con el comando exacto y el resultado.

> **Aviso sobre la prueba práctica.** Se hace con los comandos estándar (`ls`, `cat`, `grep`,
> `find`, `cp`), **no** con los sustitutos modernos (`eza`, `bat`, `fd`, `rg`) de la [guía de personalización del terminal](../../3-avanzado/11-terminal-zsh-p10k/1-explicacion.md).
> Los sustitutos son cómodos, pero no están instalados en el 99 % de los servidores del mundo.
