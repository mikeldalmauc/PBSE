# PBSE · Sistemas Operativos Monopuesto (SMR 1.º)

Material del módulo que da Mikel en el CIFP Zornotza. Lo importante está en `guias/`: una carpeta
por tema con la guía del alumnado, sus imágenes y diagramas. La estructura de carpetas, las
convenciones (usuario `alumno`, MV `Mint-SMR`, UEFI + GPT…), los cuadros de colores y cómo exportar
a Moodle están en `guias/LEEME.md`. Las decisiones del profesor y los errores corregidos, en
`guias/_docente/decisiones-y-pendientes.md`. **Este fichero dice cómo se escribe una guía.** Las
guías de este módulo no se escriben como las de otras asignaturas: léelo antes de crear o tocar una.

## Para quién escribimos

Alumnado de **16 años**, primer curso de un grado medio, con poco o ningún conocimiento previo. Se
pierden con textos largos, con muchos términos y con tablas que resumen cosas que todavía no
entienden. Necesitan que alguien les diga **qué hacer ahora, qué deberían ver y cómo saben que
está bien**.

La prueba del chaval de 16 años, antes de dar una guía por buena: lee cada párrafo y pregúntate
«¿lo entiende a la primera? ¿sabe qué tiene que hacer ahora? ¿cuántas palabras nuevas le he
soltado?». Si dudas, corta.

## Las diez reglas

1. **El ejemplo antes que la definición.** Primero el caso concreto (abres tres ventanas de
   Firefox…), luego el nombre de la cosa. Nunca al revés.
2. **Una idea, un dibujo o un ejemplo.** Cada concepto lleva un diagrama SVG, una captura o un
   ejemplo con salida real. Si una idea no se puede dibujar ni ejemplificar, probablemente sobra.
3. **El ejercicio en el momento, no al final.** Cada apartado termina con un «🧪 Pruébalo» (uno o
   dos comandos o acciones, con lo que deberían ver) y, si hay algo que confundir, un «🧠 ¿Lo has
   pillado?» con la respuesta plegada. Los ejercicios que puntúan van en la Parte 3; los del momento
   no puntúan.
4. **Repetir, tres veces como mínimo.** Cada idea importante aparece cuando se explica, en su
   «Pruébalo» y en el resumen final. Las palabras clave se repiten tal cual: no se cambian por
   sinónimos para «no repetir».
5. **Resumir siempre.** Cada apartado acaba con «📌 En una frase». La guía acaba con «Lo que te
   llevas»: las ideas en frases cortas (de 6 a 12) y una chuleta mínima.
6. **Frases cortas, segunda persona, sin enrollarse.** Menos de 20 palabras por frase, una idea por
   frase, nada de paréntesis dentro de paréntesis. Se tutea. Castellano de España, sin inglés que
   no haga falta («carpeta», no «directorio» salvo en los comandos; «fichero» o «archivo»).
7. **Pocas palabras técnicas, y cada una explicada al aparecer.** Como mucho 8 o 10 términos nuevos
   por guía. La primera vez: en **negrita** y explicada en la misma frase. Lo que no sea
   imprescindible para la práctica o el examen va a «Para saber más» o se quita.
8. **Dirección explícita.** Las instrucciones son listas numeradas con la forma «haz esto → verás
   esto → si no, esto». Nunca «conviene», «se puede», «es recomendable»: se dice qué hacer.
9. **Las tablas, sólo cuando ayudan a comparar.** Ver «Tablas» más abajo. Las analogías, los
   dibujos y los ejemplos sí ayudan: esos se quedan.
10. **Corto.** La Parte 1 · Aprende de una guía: **unas 350 líneas de Markdown, nunca más de
    400**; la guía entera, 600 (lo que la alarga son los ejercicios que puntúan y la entrega, que
    no se tocan).
    La instalación de Arch, que son 18 pasos con sus comprobaciones, hasta 750. Una tarea suelta,
    menos de 300. Si se pasa, quita antes de resumir. El material retirado se deja en `_obsoleto/`
    con la fecha, nunca se borra.

## El esqueleto de una guía

Un solo fichero `1-guia.md` por tema (las tareas sueltas, `N-tarea-nombre.md`). En este orden, con
estos nombres exactos (los enlaces del `LEEME.md` y de otras guías apuntan a estas anclas):

