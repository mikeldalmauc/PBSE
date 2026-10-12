# Notas del profesor: decisiones, errores corregidos y pendientes

Documento interno. **No se exporta a Moodle.**

**Origen del material.** Las guías traducidas vienen del repositorio `sinfortolosaldealh`, carpeta
`2-sistema eragileak`, escritas en euskera para un curso anterior. Se han traducido al castellano,
actualizado y reordenado por niveles.

## Índice

- [Notas del profesor: decisiones, errores corregidos y pendientes](#notas-del-profesor-decisiones-errores-corregidos-y-pendientes)
  - [Índice](#índice)
  - [1. Decisiones tomadas y por qué](#1-decisiones-tomadas-y-por-qué)
  - [2. Errores del material original corregidos](#2-errores-del-material-original-corregidos)
  - [3. Material del repositorio que no se ha traducido](#3-material-del-repositorio-que-no-se-ha-traducido)
  - [4. Qué queda pendiente](#4-qué-queda-pendiente)

---

## 1. Decisiones tomadas y por qué

**Linux Mint 22.3 Xfce como sistema de escritorio** (en lugar de Ubuntu), por los requisitos
técnicos de las aulas. Ajustes obligatorios de VirtualBox: VMSVGA, 128 MB de vídeo, sin
aceleración 3D, paginación anidada activada y sin códecs multimedia en la MV.

**Todas las instalaciones en UEFI + GPT.** La guía original de Arch instalaba en BIOS/MBR. Tener
unas máquinas en BIOS y otras en UEFI obligaba a explicar dos veces lo mismo; ahora Mint, Arch y la
ampliación de RAID usan el mismo esquema y el alumno reconoce las mismas particiones en las tres.
Hay que marcar **Habilitar EFI** en cada MV.

**La ampliación se mantiene en RAID 0.** RAID 0 no aporta redundancia, así que la guía lo explica al
principio y el análisis del entregable pregunta qué habría cambiado con RAID 1. La redundancia de
verdad se trabaja con el volumen reflejado en Windows. Para pasar a RAID 1: `--level=1` en los dos
`mdadm --create`, 9 GB útiles en lugar de 18, y el experimento de fallo demuestra que el sistema
sigue arrancando.

**zsh + Powerlevel10k como tema principal**, instalado con `git clone`. La guía avisa de que p10k
está en modo mantenimiento y ofrece **Starship** como ampliación. **Sin Oh My Zsh** a propósito:
esconde justo lo que hay que evaluar, que es entender cada línea del `.zshrc`.

**Retirado BlackArch** de la guía de Arch: cientos de paquetes de auditoría ajenos al módulo que
cambian el comportamiento de `pacman`.

**XFCE en lugar de GNOME** en Arch: con 2 GB de RAM GNOME va muy justo y la descarga es enorme.

**`neofetch` → `fastfetch`**: `neofetch` está archivado desde 2024.

**SSH y FTP fuera del módulo** (2026-09-23): son servicios de red y pertenecen a otros módulos del ciclo. El material está en `_obsoleto/retirados-2026-09-23/`.

**La guía de comandos se redujo al mínimo** (navegar, rutas, crear, ver, copiar/mover/borrar,
comodines, ayuda). `find`, `grep`, tuberías, enlaces, `tar`, `rsync`, disco y equivalencias con
Windows se retiraron a `_obsoleto/retirados-2026-09-23/` (tema 06), junto con los trucos de la
consola (tema 10), por resultar demasiado complejos para el nivel.

## 2. Errores del material original corregidos

| Guía original | Error | Corrección |
|---|---|---|
| Arch | `grub-install /dev/sda` | Es BIOS/MBR. En UEFI: `grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=GRUB` |
| Arch | `mkdir -p Desktop/mikel/repos` | Debe ser `mkdir -p ~/repos` |
| Arch | `curl -O ... > strap.sh` | `-O` ya guarda el fichero y la redirección lo pisa. Apartado retirado |
| Arch RAID | `mdadm-conf` | El fichero es **`mdadm.conf`** |
| Arch RAID | `md0` llamado «swap» y `md1` «root» | `md0` = raíz, `md1` = swap |
| Arch RAID | `efibootmgr -c -g -d /dev/sdb1 -p 1` | `-d` espera el disco: `/dev/sdb` |
| Arch RAID | Faltaba el hook `mdadm_udev` | Añadido. Sin él no arranca |
| Arch RAID | Particionaba dentro del array (`md0p1`) | Se formatea el array directamente |
| Arch (ambas) | Tres `echo ... > /etc/hosts` seguidos | Con `>` cada línea borra la anterior: `>>` o editar |
| Permisos | `r--rwx--t` → 470 | La base es **471** y el resultado **1471** |
| Permisos | Atributo `e` = «sobrescribe con ceros» | Eso es `s`. `e` = *extent format* |
| Permisos | No distinguía `s`/`S` ni `t`/`T` | Añadida la tabla |
| Procesos | `killid id` | `kill PID` |
| Scripting | `elif [$ADINA -ge 18]` | `elif [ "$EDAD" -ge 18 ]` |
| Scripting | `eq`, `ne`, `lt`… | `-eq`, `-ne`, `-lt`… |
| Scripting | Variables sin comillas | Regla de entrecomillar y su motivo |
| Guest Additions | ISO de VirtualBox 7.0.14 en el repositorio | Desde el menú de VirtualBox o los repositorios |
| Mint (VirtualBox 7.2) | «Marca Omitir instalación desatendida» | La casilla es «Proceed with Unattended Installation» y hay que **desmarcarla** |

## 3. Material del repositorio que no se ha traducido

| Fichero original | Por qué |
|---|---|
| `f1-FrogaArchLinuxInstalatzen.md` | Examen de instalación de Arch. Aprovechable para la prueba práctica, hay que adaptarlo a UEFI |
| `f2-Froga Arch Linux Pertsonalizatzen.md` | Examen con el entorno Yoru (AwesomeWM): desproporcionado para 1.º. Su parte útil está en los temas 11 y 12 |
| `7-froga Baimenak eta Scriptak` (V1-V3) | Exámenes de permisos y scripting. Pendientes de adaptar |
| `scrapping-aplikazioa.md`, `3-birtualizazioa/`, `4-Hakinga/`, `5-mvc-*`, `6-Sareak` | Otros módulos o ciclo superior |
| `tresnak-oinarrizkoak/` (git, VS Code) | Markdown ya está rehecho (tema 01); git y VS Code, por decidir |

## 4. Qué queda pendiente

Temas del módulo que todavía **no tienen guía**, agrupados por nivel.

**Básico**

- Arquitectura del SO y gestión de memoria.
- Sistemas de archivos, particiones y arranque (la práctica de arranque está en el tema 07).
- Virtualización y estructura de una máquina virtual.
- Instalación de Windows en máquina virtual.
- Discos virtuales y particiones de datos.
- Carpetas personales y compartidas, rutas.
- CMD y PowerShell: el par en Windows del tema 04.

**Intermedio**

- Servicios y modelo de cuentas.
- Sistemas de archivos avanzados.
- Usuarios, grupos y políticas de contraseñas.
- Permisos NTFS, herencia y permisos efectivos (el par obligado del tema 09).
- GPO y consola MMC.
- Gestión de paquetes (parcial: `pacman` y AUR en el tema 08).

**Avanzado**

- Sistemas operativos móviles.
- RAID y copias de seguridad en Windows (el tema 14 es sólo la ampliación en Arch).
- Despliegue de software desatendido.
- Reto ETHAZI: enunciado y rúbrica.

**Instrumentos de evaluación**

- Rúbrica de manual técnico.
- Rúbrica de código (scripting).
- Rúbrica del reto (producto, proceso, documentación y defensa).
- Plantillas de autoevaluación y coevaluación ETHAZI.
- Adaptación de los exámenes antiguos a las pruebas prácticas.
