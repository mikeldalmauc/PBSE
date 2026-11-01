---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 2 · Intermedio
tema: "07"
tipo: Guía
competencias: CM2 (particiones y sistemas de archivos, en un disco real)
herramientas: Ventoy 1.1.17, H4 (terminal Linux) y PowerShell para las comprobaciones
duracion: 5 h (2 sesiones en el aula + descargas)
---

# Tu navaja suiza USB con Ventoy

> **Antes de empezar.** Necesitas un pendrive de 64 GB que se pueda borrar, un PC con Windows donde
> seas administrador y un equipo del aula para probar. Es el paso previo a [instalar Arch Linux](../08-instalar-arch-uefi/1-guia.md).

Llega a tu mesa un portátil que no arranca. Otro va lentísimo. A un tercero hay que instalarle Linux.
Un técnico no lleva una caja llena de pinchos: lleva **uno solo** que lo arranca todo. Al terminar
esta guía tendrás el tuyo, y sabrás qué sacar de él en cada caso.

> **Analogía.** Tu pincho va a ser una **navaja suiza**. Cada fichero `.iso` que copies es una hoja:
> una instala Windows, otra rescata ficheros, otra prueba la memoria. Ventoy es el mango que las
> sujeta todas y te deja elegir una al encender. Volveremos a la navaja toda la guía.

