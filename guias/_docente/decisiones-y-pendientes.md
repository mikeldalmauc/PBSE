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

**Guía única en los temas 03, 07 y 09** (2026-10-12). Explicación, chuleta y ejercicios se han
unido en `1-guia.md`, dividido en *Aprende*, *Chuleta*, *Practica* y *Entrega*, con diagramas SVG
propios, cuadros de colores y preguntas de autocomprobación. La tarea 05-4 (mapa de directorios) se
ha rehecho más guiada: ocho misiones con comandos y experimentos por directorio, tabla de referencia
y la plantilla del documento, que faltaba. Se añadió el criterio 5 (tabla de referencia completa).
Las versiones anteriores están en `_obsoleto/antes-de-unificar-2026-10-12/`.

**Guía única también en 04, 08 y 12, y guía nueva de Windows (06)** (2026-10-12). En la de
comandos (04) cada apartado acaba con su «Pruébalo» y enlaza con su ejercicio; los 12 ejercicios
y la evaluación no cambian, y las pruebas se hacen en `~/arenero`. Se separaron las llaves `{}` de
los comodines (no lo son) y se añadió que `*` no coge ocultos. La de Arch ya
instalaba en GPT; ahora lo explica (MBR frente a GPT), lo comprueba (`fdisk -l`, `lsblk -o
PARTTYPENAME`, `efibootmgr -v`) y enseña a rehacerlo con `wipefs` si se elige `dos`. El apartado
de entorno gráfico ofrece siete opciones (XFCE recomendado, KDE Plasma, GNOME, Cinnamon, MATE,
LXQt e i3) y el taller da equivalencias para todas. El número 06, libre desde que se retiró la
ampliación de ficheros, lo ocupa «Windows por dentro» (diferencias con Linux y herramientas de
administración), con entrega Apto / No apto y competencias por asignar.

**Revisión «como un chaval de 16 años»** (2026-10-31). Las siete guías únicas (03, 04, 06, 07,
08, 09 y 12) se han reescrito para que se entiendan a la primera: el ejemplo o el dibujo antes
que la definición, un «🧪 Pruébalo» en cada apartado (ejercicio en el momento, no al final),
repetición de las palabras clave, «📌 En una frase» al cerrar cada apartado y una Parte 2 nueva,
«Lo que te llevas» (resumen en frases + chuleta mínima), en lugar de la chuleta de tablas. Se han
quitado las tablas que no comparaban nada (de 14 a 21 por guía a 8 como mucho), los glosarios y
los términos que no hacen falta para la práctica ni el examen (van a «Para saber más» o fuera).
Resultado (líneas · tablas, antes → después): 03 procesos 678·22 → 542·8; 04 comandos 1104·21 →
603·8; 06 Windows 546·16 → 449·4; 07 Ventoy 757·20 → 597·3; 08 Arch 1005·14 → 706·3; 09 permisos
884·20 → 564·5; 12 taller 954·7 → 558·3. Lo que se evalúa no cambia, salvo que la radiografía de
Windows (06) pasa de 11 a 8 preguntas y la práctica sigue siendo Apto / No apto. El contrato de
estilo está en `../CLAUDE.md` (raíz de PBSE) y la guía modelo es la del tema 03. Las versiones
anteriores están en `_obsoleto/antes-de-simplificar-2026-10-31/`. Pendiente: cuando Mikel dé el
visto bueno al estilo, crear una skill para generar guías y prácticas nuevas con él.

