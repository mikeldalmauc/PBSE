---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 2 · Intermedio
tema: "08"
tipo: Guía
competencias: CM1, CM2
herramientas: H1 (VirtualBox), H4 (terminal Linux)
duracion: 15 h
origen: traducción y actualización de «1-Arch Linux Instalatzen.md» (curso anterior)
---

# Instalación de Arch Linux en VirtualBox (UEFI + GPT)

> **Antes de empezar.** En la [guía de Linux Mint](../../1-basico/02-instalar-mint-virtualbox/1-explicacion.md)
> instalaste un sistema con un asistente gráfico. Ahora vas a instalar un sistema **desde la línea
> de comandos**, decidiendo tú cada paso. Lo que en Mint hacía el instalador por ti, aquí lo
> escribes tú.

Arch Linux no tiene instalador con botones: te da una consola y una wiki. Da un poco de vértigo,
pero al terminar sabrás **qué hace de verdad** cualquier instalador: particionar un disco GPT,
formatear, montar, copiar el sistema, configurar el arranque UEFI… y elegir tú el escritorio.

> **Analogía.** Instalar Mint es comprar un menú del día: llega todo montado y sabe bien. Instalar
> Arch es cocinar: compras los ingredientes, los preparas en el orden correcto y si te saltas un
> paso no sale. Al final aprendes más de cocina, aunque comas más tarde.

