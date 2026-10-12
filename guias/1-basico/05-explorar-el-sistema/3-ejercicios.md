---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 1 · Básico
tema: "05"
tipo: Ejercicios
competencias: CM4
herramientas: H4 (terminal Linux)
origen: traducción y ampliación de «Linux Konfigurazioak.md» (curso anterior)
---

# Ejercicios · Ejercicios de consola: explorar el sistema desde el terminal

> **Antes de empezar.** Ficha corta de exploración guiada sobre tu máquina virtual de Linux Mint (`Mint-SMR`). Da por
> hecha la [guía de comandos y ficheros](../04-comandos-y-ficheros/1-explicacion.md). Varios de
> estos ficheros vuelven a salir al gestionar cuentas de usuario y al
> [configurar el shell](../../3-avanzado/11-terminal-zsh-p10k/1-explicacion.md), así que guarda las respuestas.

Trabaja en el terminal y anota la **salida** de cada comando junto con tu explicación.

---

## Índice

- [Ejercicios · Ejercicios de consola: explorar el sistema desde el terminal](#ejercicios--ejercicios-de-consola-explorar-el-sistema-desde-el-terminal)
  - [Índice](#índice)
  - [La variable `PATH`](#la-variable-path)
  - [Localizar un programa](#localizar-un-programa)
  - [El fichero `/etc/passwd`](#el-fichero-etcpasswd)
  - [El fichero `/etc/shells`](#el-fichero-etcshells)
  - [El fichero `/etc/hosts`](#el-fichero-etchosts)
  - [El directorio `/etc`](#el-directorio-etc)
  - [Encadenar comandos con `;`](#encadenar-comandos-con-)
  - [Códigos de salida](#códigos-de-salida)
  - [Variables de entorno](#variables-de-entorno)
  - [Ayuda](#ayuda)
  - [Entrega](#entrega)

---

## La variable `PATH`

```bash
echo $PATH
```

- ¿Qué contiene? ¿Qué separa las distintas partes?
- ¿Para qué le sirve al shell esa lista?

## Localizar un programa

```bash
which whoami
type whoami
```

- ¿Qué devuelve `which`? ¿Y qué relación tiene con la respuesta del ejercicio 1?
- Prueba también `which cd`. ¿Por qué no devuelve nada? *(pista: `type cd`)*

## El fichero `/etc/passwd`

```bash
cat /etc/passwd
grep "^$USER:" /etc/passwd
```

Localiza tu línea y explica **qué significa cada uno de los siete campos**, separados por `:`.

| Campo | Ejemplo | Qué es |
|---|---|---|
| 1 | `alumno` | |
| 2 | `x` | |
| 3 | `1000` | |
| 4 | `1000` | |
| 5 | `Alumno SMR,,,` | |
| 6 | `/home/alumno` | |
| 7 | `/bin/bash` | |

- ¿Por qué el segundo campo es una `x` y no la contraseña? ¿Dónde está la contraseña realmente?
- ¿Puede cualquier usuario leer `/etc/passwd`? ¿Y `/etc/shadow`? Compruébalo con `ls -l` y
  explica por qué la diferencia tiene sentido.

## El fichero `/etc/shells`

```bash
cat /etc/shells
```

- ¿Qué es esa lista?
- ¿Cuál de ellos es el tuyo? *(compáralo con el campo 7 del ejercicio anterior)*

## El fichero `/etc/hosts`

```bash
cat /etc/hosts
```

- ¿Qué relación establece este fichero?
- ¿Qué pasaría si añadieras la línea `127.0.0.1  www.google.es`? *(razónalo, no lo hagas)*

## El directorio `/etc`

```bash
ls -l /etc | head -n 30
```

Elige **cuatro ficheros** y rellena:

| Fichero | Permisos | Propietario | Grupo | Para qué sirve |
|---|---|---|---|---|
| | | | | |

*(La columna de permisos se estudia a fondo en la [guía de permisos](../../2-intermedio/09-permisos/1-explicacion.md); aquí basta con leerla.)*

## Encadenar comandos con `;`

```bash
whoami; ls
whoami; whoami; whoami
```

- ¿Para qué sirve `;`?
- Prueba ahora `whoami && ls` y `comando_que_no_existe && ls`. ¿Qué diferencia hay con `;`?

## Códigos de salida

```bash
ls
echo $?

whoam
echo $?

cat /etc/passw
echo $?
```

- ¿Qué significa cada número?
- ¿Cuál es el valor cuando todo va bien?
- ¿Para qué crees que sirve esto? *(vuelve a salir en la [guía de scripting](../../3-avanzado/13-scripting-bash/1-explicacion.md))*

## Variables de entorno

```bash
env | sort | head -n 20
echo "$HOME · $USER · $SHELL · $PWD · $LANG"
```

Explica qué guarda cada una de esas cinco variables.

## Ayuda

```bash
man ls
ls --help
apropos permisos
```

- ¿Cómo se sale de `man`?
- Busca en `man ls` la opción que ordena por fecha de modificación y pruébala.

## Entrega

Documento con la salida y la explicación de los diez apartados. Se corrige en clase.
Forma parte de tu **portfolio**.
