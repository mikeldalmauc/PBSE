---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 1 · Básico
tema: "06"
tipo: Guía
competencias: —
herramientas: H2 (CMD/PowerShell) y herramientas gráficas de Windows
duracion: 3 h
---

# Windows por dentro

> **Antes de empezar.** Necesitas un Windows 10 u 11, mejor tu máquina virtual de Windows. En el
> equipo del aula puedes mirar casi todo, pero crear usuarios pide ser administrador.

Llevas años usando Windows como usuario. Ahora vas a mirarlo como técnico: dónde guarda cada cosa,
qué ventana abres cuando algo falla y cómo se hace en Windows lo que ya sabes hacer en Linux. Al
terminar sabrás abrir cualquier herramienta del técnico en dos segundos y leer lo que te dice.

> **Analogía.** Windows y Linux son dos coches de marcas distintas. Los dos tienen volante, pedales
> y motor, pero los mandos están en otro sitio y se llaman de otra forma. Un buen mecánico no se
> aprende un coche: sabe qué piezas tiene cualquier coche y busca dónde las ha puesto cada marca.

| | |
|---|---|
| 🎯 **Qué vas a aprender** | Dónde guarda Windows cada cosa y qué ventanas usa un técnico para mirarlo y arreglarlo |
| 🧰 **Qué necesitas** | Windows 10 u 11 (mejor en una MV) y, para crear usuarios, una cuenta de administrador |
| ⏱️ **Tiempo** | 3 horas |
| 📦 **Qué entregas** | La ficha «Radiografía de mi Windows» ([Parte 4](#parte-4--entrega)) |

**Tu misión, paso a paso:**

- [ ] Saber dónde guarda Windows lo que en Linux está en `/etc`, `/home` o `/usr`.
- [ ] Abrir cualquier herramienta del técnico con `Win` + `X` o `Win` + `R`.
- [ ] Leer el Administrador de tareas, el de dispositivos, los discos, los servicios y los eventos.
- [ ] Ver y crear usuarios, con ventanas y con PowerShell.
- [ ] Entregar la radiografía.

## Índice

- [Parte 1 · Aprende](#parte-1--aprende)
  - [1. Lo mismo, en otro sitio](#1-lo-mismo-en-otro-sitio)
  - [2. Los dos atajos del técnico](#2-los-dos-atajos-del-técnico)
  - [3. Administrador de tareas](#3-administrador-de-tareas)
  - [4. Administrador de dispositivos](#4-administrador-de-dispositivos)
  - [5. Administración de discos](#5-administración-de-discos)
  - [6. Usuarios, grupos y el aviso de UAC](#6-usuarios-grupos-y-el-aviso-de-uac)
  - [7. Servicios y Visor de eventos](#7-servicios-y-visor-de-eventos)
  - [8. Para saber más](#8-para-saber-más)
- [Parte 2 · Lo que te llevas](#parte-2--lo-que-te-llevas)
- [Parte 3 · Practica](#parte-3--practica)
- [Parte 4 · Entrega](#parte-4--entrega)

---

## Parte 1 · Aprende

### 1. Lo mismo, en otro sitio

En Linux tus cosas están en `/home/alumno`. En Windows, en `C:\Users\alumno`. Es la misma pieza
del coche, puesta en otro sitio:

![Las mismas cosas en otro sitio: el sistema está en C:\Windows y en /usr; los programas en C:\Program Files y en /usr/bin; la configuración del equipo en el Registro y en /etc; las carpetas personales en C:\Users y en /home; la de cada usuario en AppData y en ~/.config; los otros discos tienen letra en Windows y cuelgan de /media en Linux](images/c-vs-raiz.svg)

Estas son las seis diferencias que vas a notar de verdad:

| | 🪟 Windows | 🐧 Linux |
|---|---|---|
| **Discos** | Una letra por disco: `C:`, `D:` | Un único árbol desde `/` |
| **Mayúsculas** | Dan igual: `Hola.txt` = `hola.txt` | Importan: son dos ficheros distintos |
| **Configuración** | El **Registro**, una base de datos | Ficheros de texto en `/etc` |
| **Administrador** | Grupo **Administradores** + aviso **UAC** | **root** + `sudo` |
| **Instalar programas** | Instalador `.exe` o Microsoft Store | `apt install` |
| **Terminal** | PowerShell (y el viejo CMD) | bash |

El **Registro** es la gran diferencia: la configuración de Windows es una única base de datos, no
ficheros de texto. Se mira con `Win` + `R` → `regedit` y tiene dos ramas: `HKEY_LOCAL_MACHINE`
(el equipo, como `/etc`) y `HKEY_CURRENT_USER` (tu usuario, como `~/.config`).

> [!CAUTION]
> **No toques el Registro «a ver qué pasa».** No hay «deshacer»: un valor mal cambiado puede
> impedir que Windows arranque. Si un tutorial te pide editarlo, antes haz **Archivo → Exportar**.

**🧪 Pruébalo.**

1. Pulsa `Win` + `E` y entra en `C:`. 👀 Deberías ver tres carpetas: `Windows` (el sistema),
   `Archivos de programa` (los programas) y `Usuarios` (la casa de cada uno; su ruta real es
   `C:\Users`).
2. Escribe `%APPDATA%` en la barra de direcciones y pulsa `Intro`. 👀 Estás en
   `C:\Users\tu-nombre\AppData\Roaming`: la configuración de tus programas, como `~/.config`.

**🧠 ¿Lo has pillado?** En Linux, `informe.TXT` e `informe.txt` son dos ficheros. ¿Y en Windows?

<details>
<summary>Ver respuesta</summary>

Son **el mismo** fichero: Windows no distingue mayúsculas de minúsculas en los nombres.

</details>

**📌 En una frase:** Windows guarda lo mismo que Linux pero en otro sitio: letras de disco en vez
de `/`, y el Registro en vez de `/etc`.

### 2. Los dos atajos del técnico

Para el día a día tienes **Configuración** (`Win` + `I`): pantalla, red, cuentas, actualizaciones.
Pero el técnico usa dos atajos que abren todo lo demás:

![Menú Win + X con las herramientas de esta guía marcadas con un color cada una: Visor de eventos, Administrador de dispositivos, Administración de discos, Administración de equipos, Terminal (Administrador), Administrador de tareas, Configuración y Ejecutar](images/win-x.svg)

- **`Win` + `X`** (o clic derecho en Inicio): el menú del técnico. Las herramientas de esta guía
  están ahí, a un clic.
- **`Win` + `R`** (Ejecutar): escribes el nombre corto de una herramienta y se abre. Estas son las
  que vas a usar:

```text
taskmgr         # Administrador de tareas (apartado 3)
devmgmt.msc     # Administrador de dispositivos (apartado 4)
diskmgmt.msc    # Administración de discos (apartado 5)
lusrmgr.msc     # Usuarios y grupos locales (apartado 6; no existe en Windows Home)
services.msc    # Servicios (apartado 7)
eventvwr.msc    # Visor de eventos (apartado 7)
compmgmt.msc    # Administración de equipos: todo lo anterior en una ventana (Parte 2)
winver          # Qué Windows tienes: versión y edición
```

**🧪 Pruébalo.**

1. Pulsa `Win` + `X`. 👀 Deberías ver el menú del dibujo. Ciérralo con `Esc`.
2. Pulsa `Win` + `R`, escribe `winver` y pulsa `Intro`. 👀 Una ventana pequeña con tu edición y
   versión de Windows (por ejemplo, «Windows 11 Pro, versión 24H2»). Apúntalas para la
   radiografía.

**📌 En una frase:** `Win` + `X` abre el menú del técnico y `Win` + `R` abre cualquier herramienta
por su nombre.

### 3. Administrador de tareas

Pulsa `Ctrl` + `Mayús` + `Esc`. Es el `htop` de Windows: ya lo usaste en la
[guía de procesos](../03-procesos/1-guia.md#7-lo-mismo-en-windows). Ahora lo miras entero:

![Esquema del Administrador de tareas: a la izquierda las pestañas, arriba el buscador, a la derecha el botón Finalizar tarea y, en la lista, cada proceso con su CPU, memoria, disco y red coloreados según lo que gasta](images/administrador-tareas.svg)

De sus siete pestañas te hacen falta cuatro:

- **Procesos**: qué gasta cada programa. Cuanto más naranja, más gasta. **Finalizar tarea** cierra
  lo que se ha colgado: es el `kill` de Windows.
- **Rendimiento**: cuántos núcleos y cuánta RAM tiene el equipo, y desde cuándo está encendido.
- **Aplicaciones de arranque**: qué se abre solo al encender y cuánto retrasa el arranque.
- **Detalles**: la lista técnica, con el **PID** de cada proceso.

> [!TIP]
> **«El ordenador tarda mucho en arrancar»** → pestaña **Aplicaciones de arranque**, ordena por
> «Impacto de inicio» y deshabilita lo que no haga falta. Es el arreglo más rápido que existe.

**🧪 Pruébalo.**

1. Abre el Administrador de tareas y entra en **Rendimiento → CPU**. 👀 Abajo pone los núcleos y
   el tiempo que lleva encendido. En **Memoria** ves cuánta RAM hay y cuánta se está usando.
2. Entra en **Aplicaciones de arranque** y haz clic en la columna **Impacto de inicio**. 👀 Los
   programas marcados «Alto» son los que frenan el arranque.

**📌 En una frase:** el Administrador de tareas es el `htop` de Windows: Procesos para cerrar,
Rendimiento para medir, Aplicaciones de arranque para acelerar y Detalles para el PID.

### 4. Administrador de dispositivos

`Win` + `X` → **Administrador de dispositivos**. Es la lista de todo el hardware que Windows ha
encontrado: pantalla, red, discos, USB… Cada pieza funciona gracias a un **controlador**
(*driver*): el programa que le enseña a Windows a hablar con ella.

![Esquema del Administrador de dispositivos: un árbol con el hardware del equipo, un dispositivo con triángulo amarillo en Otros dispositivos, una unidad de DVD con flecha hacia abajo, y el menú de clic derecho con Actualizar controlador, Deshabilitar, Desinstalar y Propiedades](images/administrador-dispositivos.svg)

Sólo hay tres iconos que reconocer:

- ⚠️ **Triángulo amarillo**: falta el controlador o falla. Clic derecho → **Actualizar
  controlador**, o bájalo de la web del fabricante.
- ⬇️ **Flecha hacia abajo**: el dispositivo está deshabilitado. Clic derecho → **Habilitar
  dispositivo**.
- ❓ En **Otros dispositivos**: Windows no sabe qué es. Mira su **Id. de hardware** (clic derecho
  → **Propiedades** → **Detalles**): un código como `PCI\VEN_8086&DEV_100E` que, buscado en
  internet, te lleva al controlador exacto (`VEN` es el fabricante y `DEV` el modelo).

> [!WARNING]
> **Si tras actualizar un controlador algo va peor**, en **Propiedades → Controlador** tienes
> **Revertir al controlador anterior**. Por eso nunca se borra un controlador «por si acaso».

**🧪 Pruébalo.**

1. Abre el Administrador de dispositivos y despliega **Adaptadores de red**. 👀 Tu tarjeta de red.
2. Doble clic sobre ella → pestaña **Controlador**. 👀 La **Versión del controlador** y el botón
   **Revertir al controlador anterior**. Apunta el nombre y la versión para la radiografía.

**📌 En una frase:** el Administrador de dispositivos dice qué hardware tiene el equipo y si a
alguna pieza le falta su controlador (triángulo amarillo).

### 5. Administración de discos

`Win` + `X` → **Administración de discos**. Aquí ves los discos, sus particiones y la letra de
cada una:

![Esquema de Administración de discos: el Disco 0 de 60 GB con la partición de sistema EFI de 100 MB, la MSR de 16 MB que no se ve, Windows C: de 59 GB en NTFS y la de recuperación de 750 MB; y el Disco 1, un pincho Ventoy con su partición exFAT y la pequeña VTOYEFI](images/administracion-discos.svg)

Windows 11 instala su disco en **GPT** (la misma tabla de particiones que usaste en Mint) y lo
parte así:

| Partición | Tamaño | Para qué |
|---|---|---|
| Sistema EFI | 100 MB | El arranque, como la de 512 MB de Mint |
| Reservada (MSR) | 16 MB | Uso interno de Windows. **No sale en la ventana** |
| Windows `C:` | El resto | El sistema y tus datos, en **NTFS**, el formato de disco de Windows |
| Recuperación | ~750 MB | Las herramientas para reparar Windows |

Con clic derecho sobre un volumen puedes **reducirlo**, **extenderlo**, **formatearlo** o
**cambiarle la letra**: así se hace hueco para poner un Linux al lado de Windows.

> [!CAUTION]
> **Son tus discos de verdad.** Aquí se mira; los cambios, en una máquina virtual. Y si Windows te
> ofrece «formatear» la partición `VTOYEFI` de tu
> [pincho Ventoy](../../2-intermedio/07-usb-multiarranque-ventoy/1-guia.md), **cancela**.

**🧪 Pruébalo.**

1. Abre Administración de discos y mira la fila **Disco 0**. 👀 Deberías ver tres trozos: uno
   pequeño sin letra (EFI), `C:` y otro pequeño de recuperación. La MSR no sale.
2. Clic derecho en el recuadro gris **Disco 0** → **Propiedades** → pestaña **Volúmenes**. 👀 En
   **Estilo de partición** pone GPT (o MBR si el equipo es antiguo). Apúntalo. En Terminal
   (Administrador) lo mismo es `Get-Disk`.

**📌 En una frase:** Administración de discos enseña los discos y sus particiones; Windows 11 usa
GPT con cuatro particiones, y la MSR no se ve.

### 6. Usuarios, grupos y el aviso de UAC

En casa todos usáis la misma cuenta, y es de administrador. En Windows, igual que en Linux, cada
persona debería tener su cuenta, y los permisos se dan a **grupos**. Hay dos tipos de cuenta:

- **Administrador**: está en el grupo **Administradores**. Puede instalar programas y cambiar el
  sistema. Es el grupo `sudo` de Mint.
- **Estándar**: está sólo en el grupo **Usuarios**. Usa el equipo, pero no lo administra.

Una cuenta es **local** (sólo existe en este equipo) o **de Microsoft** (entras con un correo).

**Con ventanas:** Configuración → **Cuentas** → **Otros usuarios** → **Agregar cuenta**. Para una
cuenta sin correo: «No tengo los datos de inicio de sesión de esta persona» → «Agregar un usuario
sin cuenta Microsoft».

**Con PowerShell** (abre **Terminal (Administrador)** con `Win` + `X`):

```powershell
Get-LocalUser                                    # usuarios del equipo
Get-LocalGroupMember -Group "Administradores"    # quién es administrador
$clave = Read-Host -AsSecureString "Contraseña"  # te la pide sin mostrarla
New-LocalUser -Name "prueba" -Password $clave    # crea el usuario
Add-LocalGroupMember -Group "Usuarios" -Member "prueba"   # lo mete en un grupo
Remove-LocalUser -Name "prueba"                  # lo borra al terminar
```

> [!NOTE]
> Los grupos se llaman según el idioma de tu Windows: `"Administradores"` en español,
> `"Administrators"` en inglés. Compruébalo con `Get-LocalGroup`.

Aunque seas administrador, Windows te hace trabajar como usuario normal y te pregunta cada vez que
algo necesita permisos de verdad. Ese aviso es el **UAC** (Control de cuentas de usuario), el primo
de `sudo`:

![Comparación entre la ventana de UAC de Windows, que pregunta si quieres permitir cambios y ofrece Sí o No, y sudo en Linux, que pide tu contraseña en el terminal; la idea es la misma: trabajas como usuario normal y pides permisos sólo para una tarea](images/uac-sudo.svg)

> [!WARNING]
> **No desactives UAC.** Es lo que impide que un programa descargado cambie el sistema sin que te
> enteres. Si molesta mucho, es que trabajas todo el día como administrador sin necesidad.

> [!TIP]
> **🧪 Pruébalo.** Abre PowerShell (sin administrador vale) y escribe:
>
> ```powershell
> Get-LocalGroupMember -Group "Administradores"
> ```
>
> 👀 Los administradores del equipo. Si tu nombre está ahí, eres administrador. Apúntalo: es una
> pregunta de la radiografía.

**🧠 ¿Lo has pillado?** En el ordenador de casa todos usáis la misma cuenta de administrador. ¿Qué
cambiarías?

<details>
<summary>Ver respuesta</summary>

Una **cuenta estándar para cada persona** y una sola de administrador, con contraseña, sólo para
instalar o configurar. Así un error o un virus en la sesión de alguien no toca el sistema.

</details>

**📌 En una frase:** cada persona su cuenta, administrador sólo quien lo necesita, y el aviso de
UAC es el `sudo` de Windows.

### 7. Servicios y Visor de eventos

Dos incidencias típicas del soporte técnico: «no imprime nada» y «el ordenador se apaga solo». Las
dos se resuelven con dos ventanas que miran lo que pasa por detrás.

**Servicios.** Un **servicio** es un programa que funciona en segundo plano, sin ventana: la cola
de impresión, Windows Update, el antivirus. Se ven en `Win` + `R` → `services.msc`. De cada uno
importan dos columnas: **Estado** (en ejecución o no) y **Tipo de inicio**:

- **Automático**: arranca al encender el equipo.
- **Manual**: sólo arranca cuando algo lo necesita.
- **Deshabilitado**: no puede arrancar.

Doble clic sobre un servicio → **Iniciar**, **Detener** o cambiar el tipo de inicio. «No imprime
nada» se arregla casi siempre reiniciando el servicio **Cola de impresión** (`Spooler`).

> [!CAUTION]
> **No deshabilites servicios porque lo diga un vídeo de «optimizar Windows».** Muchos hacen
> falta y el fallo aparece semanas después, cuando ya no te acuerdas de qué tocaste.

**Visor de eventos.** `Win` + `X` → **Visor de eventos**. Es el diario de Windows: cada aviso,
error o inicio de sesión queda apuntado. Dentro de **Registros de Windows** importan tres:
**Sistema** (controladores, servicios, apagados raros), **Aplicación** (errores de los programas)
y **Seguridad** (inicios de sesión). Cada evento tiene un nivel: **Crítico**, **Error**,
**Advertencia** o **Información**. «Se apaga solo» se ve en **Sistema**: un evento *Kernel-Power*
con el ID **41** significa que el equipo se apagó sin cerrarse bien.

**🧪 Pruébalo.**

1. Abre `services.msc` y busca **Windows Update**. 👀 Su **Estado** y su **Tipo de inicio**.
   Apúntalos para la radiografía.
2. Abre el Visor de eventos → **Registros de Windows → Sistema** → **Filtrar registro actual**
   (panel derecho) → marca **Crítico** y **Error**. 👀 La lista se queda corta: el primero es el
   último error del equipo. Apunta su **Origen**.

**📌 En una frase:** un servicio trabaja por detrás sin ventana (Estado y Tipo de inicio), y el
Visor de eventos es el diario donde Windows apunta cada error.

### 8. Para saber más

Tres cosas que te vas a cruzar, pero que no entran en la práctica.

**Linux dentro de Windows.** `Win` + `R` → `optionalfeatures` activa piezas opcionales. La mejor
es el **Subsistema de Windows para Linux** (WSL): un Ubuntu de verdad dentro de Windows, con su
`bash` y su `apt`. Se instala con `wsl --install`. Ojo: con WSL activado, VirtualBox puede ir más
lento.

**Instalar desde la terminal.** `winget` es el `apt` de Windows: `winget install Mozilla.Firefox`
instala Firefox y `winget upgrade --all` actualiza todo lo instalado.

**Más ventanas con `Win` + `R`.** `msinfo32` te dice si arrancas en UEFI y si el **arranque
seguro** está activado; `taskschd.msc` es el `cron` de Windows.

---

## Parte 2 · Lo que te llevas

**🎒 Si sólo te quedas con diez cosas:**

1. Windows guarda lo mismo que Linux en otro sitio: `C:\Users` es `/home`, `C:\Program Files` es
   `/usr/bin` y el **Registro** es `/etc`.
2. En Windows las mayúsculas de los nombres dan igual; en Linux, no.
3. `Win` + `X` abre el **menú del técnico**; `Win` + `R` abre cualquier herramienta por su nombre.
4. El **Administrador de tareas** es el `htop` de Windows; la pestaña Detalles tiene el PID.
5. El **Administrador de dispositivos** enseña el hardware; triángulo amarillo = sin **controlador**.
6. **Administración de discos** enseña particiones y letras; Windows 11 usa **GPT** con cuatro
   particiones (EFI, MSR escondida, `C:` en **NTFS** y recuperación).
7. Cada persona su cuenta: **estándar** para usar, **administrador** sólo para instalar.
8. El aviso de **UAC** es el `sudo` de Windows. No lo desactives.
9. Un **servicio** trabaja sin ventana; se mira su Estado y su Tipo de inicio en `services.msc`.
10. El **Visor de eventos** es el diario de Windows: Sistema, Aplicación y Seguridad, filtrado por
    Crítico y Error.

Casi todo esto cabe en una sola ventana, **Administración de equipos** (`compmgmt.msc`). Y cada
herramienta tiene su gemela en Linux:

![Árbol de Administración de equipos y, al lado, lo que harías en Linux: Programador de tareas es cron, Visor de eventos es journalctl, Usuarios y grupos locales es useradd, Rendimiento es top, Administrador de dispositivos es lspci, Administración de discos es lsblk y Servicios es systemctl](images/administracion-equipos.svg)

**Chuleta: los cinco atajos**

```text
Win + X               # menú del técnico
Win + R               # Ejecutar: abre una herramienta por su nombre
Win + I               # Configuración
Win + E               # Explorador de archivos
Ctrl + Mayús + Esc    # Administrador de tareas
```

---

## Parte 3 · Practica

Las dos prácticas van en la entrega. En el equipo del aula sólo puedes hacer la primera.

**Práctica 1 · Radiografía de tu Windows.** Responde a cada pregunta con la herramienta indicada
y apunta la respuesta. Cada una está a uno o dos clics de donde se explica.

| Pregunta | Herramienta | Tu respuesta |
|---|---|---|
| 1. ¿Qué edición y versión de Windows tienes? | `winver` | |
| 2. ¿Cuántos núcleos y cuánta RAM tiene? ¿Cuánto lleva encendido? | Administrador de tareas → Rendimiento | |
| 3. ¿Qué programa de arranque tiene más impacto? | Administrador de tareas → Aplicaciones de arranque | |
| 4. ¿Qué adaptador de red tiene y qué versión de controlador usa? | Administrador de dispositivos | |
| 5. ¿El disco 0 es GPT o MBR? ¿Cuántas particiones tiene y de qué tamaño? | Administración de discos | |
| 6. ¿Quién está en el grupo Administradores? | PowerShell | |
| 7. ¿En qué estado está el servicio Windows Update y qué tipo de inicio tiene? | `services.msc` | |
| 8. ¿Cuál fue el último **error** del registro Sistema y de qué origen? | Visor de eventos | |

> [!TIP]
> La pregunta 5 tiene truco: la partición MSR no sale en la ventana, pero
> `Get-Partition -DiskNumber 0` en Terminal (Administrador) sí la enseña.

**Práctica 2 · Crea un usuario de dos formas.** Sólo en tu máquina virtual de Windows; necesitas
ser administrador.

1. Con **Configuración → Cuentas → Otros usuarios** crea una cuenta local estándar llamada
   `alumno2`. Inicia sesión con ella y pulsa `Win` + `X` → **Terminal (Administrador)**. 👀
   Windows pide la contraseña de un administrador: una cuenta estándar no administra.
2. Vuelve a tu cuenta y, con **PowerShell**, crea la cuenta `prueba` y métela en el grupo
   `Usuarios` con los comandos del [apartado 6](#6-usuarios-grupos-y-el-aviso-de-uac).
   Compruébalo con `Get-LocalGroupMember -Group "Usuarios"` y guarda esa salida.
3. Borra las dos cuentas al terminar: `alumno2` desde Configuración y `prueba` con
   `Remove-LocalUser`.

> **Reto.** Haz lo mismo en tu Linux Mint con `sudo adduser alumno2` y `sudo deluser alumno2`.
> ¿Qué fichero de `/etc` cambia al crear un usuario? *(pista: la
> [ficha de exploración](../05-explorar-el-sistema/3-ejercicios.md))*

---

## Parte 4 · Entrega

**Tarea Moodle: «Radiografía de mi Windows»**
Calificación **Apto / No apto**.

Entrega un PDF exportado desde Markdown con:

1. La **tabla de la radiografía** completa: las 8 preguntas con herramienta y respuesta.
2. Una **captura** de cada herramienta que has usado, con un pie que diga qué se ve.
3. Los **comandos de PowerShell** con los que creaste y borraste el usuario `prueba`, y la salida
   de `Get-LocalGroupMember -Group "Usuarios"` antes de borrarlo, en bloque de código.
4. Tres **diferencias entre Windows y Linux** que te hayan sorprendido, con tus palabras.

Es **Apto** cuando están las cuatro partes y las respuestas son de **tu** equipo (se nota en las
capturas: nombre del equipo, versión, tamaños).

**✅ Antes de entregar, comprueba:**

- [ ] Las 8 preguntas tienen herramienta y respuesta.
- [ ] Cada captura tiene su pie.
- [ ] Los comandos están en texto, no en captura.
- [ ] Has borrado `alumno2` y `prueba` de tu máquina.
- [ ] Las tres diferencias están escritas con tus palabras.
