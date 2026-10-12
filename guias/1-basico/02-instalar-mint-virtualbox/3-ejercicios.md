---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 1 · Básico
tema: "02"
tipo: Ejercicios
competencias: CM1
herramientas: H1 (VirtualBox), H4 (terminal Linux)
duracion: 5 h
---

# Ejercicios · Instalación de GNU/Linux (Linux Mint) en máquina virtual

> **Nota.** Esta página acompaña a la [explicación del tema](1-explicacion.md). Léela antes de ponerte con los ejercicios.

## Entregable

**Tarea Moodle: «Manual de instalación con capturas — parte 2 (En Markdown)»**
Calificación de 0 a 10 · Se aprueba con 5.

Entrega un documento en PDF ( se puede convertir markdown a -> html y luego imprimir a PDF desde en navegador usando la extensión Markdown All in One) que contenga:

1. Ficha de la máquina virtual: nombre, RAM, procesadores, disco, EFI, controlador gráfico, red.
2. **Esquema de particionado propuesto y justificado** antes de instalar: por qué ese tamaño
   para `/`, por qué separas `/home`, por qué esa swap.
3. Capturas numeradas de: creación de la MV, teclado, tabla de particiones antes de confirmar,
   dispositivo del cargador de arranque, y escritorio ya instalado.
4. Salida de `lsblk -f`, `df -h`, `free -h` y `cat /etc/fstab` **en texto, no en captura**.
5. La tabla de comparación con la instalación de Windows rellenada.
6. Una explicación, con tus palabras, de **por qué el instalador dice 26 843 MB si el disco es
   de 25 GB**.
7. Un apartado de incidencias: qué se te ha torcido y cómo lo has resuelto. Si no se te ha
   torcido nada, escribe «ninguna» — pero es raro.

El criterio principal de evaluación es la **reproducibilidad**:
otra persona debe poder instalar el sistema siguiendo tu documento sin preguntarte nada.
