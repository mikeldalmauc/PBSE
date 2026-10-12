---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 3 · Avanzado
tema: "11"
tipo: Ejercicios
competencias: CM4 (parcialmente)
herramientas: H2 (CMD/PowerShell), H4 (terminal Linux y Bash)
duracion: 10 h
---

# Ejercicios · Personalización del intérprete de comandos y del entorno de trabajo

> **Nota.** Esta página acompaña a la [explicación del tema](1-explicacion.md). Léela antes de ponerte con los ejercicios.

## Qué evaluamos aquí

No se evalúa que el terminal quede bonito. Se evalúa que sepas responder a esto:

1. **¿Qué fichero se lee y cuándo?** Si pones un alias en el fichero equivocado, funciona hoy y
   deja de funcionar mañana. Hay que saber por qué.
2. **¿La configuración persiste?** Tras reiniciar la máquina, ¿sigue ahí?
3. **¿Afecta a otros usuarios?** La configuración de `alumno` no debe cambiarle nada a `root`
   ni a otro usuario. Eso es lo que se comprobará.
4. **¿Sabes explicar lo que has puesto?** Un `.zshrc` copiado de internet que no sabes leer
   vale cero. Cada línea del entregable tiene que llevar un comentario tuyo.

> Trabajamos sobre la **máquina virtual de Arch Linux** de la [guía de instalación de Arch](../../2-intermedio/08-instalar-arch-uefi/1-guia.md). Si la tienes rota,
> vuelve a tu instantánea `02-sistema-base`. También funciona todo en Linux Mint cambiando
> `pacman -S` por `apt install`.

## Entregable

**Tarea Moodle: «Configuración del intérprete de comandos documentada y justificada»**
Calificación de 0 a 10 · Se aprueba con 5 · Finalización automática por nota de aprobado.

Entrega un documento (PDF) con:

1. **Tabla de ficheros de arranque**: qué fichero se lee en cada situación (consola, terminal del
   escritorio, SSH, script) **comprobado por ti** con la prueba de los `echo` del apartado 1.
   Incluye la salida que obtuviste en cada caso.
2. **Tu `~/.zshrc` completo**, con un comentario propio en cada bloque explicando qué hace y por
   qué lo has puesto. Copiar el de la guía sin adaptarlo baja nota; se valora que quites lo que
   no usas y añadas al menos **tres alias y una función propios** que resuelvan algo que hagas
   de verdad.
3. **Tu perfil de PowerShell** con al menos tres alias, una función y un prompt personalizado.
4. **Capturas**: prompt de Powerlevel10k funcionando (con rama de Git visible dentro de un
   repositorio), autocompletado con sugerencia gris, coloreado de sintaxis con un comando
   erróneo en rojo, y el prompt de PowerShell.
5. **Comprobación de persistencia**: capturas antes y después de reiniciar.
6. **Comprobación de aislamiento**: la salida de `su - prueba`, `echo $SHELL` y `alias`
   demostrando que el otro usuario no hereda tu configuración, más una explicación en tus
   palabras de por qué es así.
7. **Tabla de equivalencias** Zsh ↔ PowerShell rellenada por ti.

*Instrumento de evaluación: lista de cotejo de la configuración y de su persistencia.*

> ⚠️ Se preguntará en clase por líneas concretas de tu `.zshrc`. Si no sabes explicar una línea,
> quítala. Un fichero corto que entiendes vale más que uno largo que no.
