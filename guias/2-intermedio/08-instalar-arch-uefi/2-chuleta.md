---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 2 · Intermedio
tema: "08"
tipo: Chuleta
competencias: CM1, CM2
herramientas: H1 (VirtualBox), H4 (terminal Linux)
duracion: 15 h
origen: traducción y actualización de «1-Arch Linux Instalatzen.md» (curso anterior)
---

# Chuleta · Instalación de Arch Linux en VirtualBox (UEFI + GPT)

> **Nota.** Esta página acompaña a la [explicación del tema](1-explicacion.md). Tenla a mano mientras trabajas.

## Tabla resumen de comandos

Para tenerla a mano durante la prueba práctica.

| Fase | Comandos |
|---|---|
| Preparación | `loadkeys es` · `timedatectl set-ntp true` · `lsblk` · `ping -c3 archlinux.org` |
| Particionado | `cfdisk /dev/sda` (etiqueta `gpt`) |
| Formateo | `mkfs.fat -F32 /dev/sda1` · `mkfs.ext4 /dev/sda2` · `mkswap /dev/sda3` · `swapon /dev/sda3` · `mkfs.ext4 /dev/sda4` |
| Montaje | `mount /dev/sda2 /mnt` · `mkdir -p /mnt/boot/efi` · `mount /dev/sda1 /mnt/boot/efi` · `mkdir -p /mnt/home` · `mount /dev/sda4 /mnt/home` |
| Base | `pacstrap -K /mnt base linux linux-firmware networkmanager grub efibootmgr sudo nano vim base-devel` |
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
