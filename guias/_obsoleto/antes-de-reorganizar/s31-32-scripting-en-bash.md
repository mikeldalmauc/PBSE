---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
semanas: 31 y 32
trimestre: T3
bloque: 4. Explotación
competencias: CM4
herramientas: H2 (CMD/PowerShell), H4 (terminal Linux y Bash)
duracion: 10 h
origen: traducción y ampliación de «6-Scriptak Linuxen.md» y «script-bat-sortzen.md» (curso anterior)
---

# Scripting básico en Bash

> **Dónde estamos.** Semanas 31 y 32 · 3.er trimestre · Bloque 4 (Explotación) · **CM4**.
> Semana 31: variables, condicionales y argumentos. Semana 32: bucles, funciones y automatización
> de copias de seguridad. Es la última unidad antes del reto ETHAZI, y el script de copia de
> seguridad que hagas aquí es una de las piezas del reto.

> **Analogía.** Un script es una nota que le dejas al ordenador: «cuando llegues, haz esto, esto
> y esto». La diferencia con teclear los comandos a mano es que la nota **no se cansa, no se
> equivoca y no se olvida de ninguno de los pasos** — pero tampoco piensa. Si la nota está mal
> escrita, la seguirá igual de fielmente, 500 veces si hace falta.

## Índice

