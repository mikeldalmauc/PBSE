---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 1 · Básico
tema: "04"
tipo: Ejercicios
competencias: CM3, CM4
herramientas: H4 (terminal Linux y Bash)
duracion: 5 h
---

# Ejercicios · Comandos y gestión de ficheros en GNU/Linux

> **Nota.** Esta página acompaña a la [explicación del tema](1-explicacion.md). Léela antes de ponerte con los ejercicios.

## Índice

- [Ejercicios · Comandos y gestión de ficheros en GNU/Linux](#ejercicios--comandos-y-gestión-de-ficheros-en-gnulinux)
  - [Índice](#índice)
  - [Ejercicios](#ejercicios)
    - [Bloque A — Moverse y rutas](#bloque-a--moverse-y-rutas)
    - [Bloque B — Crear y organizar](#bloque-b--crear-y-organizar)
    - [Bloque C — Ver ficheros](#bloque-c--ver-ficheros)
    - [Bloque D — Comodines](#bloque-d--comodines)
    - [Bloque E — Ayuda](#bloque-e--ayuda)
  - [Reto: el laberinto](#reto-el-laberinto)
  - [Entregable](#entregable)

---

## Ejercicios

Trabaja en tu máquina virtual `Mint-SMR`, en el terminal. Anota el comando **y** lo que sale.

### Bloque A — Moverse y rutas

1. Averigua en qué carpeta estás. Ve a `/etc`, vuelve a tu carpeta personal y regresa a `/etc`
   con el comando más corto posible.
2. Lista el contenido de `/var/log` enseñando los ficheros ocultos y con los tamaños fáciles de
   leer.
3. Crea con **un solo comando** las carpetas `~/proyectos/web` y `~/docs`. Entra en
   `~/proyectos/web` y, sin salir de ahí, lista `~/docs` de **tres formas**: con ruta absoluta,
   con ruta relativa y con `~`.

### Bloque B — Crear y organizar

4. En tu carpeta personal, crea esta estructura con **un solo comando** y compruébala con `tree`:

```
practica/
├── documentos/
│   ├── 2025/
│   ├── 2026/
│   └── 2027/
├── imagenes/
└── scripts/
```

5. Crea de una vez los ficheros `nota1.txt` … `nota5.txt` dentro de `practica/documentos/2026/`.
6. Escribe tres líneas de texto en `nota1.txt` sin abrir ningún editor y muéstralas numeradas.
7. Copia `nota1.txt` a la carpeta `2027`. Después renombra `nota5.txt` a `final.txt`. Por último
   borra la carpeta `2025` con el comando que **sólo** borra carpetas vacías.

### Bloque C — Ver ficheros

8. Muestra las 5 primeras líneas de `/etc/passwd` y después las 3 últimas. ¿Cuántas líneas tiene
   en total?
9. Abre `/etc/passwd` con `less`, busca la palabra `alumno` y sal. Escribe qué teclas has usado.

### Bloque D — Comodines

10. Dentro de `practica/imagenes/` crea `foto1.jpg`, `foto2.jpg`, `foto10.jpg`, `doc1.pdf` y
    `doc2.pdf`. Escribe el comodín que elige:
    - sólo las tres imágenes
    - `foto1.jpg` y `foto2.jpg`, pero **no** `foto10.jpg`
    - todo lo que empieza por `doc`

    Compruébalos **con `echo`** antes de dar la respuesta, y pega lo que sale.
11. Mueve los dos PDF a `practica/documentos/` con un solo comando y un comodín.

### Bloque E — Ayuda

12. Con `man ls` averigua qué hacen las opciones `-S` y `-r`. Úsalas para listar `/etc` del
    fichero más pequeño al más grande.

## Reto: el laberinto

Descarga `laberinto.sh` de Moodle. El navegador lo guarda en `~/Descargas`: muévelo a tu
carpeta personal con `mv` y ejecútalo desde allí:

```bash
bash laberinto.sh
```

Te crea la carpeta `~/laberinto`, con un tesoro escondido. Para empezar:

```bash
cat ~/laberinto/entrada/LEEME.txt
```

Sigue las pistas. Sólo necesitas comandos de esta guía. Cuando encuentres el tesoro, **cópialo a
tu carpeta personal** con el nombre `tesoro-TUNOMBRE.txt`.

*Cada vez que ejecutas el script, la clave del tesoro cambia: no sirve copiar la de un compañero.*

## Entregable

**Tarea Moodle: «Cuestionario de consola + práctica de gestión de ficheros»**
Calificación de 0 a 10 · Se aprueba con 5 · Finalización automática por nota de aprobado.

Un documento Markdown exportado a PDF con:

| Parte | Qué entregas | Puntos |
|---|---|---|
| Ejercicios | Los 12 ejercicios: comando **y** salida, en bloque de código (no en captura) | 6 |
| Reto | Los comandos que has usado en el laberinto, en orden, y la clave del tesoro | 2 |
| Chuleta | **Tu propia chuleta**: los 15 comandos que más vas a usar, con una línea cada uno. Hazla tú, no la copies de aquí: es la que podrás usar en la prueba práctica | 2 |

> **Cómo pasar la salida al documento.** Selecciona el texto en el terminal, `Ctrl`+`Shift`+`C`,
> y pégalo en VS Code dentro de un bloque de código. Sale limpio y se lee mejor que una captura.

*Instrumento de evaluación: cuestionario autocorregible + prueba práctica en consola.*
