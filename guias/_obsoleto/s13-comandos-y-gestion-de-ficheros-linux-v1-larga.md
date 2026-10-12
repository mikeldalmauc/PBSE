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
> Es la guía de referencia del terminal: la que vas a tener abierta el resto del curso.
> La semana 12 hiciste lo mismo en CMD y PowerShell; aquí está el equivalente en Linux, y al
> final tienes la [tabla de equivalencias](#18-equivalencias-con-windows) entre los tres.

> **Analogía.** El explorador de archivos es como pedir la comida señalando la carta con el dedo:
> funciona, pero sólo puedes pedir lo que está en la foto. El terminal es hablar el idioma: al
> principio cuesta más, pero puedes pedir «todos los platos sin gluten de menos de 10 euros,
> ordenados por precio». Eso, señalando la carta, no hay manera.

## Índice

- [1. Anatomía de un comando](#1-anatomía-de-un-comando)
- [2. Pedir ayuda](#2-pedir-ayuda)
- [3. El árbol de directorios](#3-el-árbol-de-directorios)
- [4. Moverse: `pwd`, `cd`, `ls`](#4-moverse-pwd-cd-ls)
- [5. Rutas absolutas y relativas](#5-rutas-absolutas-y-relativas)
- [6. Crear ficheros y carpetas](#6-crear-ficheros-y-carpetas)
- [7. Ver el contenido de un fichero](#7-ver-el-contenido-de-un-fichero)
- [8. Copiar, mover, renombrar y borrar](#8-copiar-mover-renombrar-y-borrar)
- [9. Comodines: el superpoder del terminal](#9-comodines-el-superpoder-del-terminal)
- [10. Buscar ficheros: `find`](#10-buscar-ficheros-find)
- [11. Buscar dentro de los ficheros: `grep`](#11-buscar-dentro-de-los-ficheros-grep)
- [12. Redirección y tuberías](#12-redirección-y-tuberías)
- [13. Enlaces duros y simbólicos](#13-enlaces-duros-y-simbólicos)
- [14. Metadatos y atributos](#14-metadatos-y-atributos)
- [15. Comprimir y empaquetar](#15-comprimir-y-empaquetar)
- [16. Copias de seguridad con `rsync`](#16-copias-de-seguridad-con-rsync)
- [17. Espacio en disco](#17-espacio-en-disco)
- [18. Equivalencias con Windows](#18-equivalencias-con-windows)
- [19. Chuleta](#19-chuleta)
- [Ejercicios](#ejercicios)
- [Entregable](#entregable)

---

## 1. Anatomía de un comando

```
comando  -opciones  --opciones-largas  argumentos
   │         │             │               │
   │         │             │               └── sobre qué actúa
   │         │             └── nombre completo de la opción
   │         └── letra suelta; varias se pueden juntar
   └── el programa que se ejecuta
```

```bash
ls -l -a -h /etc        # tres opciones separadas
ls -lah /etc            # exactamente lo mismo, juntas
ls --all --human-readable /etc   # lo mismo con nombres largos
```

Cuatro reglas que ahorran disgustos:

1. **Linux distingue mayúsculas de minúsculas.** `Documentos` y `documentos` son dos carpetas
   distintas. Windows no lo hace; Linux sí.
2. **Los espacios separan argumentos.** Un fichero llamado `mi informe.txt` son *dos* argumentos
   si no lo entrecomillas: `cat "mi informe.txt"` o `cat mi\ informe.txt`.
3. **No hay papelera.** `rm` borra de verdad. En el escritorio gráfico sí hay papelera; en el
   terminal, no.
4. **El silencio es buena señal.** Muchos comandos, cuando funcionan, no dicen nada. Si `cp` no
   responde nada, es que ha copiado. Si algo va mal, te lo dice.

**El truco más rentable de toda la guía: el tabulador.** Escribe las tres primeras letras y pulsa
`Tab`. Completa nombres de comandos, de ficheros y de rutas. Púlsalo dos veces y te enseña todas
las opciones posibles. No sólo ahorra tiempo: **si el tabulador no completa, es que ese fichero no
existe o no estás donde crees**. Es un corrector de erratas gratis.

---

## 2. Pedir ayuda

```bash
man ls              # manual completo
ls --help           # resumen rápido de las opciones
help cd             # para comandos internos del shell (cd, export, alias...)
apropos permisos    # buscar comandos por tema
type ls             # ¿qué es esto: programa, alias o interno?
which ls            # ¿en qué carpeta está el programa?
```

Dentro de `man`:

| Tecla | Qué hace |
|---|---|
| `Espacio` / `b` | Página siguiente / anterior |
| `/palabra` | Buscar hacia adelante |
| `n` / `N` | Siguiente / anterior coincidencia |
| `g` / `G` | Ir al principio / al final |
| `q` | **Salir** |

> **Por qué `type` importa.** En la semana 29 vas a poner alias. A partir de ahí, `ls` puede no
> ser el `ls` real sino tu alias. `type ls` te lo dice, y `\ls` ejecuta el original.

Y para cuando el manual es demasiado:

```bash
sudo pacman -S tealdeer   # Arch
sudo apt install tldr     # Ubuntu
tldr --update
tldr tar                  # ejemplos prácticos en vez de 400 líneas de manual
```

---

## 3. El árbol de directorios

En Windows hay varios árboles: `C:\`, `D:\`, `E:\`. En Linux hay **uno solo**, que empieza en `/`,
y todo lo demás cuelga de ahí — incluidos los pendrives y los discos externos, que se «montan»
dentro de una carpeta.

```
/
├── bin      → programas básicos (enlace a /usr/bin)
├── boot     → núcleo y gestor de arranque
├── dev      → los dispositivos: /dev/sda es tu disco
├── etc      → TODA la configuración del sistema, en ficheros de texto
├── home     → carpetas personales:  /home/alumno
├── media    → dispositivos extraíbles montados automáticamente
├── mnt      → puntos de montaje manuales
├── opt      → software de terceros
├── proc     → información del núcleo en vivo (no ocupa disco)
├── root     → carpeta personal del administrador
├── run      → estado de los servicios en marcha
├── srv      → datos servidos (web, ftp)
├── sys      → información del hardware
├── tmp      → temporales; se vacía al reiniciar
├── usr      → programas y librerías instalados
└── var      → datos que cambian: registros (/var/log), colas, cachés
```

Esta estructura se llama **FHS** (*Filesystem Hierarchy Standard*) y es prácticamente igual en
todas las distribuciones. Por eso un administrador que sabe Ubuntu se maneja en Arch.

> **Todo es un fichero.** Tu disco duro es un fichero (`/dev/sda`). El teclado es un fichero. La
> temperatura de la CPU se lee de un fichero en `/sys`. Incluso «la nada» es un fichero
> (`/dev/null`). Esto no es una metáfora: puedes hacer `cat /dev/urandom` y ver qué pasa (después
> pulsa `Ctrl` + `C`). Es la idea central del diseño de Unix, y explica por qué basta con saber
> manejar ficheros para administrar todo el sistema.

Compruébalo:

```bash
ls /
ls /etc | head -n 30
cat /proc/cpuinfo | head -n 20
cat /proc/meminfo | head -n 5
```

---

## 4. Moverse: `pwd`, `cd`, `ls`

```bash
pwd              # ¿dónde estoy?
cd /etc          # ir a /etc
cd               # ir a mi carpeta personal
cd ~             # lo mismo
cd ..            # subir un nivel
cd ../..         # subir dos
cd -             # volver a la carpeta ANTERIOR (muy útil)
```

### `ls` y sus opciones

```bash
ls                  # nombres, en columnas
ls -l               # formato largo: permisos, propietario, tamaño, fecha
ls -a               # incluye los ocultos (los que empiezan por punto)
ls -h               # tamaños legibles (K, M, G) — sólo tiene efecto con -l
ls -t               # ordena por fecha de modificación, del más nuevo al más viejo
ls -S               # ordena por tamaño
ls -r               # invierte el orden
ls -R               # recursivo: entra en los subdirectorios
ls -d carpeta       # información DE la carpeta, no de su contenido
ls -i               # muestra el número de inodo
```

Las tres combinaciones que vas a usar de verdad:

```bash
ls -lah             # todo, largo, con tamaños legibles
ls -lt              # lo más reciente arriba: "¿qué he tocado hace un rato?"
ls -lhS             # lo más grande arriba: "¿qué me está llenando el disco?"
```

Ver el árbol:

```bash
sudo pacman -S tree      # Arch
sudo apt install tree    # Ubuntu

tree                     # árbol completo desde aquí
tree -L 2                # sólo dos niveles de profundidad
tree -d                  # sólo directorios
tree -a                  # incluye ocultos
```

> **Ficheros ocultos.** En Linux no hay un atributo «oculto» como en Windows: un fichero está
> oculto si **su nombre empieza por punto**. Es una convención, no un permiso. Por eso los
> ficheros de configuración de tu usuario se llaman `.bashrc`, `.zshrc`, `.config`… y por eso se
> llaman *dotfiles*.

---

## 5. Rutas absolutas y relativas

| Tipo | Empieza por | Ejemplo | Significado |
|---|---|---|---|
| **Absoluta** | `/` | `/home/alumno/docs/a.txt` | Desde la raíz. Vale desde cualquier sitio |
| **Relativa** | cualquier otra cosa | `docs/a.txt` | Desde donde estés ahora |

| Símbolo | Significa |
|---|---|
| `.` | El directorio actual |
| `..` | El directorio padre |
| `~` | Mi carpeta personal (`/home/alumno`) |
| `~otro` | La carpeta personal de otro usuario |
| `-` | (sólo con `cd`) el directorio anterior |
| `/` | La raíz del sistema |

**Ejercicio mental.** Estás en `/home/alumno/proyectos/web`. Escribe la ruta a
`/home/alumno/docs/informe.txt` de las dos formas:

```bash
cat /home/alumno/docs/informe.txt     # absoluta
cat ../../docs/informe.txt            # relativa
cat ~/docs/informe.txt                # con atajo
```

> **Cuándo usar cada una.** En un **script** usa siempre rutas absolutas: el script puede
> ejecutarse desde cualquier directorio, y desde `cron` se ejecuta desde uno que no esperas
> (semana 32). Escribiendo a mano, las relativas son mucho más cómodas.

---

## 6. Crear ficheros y carpetas

```bash
touch nota.txt                    # crear un fichero vacío
touch a.txt b.txt c.txt           # varios de una vez
touch informe.txt                 # si ya existe, sólo actualiza su fecha

mkdir proyecto                    # crear una carpeta
mkdir -p proyecto/src/css         # crear toda la ruta, aunque falten niveles
mkdir -p informes/{2025,2026,2027}  # tres carpetas de golpe (expansión de llaves)
```

> `mkdir -p` es el que quieres casi siempre: no falla si la carpeta ya existe, y crea los
> directorios intermedios que falten. Sin `-p`, `mkdir a/b/c` falla si `a/b` no existe.

Escribir contenido sin abrir un editor:

```bash
echo "Hola" > nota.txt            # crear/sobrescribir
echo "Otra línea" >> nota.txt     # añadir al final

cat > lista.txt << 'FIN'
manzana
pera
plátano
FIN
```

Editores de texto en consola:

| Editor | Cómo salir | Nota |
|---|---|---|
| `nano fichero` | `Ctrl`+`O` guarda, `Ctrl`+`X` sale | El más fácil. Empieza por aquí |
| `micro fichero` | `Ctrl`+`S`, `Ctrl`+`Q` | Como nano pero con atajos de siempre |
| `vim fichero` | `Esc` y luego `:q!` (salir sin guardar) o `:wq` (guardar y salir) | **Apunta esto**: te lo vas a encontrar sin querer |

---

## 7. Ver el contenido de un fichero

```bash
cat fichero.txt          # vuelca todo de golpe (ficheros cortos)
cat -n fichero.txt       # numerando las líneas
less fichero.txt         # paginado, con búsqueda. 'q' para salir
head fichero.txt         # las 10 primeras líneas
head -n 3 fichero.txt    # las 3 primeras
tail fichero.txt         # las 10 últimas
tail -n 50 fichero.txt   # las 50 últimas
tail -f /var/log/syslog  # SEGUIR el fichero en vivo. Ctrl+C para parar
wc -l fichero.txt        # contar líneas
wc -w fichero.txt        # contar palabras
file fichero             # ¿qué tipo de fichero es realmente?
```

> **`tail -f` es el comando del administrador de sistemas.** Lo dejas corriendo sobre un registro
> mientras provocas el error, y ves aparecer el mensaje en el momento. Pruébalo: abre dos
> terminales, en uno `tail -f /var/log/pacman.log` y en el otro instala un paquete.

> **`file` mira dentro, no la extensión.** En Windows un fichero es una imagen porque se llama
> `.jpg`. En Linux, `file` lee los primeros bytes y te dice qué es de verdad. Renombra una imagen
> a `.txt` y pruébalo: seguirá diciendo que es un JPEG.

---

## 8. Copiar, mover, renombrar y borrar

### Copiar

```bash
cp origen.txt destino.txt          # copiar un fichero
cp a.txt b.txt /destino/           # varios a una carpeta
cp -r carpeta/ /destino/           # -r: recursivo, obligatorio para carpetas
cp -i origen destino               # -i: pregunta antes de sobrescribir
cp -v origen destino               # -v: dice lo que va haciendo
cp -u origen destino               # -u: sólo si el origen es más nuevo
cp -a carpeta/ /destino/           # -a: archivo — conserva permisos, fechas y enlaces
```

> **`cp -a` es el que quieres para copias de seguridad.** Un `cp -r` normal copia el contenido
> pero **pierde los permisos y las fechas originales**. Si copias `/home` con `cp -r`, todos los
> ficheros pasan a ser tuyos y con fecha de hoy. Con `-a`, no.

### Mover y renombrar

En Linux **mover y renombrar son el mismo comando**, porque en el fondo son la misma operación:
cambiar el nombre y la ubicación de una entrada en el directorio.

```bash
mv viejo.txt nuevo.txt             # renombrar
mv fichero.txt /destino/           # mover
mv fichero.txt /destino/otro.txt   # mover y renombrar a la vez
mv -i origen destino               # preguntar antes de sobrescribir
mv carpeta1 carpeta2               # las carpetas no necesitan -r
```

### Borrar

```bash
rm fichero.txt           # borrar un fichero
rm -i fichero.txt        # preguntando
rm -r carpeta/           # borrar una carpeta y todo su contenido
rm -f fichero            # forzar, sin preguntar
rmdir carpeta            # borrar una carpeta SÓLO si está vacía
```

> ⚠️ **`rm -rf` es la orden más peligrosa del sistema.** No pide confirmación, no hay papelera y
> no hay «deshacer». Tres costumbres que te van a salvar alguna vez:
>
> 1. **Antes de borrar, lista.** Cambia `rm` por `ls` y ejecuta el mismo comando. Si `ls` te
>    enseña lo que esperabas, entonces sí, `rm`.
> 2. **Nunca escribas una ruta que termine en `/*` con `rm -rf` sin mirarla dos veces.** Un
>    espacio de más convierte `rm -rf /home/alumno/tmp` en `rm -rf / home/alumno/tmp`.
> 3. **Ponte el alias `alias rm='rm -i'`** (semana 29). Es una red, no una excusa.
>
> Y `rmdir` no es un `rm` peor: es un `rm` **más seguro**, porque se niega a borrar nada que
> tenga contenido dentro. Úsalo cuando quieras limpiar carpetas vacías sin riesgo.

---

## 9. Comodines: el superpoder del terminal

Los comodines los expande **el shell**, no el comando. Cuando escribes `rm *.txt`, Bash sustituye
`*.txt` por la lista real de ficheros **antes** de llamar a `rm`.

| Comodín | Casa con | Ejemplo |
|---|---|---|
| `*` | Cualquier cantidad de caracteres, incluida ninguna | `*.txt` · `informe*` · `*2026*` |
| `?` | **Un** carácter exacto | `foto?.jpg` casa con `foto1.jpg`, no con `foto10.jpg` |
| `[abc]` | Uno de esos caracteres | `[ab]*.txt` |
| `[a-z]` | Un carácter del rango | `informe[0-9].pdf` |
| `[!abc]` | Cualquiera **menos** ésos | `[!t]*` |
| `{a,b,c}` | Expansión de llaves: genera varias cadenas | `fichero.{txt,md,pdf}` |

**Antes de usar un comodín para borrar o mover, pruébalo con `echo` o con `ls`:**

```bash
echo *.txt          # te enseña exactamente en qué se va a convertir
ls *.txt
rm *.txt            # ahora sí, sabiendo lo que haces
```

Ejemplos reales:

```bash
cp *.jpg fotos/                     # todas las imágenes a una carpeta
mv informe?.pdf archivo/            # informe1..informe9, no informe10
rm *.tmp *.bak                      # limpiar temporales
ls -lh *.{jpg,png,gif}              # varias extensiones a la vez
touch prueba{1..5}.txt              # crea prueba1.txt ... prueba5.txt
mkdir -p backup/{lunes,martes,miercoles}
```

> ⚠️ **Los comodines no son expresiones regulares.** En comodines `*` significa «lo que sea»; en
> expresiones regulares (las de `grep`) `*` significa «cero o más veces lo anterior», que es una
> cosa distinta. Se parecen y no lo son. Confundirlos es el error clásico de la semana que viene.

> ⚠️ **Si ningún fichero casa, Bash pasa el comodín tal cual.** `ls *.xyz` sin ficheros `.xyz`
> da el error «no existe *.xyz». No es un fallo tuyo: es que el shell no encontró nada que
> sustituir.

---

## 10. Buscar ficheros: `find`

```bash
find [dónde] [criterios] [qué hacer]
```

```bash
find . -name "*.txt"                  # por nombre, desde aquí hacia abajo
find /home -iname "informe*"          # -i: sin distinguir mayúsculas
find . -type f                        # sólo ficheros
find . -type d                        # sólo directorios
find . -type l                        # sólo enlaces simbólicos

find . -size +10M                     # de más de 10 megas
find . -size -1k                      # de menos de 1 kilo
find . -empty                         # vacíos

find . -mtime -7                      # modificados en los últimos 7 días
find . -mtime +30                     # sin tocar desde hace más de 30 días
find . -mmin -10                      # modificados en los últimos 10 minutos

find . -user alumno                   # de un usuario
find . -perm 777                      # con esos permisos exactos
find . -perm -o+w                     # que "otros" puedan escribir (semana 22)
```

Combinar criterios:

```bash
find . -name "*.log" -size +1M                    # las dos cosas (Y implícito)
find . -name "*.jpg" -o -name "*.png"             # -o: o una o la otra
find . -type f ! -name "*.txt"                    # !: negación
find /var/log -type f -name "*.log" -mtime +30    # registros viejos
```

Hacer algo con lo encontrado:

```bash
find . -name "*.tmp" -delete                       # borrarlos
find . -name "*.txt" -exec cat {} \;               # ejecutar un comando con cada uno
find . -name "*.txt" -exec cp {} /copia/ \;        # copiarlos
find . -name "*.sh" -exec chmod +x {} +            # + agrupa: más rápido que \;
```

> En `-exec`, `{}` se sustituye por cada fichero encontrado. `\;` ejecuta el comando una vez por
> fichero; `+` lo ejecuta una sola vez con todos como argumentos, que es mucho más rápido.

> ⚠️ **`-delete` va siempre al final** y se comprueba primero **sin él**. `find . -delete -name
> "*.tmp"` borra el directorio entero antes de mirar el nombre. Ejecuta primero
> `find . -name "*.tmp"`, mira la lista, y sólo entonces añade `-delete`.

Alternativa rápida cuando sólo buscas por nombre:

```bash
sudo updatedb          # actualizar la base de datos
locate informe.pdf     # instantáneo, pero usa un índice que puede estar desfasado
```

---

## 11. Buscar dentro de los ficheros: `grep`

`find` busca ficheros **por su nombre**. `grep` busca **dentro** de ellos.

```bash
grep "error" registro.log            # líneas que contienen "error"
grep -i "error" registro.log         # sin distinguir mayúsculas
grep -n "error" registro.log         # con número de línea
grep -c "error" registro.log         # sólo cuántas veces aparece
grep -v "error" registro.log         # las líneas que NO lo contienen
grep -w "red" fichero                # la palabra entera (no "redirigir")
grep -r "TODO" .                     # recursivo por todo el árbol
grep -l "clave" *.conf               # sólo los NOMBRES de los ficheros que casan
grep -A 3 -B 3 "error" log           # 3 líneas de contexto antes y después
```

Expresiones regulares básicas:

| Patrón | Casa con |
|---|---|
| `^texto` | Líneas que **empiezan** por «texto» |
| `texto$` | Líneas que **terminan** en «texto» |
| `.` | Un carácter cualquiera |
| `[0-9]` | Un dígito |
| `+` | Una o más veces lo anterior (con `-E`) |
| `\|` | O lógico (con `-E`) |

```bash
grep "^alumno" /etc/passwd                  # líneas que empiezan por alumno
grep -E "error|fallo|warning" registro.log  # cualquiera de las tres
grep -E "^[0-9]+$" datos.txt                # líneas que son sólo números
```

Combinado con lo anterior:

```bash
grep -rn "contraseña" /etc/ 2>/dev/null     # buscar en toda la configuración
ls -l | grep "^d"                           # sólo directorios
ps aux | grep firefox                       # procesos (semana 4)
```

---

## 12. Redirección y tuberías

Aquí es donde el terminal deja de ser un explorador de archivos incómodo y se convierte en otra
cosa.

> **Analogía.** Cada comando es una máquina con una entrada y dos salidas: la buena y la de los
> errores. Una **tubería** conecta la salida buena de una máquina con la entrada de la siguiente.
> Encadenando máquinas simples montas una fábrica que hace algo que ninguna sabe hacer sola.
> Ésa es la filosofía Unix: programas pequeños que hacen una cosa bien y se pueden encadenar.

| Símbolo | Qué hace |
|---|---|
| `>` | Salida a fichero, **sobrescribiendo** |
| `>>` | Salida a fichero, **añadiendo al final** |
| `2>` | Sólo los **errores** a un fichero |
| `&>` | Salida y errores al mismo fichero |
| `2>/dev/null` | Descartar los errores |
| `<` | Leer la entrada desde un fichero |
| `\|` | Conectar la salida de uno con la entrada del siguiente |

```bash
ls -l > listado.txt
echo "más" >> listado.txt
find / -name "*.conf" 2>/dev/null      # buscar ignorando los "permiso denegado"
comando &> todo.log
```

### Las piezas que se encadenan

| Comando | Qué hace |
|---|---|
| `sort` | Ordena líneas (`-n` numérico, `-r` inverso, `-u` sin repetidos) |
| `uniq` | Quita repetidos consecutivos (`-c` los cuenta) |
| `wc` | Cuenta líneas (`-l`), palabras (`-w`), caracteres (`-c`) |
| `cut` | Extrae columnas (`-d:` separador, `-f1` campo) |
| `tr` | Sustituye o borra caracteres |
| `head` / `tail` | Los primeros / últimos |
| `tee` | Guarda en un fichero **y** deja pasar el flujo |

Ejemplos que hacen algo útil de verdad:

```bash
# Los 5 ficheros más grandes de mi carpeta
ls -lhS ~ | head -n 6

# Los usuarios del sistema, ordenados
cut -d: -f1 /etc/passwd | sort

# ¿Qué shells usa la gente y cuántos cada uno?
cut -d: -f7 /etc/passwd | sort | uniq -c | sort -rn

# Cuántos ficheros .md hay en total
find . -name "*.md" | wc -l

# Las 10 IP que más aparecen en un registro
cut -d' ' -f1 acceso.log | sort | uniq -c | sort -rn | head

# Ver el resultado Y guardarlo a la vez
ls -lh | tee listado.txt
```

> **`sort | uniq -c | sort -rn` es la receta más útil de todo Unix**: cuenta cuántas veces aparece
> cada cosa y las ordena de más a menos. Sirve para registros, para usuarios, para extensiones,
> para lo que sea. Memorízala.

---

## 13. Enlaces duros y simbólicos

Para entenderlo hace falta saber qué es un **inodo**: la ficha donde el sistema guarda los datos
reales de un fichero (permisos, propietario, fechas y dónde están los bloques en el disco). **El
nombre del fichero no está en el inodo**: está en el directorio, apuntando al número de inodo.

> **Analogía.** El inodo es la vivienda; el nombre en el directorio es una entrada en el listín
> telefónico. Un **enlace duro** es otra entrada del listín que apunta a la misma vivienda: si
> borras una entrada, la vivienda sigue ahí mientras quede otra. Un **enlace simbólico** es una
> nota que dice «vive en la calle Mayor 3»: si el vecino se muda, la nota queda apuntando a una
> casa vacía.

```bash
ln fichero.txt enlace_duro          # enlace duro
ln -s fichero.txt enlace_blando     # enlace simbólico (el habitual)
ls -li                              # -i muestra el inodo
```

| | Enlace duro | Enlace simbólico |
|---|---|---|
| Comparte inodo | Sí | No, tiene el suyo |
| Si borras el original | Sigue funcionando | Se rompe (queda «colgado») |
| Entre discos distintos | **No** | Sí |
| A directorios | **No** | Sí |
| Se ve en `ls -l` | Como un fichero normal | `lrwxrwxrwx ... enlace -> destino` |

Pruébalo, que es la única forma de que se entienda:

```bash
echo "contenido" > original.txt
ln original.txt duro.txt
ln -s original.txt blando.txt
ls -li                              # duro.txt y original.txt comparten inodo

rm original.txt
cat duro.txt                        # sigue funcionando
cat blando.txt                      # error: enlace roto
ls -l blando.txt                    # se ve en rojo: apunta a la nada
```

> En el escritorio de Windows los «accesos directos» son enlaces simbólicos, y `mklink` es el
> equivalente en CMD. La diferencia es que en Linux los enlaces simbólicos son parte del sistema
> de ficheros y funcionan para cualquier programa, no sólo para el explorador.

---

## 14. Metadatos y atributos

```bash
stat fichero.txt
```

Te da inodo, tamaño, permisos en octal y simbólico, propietario, y **tres fechas**:

| Fecha | Qué es |
|---|---|
| *Access* | Última vez que se **leyó** |
| *Modify* | Última vez que cambió el **contenido** |
| *Change* | Última vez que cambiaron los **metadatos** (permisos, nombre, propietario) |

```bash
touch -d "2026-01-15 10:00" fichero.txt    # cambiar la fecha a mano
lsattr fichero.txt                          # atributos extendidos
sudo chattr +i fichero.txt                  # hacerlo inmutable
```

Los atributos y los permisos se ven a fondo en la [guía de la semana 22](s22-permisos-en-linux.md).
Aquí basta con saber leerlos:

```bash
ls -l
# -rw-r--r--  1  alumno  alumno  1024  9 sep 10:24  nota.txt
#  │└┬┘└┬┘└┬┘     └──┬─┘  └──┬─┘  └─┬┘  └────┬────┘
#  │ u   g   o       │       │      │        └── fecha de modificación
#  │                 │       │      └── tamaño en bytes
#  │                 │       └── grupo
#  │                 └── propietario
#  └── tipo: - fichero · d directorio · l enlace
```

---

## 15. Comprimir y empaquetar

En Linux son **dos operaciones distintas**: `tar` empaqueta (mete muchos ficheros en uno) y
`gzip` comprime (hace pequeño un fichero). El `.tar.gz` es hacer las dos.

```bash
tar -czvf copia.tar.gz carpeta/       # crear
tar -xzvf copia.tar.gz                # extraer
tar -tzvf copia.tar.gz                # ver el contenido SIN extraer
tar -xzvf copia.tar.gz -C /destino/   # extraer en otro sitio
```

Las letras, que es lo único que hay que memorizar:

| Letra | Significa |
|---|---|
| `c` | *create* — crear |
| `x` | *extract* — extraer |
| `t` | *list* — listar |
| `z` | comprimir con gzip |
| `j` | comprimir con bzip2 (más lento, más pequeño) |
| `v` | *verbose* — ir diciendo qué hace |
| `f` | *file* — **el nombre del fichero va justo después**. Siempre la última |

> **Regla nemotécnica:** *«**C**rear **Z**ipeado **V**iendo el **F**ichero»* → `czvf`.
> Y para extraer, la `c` se convierte en `x`: `xzvf`.

> ⚠️ **`tar -tzvf` antes de extraer.** Un `.tar.gz` mal hecho puede desparramar cientos de
> ficheros en tu carpeta actual en lugar de crear una subcarpeta. Listar primero cuesta un
> segundo.

Otros formatos:

```bash
gzip fichero.txt          # comprime y BORRA el original (queda fichero.txt.gz)
gunzip fichero.txt.gz     # descomprime
zip -r copia.zip carpeta/ # zip, por compatibilidad con Windows
unzip copia.zip
```

---

## 16. Copias de seguridad con `rsync`

`rsync` es `cp` con memoria: sólo copia **lo que ha cambiado**. La primera vez tarda lo mismo;
las siguientes, segundos.

```bash
rsync -avh origen/ destino/
```

| Opción | Qué hace |
|---|---|
| `-a` | *archive*: recursivo y conservando permisos, fechas, enlaces y propietarios |
| `-v` | Va diciendo qué copia |
| `-h` | Tamaños legibles |
| `--delete` | Borra en el destino lo que ya no está en el origen (**espejo exacto**) |
| `--dry-run` | **Simula**: dice qué haría, sin tocar nada |
| `--progress` | Barra de progreso |
| `--exclude` | Excluye un patrón |

```bash
# Simular SIEMPRE antes de una copia con --delete
rsync -avh --delete --dry-run ~/documentos/ /copia/documentos/

# Y sólo entonces, ejecutarla
rsync -avh --delete ~/documentos/ /copia/documentos/

# Excluyendo cosas
rsync -avh --exclude="*.tmp" --exclude="cache/" ~/proyecto/ /copia/
```

> ⚠️ **La barra final cambia el resultado.** `rsync origen/ destino/` copia **el contenido** de
> origen dentro de destino. `rsync origen destino/` copia **la carpeta origen entera** dentro de
> destino, creando `destino/origen/`. Es la trampa clásica de `rsync`: pruébalo con `--dry-run`.

> `rsync -avh --delete` es el equivalente de `robocopy /MIR` que usaste en la semana 12. La
> comparación entre los dos está en la ampliación de esa semana.

---

## 17. Espacio en disco

```bash
df -h                    # espacio libre por sistema de archivos montado
df -h /home              # sólo el de una ruta
du -sh carpeta/          # cuánto ocupa esa carpeta en total
du -sh */                # cuánto ocupa cada subcarpeta
du -h --max-depth=1 ~ | sort -rh | head    # el ranking de lo que más ocupa
```

```bash
sudo pacman -S ncdu      # o: sudo apt install ncdu
ncdu /                   # explorador interactivo: navegas y borras desde ahí
```

> **`df` mira las particiones, `du` mira las carpetas.** Cuando el disco se llena, el orden es:
> `df -h` para saber **qué partición** está llena, y después `du` o `ncdu` para saber **qué
> carpeta** la ha llenado. Si `df` dice que está lleno y `du` no encuentra nada, suele ser un
> fichero borrado que un proceso sigue teniendo abierto: `lsof +L1`.

---

## 18. Equivalencias con Windows

Para tenerlo al lado de lo que hiciste en la semana 12.

| Acción | Linux | CMD | PowerShell |
|---|---|---|---|
| Dónde estoy | `pwd` | `cd` | `Get-Location` |
| Listar | `ls -l` | `dir` | `Get-ChildItem` |
| Cambiar de carpeta | `cd` | `cd` | `Set-Location` |
| Crear carpeta | `mkdir -p` | `md` | `New-Item -ItemType Directory` |
| Crear fichero vacío | `touch` | `type nul > f` | `New-Item` |
| Ver contenido | `cat` / `less` | `type` / `more` | `Get-Content` |
| Copiar | `cp -r` | `copy` / `xcopy` | `Copy-Item -Recurse` |
| Mover / renombrar | `mv` | `move` / `ren` | `Move-Item` / `Rename-Item` |
| Borrar | `rm` | `del` | `Remove-Item` |
| Borrar carpeta | `rm -r` | `rd /s` | `Remove-Item -Recurse` |
| Buscar ficheros | `find` | `dir /s` | `Get-ChildItem -Recurse` |
| Buscar en el texto | `grep` | `findstr` | `Select-String` |
| Espejo / sincronizar | `rsync -a --delete` | `robocopy /MIR` | `robocopy /MIR` |
| Comprimir | `tar -czvf` | — | `Compress-Archive` |
| Espacio libre | `df -h` | `wmic logicaldisk` | `Get-PSDrive` |
| Atributos | `chattr` / `lsattr` | `attrib` | `Set-ItemProperty` |
| Ayuda | `man` | `comando /?` | `Get-Help` |
| Enlace simbólico | `ln -s` | `mklink` | `New-Item -ItemType SymbolicLink` |
| Limpiar pantalla | `clear` | `cls` | `Clear-Host` |
| Comodín «todo» | `*` | `*` | `*` |
| Comodín «un carácter» | `?` | `?` | `?` |

> **Tres diferencias de fondo**, más allá de los nombres:
> 1. En Windows los comodines los expande **cada programa**; en Linux los expande **el shell**,
>    igual para todos.
> 2. PowerShell pasa **objetos** por la tubería; Bash pasa **texto**. Por eso en PowerShell puedes
>    hacer `Where-Object {$_.Length -gt 1MB}` y en Bash tienes que recortar columnas con `cut`.
> 3. Linux distingue mayúsculas de minúsculas. Windows, no.

---

## 19. Chuleta

```
NAVEGAR                          VER
  pwd            dónde estoy       cat f        volcar
  cd ruta        ir                less f       paginar (q=salir)
  cd ..          subir             head -n 5 f  primeras líneas
  cd -           volver            tail -f f    seguir en vivo
  ls -lah        listar todo       wc -l f      contar líneas
  ls -lt         por fecha         file f       qué es
  tree -L 2      árbol             stat f       metadatos

CREAR                            COPIAR / BORRAR
  touch f        fichero vacío     cp -a o d    copiar conservando
  mkdir -p a/b   carpetas          mv o d       mover / renombrar
  echo x > f     escribir          rm -i f      borrar preguntando
  echo x >> f    añadir            rm -r c      borrar carpeta
  nano f         editar            rmdir c      borrar si está vacía

BUSCAR                           TUBERÍAS
  find . -name "*.txt"             cmd > f      guardar
  find . -size +10M                cmd >> f     añadir
  find . -mtime -7                 cmd 2>/dev/null  callar errores
  find . -type f -exec X {} +      a | b        encadenar
  grep -rn "texto" .               sort | uniq -c | sort -rn
  locate nombre                    tee f        guardar y seguir

COMODINES                        EMPAQUETAR
  *   lo que sea                   tar -czvf c.tar.gz dir/
  ?   un carácter                  tar -xzvf c.tar.gz
  [0-9]  un dígito                 tar -tzvf c.tar.gz   (listar)
  {a,b}  varias cadenas            rsync -avh --delete o/ d/
  echo *  ¡probar antes!           rsync --dry-run      (simular)

DISCO                            ENLACES
  df -h      particiones          ln -s dest nombre   simbólico
  du -sh */  carpetas             ln dest nombre      duro
  ncdu /     interactivo          ls -li              ver inodos
```

---

## Ejercicios

Trabaja en la máquina virtual de Ubuntu. Anota el comando **y** su salida.

### Bloque A — Navegación y rutas

1. Averigua tu directorio actual, ve a `/etc`, vuelve a tu carpeta personal y vuelve otra vez a
   `/etc` con **un solo comando de tres caracteres**.
2. Lista `/var/log` mostrando los ficheros ocultos y con los tamaños legibles, ordenado del más
   reciente al más antiguo. Un solo comando.
3. Estando en `/home/alumno/proyectos/web`, escribe de **tres formas distintas** la ruta a
   `/home/alumno/docs/`.
4. ¿Cuántas entradas hay en `/etc`? Consíguelo con una tubería, no contando a ojo.

### Bloque B — Crear y organizar

5. Con **un solo comando**, crea esta estructura:

```
practica/
├── documentos/
│   ├── 2025/
│   ├── 2026/
│   └── 2027/
├── imagenes/
└── scripts/
```

6. Crea de una vez los ficheros `nota1.txt` … `nota10.txt` dentro de `documentos/2026/`.
7. Escribe tres líneas de texto en `nota1.txt` sin abrir ningún editor.
8. Copia todos los `.txt` a `documentos/2027/` conservando las fechas originales. Demuestra con
   `ls -l` que las fechas se han conservado.

### Bloque C — Comodines

9. Dentro de `practica/`, crea `foto1.jpg`, `foto2.jpg`, `foto10.jpg`, `doc1.pdf` y `doc2.pdf`.
   Escribe el comodín que selecciona:
   - sólo las tres imágenes
   - `foto1.jpg` y `foto2.jpg` pero **no** `foto10.jpg`
   - todo lo que empiece por `doc`
   - todo **menos** los PDF
10. Comprueba cada uno con `echo` **antes** de usarlo, y pega la salida.

### Bloque D — Buscar

11. Encuentra todos los ficheros `.conf` de `/etc` modificados en los últimos 30 días, sin que
    aparezcan los errores de «permiso denegado».
12. ¿Cuántas veces aparece la palabra `root` en `/etc/passwd`?
13. Muestra las líneas de `/etc/passwd` que **no** terminan en `/bin/false` ni en `/usr/sbin/nologin`.
14. Encuentra los cinco ficheros más grandes de tu carpeta personal.
15. Busca en `/etc` todos los ficheros en los que aparezca la palabra `network`, mostrando el
    nombre del fichero y el número de línea.

### Bloque E — Tuberías

16. Averigua cuántos usuarios del sistema tienen `/bin/bash` como shell.
17. Saca la lista de extensiones de fichero que hay en `/etc`, con cuántos ficheros hay de cada
    una, ordenada de más a menos.
    *Pista: `ls /etc | grep "\." | rev | cut -d. -f1 | rev | sort | uniq -c | sort -rn`*
    Escríbelo tú primero y luego compáralo.
18. Guarda en `informe.txt` el listado de `/var/log` **y** muéstralo por pantalla a la vez.

### Bloque F — Enlaces

19. Reproduce el experimento del [apartado 13](#13-enlaces-duros-y-simbólicos) y explica con tus
    palabras por qué el enlace duro sobrevive y el simbólico no.
20. Intenta crear un enlace duro a un **directorio**. ¿Qué error da? ¿Por qué crees que no está
    permitido?

### Bloque G — Copias

21. Empaqueta y comprime `practica/` en `copia-practica.tar.gz`. Lista su contenido sin
    extraerlo. Extráelo en `/tmp/prueba/`.
22. Haz una copia con `rsync` de `practica/` a `/tmp/espejo/`. Después borra un fichero del
    original y vuelve a lanzar `rsync`, primero con `--dry-run` y luego con `--delete`. Explica
    qué cambia.
23. ¿Cuánto ocupa `practica/` en total? ¿Y cada una de sus subcarpetas?

### Reto final — El laberinto

El profesor deja en `/tmp/laberinto/` un árbol de carpetas con cientos de ficheros. Escondido hay
**un único fichero** que cumple las tres condiciones a la vez:

- pesa más de 1 MB,
- se modificó hace menos de 2 días,
- contiene en su interior la palabra `TESORO`.

**Encuéntralo con un solo comando** y di qué pone en la línea siguiente a `TESORO`.

*(Se puede resolver con `find` + `-exec grep`, o con `find` + tubería + `xargs`. Las dos valen.)*

---

## Entregable

**Tarea Moodle: «Cuestionario de consola + práctica de gestión de ficheros»**
Calificación de 0 a 10 · Se aprueba con 5 · Finalización automática por nota de aprobado.

1. Los bloques A a G resueltos: comando **y** salida, en bloque de código, no en captura.
2. Las respuestas razonadas de los ejercicios 19, 20 y 22.
3. El reto del laberinto: el comando exacto y el resultado.
4. La [tabla de equivalencias](#18-equivalencias-con-windows) rellenada **de memoria** y luego
   corregida con la guía, marcando lo que habías fallado.
5. **Tu propia chuleta de una página**: los 25 comandos que tú creas que más vas a usar, con una
   línea cada uno. No la copies de aquí; hazla tú. Es la que podrás usar en la prueba práctica.

*Instrumento de evaluación: cuestionario autocorregible + prueba práctica en consola.*

> **Aviso sobre la prueba práctica.** Se hace con los comandos estándar (`ls`, `cat`, `grep`,
> `find`, `cp`), **no** con los sustitutos modernos (`eza`, `bat`, `fd`, `rg`) de la semana 29.
> Los sustitutos son cómodos, pero no están instalados en el 99 % de los servidores del mundo.
