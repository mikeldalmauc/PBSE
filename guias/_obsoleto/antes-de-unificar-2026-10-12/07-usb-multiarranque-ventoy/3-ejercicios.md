---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 2 · Intermedio
tema: "07"
tipo: Ejercicios
competencias: CM2 (particiones y sistemas de archivos, en un disco real)
herramientas: Ventoy 1.1.17, H4 (terminal Linux) y PowerShell para las comprobaciones
duracion: 5 h (2 sesiones en el aula + descargas)
---

# Ejercicios · USB multiarranque con Ventoy: la navaja suiza del técnico

> **Nota.** Esta página acompaña a la [explicación del tema](1-explicacion.md). Léela antes de ponerte con los ejercicios.

## Entregable

**Tarea Moodle: «Mi navaja suiza USB»**
Calificación de 0 a 10 · Se aprueba con 5.

Entrega un **PDF exportado desde Markdown** (como en la [guía de Markdown](../../1-basico/01-markdown/1-explicacion.md)) con:

1. **Ficha del pincho**: marca, capacidad anunciada y capacidad real que ve Windows, versión de
   Ventoy, estilo de partición y si tiene Secure Boot activado. Explica la diferencia entre las
   dos capacidades.
2. **Captura de Administración de discos** (o la salida de `Get-Partition` en texto) donde se
   vean las dos particiones, y un párrafo que explique para qué sirve cada una.
3. **Tabla de ISOs**: nombre, versión, tamaño, web oficial y **resultado de la comprobación
   SHA-256** (la salida de `Get-FileHash` en texto, no en captura).
4. Tu **`ventoy.json`** con al menos `VTOY_DEFAULT_MENU_MODE` y tres `menu_alias`.
5. **Prueba de arranque** en un equipo real: foto con el móvil del menú de Ventoy y de las tres
   pantallas del [apartado 6.3](1-explicacion.md#63-el-menú-de-ventoy). Indica el modelo del equipo, la tecla del
   menú de arranque y si tuviste que registrar la clave MOK.
6. **Cuatro preguntas**, con tus palabras:
   1. ¿Por qué Ventoy formatea en exFAT y no en FAT32?
   2. ¿Por qué un pincho con tabla MBR puede arrancar en un equipo UEFI con disco GPT?
   3. ¿Qué es la clave MOK y por qué la pide Ventoy la primera vez?
   4. Ventoy se salta Secure Boot una vez registrada su clave. ¿Qué riesgo supone eso en los
      equipos de una empresa?
7. **Tres situaciones** que te dará el profesor en Moodle, del estilo de las del
   [apartado 7](2-chuleta.md#qué-herramienta-saco-en-cada-situación): qué herramienta sacas y qué pasos
   darías.
8. **Incidencias**: qué se torció y cómo lo resolviste.

**Rúbrica**

| Criterio | Puntos |
|---|---|
| Ficha del pincho y explicación de las particiones (1 y 2) | 1,5 |
| Tabla de ISOs completa y verificada con SHA-256 (3) | 2 |
| `ventoy.json` válido y funcionando (4) | 1 |
| Prueba de arranque documentada (5) | 2 |
| Respuestas a las cuatro preguntas (6) | 2 |
| Situaciones resueltas con criterio (7) | 1 |
| Incidencias y calidad del documento (8, formato, capturas con pie) | 0,5 |

**Defensa en el aula** (sin nota aparte, pero sin ella no se califica la tarea): el profesor te
pide una herramienta de la lista y tienes que llegar a su pantalla principal en un equipo del aula
en menos de **tres minutos**, desde el equipo apagado.
