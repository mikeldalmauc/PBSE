---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
semana: 30 · aplicable desde la 13
trimestre: T3
bloque: 3. Configuración / 4. Explotación
competencias: CM4
herramientas: H4 (terminal Linux y Bash)
duracion: 2-3 h dentro de la semana 30, o repartido en sesiones de 20 minutos
---

# Trucos y superpoderes de la consola

> **Dónde estamos.** Encaja en la semana 30 (entorno de trabajo y monitorización), pero está
> pensada para **usarse desde la semana 13**: puedes dar un bloque de 20 minutos al principio de
> varias sesiones en lugar de todo de golpe.
> Es la continuación natural de la [guía de comandos y ficheros](s13-comandos-y-gestion-de-ficheros-linux.md).

> **Analogía.** Saber los comandos es saber las palabras de un idioma. Esto son los **giros
> idiomáticos**: lo que separa a quien traduce mentalmente de quien ya piensa en ese idioma.
> Nada de aquí es imprescindible, y todo junto te hace ir tres veces más rápido.

## Índice

- [1. Editar la línea sin flechas](#1-editar-la-línea-sin-flechas)
- [2. El historial es una máquina del tiempo](#2-el-historial-es-una-máquina-del-tiempo)
- [3. Expansiones: lo que el shell hace antes de ejecutar](#3-expansiones-lo-que-el-shell-hace-antes-de-ejecutar)
- [4. Encadenar comandos](#4-encadenar-comandos)
- [5. Control de trabajos](#5-control-de-trabajos)
- [6. `xargs` y la sustitución de procesos](#6-xargs-y-la-sustitución-de-procesos)
- [7. Las navajas suizas: `cut`, `tr`, `sed`, `awk`](#7-las-navajas-suizas-cut-tr-sed-awk)
- [8. Comandos que no conoces y deberías](#8-comandos-que-no-conoces-y-deberías)
- [9. Quince recetas de una línea](#9-quince-recetas-de-una-línea)
- [10. `tmux`: sesiones que no mueren](#10-tmux-sesiones-que-no-mueren)
- [11. Cómo salir de un lío](#11-cómo-salir-de-un-lío)
- [12. Chuleta de atajos](#12-chuleta-de-atajos)
- [El desafío de la consola](#el-desafío-de-la-consola)
- [Entregable](#entregable)

---

## 1. Editar la línea sin flechas

La línea de comandos la gestiona una librería llamada **readline**, y tiene los mismos atajos
desde 1988. Funcionan en Bash, en Zsh, en `python`, en `psql` y en media docena de sitios más.

| Atajo | Qué hace |
|---|---|
| `Ctrl` + `A` | Ir al **principio** de la línea |
| `Ctrl` + `E` | Ir al **final** de la línea |
| `Alt` + `B` / `Alt` + `F` | Retroceder / avanzar **una palabra** |
| `Ctrl` + `W` | Borrar la **palabra** anterior |
| `Ctrl` + `U` | Borrar **desde el cursor hasta el principio** |
| `Ctrl` + `K` | Borrar **desde el cursor hasta el final** |
| `Ctrl` + `Y` | **Pegar** lo último que borraste |
| `Ctrl` + `L` | Limpiar la pantalla (= `clear`, pero sin perder la línea escrita) |
| `Ctrl` + `_` | **Deshacer** |
| `Alt` + `.` | Insertar el **último argumento** del comando anterior |

**Los tres que cambian la vida:**

- `Ctrl` + `A` cuando ya has escrito un comando largo y te falta el `sudo` delante.
- `Ctrl` + `U` para borrar toda la línea de golpe en vez de tener el `Retroceso` pulsado.
- `Alt` + `.` para reutilizar la ruta larga que acabas de escribir.

```bash
mkdir -p /home/alumno/proyectos/2026/informes
cd <Alt+.>        # inserta /home/alumno/proyectos/2026/informes
```

> Practícalos **hoy**, aunque te resulte más lento durante una semana. Es la mejor inversión de
> tiempo de toda la asignatura.

---

## 2. El historial es una máquina del tiempo

```bash
history              # todo el historial numerado
history 20           # los 20 últimos
history | grep tar   # buscar en el historial
```

| Atajo | Qué hace |
|---|---|
| `!!` | El comando anterior, entero |
| `!$` | El **último argumento** del comando anterior |
| `!*` | **Todos** los argumentos del comando anterior |
| `!123` | El comando número 123 del historial |
| `!tar` | El último comando que empezaba por `tar` |
| `!?texto?` | El último comando que **contenía** «texto» |
| `^viejo^nuevo` | Repite el último comando cambiando «viejo» por «nuevo» |
| `Ctrl` + `R` | **Búsqueda incremental hacia atrás**. Escribe y va buscando |

El uso estrella, que verás usar a todo administrador:

```bash
systemctl restart nginx
# Failed: Access denied
sudo !!
# se convierte en: sudo systemctl restart nginx
```

Y el segundo:

```bash
mkdir -p /ruta/muy/larga/que/no/quiero/reescribir
cd !$
```

Y el corrector de erratas:

```bash
cat /etc/pasword
# No existe el fichero
^pasword^passwd
# ejecuta: cat /etc/passwd
```

> **`Ctrl` + `R` es lo más rentable de este apartado.** Púlsalo, escribe tres letras de un
> comando que usaste hace días y aparece entero. Vuelve a pulsar `Ctrl` + `R` para ir a la
> coincidencia anterior; `Intro` lo ejecuta; `→` lo pone en la línea para editarlo antes.
>
> Si instalaste `fzf` (semana 29), `Ctrl` + `R` se convierte en un buscador interactivo con
> lista y filtrado. Es notablemente mejor.

---

## 3. Expansiones: lo que el shell hace antes de ejecutar

Antes de ejecutar nada, Bash reescribe la línea. Entender **qué** reescribe explica el 80 % de
los «pero si yo he escrito bien el comando».

| Expansión | Ejemplo | Se convierte en |
|---|---|---|
| Llaves | `fichero{1,2,3}.txt` | `fichero1.txt fichero2.txt fichero3.txt` |
| Rango | `{1..5}` · `{a..e}` | `1 2 3 4 5` · `a b c d e` |
| Rango con paso | `{0..20..5}` | `0 5 10 15 20` |
| Tilde | `~` · `~otro` | `/home/alumno` · `/home/otro` |
| Variable | `$USER` | `alumno` |
| Comando | `$(date +%F)` | `2027-05-14` |
| Aritmética | `$((3*7))` | `21` |
| Comodines | `*.txt` | la lista real de ficheros |

**Ver la expansión antes de ejecutar** — el hábito que evita desastres:

```bash
echo fichero{1..5}.txt
echo *.txt
echo ~/documentos
echo $(date +%Y-%m-%d)
```

Combinaciones útiles:

```bash
mkdir -p proyecto/{src,doc,test}/{2026,2027}     # 6 carpetas de una vez
cp config.ini{,.bak}                             # copia de seguridad: config.ini → config.ini.bak
mv informe.txt{,.viejo}                          # renombrar añadiendo un sufijo
touch registro-{01..12}.log                      # 12 ficheros con ceros a la izquierda
tar -czvf copia-$(date +%Y%m%d-%H%M).tar.gz datos/
```

> **`cp config.ini{,.bak}` es un truco precioso.** Las llaves se expanden a dos cadenas: la vacía
> y `.bak`, así que la línea se convierte en `cp config.ini config.ini.bak`. Haz siempre esto
> antes de editar un fichero de configuración del sistema.

> ⚠️ **Orden de las expansiones.** Bash expande llaves → tilde → variables → comandos →
> aritmética → **comodines, los últimos**. Por eso `ls $DIR/*.txt` funciona: primero se sustituye
> `$DIR` y después se busca el comodín. Y por eso `echo *` dentro de comillas dobles **no** se
> expande: `echo "*"` imprime un asterisco.

---

## 4. Encadenar comandos

| Operador | Qué hace |
|---|---|
| `;` | Ejecuta el siguiente **pase lo que pase** |
| `&&` | Ejecuta el siguiente **sólo si el anterior fue bien** (código de salida 0) |
| `\|\|` | Ejecuta el siguiente **sólo si el anterior falló** |
| `&` | Lanza en segundo plano y devuelve el control inmediatamente |

```bash
cd /tmp; ls                          # lista aunque el cd falle
cd /tmp && ls                        # sólo lista si consiguió entrar
ping -c1 google.es || echo "sin red" # el mensaje sólo si falla el ping
mkdir datos && cd datos && touch a.txt
```

> **Usa `&&` y no `;` cuando el segundo comando dependa del primero.** Es la diferencia entre
> `cd /copias && rm -rf *` (borra dentro de `/copias`) y `cd /copias; rm -rf *` (si `/copias`
> no existe, borra donde estuvieras). Ese punto y coma ha destruido servidores de verdad.

Combinado, el «si va bien haz esto, si no aquello»:

```bash
comando && echo "CORRECTO" || echo "FALLO"
```

---

## 5. Control de trabajos

Un terminal puede tener varios programas a la vez.

```bash
comando &        # lanzar en segundo plano
Ctrl + Z         # DETENER el programa en primer plano (queda pausado)
jobs             # ver los trabajos de este terminal
jobs -l          # con sus PID
fg               # traer el último al primer plano
fg %2            # traer el trabajo número 2
bg               # reanudar el pausado, pero en segundo plano
kill %1          # matar el trabajo 1
```

El uso típico, y muy real:

```bash
nano informe.txt
# estás editando y necesitas mirar una cosa
Ctrl + Z              # nano queda pausado
ls -la /etc           # miras lo que necesitabas
fg                    # vuelves a nano exactamente donde estabas
```

Y para procesos largos:

```bash
tar -czvf copia.tar.gz /home/ &     # empieza en segundo plano
jobs                                 # comprobar que sigue
wait                                 # esperar a que terminen todos
```

> ⚠️ **Al cerrar el terminal mueren sus trabajos.** Si vas a lanzar algo largo por SSH y quieres
> desconectarte:
>
> ```bash
> nohup comando_largo &      # sobrevive al cierre; la salida va a nohup.out
> disown %1                  # desligar un trabajo ya lanzado
> ```
>
> Aunque para eso lo correcto es `tmux` ([apartado 10](#10-tmux-sesiones-que-no-mueren)).

---

## 6. `xargs` y la sustitución de procesos

### `xargs`: convertir una lista en argumentos

Algunos comandos leen de la entrada estándar (`grep`, `sort`) y otros sólo aceptan argumentos
(`rm`, `cp`, `mkdir`). `xargs` hace de traductor.

```bash
# Esto NO funciona: rm no lee de la tubería
find . -name "*.tmp" | rm

# Esto SÍ
find . -name "*.tmp" | xargs rm

# Y esto es lo correcto de verdad: -print0 / -0 sobrevive a los nombres con espacios
find . -name "*.tmp" -print0 | xargs -0 rm
```

Opciones que valen la pena:

```bash
... | xargs -n 1 comando      # un argumento por ejecución
... | xargs -I {} cp {} /destino/   # {} marca dónde va cada elemento
... | xargs -P 4 comando      # 4 en paralelo
... | xargs -p rm             # pide confirmación
```

```bash
# Cambiar la extensión de todos los .txt a .md
ls *.txt | xargs -I {} sh -c 'mv "{}" "${1%.txt}.md"' _ {}

# Buscar una palabra sólo en los ficheros de configuración modificados esta semana
find /etc -name "*.conf" -mtime -7 -print0 | xargs -0 grep -l "network"
```

> **`xargs -p` para practicar.** Añádele la `-p` la primera vez que montes un `xargs` con `rm`:
> te va preguntando uno a uno y ves exactamente qué habría pasado.

### Sustitución de procesos: `<(...)`

Convierte la salida de un comando en algo que parece un fichero. Sirve para comandos que exigen
ficheros, como `diff`.

```bash
# Comparar dos listados sin crear ficheros temporales
diff <(ls carpeta1) <(ls carpeta2)

# Comparar los usuarios de dos máquinas
diff <(cut -d: -f1 /etc/passwd | sort) <(ssh otro "cut -d: -f1 /etc/passwd | sort")
```

---

## 7. Las navajas suizas: `cut`, `tr`, `sed`, `awk`

No hace falta dominarlas. Con saber **para qué sirve cada una** y dos ejemplos de cada, ya
resuelves el 90 % de los casos.

### `cut` — recortar columnas

```bash
cut -d: -f1 /etc/passwd        # campo 1, separador ':'
cut -d: -f1,7 /etc/passwd      # campos 1 y 7
cut -c1-10 fichero.txt         # caracteres del 1 al 10
```

### `tr` — sustituir o borrar caracteres

```bash
echo "hola" | tr 'a-z' 'A-Z'         # HOLA
cat fichero | tr -d ' '              # borrar todos los espacios
cat fichero | tr -s ' '              # colapsar espacios repetidos en uno
cat fichero | tr ',' '\n'            # una coma por línea → convertir CSV en lista
```

### `sed` — buscar y reemplazar

```bash
sed 's/viejo/nuevo/' fichero          # la PRIMERA aparición de cada línea
sed 's/viejo/nuevo/g' fichero         # todas (g = global)
sed -i 's/viejo/nuevo/g' fichero      # -i: modifica el fichero EN SITIO
sed -i.bak 's/viejo/nuevo/g' fichero  # y guarda copia en fichero.bak
sed -n '5,10p' fichero                # imprimir sólo las líneas 5 a 10
sed '/^#/d' config.conf               # borrar las líneas de comentario
sed '/^$/d' fichero                   # borrar las líneas vacías
```

> ⚠️ **`sed -i` no tiene deshacer.** Usa siempre `sed -i.bak` la primera vez, o prueba sin `-i`
> para ver el resultado en pantalla antes de escribirlo.

Reemplazo masivo en muchos ficheros, que es el caso real:

```bash
grep -rl "direccion-vieja" . | xargs sed -i.bak 's/direccion-vieja/direccion-nueva/g'
```

### `awk` — procesar por columnas

```bash
awk '{print $1}' fichero              # primera columna
awk '{print $1, $3}' fichero          # columnas 1 y 3
awk -F: '{print $1}' /etc/passwd      # con separador ':'
awk '$3 > 1000 {print $1}' datos      # filtrar por el valor de una columna
awk '{suma += $2} END {print suma}' datos   # sumar una columna
ps aux | awk '$3 > 1.0 {print $11}'   # procesos que usan más del 1% de CPU
```

> **Cuándo cada una:** `cut` si las columnas están separadas por un carácter fijo. `awk` si hay
> espacios variables o hace falta filtrar y calcular. `tr` para cambios carácter a carácter.
> `sed` para buscar y reemplazar texto.

---

## 8. Comandos que no conoces y deberías

| Comando | Qué hace |
|---|---|
| `watch -n 2 comando` | Repite el comando cada 2 segundos y refresca la pantalla |
| `time comando` | Cuánto ha tardado |
| `seq 1 10` | Genera una secuencia de números |
| `yes` | Escribe «y» infinitamente. Para responder que sí a todo |
| `sleep 5` | Esperar 5 segundos (útil en scripts) |
| `date +%Y-%m-%d` | La fecha con el formato que quieras |
| `cal` | Calendario |
| `bc -l` | Calculadora en consola |
| `column -t` | Alinear una salida en columnas bonitas |
| `nl` | Numerar las líneas |
| `shuf` | Barajar líneas al azar |
| `basename` / `dirname` | El nombre / la carpeta de una ruta |
| `readlink -f` | La ruta absoluta real, resolviendo enlaces |
| `xdg-open fichero` | Abrir con la aplicación gráfica que corresponda |
| `!` + `Ctrl`+`Alt`+`F2` | Consolas virtuales: hay seis, y salvan la vida si el escritorio se cuelga |

```bash
watch -n 1 'df -h /'                  # ver el disco llenarse en directo
watch -n 2 'ls -l descargas | wc -l'  # ver crecer una carpeta
time tar -czf copia.tar.gz datos/     # medir cuánto tarda una copia
seq 1 100 | shuf | head -n 5          # cinco números al azar del 1 al 100
mount | column -t                     # los montajes, alineados
```

---

## 9. Quince recetas de una línea

Cópialas, pruébalas y, sobre todo, **desármalas**: quita la última parte de la tubería y mira qué
sale, luego la anterior, y así. Es la mejor forma de entender cómo funcionan.

```bash
# 1. Los 10 ficheros más grandes de aquí hacia abajo
find . -type f -exec du -h {} + | sort -rh | head

# 2. Qué carpeta me está llenando el disco
du -h --max-depth=1 / 2>/dev/null | sort -rh | head

# 3. Cuántos ficheros hay de cada extensión
find . -type f | grep -o '\.[^./]*$' | sort | uniq -c | sort -rn

# 4. Los 10 comandos que más uso
history | awk '{print $2}' | sort | uniq -c | sort -rn | head

# 5. Los 5 procesos que más memoria consumen
ps aux --sort=-%mem | head -n 6

# 6. Buscar y reemplazar en todos los ficheros de un tipo
grep -rl "viejo" --include="*.txt" . | xargs sed -i.bak 's/viejo/nuevo/g'

# 7. Ficheros modificados en la última hora
find . -type f -mmin -60

# 8. Borrar ficheros vacíos
find . -type f -empty -delete

# 9. Copia de seguridad con la fecha en el nombre
tar -czf copia-$(date +%Y%m%d-%H%M).tar.gz ~/documentos

# 10. Los usuarios que pueden iniciar sesión de verdad
grep -v -e "/nologin$" -e "/false$" /etc/passwd | cut -d: -f1

# 11. Cuántas líneas de código hay en un proyecto
find . -name "*.sh" -exec cat {} + | wc -l

# 12. Renombrar en lote: quitar espacios de los nombres
for f in *\ *; do mv "$f" "${f// /_}"; done

# 13. Ver un registro en vivo filtrando sólo los errores
tail -f /var/log/syslog | grep --line-buffered -i error

# 14. Comprobar qué puertos están abiertos
ss -tulpn | column -t

# 15. Contar cuántas veces aparece cada palabra en un texto
tr -s '[:space:]' '\n' < texto.txt | tr 'A-Z' 'a-z' | sort | uniq -c | sort -rn | head
```

> **La receta 12 merece un vistazo.** `${f// /_}` es una **expansión de parámetro**: sustituye
> todos los espacios por guiones bajos sin llamar a ningún programa externo. Bash tiene una
> familia entera de estas: `${f%.txt}` quita el sufijo, `${f#pre}` quita el prefijo,
> `${f^^}` pasa a mayúsculas. Son más rápidas que `sed` y no crean procesos.

---

## 10. `tmux`: sesiones que no mueren

**El problema:** lanzas algo largo por SSH, se corta la conexión y pierdes el trabajo.
**La solución:** `tmux` mantiene la sesión viva en el servidor; tú te enganchas y te desenganchas.

> **Analogía.** SSH es hablar por teléfono: si se corta, se acabó la conversación. `tmux` es dejar
> la reunión en una sala: puedes salir, volver mañana, y la reunión sigue exactamente donde
> estaba. Incluso puede entrar otra persona a la misma sala.

```bash
sudo pacman -S tmux      # o: sudo apt install tmux
```

```bash
tmux                     # nueva sesión
tmux new -s trabajo      # nueva sesión con nombre
tmux ls                  # listar sesiones
tmux attach -t trabajo   # volver a engancharse
```

Dentro de tmux, **todo empieza con el prefijo `Ctrl` + `B`**, se suelta, y luego la tecla:

| Después de `Ctrl`+`B` | Qué hace |
|---|---|
| `d` | *Detach*: salir dejando la sesión viva |
| `c` | Nueva ventana |
| `n` / `p` | Ventana siguiente / anterior |
| `0`-`9` | Ir a esa ventana |
| `%` | Dividir el panel **verticalmente** |
| `"` | Dividir el panel **horizontalmente** |
| Flechas | Moverse entre paneles |
| `x` | Cerrar el panel |
| `[` | Modo desplazamiento (`q` para salir) |
| `?` | Ayuda con todos los atajos |

**Prueba que lo demuestra todo:**

```bash
tmux new -s prueba
sleep 300              # simula una tarea larga
# Ctrl+B, luego d      → sales
tmux ls                # la sesión sigue ahí
# cierra el terminal entero y abre otro
tmux attach -t prueba  # sigue corriendo
```

> Para el uso de esta asignatura, con `%` y `"` para dividir la pantalla ya sacas partido:
> el editor arriba, la ejecución abajo, y el `tail -f` del registro al lado.

---

## 11. Cómo salir de un lío

La tabla que hay que tener a mano el día que pasa.

| Situación | Solución |
|---|---|
| **El terminal parece congelado** | Pulsaste `Ctrl`+`S` (parar salida). Pulsa **`Ctrl`+`Q`** |
| **Un programa no termina** | `Ctrl`+`C`. Si no responde, `Ctrl`+`Z` y luego `kill %1` |
| **Estás dentro de `vim` sin querer** | `Esc`, luego `:q!` e `Intro` |
| **Estás dentro de `less` o `man`** | `q` |
| **Estás dentro de `nano`** | `Ctrl`+`X` |
| **La pantalla se ha llenado de basura** | `reset` e `Intro` (aunque no veas lo que escribes) |
| **Has ejecutado `cat` sobre un binario** | Lo mismo: `reset` |
| **No sabes dónde estás** | `pwd` |
| **No sabes quién eres** | `whoami` · `id` |
| **`sudo` no funciona** | ¿Estás en el grupo `wheel`/`sudo`? `groups`. Y revisa `/etc/sudoers` con `visudo` |
| **El escritorio se ha colgado** | `Ctrl`+`Alt`+`F2` para ir a una consola de texto. Desde ahí `htop` y matar lo que sea |
| **Has borrado algo por error** | Sin papelera, no hay vuelta. Por eso `alias rm='rm -i'` y por eso las instantáneas |
| **El disco está lleno** | `df -h` para ver qué partición, `ncdu /` para ver qué carpeta |
| **Un comando pide contraseña y no ves nada** | Es normal: `sudo` no muestra asteriscos. Escribe a ciegas |

---

## 12. Chuleta de atajos

```
EDITAR LA LÍNEA                  HISTORIAL
  Ctrl+A   principio               !!        comando anterior
  Ctrl+E   final                   !$        último argumento
  Ctrl+W   borrar palabra          sudo !!   repetir con sudo
  Ctrl+U   borrar hasta inicio     Ctrl+R    buscar hacia atrás
  Ctrl+K   borrar hasta final      ^a^b      corregir y repetir
  Ctrl+Y   pegar                   history | grep x
  Ctrl+L   limpiar pantalla        Alt+.     último argumento
  Tab      completar               Tab Tab   ver opciones

CONTROL                          ENCADENAR
  Ctrl+C   interrumpir              ;    siempre
  Ctrl+Z   pausar                   &&   si el anterior fue bien
  Ctrl+D   fin de entrada / salir   ||   si el anterior falló
  Ctrl+S   congelar salida          &    en segundo plano
  Ctrl+Q   descongelar              |    tubería

EXPANSIONES                      TMUX  (prefijo Ctrl+B)
  {1..5}      1 2 3 4 5            d   salir dejándolo vivo
  {a,b}       dos cadenas          c   nueva ventana
  f{,.bak}    f f.bak              %   dividir vertical
  $(cmd)      salida del comando   "   dividir horizontal
  $((2+2))    aritmética           [   desplazarse
  ~           mi carpeta           ?   ayuda
  echo X      ¡probar antes!
```

---

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

---

## Entregable

**Tarea Moodle: «Trucos de consola»** — se puede plantear como actividad de ampliación o
integrarla en el entregable de la semana 30.
Calificación de 0 a 10 · Se aprueba con 5.

1. Los 15 retos del desafío resueltos: comando y salida.
2. **Desarma tres recetas** del [apartado 9](#9-quince-recetas-de-una-línea) a tu elección:
   ejecuta la tubería quitando un eslabón cada vez, pega la salida de cada paso y explica qué
   aporta cada trozo.
3. Captura de una sesión de `tmux` con la pantalla dividida en al menos dos paneles, y
   demostración de que sobrevive a cerrar el terminal (`tmux ls` después de cerrarlo).
4. **Tus cinco atajos favoritos** de este documento, con una frase explicando en qué situación
   real te han ahorrado tiempo esta semana. Tienen que ser situaciones tuyas, no inventadas.

*Instrumento de evaluación: lista de cotejo de los retos + observación en el aula durante el
desafío.*