**Tarea nueva 16: Omarchy** (2026-11-01). Tarea suelta (`1-basico/16-omarchy/1-tarea-omarchy.md`,
Apto / No apto, 4 h; la entrega son seis capturas del sistema con una línea cada una, sin
documento: Mikel quitó la tabla final, la plantilla y «Lo que despista», y las ❓ quedan como
preguntas para comentar en clase) sobre Omarchy 4, el Arch con instalador y escritorio Hyprland de DHH. **Va
antes que la guía de Arch** (nivel básico, tras Mint y comandos): es para que vean un sistema
moderno y divertido; Arch a mano llega el trimestre siguiente. Por eso no depende de la guía 08:
compara con Mint (tabla final Mint frente a Omarchy), explica `pacman` como el `apt` de Arch y
AUR desde cero, y presenta Arch como «lo que instalarás pieza a pieza el trimestre que viene». Por
petición de Mikel la instalación va corta (un apartado) y el peso está en: qué se puede hacer
con él (teclado, mosaico y escritorios, temas, capturas y OCR, portapapeles con historial,
extras del terminal), el estilo a mano (huecos, bordes y esquinas en `looknfeel.lua`, fondo
propio, letra, marca en el salvapantallas; tema propio y Aether como reto) y cómo se instalan
programas por cuatro vías (paquete oficial, AUR, web app y TUI), más quitar y actualizar con
`omarchy update`. Se hace en **Isard VDI**, no en VirtualBox: el alumnado ya tiene la ISO con
permiso de uso; crea el escritorio desde ella eligiendo núcleos (4), RAM (4 GB) y disco (40 GB), y
después cambia el arranque a disco duro. Aviso de que la tecla `Super` se la queda Windows en el
visor del navegador: usar el visor SPICE a pantalla completa. Enlaza los vídeos de DHH (Omarchy
Quattro, youtu.be/F7fe9pa8OeE) y de NetworkChuck (youtu.be/9SDkU5VDQEQ). Tono más vivo por
petición de Mikel: emojis en el texto (nunca en encabezados), un cuadro con la idea de DHH del
ordenador «tuyo de verdad» y seis capturas reales de Omarchy en `images/` (webp): tres previsualizaciones
de temas (Tokyo Night, Hackerman, Retro 82), el instalador, el mosaico a cuatro y el historial
del portapapeles. Vienen del repositorio `omacom/omarchy` y de su manual (omarchy.org/manual),
licencia MIT; se bajaron el 01/11/2026. En la cabecera va el logotipo oficial (`logo.svg` del
repositorio), no una captura. Los vídeos son la referencia del apartado 2: un cuadro mapea los
capítulos del de NetworkChuck (minutos sacados de la página del vídeo) a cada apartado, y el 2.8
«Lo que enseñan los vídeos y no cabe aquí» (no puntúa) recoge juegos, Windows dentro de Omarchy,
el agente de IA y los plugins. El vídeo de DHH no tiene capítulos y se cita en general; no se
pudieron bajar los subtítulos. Reutiliza el diagrama de capas de la guía 08 y enlaza al nivel 0
del taller 12. Decisiones sin datos de Mikel: número 16 (10 y 15 están retirados), CM1 y
CM4, cifrado de disco activado por defecto y escala
`omarchy_gdk_scale = 1` para la MV. Fuera: cambiar atajos en `bindings.lua` (reto) y restaurar
instantáneas de Limine. **No se ha probado en Isard**: comprobar antes de darla que el escritorio
creado desde la ISO arranca en UEFI (Omarchy lo necesita) y si el modelo de vídeo por defecto (QXL)
arranca Hyprland (las guías de Omarchy para QEMU/KVM recomiendan virtio y hablan de cuelgues con
QXL); que en el visor SPICE la tecla `Super` llegue a la MV; las rutas de menú *Setup →
Monitors* y *Setup → Look & Feel*; que el instalador pida teclado, usuario, contraseña y nombre
de equipo en ese orden; y que `omarchy pkg add` e *Install → TUI* funcionen como dice el manual
(omarchy.org/manual, versión 4.0.6).

