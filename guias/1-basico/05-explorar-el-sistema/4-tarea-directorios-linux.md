---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 1 · Básico
tema: "05"
tipo: Tarea
competencias: CM3, CM4
herramientas: H4 (terminal Linux)
duracion: 1,5 h
evaluacion: Apto / No apto
---

# Tarea 7 · Explora el sistema de archivos

> **Antes de empezar.** Necesitas tu máquina virtual `Mint-SMR` encendida, un terminal abierto y
> VS Code con la extensión Markdown All in One (ver la [guía de Markdown](../01-markdown/1-explicacion.md)).

En Windows tus cosas están en `C:\Users\tu-nombre` y los programas en `C:\Program Files`. En Linux
**no hay letras de unidad**: todo cuelga de una sola carpeta, la **raíz** `/`, y cada carpeta de
primer nivel tiene un trabajo fijo. Vas a visitar **10 de ellas**, ejecutar uno o dos comandos en
cada una y contar con tus palabras para qué sirve.

> **Analogía.** El sistema de archivos de Linux es un edificio con las plantas ya asignadas: en
> `/etc` está la oficina con las normas, en `/home` viven los inquilinos, en `/var/log` está el
> libro de incidencias del portero, en `/dev` el cuarto de contadores y en `/tmp` el trastero que
> se vacía cada noche. Tú vas a hacer la **guía del edificio**.

| | |
|---|---|
| 🎯 **Qué vas a conseguir** | Saber qué guarda cada carpeta importante de `/` |
| 🧰 **Qué necesitas** | `Mint-SMR`, el terminal y VS Code |
| ⏱️ **Tiempo** | 1,5 horas |
| 📦 **Qué entregas** | `mapa-directorios.pdf` en Moodle |
| ✅ **Calificación** | Apto / No apto |

## Índice

