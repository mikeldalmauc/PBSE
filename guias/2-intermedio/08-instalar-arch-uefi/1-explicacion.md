---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 2 · Intermedio
tema: "08"
tipo: Explicación
competencias: CM1, CM2
herramientas: H1 (VirtualBox), H4 (terminal Linux)
duracion: 15 h
origen: traducción y actualización de «1-Arch Linux Instalatzen.md» (curso anterior)
---

# Instalación de Arch Linux en VirtualBox (UEFI + GPT)

> **Antes de empezar.** En la [guía de Linux Mint](../../1-basico/02-instalar-mint-virtualbox/1-explicacion.md) instalaste un sistema con un
> asistente gráfico. Ahora vas a instalar un sistema **desde la línea de comandos**, decidiendo tú
> cada paso. Lo que en Mint hacía el instalador por ti, aquí lo escribes tú.

> **Analogía.** Instalar Mint es comprar un menú del día: llega todo montado y sabe bien.
> Instalar Arch es cocinar: compras los ingredientes, los preparas en el orden correcto y si te
> saltas un paso no sale. Al final aprendes más de cocina, aunque comas más tarde.

## Índice

- [Instalación de Arch Linux en VirtualBox (UEFI + GPT)](#instalación-de-arch-linux-en-virtualbox-uefi--gpt)
  - [Índice](#índice)
  - [Reparto por partes](#reparto-por-partes)
  - [Parte 1 — Preparación y particionado](#parte-1--preparación-y-particionado)
  - [1. Crear la máquina virtual](#1-crear-la-máquina-virtual)
  - [2. Arrancar la ISO](#2-arrancar-la-iso)
  - [3. Comprobaciones previas](#3-comprobaciones-previas)
  - [4. Particionado](#4-particionado)
  - [5. Formateo](#5-formateo)
  - [6. Montaje](#6-montaje)
  - [Parte 2 — Sistema base y primer arranque](#parte-2--sistema-base-y-primer-arranque)
  - [7. Instalar el sistema base](#7-instalar-el-sistema-base)
  - [8. fstab](#8-fstab)
  - [9. Entrar en el sistema con chroot](#9-entrar-en-el-sistema-con-chroot)
  - [10. Hora, idioma y teclado](#10-hora-idioma-y-teclado)
  - [11. Nombre del equipo y hosts](#11-nombre-del-equipo-y-hosts)
  - [12. Usuarios y sudo](#12-usuarios-y-sudo)
  - [13. Gestor de arranque GRUB](#13-gestor-de-arranque-grub)
  - [14. Red y primer arranque](#14-red-y-primer-arranque)
  - [Parte 3 — Entorno gráfico e incidencias](#parte-3--entorno-gráfico-e-incidencias)
  - [15. Guest Additions](#15-guest-additions)
  - [16. Entorno gráfico](#16-entorno-gráfico)
  - [17. Repositorio AUR](#17-repositorio-aur)
  - [18. Diagnóstico de incidencias](#18-diagnóstico-de-incidencias)
    - [Banco de errores frecuentes](#banco-de-errores-frecuentes)

---

## Reparto por partes

| Parte | Qué se hace | Dónde termina |
|---|---|---|
| **1** | Preparar la MV, arrancar la ISO, red, particionado y formateo | Particiones creadas y montadas |
| **2** | Sistema base, chroot, configuración, GRUB y primer arranque | Consola con tu usuario y red |
| **3** | Entorno gráfico, Guest Additions y resolución de incidencias | Escritorio funcionando |

**Documentación oficial (en inglés, y hay que aprender a usarla):**
https://wiki.archlinux.org/title/Installation_guide

> ⚠️ **Cambio respecto a la guía del curso anterior.** Aquella instalaba en **BIOS/MBR** con
> `cfdisk` y etiqueta `msdos`. Ésta instala en **UEFI/GPT**, que es lo que se explica en la teoría del
> arranque y lo que usan los equipos actuales. Si sigues un tutorial de internet que use
> `grub-install /dev/sda` a secas, es de la versión antigua y aquí no te va a funcionar.

## Parte 1 — Preparación y particionado

## 1. Crear la máquina virtual

Descarga la ISO desde https://archlinux.org/download/ (elige un servidor español, por ejemplo
el de RedIRIS o el de Ubiquity).

En VirtualBox, **Nueva**, con **«Omitir instalación desatendida»** marcado:

| Recurso | Valor |
|---|---|
| Nombre | `Arch-SMR` |
| Tipo / Versión | Linux / Arch Linux (64-bit) |
| Memoria base | **2048 MB** |
| Procesadores | **2** |
| **Habilitar EFI** | **Sí** ⚠️ imprescindible |
| Disco | **20 GB**, reserva dinámica |
| Pantalla → memoria de vídeo | 128 MB |
| Red → Adaptador 1 | NAT |

> ⚠️ Si te olvidas de marcar **Habilitar EFI**, la instalación irá bien hasta el paso 13 y ahí
> `grub-install` fallará con un error sobre `efivarfs`. No podrás arreglarlo sin apagar la
> máquina y cambiar la configuración. Compruébalo ahora.

## 2. Arrancar la ISO

Arranca y elige la primera opción del menú, *Arch Linux install medium*. Terminarás en una
consola como `root@archiso ~ #`.

Lo primero, **el teclado en español**:

```bash
loadkeys es
```

Si ves la letra demasiado pequeña:

```bash
setfont ter-132b
```

> Este cambio de teclado sólo vale para esta sesión del instalador. En el paso 10 lo dejarás
> guardado para siempre en el sistema instalado.

## 3. Comprobaciones previas

**Que arrancaste en modo UEFI:**

```bash
cat /sys/firmware/efi/fw_platform_size
```

Debe responder `64`. Si dice «No existe el fichero o el directorio», has arrancado en modo BIOS:
apaga y activa EFI en la configuración de la máquina.

**Que hay internet:**

```bash
ping -c 3 archlinux.org
```

**Que la hora es correcta** (importante: si el reloj va mal fallan las firmas de los paquetes):

```bash
timedatectl set-ntp true
timedatectl status
```

**Qué discos hay:**

```bash
lsblk
```

Deberías ver un único disco `sda` de 20 GB sin particiones. Los `sr0` y `loop0` que aparecen son
el CD de instalación y su sistema de ficheros comprimido; no los toques.

## 4. Particionado

Vamos a crear cuatro particiones, las mismas que en Linux Mint para que puedas comparar:

| Nº | Dispositivo | Tamaño | Tipo | Para qué |
|---|---|---|---|---|
| 1 | `/dev/sda1` | 512 MB | EFI System | Gestor de arranque |
| 2 | `/dev/sda2` | 10 GB | Linux filesystem | Raíz `/` |
| 3 | `/dev/sda3` | 2 GB | Linux swap | Intercambio |
| 4 | `/dev/sda4` | resto (~7,5 GB) | Linux filesystem | `/home` |

Usamos `cfdisk`, que es el más visual de los particionadores de consola:

```bash
cfdisk /dev/sda
```

1. Te pregunta la **etiqueta**: elige **`gpt`**.
   *(La guía del curso anterior elegía `dos`; eso era para BIOS/MBR. GPT es lo que corresponde a UEFI.)*
2. Sobre *Free space*, **New** → tamaño `512M` → **Type** → `EFI System`.
3. Sobre el espacio libre restante, **New** → `10G` → deja el tipo por defecto (*Linux filesystem*).
4. **New** → `2G` → **Type** → `Linux swap`.
5. **New** → Intro para aceptar todo el resto → tipo por defecto.
6. **Write**, escribe `yes` y **Quit**.

Comprueba el resultado:

```bash
lsblk
```

> **Por qué el tipo de partición importa.** El tipo es una etiqueta que dice «aquí dentro hay
> esto». El firmware UEFI busca particiones marcadas como *EFI System* para arrancar; si marcas
> mal el tipo, el firmware no la mira siquiera. Es como el rótulo de una carpeta del archivador:
> el contenido no cambia, pero nadie la encuentra.

> 📷 **Captura** — salida de `lsblk` con las cuatro particiones creadas.

## 5. Formateo

Crear la partición es reservar el sitio; formatearla es poner dentro un sistema de archivos.

```bash
mkfs.fat -F32 /dev/sda1      # EFI: obligatoriamente FAT32
mkfs.ext4 /dev/sda2          # raíz
mkswap /dev/sda3             # swap
mkfs.ext4 /dev/sda4          # home
```

Activa la swap:

```bash
swapon /dev/sda3
```

Comprueba:

```bash
lsblk -f
```

## 6. Montaje

> **El orden importa.** Se monta **primero la raíz** y después lo que cuelga de ella. Si montas
> `/mnt/boot` antes que `/mnt`, el segundo montaje tapa al primero y pierdes el trabajo.

```bash
mount /dev/sda2 /mnt

mkdir -p /mnt/boot/efi
mount /dev/sda1 /mnt/boot/efi

mkdir -p /mnt/home
mount /dev/sda4 /mnt/home
```

Comprobación final de la parte 1:

```bash
lsblk
findmnt /mnt
```

> 💡 **Instantánea.** Apaga la máquina (`shutdown now`) y crea la instantánea
> `01-particionado`. Si algo sale mal en la parte 2, vuelves aquí. Al volver a arrancar
> tendrás que repetir `loadkeys es` y volver a montar las particiones (los montajes no se
> guardan; el particionado sí).

## Parte 2 — Sistema base y primer arranque

> Si vienes de la instantánea, repite: `loadkeys es`, `swapon /dev/sda3` y los tres `mount`
> del apartado 6. Comprueba con `findmnt /mnt` antes de seguir.

## 7. Instalar el sistema base

`pacstrap` copia los paquetes básicos dentro de `/mnt`, que hasta ahora está prácticamente vacío.

```bash
pacstrap -K /mnt base linux linux-firmware \
  networkmanager grub efibootmgr \
  sudo nano vim \
  base-devel man-db man-pages
```

| Paquete | Para qué |
|---|---|
| `base` | Conjunto mínimo de utilidades del sistema |
| `linux` | El núcleo |
| `linux-firmware` | Firmware de dispositivos |
| `networkmanager` | Gestión de la red |
| `grub` + `efibootmgr` | Gestor de arranque en UEFI |
| `sudo`, `nano`, `vim` | Administración y edición de ficheros |
| `base-devel` | Compilador y herramientas (harán falta para AUR) |
| `man-db`, `man-pages` | Manuales. No los quites: la respuesta suele estar ahí |

> La opción `-K` inicializa el llavero de claves de `pacman`. Si aun así ves errores de firma
> («signature is unknown trust»), ejecuta `pacman -Sy archlinux-keyring` y repite.

Es una descarga grande. **Buen momento para otra instantánea** cuando termine.

## 8. fstab

```bash
genfstab -U /mnt >> /mnt/etc/fstab
cat /mnt/etc/fstab
```

`genfstab` mira lo que hay montado ahora mismo y escribe la receta para que el sistema lo
monte solo en cada arranque. La opción `-U` usa **UUID** en lugar de `/dev/sdaX`.

> Es el mismo `/etc/fstab` que abriste en Linux Mint. Allí lo generó el instalador;
> aquí lo generas tú. Léelo y compáralo con el de Mint: verás que dice lo mismo.

## 9. Entrar en el sistema con chroot

```bash
arch-chroot /mnt
```

> **Qué acaba de pasar.** `chroot` cambia cuál es la carpeta raíz para los comandos que ejecutes
> a partir de ahora. Antes `/` era la ISO; ahora `/` es tu sistema nuevo. Es como entrar en la
> casa que estabas construyendo desde fuera: a partir de aquí, cuando escribas `/etc`, estás
> tocando el `/etc` del sistema instalado, no el del instalador.
>
> Fíjate en que el *prompt* cambia a `[root@archiso /]#`.

## 10. Hora, idioma y teclado

**Zona horaria:**

```bash
ln -sf /usr/share/zoneinfo/Europe/Madrid /etc/localtime
hwclock --systohc
```

**Idiomas.** Abre el fichero de idiomas disponibles:

```bash
nano /etc/locale.gen
```

Busca con `Ctrl` + `W` y **quita la almohadilla** de estas dos líneas:

```
en_US.UTF-8 UTF-8
es_ES.UTF-8 UTF-8
```

Guarda con `Ctrl` + `O`, Intro, y sal con `Ctrl` + `X`. Después genera los idiomas:

```bash
locale-gen
```

Y fija el idioma del sistema:

```bash
echo "LANG=es_ES.UTF-8" > /etc/locale.conf
```

**Teclado en la consola, de forma permanente:**

```bash
echo "KEYMAP=es" > /etc/vconsole.conf
```

## 11. Nombre del equipo y hosts

```bash
echo "arch-smr" > /etc/hostname
```

Ahora el fichero `/etc/hosts`, que traduce nombres a direcciones IP en local:

```bash
nano /etc/hosts
```

Contenido:

```
127.0.0.1   localhost
::1         localhost
127.0.1.1   arch-smr.localdomain   arch-smr
```

> ⚠️ **Error de la guía anterior.** Allí ponía tres `echo ... > /etc/hosts` seguidos. Con `>`
> cada línea **borra** la anterior, así que sólo quedaba la última. Si alguna vez necesitas
> añadir en lugar de sobrescribir, el operador es `>>`. Ésta es una de las diferencias que más
> problemas causa en scripting.

## 12. Usuarios y sudo

**Contraseña de root:**

```bash
passwd
```

**Tu usuario normal:**

```bash
useradd -m -G wheel -s /bin/bash alumno
passwd alumno
```

| Opción | Qué hace |
|---|---|
| `-m` | Crea `/home/alumno` |
| `-G wheel` | Lo añade al grupo `wheel` |
| `-s /bin/bash` | Le asigna Bash como intérprete de comandos |

Comprueba:

```bash
groups alumno      # debe salir: alumno wheel
id alumno          # UID, GID y grupos secundarios
```

> **Por qué no trabajamos como root.** Root puede borrar el sistema entero sin preguntar. Un
> usuario normal, no. `sudo` es el permiso puntual: pides ser administrador para un comando
> concreto y vuelves a ser tú. Es la diferencia entre llevar siempre las llaves maestras del
> instituto encima o pedirlas en conserjería cuando hacen falta.

**Dar permiso al grupo `wheel`:**

```bash
EDITOR=nano visudo
```

Busca y **descomenta** esta línea:

```
%wheel ALL=(ALL:ALL) ALL
```

> ⚠️ **No descomentes la variante `NOPASSWD`.** Haría que `sudo` no pidiese contraseña nunca:
> cualquiera que se siente delante de una sesión abierta sería administrador. La guía del curso
> anterior lo mencionaba y la prueba práctica de permisos lo va a preguntar.
>
> ⚠️ **Usa `visudo`, no `nano /etc/sudoers` directamente.** `visudo` comprueba la sintaxis antes
> de guardar. Un error de sintaxis en ese fichero deja el sistema **sin `sudo` para nadie**, y
> recuperarlo requiere arrancar desde la ISO.

## 13. Gestor de arranque GRUB

```bash
grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=GRUB
grub-mkconfig -o /boot/grub/grub.cfg
```

| Parámetro | Qué significa |
|---|---|
| `--target=x86_64-efi` | Instalar la versión UEFI (no la de BIOS) |
| `--efi-directory=/boot/efi` | Dónde está montada la partición EFI |
| `--bootloader-id=GRUB` | Nombre de la entrada en el menú del firmware |

> **Diferencia con la guía antigua.** Antes era `grub-install /dev/sda`, que escribe en el sector
> de arranque del disco: eso es MBR/BIOS. En UEFI no se escribe en el sector de arranque, se
> **copia un fichero `.efi`** dentro de la partición EFI y se registra en la NVRAM del firmware.
> Compruébalo tú mismo:
>
> ```bash
> ls /boot/efi/EFI/GRUB/
> efibootmgr -v
> ```

## 14. Red y primer arranque

Activa el servicio de red **para el próximo arranque**:

```bash
systemctl enable NetworkManager
```

> `enable` = arrancar automáticamente al encender. `start` = arrancar ahora. Dentro del chroot
> `start` no tiene sentido (el sistema no está en marcha), por eso aquí sólo `enable`.

Sal y reinicia:

```bash
exit          # salir del chroot
umount -R /mnt
reboot
```

**Quita la ISO** de la unidad óptica en cuanto se apague la máquina, o volverás al instalador.

Deberías ver el menú de GRUB y después una consola pidiendo usuario. Entra como `alumno` y
comprueba:

```bash
ping -c 3 archlinux.org
sudo pacman -Syu
```

Instala el clásico informador del sistema (el `neofetch` del curso anterior está **descontinuado**
desde 2024; su sustituto es `fastfetch`):

```bash
sudo pacman -S fastfetch
fastfetch
```

> 💡 **Instantánea `02-sistema-base`.** Este es el punto más valioso de toda la instalación.

## Parte 3 — Entorno gráfico e incidencias

## 15. Guest Additions

En Arch no hace falta el CD de VirtualBox: los controladores están en los repositorios.

```bash
sudo pacman -S virtualbox-guest-utils
sudo systemctl enable --now vboxservice
sudo gpasswd -a alumno vboxsf
```

`--now` hace `enable` y `start` en un solo comando.

Cierra sesión y vuelve a entrar para que el cambio de grupo tenga efecto (`groups` debe mostrar
`vboxsf`).

## 16. Entorno gráfico

Primero el servidor gráfico:

```bash
sudo pacman -S xorg-server
```

Después el escritorio. **Recomendación: XFCE.**

```bash
sudo pacman -S xfce4 xfce4-goodies lightdm lightdm-gtk-greeter
sudo systemctl enable --now lightdm
```

> **Por qué XFCE y no GNOME.** La guía del curso anterior instalaba GNOME. GNOME funciona, pero
> son varios gigabytes de descarga y va justo con 2 GB de RAM en una máquina virtual. XFCE
> arranca en la mitad de tiempo y consume la tercera parte de memoria. Si tienes 4 GB para la MV
> y tiempo de sobra, GNOME es una alternativa válida:
>
> ```bash
> sudo pacman -S gnome
> sudo systemctl enable --now gdm
> ```
>
> Instala **uno de los dos**, no los dos a la vez: cada uno trae su propio gestor de sesiones
> (`lightdm` / `gdm`) y sólo puede haber uno activo.

Añade un navegador y utilidades:

```bash
sudo pacman -S firefox
```

Si la resolución se queda pequeña, comprueba que `vboxservice` está activo:

```bash
systemctl status vboxservice
```

## 17. Repositorio AUR

**AUR** (*Arch User Repository*) es el repositorio de la comunidad: miles de programas que no
están en los repositorios oficiales. No se instala con `pacman` directamente; hace falta un
*ayudante*. Vamos a compilar `paru`.

```bash
sudo pacman -S --needed base-devel git
mkdir -p ~/repos && cd ~/repos
git clone https://aur.archlinux.org/paru-bin.git
cd paru-bin
makepkg -si
```

> ⚠️ `makepkg` **no se ejecuta como root**. Si lo haces con `sudo` fallará a propósito: compilar
> código descargado de internet con permisos de administrador es una mala idea.

Comprueba:

```bash
paru -Ss cowsay
```

> ⚠️ **Los repositorios de BlackArch se han retirado de esta guía.** La versión del curso anterior
> los añadía. BlackArch es una colección de herramientas de auditoría de seguridad: son cientos de
> paquetes, no tienen relación con los contenidos de Sistemas Operativos Monopuesto y cambian el
> comportamiento de `pacman` en todo el sistema. Si te interesa el tema, es material del ciclo
> superior de Ciberseguridad, no de aquí.

## 18. Diagnóstico de incidencias

Ésta es la parte que más se parece al trabajo real. Cuando algo no arranca:

**Ver los errores del arranque actual:**

```bash
journalctl -b -p err
```

**Ver el registro de un servicio concreto:**

```bash
systemctl status lightdm
journalctl -u lightdm -b
```

**Rescatar un sistema que no arranca.** Arranca desde la ISO y vuelve a entrar en tu sistema:

```bash
loadkeys es
mount /dev/sda2 /mnt
mount /dev/sda1 /mnt/boot/efi
mount /dev/sda4 /mnt/home
arch-chroot /mnt
# … arreglar lo que sea …
exit
umount -R /mnt
reboot
```

> Guarda estos comandos: en clase el profesor va a **romper una máquina a propósito** y
> tendrás que recuperarla. Y en la vida real, el chroot de rescate es la herramienta que separa
> «hay que reinstalar» de «lo arreglo en cinco minutos».

### Banco de errores frecuentes

| Síntoma | Causa | Solución |
|---|---|---|
| `grub-install` dice algo de `efivarfs` | La MV no tiene EFI activado | Apagar y activar EFI en la configuración |
| Tras reiniciar vuelve el instalador | La ISO sigue insertada | Quitarla en Almacenamiento |
| «error: no such partition» al arrancar | `grub-mkconfig` no se ejecutó, o se ejecutó fuera del chroot | Rescate con chroot y repetir el paso 13 |
| No hay red tras reiniciar | Falta `systemctl enable NetworkManager` | Activarlo y reiniciar |
| El teclado vuelve a inglés tras reiniciar | Falta `/etc/vconsole.conf` | `echo "KEYMAP=es" > /etc/vconsole.conf` |
| «signature from … is unknown trust» | Llavero desactualizado o reloj mal | `timedatectl set-ntp true` y `pacman -Sy archlinux-keyring` |
| Pantalla en negro tras instalar el escritorio | Gestor de sesiones no activado | `systemctl enable --now lightdm` |
| `sudo: comando no encontrado` | No se instaló `sudo` o el usuario no está en `wheel` | `pacman -S sudo`, `usermod -aG wheel alumno`, `visudo` |
