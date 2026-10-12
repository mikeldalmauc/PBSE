# Guías del módulo Sistemas Operativos Monopuesto

Material del alumnado de SMR 1.º, ordenado **de lo más básico a lo más avanzado**. No está atado a
un calendario: cada tema dice qué necesitas saber antes, y el orden de las carpetas es el orden
recomendado.

## Índice

- [Guías del módulo Sistemas Operativos Monopuesto](#guías-del-módulo-sistemas-operativos-monopuesto)
  - [Índice](#índice)
  - [Cómo está organizado](#cómo-está-organizado)
  - [Mapa de temas](#mapa-de-temas)
  - [Itinerario del terminal](#itinerario-del-terminal)
  - [Convenciones comunes](#convenciones-comunes)
  - [Cuadros de colores](#cuadros-de-colores)
  - [Diagramas y autocomprobación](#diagramas-y-autocomprobación)
  - [Exportar a Moodle](#exportar-a-moodle)
  - [Añadir un tema nuevo](#añadir-un-tema-nuevo)

---

## Cómo está organizado

```text
guias/
├── LEEME.md                  ← este fichero
├── 1-basico/
│   ├── 02-instalar-mint-virtualbox/
│   │   ├── 1-explicacion.md  ← la teoría y los pasos
│   │   ├── 2-chuleta.md      ← resumen para tener al lado
│   │   ├── 3-ejercicios.md   ← ejercicios, prácticas y entregable
│   │   └── images/           ← capturas del tema
│   └── 03-procesos/
│       ├── 1-guia.md         ← guía única: aprende, chuleta, practica y entrega
│       └── images/           ← capturas y diagramas SVG del tema
├── 2-intermedio/
├── 3-avanzado/
├── _moodle/                  ← HTML generados, listos para subir (no se editan a mano)
├── _herramientas/            ← md2html.py (exportador)
├── _docente/                 ← decisiones, errores corregidos y pendientes (no se publica)
└── _obsoleto/                ← versiones anteriores
```

Cada tema es una carpeta autocontenida: sus páginas y sus imágenes. Hay dos formatos:

- **Tres páginas** (`1-explicacion`, `2-chuleta`, `3-ejercicios`). En Moodle, un tema encaja como
  **una sección** con dos Páginas (explicación y chuleta) y una Tarea (ejercicios).
- **Guía única** (`1-guia.md`), en los temas 03, 04, 06, 07, 08, 09 y 12. Todo va en un fichero
  dividido en partes: *Aprende*, *Chuleta*, *Practica* y *Entrega* (en la de Arch, las tres partes
  de la instalación, la chuleta y la entrega), con diagramas SVG, cuadros de colores y preguntas de
  autocomprobación. En Moodle: una Página con la guía y una Tarea con la entrega copiada en la
  descripción.

Los ficheros `notas-docente.md` que hay en algunos temas son para el profesor y **no se exportan**.

## Mapa de temas

| Nº | Tema | Explicación | Chuleta | Ejercicios | CM |
|---|---|---|---|---|---|
| **Nivel 1 · Básico** | | | | | |
| 01 | Markdown para documentar | [explicación](1-basico/01-markdown/1-explicacion.md) | [chuleta](1-basico/01-markdown/2-chuleta.md) | [práctica](1-basico/01-markdown/3-ejercicios.md) | transversal |
| 02 | Instalar Linux Mint en VirtualBox | [explicación](1-basico/02-instalar-mint-virtualbox/1-explicacion.md) | [chuleta](1-basico/02-instalar-mint-virtualbox/2-chuleta.md) | [entregable](1-basico/02-instalar-mint-virtualbox/3-ejercicios.md) | CM1 |
| 03 | Procesos, hilos y planificación | [guía única](1-basico/03-procesos/1-guia.md) | [↳ parte 2](1-basico/03-procesos/1-guia.md#parte-2--chuleta) | [↳ partes 3 y 4](1-basico/03-procesos/1-guia.md#parte-3--practica) | — |
| 04 | Comandos y ficheros en Linux | [guía única](1-basico/04-comandos-y-ficheros/1-guia.md) | [↳ parte 2](1-basico/04-comandos-y-ficheros/1-guia.md#parte-2--chuleta) | [↳ partes 3 y 4](1-basico/04-comandos-y-ficheros/1-guia.md#parte-3--practica) | CM3, CM4 |
| 05 | Explorar el sistema desde el terminal | — | — | [ficha](1-basico/05-explorar-el-sistema/3-ejercicios.md) · [tarea: mapa de directorios](1-basico/05-explorar-el-sistema/4-tarea-directorios-linux.md) | CM3, CM4 |
| 06 | Windows por dentro: diferencias con Linux y herramientas | [guía única](1-basico/06-windows-por-dentro/1-guia.md) | [↳ parte 2](1-basico/06-windows-por-dentro/1-guia.md#parte-2--chuleta) | [↳ partes 3 y 4](1-basico/06-windows-por-dentro/1-guia.md#parte-3--practica) | — |
| **Nivel 2 · Intermedio** | | | | | |
| 07 | USB multiarranque con Ventoy | [guía única](2-intermedio/07-usb-multiarranque-ventoy/1-guia.md) | [↳ parte 2](2-intermedio/07-usb-multiarranque-ventoy/1-guia.md#parte-2--chuleta) | [↳ entregable](2-intermedio/07-usb-multiarranque-ventoy/1-guia.md#parte-4--entrega) | CM2 |
| 08 | Instalar Arch Linux (UEFI + GPT) | [guía única](2-intermedio/08-instalar-arch-uefi/1-guia.md) | [↳ parte 4](2-intermedio/08-instalar-arch-uefi/1-guia.md#parte-4--chuleta) | [↳ entregables](2-intermedio/08-instalar-arch-uefi/1-guia.md#parte-5--entrega) | CM1, CM2 |
| 09 | Permisos en Linux, root y sudo | [guía única](2-intermedio/09-permisos/1-guia.md) | [↳ parte 2](2-intermedio/09-permisos/1-guia.md#parte-2--chuleta) | [↳ partes 3 y 4](2-intermedio/09-permisos/1-guia.md#parte-3--practica) | CM6 |
| **Nivel 3 · Avanzado** | | | | | |
| 11 | Personalizar el terminal (zsh + Powerlevel10k) | [explicación](3-avanzado/11-terminal-zsh-p10k/1-explicacion.md) | [chuleta](3-avanzado/11-terminal-zsh-p10k/2-chuleta.md) | [entregable](3-avanzado/11-terminal-zsh-p10k/3-ejercicios.md) | CM4 |
| 12 | Taller: personaliza tu Linux | [guía única](3-avanzado/12-taller-personalizar-linux/1-guia.md) | [↳ parte 2](3-avanzado/12-taller-personalizar-linux/1-guia.md#parte-2--chuleta) | [↳ concurso y entrega](3-avanzado/12-taller-personalizar-linux/1-guia.md#parte-3--practica-el-concurso-de-escritorios) | CM4 |
| 13 | Scripting básico en Bash | [explicación](3-avanzado/13-scripting-bash/1-explicacion.md) | [chuleta](3-avanzado/13-scripting-bash/2-chuleta.md) | [ejercicios y proyecto](3-avanzado/13-scripting-bash/3-ejercicios.md) | CM4 |
| 14 | Arch Linux sobre RAID 0 (opcional) | [explicación](3-avanzado/14-arch-sobre-raid0/1-explicacion.md) | [chuleta](3-avanzado/14-arch-sobre-raid0/2-chuleta.md) | [entregable](3-avanzado/14-arch-sobre-raid0/3-ejercicios.md) | CM2 |

> **Nota.** Los temas 10 (trucos de la consola) y 15 (SSH y FTP) se han retirado del módulo: el
> primero por resultar demasiado complejo para el nivel y el segundo por pertenecer a otro módulo.
> También se retiró el antiguo 06 (ampliación de ficheros); su número lo ocupa ahora la guía de
> Windows. El material retirado se conserva en `_obsoleto/retirados-2026-09-23/` por si vuelve a
> hacer falta, y por eso la numeración salta.

## Itinerario del terminal

Las guías de consola se apoyan unas en otras. Este es el orden:

> **Consejo.** 04 comandos y ficheros → 05 explorar el sistema → 11 personalizar el terminal →
> 12 taller → 13 scripting.

## Convenciones comunes

| Elemento | Valor |
|---|---|
| Usuario de ejemplo | `alumno` |
| Nombres de MV | `Mint-SMR`, `Arch-SMR`, `Arch-RAID0` |
| Nombres de equipo | `mint-smr`, `arch-smr`, `arch-raid` |
| Arranque | **UEFI + GPT** en todas las máquinas (marcar *Habilitar EFI*) |
| Particiones | EFI (1) · raíz (2) · swap (3) · home (4) |
| Empresa ficticia | Tres departamentos: dirección, ventas y técnicos |
| Idioma y teclado | `es_ES.UTF-8` · `KEYMAP=es` |

Cabecera YAML de cada página:

```yaml
---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 2 · Intermedio
tema: "09"
tipo: Explicación          # Explicación | Chuleta | Ejercicios | Guía | Tarea
competencias: CM6
herramientas: H4 (terminal Linux)
duracion: 5 h
---
```

No se ponen semanas, trimestres ni bloques del cronograma: el orden lo dan las carpetas.

## Cuadros de colores

Cualquier cita (`>`) se convierte al exportar en un cuadro de color. El color lo decide la
**primera palabra en negrita**, así que en VS Code y en GitHub se sigue leyendo bien:

```markdown
> **Analogía.** Un proceso es una receta cocinándose...
```

| Empieza por… | Cuadro | Para qué |
|---|---|---|
| **Nota**, **Por qué…**, **Qué es…** o cualquier otra cosa | azul ℹ️ | Explicaciones extra |
| **Consejo**, **Truco**, **Regla…**, **Instantánea**, o 💡 | verde 💡 | Atajos y buenas prácticas |
| **Importante**, **Recuerda**, **Clave**, **Conclusión…** | naranja ❗ | Lo que hay que llevarse sí o sí |
| **Aviso**, **Cuidado**, **Ojo**, **Error…**, **No…**, **Nunca…**, o ⚠️ | rojo ⚠️ | Lo que rompe cosas |
| **Analogía** | morado 🧩 | Comparaciones con la vida real |
| **Ampliación**, **Para saber más**, **Reto**, **Si vas rápido** | turquesa 🚀 | Contenido voluntario |
| **Ejemplo** | marrón ✏️ | Casos resueltos |
| **Antes de empezar**, **Requisitos** | gris 🧭 | Lo que hay que saber antes |

También funciona la sintaxis de GitHub, útil cuando el cuadro no lleva etiqueta propia:

```markdown
> [!TIP]
> Guarda una instantánea antes de tocar el cargador de arranque.
```

Tipos admitidos: `NOTE`/`NOTA`, `TIP`/`CONSEJO`, `IMPORTANT`/`IMPORTANTE`, `WARNING`/`CAUTION`/`AVISO`,
`ANALOGIA`, `AMPLIACION`, `EJEMPLO` y `ANTES`.

> **Ojo.** GitHub no muestra los `[!TIP]` que van **dentro de una lista**. Ahí usa la etiqueta en
> negrita (`> **Consejo.** …`), que funciona en todas partes.

## Diagramas y autocomprobación

Las guías únicas y la tarea del tema 05 usan **diagramas SVG** guardados en `images/` del
tema, junto a las capturas. Se enlazan como cualquier imagen y el exportador los incrusta igual:

```markdown
![Texto alternativo que describe el diagrama](images/estados-proceso.svg)
```

Normas para que se vean bien en VS Code (tema claro u oscuro), en GitHub y en Moodle:

- Fondo propio claro (`#fcfcfb`) y borde suave: el diagrama no depende del fondo de la página.
- Sin fuentes externas ni scripts: `Segoe UI`/`Roboto` para el texto y `Consolas` para el código.
- Paleta común en este orden: azul `#2a78d6`, naranja `#eb6834`, aqua `#1baf7a`, amarillo
  `#eda100`, rosa `#e87ba4`, verde `#008300`, violeta `#6250d6`; el texto siempre en negro o gris.
- `<title>` y `<desc>` dentro del SVG, y texto alternativo completo en el Markdown.

Las preguntas **«🧠 ¿Lo has pillado?»** llevan la respuesta plegada con `<details>`. Si Moodle
elimina esa etiqueta al pegar, la respuesta queda visible justo debajo: por eso sólo se usa en
preguntas de repaso, nunca en las que puntúan.

## Exportar a Moodle

El exportador genera **un HTML por página**, con las imágenes incrustadas en base64 y todo el
estilo **en línea** (Moodle elimina los `<style>` al pegar en una Página, pero respeta los
`style="..."`).

```bash
pip install markdown-it-py beautifulsoup4 pygments      # una vez
python3 _herramientas/md2html.py --todo .                # regenera todo en _moodle/
python3 _herramientas/md2html.py 2-intermedio/09-permisos/1-guia.md -o permisos.html   # una sola
```

Los ficheros salen con nombre único y ordenado: `02-instalar-mint-virtualbox-1-explicacion.html`,
`02-instalar-mint-virtualbox-2-chuleta.html`, `02-instalar-mint-virtualbox-3-ejercicios.html`.
Una guía única sale como `09-permisos-1-guia.html`.

Para publicarlos:

1. **Página de Moodle** (recomendado para explicación y chuleta): abre el HTML en el navegador,
   selecciona todo (`Ctrl` + `A`), copia y pega en el editor de la Página. O, en el editor, botón
   **Código fuente** y pega el contenido del `<body>`.
2. **Tarea** (ejercicios): pega el HTML de `3-ejercicios` en la descripción de la tarea, o adjúntalo
   como fichero.
3. **Recurso Fichero**: sube el `.html` tal cual; se abre en el navegador con todo su formato.

> ⚠️ **Los enlaces entre páginas** apuntan al nombre del HTML exportado. Si los subes como
> Páginas de Moodle, esos enlaces no funcionarán: sustitúyelos por el enlace de la Página o
> quítalos.

## Añadir un tema nuevo

1. Crea la carpeta en su nivel con el siguiente número libre: `2-intermedio/16-usuarios-y-grupos/`.
2. Copia la estructura de un tema parecido: `1-explicacion.md`, `2-chuleta.md`, `3-ejercicios.md`.
3. Pega las capturas con `Ctrl` + `V`: VS Code las guarda en `images/` de ese tema.
4. Añade la fila al [mapa de temas](#mapa-de-temas) y ejecuta el exportador.
