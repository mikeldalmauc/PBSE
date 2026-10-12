---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 3 · Avanzado
tema: "15"
tipo: Chuleta
caracter: ANEXO — fuera del itinerario obligatorio
herramientas: H2 (PowerShell), H4 (terminal Linux)
origen: traducción de «4-Urrunetik Sistema Kudeatzen.md» (curso anterior)
---

# Chuleta · Anexo: administrar el sistema en remoto (SSH y FTP)

> **Nota.** Esta página acompaña a la [explicación del tema](1-explicacion.md). Tenla a mano mientras trabajas.

## Índice

- [Chuleta · Anexo: administrar el sistema en remoto (SSH y FTP)](#chuleta--anexo-administrar-el-sistema-en-remoto-ssh-y-ftp)
  - [Índice](#índice)
  - [SSH](#ssh)
  - [Copiar ficheros](#copiar-ficheros)
  - [Claves](#claves)
  - [FTP (vsftpd)](#ftp-vsftpd)

---

## SSH

```bash
sudo pacman -S openssh                 # Arch  (Mint: sudo apt install openssh-server)
sudo systemctl enable --now sshd
sudo nano /etc/ssh/sshd_config         # Port, PermitRootLogin no, PasswordAuthentication
sudo systemctl restart sshd
ip -br a                               # IP de la máquina
ssh -p 39901 alumno@192.168.1.50       # conectarse
```

## Copiar ficheros

```bash
scp -P 39901 informe.txt alumno@192.168.1.50:/home/alumno/     # subir
scp -P 39901 alumno@192.168.1.50:/home/alumno/informe.txt .    # bajar
scp -P 39901 -r proyecto/ alumno@192.168.1.50:/home/alumno/    # carpeta entera
sftp -P 39901 alumno@192.168.1.50                              # sesión interactiva
```

> **Ojo con la P.** `ssh` usa `-p` minúscula para el puerto; `scp` y `sftp`, `-P` mayúscula.

## Claves

```bash
ssh-keygen -t ed25519 -C "alumno@smr"          # genera ~/.ssh/id_ed25519 y .pub
# copia el contenido de id_ed25519.pub al final de ~/.ssh/authorized_keys del servidor
chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys
```

## FTP (vsftpd)

```bash
sudo pacman -S vsftpd
sudo nano /etc/vsftpd.conf        # local_enable=YES, write_enable=YES, chroot_local_user=YES
sudo systemctl enable --now vsftpd
```

> ⚠️ **FTP viaja en texto plano.** Usuario y contraseña se pueden leer con
> `sudo tcpdump -i any -A port 21`. Para algo real, SFTP.
