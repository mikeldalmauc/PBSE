---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 1 · Básico
tema: "02"
tipo: Chuleta
competencias: CM1
herramientas: H1 (VirtualBox), H4 (terminal Linux)
duracion: 5 h
---

# Chuleta · Instalación de GNU/Linux (Linux Mint) en máquina virtual

> **Nota.** Esta página acompaña a la [explicación del tema](1-explicacion.md). Tenla a mano mientras trabajas.

## Índice

- [Chuleta · Instalación de GNU/Linux (Linux Mint) en máquina virtual](#chuleta--instalación-de-gnulinux-linux-mint-en-máquina-virtual)
  - [Índice](#índice)
  - [Ajustes de la máquina virtual](#ajustes-de-la-máquina-virtual)
  - [Particionado manual (UEFI + GPT)](#particionado-manual-uefi--gpt)
  - [Comprobaciones después de instalar](#comprobaciones-después-de-instalar)
  - [Guest Additions y carpeta compartida](#guest-additions-y-carpeta-compartida)

---

## Ajustes de la máquina virtual

| Ajuste | Valor | Si no lo haces |
|---|---|---|
| Nombre | `Mint-SMR` | — |
| Tipo / versión | Linux · Ubuntu (64-bit) o Linux Mint | — |
| Instalación desatendida | **Desmarcada** («Proceed with Unattended Installation») | El instalador arranca solo y no puedes particionar |
| Habilitar EFI | **Marcado** | Arranca en BIOS/MBR |
| RAM / CPU | 4096 MB · 2 CPU | Instalación muy lenta |
| Disco | **25 GB** VDI, reserva dinámica | Los tamaños de abajo no cuadran |
| Controlador gráfico | **VMSVGA** · 128 MB | Pantalla negra |
| Aceleración 3D | **Desactivada** | Sesión gráfica rota |
| Paginación anidada | **Activada** | Sesión *live* con la pantalla rota |

## Particionado manual (UEFI + GPT)

| # | Tamaño | Tipo | Montaje |
|---|---|---|---|
| 1 | `512` MB | Partición del sistema EFI | `/boot/efi` |
| 2 | `15000` MB | ext4 | `/` |
| 3 | `2048` MB | Área de intercambio | — |
| 4 | `9284` MB (el resto) | ext4 | `/home` |

> **Recuerda.** VirtualBox cuenta en GB **binarios** (1 GB = 1024 MB) y el instalador en MB
> **decimales**. Por eso 25 GB aparecen como unos 26 843 MB.

## Comprobaciones después de instalar

```bash
lsblk -f                 # las cuatro particiones y su formato
df -h / /home            # espacio de la raíz y de /home
swapon --show            # la swap está activa
cat /etc/fstab           # qué se monta al arrancar
[ -d /sys/firmware/efi ] && echo UEFI || echo BIOS
```

## Guest Additions y carpeta compartida

```bash
sudo apt update && sudo apt install build-essential dkms linux-headers-$(uname -r)
# Dispositivos → Insertar imagen de CD de las «Guest Additions»
sudo sh /media/$USER/VBox_GAs_*/VBoxLinuxAdditions.run
sudo reboot

sudo adduser $USER vboxsf        # para poder abrir la carpeta compartida
# cierra sesión y vuelve a entrar
groups                           # debe aparecer vboxsf
ls -l /media/sf_compartida
```

> ⚠️ **No instales los códecs multimedia en la máquina virtual.** Arrastran
> `gstreamer1.0-vaapi`, que sin aceleración 3D tumba la sesión gráfica. Si ya los tienes:
> `sudo apt remove gstreamer1.0-vaapi`.
