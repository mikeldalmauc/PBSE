---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 1 · Básico
tema: "05"
tipo: Tarea
competencias: CM3, CM4
herramientas: H4 (terminal Linux)
duracion: 3 h
evaluacion: Apto / No apto
---

# Tarea · El mapa de directorios de Linux

> **Antes de empezar.** Necesitas tu máquina virtual `Mint-SMR` encendida, VS Code con la
> extensión Markdown All in One (ver la [guía de Markdown](../01-markdown/1-explicacion.md)) y
> haber hecho la [ficha de exploración](3-ejercicios.md). El árbol de directorios ya salió en la
> [guía de comandos](../04-comandos-y-ficheros/1-explicacion.md): ahora lo vas a recorrer entero
> y documentarlo tú.

## Índice

- [Tarea · El mapa de directorios de Linux](#tarea--el-mapa-de-directorios-de-linux)
  - [Índice](#índice)
  - [Qué tienes que hacer](#qué-tienes-que-hacer)
  - [Los directorios que debes explicar](#los-directorios-que-debes-explicar)
  - [Cómo investigar cada directorio](#cómo-investigar-cada-directorio)
  - [Estructura del documento](#estructura-del-documento)
  - [Lo que despista](#lo-que-despista)
  - [Entrega y criterios de Apto](#entrega-y-criterios-de-apto)

---

## Qué tienes que hacer

Escribir **un documento en Markdown** que explique, uno por uno, los directorios que cuelgan de
la raíz `/` de tu Linux Mint: **qué guarda cada uno, para qué sirve y un ejemplo real** que hayas
comprobado en tu máquina.

No es un trabajo de copiar de internet. Cada apartado tiene que llevar la **salida de un comando
ejecutado en tu MV** que demuestre lo que cuentas. Un documento sin salidas propias es **No apto**.

> **Analogía.** El sistema de ficheros de Linux es un edificio con las plantas ya asignadas: en
> `/etc` está la oficina de administración con los contratos y normas, en `/home` viven los
> inquilinos, en `/var/log` está el libro de incidencias del portero, en `/dev` el cuarto de
> contadores y en `/tmp` el trastero que se vacía cada noche. Tu documento es el **directorio del
> edificio** que le darías a un técnico nuevo para que sepa dónde buscar cada cosa.

## Los directorios que debes explicar

Ejecuta `ls /` y compara con esta lista. Son **obligatorios** los 16 marcados; los tres del final
son ampliación.

| Directorio | Nombre completo (pista) | Obligatorio |
|---|---|---|
| `/bin` | *binaries* | ✔ |
| `/sbin` | *system binaries* | ✔ |
| `/boot` | | ✔ |
| `/dev` | *devices* | ✔ |
| `/etc` | *et cetera* (hoy: configuración) | ✔ |
| `/home` | | ✔ |
| `/lib` | *libraries* | ✔ |
| `/media` | | ✔ |
| `/mnt` | *mount* | ✔ |
| `/opt` | *optional* | ✔ |
| `/proc` | *processes* | ✔ |
| `/root` | | ✔ |
| `/run` | | ✔ |
| `/tmp` | *temporary* | ✔ |
| `/usr` | *Unix system resources* | ✔ |
| `/var` | *variable* | ✔ |
| `/srv` | *services* | ampliación |
| `/sys` | | ampliación |
| `/lost+found` | | ampliación |

## Cómo investigar cada directorio

Para cada uno, pasa por estos cuatro pasos y quédate con lo que te sirva para explicarlo:

```bash
ls -l /etc | head -n 15      # 1. qué hay dentro (cambia /etc por el directorio que toque)
ls -ld /etc                  # 2. permisos y propietario del propio directorio
man hier                     # 3. la descripción oficial de la jerarquía (sal con q)
du -sh /etc 2>/dev/null      # 4. cuánto ocupa
```

> **Consejo.** `man hier` es la chuleta oficial: describe cada directorio en dos o tres líneas.
> Léelo, pero **explícalo con tus palabras** y con tu ejemplo. Si tu apartado dice lo mismo que el
> manual con las mismas palabras, no has entendido nada y se nota.

Preguntas que te ayudan a escribir cada apartado:

- ¿Qué **tipo** de cosas hay dentro: programas, configuración, datos de usuario, dispositivos?
- ¿**Quién** escribe ahí: el sistema, el administrador o el usuario normal? *(mira el propietario
  con `ls -ld`)*
- ¿Cambia mucho o es casi fijo? ¿Sobrevive a un reinicio? *(prueba a crear un fichero en `/tmp`,
  reinicia y mira si sigue)*
- ¿Qué **fichero concreto** de dentro conoces ya y para qué sirve? *(en `/etc` tienes varios de
  la ficha anterior)*

Algunos ejemplos que puedes usar como pruebas:

```bash
ls -l /dev/sda*              # tu disco y sus particiones son ficheros
cat /proc/cpuinfo | head -n 8   # /proc no está en el disco: lo genera el núcleo
ls /boot                     # el núcleo (vmlinuz) y el cargador de arranque
tail -n 5 /var/log/syslog    # el registro del sistema crece solo
ls /home; ls -la /root       # el segundo falla sin sudo: ¿por qué?
which ls; ls -l /bin         # ¿/bin es una carpeta o un enlace? (ver «Lo que despista»)
```

## Estructura del documento

Copia esta plantilla y rellénala. Un apartado por directorio, **siempre con los tres bloques**.


## Lo que despista


> **En Mint `/bin` es un enlace a `/usr/bin`.** Haz `ls -ld /bin /sbin /lib` y verás una flecha
> `->`. Desde hace años las distribuciones han unificado esas carpetas dentro de `/usr` (lo llaman
> *usrmerge*); los nombres antiguos se mantienen para que los programas viejos no se rompan.
> Explícalo en tu documento: es una de las cosas que más se preguntan.

> **`/proc` y `/sys` ocupan 0 bytes.** No están en el disco: los inventa el núcleo cada vez que
> los lees. Por eso `du -sh /proc` da resultados raros y por eso `/proc/cpuinfo` cambia si cambias
> la CPU de la MV.

> **`/root` no es la raíz.** La raíz es `/`. `/root` es la carpeta personal del usuario
> administrador, igual que `/home/alumno` es la tuya. Confundirlos en el documento es error grave.

> **`/media` y `/mnt` no son lo mismo.** `/media` lo usa el sistema para montar pendrives solos;
> `/mnt` es para montajes que haces tú a mano. Compruébalo conectando un USB a la MV.

## Entrega y criterios de Apto

Entrega en la tarea de Moodle **«Tarea 5 · Mapa de directorios de Linux»**:

- `mapa-directorios.pdf` exportado desde VS Code (Markdown All in One → HTML → imprimir en el
  navegador).

Calificación **Apto / No apto**. Es **Apto** cuando se cumple **todo** esto:

| # | Criterio | Cómo se comprueba |
|---|---|---|
| 1 | Están los **16 directorios obligatorios**, cada uno con los tres bloques de la plantilla | Se cuentan los apartados |
| 2 | Cada apartado lleva **al menos un comando con su salida real** de `Mint-SMR` en bloque de código | La salida incluye tu prompt `alumno@mint-smr` y datos de tu máquina |
| 3 | La explicación es **tuya**: con tus palabras, y la línea «qué he aprendido» dice algo que se deduce de la salida | Se contrasta con `man hier`; texto copiado = No apto |
| 4 | No hay errores de concepto graves: `/root` ≠ `/`, `/etc` no guarda programas, `/home` no es de root, `/bin` → `/usr/bin` explicado | Lectura del profesor |

