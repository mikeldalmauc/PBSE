---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 3 · Avanzado
tema: "13"
tipo: Chuleta
competencias: CM4
herramientas: H2 (CMD/PowerShell), H4 (terminal Linux y Bash)
duracion: 10 h
origen: traducción y ampliación de «6-Scriptak Linuxen.md» y «script-bat-sortzen.md» (curso anterior)
---

# Chuleta · Scripting básico en Bash

> **Nota.** Esta página acompaña a la [explicación del tema](1-explicacion.md). Tenla a mano mientras trabajas.

## Índice

- [Chuleta · Scripting básico en Bash](#chuleta--scripting-básico-en-bash)
  - [Índice](#índice)
  - [Esqueleto de un script](#esqueleto-de-un-script)
  - [Variables y entrada](#variables-y-entrada)
  - [Condiciones](#condiciones)
  - [`case`](#case)
  - [Bucles](#bucles)
  - [Funciones y redirección](#funciones-y-redirección)
  - [Cron](#cron)

---

## Esqueleto de un script

```bash
#!/bin/bash
# Nombre: copia.sh · Uso: ./copia.sh <origen> <destino>
set -u                                  # error si usas una variable sin definir

ORIGEN="$1"
DESTINO="$2"
```

```bash
chmod +x script.sh     # darle permiso de ejecución
./script.sh            # ejecutarlo (shell nuevo)
bash -x script.sh      # ejecutarlo mostrando cada línea (depurar)
```

## Variables y entrada

| Escribes | Significa |
|---|---|
| `NOMBRE="Ana"` | Asignar (**sin espacios** alrededor del `=`) |
| `"$NOMBRE"` | Usar el valor (entre comillas dobles, siempre) |
| `$(comando)` | La salida de un comando |
| `$((A + B))` | Aritmética entera |
| `read -p "Nombre: " N` | Pedir un dato |
| `$1 $2 …` | Argumentos |
| `$#` | Cuántos argumentos |
| `$@` | Todos los argumentos |
| `$?` | Código de salida del último comando (0 = bien) |
| `$0` | Nombre del script |

## Condiciones

| Números | Texto | Ficheros |
|---|---|---|
| `-eq` igual | `=` igual | `-e` existe |
| `-ne` distinto | `!=` distinto | `-f` es fichero |
| `-lt` menor | `-z` vacío | `-d` es directorio |
| `-le` menor o igual | `-n` no vacío | `-r` `-w` `-x` permisos |
| `-gt` mayor · `-ge` mayor o igual | | `-s` no está vacío |

```bash
if [ "$#" -ne 2 ]; then
    echo "Uso: $0 <origen> <destino>" >&2
    exit 1
elif [ ! -d "$1" ]; then
    echo "No existe $1" >&2; exit 2
else
    echo "Todo bien"
fi
```

> ⚠️ **Espacios dentro de los corchetes.** `[ "$A" -eq 1 ]` funciona;
> `["$A" -eq 1]` no.

## `case`

```bash
case "$OPCION" in
    1|alta)  echo "Alta" ;;
    2|baja)  echo "Baja" ;;
    *)       echo "Opción no válida" ;;
esac
```

## Bucles

```bash
for DEP in direccion ventas tecnicos; do echo "$DEP"; done
for F in *.txt; do echo "Fichero: $F"; done
for ((i = 1; i <= 5; i++)); do echo "$i"; done
while [ "$N" -gt 0 ]; do N=$((N - 1)); done
while read -r LINEA; do echo "$LINEA"; done < usuarios.txt
```

## Funciones y redirección

```bash
saludar() { echo "Hola, $1"; return 0; }
saludar Ana

comando > salida.txt       # sobrescribe
comando >> salida.txt      # añade al final
comando 2> errores.txt     # sólo los errores
comando > todo.log 2>&1    # salida y errores al mismo sitio
```

## Cron

```bash
crontab -e     # editar · crontab -l para ver
# minuto hora día mes día_semana  comando
0 14 * * 1-5   /home/alumno/bin/copia.sh /home/alumno/docs /copias >> /home/alumno/copia.log 2>&1
```