| | |
|---|---|
| 🎯 **Qué vas a conseguir** | Un Arch Linux en UEFI + GPT, con tu usuario, `sudo`, red y el escritorio que elijas |
| 🧰 **Qué necesitas** | VirtualBox, la ISO de Arch y unos 20 GB libres en el disco |
| ⏱️ **Tiempo** | 15 horas, en tres partes |
| 📦 **Qué entregas** | Tres bitácoras y el manual de instalación ([Parte 5](#parte-5--entrega)) |

**Tu misión, paso a paso:**

- [ ] Crear la MV con **EFI activado** y arrancar la ISO.
- [ ] Particionar el disco en **GPT** con cuatro particiones y comprobar que lo es.
- [ ] Instalar el sistema base, configurarlo desde dentro con `arch-chroot` y poner GRUB en UEFI.
- [ ] Arrancar tu Arch, entrar con tu usuario y tener red.
- [ ] Elegir e instalar un entorno gráfico.
- [ ] Saber rescatar el sistema cuando algo falla.

## Índice

- [Instalación de Arch Linux en VirtualBox (UEFI + GPT)](#instalación-de-arch-linux-en-virtualbox-uefi--gpt)
  - [Índice](#índice)
  - [La hoja de ruta](#la-hoja-de-ruta)
  - [Parte 1 · Preparar y particionar](#parte-1--preparar-y-particionar)
    - [1. Crear la máquina virtual](#1-crear-la-máquina-virtual)
    - [2. Arrancar la ISO](#2-arrancar-la-iso)
    - [3. Comprobaciones previas](#3-comprobaciones-previas)
    - [4. Particionado en GPT](#4-particionado-en-gpt)
    - [5. Formateo](#5-formateo)
    - [6. Montaje](#6-montaje)
  - [Parte 2 · Sistema base y primer arranque](#parte-2--sistema-base-y-primer-arranque)
    - [7. Instalar el sistema base](#7-instalar-el-sistema-base)
    - [8. fstab](#8-fstab)
    - [9. Entrar en el sistema con chroot](#9-entrar-en-el-sistema-con-chroot)
    - [10. Hora, idioma y teclado](#10-hora-idioma-y-teclado)
    - [11. Nombre del equipo y hosts](#11-nombre-del-equipo-y-hosts)
    - [12. Usuarios y sudo](#12-usuarios-y-sudo)
    - [13. Gestor de arranque GRUB](#13-gestor-de-arranque-grub)
    - [14. Red y primer arranque](#14-red-y-primer-arranque)
  - [Parte 3 · Escritorio, AUR e incidencias](#parte-3--escritorio-aur-e-incidencias)
    - [15. Guest Additions](#15-guest-additions)
    - [16. Entorno gráfico: elige el tuyo](#16-entorno-gráfico-elige-el-tuyo)
    - [17. Repositorio AUR](#17-repositorio-aur)
    - [18. Diagnóstico de incidencias](#18-diagnóstico-de-incidencias)
  - [Parte 4 · Chuleta](#parte-4--chuleta)
  - [Parte 5 · Entrega](#parte-5--entrega)

---

## La hoja de ruta

![Hoja de ruta: 18 pasos repartidos en tres partes, cada una terminada con una instantánea](images/hoja-de-ruta.svg)

| Parte | Qué se hace | Dónde termina |
|---|---|---|
| **1** | Preparar la MV, arrancar la ISO, red, particionado GPT y formateo | Particiones creadas y montadas |
| **2** | Sistema base, chroot, configuración, GRUB y primer arranque | Consola con tu usuario y red |
| **3** | Guest Additions, entorno gráfico, AUR y resolución de incidencias | Escritorio funcionando |

> [!TIP]
> **Trabajo en parejas.** Uno teclea (*operador*) y el otro lee la guía y comprueba cada salida
> (*verificador*). Cambiad a mitad de sesión. Quien sólo mira, no aprende a instalar.

> [!NOTE]
> **La documentación oficial** está en inglés, y aprender a usarla es parte del trabajo:
> https://wiki.archlinux.org/title/Installation_guide

> [!IMPORTANT]
> **Ve rellenando la bitácora desde el principio.** Al final de cada parte hay un cuadro
> «📝 Para tu bitácora» con lo que tienes que capturar. Si lo dejas para el final, tendrás que
> repetir la instalación.

---

## Parte 1 · Preparar y particionar

### 1. Crear la máquina virtual

Descarga la ISO desde https://archlinux.org/download/ (elige un servidor español, por ejemplo el
de RedIRIS) o arráncala desde tu [pincho Ventoy](../07-usb-multiarranque-ventoy/1-guia.md).

En VirtualBox, **Nueva**:

| Recurso | Valor |
|---|---|
| Nombre | `Arch-SMR` |
| Tipo / Versión | Linux / Arch Linux (64-bit) |
| Memoria base | **2048 MB** (4096 MB si vas a instalar KDE Plasma o GNOME: [apartado 16](#16-entorno-gráfico-elige-el-tuyo)) |
| Procesadores | **2** |
| **Habilitar EFI** | **Sí** ⚠️ imprescindible |
| Disco | **20 GB**, reserva dinámica |
| Pantalla | 128 MB de vídeo, controlador **VMSVGA**, sin aceleración 3D |
| Red → Adaptador 1 | NAT |

> [!WARNING]
> **Nada de instalación desatendida**, igual que con Mint: en VirtualBox 7.2 **desmarca**
> «Proceed with Unattended Installation»; en versiones anteriores **marca** «Skip Unattended
> Installation».

> [!CAUTION]
> **Si te olvidas de marcar «Habilitar EFI»**, la instalación irá bien hasta el paso 13 y ahí
> `grub-install` fallará con un error sobre `efivarfs`. No podrás arreglarlo sin apagar la máquina
> y cambiar la configuración. **Compruébalo ahora.**

### 2. Arrancar la ISO

Arranca y elige la primera opción del menú, *Arch Linux install medium (x86_64, UEFI)*.
Terminarás en una consola como `root@archiso ~ #`.

Lo primero, **el teclado en español**:

```bash
loadkeys es
```

Si ves la letra demasiado pequeña:

```bash
setfont ter-132b
```

> [!NOTE]
> Este cambio de teclado sólo vale para esta sesión del instalador. En el paso 10 lo dejarás
> guardado para siempre en el sistema instalado.

### 3. Comprobaciones previas

**Que arrancaste en modo UEFI:**

```bash
cat /sys/firmware/efi/fw_platform_size
```

Debe responder `64`. Si dice «No such file or directory», has arrancado en modo BIOS: apaga y
activa EFI en la configuración de la máquina.

**Que hay internet:**

```bash
ping -c 3 archlinux.org
```

**Que la hora es correcta** (si el reloj va mal, fallan las firmas de los paquetes):

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

### 4. Particionado en GPT

#### 4.1 Por qué GPT

Antes de crear particiones hay que escribir en el disco una **tabla de particiones**: el índice
que dice dónde empieza y acaba cada una. Hay dos tipos, y vamos a usar el moderno, **GPT**:

![Comparación entre MBR, con 4 primarias y una sola copia de la tabla, y GPT, con 128 particiones, copia de seguridad al final y tipo y nombre por partición](images/gpt-vs-mbr.svg)

| | MBR (*Master Boot Record*) | GPT (*GUID Partition Table*) |
|---|---|---|
| Época | 1983, con las BIOS | Actual, con UEFI |
| Particiones | 4 primarias (o 3 + una extendida) | **128** |
| Tamaño máximo del disco | 2 TiB | Prácticamente ilimitado |
| Copias de la tabla | Una, en el primer sector | Dos: al principio **y al final** |
| Cada partición tiene | Un código de tipo de 1 byte | Un **tipo** (GUID) y un **nombre** |

> [!IMPORTANT]
> **UEFI + GPT van de la mano.** El firmware UEFI busca en el disco una partición marcada como
> **EFI System**, formateada en FAT32, y arranca el fichero `.efi` que hay dentro. Es lo que usan
> los equipos actuales y lo que hacemos **siempre** en esta asignatura.

#### 4.2 El plan

Vamos a crear cuatro particiones, las mismas que en Linux Mint para que puedas comparar:

![Disco de 20 GB en GPT con sda1 EFI de 512 MB, sda2 raíz de 10 GB, sda3 swap de 2 GB y sda4 home con el resto](images/particiones-arch.svg)

| Nº | Dispositivo | Tamaño | Tipo GPT | Para qué |
|---|---|---|---|---|
| 1 | `/dev/sda1` | 512 MB | EFI System | El gestor de arranque |
| 2 | `/dev/sda2` | 10 GB | Linux filesystem | Raíz `/` |
| 3 | `/dev/sda3` | 2 GB | Linux swap | Intercambio |
| 4 | `/dev/sda4` | resto (~7,5 GB) | Linux filesystem | `/home` |

#### 4.3 Crear las particiones con cfdisk

`cfdisk` es el más visual de los particionadores de consola. Se maneja con las flechas y `Enter`:

```bash
cfdisk /dev/sda
```

1. Te pregunta la **etiqueta** (el tipo de tabla): elige **`gpt`**.
2. Sobre *Free space*, **New** → tamaño `512M` → **Type** → `EFI System`.
3. Sobre el espacio libre restante, **New** → `10G` → deja el tipo por defecto (*Linux filesystem*).
4. **New** → `2G` → **Type** → `Linux swap`.
5. **New** → `Enter` para aceptar todo el resto → tipo por defecto.
6. **Write**, escribe `yes` y **Quit**.

> [!WARNING]
> **En el paso 1, `gpt`, no `dos`.** `dos` es MBR, la tabla antigua de las BIOS. Los tutoriales
> viejos de internet (y la guía del curso anterior) eligen `dos`: aquí no te sirven.

> **Analogía.** El **tipo** de partición es el rótulo de una carpeta del archivador: el contenido
> no cambia, pero sin el rótulo correcto nadie la encuentra. El firmware UEFI sólo mira las
> particiones con el rótulo *EFI System*.

#### 4.4 Comprueba que es GPT

No te fíes: **compruébalo**.

```bash
fdisk -l /dev/sda
lsblk -o NAME,SIZE,PARTTYPENAME /dev/sda
```

En la salida de `fdisk` busca la línea **`Disklabel type: gpt`**. Y `lsblk` te enseña el tipo
de cada partición:

```text
NAME     SIZE PARTTYPENAME
sda       20G
├─sda1   512M EFI System
├─sda2    10G Linux filesystem
├─sda3     2G Linux swap
└─sda4   7.5G Linux filesystem
```

> [!TIP]
> **¿Has elegido `dos` por error, o el disco ya tenía algo?** Borra la tabla y empieza el
> particionado otra vez:
>
> ```bash
> wipefs -a /dev/sda     # borra la tabla de particiones (¡todo el disco!)
> cfdisk /dev/sda        # vuelve a preguntarte la etiqueta: ahora, gpt
> ```

> **Ampliación. Todo el particionado en un solo comando.** `sgdisk` es la herramienta de GPT para
> scripts. Esto crea las mismas cuatro particiones, con su tipo y además **un nombre** para cada
> una (algo que MBR no permite):
>
> ```bash
> sgdisk -Z /dev/sda
> sgdisk -n 1:0:+512M -t 1:ef00 -c 1:EFI \
>        -n 2:0:+10G  -t 2:8300 -c 2:raiz \
>        -n 3:0:+2G   -t 3:8200 -c 3:swap \
>        -n 4:0:0     -t 4:8300 -c 4:home  /dev/sda
> sgdisk -p /dev/sda     # ver el resultado, con los nombres
> ```
>
> `-n` nueva partición (número:inicio:fin, `0` = lo primero o lo último libre), `-t` tipo
> (`ef00` EFI System, `8300` Linux filesystem, `8200` Linux swap) y `-c` nombre.

### 5. Formateo

Crear la partición es **reservar el sitio**; formatearla es **poner dentro un sistema de
archivos**.

```bash
mkfs.fat -F32 /dev/sda1      # EFI: obligatoriamente FAT32
mkfs.ext4 /dev/sda2          # raíz
mkswap /dev/sda3             # swap
mkfs.ext4 /dev/sda4          # home
```

Activa la swap y comprueba:

```bash
swapon /dev/sda3
lsblk -f
```

> [!NOTE]
> **¿Por qué la EFI en FAT32?** Porque es el único sistema de archivos que el firmware UEFI sabe
> leer siempre. Es como escribir la dirección del sobre en el idioma que entiende el cartero.

### 6. Montaje

Ahora hay que «colgar» cada partición en su sitio dentro de `/mnt`, que será la raíz del sistema
nuevo mientras lo instalamos.

![La raíz sda2 se monta en /mnt, sda1 en /mnt/boot/efi y sda4 en /mnt/home, en ese orden](images/montaje-mnt.svg)

```bash
mount /dev/sda2 /mnt

mkdir -p /mnt/boot/efi
mount /dev/sda1 /mnt/boot/efi

mkdir -p /mnt/home
mount /dev/sda4 /mnt/home
```

> [!IMPORTANT]
> **El orden importa.** Se monta **primero la raíz** y después lo que cuelga de ella. Si montas
> `/mnt/boot/efi` antes que `/mnt`, el segundo montaje tapa al primero y pierdes el trabajo.

> [!NOTE]
> Montamos la partición EFI en `/boot/efi` para que sea igual que en Linux Mint. La wiki de Arch
> propone también `/boot` o `/efi`; las tres formas funcionan si `grub-install` apunta al sitio
> correcto (paso 13).

Comprobación final de la parte 1:

```bash
lsblk
findmnt /mnt
```

**✅ Comprueba antes de seguir:**

- [ ] `fdisk -l /dev/sda` dice `Disklabel type: gpt`.
- [ ] `lsblk -f` muestra `vfat` en sda1, `ext4` en sda2 y sda4, y `swap` en sda3.
- [ ] `findmnt /mnt` muestra la raíz montada, y `lsblk` enseña `/mnt/boot/efi` y `/mnt/home`.

> [!TIP]
> **📸 Instantánea `01-particionado`.** Apaga (`shutdown now`) y crea la instantánea. Al volver a
> arrancar tendrás que repetir `loadkeys es`, `swapon /dev/sda3` y los tres `mount` (los montajes
> no se guardan; el particionado sí).

> **📝 Para tu bitácora (Parte 1).** El esquema de particionado justificado (por qué GPT, por qué
> cada tamaño), la salida de `fdisk -l /dev/sda`, la de `lsblk -f` y la de `findmnt /mnt`.

**🧠 ¿Lo has pillado?**

1. Tu compañero ha elegido `dos` en `cfdisk`. ¿Qué tipo de tabla tiene su disco? ¿Qué haces?
2. ¿Qué pasa si montas `/dev/sda4` en `/mnt/home` y **después** `/dev/sda2` en `/mnt`?

<details>
<summary>Ver respuestas</summary>

1. **MBR**. Lo arreglas con `wipefs -a /dev/sda` y repitiendo `cfdisk` eligiendo `gpt`. Como
   todavía no hay nada instalado, no se pierde nada.
2. El montaje de la raíz **tapa** la carpeta `/mnt/home` que acababas de montar: lo que se instale
   en `/home` acabará en sda2, no en sda4.

</details>

---

## Parte 2 · Sistema base y primer arranque

> [!NOTE]
> Si vienes de la instantánea, repite: `loadkeys es`, `swapon /dev/sda3` y los tres `mount` del
> apartado 6. Comprueba con `findmnt /mnt` antes de seguir.

### 7. Instalar el sistema base

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

> [!TIP]
> La opción `-K` inicializa el llavero de claves de `pacman`. Si aun así ves errores de firma
> («signature is unknown trust»), ejecuta `pacman -Sy archlinux-keyring` y repite.

Es una descarga grande. **Buen momento para otra instantánea** cuando termine.

### 8. fstab

```bash
genfstab -U /mnt >> /mnt/etc/fstab
cat /mnt/etc/fstab
```

`genfstab` mira lo que hay montado ahora mismo y escribe la receta para que el sistema lo monte
solo en cada arranque. La opción `-U` usa **UUID** (el número de serie de cada partición) en lugar
de `/dev/sdaX`, que puede cambiar si añades otro disco.

> [!NOTE]
> Es el mismo `/etc/fstab` que abriste en Linux Mint. Allí lo generó el instalador; aquí lo
> generas tú. Léelo y compáralo con el de Mint: dice lo mismo.

### 9. Entrar en el sistema con chroot

```bash
arch-chroot /mnt
```

![Antes de arch-chroot la raíz es la ISO y tu sistema está en /mnt; después, la raíz es tu sistema nuevo](images/chroot.svg)

> **Analogía.** `chroot` cambia cuál es la carpeta raíz para los comandos que ejecutes a partir de
> ahora. Antes `/` era la ISO; ahora `/` es tu sistema nuevo. Es como **entrar en la casa** que
> estabas construyendo desde fuera: a partir de aquí, cuando escribas `/etc`, estás tocando el
> `/etc` del sistema instalado, no el del instalador. Fíjate en que el *prompt* cambia a
> `[root@archiso /]#`.

### 10. Hora, idioma y teclado

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

```text
en_US.UTF-8 UTF-8
es_ES.UTF-8 UTF-8
```

Guarda con `Ctrl` + `O`, `Enter`, y sal con `Ctrl` + `X`. Después genera los idiomas y fija el del
sistema:

```bash
locale-gen
echo "LANG=es_ES.UTF-8" > /etc/locale.conf
```

**Teclado en la consola, de forma permanente:**

```bash
echo "KEYMAP=es" > /etc/vconsole.conf
```

### 11. Nombre del equipo y hosts

```bash
echo "arch-smr" > /etc/hostname
nano /etc/hosts
```

Contenido de `/etc/hosts` (traduce nombres a direcciones IP en local):

```text
127.0.0.1   localhost
::1         localhost
127.0.1.1   arch-smr.localdomain   arch-smr
```

> [!WARNING]
> **Error típico: tres `echo … > /etc/hosts` seguidos.** Con `>` cada línea **borra** la anterior,
> así que sólo queda la última. Para añadir sin borrar, el operador es `>>`. Esta diferencia causa
> muchísimos problemas en scripting.

### 12. Usuarios y sudo

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
| `-G wheel` | Lo añade al grupo `wheel` (los administradores en Arch) |
| `-s /bin/bash` | Le asigna Bash como intérprete de comandos |

Comprueba:

```bash
groups alumno      # debe salir: alumno wheel
id alumno          # UID, GID y grupos secundarios
```

> **Analogía. Por qué no trabajamos como root.** Root puede borrar el sistema entero sin
> preguntar. Un usuario normal, no. `sudo` es el permiso puntual: pides ser administrador para un
> comando concreto y vuelves a ser tú. Es la diferencia entre llevar siempre las llaves maestras
> del instituto encima o pedirlas en conserjería cuando hacen falta.

**Dar permiso al grupo `wheel`:**

```bash
EDITOR=nano visudo
```

Busca y **descomenta** (quita la `#`) esta línea:

```text
%wheel ALL=(ALL:ALL) ALL
```

> [!CAUTION]
> **No descomentes la variante `NOPASSWD`.** Haría que `sudo` no pidiese contraseña nunca:
> cualquiera que se siente delante de una sesión abierta sería administrador. Lo estudiarás a fondo
> en la [guía de permisos](../09-permisos/1-guia.md#11-root-su-y-sudo).

> [!WARNING]
> **Usa `visudo`, no `nano /etc/sudoers` directamente.** `visudo` comprueba la sintaxis antes de
> guardar. Un error en ese fichero deja el sistema **sin `sudo` para nadie**, y recuperarlo
> requiere arrancar desde la ISO.

### 13. Gestor de arranque GRUB

![La cadena de arranque: firmware UEFI, partición EFI con grubx64.efi, GRUB con grub.cfg, núcleo Linux y systemd](images/arranque-uefi-grub.svg)

```bash
grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=GRUB
grub-mkconfig -o /boot/grub/grub.cfg
```

| Parámetro | Qué significa |
|---|---|
| `--target=x86_64-efi` | Instalar la versión UEFI (no la de BIOS) |
| `--efi-directory=/boot/efi` | Dónde está montada la partición EFI |
| `--bootloader-id=GRUB` | Nombre de la entrada en el menú del firmware |

> [!IMPORTANT]
> **En UEFI no se escribe en el sector de arranque**: se **copia un fichero `.efi`** dentro de la
> partición EFI y se registra en la memoria del firmware. Por eso un tutorial que diga
> `grub-install /dev/sda` a secas es de BIOS/MBR y aquí falla.

Compruébalo tú:

```bash
ls /boot/efi/EFI/GRUB/      # grubx64.efi
efibootmgr -v               # la entrada «GRUB» del firmware
```

En la salida de `efibootmgr -v` verás algo como `HD(1,GPT,…)/\EFI\GRUB\grubx64.efi`: **partición 1
de un disco GPT**. Todo encaja.

### 14. Red y primer arranque

Activa el servicio de red **para el próximo arranque**:

```bash
systemctl enable NetworkManager
```

> [!NOTE]
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
sudo pacman -S fastfetch
fastfetch
```

> [!NOTE]
> El `neofetch` del curso anterior está **descontinuado** desde 2024; su sustituto es `fastfetch`.

**✅ Comprueba antes de seguir:**

- [ ] Aparece el menú de GRUB y arranca sin la ISO.
- [ ] Entras como `alumno`, hay red y `sudo` funciona.
- [ ] `fastfetch` muestra tu Arch.

> [!TIP]
> **📸 Instantánea `02-sistema-base`.** Éste es el punto más valioso de toda la instalación.

> **📝 Para tu bitácora (Parte 2).** Los comandos ejecutados con una frase explicando qué hace
> cada uno; capturas del menú de GRUB, del inicio de sesión y de `fastfetch`; y la salida de
> `groups alumno`, `efibootmgr -v` y `cat /etc/fstab`.

**🧠 ¿Lo has pillado?**

1. ¿Por qué en el chroot se usa `systemctl enable` y no `start`?
2. Arrancas y el teclado vuelve a estar en inglés. ¿Qué fichero falta?
3. En `efibootmgr -v`, ¿qué te dice `GPT`?

<details>
<summary>Ver respuestas</summary>

1. Porque dentro del chroot el sistema nuevo **no está en marcha**: sólo puedes dejar el servicio
   preparado para el próximo arranque.
2. `/etc/vconsole.conf` con `KEYMAP=es`.
3. Que el fichero `grubx64.efi` está en una partición de un disco con tabla **GPT**.

</details>

---

## Parte 3 · Escritorio, AUR e incidencias

### 15. Guest Additions

En Arch no hace falta el CD de VirtualBox: los controladores están en los repositorios.

```bash
sudo pacman -S virtualbox-guest-utils
sudo systemctl enable --now vboxservice
sudo gpasswd -a alumno vboxsf
```

`--now` hace `enable` y `start` en un solo comando. Cierra sesión y vuelve a entrar para que el
cambio de grupo tenga efecto (`groups` debe mostrar `vboxsf`).

### 16. Entorno gráfico: elige el tuyo

Arch no trae escritorio: **lo eliges tú**. Es una de sus mejores partes.

#### 16.1 Cómo funciona un escritorio

Un escritorio no es un solo programa: son varias capas apiladas.

![Capas de un escritorio Linux: hardware, núcleo, servidor gráfico, gestor de inicio de sesión, entorno de escritorio y aplicaciones](images/capas-escritorio.svg)

| Capa | Qué hace | Ejemplos |
|---|---|---|
| **Servidor gráfico** | Dibuja en pantalla y gestiona ratón y teclado | **Xorg** (X11, el clásico) o **Wayland** (el moderno) |
| **Gestor de inicio de sesión** (*display manager*) | La pantalla donde pones usuario y contraseña | **LightDM**, **SDDM**, **GDM** |
| **Entorno de escritorio** | Panel, menú, ventanas, ajustes, programas básicos | XFCE, KDE Plasma, GNOME… |

> [!IMPORTANT]
> **El gestor de inicio de sesión es un servicio**: si no lo activas con `systemctl enable`, al
> reiniciar volverás a la consola de texto aunque el escritorio esté instalado.

#### 16.2 Elige

![Galería con el esquema de siete escritorios y una guía para elegir](images/escritorios-galeria.svg)

| Escritorio | Se parece a… | RAM de la MV | Servidor gráfico | Gestor de sesión |
|---|---|---|---|---|
| ⭐ **XFCE** (recomendado) | Windows clásico, con dock abajo | 2 GB | Xorg | LightDM |
| **KDE Plasma** | Windows 10/11 | 4 GB | Wayland | SDDM |
| **GNOME** | macOS o una tableta | 4 GB | Wayland | GDM |
| **Cinnamon** | Linux Mint (y Windows) | 3 GB | Xorg | LightDM |
| **MATE** | Los escritorios Linux de toda la vida | 2 GB | Xorg | LightDM |
| **LXQt** | Windows, en ligero | 2 GB | Xorg | SDDM |
| **i3** *(ampliación)* | Nada que conozcas: ventanas en mosaico | 2 GB | Xorg | LightDM |

> [!TIP]
> **Si eliges KDE Plasma, GNOME o Cinnamon**, apaga antes la MV y sube la memoria base a 4096 MB
> (**Configuración → Sistema**). Y haz la instantánea `02-sistema-base` antes de instalar el
> escritorio: así puedes probar otro sin reinstalar.

> [!NOTE]
> **Durante la instalación, `pacman` puede preguntarte** «Enter a selection (default=all)» (qué
> paquetes del grupo quieres) o «There are N providers available» (cuál de varias alternativas).
> Pulsa `Enter` para aceptar la opción por defecto.

#### Opción A · XFCE (recomendada)

```bash
sudo pacman -S xorg-server xfce4 xfce4-goodies lightdm lightdm-gtk-greeter network-manager-applet
sudo systemctl enable --now lightdm
```

Es el que usa el [taller de personalización](../../3-avanzado/12-taller-personalizar-linux/1-guia.md).
Ligero, estable y fácil de configurar.

#### Opción B · KDE Plasma

```bash
sudo pacman -S plasma-meta konsole dolphin kate sddm
sudo systemctl enable --now sddm
```

Se parece mucho a Windows y se puede configurar absolutamente todo. Plasma arranca en **Wayland**
por defecto; en la pantalla de SDDM, abajo a la izquierda, puedes elegir el tipo de sesión.

#### Opción C · GNOME

```bash
sudo pacman -S gnome gnome-tweaks
sudo systemctl enable --now gdm
```

Moderno y minimalista: no hay barra de tareas, todo se abre pulsando `Super` y escribiendo. GNOME
ya sólo funciona sobre **Wayland**. Con `gnome-tweaks` («Retoques») cambias lo que la configuración
normal no deja.

#### Opción D · Cinnamon

```bash
sudo pacman -S xorg-server cinnamon lightdm lightdm-gtk-greeter gnome-terminal
sudo systemctl enable --now lightdm
```

Es el escritorio de Linux Mint. Cinnamon no trae terminal propio: por eso añadimos
`gnome-terminal`.

#### Opción E · MATE

```bash
sudo pacman -S xorg-server mate mate-extra lightdm lightdm-gtk-greeter
sudo systemctl enable --now lightdm
```

El heredero de los escritorios clásicos de Linux, con un panel arriba y otro abajo. Muy estable.

#### Opción F · LXQt

```bash
sudo pacman -S xorg-server lxqt breeze-icons sddm
sudo systemctl enable --now sddm
```

El más ligero de los escritorios completos. Ideal para equipos viejos o MV con poca RAM.

#### Opción G · i3 (ampliación)

```bash
sudo pacman -S xorg-server i3-wm i3status i3lock dmenu xterm lightdm lightdm-gtk-greeter
sudo systemctl enable --now lightdm
```

i3 no es un escritorio sino un **gestor de ventanas en mosaico**: coloca las ventanas solas, sin
solaparlas, y se maneja con el teclado. La primera vez te pregunta si crear la configuración
(`Enter`) y qué tecla usar como modificadora (elige **Win**, es decir, `Super`).

| Atajo | Qué hace |
|---|---|
| `Super` + `Enter` | Abrir un terminal |
| `Super` + `D` | Lanzador de programas (`dmenu`) |
| `Super` + flechas | Moverte entre ventanas |
| `Super` + `Mayús` + `Q` | Cerrar la ventana |
| `Super` + `Mayús` + `E` | Salir de i3 |

> [!WARNING]
> **i3 engancha y consume horas.** Hazlo en una MV aparte o después de entregar, nunca en la
> máquina de las prácticas evaluables la semana antes de una entrega.

#### Después de cualquier opción

Un navegador y fuentes para que se vean bien todos los caracteres (también los emojis):

```bash
sudo pacman -S firefox noto-fonts noto-fonts-emoji
```

Si la resolución no se ajusta a la ventana, comprueba que `vboxservice` está activo:

```bash
systemctl status vboxservice
```

#### 16.3 ¿Y si quiero probar varios escritorios?

Se puede. Instala los que quieras, pero ten **un solo gestor de inicio de sesión activo**. En su
pantalla eliges con qué escritorio entrar (suele haber un menú o un icono de «sesión»).

Para cambiar de gestor de inicio de sesión:

```bash
sudo systemctl disable lightdm
sudo systemctl enable sddm
```

> [!WARNING]
> Si al activar un segundo gestor ves **«display-manager.service already exists»**, es que el otro
> sigue activado. Desactívalo primero con `disable`.

> [!TIP]
> **La forma limpia de probar:** restaura la instantánea `02-sistema-base`, instala otro escritorio
> y compara. Sin restos del anterior.

### 17. Repositorio AUR

**AUR** (*Arch User Repository*) es el repositorio de la comunidad: miles de programas que no
están en los repositorios oficiales. No se instala con `pacman` directamente; hace falta un
*ayudante*. Vamos a instalar `paru`:

```bash
sudo pacman -S --needed base-devel git
mkdir -p ~/repos && cd ~/repos
git clone https://aur.archlinux.org/paru-bin.git
cd paru-bin
makepkg -si
```

> [!CAUTION]
> `makepkg` **no se ejecuta como root**. Si lo haces con `sudo` fallará a propósito: compilar
> código descargado de internet con permisos de administrador es una mala idea.

Comprueba:

```bash
paru -Ss cowsay
```

> [!NOTE]
> **Los repositorios de BlackArch se han retirado de esta guía.** Son cientos de herramientas de
> auditoría de seguridad que no tienen relación con este módulo y cambian el comportamiento de
> `pacman` en todo el sistema. Es material del ciclo superior de Ciberseguridad.

### 18. Diagnóstico de incidencias

Ésta es la parte que más se parece al trabajo real. Cuando algo no arranca:

**Ver los errores del arranque actual:**

```bash
journalctl -b -p err
```

**Ver el registro de un servicio concreto** (cambia `lightdm` por tu gestor de sesión):

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

> [!IMPORTANT]
> **Guarda estos comandos.** En clase el profesor va a **romper una máquina a propósito** y
> tendrás que recuperarla. En la vida real, el chroot de rescate es lo que separa «hay que
> reinstalar» de «lo arreglo en cinco minutos».

**Banco de errores frecuentes**

| Síntoma | Causa | Solución |
|---|---|---|
| `grub-install` dice algo de `efivarfs` | La MV no tiene EFI activado | Apagar y activar EFI en la configuración |
| `fdisk -l` dice `Disklabel type: dos` | Se eligió `dos` en `cfdisk` | `wipefs -a /dev/sda` y repetir el particionado con `gpt` |
| Tras reiniciar vuelve el instalador | La ISO sigue insertada | Quitarla en Almacenamiento |
| «error: no such partition» al arrancar | `grub-mkconfig` no se ejecutó, o se ejecutó fuera del chroot | Rescate con chroot y repetir el paso 13 |
| No hay red tras reiniciar | Falta `systemctl enable NetworkManager` | Activarlo y reiniciar |
| El teclado vuelve a inglés tras reiniciar | Falta `/etc/vconsole.conf` | `echo "KEYMAP=es" > /etc/vconsole.conf` |
| «signature from … is unknown trust» | Llavero desactualizado o reloj mal | `timedatectl set-ntp true` y `pacman -Sy archlinux-keyring` |
| Consola de texto tras instalar el escritorio | Gestor de sesión no activado | `sudo systemctl enable --now lightdm` (o `sddm`, o `gdm`) |
| «display-manager.service already exists» | Ya hay otro gestor de sesión activado | `disable` el viejo y `enable` el nuevo |
| KDE Plasma o GNOME van muy lentos | Poca RAM; en la MV, Wayland dibuja sin aceleración | Subir la MV a 4 GB, o usar XFCE |
| `sudo: orden no encontrada` | No se instaló `sudo` o el usuario no está en `wheel` | `pacman -S sudo`, `usermod -aG wheel alumno`, `visudo` |

**✅ Comprueba antes de terminar:**

- [ ] Al encender, sale la pantalla de inicio de sesión gráfica.
- [ ] Entras en tu escritorio y la ventana se ajusta al tamaño de la MV.
- [ ] `paru -Ss cowsay` funciona.

> [!TIP]
> **📸 Instantánea `03-escritorio`.** Es la base del [taller de personalización](../../3-avanzado/12-taller-personalizar-linux/1-guia.md).

> **📝 Para tu bitácora (Parte 3).** La ficha de incidencias: para cada problema, síntoma, causa,
> solución aplicada y comprobación de que se resolvió. Y una captura de tu escritorio con una
> frase de por qué lo elegiste.

**🧠 ¿Lo has pillado?**

1. Has instalado XFCE pero al reiniciar sale la consola de texto. ¿Qué te falta?
2. ¿Puedes tener XFCE y KDE Plasma instalados a la vez?

<details>
<summary>Ver respuestas</summary>

1. Activar el gestor de inicio de sesión: `sudo systemctl enable --now lightdm`.
2. **Sí**, con un único gestor de sesión activo; eliges el escritorio en la pantalla de inicio.

</details>

---

## Parte 4 · Chuleta

**Toda la instalación de un vistazo** (para la prueba práctica):

| Fase | Comandos |
|---|---|
| Preparación | `loadkeys es` · `cat /sys/firmware/efi/fw_platform_size` · `timedatectl set-ntp true` · `lsblk` · `ping -c3 archlinux.org` |
| Particionado | `cfdisk /dev/sda` (etiqueta **`gpt`**) |
| Comprobar GPT | `fdisk -l /dev/sda` (`Disklabel type: gpt`) · `lsblk -o NAME,SIZE,PARTTYPENAME` |
| Formateo | `mkfs.fat -F32 /dev/sda1` · `mkfs.ext4 /dev/sda2` · `mkswap /dev/sda3` · `swapon /dev/sda3` · `mkfs.ext4 /dev/sda4` |
| Montaje | `mount /dev/sda2 /mnt` · `mkdir -p /mnt/boot/efi` · `mount /dev/sda1 /mnt/boot/efi` · `mkdir -p /mnt/home` · `mount /dev/sda4 /mnt/home` |
| Base | `pacstrap -K /mnt base linux linux-firmware networkmanager grub efibootmgr sudo nano vim base-devel man-db man-pages` |
| fstab | `genfstab -U /mnt >> /mnt/etc/fstab` |
| chroot | `arch-chroot /mnt` |
| Hora | `ln -sf /usr/share/zoneinfo/Europe/Madrid /etc/localtime` · `hwclock --systohc` |
| Idioma | `nano /etc/locale.gen` · `locale-gen` · `echo "LANG=es_ES.UTF-8" > /etc/locale.conf` |
| Teclado | `echo "KEYMAP=es" > /etc/vconsole.conf` |
| Equipo | `echo "arch-smr" > /etc/hostname` · `nano /etc/hosts` |
| Usuarios | `passwd` · `useradd -m -G wheel -s /bin/bash alumno` · `passwd alumno` · `EDITOR=nano visudo` |
| Arranque | `grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=GRUB` · `grub-mkconfig -o /boot/grub/grub.cfg` |
| Servicios | `systemctl enable NetworkManager` |
| Salir | `exit` · `umount -R /mnt` · `reboot` |

**Escritorios**

| Escritorio | Paquetes | Activar |
|---|---|---|
| XFCE | `xorg-server xfce4 xfce4-goodies lightdm lightdm-gtk-greeter network-manager-applet` | `systemctl enable --now lightdm` |
| KDE Plasma | `plasma-meta konsole dolphin kate sddm` | `systemctl enable --now sddm` |
| GNOME | `gnome gnome-tweaks` | `systemctl enable --now gdm` |
| Cinnamon | `xorg-server cinnamon lightdm lightdm-gtk-greeter gnome-terminal` | `systemctl enable --now lightdm` |
| MATE | `xorg-server mate mate-extra lightdm lightdm-gtk-greeter` | `systemctl enable --now lightdm` |
| LXQt | `xorg-server lxqt breeze-icons sddm` | `systemctl enable --now sddm` |
| i3 | `xorg-server i3-wm i3status i3lock dmenu xterm lightdm lightdm-gtk-greeter` | `systemctl enable --now lightdm` |

**Rescate**

```bash
loadkeys es
mount /dev/sda2 /mnt && mount /dev/sda1 /mnt/boot/efi && mount /dev/sda4 /mnt/home
arch-chroot /mnt
```

---

## Parte 5 · Entrega

**Parte 1 · Bitácora de instalación: preparación y particionado**
Esquema de particionado justificado (por qué GPT y por qué cada tamaño) + salida de
`fdisk -l /dev/sda`, `lsblk -f` y `findmnt /mnt`.
*Evaluación: observación del proceso y lista de cotejo del particionado.*

**Parte 2 · Bitácora de instalación: sistema base y arranque**
Comandos ejecutados con una frase explicando qué hace cada uno + capturas del menú de GRUB, del
inicio de sesión y de `fastfetch`. Salida de `groups alumno`, `efibootmgr -v` y `cat /etc/fstab`.
*Evaluación: lista de cotejo del arranque correcto y del usuario creado.*

**Parte 3 · Ficha de incidencias**
Para cada problema: síntoma, causa, solución aplicada y comprobación de que se resolvió. Incluye
una captura de tu escritorio y por qué lo elegiste.
*Evaluación: rúbrica de resolución de problemas.*

**Al terminar · Manual de instalación de Arch Linux (entregable principal del bloque, CM1)**
Reúne las tres bitácoras en un manual **reproducible**. Después, otro equipo va a instalar Arch
siguiendo tu manual **sin poder preguntarte nada**, y anotará todo lo que falte o esté ambiguo.
Escríbelo pensando en eso.

> [!TIP]
> **Trabajo en parejas (parte 2).** Roles alternos: uno teclea (*operador*) y el otro lee la guía y
> verifica (*verificador*). Se cambia a mitad de sesión.

**Antes de entregar, comprueba:**

- [ ] La salida de `fdisk -l` dice `gpt` y explicas por qué GPT y no MBR.
- [ ] Cada comando de la bitácora tiene su frase de explicación.
- [ ] Están las capturas de GRUB, del inicio de sesión, de `fastfetch` y del escritorio.
- [ ] La ficha de incidencias tiene síntoma, causa, solución y comprobación.
- [ ] Alguien que no te conoce podría seguir tu manual sin preguntarte.
