---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
semana: 13 · se apoya en la 11 y se retoma en la 22 y en la 31
trimestre: T1
bloque: 4. Explotación
competencias: CM3, CM4
herramientas: H4 (terminal Linux y Bash)
duracion: 5 h
---

# Comandos y gestión de ficheros en GNU/Linux

> **Dónde estamos.** Semana 13 · 1.er trimestre · Bloque 4 (Explotación) · **CM3** y **CM4**.
> Lo mínimo para trabajar en el terminal: moverte, crear, ver, copiar, mover y borrar ficheros.
> Todo se hace en tu máquina virtual de Linux Mint (`Mint-SMR`).
> Cuando lo domines, sigue con la [guía de ampliación](s13-ampliacion-ficheros-linux.md): buscar
> ficheros, tuberías, comprimir y la tabla de equivalencias con CMD y PowerShell.

> **Analogía.** El explorador de archivos es como pedir la comida señalando la carta con el dedo:
> funciona, pero sólo puedes pedir lo que está en la foto. El terminal es hablar el idioma: al
> principio cuesta más, pero puedes pedir «todos los platos sin gluten de menos de 10 euros,
> ordenados por precio». Eso, señalando la carta, no hay manera.

## Índice

- [1. Cómo se escribe un comando](#1-cómo-se-escribe-un-comando)
- [2. Pedir ayuda](#2-pedir-ayuda)
- [3. El árbol de directorios](#3-el-árbol-de-directorios)
- [4. Moverse: `pwd`, `cd`, `ls`](#4-moverse-pwd-cd-ls)
- [5. Rutas absolutas y relativas](#5-rutas-absolutas-y-relativas)
- [6. Crear ficheros y carpetas](#6-crear-ficheros-y-carpetas)
- [7. Ver el contenido de un fichero](#7-ver-el-contenido-de-un-fichero)
- [8. Copiar, mover y borrar](#8-copiar-mover-y-borrar)
- [9. Comodines](#9-comodines)
- [10. Chuleta](#10-chuleta)
- [Ejercicios](#ejercicios)
- [Reto: el laberinto](#reto-el-laberinto)
- [Entregable](#entregable)

---

## 1. Cómo se escribe un comando

```
comando  -opciones  argumentos
   │         │           │
   │         │           └── sobre qué actúa: un fichero, una carpeta...
   │         └── cómo lo hace; empiezan por guion
   └── el programa que se ejecuta
```

```bash
ls -l /etc       # comando ls, opción -l, argumento /etc
ls -l -a /etc    # dos opciones
ls -la /etc      # las mismas dos opciones, juntas: es lo mismo
```

Cuatro reglas que ahorran disgustos:

1. **Mayúsculas y minúsculas son distintas.** `Documentos` y `documentos` son dos carpetas
   diferentes.
2. **Los espacios separan.** Si un nombre tiene espacios, va entre comillas:
   `cat "mi informe.txt"`. Mejor todavía: no pongas espacios en los nombres.
3. **No hay papelera.** Lo que borras con `rm` desaparece para siempre.
4. **Si no dice nada, ha ido bien.** `cp` o `mkdir` no responden nada cuando funcionan. Si algo
   falla, te lo dicen.

Las teclas que vas a usar todo el rato:

| Tecla | Para qué |
|---|---|
| `Tab` | Completa nombres de comandos, ficheros y carpetas. Dos veces: enseña las opciones |
| `↑` / `↓` | Recupera los comandos que ya has escrito |
| `Ctrl`+`C` | Para un comando que no termina |
| `Ctrl`+`L` | Limpia la pantalla (lo mismo que `clear`) |
| `Ctrl`+`Shift`+`C` / `V` | Copiar / pegar **dentro del terminal** (sin `Shift` no funciona) |

> **El tabulador es un corrector gratis.** Si pulsas `Tab` y no completa, es que ese fichero no
> existe o no estás en la carpeta que crees. Acostúmbrate a escribir tres letras y pulsar `Tab`.

---

## 2. Pedir ayuda

```bash
ls --help      # resumen rápido de las opciones
man ls         # el manual completo
```

Dentro de `man`:

| Tecla | Qué hace |
|---|---|
| `Espacio` / `b` | Página siguiente / anterior |
| `/palabra` | Buscar esa palabra |
| `n` | Siguiente resultado de la búsqueda |
| `q` | **Salir** |

> Si te quedas «atrapado» dentro de algo que ocupa toda la pantalla (`man`, `less`), prueba `q`.
> Si es un comando que no termina, `Ctrl`+`C`.

---

## 3. El árbol de directorios

En Windows hay varios árboles: `C:\`, `D:\`, `E:\`. En Linux hay **uno solo**, que empieza en `/`
(la **raíz**), y todo cuelga de ahí, también los pendrives: cuando conectas uno, aparece como una
carpeta dentro de `/media`.

```
/
├── bin      → programas básicos
├── boot     → arranque del sistema
├── dev      → dispositivos: tu disco es /dev/sda
├── etc      → la configuración del sistema
├── home     → carpetas personales: /home/alumno
├── media    → pendrives y discos que conectas
├── root     → carpeta personal del administrador
├── tmp      → temporales; se vacía al reiniciar
├── usr      → programas instalados
└── var      → datos que cambian, como los registros (/var/log)
```

Esta organización es casi igual en todas las distribuciones: lo que aprendas en Mint te sirve en
Arch dentro de unas semanas.

> **En Linux casi todo es un fichero.** Tu disco es un fichero (`/dev/sda`) y la información del
> procesador se lee de otro (`/proc/cpuinfo`). Por eso, sabiendo manejar ficheros, puedes
> administrar todo el sistema.

Compruébalo:

```bash
ls /
ls /home
head /proc/cpuinfo
```

---

## 4. Moverse: `pwd`, `cd`, `ls`

```bash
pwd        # ¿dónde estoy?
cd /etc    # ir a /etc
cd         # volver a mi carpeta personal
cd ..      # subir un nivel
cd -       # volver a la carpeta en la que estaba antes
```

Para ver qué hay en una carpeta:

```bash
ls         # lo que hay aquí
ls -l      # en lista: permisos, propietario, tamaño y fecha
ls -a      # también los ficheros ocultos
ls -lh     # tamaños fáciles de leer (K, M, G)
ls -lah    # todo junto: la que más vas a usar
ls /etc    # lo que hay en otra carpeta, sin moverte de donde estás
```

> **Ficheros ocultos.** En Linux un fichero está oculto si **su nombre empieza por punto**, por
> ejemplo `.bashrc`. No es un permiso especial, sólo una costumbre: `ls` no los enseña si no le
> pones `-a`.

Para ver las carpetas en forma de árbol:

```bash
sudo apt install tree   # se instala una sola vez
tree                    # el árbol desde donde estás
tree -L 2               # sólo dos niveles de profundidad
```

---

## 5. Rutas absolutas y relativas

Una **ruta** es la dirección de un fichero o de una carpeta.

| Tipo | Empieza por | Ejemplo | Significa |
|---|---|---|---|
| **Absoluta** | `/` | `/home/alumno/docs/a.txt` | Desde la raíz. Vale estés donde estés |
| **Relativa** | cualquier otra cosa | `docs/a.txt` | Desde la carpeta en la que estás ahora |

| Símbolo | Significa |
|---|---|
| `.` | La carpeta en la que estoy |
| `..` | La carpeta de arriba (la «madre») |
| `~` | Mi carpeta personal (`/home/alumno`) |
| `/` | La raíz del sistema |

> **Analogía.** Una ruta absoluta es una dirección completa: «calle Mayor 3, Zornotza». Llega el
> cartero salga de donde salga. Una ruta relativa es «dos portales más abajo»: es más corta, pero
> sólo sirve si sabes desde dónde sales.

Ejemplo: estás en `/home/alumno/proyectos/web` y quieres ver `/home/alumno/docs/informe.txt`.

```bash
cat /home/alumno/docs/informe.txt   # absoluta
cat ../../docs/informe.txt          # relativa: subo dos niveles y bajo a docs
cat ~/docs/informe.txt              # con el atajo ~
```

Las tres hacen lo mismo. Si no sabes dónde estás, `pwd`.

---

## 6. Crear ficheros y carpetas

```bash
touch nota.txt                 # crear un fichero vacío
touch a.txt b.txt c.txt        # varios a la vez
mkdir proyecto                 # crear una carpeta
mkdir -p proyecto/src/css      # crear la ruta entera, aunque falten carpetas por el camino
```

> Usa `mkdir -p` casi siempre: crea las carpetas que falten por el camino y no da error si la
> carpeta ya existe.

Con **llaves** puedes crear muchas cosas de golpe:

```bash
mkdir -p informes/{2025,2026,2027}   # tres carpetas: informes/2025, informes/2026...
touch prueba{1..5}.txt               # prueba1.txt, prueba2.txt ... prueba5.txt
```

Escribir en un fichero sin abrir un editor:

```bash
echo "Hola" > nota.txt           # escribe en el fichero (lo que hubiera antes, se pierde)
echo "Otra línea" >> nota.txt    # añade al final
```

> ⚠️ **Un `>` borra, dos `>>` añaden.** Si te equivocas y pones uno solo, el contenido anterior
> del fichero desaparece. Sin preguntar.

Para editar un fichero de verdad, **nano**:

```bash
nano nota.txt    # Ctrl+O guarda (y Enter para confirmar), Ctrl+X sale
```

> Si algún día te encuentras sin querer dentro de **vim** (una pantalla de la que no sabes salir):
> pulsa `Esc`, escribe `:q!` y pulsa `Enter`. Sales sin guardar nada.

---

## 7. Ver el contenido de un fichero

```bash
cat nota.txt             # todo de golpe (para ficheros cortos)
cat -n nota.txt          # con el número de cada línea
less /etc/passwd         # página a página (para ficheros largos)
head /etc/passwd         # las 10 primeras líneas
head -n 3 /etc/passwd    # las 3 primeras
tail -n 3 /etc/passwd    # las 3 últimas
wc -l /etc/passwd        # cuántas líneas tiene
```

> `less` usa las mismas teclas que `man`: `Espacio` para avanzar, `/palabra` para buscar y `q`
> para salir. Si un fichero no cabe en la pantalla, usa `less` y no `cat`.

---

## 8. Copiar, mover y borrar

### Copiar

```bash
cp origen.txt copia.txt       # copiar un fichero
cp a.txt b.txt carpeta/       # copiar varios a una carpeta
cp -r carpeta/ copia/         # copiar una carpeta entera: hace falta -r
cp -i origen.txt copia.txt    # -i: pregunta antes de machacar un fichero que ya existe
```

### Mover y renombrar

En Linux **mover y renombrar es el mismo comando**: `mv`.

```bash
mv viejo.txt nuevo.txt        # renombrar
mv fichero.txt carpeta/       # mover
mv carpeta1 carpeta2          # con las carpetas no hace falta -r
```

### Borrar

```bash
rm fichero.txt        # borrar un fichero
rm -i fichero.txt     # preguntando antes
rm -r carpeta/        # borrar una carpeta con todo lo que tenga dentro
rmdir carpeta         # borrar una carpeta, pero SÓLO si está vacía
```

> ⚠️ **`rm` no tiene papelera ni «deshacer».** Dos costumbres que te van a salvar alguna vez:
>
> 1. **Antes de borrar, lista.** Cambia `rm` por `ls` en el mismo comando. Si `ls` te enseña lo
>    que esperabas, entonces sí, `rm`.
> 2. **Mira los espacios.** `rm -r ~/tmp` y `rm -r ~/ tmp` se parecen mucho, pero el segundo
>    borra **todo lo que hay en tu carpeta personal**.
>
> Si ves `rm -rf` en internet, no lo copies sin entender qué borra: no pregunta nada.

---

## 9. Comodines

Los comodines sirven para elegir muchos ficheros a la vez sin escribir sus nombres.

| Comodín | Significa | Ejemplo |
|---|---|---|
| `*` | Cualquier cosa (también nada) | `*.txt` → todos los que terminan en `.txt` |
| `?` | **Un** carácter, ni más ni menos | `foto?.jpg` → `foto1.jpg`, pero no `foto10.jpg` |
| `[0-9]` | Un carácter de ese rango | `informe[0-9].pdf` |
| `{a,b}` | Cada una de las opciones | `*.{jpg,png}` → los `.jpg` y los `.png` |

**Antes de usar un comodín para borrar o mover, pruébalo con `echo` o con `ls`:**

```bash
echo *.txt          # te enseña exactamente qué ficheros va a coger
rm *.txt            # ahora sí, sabiendo lo que haces
```

Ejemplos:

```bash
ls *.txt                  # todos los .txt
cp *.jpg imagenes/        # todas las imágenes a una carpeta
ls foto?.jpg              # foto1.jpg, foto2.jpg... pero no foto10.jpg
rm *.tmp                  # borrar todos los temporales
```

---

## 10. Chuleta

```
AYUDA                               VER
  cmd --help    resumen               cat f         todo de golpe
  man cmd       manual (q=salir)      less f        página a página
  Tab           completar             head -n 5 f   primeras líneas
  ↑             comando anterior      tail -n 5 f   últimas líneas
  Ctrl+C        parar                 wc -l f       contar líneas

NAVEGAR                             CREAR
  pwd           dónde estoy           touch f       fichero vacío
  cd ruta       ir                    mkdir -p a/b  carpetas
  cd            a mi carpeta          echo x > f    escribir (borra)
  cd ..         subir                 echo x >> f   añadir al final
  cd -          volver                nano f        editar
  ls -lah       listar todo
  tree -L 2     árbol

COPIAR / MOVER / BORRAR             COMODINES
  cp o d        copiar                *             lo que sea
  cp -r o d     copiar carpeta        ?             un carácter
  mv o d        mover o renombrar     [0-9]         un dígito
  rm -i f       borrar preguntando    {a,b}         varias opciones
  rm -r c       borrar carpeta        echo *.txt    ¡probar antes!
  rmdir c       borrar si está vacía
```

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

---

## Reto: el laberinto

Descarga `s13-laberinto.sh` de Moodle. El navegador lo guarda en `~/Descargas`: muévelo a tu
carpeta personal con `mv` y ejecútalo desde allí:

```bash
bash s13-laberinto.sh
```

Te crea la carpeta `~/laberinto`, con un tesoro escondido. Para empezar:

```bash
cat ~/laberinto/entrada/LEEME.txt
```

Sigue las pistas. Sólo necesitas comandos de esta guía. Cuando encuentres el tesoro, **cópialo a
tu carpeta personal** con el nombre `tesoro-TUNOMBRE.txt`.

*Cada vez que ejecutas el script, la clave del tesoro cambia: no sirve copiar la de un compañero.*

---

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