```markdown
---  (cabecera YAML igual que las demás: modulo, nivel, tema, tipo: Guía, competencias, herramientas, duracion)
# Título corto, sin dos puntos si se puede
> **Antes de empezar.** Qué hace falta tener (MV, terminal…). Dos líneas.
Tres o cuatro líneas que enganchen: qué va a poder hacer al terminar y por qué le importa.
> **Analogía.** Una comparación con la vida real que se mantiene en toda la guía.
| | |  (la única tabla fija: 🎯 Qué vas a aprender · 🧰 Qué necesitas · ⏱️ Tiempo · 📦 Qué entregas)
**Tu misión, paso a paso:** lista de casillas `- [ ]`, de 4 a 6.
## Índice  (manual, hasta ###)
## Parte 1 · Aprende
### 1. Nombre del apartado  (de 5 a 8 apartados; cada uno: ejemplo/dibujo → explicación corta → 🧪 Pruébalo → 🧠 opcional → 📌 En una frase)
### N. Para saber más  (opcional, lo no imprescindible, muy corto)
## Parte 2 · Lo que te llevas  (resumen en frases + chuleta mínima)
## Parte 3 · Practica  (los ejercicios que puntúan, con pistas en cuadros)
## Parte 4 · Entrega  (qué se entrega, cómo se corrige, checklist «Antes de entregar, comprueba»)
```

En la guía de instalación de Arch las partes 1 a 3 son las tres fases de la instalación; después
van «Lo que te llevas» y «Entrega». Es la única excepción.

## Las marcas

Siempre los mismos iconos, para que el alumnado los reconozca de una guía a otra:

| Marca | Qué es | Dónde va |
|---|---|---|
| 🧪 **Pruébalo** | Uno o dos comandos o acciones para hacer ahora mismo, con «👀 Deberías ver…» | Al final de cada apartado |
| 🧠 **¿Lo has pillado?** | De 1 a 3 preguntas cortas con la respuesta en `<details>` | Después del Pruébalo, sólo si hay algo que confundir |
| 📌 **En una frase** | El apartado resumido en una línea en negrita | Última línea de cada apartado |
| ❓ | Una pregunta que hay que contestar en el documento de entrega | En las tareas, tras cada comando |
| 🎒 **Lo que te llevas** | El resumen final de la guía | Parte 2 |
| ✅ **Antes de entregar, comprueba** | Checklist de casillas | Parte 4 |

Las marcas van en texto normal (negrita), nunca dentro de los encabezados: los emojis rompen los
anclajes.

## Cuadros de colores

Son los de `guias/LEEME.md`: `> [!TIP]`, `> [!NOTE]`, `> [!IMPORTANT]`, `> [!WARNING]`,
`> [!CAUTION]` y las etiquetas en negrita (`> **Analogía.**`, `> **Ejemplo.**`, `> **Reto.**`,
`> **Antes de empezar.**`). Normas:

- Un cuadro por idea, y nunca tres cuadros seguidos: entre cuadro y cuadro, texto o dibujo.
- `[!WARNING]` y `[!CAUTION]` sólo para lo que rompe cosas o se pregunta en el examen.
- Dentro de una lista no funciona `[!TIP]`: ahí, `> **Consejo.**`.
- El «Pruébalo» va dentro de un `> [!TIP]` cuando lleva comandos; si es una acción de ratón, en
  texto normal.

## Tablas

Una tabla ayuda cuando **compara cosas del mismo tipo con las mismas columnas** y tiene **5 filas
como mucho**: Linux frente a Windows, los tres algoritmos, las cuatro particiones. Todo lo demás,
no:

- Un concepto con su explicación → texto: `**Proceso**: un programa funcionando.` (lista con negrita).
- Teclas o comandos de una herramienta → bloque de código con un comentario por línea, y sólo los
  5 o 6 que de verdad van a usar.
- Glosarios → fuera. Las palabras se explican donde aparecen y se repiten en «Lo que te llevas».
- Tablas de «qué hace cada opción» de 8 filas → se quedan las 3 opciones que usan, en texto.
- Datos numéricos de un ejercicio (tiempos de un Gantt, tamaños de particiones) → sí, tabla: ahí
  los números se leen mejor.
- La tabla fija de la cabecera (🎯🧰⏱️📦) y la chuleta de «Lo que te llevas» se mantienen.

Cuenta las tablas al terminar: más de 8 en una guía es señal de que algo se ha explicado con una
tabla en vez de con un ejemplo.

## Diagramas e imágenes

- Un SVG por idea difícil, en `images/` del tema, hecho a mano (sin librerías). Si una idea ya
  tiene diagrama en otra guía, se reutiliza por ruta relativa, no se copia.
- Normas técnicas (están en `guias/LEEME.md`, sección «Diagramas y autocomprobación»): fondo
  propio `#fcfcfb` con borde `#e2e5e9`, ancho de 860 a 900, fuente `'Segoe UI', Roboto, Helvetica,
  Arial, sans-serif` y `Consolas, 'DejaVu Sans Mono', monospace` para código, `<title>` y `<desc>`
  en castellano, texto en negro `#0b0b0b` o gris `#52514e`, nunca del color de la serie.
