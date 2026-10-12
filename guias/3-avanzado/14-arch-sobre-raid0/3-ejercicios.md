---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 3 · Avanzado
tema: "14"
tipo: Ejercicios
caracter: ACTIVIDAD OPCIONAL DE AMPLIACIÓN
competencias: CM2
herramientas: H1 (VirtualBox), H4 (terminal Linux)
origen: traducción y corrección de «2-Arch Linux Instalatzen RAID 0.md» (curso anterior)
---

# Ejercicios · Ampliación: instalar Arch Linux sobre un RAID 0 por software

> **Nota.** Esta página acompaña a la [explicación del tema](1-explicacion.md). Léela antes de ponerte con los ejercicios.

## Entregable

**Tarea Moodle: «Ampliación — Arch Linux sobre RAID 0»**
Actividad optativa · Se evalúa aparte · Se presenta en la defensa del reto final.

1. **Manual reproducible** con todos los comandos ejecutados y una explicación de qué hace cada
   bloque. Debe incluir los pasos específicos del RAID: `sgdisk`, `mdadm --create`, `mdadm.conf`
   y `mkinitcpio`.
2. **Capturas** de: `lsblk` con los dos discos particionados, `cat /proc/mdstat`,
   `mdadm --detail /dev/md0`, `df -h /` y el sistema arrancado.
3. **Medición de rendimiento** frente a la instalación normal, con los números obtenidos y
   **una explicación de por qué salen esos números** en un entorno virtualizado.
4. **Informe del experimento de fallo**: qué hiciste, qué mensaje salió, en qué momento del
   arranque, y si se recuperó.
5. **Análisis crítico** — es la parte que más puntúa:
   - ¿Qué gana y qué pierde este sistema respecto a la instalación de un solo disco?
   - ¿Por qué RAID 0 **no** es almacenamiento redundante, si las siglas dicen lo contrario?
   - ¿Qué habría cambiado en el proceso si el nivel fuera **RAID 1** en lugar de RAID 0?
     Concreta: capacidad útil, comandos que cambian, y qué habría pasado en el experimento
     del apartado 11.
   - ¿Tiene sentido duplicar la partición EFI en el segundo disco en un RAID 0? Justifícalo.
   - ¿Recomendarías este montaje a un cliente para el puesto de trabajo del reto? ¿Para qué
     tipo de datos sí y para cuáles no?

*Instrumento de evaluación: rúbrica de manual técnico + defensa oral en el reto final.*
