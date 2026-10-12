---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 2 · Intermedio
tema: "08"
tipo: Ejercicios
competencias: CM1, CM2
herramientas: H1 (VirtualBox), H4 (terminal Linux)
duracion: 15 h
origen: traducción y actualización de «1-Arch Linux Instalatzen.md» (curso anterior)
---

# Ejercicios · Instalación de Arch Linux en VirtualBox (UEFI + GPT)

> **Nota.** Esta página acompaña a la [explicación del tema](1-explicacion.md). Léela antes de ponerte con los ejercicios.

## Entregables

**Parte 1 — Bitácora de instalación: preparación y particionado**
Esquema de particionado justificado + salida de `lsblk -f` y `findmnt /mnt`.
*Evaluación: observación del proceso y lista de cotejo del particionado.*

**Parte 2 — Bitácora de instalación: sistema base y arranque**
Comandos ejecutados con una frase explicando qué hace cada uno + capturas del menú de GRUB, del
inicio de sesión y de `fastfetch`. Salida de `groups alumno`, `efibootmgr -v` y `cat /etc/fstab`.
*Evaluación: lista de cotejo del arranque correcto y del usuario creado.*

**Parte 3 — Ficha de incidencias**
Para cada problema: síntoma, causa, solución aplicada y comprobación de que se resolvió.
*Evaluación: rúbrica de resolución de problemas.*

**Al terminar — Manual de instalación de Arch Linux (entregable principal del bloque, CM1)**
Reúne las tres bitácoras en un manual **reproducible**. Después, otro equipo va a instalar
Arch siguiendo tu manual **sin poder preguntarte nada**, y anotará todo lo que falte o esté
ambiguo. Escríbelo pensando en eso.

**Trabajo en parejas (parte 2).** Roles alternos: uno teclea (*operador*) y el otro lee la guía
y verifica (*verificador*). Se cambia a mitad de sesión. Quien sólo mira, no aprende a instalar.