**Tarea nueva 17: Tu ordenador en el bolsillo** (2026-11-01). Tarea suelta
(`1-basico/17-claude-y-drive/1-tarea-tu-ordenador-en-el-bolsillo.md`, Apto / No apto, 6 h en
tres sesiones), detrás de Omarchy y antes de Arch. Reproduce el montaje de Mikel con un agente
gratuito: **Codex** (OpenAI; cuenta de ChatGPT gratuita, que admite desde 13 años con permiso
familiar) en la Omarchy de Isard, **Codex en remoto desde la app de ChatGPT** con
`codex remote-control start` + `pair` la primera vez y `codex remote-control` cada día (Mikel lo
tiene así en su Raspberry; OpenAI lo marca como experimental y su guía de conexiones remotas aún
habla sólo de macOS y Windows con la app de escritorio, pero el comando de la CLI está
documentado en «Developer commands»), Tailscale en los dos aparatos (con Tailscale SSH + Termius
como reto y como camino alternativo si el remoto falla), rclone con `bisync` cada 5 min por
`cronie` (`~/Drive/.sync.sh` con la lista `~/Drive/.carpetas`, flags `--resilient --recover
--max-lock 2m --conflict-resolve newer --drive-skip-gdocs`, como en la Pi), y dos skills en
`~/.agents/skills/` (formato Agent Skills, el mismo que leen Claude Code y otros), creadas con
ayuda de Codex pero con el script dado en la guía para que funcionen a la primera:
`carpeta-compartida` (crear.sh NOMBRE) y `descargar` (descargar.sh [--audio] URL…, con el yt-dlp
que trae Omarchy). Cierre: pedir la descarga desde el móvil y verla en la app de Drive. Entrega:
seis capturas y los ficheros de las dos skills; Apto si funcionan y saben explicar cada línea.
Tres SVG propios (mapa, bisync, anatomía de una skill).
**Por qué Codex y qué queda por resolver.** Claude Code necesita plan de pago y claude.ai exige
18 años; Antigravity (Google) es gratis pero su FAQ lo cierra a menores de 18; Qwen cerró su
gratis en abril de 2026. Codex funciona con ChatGPT Free (límites cortos por ventanas de cinco
horas: la guía avisa de no gastar el cupo) y lee el mismo `SKILL.md`. Si Codex fallara en el
aula, GitHub Copilot CLI (plan Free, 13+, skills en `.agents/skills`) es el recambio con menos
cambios. Además, rclone retira su `client_id` compartido de Drive en 2026, así que la guía dice
que el profesor da un `client_id` y `client_secret` del aula: hay que crearlos en Google Cloud
(proyecto, API de Drive, pantalla de consentimiento externa, cliente OAuth de tipo «Desktop
app») y **publicar la app**, porque en modo prueba los permisos caducan a la semana; una misma
clave sirve hasta 100 usuarios. Sin probar en Isard: que el lanzador de Omarchy
(`Super+Mayús+Ctrl+A`) instale `codex`, el emparejamiento «Pair manually» en la app de ChatGPT de
Android, que `tailscale ping` llegue al móvil (la app del móvil tiene que estar conectada) y que
Termius entre por Tailscale SSH sin más configuración.

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
| Procesos | Diagrama de estados: «Bloqueado → En ejecución» y flecha «fin» hacia «Listo» | Bloqueado → **Listo**; En ejecución → **Terminado** |
| Permisos | `r--rws--T` → 460 → 3460 | La `s` minúscula lleva `x`: base **470** → **3470** |
| Ventoy | Faltaba el apartado 7 (saltaba del 6 al 8) | Las situaciones de la chuleta pasan a ser el apartado 7 |
| Taller | `awk 'NR==2 {print $3\" de \"$2…}'` dentro de `$(…)` | Las `\"` llegaban a `awk` y daba error: `print $3 " de " $2 …` |
| Taller | `crontab -e` sin más en Arch | Arch no trae cron: `pacman -S cronie` y `systemctl enable --now cronie` |
| Taller | Cron con sólo `DISPLAY=:0` | `xfconf-query`, `gsettings` y `notify-send` necesitan también `DBUS_SESSION_BUS_ADDRESS` |
| Taller | `pacman -Qqe` para la lista de paquetes oficiales | Incluye los de AUR y `pacman -S` falla: `-Qqen` (oficiales) y `-Qqem` (AUR) |
| Taller | Copiaba `~/.config/xfce4/xfconf` y lo restauraba en `~/.config/xfconf` | Se copia `~/.config/xfce4` entero |
| Comandos | `touch` «si ya existe, no lo toca» | Sí lo toca: le cambia la fecha de modificación |
| Taller | Enlace a «opción G» de la guía de Arch, que ya no existe | Apunta al paso 16, donde está la tabla de escritorios |
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