| | |
|---|---|
| 🎯 **Qué vas a conseguir** | Un pendrive que arranca una docena de sistemas y herramientas desde un menú |
| 🧰 **Qué necesitas** | Un pendrive de 64 GB, un PC con Windows (administrador) y un equipo del aula para probar |
| ⏱️ **Tiempo** | 5 horas: 2 sesiones en el aula + las descargas |
| 📦 **Qué entregas** | La tarea «Mi navaja suiza USB» y una defensa en el aula ([Parte 4](#parte-4--entrega)) |

**Tu misión, paso a paso:**

- [ ] Instalar Ventoy en el pincho y comprobar las dos particiones que crea.
- [ ] Descargar las ISO de la web oficial, **comprobar su huella** y ordenarlas con un `ventoy.json`.
- [ ] Arrancar tres ISO en un equipo real y pasar la pantalla azul de Secure Boot.
- [ ] Saber qué herramienta sacar en cada situación.

## Índice

- [Parte 1 · Aprende](#parte-1--aprende)
  - [1. Un pincho que lo arranca todo](#1-un-pincho-que-lo-arranca-todo)
  - [2. Instalar Ventoy en el pincho](#2-instalar-ventoy-en-el-pincho)
  - [3. Mira lo que ha hecho en el pincho](#3-mira-lo-que-ha-hecho-en-el-pincho)
  - [4. Las ISO de la navaja](#4-las-iso-de-la-navaja)
  - [5. Ordenar el pincho](#5-ordenar-el-pincho)
  - [6. Secure Boot, el portero con lista](#6-secure-boot-el-portero-con-lista)
  - [7. Arrancar desde el pincho](#7-arrancar-desde-el-pincho)
  - [8. Qué herramienta saco en cada situación](#8-qué-herramienta-saco-en-cada-situación)
  - [9. Para saber más](#9-para-saber-más)
- [Parte 2 · Lo que te llevas](#parte-2--lo-que-te-llevas)
- [Parte 3 · Practica](#parte-3--practica)
- [Parte 4 · Entrega](#parte-4--entrega)

---

## Parte 1 · Aprende

### 1. Un pincho que lo arranca todo

Para instalar Mint grabaste una ISO en un pincho con Rufus. Una **ISO** es un fichero que contiene un
DVD entero, copiado tal cual. Y el pincho grabado **se convierte** en ese DVD: sólo sirve para ese
sistema. ¿Cinco sistemas? Cinco pinchos.

![Con Rufus cada pincho es un sistema; con Ventoy un pincho guarda muchas ISO y se elige en un menú](images/dvd-vs-ventoy.svg)

Con Ventoy el pincho es una estantería: copias los ficheros `.iso` como copiarías fotos y, al
encender, Ventoy te enseña la lista y arranca el que elijas. ¿Ubuntu nuevo? Borras la ISO vieja y
copias la nueva. No se graba nada. Esto es lo que pasa entre que pulsas el botón y sale el instalador:

![Seis pasos desde que pulsas encender hasta que arranca la ISO, con el control de Secure Boot en medio](images/camino-arranque.svg)

El **firmware** (la **UEFI**, la «BIOS» de hoy) es el primer programa que se enciende. Con la tecla
del **menú de arranque** le dices «arranca desde el pincho». Ahí encuentra el **cargador de arranque**
de Ventoy, que te enseña el menú de ISO. Antes de dejarlo pasar, **Secure Boot** comprueba que el
cargador está firmado: lo verás en el apartado 6.

**🧪 Pruébalo.** Busca en tu PC la ISO de Mint de la máquina virtual (o descárgala de
https://linuxmint.com/download.php). Clic derecho → **Propiedades**. 👀 Un solo fichero `.iso` de
unos 2,8 GB: un DVD entero metido en un fichero. Ese es el que vas a copiar al pincho.

**📌 En una frase:** con Ventoy el pincho no se convierte en un sistema: guarda muchas ISO y eliges
una en un menú al encender.

### 2. Instalar Ventoy en el pincho

Ventoy se instala con un programa de Windows, `Ventoy2Disk.exe`. Mira sus cinco zonas:

![Esquema de la ventana de Ventoy2Disk con las cinco zonas que tienes que mirar](images/ventoy2disk-ventana.svg)

1. Descarga **`ventoy-1.1.17-windows.zip`** (o la más nueva) de https://www.ventoy.net/en/download.html.
   **Sólo de ahí**: una copia de otra web podría venir modificada, y algunos antivirus lo marcan como
   sospechoso porque escribe en el disco a bajo nivel.
2. Clic derecho → **Extraer todo**. Abre **`Ventoy2Disk.exe`**, acepta el aviso de administrador y
   pon **Language → Español**.
3. En **Opción**, deja marcado **Soporte Secure Boot** y el estilo de partición en **MBR**. Nada más.
4. **Desconecta cualquier disco externo** y copia lo que tengas en el pendrive: se va a borrar entero.
5. En **Dispositivo** elige tu pendrive. Fíjate en la **capacidad**: así no lo confundes con otro disco.
6. Pulsa **Instalar**. Ventoy avisa **dos veces** de que borrará todo. Lee la letra y el tamaño antes
   de aceptar la segunda.

> [!IMPORTANT]
> **«¿MBR? ¡Pero si en el curso todo es GPT!»** No hay contradicción. La **tabla de particiones**
> (MBR o GPT) es de **cada disco**, no del ordenador. Tu portátil puede tener su disco en GPT y
> arrancar desde un pincho MBR, que además arranca en equipos nuevos y viejos. Pregunta de examen.

Cuando salga una versión nueva de Ventoy volverás a esta ventana. Fíjate en qué botón pulsas:

> [!WARNING]
> **Instalar ≠ Actualizar.** **Instalar** formatea el pincho y borra las ISO. **Actualizar** sólo
> cambia la partición `VTOYEFI` y **no toca** tus ficheros. Para una versión nueva: **Actualizar**.

**🧪 Pruébalo.** Al terminar, mira la columna **Ventoy en dispositivo**. 👀 Pone `1.1.17` y un
escudo: el soporte de Secure Boot está activo. Si pone `—`, no se ha instalado.

**📌 En una frase:** Ventoy2Disk → Opción: Secure Boot y MBR → el pincho por su capacidad →
Instalar (dos avisos); a partir de ahí, siempre Actualizar.

### 3. Mira lo que ha hecho en el pincho

No te fíes: **mira**. Clic derecho en Inicio → **Administración de discos**. El pincho tiene ahora
**dos particiones**:

![El pincho tiene una tabla MBR, una partición grande exFAT llamada Ventoy y una pequeña de 32 MB llamada VTOYEFI](images/particiones-ventoy.svg)

- **`Ventoy`**, la grande: un almacén normal. Windows la ve como una unidad USB cualquiera. Aquí
  copias las ISO (y lo que quieras: drivers, programas, documentos).
- **`VTOYEFI`**, la pequeña de 32 MB: el cargador de arranque, lo que busca el firmware al encender.
  Hace de **partición EFI**, como la de 512 MB de tu MV de Mint. Windows no le da letra: no la ves
  en el Explorador.

> [!WARNING]
> **«Windows me pide formatear el pincho».** Es `VTOYEFI`, que Windows no entiende del todo.
> **Cancela** siempre. Si la formateas, Ventoy deja de arrancar (se arregla con **Actualizar**).

¿Y por qué la grande está en **exFAT** y no en FAT32, como un pincho normal? Porque el **sistema de
archivos** FAT32 no admite ficheros de 4 GB o más, y mira cuánto ocupan algunas ISO. exFAT no tiene
ese límite y lo leen Windows, macOS y Linux:

![Gráfico de barras: Windows 11, Ubuntu y Kali superan el límite de 4 GB de FAT32](images/fat32-vs-exfat.svg)

> [!TIP]
> **🧪 Pruébalo.** PowerShell como administrador (clic derecho en Inicio → **Terminal (administrador)**):
>
> ```powershell
> Get-Disk | Where-Object BusType -eq 'USB'     # el pincho y su número de disco
> Get-Partition -DiskNumber 1                   # cambia 1 por el número que te ha salido
> Get-Volume | Where-Object FileSystemLabel -in 'Ventoy','VTOYEFI'
> ```
>
> 👀 Dos particiones: una grande y una de 32 MB; `Ventoy` con sistema de archivos `exFAT`. Guarda
> esta salida: va en la entrega.

**🧠 ¿Lo has pillado?** ¿En qué partición copias las ISO y cuál busca el firmware al arrancar? Y
tienes un pincho FAT32 con 40 GB libres: ¿por qué no puedes copiar la ISO de Windows 11?

<details>
<summary>Ver respuestas</summary>

1. Las ISO van en la grande, **`Ventoy`**. El firmware busca la pequeña, **`VTOYEFI`**.
2. No es el espacio libre sino el **tamaño de cada fichero**: FAT32 no admite 4 GB o más y la ISO
   de Windows 11 pasa de 7 GB.

</details>

**📌 En una frase:** `Ventoy` (exFAT, grande) guarda las ISO; `VTOYEFI` (32 MB) arranca; exFAT
porque FAT32 no admite ficheros de 4 GB.

### 4. Las ISO de la navaja

Estas son las hojas de tu navaja, agrupadas por lo que resuelven. Descárgalas **sólo de la web
oficial** (versiones de septiembre de 2026):

![Las ISO agrupadas en cuatro hojas: instalar, rescatar, discos y hardware, seguridad y red](images/navaja-suiza.svg)

**🔵 Instalar un sistema**
- **Windows 11**: instalar o reinstalar Windows. https://www.microsoft.com/es-es/software-download/windows11 → *Descargar imagen de disco (ISO)*
- **Ubuntu**: instalar Ubuntu o probar si un portátil va bien con Linux. https://ubuntu.com/download/desktop
- **Linux Mint**: la distribución del curso; revive equipos viejos. https://linuxmint.com/download.php
- **Arch Linux**: la [instalación de Arch](../08-instalar-arch-uefi/1-guia.md). Sale una ISO nueva cada mes. https://archlinux.org/download/

**🟠 Rescatar un equipo que no arranca**
- **Hiren's BootCD PE**: un Windows que arranca desde el pincho con decenas de utilidades: explorador, antivirus, recuperar ficheros. https://www.hirensbootcd.org/download/
- **SystemRescue**: lo mismo en Linux: reparar GRUB, montar discos, `testdisk`. https://www.system-rescue.org/Download/

**🟢 Discos y hardware**
- **Clonezilla**: clonar un disco entero o guardar una imagen. En modo texto, muy fiable. https://clonezilla.org/downloads.php
- **Rescuezilla**: Clonezilla con ventanas. https://rescuezilla.com/download
- **GParted Live**: crear, mover y cambiar de tamaño particiones. https://gparted.org/download.php
- **Memtest86+**: probar la memoria RAM durante horas. Viene en un `.zip`: descomprímelo y copia la `.iso`. https://www.memtest.org/
- **ShredOS**: borrar un disco para siempre antes de vender o reciclar. https://github.com/PartialVolume/shredos.x86_64/releases

**🟣 Seguridad y red**
- **Kali Linux** (*Live*): auditoría de seguridad. La usarás en el ciclo. https://www.kali.org/get-kali/ → *Live Boot*
- **netboot.xyz**: una ISO diminuta que descarga por red el instalador de decenas de sistemas. https://netboot.xyz/downloads/

> [!CAUTION]
> **Kali y Hiren's no son juguetes.** Traen herramientas de ataque y para quitar contraseñas de
> Windows. Úsalas **sólo en equipos tuyos o con permiso por escrito**: entrar en un sistema ajeno es
> delito (artículo 197 bis del Código Penal). En el aula, sólo en tus máquinas virtuales.

**Cuánto ocupa todo.** Las trece ISO suman **unos 29 GB** (las gordas: Windows 11, 7 GB; Ubuntu,
6 GB; Kali, 4,5 GB; Hiren's, 3,1 GB). Hace falta un pincho de **64 GB**. En uno de 32 GB cabe la
lista corta, unos 15 GB: Windows 11, Mint, Hiren's, SystemRescue, Clonezilla, GParted y Memtest86+.

> [!NOTE]
> **¿Por qué un pincho «de 32 GB» tiene 29,8?** El fabricante cuenta 1 GB = 1 000 000 000 bytes.
> Windows cuenta 1 GB = 1 073 741 824 bytes (aunque ponga «GB»). 32 000 000 000 ÷ 1 073 741 824
> ≈ **29,8**. Nadie te ha timado: son los mismos bytes contados con otra unidad.

**Comprueba cada descarga.** Cada web oficial publica la **huella SHA-256** de sus ISO: un número
largo que sólo sale de ese fichero exacto; si cambia un solo bit, cambia la huella entera. Es el
**precinto** del bote: si tu número no coincide con el de la web, alguien ha abierto el bote o la
descarga se ha roto. Y aquí importa más que nunca: una ISO arranca **antes** que Windows, con acceso
total a todos los discos. Una ISO con la huella mal no se arranca nunca.

> [!TIP]
> **🧪 Pruébalo.** En PowerShell, dentro de la carpeta donde descargas:
>
> ```powershell
> Get-FileHash .\linuxmint-22.3-xfce-64bit.iso -Algorithm SHA256                           # una ISO
> Get-ChildItem *.iso | Get-FileHash -Algorithm SHA256 | Format-Table Hash, Path -AutoSize   # todas
> ```
>
> 👀 Una ristra de 64 letras y números. Compárala con la de la web (en Mint, el fichero
> `sha256sum.txt` junto a la descarga): tiene que coincidir **entera**. Guarda la salida de la
> segunda orden: va en la entrega.

**📌 En una frase:** trece ISO en cuatro grupos (instalar, rescatar, discos, seguridad), siempre de
la web oficial y siempre con la huella SHA-256 comprobada.

### 5. Ordenar el pincho

Ventoy busca ISO en **todo el pincho**, también dentro de carpetas. Aprovéchalo para que el menú
tenga orden:

```text
Ventoy (E:)
├── ISO/
│   ├── 1-instalar/            ← Windows 11, Ubuntu, Mint, Arch
│   ├── 2-rescate/             ← Hiren's, SystemRescue
│   ├── 3-discos/              ← Clonezilla, Rescuezilla, GParted, Memtest86+, ShredOS
│   └── 4-seguridad-y-red/     ← Kali, netboot.xyz
├── ventoy/ventoy.json         ← la configuración
└── LEEME.txt                  ← qué hay, qué versión y cuándo lo revisaste
```

Dos normas: carpetas **sin espacios ni tildes**, y las ISO con su **nombre original**, que ya dice
la versión. No hay botón de «grabar»: las ISO se **copian** como cualquier fichero.

**El fichero `ventoy.json`.** Ventoy funciona sin configurar nada. Pero con este fichero de texto le
cambias dos cosas: que el menú se abra en **vista de árbol** con tus carpetas (`"1"`; `"0"` es la
lista plana) y que enseñe un nombre claro en vez del nombre del fichero (`menu_alias`; la ruta
empieza en la raíz del pincho y lleva barras `/`, aunque estés en Windows). Escríbelo en VS Code:

```json
{
    "control": [ { "VTOY_DEFAULT_MENU_MODE": "1" } ],
    "menu_alias": [
        { "image": "/ISO/1-instalar/linuxmint-22.3-xfce-64bit.iso", "alias": "Linux Mint 22.3 Xfce (la del curso)" },
        { "image": "/ISO/2-rescate/HBCD_PE_x64.iso", "alias": "Hiren's BootCD PE (rescate Windows)" },
        { "image": "/ISO/3-discos/mt86plus_8.10_x86_64.iso", "alias": "Memtest86+ (probar la RAM)" }
    ]
}
```

> [!TIP]
> **¿Te da error?** Es JSON: nada de comentarios, y cuidado con las comas. VS Code subraya en rojo lo
> que está mal. El fallo típico es una coma después del **último** elemento de una lista.

**🧪 Pruébalo.** Crea las carpetas, copia la ISO de Mint a `ISO/1-instalar/`, guarda el `ventoy.json`
de arriba en `ventoy/` y escribe tu `LEEME.txt`. 👀 En VS Code, el JSON sin subrayados rojos. En el
Explorador, el pincho con sus carpetas y la ISO dentro, sin grabar nada.

> [!WARNING]
> **Espera a que termine la copia y usa «Expulsar»** antes de sacar el pincho. Con ficheros de
> varios GB, sacarlo a lo bruto deja ISO a medias que luego «no arrancan sin motivo».

**📌 En una frase:** carpetas sin espacios, ISO con su nombre original, un `ventoy.json` con árbol
y alias, un `LEEME.txt`, y Expulsar antes de sacar el pincho.

### 6. Secure Boot, el portero con lista

**Secure Boot** es una función de la UEFI que sólo deja arrancar programas **firmados** con una
clave de confianza. De fábrica, la única clave de la lista es la de **Microsoft**. Microsoft firma
Windows y también un programita, *shim*, con el que arrancan casi todos los Linux.

![Secure Boot como portero: Windows y Linux con shim pasan; Ventoy necesita registrar su clave MOK la primera vez](images/secure-boot-portero.svg)

> **Analogía.** Secure Boot es el **portero de una discoteca con lista**. En la lista están
> Microsoft y quien Microsoft avala. Ventoy no está, así que la primera vez tienes que **apuntarlo
> tú**. Esa clave que añade el dueño de la máquina se llama **MOK** (*Machine Owner Key*), y la
> apuntas en una pantalla azul que verás en el apartado 7. Se hace **una vez por equipo**.

Desde Ventoy 1.1.14 la clave es otra: los certificados antiguos de Microsoft caducaron en 2026. Si
actualizas un pincho viejo, el equipo te pedirá la clave nueva aunque ya tuviera la vieja.

> [!CAUTION]
> **La otra cara.** Una vez registrada su clave, Ventoy **se salta** Secure Boot para las ISO que
> arranca: por eso arrancan también las que no están firmadas (Arch, Memtest86+…). Es cómodo, pero
> es un agujero: en ese equipo, cualquiera con un pincho Ventoy arranca lo que quiera. Lo
> comentaremos en clase, y es la pregunta 4 de la entrega.

**🧪 Pruébalo.** En Windows, pulsa `Win` + `R`, escribe `msinfo32` y acepta. 👀 Busca las filas
**Modo de BIOS** (tiene que poner *UEFI*) y **Estado de arranque seguro**: *Activado* o *Desactivado*.
Así sabes si ese equipo te va a enseñar la pantalla azul la primera vez.

**🧠 ¿Lo has pillado?** ¿Por qué Windows arranca con Secure Boot sin que registres nada? ¿Y qué es
la clave MOK?

<details>
<summary>Ver respuestas</summary>

1. Porque está firmado por Microsoft, que ya está en la lista de fábrica.
2. La clave que el **dueño de la máquina** añade a la lista de Secure Boot. Ventoy te pide registrar
   la suya la primera vez.

</details>

**📌 En una frase:** Secure Boot sólo deja arrancar lo firmado; Ventoy no está en la lista y la
primera vez registras su clave MOK, una vez por equipo.

### 7. Arrancar desde el pincho

**La tecla del menú de arranque.** No cambies el orden de arranque en la UEFI: casi todos los equipos
tienen un menú de arranque de un solo uso. Pulsa la tecla **repetidamente** nada más encender, como
quien llama a un ascensor con prisa.

| Fabricante | Tecla |
|---|---|
| Dell, Lenovo, Acer, Gigabyte, Toshiba | `F12` (en Acer, actívalo antes en la UEFI) |
| HP | `F9` (o `Esc` y luego `F9`) |
| ASUS | `F8` en sobremesa, `Esc` en portátil |
| MSI, ASRock | `F11` |

El pincho puede salir **dos veces**: con `UEFI:` delante y sin ella. Elige la de **UEFI**, el modo
del curso.

> [!WARNING]
> **Si Windows arranca igualmente**, no estaba apagado de verdad: el apagado normal de Windows 10/11
> es una hibernación y se salta el menú. Apaga con **Mayús + Apagar**.

**La primera vez: la pantalla azul.** Con Secure Boot activo, la primera vez no sale Ventoy sino una
pantalla azul en inglés, sin ratón: el portero preguntando por el nuevo de la lista. Flechas y **Enter**:

![Las seis pantallas de MokManager para registrar la clave de Ventoy, en orden](images/pasos-mok.svg)

1. `Verification failed: (0x1A) Security Violation`. Es lo esperado. Pulsa **OK**.
2. Pulsa una tecla para entrar en **Perform MOK management**. **Rápido**: hay una cuenta atrás de
   unos segundos y, si se acaba, el equipo arranca sin registrar nada.
3. Elige **Enroll key from disk**.
4. Entra en **`VTOYEFI`** y elige **`ENROLL_THIS_KEY_IN_MOKMANAGER.cer`**.
5. **Continue** → **Yes**.
6. **Reboot**. Vuelve a abrir el menú de arranque y elige el pincho. Ahora sí sale Ventoy.

> [!NOTE]
> Si en vez de la pantalla azul sale un error y el equipo no deja registrar claves, desactiva Secure
> Boot en la UEFI para la práctica y vuelve a activarlo al terminar.

**El menú de Ventoy.** Verás tus carpetas (o la lista de ISO). Cuatro teclas:

```text
Enter    abre la ISO: elige «Boot in normal mode»
F3       cambia entre lista y árbol de carpetas
Ctrl+R   si un Linux no arranca en modo normal: modo GRUB2
Esc      volver atrás
```

> [!CAUTION]
> **En un equipo real no pulses «Instalar»** en ningún instalador, ni «Start» en ShredOS o Clonezilla:
> borrarías el disco del equipo del aula. Ventoy sólo **arranca** el instalador; lo que borra discos
> es lo que haces después. Las instalaciones de verdad, en máquinas virtuales.

**🧪 Pruébalo: las tres pruebas de la entrega.** Arranca tres ISO hasta su pantalla principal, **sin
instalar nada**, y haz una foto de cada una con el móvil:

1. **Linux Mint** hasta el escritorio *live* (un sistema que funciona desde el pincho sin instalarse).
   👀 El escritorio de Mint con el icono *Install Linux Mint*.
2. **Hiren's BootCD PE** hasta su escritorio. 👀 Un escritorio tipo Windows lleno de utilidades.
3. **El instalador de Windows 11** hasta la pantalla de idioma. 👀 *Configuración de Windows*. Ahí, **apaga**.

**Si algo falla:**

- El pincho no sale en el menú de arranque → otro puerto USB (en sobremesa, uno trasero) y activa *USB Boot* en la UEFI.
- Ventoy2Disk no ve el pincho → ábrelo como administrador.
- Pantalla azul `Verification failed` → es Secure Boot: los seis pasos de arriba.
- Después de actualizar Ventoy vuelve a pedir la clave → normal, la clave es nueva: regístrala.
- Una ISO se queda en negro o da error → comprueba su huella SHA-256; si es correcta, prueba `Ctrl` + `R`.

**🧠 ¿Lo has pillado?** Arrancas un HP y aparece Windows en lugar del menú de arranque: ¿qué dos
cosas pudieron fallar? Y en la pantalla azul se acaba la cuenta atrás antes de que pulses: ¿qué pasa?

<details>
<summary>Ver respuestas</summary>

1. No pulsaste `F9` a tiempo, o Windows estaba **hibernado**: apaga con **Mayús + Apagar**.
2. El equipo arranca sin registrar nada. Reinicia, vuelve al menú de arranque y pulsa antes.

</details>

**📌 En una frase:** tecla del menú de arranque → `UEFI: pincho` → (la primera vez) los seis pasos
de la pantalla azul → menú de Ventoy → Enter → *Boot in normal mode*.

### 8. Qué herramienta saco en cada situación

Tener las ISO no te hace técnico. Lo que te hace técnico es saber **qué hoja de la navaja abrir**:

- **Windows no arranca y hay que salvar las fotos del usuario** → **Hiren's** → arrancar, abrir el explorador y copiar la carpeta del usuario a un disco externo.
- **El portátil va lentísimo y quieres pasar el sistema a un SSD nuevo** → **Clonezilla** o **Rescuezilla** → clonar disco a disco (*device-device*).
- **Pantallazos azules al azar, sin patrón** → **Memtest86+** → dejarlo varias pasadas; un solo error ya es RAM defectuosa.
- **Quieres instalar Linux junto a Windows y no hay espacio libre** → **GParted Live** → reducir la partición de Windows (antes, desfragmentar y quitar la hibernación).
- **Tras instalar Windows, desaparece el GRUB de Arch** → **SystemRescue** o **Arch** *live* → montar las particiones, `arch-chroot` y reinstalar GRUB.
- **Vas a donar un equipo con disco mecánico** → **ShredOS** → `nwipe`, una pasada. Con un SSD, mejor el borrado seguro del fabricante.
- **Ordenador de 2012 que ya no mueve Windows** → **Linux Mint** → probar en *live*; si va fino, instalar.
- **¿Funciona la wifi de este portátil en Linux?** → **Ubuntu** *live* → arrancar y probar sin tocar el disco.
- **Copia completa del sistema antes de tocar nada** → **Clonezilla** → guardar una imagen del disco en un disco externo (*device-image*).

> [!TIP]
> **Regla del técnico:** antes de cualquier operación que pueda borrar algo (particionar, reparar,
> reinstalar), **primero una copia** con Clonezilla o Hiren's. Cinco minutos de copia te ahorran un
> disgusto enorme.

**🧪 Pruébalo.** Tapa con la mano lo que va después de cada primera flecha y, situación por situación,
di en voz alta qué hoja sacas y qué harías. 👀 Si fallas más de dos, vuelve al apartado 4: en la
entrega tendrás tres situaciones nuevas, y en la defensa, tres minutos.

**📌 En una frase:** Hiren's para rescatar Windows, SystemRescue para Linux, Clonezilla para copiar
discos, GParted para particiones, Memtest86+ para la RAM, ShredOS para borrar, Mint y Ubuntu *live*
para probar.

### 9. Para saber más

Lo que no hace falta para la práctica ni para el examen.

**Mantener la navaja afilada.** Para cambiar una ISO: borras la vieja, copias la nueva y cambias el
alias si lo tenía. Arch saca una ISO al mes y Kali una por trimestre: revisa el pincho cada
trimestre y apúntalo en `LEEME.txt`. Para Ventoy, siempre el botón **Actualizar**.

**Persistencia: un Linux que recuerda.** Un Linux *live* lo olvida todo al apagar. Con un fichero
`.dat` de **persistencia** en el pincho, Mint guarda lo que instales y cambies, como una mochila. Se
crea desde tu MV con el script `CreatePersistentImg.sh` del paquete de Ventoy para Linux (`-s` tamaño
en MB, `-l casper-rw` para Mint y Ubuntu) y se enlaza con la ISO en `ventoy.json`, sección
`persistence`. Al arrancar, Ventoy pregunta si quieres usarla. Detalles: documentación de Ventoy
(menú *Document* de ventoy.net, plugin *Persistence*).

**Otras cosas que verás.** Ventoy salta por defecto las comprobaciones de TPM y procesador del
instalador de Windows 11 (`VTOY_WIN11_BYPASS_CHECK`); un Windows instalado así en un equipo viejo
no tiene garantizadas las actualizaciones. Y si un pincho «de 64 GB» se llena con 20, es falso:
compruébalo con H2testw.

---

## Parte 2 · Lo que te llevas

**🎒 Si sólo te quedas con diez cosas:**

1. Una **ISO** es un DVD entero en un fichero. Con Rufus el pincho **se convierte** en esa ISO; con
   Ventoy el pincho **guarda** muchas y eliges una en el menú.
2. El **firmware** (UEFI) es lo primero que se enciende; con la tecla del **menú de arranque** le
   dices que arranque desde el pincho.
3. Ventoy2Disk: **Opción** → Secure Boot ✅ y **MBR**; el pincho **por su capacidad**; **Instalar**
   borra todo (dos avisos).
4. **Instalar ≠ Actualizar**: Actualizar cambia sólo `VTOYEFI` y no toca tus ISO.
5. Dos particiones: **`Ventoy`** (exFAT, grande, las ISO) y **`VTOYEFI`** (32 MB, el cargador de
   arranque, hace de **partición EFI**).
6. **exFAT** porque **FAT32** no admite ficheros de 4 GB o más. Si Windows pide formatear `VTOYEFI`, **cancela**.
7. La **tabla de particiones** (MBR o GPT) es de cada disco: un pincho MBR arranca en un equipo con disco GPT.
8. Las ISO, **sólo de la web oficial** y con la **huella SHA-256** comprobada (`Get-FileHash`). Un
   pincho «de 32 GB» tiene 29,8 porque Windows cuenta 1 GB = 1 073 741 824 bytes.
9. **Secure Boot** sólo deja arrancar lo firmado. Ventoy no está en la lista: la primera vez registras
   su clave **MOK** en la pantalla azul (seis pasos, una vez por equipo).
10. Antes de cualquier cosa que pueda borrar: **primero una copia** (Clonezilla o Hiren's).

**Chuleta**

```text
# La práctica en 8 pasos
1  ventoy-1.1.17-windows.zip → Get-FileHash → Extraer todo
2  desconecta otros discos externos
3  Ventoy2Disk.exe → Opción: Secure Boot ✅, MBR
4  Dispositivo: el pincho (por capacidad) → Instalar → dos avisos
5  Administración de discos: Ventoy (exFAT) + VTOYEFI (32 MB)
6  ISO de la web oficial → Get-FileHash → carpetas ISO/1-instalar…
7  ventoy/ventoy.json (árbol + alias) y LEEME.txt → Expulsar
8  tecla del menú de arranque → UEFI: pincho → pantalla azul MOK (1.ª vez) → Ventoy

# Teclas
F12 / F9 / F11 / F8 / Esc     menú de arranque, según el fabricante
Enter → Boot in normal mode   arrancar la ISO elegida
F3                            lista ↔ árbol        Ctrl+R   modo GRUB2 si un Linux no arranca
flechas + Enter               pantalla azul de MOK (no hay ratón)
```

---

## Parte 3 · Practica

> [!TIP]
> Esto **no cuenta para nota**: es para comprobar que lo tienes claro antes de la práctica real y de
> la defensa. Lo que puntúa está en la [Parte 4](#parte-4--entrega).

**Calentamiento**

1. Te dan un pincho de 128 GB. ¿Cuántos GB verá Windows, aproximadamente? Haz la cuenta.
2. Un compañero dice que Ventoy le ha borrado el disco del portátil al «probar» el instalador de
   Windows. ¿Es posible? ¿Qué ha pasado de verdad?
3. ¿Por qué Linux Mint arranca con Secure Boot activo sin registrar nada, y Ventoy no?

<details>
<summary>Ver respuestas</summary>

1. 128 000 000 000 ÷ 1 073 741 824 ≈ **119,2 GB**.
2. Ventoy sólo **arranca** el instalador. El disco se borra si dentro del instalador se pulsa
   «Instalar» y se eligen particiones. Por eso en el aula: hasta la pantalla de idioma y apagar.
3. Mint arranca con *shim*, firmado por Microsoft, que está en la lista de fábrica. Ventoy va firmado
   con su propia clave, que no está: hay que registrarla (MOK).

</details>

**Situaciones** (como las tres que te pondrá el profesor en la entrega): ¿qué hoja sacas y qué pasos das?

1. Un compañero ha borrado sin querer la partición de Linux de su portátil y ahora el equipo arranca
   en una pantalla negra con `grub rescue>`.
2. Una empresa te pide revisar 10 ordenadores que se van a reciclar: no puede quedar ni un dato.
   Tienen discos mecánicos.
3. Un cliente dice que su ordenador «se reinicia solo cuando juega», y ya ha cambiado la fuente.

<details>
<summary>Ver respuestas</summary>

1. **SystemRescue** (o la ISO de Arch *live*): arrancar, montar las particiones que queden, `chroot` y
   reinstalar GRUB. Si la partición está borrada del todo, `testdisk` puede intentar recuperarla.
   **Antes de tocar nada**, imagen del disco con Clonezilla.
2. **ShredOS** con `nwipe`, una pasada por disco, y apuntar el número de serie de cada disco borrado
   como justificante.
3. **Memtest86+** varias pasadas para descartar la RAM. Si está bien, seguiría por la temperatura
   (con Hiren's se ven los sensores).

</details>

---

## Parte 4 · Entrega

**Tarea Moodle: «Mi navaja suiza USB»**
Calificación de 0 a 10 · Se aprueba con 5.

Entrega un **PDF exportado desde Markdown** (como en la
[guía de Markdown](../../1-basico/01-markdown/1-explicacion.md)) con:

1. **Ficha del pincho**: marca, capacidad anunciada y capacidad real que ve Windows, versión de
   Ventoy, estilo de partición y si tiene Secure Boot activado. Explica la diferencia entre las
   dos capacidades.
2. **Captura de Administración de discos** (o la salida de `Get-Partition` en texto) donde se vean
   las dos particiones, y un párrafo que explique para qué sirve cada una.
3. **Tabla de ISO**: nombre, versión, tamaño, web oficial y **resultado de la comprobación
   SHA-256** (la salida de `Get-FileHash` en texto, no en captura).
4. Tu **`ventoy.json`** con al menos `VTOY_DEFAULT_MENU_MODE` y tres `menu_alias`.
5. **Prueba de arranque** en un equipo real: foto con el móvil del menú de Ventoy y de las tres
   pantallas del [apartado 7](#7-arrancar-desde-el-pincho). Indica el modelo del equipo, la tecla
   del menú de arranque y si tuviste que registrar la clave MOK.
6. **Cuatro preguntas**, con tus palabras:
   1. ¿Por qué Ventoy formatea en exFAT y no en FAT32?
   2. ¿Por qué un pincho con tabla MBR puede arrancar en un equipo UEFI con disco GPT?
   3. ¿Qué es la clave MOK y por qué la pide Ventoy la primera vez?
   4. Ventoy se salta Secure Boot una vez registrada su clave. ¿Qué riesgo supone eso en los
      equipos de una empresa?
7. **Tres situaciones** que te dará el profesor en Moodle, del estilo de las del
   [apartado 8](#8-qué-herramienta-saco-en-cada-situación): qué herramienta sacas y qué pasos
   darías.
8. **Incidencias**: qué se torció y cómo lo resolviste.

**Rúbrica**

| Criterio | Puntos |
|---|---|
| Ficha del pincho y explicación de las particiones (1 y 2) | 1,5 |
| Tabla de ISO completa y verificada con SHA-256 (3) | 2 |
| `ventoy.json` válido y funcionando (4) | 1 |
| Prueba de arranque documentada (5) | 2 |
| Respuestas a las cuatro preguntas (6) | 2 |
| Situaciones resueltas con criterio (7) | 1 |
| Incidencias y calidad del documento (8, formato, capturas con pie) | 0,5 |

> [!IMPORTANT]
> **Defensa en el aula** (sin nota aparte, pero sin ella no se califica la tarea): el profesor te
> pide una herramienta de la lista y tienes que llegar a su pantalla principal en un equipo del
> aula en menos de **tres minutos**, desde el equipo apagado. Practica antes: ¿sabes la tecla del
> menú de arranque de los equipos del aula?

**✅ Antes de entregar, comprueba:**

- [ ] La ficha explica por qué la capacidad real es menor que la anunciada.
- [ ] Se ven las **dos** particiones y explicas cada una.
- [ ] Las huellas SHA-256 están **en texto**, no en captura.
- [ ] Tu `ventoy.json` funciona (lo has probado arrancando).
- [ ] Hay foto del menú de Ventoy y de las tres pantallas.
- [ ] Las cuatro preguntas están respondidas con tus palabras.