**Semana 31**
- [1. El primer script](#1-el-primer-script)
- [2. Ejecutar un script](#2-ejecutar-un-script)
- [3. Variables](#3-variables)
- [4. Entrada del usuario: `read`](#4-entrada-del-usuario-read)
- [5. Argumentos](#5-argumentos)
- [6. Condicionales](#6-condicionales)
- [7. Códigos de salida](#7-códigos-de-salida)
- [8. `case`](#8-case)

**Semana 32**
- [9. Bucles](#9-bucles)
- [10. Funciones](#10-funciones)
- [11. Redirección y registro](#11-redirección-y-registro)
- [12. Depurar un script](#12-depurar-un-script)
- [13. Programar la ejecución: cron](#13-programar-la-ejecución-cron)
- [14. Buenas prácticas](#14-buenas-prácticas)

- [Cómo trabajar y cómo entregar](#cómo-trabajar-y-cómo-entregar)
- [Ejercicios](#ejercicios)
- [Proyecto final de la unidad](#proyecto-final-de-la-unidad)
- [Entregables](#entregables)

---

# Semana 31

## 1. El primer script

```bash
#!/bin/bash

# Esto es un comentario
echo "Hola, mundo"
```

| Línea | Qué hace |
|---|---|
| `#!/bin/bash` | El **shebang**. Le dice al sistema qué intérprete usar. Va **siempre en la primera línea**, sin espacios delante |
| `#` | Comentario. Todo lo que va detrás se ignora |
| `echo` | Escribe en pantalla |

> **Por qué el shebang importa.** Sin él, si ejecutas el script con `./script.sh` el sistema usa
> el shell por defecto, que puede no ser Bash. Un script que funciona en tu equipo y falla en el
> del compañero suele ser esto.

## 2. Ejecutar un script

Tres formas, y no son equivalentes:

```bash
bash hola.sh      # 1) el intérprete lee el fichero. No hace falta permiso de ejecución
./hola.sh         # 2) ejecución directa. SÍ hace falta permiso de ejecución
source hola.sh    # 3) se ejecuta en el shell ACTUAL
```

Para la forma 2 hay que dar permiso de ejecución (semana 22):

```bash
chmod +x hola.sh
./hola.sh
```

> **La diferencia entre `./script.sh` y `source script.sh`** es la misma que viste en la semana
> 29 con `.bashrc`: `./` abre un shell nuevo, hace su trabajo y se cierra llevándose los cambios;
> `source` lo ejecuta aquí, así que las variables que defina se quedan. Compruébalo:
>
> ```bash
> echo 'MIVAR="hola"' > prueba.sh
> ./prueba.sh ; echo "[$MIVAR]"      # sale vacío
> source prueba.sh ; echo "[$MIVAR]" # sale hola
> ```

> ⚠️ **`./` no es opcional.** `hola.sh` a secas no funciona porque el directorio actual **no**
> está en el `PATH` (semana 29), y eso es a propósito: evita que un fichero llamado `ls` en una
> carpeta cualquiera se ejecute en lugar del `ls` real.

## 3. Variables

```bash
#!/bin/bash

NOMBRE="Patxi"
EDAD=17

echo "Hola, $NOMBRE"
echo "Tienes $EDAD años"
echo "El año que viene tendrás $((EDAD + 1))"
```

Reglas que ahorran horas de depuración:

```bash
NOMBRE="Patxi"      # SIN espacios alrededor del =
NOMBRE = "Patxi"    # ERROR: bash cree que 'NOMBRE' es un comando
```

| Forma | Qué hace |
|---|---|
| `$VAR` o `${VAR}` | Valor de la variable |
| `"$VAR"` | **Entre comillas dobles**: se sustituye la variable. Es lo que quieres casi siempre |
| `'$VAR'` | Entre comillas simples: **no** se sustituye. Sale literalmente `$VAR` |
| `$(comando)` | Sustitución de comandos: se sustituye por la salida del comando |
| `$((operación))` | Aritmética |

```bash
FECHA=$(date +%Y-%m-%d)
USUARIOS=$(who | wc -l)
echo "Hoy es $FECHA y hay $USUARIOS usuarios conectados"
```

> ⚠️ **Pon siempre comillas dobles alrededor de las variables.** Si una variable contiene un
> espacio y no la entrecomillas, Bash la parte en dos:
>
> ```bash
> ARCHIVO="mi documento.txt"
> rm $ARCHIVO     # intenta borrar 'mi' y 'documento.txt'  ← MAL
> rm "$ARCHIVO"   # borra el fichero correcto              ← BIEN
> ```
>
> Es el error número uno en scripting y en el entregable se penaliza.

Variables de entorno útiles:

```bash
echo $HOME $USER $PWD $HOSTNAME $PATH
```

## 4. Entrada del usuario: `read`

```bash
#!/bin/bash

echo -n "¿Cómo te llamas? "
read NOMBRE
echo "Hola, $NOMBRE"
```

Más cómodo, con el mensaje incorporado:

```bash
read -p "¿Cómo te llamas? " NOMBRE
read -sp "Contraseña: " CLAVE   # -s oculta lo que se escribe
echo
```

## 5. Argumentos

Los datos que se pasan al llamar al script:

```bash
#!/bin/bash

echo "Nombre del script:  $0"
echo "Primer argumento:   $1"
echo "Segundo argumento:  $2"
echo "Número de argumentos: $#"
echo "Todos:              $@"
```

```bash
./script.sh manzana pera
```

| Variable | Contenido |
|---|---|
| `$0` | Nombre del script |
| `$1`, `$2`, `$3`... | Argumentos por posición |
| `$#` | Cuántos argumentos hay |
| `$@` | Todos, como elementos separados |
| `$?` | Código de salida del último comando |
| `$$` | PID del script |

**Comprobar que se han recibido los argumentos** — esto tiene que estar en todos tus scripts:

```bash
#!/bin/bash

if [ $# -ne 2 ]; then
    echo "Uso: $0 <origen> <destino>"
    exit 1
fi
```

## 6. Condicionales

```bash
#!/bin/bash

EDAD=18

if [ "$EDAD" -ge 18 ]; then
    echo "Eres mayor de edad."
else
    echo "Eres menor de edad."
fi
```

> ⚠️ **Los espacios dentro de los corchetes son obligatorios.** `[` no es puntuación: es un
> comando. `[$EDAD -ge 18]` da error de sintaxis. En los apuntes del curso anterior había
> justamente ese fallo en el ejemplo del `elif`; escríbelo siempre así: `[ "$EDAD" -ge 18 ]`.

Con varias ramas:

```bash
#!/bin/bash

read -p "Edad: " EDAD

if [ "$EDAD" -ge 80 ]; then
    echo "Eres abuelo."
elif [ "$EDAD" -ge 18 ]; then
    echo "Eres mayor de edad."
else
    echo "Eres menor de edad."
fi
```

### Comparar números

| Operador | Significa |
|---|---|
| `-eq` | igual |
| `-ne` | distinto |
| `-lt` | menor que |
| `-le` | menor o igual |
| `-gt` | mayor que |
| `-ge` | mayor o igual |

### Comparar texto

| Operador | Significa |
|---|---|
| `=` | iguales |
| `!=` | distintos |
| `-z "$VAR"` | la cadena está vacía |
| `-n "$VAR"` | la cadena no está vacía |

> ⚠️ Los números se comparan con `-eq`, `-lt`… y el texto con `=`, `!=`. Si usas `=` con números,
> `10 = 010` da falso porque compara los caracteres, no el valor.

### Comprobar ficheros

| Operador | Verdadero si... |
|---|---|
| `-e ruta` | existe |
| `-f ruta` | existe y es un fichero normal |
| `-d ruta` | existe y es un directorio |
| `-r ruta` | tengo permiso de **lectura** |
| `-w ruta` | tengo permiso de **escritura** |
| `-x ruta` | tengo permiso de **ejecución** |
| `-s ruta` | existe y no está vacío |

Esto conecta directamente con la semana 22:

```bash
#!/bin/bash

FICHERO="$1"

if [ ! -e "$FICHERO" ]; then
    echo "El fichero '$FICHERO' no existe."
    exit 1
fi

[ -r "$FICHERO" ] && echo "  lectura:   sí" || echo "  lectura:   no"
[ -w "$FICHERO" ] && echo "  escritura: sí" || echo "  escritura: no"
[ -x "$FICHERO" ] && echo "  ejecución: sí" || echo "  ejecución: no"
```

### Combinar condiciones

```bash
# Y lógico
if [ "$EDAD" -ge 18 ] && [ "$PAIS" = "ES" ]; then
    echo "Mayor de edad y residente"
fi

# O lógico
if [ "$EDAD" -lt 18 ] || [ "$TUTOR" = "si" ]; then
    echo "Necesita autorización"
fi

# Negación
if [ ! -f "$FICHERO" ]; then
    echo "El fichero no existe"
fi
```

## 7. Códigos de salida

Todo comando devuelve un número al terminar: **0 significa que fue bien**, cualquier otro número
es un error.

```bash
ls /etc
echo $?          # 0

ls /noexiste
echo $?          # 2

whoam
echo $?          # 127 (comando no encontrado)
```

En tus scripts:

```bash
exit 0    # todo correcto
exit 1    # error genérico
exit 2    # error de uso (argumentos incorrectos)
```

> **Para qué sirve esto de verdad:** para encadenar. `comando1 && comando2` ejecuta el segundo
> **sólo si el primero salió bien**. Y una tarea programada (apartado 13) puede avisar de que
> algo falló mirando ese número.

## 8. `case`

Para muchas opciones, más legible que un `if` con diez `elif`:

```bash
#!/bin/bash

read -p "Opción (a/b/c): " OPCION

case "$OPCION" in
    a|A)
        echo "Has elegido A"
        ;;
    b|B)
        echo "Has elegido B"
        ;;
    [0-9])
        echo "Has escrito un número"
        ;;
    *)
        echo "Opción no válida"
        ;;
esac
```

---

# Semana 32

## 9. Bucles

### `for` sobre una lista

```bash
#!/bin/bash

for NUMERO in 1 2 3 4 5; do
    echo "Número: $NUMERO"
done

for FRUTA in manzana pera plátano; do
    echo "Me gusta la $FRUTA"
done
```

### `for` sobre ficheros

Es el que más vas a usar:

```bash
for FICHERO in /etc/*.conf; do
    echo "=== $FICHERO ==="
    head -n 3 "$FICHERO"
done
```

### `for` estilo C

```bash
for (( i=1; i<=10; i++ )); do
    echo "Vuelta $i"
done

for i in {1..10}; do
    echo "Vuelta $i"
done
```

### `while`

```bash
#!/bin/bash

CONTADOR=0

while [ "$CONTADOR" -lt 7 ]; do
    echo "Contador: $CONTADOR"
    ((CONTADOR++))
done
```

### `while` leyendo un fichero línea a línea

```bash
while IFS= read -r LINEA; do
    echo "Línea: $LINEA"
done < /etc/passwd
```

> Esta es la forma correcta de recorrer un fichero. `IFS=` evita que se coman los espacios del
> principio y `-r` evita que las barras invertidas se interpreten.

### `until`, `break` y `continue`

```bash
until [ -f /tmp/listo ]; do
    echo "Esperando..."
    sleep 2
done
```

```bash
for i in {1..10}; do
    [ "$i" -eq 3 ] && continue   # salta esta vuelta
    [ "$i" -eq 8 ] && break      # sale del bucle
    echo "$i"
done
```

## 10. Funciones

```bash
#!/bin/bash

saludar() {
    echo "Hola, $1"
}

comprobar_fichero() {
    local RUTA="$1"
    if [ -f "$RUTA" ]; then
        return 0
    else
        return 1
    fi
}

saludar "Patxi"

if comprobar_fichero "/etc/passwd"; then
    echo "El fichero existe"
fi
```

| Detalle | Explicación |
|---|---|
| `local` | La variable sólo existe dentro de la función. **Úsalo siempre** o pisarás variables del script |
| `$1`, `$2` | Dentro de la función son los argumentos **de la función**, no los del script |
| `return` | Devuelve un **código de salida** (0-255), no un texto |
| Devolver texto | Se hace con `echo` y se recoge con `RESULTADO=$(mi_funcion)` |

> ⚠️ Las funciones deben definirse **antes** de usarlas. Bash lee el fichero de arriba abajo.

## 11. Redirección y registro

| Símbolo | Qué hace |
|---|---|
| `>` | Salida normal a un fichero, **sobrescribiendo** |
| `>>` | Salida normal a un fichero, **añadiendo al final** |
| `2>` | Salida de **errores** a un fichero |
| `&>` | Salida normal **y** errores al mismo fichero |
| `2>&1` | Redirigir los errores a donde vaya la salida normal |
| `< fichero` | Leer la entrada desde un fichero |
| `\|` | Tubería: la salida de uno es la entrada del siguiente |
| `/dev/null` | El agujero negro: lo que va ahí se descarta |

```bash
ls /etc > listado.txt
ls /noexiste 2> errores.txt
comando &> todo.log
comando > salida.log 2>&1
comando 2>/dev/null              # ejecutar callando los errores
```

**Función de registro** (esto va en el proyecto final):

```bash
LOG="/var/log/mi_copia.log"

registrar() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG"
}

registrar "Comienza la copia de seguridad"
```

## 12. Depurar un script

```bash
bash -x script.sh        # muestra cada comando antes de ejecutarlo
bash -n script.sh        # comprueba la sintaxis SIN ejecutar
```

O dentro del script:

```bash
set -x    # activar el trazado a partir de aquí
set +x    # desactivarlo
```

Y esta línea, al principio de cualquier script serio:

```bash
set -euo pipefail
```

| Opción | Qué hace |
|---|---|
| `-e` | Sale al primer comando que falle |
| `-u` | Falla si usas una variable no definida (cazas las erratas en los nombres) |
| `-o pipefail` | Una tubería falla si falla cualquiera de sus comandos, no sólo el último |

> **Por qué importa `-e`.** Sin ella, un script cuyo `cd /destino` falla **sigue ejecutando** las
> líneas siguientes en el directorio equivocado. Si la línea siguiente es un `rm -rf *`, ya te
> imaginas.

También hay un comprobador que señala errores típicos:

```bash
sudo pacman -S shellcheck
shellcheck mi_script.sh
```

## 13. Programar la ejecución: cron

```bash
crontab -e     # editar mis tareas programadas
crontab -l     # listarlas
```

Formato de una línea:

```
┌───── minuto (0-59)
│ ┌─── hora (0-23)
│ │ ┌─ día del mes (1-31)
│ │ │ ┌─ mes (1-12)
│ │ │ │ ┌─ día de la semana (0-7, 0 y 7 = domingo)
│ │ │ │ │
* * * * *  comando
```

| Línea | Cuándo se ejecuta |
|---|---|
| `0 3 * * *` | Todos los días a las 3:00 |
| `30 22 * * 5` | Los viernes a las 22:30 |
| `*/15 * * * *` | Cada 15 minutos |
| `0 2 1 * *` | El día 1 de cada mes a las 2:00 |

```bash
0 3 * * * /home/alumno/bin/copia.sh >> /home/alumno/copia.log 2>&1
```

> ⚠️ **Cron ejecuta con un entorno casi vacío.** No tiene tu `PATH` ni tus alias. Usa **siempre
> rutas absolutas** dentro de los scripts que programes, o funcionarán a mano y fallarán a las
> tres de la mañana sin que te enteres. Es el error clásico de esta unidad.

El equivalente moderno en systemd son los *timers* (`systemctl list-timers`), y en Windows el
**Programador de tareas** — semana 30.

## 14. Buenas prácticas

1. Shebang en la primera línea.
2. `set -euo pipefail` en cualquier script que haga algo importante.
3. Comentario de cabecera: qué hace, quién lo escribió, cuándo y cómo se usa.
4. **Comillas dobles en todas las variables.**
5. Comprobar los argumentos antes de trabajar y salir con un mensaje de uso claro.
6. `local` en las variables de las funciones.
7. Rutas absolutas si el script se va a programar.
8. Registrar en un fichero de log lo que hace.
9. Códigos de salida coherentes.
10. **Nunca `rm -rf "$VAR"/` sin comprobar antes que `$VAR` no está vacía.** Si lo está, la orden
    se convierte en `rm -rf /`.

Plantilla para empezar:

```bash
#!/bin/bash
#===============================================================
# Nombre:      copia.sh
# Descripción: Copia de seguridad de una carpeta con rotación
# Autor:       <tu nombre>
# Fecha:       2027-05-xx
# Uso:         ./copia.sh <origen> <destino>
#===============================================================

set -euo pipefail

if [ $# -ne 2 ]; then
    echo "Uso: $0 <origen> <destino>" >&2
    exit 2
fi

ORIGEN="$1"
DESTINO="$2"

# ... el resto ...

exit 0
```

---

## Cómo trabajar y cómo entregar

**Entorno de trabajo.** Escribe los scripts en **Visual Studio Code** desde Windows y ejecútalos
en la máquina virtual, usando la **carpeta compartida** que configuraste en la semana 9.

1. En VS Code, abre tu carpeta de trabajo y crea dentro una carpeta `scripts`.
2. En VirtualBox, con la máquina apagada: **Configuración → Carpetas compartidas → +**, elige la
   carpeta `scripts`, nombre `scripts`, marca **Automontar** y **Hacer permanente**.
3. En la máquina virtual, la carpeta aparece en `/media/sf_scripts`. Recuerda que tu usuario
   tiene que estar en el grupo `vboxsf`.
4. Extensiones recomendadas de VS Code: **Bash IDE** y **ShellCheck**.

> ⚠️ **Los ficheros creados desde Windows pueden tener finales de línea de Windows** (`CRLF`).
> Bash falla con un mensaje muy confuso: `bad interpreter: /bin/bash^M`. En VS Code, abajo a la
> derecha, cambia `CRLF` por `LF`. O arréglalo en Linux con `dos2unix script.sh`.

**Entrega en Moodle.** Un único fichero `.zip` con:

- Los scripts (`ejercicio1.sh`, `ejercicio2.sh`, …) probados y con permisos de ejecución.
- Un documento con, por cada ejercicio: el enunciado, el código, una captura de la ejecución y
  una explicación breve de cómo lo has resuelto.

---

## Ejercicios

### Semana 31

**Ejercicio 1 — Quién soy**
Un script que limpie la pantalla y muestre qué usuario eres y en qué directorio estás.
*Comandos: `clear`, `whoami`, `pwd`.*

**Ejercicio 2 — Calendario**
Pide un mes y un año y muestra el calendario de esa fecha. Comprueba que el mes esté entre 1 y 12
y avisa si no.
*Comando: `cal`.*

**Ejercicio 3 — ¿Iguales?**
Pide dos nombres y dice si son iguales o distintos. Amplíalo para que no distinga mayúsculas de
minúsculas.

**Ejercicio 4 — Calculadora**
Pide un número, la operación (`+`, `-`, `*`, `/`) y otro número, y muestra el resultado.
Usa `case`. Controla la división por cero.
*Pista: `*` hay que entrecomillarlo o el shell lo expande a la lista de ficheros.*

**Ejercicio 5 — Permisos**
Recibe el nombre de un fichero **como argumento** y dice si tienes permiso de lectura, escritura
y ejecución sobre él. Si no existe, sal con `exit 1` y un mensaje.

### Semana 32

**Ejercicio 6 — Ficheros**
Recibe **varios** nombres de fichero como argumentos. Para cada uno, comprueba si existe y, si
existe, muestra su contenido. Si no existe, avísalo y sigue con el siguiente.
*Pista: `for F in "$@"; do`*

**Ejercicio 7 — Menú**
Un programa que limpie la pantalla, muestre un menú y repita hasta que se elija salir:

```
  1. Ver el tamaño de una carpeta
  2. Listar ficheros
  3. Crear un fichero
  4. Crear una carpeta
  5. Borrar ficheros y carpetas
  6. Salir
```

Cada opción debe pedir los datos que necesite y comprobarlos. **La opción 5 debe pedir
confirmación** antes de borrar nada.
*Comandos: `du -sh`, `ls -lh`, `touch`, `mkdir -p`, `rm -i`.*

**Ejercicio 8 — Auditoría de permisos**
Recorre un directorio y lista los ficheros con permisos excesivos (777 o escritura para
«otros»). Une lo de la semana 22 con los bucles.
*Pista: `find "$DIR" -type f -perm -o+w`*

---

## Proyecto final de la unidad

Es el entregable principal de la semana 32 y una pieza del reto ETHAZI.

### Parte A — Script de altas (repaso de las semanas 20 y 22)

Un script que, ejecutado como root, prepare el puesto de un alumno y un profesor:

- Crea los usuarios que reciba como argumentos: `./altas.sh <alumno> <profesor>`
- Crea los grupos `alumnos` y `profesores` si no existen.
- Crea en el `home` del alumno la estructura:

| Carpeta | Propietario | Grupo | Requisito |
|---|---|---|---|
| `ejercicios` | el profesor | `profesores` | el alumno **no** puede editar |
| `examenes` | el profesor | `alumnos` | los profesores no editan; los alumnos sí, sin ser propietarios |
| `apuntes` | el alumno | `alumnos` | los alumnos tienen todos los permisos |

- Crea un enlace simbólico en `/home` que apunte a la carpeta `apuntes` del alumno.
- **Comprueba antes de crear**: si el usuario ya existe, avisa y no falles.
- Registra en un log cada acción realizada.

### Parte B — Copia de seguridad con rotación

Un script `copia.sh <origen> <destino>` que:

1. Compruebe que recibe dos argumentos y que el origen existe.
2. Cree en el destino una carpeta o un `.tar.gz` con la **fecha y la hora en el nombre**.
3. Registre inicio, fin, tamaño y resultado en un fichero de log con marca de tiempo.
4. **Rote**: conserve sólo las **7 copias más recientes** y borre las anteriores.
5. Devuelva `exit 0` si todo fue bien y un código distinto si algo falló.
6. Se programe con `cron` para ejecutarse todos los días a las 3:00.

Verificación exigida:

```bash
crontab -l
ls -lh /ruta/destino
tail -n 20 /ruta/del/log
```

> **Comprueba la rotación de verdad**: ejecuta el script nueve veces seguidas cambiando la fecha
> del nombre a mano si hace falta, y demuestra con capturas que sólo quedan siete copias.
> «Debería funcionar» no es una comprobación.

### Parte C — Equivalente en PowerShell

Los ejercicios 5 y 7 y la parte B, en PowerShell, sobre la máquina virtual de Windows,
programados con el **Programador de tareas** en lugar de con cron.

---

## Entregables

**Semana 31 — Tarea Moodle: «Tres scripts comentados y probados»**
Ejercicios 1 a 5 en Bash + los ejercicios 5 y 7 en PowerShell.
Calificación de 0 a 10 · Se aprueba con 5.
*Instrumento: rúbrica de código — funcionamiento, claridad y comentarios.*

**Semana 32 — Tarea Moodle: «Script de copia de seguridad automatizado»**
Ejercicios 6 a 8 + el proyecto final completo (partes A, B y C).
Calificación de 0 a 10 · Se aprueba con 5.
*Instrumento: prueba práctica T3 + rúbrica de código.*

### Cómo se corrige el código

| Criterio | Peso |
|---|---|
| **Funciona** y hace lo que pide el enunciado | 40 % |
| **Controla los errores**: argumentos, ficheros que no existen, división por cero, confirmaciones | 25 % |
| **Está bien escrito**: comillas en las variables, `local` en las funciones, nombres claros, sin código repetido | 20 % |
| **Está documentado**: cabecera, comentarios que explican el *por qué*, mensaje de uso | 15 % |

> Un script que funciona pero que se rompe en cuanto le pasas un nombre con un espacio no está
> terminado. Prueba siempre tus scripts con: ningún argumento, argumentos de más, un fichero que
> no existe, y un nombre con espacios.
