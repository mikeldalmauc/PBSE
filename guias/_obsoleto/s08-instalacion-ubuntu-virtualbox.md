---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
semana: 8
trimestre: T1
bloque: 2. Instalación
competencias: CM1
herramientas: H1 (VirtualBox), H4 (terminal Linux)
duracion: 5 h
---

# Instalación de GNU/Linux (Ubuntu) en máquina virtual

> **Dónde estamos.** Semana 2 · 1.er trimestre · Bloque 2 (Instalación) · Competencia mínima **CM1**.

## Índice

- [Instalación de GNU/Linux (Ubuntu) en máquina virtual](#instalación-de-gnulinux-ubuntu-en-máquina-virtual)
  - [Índice](#índice)
  - [Qué vas a conseguir](#qué-vas-a-conseguir)
  - [1. Descargar la imagen ISO](#1-descargar-la-imagen-iso)
  - [](#)
  - [2. Crear la máquina virtual](#2-crear-la-máquina-virtual)
    - [2.1 Nombre y sistema operativo](#21-nombre-y-sistema-operativo)
      - [2.1.1 Usuario  y Guest Additions](#211-usuario--y-guest-additions)
    - [2.2 Hardware](#22-hardware)
      - [UEFI + GPT vs BIOS + MBR](#uefi--gpt-vs-bios--mbr)
    - [2.3 Disco duro](#23-disco-duro)
    - [2.4 Vídeo y red](#24-vídeo-y-red)
  - [3. Arrancar el instalador](#3-arrancar-el-instalador)
  - [4. Particionado manual](#4-particionado-manual)
    - [4.1 Crear la tabla de particiones](#41-crear-la-tabla-de-particiones)
    - [4.2 Crear las cuatro particiones](#42-crear-las-cuatro-particiones)
    - [4.3 Dispositivo donde instalar el cargador de arranque](#43-dispositivo-donde-instalar-el-cargador-de-arranque)
  - [5. Zona horaria y usuario](#5-zona-horaria-y-usuario)
  - [6. Primer arranque y verificación](#6-primer-arranque-y-verificación)
  - [7. Guest Additions](#7-guest-additions)
  - [8. Carpeta compartida con el anfitrión](#8-carpeta-compartida-con-el-anfitrión)
  - [Comparación con la instalación de Windows](#comparación-con-la-instalación-de-windows)
  - [Problemas frecuentes](#problemas-frecuentes)
  - [Entregable](#entregable)
  - [Ampliación](#ampliación)

---

## Qué vas a conseguir

Al terminar tendrás una máquina virtual con Linux Mint instalado **con particionado manual**, es
decir, habiendo decidido tú mismo cuánto espacio va a cada parte del sistema en lugar de dejar
que el instalador lo haga por ti.

> **Analogía.** El particionado automático es como comprar un armario ya montado: funciona,
> pero no sabes por qué los cajones están donde están. El particionado manual es montarlo tú:
> decides cuántos cajones hay, de qué tamaño y qué guardas en cada uno. En esta asignatura
> montamos el armario, porque el día que un cajón se llene tendrás que saber cuál es.

Concretamente crearás cuatro particiones:

| Partición | Tamaño | Formato | Punto de montaje | Para qué sirve |
|---|---|---|---|---|
| 1 | 512 MB | FAT32 (EFI) | `/boot/efi` | El firmware UEFI busca aquí el gestor de arranque |
| 2 | 15 GB | ext4 | `/` (raíz) | El sistema operativo y los programas |
| 3 | 4 GB | swap | — | Memoria de intercambio (extensión de la RAM en disco) |
| 4 | resto | ext4 | `/home` | Tus datos personales |

**Por qué `/home` va aparte:** si algún día reinstalas el sistema, formateas `/` y dejas `/home`
intacto. Tus documentos y tu configuración sobreviven a la reinstalación. Es el equivalente a
tener `C:` para Windows y `D:` para tus datos, pero en Linux es la práctica habitual.

---

## 1. Descargar la imagen ISO

Descarga **Linux Mint 22.3 "Zena"** de la web oficial:

- https://linuxmint.com/download.php

Comprueba que el archivo descargado ocupa unos **3 GB** y termina en `.iso`. Guárdalo en una
carpeta que recuerdes, por ejemplo `C:\ISOs\`.

![alt text](../images/s02-instalacion-mint-virtualbox/image-7.png)
---

## 2. Crear la máquina virtual

En VirtualBox, pulsa **Nueva**.

![alt text](../images/s02-instalacion-mint-virtualbox/image-1.png)

### 2.1 Nombre y sistema operativo

| Campo | Valor |
|---|---|
| Nombre | `LinuxMint` |
| Carpeta | la que uses para las MV del curso |
| Imagen ISO | el `.iso` que acabas de descargar |
| Tipo | Linux |
| Versión | Ubuntu (64-bit) |

> ⚠️ **Muy importante.** Marca la casilla **«Omitir instalación desatendida»**
> (*Skip Unattended Installation*). Si no la marcas, VirtualBox detecta la ISO, instala LinuxMint
> él solo y te saltas justo lo que vamos a evaluar: el particionado manual. Si se te olvida y
> la instalación empieza sola, apaga la máquina, bórrala y vuelve a crearla.

![alt text](../images/_obsoleto/s08-instalacion-ubuntu-virtualbox/image-2.png)

#### 2.1.1 Usuario  y Guest Additions

![alt text](../images/_obsoleto/s08-instalacion-ubuntu-virtualbox/image-3.png)


### 2.2 Hardware

Si vuestro equipo lo permite, sino, rebajar los recursos.

| Recurso | Valor | Por qué |
|---|---|---|
| Memoria base | **2048 MB**  opcional (**4096MB**)| Linx Mint con escritorio XFCE es capaz de ejecutar con 2GB de RAM
| Procesadores | **1** | Es suficiente para este sO |
| Habilitar EFI | **Sí** | Usamos UEFI + GPT|

![alt text](../images/s02-instalacion-mint-virtualbox/image-4.png)

#### UEFI + GPT vs BIOS + MBR

```
💡 Piensa en tu ordenador como una persona que acaba de despertarse. Antes de poder empezar a trabajar (cargar Windows, macOS o Linux), necesita que alguien le dé los buenos días, compruebe que todos sus componentes funcionan y le diga dónde buscar el sistema operativo. Ese es el trabajo de la BIOS o UEFI. Una vez que encuentra el disco duro, necesita un índice o "mapa" para saber cómo están organizados los datos dentro. Ese mapa es el MBR o GPT.

El Despertador del PC: BIOS vs. UEFI

BIOS (Basic Input/Output System): Es el sistema antiguo. Imagina un teléfono móvil de los años 90: pantalla con fondo azul o negro, letras pixeladas, solo se puede controlar con las flechas del teclado y es bastante lento.

UEFI (Unified Extensible Firmware Interface): Es la evolución moderna. Piensa en él como el smartphone actual. Tiene una interfaz gráfica colorida, puedes usar el ratón, arranca tu PC en un par de segundos y tiene sistemas de seguridad avanzados para evitar virus antes de que cargue Windows. Casi cualquier PC fabricado en los últimos 10 años usa UEFI.

El Mapa del Disco Duro: MBR vs. GPT

MBR (Master Boot Record): Es el sistema de organización viejo. Se quedó corto para la tecnología actual porque tiene un límite importante: no sabe leer discos duros de más de 2 Terabytes (TB) y solo te deja dividir tu disco en 4 "trozos" (particiones) principales.

GPT (GUID Partition Table): Es el estándar moderno. Puede manejar discos duros gigantescos (de millones de Terabytes) y te permite dividir tu disco duro en hasta 128 partes diferentes. Si tienes un PC moderno con UEFI y discos rápidos (como los SSD M.2), siempre debes usar GPT.
```

### 2.3 Disco duro

| Campo | Valor |
|---|---|
| Tamaño | **30 GB** |
| Reservar tamaño completo | **No** (reserva dinámica) |

> **Reserva dinámica** significa que el archivo `.vdi` empieza ocupando poco y crece según se
> va llenando. Ocupa menos en tu disco real a cambio de ser algo más lento. Para clase compensa.

### 2.4 Vídeo y red

Antes de arrancar, entra en **Configuración**:

- **Pantalla → Memoria de vídeo: 128 MB.** Con menos, el escritorio va a tirones.
- **Red → Adaptador 1: NAT.** Suficiente para tener internet durante la instalación.

---

## 3. Arrancar el instalador

Arranca la máquina. Verás el menú de GRUB de la imagen ISO; elige **Try or Install Ubuntu**.

El instalador te va guiando:

1. **Idioma:** Español.
2. **Accesibilidad:** salta este paso salvo que lo necesites.
3. **Distribución del teclado:** Spanish / Español. **Pruébalo en el cuadro de texto** escribiendo
   `ñ` y `@`: es el error más frecuente y el más molesto después, cuando escribas contraseñas.
4. **Red:** deja la conexión cableada tal cual.
5. **¿Qué quieres hacer?** → **Instalar Ubuntu**.
6. **Tipo de instalación:** **Selección predeterminada** (instala el escritorio y las aplicaciones
   básicas; la ampliada añade ofimática y juegos y tarda mucho más).
7. **Aplicaciones propietarias:** marca **Instalar software de terceros** para que instale
   controladores y códecs. Deja sin marcar la descarga de actualizaciones durante la instalación:
   irá más rápido y las aplicaremos después.

---

## 4. Particionado manual

Cuando llegues a **Tipo de instalación**, **no** elijas «Borrar disco e instalar Ubuntu».
Elige **Instalación manual** (*Manual partitioning* / «Algo más» en versiones anteriores).

Verás el disco `/dev/sda` vacío, sin tabla de particiones.

### 4.1 Crear la tabla de particiones

Si aparece el botón **Nueva tabla de particiones**, púlsalo. Se creará una tabla **GPT**, que es
la que corresponde a un sistema UEFI.

### 4.2 Crear las cuatro particiones

Crea una nueva **Tabla de Particiones**, selecciona el **espacio libre** y pulsa **+** para cada partición. Créalas **en este orden**:

![alt text](../images/s02-instalacion-mint-virtualbox/image-5.png)

**Partición 1 — EFI**

![alt text](../images/s02-instalacion-mint-virtualbox/image-6.png)

**Partición 2 — raíz**

![alt text](../images/s02-instalacion-mint-virtualbox/image-8.png)

**Partición 3 — swap**

![alt text](../images/s02-instalacion-mint-virtualbox/image-9.png)

**Partición 4 — home**

![alt text](../images/s02-instalacion-mint-virtualbox/image-10.png)

Finalmene las particiones debería verse así:

![alt text](../images/s02-instalacion-mint-virtualbox/image-11.png)


### 4.3 Dispositivo donde instalar el cargador de arranque

Abajo hay un desplegable: **Dispositivo donde instalar el cargador de arranque**.
Debe apuntar al **disco entero** (`/dev/sda`), **no** a una partición concreta.

> ⚠️ Éste es el fallo clásico. Si eliges `/dev/sda2` la instalación terminará «bien» pero la
> máquina no arrancará: el firmware no encontrará nada que ejecutar.

Antes de pulsar **Instalar ahora**, compara tu tabla con la del apartado
[Qué vas a conseguir](#qué-vas-a-conseguir). El instalador te pedirá confirmación porque va a
escribir los cambios en disco: a partir de aquí no hay marcha atrás.

---

## 5. Zona horaria y usuario

- **Zona horaria:** Madrid.
- **Cuenta de usuario:**

| Campo | Valor |
|---|---|
| Tu nombre | tu nombre real |
| Nombre del equipo | `ubuntu-smr` |
| Nombre de usuario | `alumno` |
| Contraseña | una que **recuerdes** |

> A lo largo del curso, donde ponga `alumno` sustituye por el nombre de usuario que hayas
> elegido tú. Anótalo: en Linux la contraseña no se puede «recuperar» pulsando un botón.

Marca **Solicitar mi contraseña para iniciar sesión** (no el inicio automático). En un puesto
de trabajo real el inicio automático es una mala práctica de seguridad, y ya que estamos, que
sea así desde el principio.

La instalación tarda entre 10 y 20 minutos. Cuando termine, **reinicia**. VirtualBox debería
expulsar la ISO solo; si te vuelve a arrancar el instalador, apaga la máquina y quita la imagen
en **Configuración → Almacenamiento**.

> 💡 **Buen momento para una instantánea.** Con el sistema recién instalado y arrancado, apaga
> la máquina y haz una instantánea llamada `01-recien-instalado`. Si algo se rompe más adelante,
> vuelves aquí en diez segundos en lugar de repetir una hora de trabajo.

---

## 6. Primer arranque y verificación

Instalar no es lo mismo que comprobar que está bien instalado. Abre un terminal
(`Ctrl` + `Alt` + `T`) y ejecuta:

```bash
lsblk -f
```

Debe mostrarte las cuatro particiones con su sistema de archivos y su punto de montaje:

```
NAME   FSTYPE FSVER LABEL UUID          FSAVAIL FSUSE% MOUNTPOINTS
sda
├─sda1 vfat   FAT32       XXXX-XXXX       505M     1%  /boot/efi
├─sda2 ext4   1.0         xxxxxxxx-...    5,1G    58%  /
├─sda3 swap   1           xxxxxxxx-...                 [SWAP]
└─sda4 ext4   1.0         xxxxxxxx-...    8,9G     1%  /home
```

Y ahora las comprobaciones una a una:

```bash
df -h            # Espacio libre por sistema de archivos montado
free -h          # Memoria RAM y swap
swapon --show    # Confirma que la swap está activa
cat /etc/fstab   # El fichero que monta todo esto en cada arranque
uname -a         # Versión del núcleo
```

> **Qué es `/etc/fstab`.** Es la lista de la compra del arranque: dice qué partición se monta
> en qué carpeta. Fíjate en que las particiones se identifican por **UUID** y no por `/dev/sda2`.
> Es a propósito: si mañana cambias los discos de sitio, `/dev/sda2` puede pasar a ser otra cosa,
> pero el UUID viaja con la partición. Este fichero volverá a aparecer en la instalación de Arch
> de la semana 17, donde lo generarás tú a mano con `genfstab`.

Actualiza el sistema:

```bash
sudo apt update
sudo apt upgrade
```

> **`sudo`** ejecuta un comando como administrador. En Ubuntu el usuario que creas durante la
> instalación entra automáticamente en el grupo `sudo`. En Arch tendrás que hacerlo tú (semana 17)
> y en la semana 22 verás exactamente cómo funciona el fichero `/etc/sudoers`.

---

## 7. Guest Additions

Sin las *Guest Additions* la ventana no se redimensiona, no hay portapapeles compartido y no
funcionan las carpetas compartidas. Son los controladores de la máquina virtual.

Primero, las herramientas para compilarlas:

```bash
sudo apt install build-essential dkms linux-headers-$(uname -r)
```

> `$(uname -r)` se sustituye por la versión del núcleo que tienes en ese momento. Es la primera
> vez que ves una **sustitución de comandos**: el resultado de `uname -r` se inserta ahí dentro.
> En la semana 31 harás esto constantemente al escribir scripts.

Después, en el menú de VirtualBox: **Dispositivos → Insertar imagen de CD de las Guest Additions**.
Ubuntu ofrecerá ejecutarla; acepta e introduce tu contraseña. Si no aparece el aviso:

```bash
cd /media/$USER/VBox_GAs_*/
sudo ./VBoxLinuxAdditions.run
```

Reinicia. Comprueba que ahora la ventana **se adapta al redimensionarla**.

Activa además en el menú **Dispositivos → Portapapeles compartido → Bidireccional**.

---

## 8. Carpeta compartida con el anfitrión

Esto lo usarás toda la asignatura para sacar capturas y scripts de la máquina virtual.

1. En Windows, crea una carpeta, por ejemplo `C:\SMR\compartida`.
2. Máquina apagada → **Configuración → Carpetas compartidas → +**
   - Ruta: `C:\SMR\compartida`
   - Nombre: `compartida`
   - Marca **Automontar** y **Hacer permanente**
3. Arranca la máquina y añade tu usuario al grupo `vboxsf`:

```bash
sudo adduser $USER vboxsf
```

4. **Cierra sesión y vuelve a entrar** (o reinicia). Los cambios de grupo sólo se aplican al
   iniciar sesión de nuevo.
5. Comprueba:

```bash
ls -l /media/sf_compartida
groups          # 'vboxsf' debe aparecer en la lista
```

> **Si te da «Permiso denegado»** es casi siempre porque no has reiniciado la sesión después de
> añadirte al grupo. `groups` te lo dice: si no ves `vboxsf`, tu sesión es anterior al cambio.
> Esta relación entre usuario, grupo y permiso es exactamente el tema de las semanas 20 y 22.

---

## Comparación con la instalación de Windows

Rellena esta tabla comparando lo que hiciste en la semana 7 con lo de hoy. Forma parte del
entregable.

| Aspecto | Windows | Ubuntu |
|---|---|---|
| ¿Se puede elegir el punto de montaje de cada partición? | | |
| ¿Cómo se llama el gestor de arranque? | | |
| ¿Dónde se guardan los datos del usuario? | | |
| ¿Cómo se llama la memoria de intercambio y dónde está? | | |
| ¿Cuánto ocupa el sistema recién instalado? (`df -h` / propiedades de C:) | | |
| ¿Cómo se instalan los controladores de la MV? | | |
| ¿Cuánto ha tardado la instalación? | | |

---

## Problemas frecuentes

| Síntoma | Causa habitual | Solución |
|---|---|---|
| La instalación empieza sola sin preguntar nada | No marcaste «Omitir instalación desatendida» | Borra la MV y vuelve a crearla |
| Tras reiniciar vuelve el instalador | La ISO sigue insertada | Configuración → Almacenamiento → quitar el disco |
| «No hay ningún sistema operativo» o pantalla negra de UEFI | El cargador se instaló en una partición y no en el disco | Reinstalar eligiendo `/dev/sda` como dispositivo del cargador |
| El escritorio va a tirones | Memoria de vídeo baja | Subir a 128 MB y comprobar las Guest Additions |
| La ventana no se redimensiona | Guest Additions no instaladas o sin `linux-headers` | Instalar `build-essential dkms linux-headers-$(uname -r)` y repetir |
| No hay internet en la MV | Adaptador desconectado | Red → Adaptador 1 → NAT → «Cable conectado» |
| El teclado escribe símbolos raros | Distribución de teclado mal elegida | Configuración → Teclado → Español |

---

## Entregable

**Tarea Moodle: «Manual de instalación con capturas — parte 2 (Linux)»**
Calificación de 0 a 10 · Se aprueba con 5.

Entrega un documento (PDF) que contenga:

1. Ficha de la máquina virtual: nombre, RAM, procesadores, disco, EFI, red.
2. **Esquema de particionado propuesto y justificado** antes de instalar: por qué ese tamaño
   para `/`, por qué separas `/home`, por qué esa swap.
3. Capturas numeradas de: creación de la MV, teclado, tabla de particiones antes de confirmar,
   dispositivo del cargador de arranque, y escritorio ya instalado.
4. Salida de `lsblk -f`, `df -h`, `free -h` y `cat /etc/fstab` **en texto, no en captura**.
5. La tabla de [comparación con Windows](#comparación-con-la-instalación-de-windows) rellenada.
6. Un apartado de incidencias: qué se te ha torcido y cómo lo has resuelto. Si no se te ha
   torcido nada, escribe «ninguna» — pero es raro.

**Se evalúa con la rúbrica de manual técnico.** El criterio principal es la **reproducibilidad**:
otra persona debe poder instalar el sistema siguiendo tu documento sin preguntarte nada. En la
semana 19 haremos exactamente eso con el manual de Arch, así que ve cogiendo el hábito.

---

## Ampliación

- Instala una segunda distribución más ligera (Xubuntu o Linux Mint XFCE) en otra MV y compara
  el consumo de RAM en reposo con `free -h`. ¿Cuánta memoria consume el escritorio en cada una?
- Redimensiona el disco virtual desde VirtualBox y amplía la partición `/home` con GParted sin
  perder datos.
- Averigua qué es una **partición swap** frente a un **fichero de intercambio** y cuál usa
  Ubuntu por defecto cuando no creas partición de swap.