- [1. Mira la raíz](#1-mira-la-raíz)
- [2. Visita las 10 carpetas](#2-visita-las-10-carpetas)
- [3. La tabla final](#3-la-tabla-final)
- [4. Plantilla del documento](#4-plantilla-del-documento)
- [5. Lo que despista](#5-lo-que-despista)
- [6. Entrega](#6-entrega)

---

## 1. Mira la raíz

Abre el terminal y escribe:

```bash
ls /
```

Verás unas 20 carpetas. Este mapa las agrupa por lo que guardan:

![Mapa de la raíz con los directorios agrupados por colores](images/mapa-raiz.svg)

No hace falta que las aprendas todas: en esta tarea sólo visitas **10**.

## 2. Visita las 10 carpetas

En cada carpeta haz lo mismo:

1. **Ejecuta** los comandos que te damos.
2. **Copia** el comando y lo que sale en tu documento, en un bloque de código (selecciona en el
   terminal y pulsa `Ctrl` + `Shift` + `C`).
3. **Contesta** la pregunta en **una o dos frases** con tus palabras.

> [!TIP]
> **¿No sabes qué contestar?** Lee lo que ha salido en el terminal: la respuesta está ahí. Si
> sigues atascado, `man hier` explica cada carpeta en dos líneas (busca con `/` y sal con `q`).

### 1 · `/etc` — la configuración

```bash
ls /etc | head
cat /etc/hostname
```

❓ ¿Qué tipo de cosas hay en `/etc`? ¿El nombre de `/etc/hostname` te suena de algo? *(mira tu
prompt)*

### 2 · `/home` — las casas de los usuarios

```bash
ls -l /home
echo $HOME
```

❓ ¿Qué hay dentro de `/home`? ¿De quién es tu carpeta?

### 3 · `/root` — la casa del administrador

```bash
ls /root
sudo ls /root
```

❓ ¿Por qué el primer comando da error y el segundo no?

![Diferencia entre la raíz /, la carpeta /root y tu carpeta /home/alumno](images/raiz-vs-root.svg)

### 4 · `/bin` — los programas

```bash
ls -ld /bin
which ls
```

❓ ¿Dónde está el programa `ls` de verdad? *(pista: fíjate en la flecha `->`)*

### 5 · `/usr` — el software instalado

```bash
ls /usr
sudo du -sh /usr
```

❓ ¿Cuánto ocupa `/usr`? ¿Significa *user*? *(lee [Lo que despista](#5-lo-que-despista))*

### 6 · `/var` — lo que va cambiando

```bash
ls /var/log | head
```

❓ ¿Qué crees que son esos ficheros `.log`? ¿Para qué te servirían si algo falla?

### 7 · `/tmp` — el trastero

```bash
echo "hola" > /tmp/prueba.txt
ls -l /tmp/prueba.txt
```

❓ ¿Qué crees que le pasa a este fichero cuando reinicias el equipo? ¿Guardarías ahí algo
importante?

### 8 · `/dev` — los dispositivos

```bash
ls /dev/sda*
lsblk
```

❓ ¿Cuántas particiones tiene tu disco? ¿Coinciden con las que hiciste al instalar Mint (EFI,
raíz, swap y home)?

> [!NOTE]
> Si no existe `/dev/sda`, tu disco tiene otro nombre (por ejemplo `nvme0n1`). Míralo en `lsblk`.

### 9 · `/proc` — información del sistema en vivo

```bash
head -n 5 /proc/cpuinfo
head -n 3 /proc/meminfo
```

❓ ¿Qué información te da cada fichero?

### 10 · `/boot` — el arranque

```bash
ls /boot
```

❓ Busca un fichero que empiece por `vmlinuz`. ¿Qué crees que es? *(pista: compáralo con lo que
sale en `uname -r`)*

> **Ampliación (voluntaria).** Si te sobra tiempo, investiga también `/media` y `/mnt` con
> `ls -l` y explica en qué se diferencian.

## 3. La tabla final

Al final del documento, resume lo que has visto. **Cinco palabras como mucho** por casilla.

| Carpeta | Qué guarda | Un ejemplo que has visto |
|---|---|---|
| `/etc` | | |
| `/home` | | |
| `/root` | | |
| `/bin` | | |
| `/usr` | | |
| `/var` | | |
| `/tmp` | | |
| `/dev` | | |
| `/proc` | | |
| `/boot` | | |

> **Ejemplo.** Así quedaría una fila: `/etc` · Configuración del sistema · `/etc/hostname`.

## 4. Plantilla del documento

Copia esto en VS Code como `mapa-directorios.md` y rellénalo:

````markdown
# Explora el sistema de archivos

**Autor:** Nombre Apellido · **Fecha:** AAAA-MM-DD

## 1 · /etc

```bash
alumno@mint-smr:~$ (el comando)
(lo que sale)
```

**Respuesta:** (una o dos frases)

## 2 · /home

(…lo mismo hasta la 10…)

## Tabla final

| Carpeta | Qué guarda | Un ejemplo que has visto |
|---|---|---|
| /etc | | |
````

## 5. Lo que despista

> [!WARNING]
> **`/root` no es la raíz.** La raíz es `/`. `/root` es la carpeta personal del administrador,
> igual que `/home/alumno` es la tuya.

> [!NOTE]
> **`/usr` no significa *user*.** Las carpetas de los usuarios están en `/home`. `/usr` guarda los
> programas instalados.

> [!NOTE]
> **`/bin` es un atajo.** En Mint, `/bin` apunta a `/usr/bin` (por eso sale una flecha `->`). Los
> programas de verdad están en `/usr/bin`.

## 6. Entrega

Entrega en Moodle **«Tarea 7. Explora el Sistema de Archivos»** el fichero `mapa-directorios.pdf`
(Markdown All in One → exportar a HTML → abrir en el navegador → imprimir como PDF).

Es **Apto** si:

| # | Criterio |
|---|---|
| 1 | Están las **10 carpetas**, cada una con el comando, **lo que sale** y la respuesta |
| 2 | Las salidas son **de tu máquina** y van en bloques de código (no fotos del móvil) |
| 3 | Las respuestas están escritas **con tus palabras** |
| 4 | La **tabla final** está rellena |

**Antes de entregar, comprueba:**

- [ ] Hay 10 apartados, cada uno con comando, salida y respuesta.
- [ ] En ningún sitio llamas «root» a la raíz `/`.
- [ ] La tabla final no tiene casillas vacías.
- [ ] El PDF se lee bien.