- Paleta, en este orden: azul `#2a78d6` (relleno `#cde2fb`), naranja `#eb6834` (`#fde4d8`), aqua
  `#1baf7a` (`#d3f2e6`), amarillo `#eda100` (`#fdefcc`), rosa `#e87ba4` (`#fbe3ec`), verde
  `#008300` (`#d6efd6`), violeta `#6250d6` (`#e4e0f8`), gris `#8a8f98` (`#eef0f3`). Terminales
  `#1e2227` con texto `#e6e9ee`.
- Dentro del SVG: pocas etiquetas (menos de 10), texto a 13 px o más, una sola idea. Si hace falta
  explicar el dibujo con un párrafo, el dibujo está mal.
- El texto alternativo del Markdown (`![…](images/x.svg)`) describe el dibujo entero: es lo que
  lee quien no lo ve.
- **Siempre se renderizan y se miran** antes de darlos por buenos:
  `powershell -ExecutionPolicy Bypass -File guias\_herramientas\render-svg.ps1 ruta\a\*.svg` deja
  los PNG en `%TEMP%\guias-render\` y se abren con la herramienta de leer imágenes. Se corrige lo
  que se solape, se corte o se salga.
- Las capturas de pantalla reales (PNG) se quedan cuando enseñan algo que el alumno va a ver tal
  cual en su máquina.

## Vocabulario

Sustituir siempre:

| No | Sí |
|---|---|
| directorio (en texto) | carpeta |
| notación octal / simbólica | «con números» / «con letras» la primera vez; luego el nombre |
| expropiativo, apropiativo | «se puede interrumpir» / «no se interrumpe» |
| ejecutar | abrir, arrancar, lanzar (según el caso); «ejecutar» sólo para comandos |
| el usuario debe, conviene, se recomienda | haz, escribe, pulsa |
| i.e., e.g., etc. | es decir, por ejemplo, y más |
| siglas sin explicar (PID, UEFI, GPT…) | la primera vez, con su explicación en la misma frase |

## Cómo se revisa o se crea una guía

1. Lee esta página, `guias/LEEME.md` y la guía modelo:
   `guias/1-basico/03-procesos/1-guia.md`.
2. Si la guía existe, muévela a `guias/_obsoleto/antes-de-<qué>-<AAAA-MM-DD>/<tema>/` antes de
   tocarla. No se borra nada.
3. Escribe la guía nueva siguiendo el esqueleto. Reutiliza los SVG y capturas que ya hay en
   `images/`; crea los que falten y renderízalos.
4. Comprueba enlaces, imágenes y anclajes (el script de abajo tiene que salir vacío).
5. Cuenta tablas (≤ 8), líneas (≤ 500) y palabras técnicas nuevas (≤ 10).
6. Actualiza la fila del tema en `guias/LEEME.md` y apunta en
   `guias/_docente/decisiones-y-pendientes.md` qué se cambió y qué errores se corrigieron.
7. Exporta: desde `guias`, `powershell -ExecutionPolicy Bypass -File _herramientas\exportar.ps1 -Solo "NN-*"`
   genera el HTML para Moodle (`_moodle/`) y el PDF (`_moodle/pdf/`).

Comprobación de enlaces y anclajes (Bash, desde `guias/`):

```bash
f=RUTA/1-guia.md; d=$(dirname "$f")
slugs_of() { grep -E '^#{1,4} ' "$1" | sed -E 's/^#+ //' | tr 'A-ZÁÉÍÓÚÑ' 'a-záéíóúñ' | sed -E 's/[^[:alnum:]áéíóúñü _-]//g; s/ /-/g'; }
grep -oE '\]\([^)#][^)]*\)' "$f" | sed -E 's/^\]\(//; s/\)$//' | grep -vE '^https?:' | while read -r p; do path="${p%%#*}"; anc="${p#*#}"; [ -e "$d/$path" ] || { echo "FALTA: $p"; continue; }; [ "$anc" != "$p" ] && { slugs_of "$d/$path" | grep -qxF "$anc" || echo "ANCLA EXTERNA ROTA: $p"; }; done
slugs=$(slugs_of "$f"); grep -oE '\]\(#[^)]+\)' "$f" | sed -E 's/^\]\(#//; s/\)$//' | sort -u | while read -r a; do echo "$slugs" | grep -qxF "$a" || echo "ANCLA ROTA: #$a"; done
```

## Lo que no se hace

- No se cambia qué se evalúa ni cuánto puntúa cada cosa sin decirlo en el informe final.
- No se inventan salidas de comandos: si no se puede comprobar, se describe lo que pasa.
- No se toca `_moodle/` a mano, ni `_herramientas/`, ni los temas que no son el encargo.
- No hay Python en el equipo: el exportador que funciona es `exportar.ps1` (Node de VS Code + Edge).
- No se hacen commits salvo que Mikel lo pida.
