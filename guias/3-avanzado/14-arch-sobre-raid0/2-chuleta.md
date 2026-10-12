---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 3 · Avanzado
tema: "14"
tipo: Chuleta
caracter: ACTIVIDAD OPCIONAL DE AMPLIACIÓN
competencias: CM2
herramientas: H1 (VirtualBox), H4 (terminal Linux)
origen: traducción y corrección de «2-Arch Linux Instalatzen RAID 0.md» (curso anterior)
---

# Chuleta · Ampliación: instalar Arch Linux sobre un RAID 0 por software

> **Nota.** Esta página acompaña a la [explicación del tema](1-explicacion.md). Tenla a mano mientras trabajas.

## Índice

- [Chuleta · Ampliación: instalar Arch Linux sobre un RAID 0 por software](#chuleta--ampliación-instalar-arch-linux-sobre-un-raid-0-por-software)
  - [Índice](#índice)
  - [Esquema](#esquema)
  - [Particionar y crear los arrays](#particionar-y-crear-los-arrays)
  - [Formatear, montar e instalar](#formatear-montar-e-instalar)
  - [Lo que no se puede olvidar dentro del chroot](#lo-que-no-se-puede-olvidar-dentro-del-chroot)
  - [Comprobar](#comprobar)

---

## Esquema

| Disco | Partición | Tamaño | Tipo (`sgdisk`) | Uso |
|---|---|---|---|---|
| `sda` y `sdb` | 1 | 512 MB | `ef00` | EFI (fuera del RAID; sólo se usa la de `sda`) |
| `sda` y `sdb` | 2 | 9 GB | `fd00` | → `md0` (raíz, RAID 0) |
| `sda` y `sdb` | 3 | el resto | `fd00` | → `md1` (swap, RAID 0) |

## Particionar y crear los arrays

```bash
sgdisk -n 1:0:+512M -t 1:ef00 /dev/sda
sgdisk -n 2:0:+9G   -t 2:fd00 /dev/sda
sgdisk -n 3:0:0     -t 3:fd00 /dev/sda
sgdisk /dev/sda -R /dev/sdb -G         # copia la tabla a sdb con GUID nuevos
mdadm --create --verbose /dev/md0 --level=0 --raid-devices=2 /dev/sda2 /dev/sdb2
mdadm --create --verbose /dev/md1 --level=0 --raid-devices=2 /dev/sda3 /dev/sdb3
cat /proc/mdstat
```

## Formatear, montar e instalar

```bash
mkfs.fat -F32 /dev/sda1
mkfs.ext4 /dev/md0                     # raíz
mkswap /dev/md1 && swapon /dev/md1     # swap
mount /dev/md0 /mnt                    # primero la raíz
mkdir -p /mnt/boot/efi && mount /dev/sda1 /mnt/boot/efi
pacstrap -K /mnt base linux linux-firmware mdadm networkmanager grub efibootmgr sudo nano
genfstab -U /mnt >> /mnt/etc/fstab
mdadm --detail --scan >> /mnt/etc/mdadm.conf
arch-chroot /mnt
```

## Lo que no se puede olvidar dentro del chroot

```bash
# /etc/mkinitcpio.conf → añade mdadm_udev justo después de block:
# HOOKS=(... block mdadm_udev filesystems fsck)
mkinitcpio -P
grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=GRUB
grub-mkconfig -o /boot/grub/grub.cfg
systemctl enable NetworkManager
```

> ⚠️ **Sin el hook `mdadm_udev` no arranca.** El núcleo no sabe montar `md0` y te deja en una
> consola de emergencia.

## Comprobar

```bash
cat /proc/mdstat
sudo mdadm --detail /dev/md0
lsblk
sudo hdparm -Tt /dev/md0     # compáralo con /dev/sda
```
