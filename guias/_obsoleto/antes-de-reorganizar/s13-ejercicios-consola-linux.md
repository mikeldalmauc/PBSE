---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
semana: 13 (repaso) · se retoma en la 14
trimestre: T1
bloque: 4. Explotación
competencias: CM4
herramientas: H4 (terminal Linux)
origen: traducción y ampliación de «Linux Konfigurazioak.md» (curso anterior)
---

# Ejercicios de consola: explorar el sistema desde el terminal

> **Dónde estamos.** Semana 13 · 1.er trimestre · Bloque 4 (Explotación) · **CM4**.
> Ficha corta de exploración guiada. Se hace sobre la máquina virtual de Ubuntu de la semana 8.
> Varios de estos ficheros vuelven a salir en la semana 14 (modelo de cuentas) y en la 29
> (configuración del shell), así que las respuestas conviene guardarlas.

Trabaja en el terminal y anota la **salida** de cada comando junto con tu explicación.

---

## 1. La variable `PATH`

```bash
echo $PATH
```

- ¿Qué contiene? ¿Qué separa las distintas partes?
- ¿Para qué le sirve al shell esa lista?

## 2. Localizar un programa

```bash
which whoami
type whoami
```

- ¿Qué devuelve `which`? ¿Y qué relación tiene con la respuesta del ejercicio 1?
- Prueba también `which cd`. ¿Por qué no devuelve nada? *(pista: `type cd`)*

## 3. El fichero `/etc/passwd`

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

## 4. El fichero `/etc/shells`

```bash
cat /etc/shells
```

- ¿Qué es esa lista?
- ¿Cuál de ellos es el tuyo? *(compáralo con el campo 7 del ejercicio anterior)*

## 5. El fichero `/etc/hosts`

```bash
cat /etc/hosts
```

- ¿Qué relación establece este fichero?
- ¿Qué pasaría si añadieras la línea `127.0.0.1  www.google.es`? *(razónalo, no lo hagas)*

## 6. El directorio `/etc`

```bash
ls -l /etc | head -n 30
```

Elige **cuatro ficheros** y rellena:

| Fichero | Permisos | Propietario | Grupo | Para qué sirve |
|---|---|---|---|---|
| | | | | |

*(La columna de permisos se estudia a fondo en la semana 22; aquí basta con leerla.)*

## 7. Encadenar comandos con `;`

```bash
whoami; ls
whoami; whoami; whoami
```

- ¿Para qué sirve `;`?
- Prueba ahora `whoami && ls` y `comando_que_no_existe && ls`. ¿Qué diferencia hay con `;`?

## 8. Códigos de salida

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
- ¿Para qué crees que sirve esto? *(vuelve a salir en la semana 31)*

## 9. Variables de entorno

```bash
env | sort | head -n 20
echo "$HOME · $USER · $SHELL · $PWD · $LANG"
```

Explica qué guarda cada una de esas cinco variables.

## 10. Ayuda

```bash
man ls
ls --help
apropos permisos
```

- ¿Cómo se sale de `man`?
- Busca en `man ls` la opción que ordena por fecha de modificación y pruébala.

---

## Entrega

Documento con la salida y la explicación de los diez apartados. Se corrige en clase.
Forma parte del **portfolio del 1.er trimestre**.
