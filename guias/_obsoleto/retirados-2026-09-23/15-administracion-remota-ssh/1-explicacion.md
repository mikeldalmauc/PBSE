---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 3 · Avanzado
tema: "15"
tipo: Explicación
caracter: ANEXO — fuera del itinerario obligatorio
herramientas: H2 (PowerShell), H4 (terminal Linux)
origen: traducción de «4-Urrunetik Sistema Kudeatzen.md» (curso anterior)
---

# Anexo: administrar el sistema en remoto (SSH y FTP)

> ⚠️ **Este contenido no forma parte del itinerario obligatorio, y es a propósito.**
> SSH y FTP son **servicios de red**: pertenecen a *Sistemas Operativos en Red* y a *Servicios en
> Red*, no a *Monopuesto*. Se conserva traducido porque es material bueno del curso anterior y
> porque encaja bien como **ampliación** para quien va rápido, o como demostración del profesor
> al hablar de despliegue o de monitorización.
>
> **No lo pongas como entregable obligatorio.** Si lo usas, que sea como actividad optativa.

## Índice

- [Anexo: administrar el sistema en remoto (SSH y FTP)](#anexo-administrar-el-sistema-en-remoto-ssh-y-ftp)
  - [Índice](#índice)
  - [1. Cambiar el modo de red de la máquina virtual](#1-cambiar-el-modo-de-red-de-la-máquina-virtual)
  - [2. SSH](#2-ssh)
    - [Instalar y arrancar el servidor](#instalar-y-arrancar-el-servidor)
    - [Configuración](#configuración)
    - [Conectarse desde Windows](#conectarse-desde-windows)
  - [3. Copiar ficheros: `scp` y `sftp`](#3-copiar-ficheros-scp-y-sftp)
  - [4. Claves en lugar de contraseñas](#4-claves-en-lugar-de-contraseñas)
  - [5. FTP con vsftpd](#5-ftp-con-vsftpd)

---

## 1. Cambiar el modo de red de la máquina virtual

Con NAT, la máquina virtual puede salir a internet pero **nadie puede entrar**. Para conectarse
a ella desde Windows hay dos opciones:

| Opción | Cómo | Cuándo usarla |
|---|---|---|
| **Adaptador puente** | Configuración → Red → Adaptador puente | La MV recibe una IP de la red del aula, como un equipo más |
| **Reenvío de puertos con NAT** | Red → NAT → Avanzadas → Reenvío de puertos | Si la red del centro no da IP a las MV |

Con reenvío de puertos, una regla típica sería:

| Nombre | Protocolo | Puerto anfitrión | Puerto invitado |
|---|---|---|---|
| ssh | TCP | 2222 | 22 |

Y entonces se conecta uno a `localhost:2222`.

Averigua la IP de la máquina virtual:

```bash
ip -br a          # forma moderna y corta
ip a              # completa
```

## 2. SSH

**SSH** (*Secure Shell*) da una sesión de terminal en otra máquina, cifrada.

### Instalar y arrancar el servidor

```bash
sudo pacman -S openssh                  # Arch
sudo apt install openssh-server         # Ubuntu
```

```bash
sudo systemctl start sshd.service
sudo systemctl enable sshd.service
sudo systemctl status sshd
```

### Configuración

```bash
sudo nano /etc/ssh/sshd_config
```

Ajustes recomendables:

```
Port 39901                    # cambiar el puerto por defecto
PermitRootLogin no            # que root no entre directamente por SSH
PasswordAuthentication yes    # de momento sí; ver el apartado 4
MaxAuthTries 3
```

```bash
sudo systemctl restart sshd
```

> **Cambiar el puerto no es seguridad de verdad**, es sólo ruido: reduce los intentos automáticos
> de los robots que escanean el 22, pero cualquiera que escanee los puertos lo encuentra. La
> seguridad real está en desactivar el acceso de root y en usar claves (apartado 4). Conviene
> tener clara la diferencia entre «estorbar» y «proteger».

### Conectarse desde Windows

Desde PowerShell (el cliente de OpenSSH viene incluido en Windows):

```powershell
ssh -p 39901 alumno@192.168.1.50
```

| Parte | Significado |
|---|---|
| `-p 39901` | Puerto |
| `alumno@` | Usuario de la máquina remota |
| `192.168.1.50` | IP de la máquina virtual |

La primera vez pregunta si confías en la huella del servidor. Es una comprobación real: si
mañana esa huella cambia sin motivo, alguien podría estar suplantando el servidor.

## 3. Copiar ficheros: `scp` y `sftp`

`scp` copia ficheros por el mismo canal cifrado de SSH:

```powershell
# de Windows a la máquina virtual
scp -P 39901 informe.txt alumno@192.168.1.50:/home/alumno/

# de la máquina virtual a Windows
scp -P 39901 alumno@192.168.1.50:/home/alumno/informe.txt .

# una carpeta entera
scp -P 39901 -r proyecto/ alumno@192.168.1.50:/home/alumno/
```

> ⚠️ En `ssh` el puerto es `-p` minúscula; en `scp` es `-P` mayúscula. Es una inconsistencia
> histórica que confunde a todo el mundo.

Sesión interactiva de transferencia:

```powershell
sftp -P 39901 alumno@192.168.1.50
```

## 4. Claves en lugar de contraseñas

Es la forma correcta de usar SSH.

> **Analogía.** Una contraseña es un secreto que tienes que decir en voz alta cada vez que entras.
> Un par de claves es un candado y su llave: dejas el **candado** (clave pública) en el servidor
> y te quedas tú con la **llave** (clave privada), que nunca sale de tu equipo. El servidor
> comprueba que tu llave abre su candado sin que tú tengas que decir nada.

En Windows, generar el par:

```powershell
ssh-keygen -t ed25519 -C "alumno@smr"
```

Copiar la clave pública al servidor:

```powershell
type $env:USERPROFILE\.ssh\id_ed25519.pub | ssh -p 39901 alumno@192.168.1.50 "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

En la máquina virtual, ajustar los permisos ([guía de permisos](../../2-intermedio/09-permisos/1-explicacion.md) otra vez):

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

> ⚠️ **SSH se niega a usar las claves si los permisos son demasiado abiertos.** Si `~/.ssh` es
> accesible por el grupo o por otros, el servidor lo ignora sin decir por qué. Es un ejemplo
> real y muy bueno de por qué los permisos importan.

Cuando funcione, desactiva las contraseñas:

```
PasswordAuthentication no
```

## 5. FTP con vsftpd

> **FTP está obsoleto y no se debe usar en producción**: transmite el usuario y la contraseña
> **en texto plano**, sin cifrar. Se ve aquí porque todavía se encuentra en equipos antiguos y
> porque el contraste con SSH ilustra muy bien qué significa «canal cifrado». Para transferir
> ficheros, usa `sftp` o `scp`.

```bash
sudo pacman -S vsftpd
sudo systemctl start vsftpd.service
sudo systemctl enable vsftpd.service
```

```bash
sudo nano /etc/vsftpd.conf
```

```
local_enable=YES          # los usuarios del sistema pueden entrar con su cuenta
write_enable=YES          # permitir subir ficheros
anonymous_enable=NO       # NO permitir acceso anónimo
chroot_local_user=YES     # cada usuario queda encerrado en su carpeta personal
```

```bash
sudo systemctl restart vsftpd
```

> ⚠️ **`anonymous_enable=YES` deja el servidor abierto a cualquiera.** Y si además se activa
> `anon_upload_enable=YES`, cualquiera puede subir ficheros a tu equipo. La guía del curso
> anterior lo mencionaba con la línea comentada; aquí directamente se deja en `NO`.

Comprobar la captura del tráfico y ver la contraseña en claro es la demostración que hace que se
entienda el problema:

```bash
sudo pacman -S wireshark-cli
sudo tcpdump -i any -A port 21
```
