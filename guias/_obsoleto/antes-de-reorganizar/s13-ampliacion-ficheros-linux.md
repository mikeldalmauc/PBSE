---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
semana: 13 (ampliación voluntaria) · se retoma en la 22, la 30 y la 31
trimestre: T1
bloque: 4. Explotación
competencias: CM3, CM4
herramientas: H4 (terminal Linux y Bash)
duracion: a tu ritmo
---

# Ampliación: buscar, encadenar y empaquetar en GNU/Linux

> **Dónde estamos.** Ampliación **voluntaria** de la semana 13 · 1.er trimestre · Bloque 4
> (Explotación). Da por hecho que dominas la [guía básica de comandos y
> ficheros](s13-comandos-y-gestion-de-ficheros-linux.md). Es para quien vaya rápido, y es la base
> que dan por sabida la [guía de trucos de la consola](s30-trucos-y-superpoderes-de-la-consola.md)
> y la de scripting (semana 31). Al final tienes la [tabla de
> equivalencias](#10-equivalencias-con-windows) con CMD y PowerShell de la semana 12.

## Índice

- [1. Más opciones de los comandos básicos](#1-más-opciones-de-los-comandos-básicos)
- [2. Buscar ficheros: `find`](#2-buscar-ficheros-find)
- [3. Buscar dentro de los ficheros: `grep`](#3-buscar-dentro-de-los-ficheros-grep)
- [4. Redirección y tuberías](#4-redirección-y-tuberías)
- [5. Enlaces duros y simbólicos](#5-enlaces-duros-y-simbólicos)
- [6. Metadatos y atributos](#6-metadatos-y-atributos)
- [7. Comprimir y empaquetar](#7-comprimir-y-empaquetar)
- [8. Copias de seguridad con `rsync`](#8-copias-de-seguridad-con-rsync)
- [9. Espacio en disco](#9-espacio-en-disco)
- [10. Equivalencias con Windows](#10-equivalencias-con-windows)
- [11. Chuleta](#11-chuleta)
- [Ejercicios](#ejercicios)
- [Entrega](#entrega)

---

## 1. Más opciones de los comandos básicos

Lo que se quedó fuera de la guía básica. No hace falta aprenderlo de memoria: tenlo a mano.

### Más ayuda

```bash
help cd             # para comandos internos del shell (cd, export, alias...)
apropos permisos    # buscar comandos por tema
type ls             # ¿qué es esto: programa, alias o interno?
which ls            # ¿en qué carpeta está el programa?
```

> **Por qué `type` importa.** En la semana 29 vas a poner alias. A partir de ahí, `ls` puede no
> ser el `ls` real sino tu alias. `type ls` te lo dice, y `\ls` ejecuta el original.

Y para cuando el manual es demasiado:

```bash
sudo apt install tldr     # Mint
sudo pacman -S tealdeer   # Arch
tldr --update
tldr tar                  # ejemplos prácticos en vez de 400 líneas de manual
```

### Más opciones de `ls` y `tree`

```bash
ls -t               # ordena por fecha de modificación, del más nuevo al más viejo
ls -S               # ordena por tamaño
ls -r               # invierte el orden
ls -R               # recursivo: entra en los subdirectorios
ls -d carpeta       # información DE la carpeta, no de su contenido
ls -i               # muestra el número de inodo

ls -lt              # lo más reciente arriba: "¿qué he tocado hace un rato?"
ls -lhS             # lo más grande arriba: "¿qué me está llenando el disco?"

tree -d             # sólo directorios
tree -a             # incluye ocultos
```

### Escribir varias líneas de golpe y otros editores

```bash
cat > lista.txt << 'FIN'
manzana
pera
plátano
FIN
```

| Editor | Cómo salir | Nota |
|---|---|---|
| `nano fichero` | `Ctrl`+`O` guarda, `Ctrl`+`X` sale | El de la guía básica |
| `micro fichero` | `Ctrl`+`S`, `Ctrl`+`Q` | Como nano pero con los atajos de siempre (`sudo apt install micro`) |
| `vim fichero` | `Esc` y luego `:q!` (salir sin guardar) o `:wq` (guardar y salir) | Te lo vas a encontrar sin querer en muchos servidores |

### Seguir un fichero en vivo y saber qué es

```bash
tail -f /var/log/apt/history.log   # SEGUIR el fichero en vivo. Ctrl+C para parar
file fichero                        # ¿qué tipo de fichero es realmente?
```

> **`tail -f` es el comando del administrador de sistemas.** Lo dejas corriendo sobre un registro
> mientras provocas el error, y ves aparecer el mensaje en el momento. Pruébalo: abre dos
> terminales, en uno `tail -f /var/log/apt/history.log` y en el otro instala un paquete con
> `sudo apt install`.

> **`file` mira dentro, no la extensión.** En Windows un fichero es una imagen porque se llama
> `.jpg`. En Linux, `file` lee los primeros bytes y te dice qué es de verdad. Renombra una imagen
> a `.txt` y pruébalo: seguirá diciendo que es un JPEG.

### Copiar sin perder nada

```bash
cp -v origen destino               # -v: dice lo que va haciendo
cp -u origen destino               # -u: sólo si el origen es más nuevo
cp -a carpeta/ /destino/           # -a: archivo — conserva permisos, fechas y enlaces
```

> **`cp -a` es el que quieres para copias de seguridad.** Un `cp -r` normal copia el contenido
> pero **pierde los permisos y las fechas originales**. Si copias `/home` con `cp -r`, todos los
> ficheros pasan a ser tuyos y con fecha de hoy. Con `-a`, no.

### Más sobre comodines

| Comodín | Casa con | Ejemplo |
|---|---|---|
| `[!abc]` | Cualquier carácter **menos** ésos | `[!t]*` → todo lo que no empieza por `t` |

> **Los comodines los expande el shell, no el comando.** Cuando escribes `rm *.txt`, Bash
> sustituye `*.txt` por la lista real de ficheros **antes** de llamar a `rm`. Por eso `echo *.txt`
> te enseña lo que va a pasar.

> ⚠️ **Si ningún fichero casa, Bash pasa el comodín tal cual.** `ls *.xyz` sin ficheros `.xyz`
> da el error «no existe *.xyz». No es un fallo tuyo: es que el shell no encontró nada que
> sustituir.

> ⚠️ **Los comodines no son expresiones regulares.** En comodines `*` significa «lo que sea»; en
> expresiones regulares (las de `grep`, [apartado 3](#3-buscar-dentro-de-los-ficheros-grep)) `*`
> significa «cero o más veces lo anterior». Se parecen y no lo son.

### Rutas en los scripts

> **Cuándo usar cada tipo de ruta.** En un **script** usa siempre rutas absolutas: el script puede
> ejecutarse desde cualquier directorio, y desde `cron` se ejecuta desde uno que no esperas
> (semana 32). Escribiendo a mano, las relativas son mucho más cómodas.

### Todo es un fichero, de verdad

> **Todo es un fichero.** Tu disco duro es un fichero (`/dev/sda`). El teclado es un fichero. La
> temperatura de la CPU se lee de un fichero en `/sys`. Incluso «la nada» es un fichero
> (`/dev/null`). Esto no es una metáfora: puedes hacer `cat /dev/urandom` y ver qué pasa (después
> pulsa `Ctrl` + `C`). Es la idea central del diseño de Unix, y explica por qué basta con saber
> manejar ficheros para administrar todo el sistema.

```bash
cat /proc/cpuinfo | head -n 20
cat /proc/meminfo | head -n 5
```

---

## 2. Buscar ficheros: `find`

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

## 3. Buscar dentro de los ficheros: `grep`

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

## 4. Redirección y tuberías

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

## 5. Enlaces duros y simbólicos

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

## 6. Metadatos y atributos

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

## 7. Comprimir y empaquetar

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

## 8. Copias de seguridad con `rsync`

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

## 9. Espacio en disco

```bash
df -h                    # espacio libre por sistema de archivos montado
df -h /home              # sólo el de una ruta
du -sh carpeta/          # cuánto ocupa esa carpeta en total
du -sh */                # cuánto ocupa cada subcarpeta
du -h --max-depth=1 ~ | sort -rh | head    # el ranking de lo que más ocupa
```

```bash
sudo apt install ncdu     # en Arch: sudo pacman -S ncdu
ncdu /                   # explorador interactivo: navegas y borras desde ahí
```

> **`df` mira las particiones, `du` mira las carpetas.** Cuando el disco se llena, el orden es:
> `df -h` para saber **qué partición** está llena, y después `du` o `ncdu` para saber **qué
> carpeta** la ha llenado. Si `df` dice que está lleno y `du` no encuentra nada, suele ser un
> fichero borrado que un proceso sigue teniendo abierto: `lsof +L1`.

---

## 10. Equivalencias con Windows

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

## 11. Chuleta

```
BUSCAR                                       TUBERÍAS
  find . -name "*.txt"         por nombre      cmd > f            guardar
  find . -size +10M            por tamaño      cmd >> f           añadir
  find . -mtime -7             por fecha       cmd 2>/dev/null    callar errores
  find . -type f -exec X {} +  con cada uno    a | b              encadenar
  grep -rn "texto" .           dentro          tee f              guardar y seguir
  locate nombre                por índice      sort | uniq -c | sort -rn

EMPAQUETAR                                   DISCO Y ENLACES
  tar -czvf c.tar.gz dir/      crear           df -h              particiones
  tar -tzvf c.tar.gz           listar          du -sh */          carpetas
  tar -xzvf c.tar.gz           extraer         ncdu /             interactivo
  rsync -avh --delete o/ d/    espejo          ln -s dest nombre  simbólico
  rsync ... --dry-run          simular         ls -li             ver inodos
```

---

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

9. Reproduce el experimento del [apartado 5](#5-enlaces-duros-y-simbólicos) y explica con tus
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

14. Rellena **de memoria** la [tabla de equivalencias](#10-equivalencias-con-windows) (tapa las
    columnas de CMD y PowerShell) y luego corrígela con la guía, marcando lo que habías fallado.

### Reto final — El laberinto

El profesor deja en `/tmp/laberinto/` un árbol de carpetas con cientos de ficheros. Escondido hay
**un único fichero** que cumple las tres condiciones a la vez:

- pesa más de 1 MB,
- se modificó hace menos de 2 días,
- contiene en su interior la palabra `TESORO`.

**Encuéntralo con un solo comando** y di qué pone en la línea siguiente a `TESORO`.

*(Se puede resolver con `find` + `-exec grep`, o con `find` + tubería + `xargs`. Las dos valen.)*

---

## Entrega

**Voluntaria.** Mismo formato que la guía básica: Markdown exportado a PDF, con comando **y**
salida en bloques de código (no en captura), las respuestas razonadas de los ejercicios 9, 10 y 12,
y el reto final con el comando exacto y el resultado.

> **Aviso sobre la prueba práctica.** Se hace con los comandos estándar (`ls`, `cat`, `grep`,
> `find`, `cp`), **no** con los sustitutos modernos (`eza`, `bat`, `fd`, `rg`) de la semana 29.
> Los sustitutos son cómodos, pero no están instalados en el 99 % de los servidores del mundo.
