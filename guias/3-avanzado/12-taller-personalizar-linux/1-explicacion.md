---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 3 · Avanzado
tema: "12"
tipo: Explicación
caracter: TALLER — parte obligatoria (niveles 1 a 3) y parte de ampliación (niveles 4 a 6)
competencias: CM4
herramientas: H4 (terminal Linux)
duracion: 2 sesiones + trabajo autónomo
---

# Taller: personaliza tu Linux

> **Antes de empezar.** Es la personalización del entorno del usuario en versión taller: se hace, se enseña y se
> compara. Va justo detrás de la [guía de zsh y Powerlevel10k](../11-terminal-zsh-p10k/1-explicacion.md),
> que se ocupa del *prompt*. Ésta se ocupa de **todo lo demás**.

> **Por qué esto no es perder el tiempo.** Configurar un escritorio parece un juego, y en parte lo
> es. Pero por el camino aprendes dónde guarda Linux la configuración, la diferencia entre lo que
> es del usuario y lo que es del sistema, cómo se instalan cosas que no están en los repositorios,
> cómo se automatiza una tarea y cómo se hace reproducible una configuración. Eso es exactamente
> lo que hace un técnico de sistemas cuando prepara veinte puestos iguales para una empresa.

## Índice

- [Taller: personaliza tu Linux](#taller-personaliza-tu-linux)
  - [Índice](#índice)
  - [Las cuatro reglas del taller](#las-cuatro-reglas-del-taller)
  - [Nivel 0: dónde vive la configuración](#nivel-0-dónde-vive-la-configuración)
  - [Nivel 1: el escritorio](#nivel-1-el-escritorio)
    - [1.1 Temas, iconos y fuentes](#11-temas-iconos-y-fuentes)
    - [1.2 Papel de pared](#12-papel-de-pared)
    - [1.3 Atajos de teclado propios](#13-atajos-de-teclado-propios)
    - [1.4 El panel](#14-el-panel)
  - [Nivel 2: el terminal como panel de control](#nivel-2-el-terminal-como-panel-de-control)
    - [2.1 `fastfetch` a tu gusto](#21-fastfetch-a-tu-gusto)
    - [2.2 `btop`](#22-btop)
    - [2.3 `conky`: información sobre el escritorio](#23-conky-información-sobre-el-escritorio)
  - [Nivel 3: tu propio mensaje de bienvenida](#nivel-3-tu-propio-mensaje-de-bienvenida)
    - [3.1 El MOTD: lo que se ve al iniciar sesión en consola](#31-el-motd-lo-que-se-ve-al-iniciar-sesión-en-consola)
    - [3.2 `/etc/issue`: lo que se ve **antes** de iniciar sesión](#32-etcissue-lo-que-se-ve-antes-de-iniciar-sesión)
  - [Nivel 4: comandos que parecen tontería y no lo son](#nivel-4-comandos-que-parecen-tontería-y-no-lo-son)
  - [Nivel 5: que se haga solo](#nivel-5-que-se-haga-solo)
    - [5.1 Fondo de pantalla que cambia solo](#51-fondo-de-pantalla-que-cambia-solo)
    - [5.2 Aviso cuando el disco se llena](#52-aviso-cuando-el-disco-se-llena)
  - [Nivel 6: hazlo reproducible](#nivel-6-hazlo-reproducible)
    - [6.1 Reunir los dotfiles](#61-reunir-los-dotfiles)
    - [6.2 La lista de paquetes](#62-la-lista-de-paquetes)
    - [6.3 El script de instalación](#63-el-script-de-instalación)
    - [6.4 Guardarlo con Git](#64-guardarlo-con-git)
    - [6.5 **La prueba de fuego**](#65-la-prueba-de-fuego)
  - [Cómo deshacerlo todo](#cómo-deshacerlo-todo)
  - [Ampliación: gestores de ventanas en mosaico](#ampliación-gestores-de-ventanas-en-mosaico)

---

## Las cuatro reglas del taller

1. **Instantánea antes de empezar.** Apaga la máquina y crea la instantánea `antes-del-taller`.
   Es la única forma de experimentar sin miedo.
2. **Todo tiene que ser reversible.** Antes de tocar un fichero de configuración,
   `cp fichero{,.bak}`. Antes de tocar algo de `/etc`, doblemente.
3. **Todo tiene que estar documentado.** Si no sabes explicar qué hace una línea que has puesto,
   quítala. Un escritorio precioso que no sabes reconstruir no vale nada.
4. **Reconstruible en 10 minutos.** El nivel 6 consiste justo en eso: un script que deja la
   máquina como la tienes. Si no puedes, es que no lo has entendido.

## Nivel 0: dónde vive la configuración

Antes de tocar nada, el mapa. En Linux **la configuración son ficheros de texto**, y sólo hay que
saber en cuál de estos tres sitios está la que buscas:

| Ruta | Qué contiene | A quién afecta |
|---|---|---|
| `/etc/` | Configuración del **sistema** | A todos los usuarios |
| `~/.config/` | Configuración de **aplicaciones** del usuario | Sólo a ti |
| `~/.algo` (dotfiles) | Configuración de programas «clásicos» del usuario | Sólo a ti |

```bash
ls -a ~              # tus ficheros de configuración ocultos
ls ~/.config         # una carpeta por aplicación
ls /etc | head -30   # la del sistema
```

> **La regla de oro: lo del usuario gana.** Si un ajuste está en `/etc` y también en tu carpeta
> personal, manda el tuyo. Por eso puedes personalizar tu sesión sin ser administrador y sin
> molestar a nadie. Compruébalo al final del taller creando un usuario nuevo: entrará con el
> escritorio de fábrica.

> **Estándar XDG.** `~/.config` (configuración), `~/.local/share` (datos), `~/.cache` (temporales)
> son un estándar llamado XDG Base Directory, pensado para que tu carpeta personal no se llene de
> ficheros ocultos sueltos. Las aplicaciones modernas lo respetan; las antiguas (como `.bashrc`)
> siguen a la vieja usanza.

**Antes de empezar, aprende a buscar paquetes.** No todo está en los repositorios oficiales, así
que la primera pregunta siempre es «¿existe esto y cómo se llama?»:

```bash
pacman -Ss cowsay          # buscar en los repositorios oficiales
pacman -Si cowsay          # información de un paquete
paru -Ss asciiquarium      # buscar también en AUR
pacman -Qe                 # qué he instalado yo explícitamente
```

En Ubuntu:

```bash
apt search cowsay
apt show cowsay
```

## Nivel 1: el escritorio

Sobre la máquina virtual de **Arch con XFCE** de la [guía de instalación de Arch](../../2-intermedio/08-instalar-arch-uefi/1-explicacion.md). Si usas GNOME, los conceptos son
los mismos aunque las ventanas cambien.

### 1.1 Temas, iconos y fuentes

```bash
sudo pacman -S arc-gtk-theme papirus-icon-theme ttf-jetbrains-mono ttf-jetbrains-mono-nerd
```

Después, en **Configuración → Apariencia**:

- **Estilo:** Arc-Dark (o el que instales)
- **Iconos:** Papirus-Dark
- **Fuentes:** una fuente legible a 10-11 puntos

Y en **Configuración → Estilo del gestor de ventanas** eliges el marco de las ventanas, que se
configura aparte del resto.

> **Dónde ha ido a parar eso.** Nada de esto es magia: XFCE lo ha escrito en un fichero XML.
> Míralo:
>
> ```bash
> cat ~/.config/xfce4/xfconf/xfce-perchannel-xml/xsettings.xml
> ```
>
> Ése fichero es el que copiarás en el nivel 6 para llevarte tu escritorio a otra máquina.
> También puedes cambiarlo por comandos, sin tocar ninguna ventana:
>
> ```bash
> xfconf-query -c xsettings -p /Net/ThemeName -s "Arc-Dark"
> xfconf-query -c xsettings -p /Net/IconThemeName -s "Papirus-Dark"
> xfconf-query -c xsettings -l          # ver todas las propiedades disponibles
> ```

Buscar más temas:

```bash
paru -Ss gtk-theme
paru -Ss icon-theme
```

Y para instalar uno descargado a mano: los temas van en `~/.themes/` o `/usr/share/themes/`, y
los iconos en `~/.icons/` o `/usr/share/icons/`. Si lo pones en tu carpeta personal, sólo lo ves
tú; si lo pones en `/usr/share`, lo ven todos los usuarios. Es exactamente la regla del nivel 0.

### 1.2 Papel de pared

**Configuración → Escritorio → Fondo.** O por comandos:

```bash
xfconf-query -c xfce4-desktop -l | grep last-image
xfconf-query -c xfce4-desktop -p /backdrop/screen0/monitor0/workspace0/last-image \
  -s /home/alumno/imagenes/fondo.jpg
```

### 1.3 Atajos de teclado propios

Ésta es la parte que más productividad da y la que menos gente configura.

**Configuración → Teclado → Atajos de aplicación → Añadir.**

Propuestas que valen la pena:

| Atajo | Comando | Para qué |
|---|---|---|
| `Super` + `Intro` | `xfce4-terminal` | Abrir un terminal al instante |
| `Super` + `E` | `thunar` | Explorador de archivos |
| `Super` + `B` | `firefox` | Navegador |
| `Super` + `L` | `xflock4` | Bloquear la pantalla |
| `Impr Pant` | `xfce4-screenshooter` | Captura de pantalla |

> `Super` es la tecla de Windows. En VirtualBox puede estar capturada por el anfitrión; si un
> atajo no responde, prueba con `Ctrl` + `Alt` en su lugar, o cambia la tecla anfitrión de
> VirtualBox en **Archivo → Preferencias → Entrada**.

En **Configuración → Ventanas → Teclado** tienes además los atajos de gestión de ventanas
(maximizar, mover a otro escritorio, cambiar de área de trabajo). Configura al menos los de
cambio de área de trabajo: tener cuatro escritorios y saltar entre ellos con el teclado cambia
la forma de trabajar.

### 1.4 El panel

Clic derecho en el panel → **Panel → Preferencias**. Merece la pena añadir:

- **Monitor de CPU** y **Monitor de red** (se instalan con `xfce4-cpugraph-plugin` y
  `xfce4-netload-plugin`)
- **Reloj** con formato personalizado
- **Cajón de aplicaciones** con tus programas favoritos

```bash
sudo pacman -S xfce4-cpugraph-plugin xfce4-netload-plugin xfce4-whiskermenu-plugin
```

## Nivel 2: el terminal como panel de control

### 2.1 `fastfetch` a tu gusto

```bash
sudo pacman -S fastfetch
fastfetch --gen-config          # crea ~/.config/fastfetch/config.jsonc
nano ~/.config/fastfetch/config.jsonc
```

Una configuración compacta para empezar:

```jsonc
{
  "$schema": "https://github.com/fastfetch-cli/fastfetch/raw/dev/doc/json_schema.json",
  "logo": {
    "type": "small",
    "padding": { "top": 1, "right": 3 }
  },
  "display": {
    "separator": "  ",
    "color": { "keys": "blue", "title": "cyan" }
  },
  "modules": [
    "title",
    "separator",
    { "type": "os",       "key": "  Sistema " },
    { "type": "kernel",   "key": "  Núcleo  " },
    { "type": "uptime",   "key": "  Encendido" },
    { "type": "packages", "key": "  Paquetes" },
    { "type": "shell",    "key": "  Shell   " },
    { "type": "wm",       "key": "  Escritorio" },
    { "type": "terminal", "key": "  Terminal" },
    { "type": "cpu",      "key": "  CPU     " },
    { "type": "memory",   "key": "  RAM     " },
    { "type": "disk",     "key": "  Disco   " },
    "break",
    "colors"
  ]
}
```

Y con tu propio dibujo en lugar del logo de la distribución:

```bash
fastfetch --logo-type file --logo ~/.config/fastfetch/logo.txt
```

Puedes generar el dibujo con `figlet` (nivel 4) o dibujarlo tú en un fichero de texto.

### 2.2 `btop`

```bash
sudo pacman -S btop
btop
```

Dentro, pulsa `Esc` → **Options** para cambiar el tema, qué gráficas se ven y si aparece la red y
el disco. Se guarda en `~/.config/btop/btop.conf`.

> `btop` no es sólo bonito: es la herramienta con la que se hace el diagnóstico de
> «el equipo va lento». Aprender a leerlo es parte del temario, no del taller.

### 2.3 `conky`: información sobre el escritorio

`conky` dibuja información del sistema directamente sobre el fondo de pantalla.

```bash
sudo pacman -S conky
cp /etc/conky/conky.conf ~/.config/conky/conky.conf   # crea la carpeta si no existe
nano ~/.config/conky/conky.conf
```

Una configuración mínima y legible:

```lua
conky.config = {
    alignment = 'top_right',
    gap_x = 20,
    gap_y = 40,
    minimum_width = 250,
    own_window = true,
    own_window_type = 'desktop',
    own_window_transparent = true,
    double_buffer = true,
    update_interval = 2.0,
    use_xft = true,
    font = 'JetBrains Mono:size=10',
    default_color = 'white',
}

conky.text = [[
${color cyan}${time %A %d de %B}${color}
${color cyan}${time %H:%M:%S}${color}

${color cyan}SISTEMA${color}
Equipo    $nodename
Encendido $uptime
Núcleo    $kernel

${color cyan}CPU${color}  ${cpu}%
${cpubar 6}
${top name 1}  ${top cpu 1}%
${top name 2}  ${top cpu 2}%

${color cyan}RAM${color}  $mem / $memmax
${membar 6}

${color cyan}DISCO${color}  ${fs_used /} / ${fs_size /}
${fs_bar 6 /}
]]
```

Arráncalo:

```bash
conky &
```

Y para que arranque solo con la sesión: **Configuración → Sesión e inicio → Autoarranque de
aplicaciones → Añadir**, con el comando `conky`.

> **Lo que has aprendido aquí sin darte cuenta:** dónde se configuran los programas que arrancan
> con la sesión. Es lo mismo que la carpeta de Inicio de Windows y que `systemctl enable`, pero a
> nivel de sesión gráfica. Ya comparaste el arranque de Windows y Linux; esto es la
> tercera capa.

## Nivel 3: tu propio mensaje de bienvenida

### 3.1 El MOTD: lo que se ve al iniciar sesión en consola

`motd` es *message of the day*. Se muestra **después** de iniciar sesión en una consola de texto
o por SSH.

```bash
sudo nano /etc/motd
```

```
===========================================
  Equipo:  arch-smr
  Aula:    SMR 1.º — Sistemas Operativos
  Aviso:   máquina de prácticas. Haz snapshots.
===========================================
```

Sal a una consola virtual con `Ctrl` + `Alt` + `F2` e inicia sesión para verlo.

Un MOTD **dinámico**, que se genera cada vez:

```bash
sudo nano /etc/profile.d/bienvenida.sh
```

```bash
#!/bin/bash
# Se ejecuta al iniciar sesión, para TODOS los usuarios

echo
echo "  Hola, $(whoami). Son las $(date '+%H:%M') del $(date '+%d/%m/%Y')."
echo "  Equipo: $(hostname)  ·  Encendido desde hace $(uptime -p | sed 's/up //')"
echo "  Disco raíz: $(df -h / | awk 'NR==2 {print $3\" de \"$2\" (\"$5\")\"}')"
echo "  Usuarios conectados: $(who | wc -l)"
echo
```

```bash
sudo chmod +x /etc/profile.d/bienvenida.sh
```

Cierra sesión y vuelve a entrar.

> ⚠️ **Cuidado con lo que metes en `/etc/profile.d/`.** Se ejecuta para **todos** los usuarios en
> **cada** inicio de sesión. Si pones algo lento, todo el mundo espera. Si pones algo con un
> error, puedes dejar el inicio de sesión inutilizable. Es un sitio perfecto para entender por qué
> el principio de mínimo privilegio importa: lo que va en tu `~/.zshrc` sólo te afecta a ti; lo
> que va en `/etc` afecta a todos.

### 3.2 `/etc/issue`: lo que se ve **antes** de iniciar sesión

```bash
sudo nano /etc/issue
```

```
Arch Linux \r (\l)
Aula SMR — acceso restringido a alumnado autorizado
```

`\r` es la versión del núcleo y `\l` el terminal. Es donde las empresas ponen el aviso legal de
uso del equipo.

## Nivel 4: comandos que parecen tontería y no lo son

Cada uno de estos comandos enseña algo real. La gracia está en usarlos **encadenados**, porque
así es como se entiende la filosofía de las tuberías.

```bash
sudo pacman -S cowsay lolcat figlet fortune-mod cmatrix sl
```

*(Comprueba antes cuáles existen con `pacman -Ss nombre`. Los que no estén en los repositorios
oficiales suelen estar en AUR: `paru -Ss nombre`. En Ubuntu, `sudo apt install cowsay lolcat
figlet fortune-mod cmatrix sl`.)*

| Comando | Qué hace | **Qué enseña de verdad** |
|---|---|---|
| `cowsay` | Una vaca dice lo que le pases | Lee de la **entrada estándar**: es el ejemplo perfecto de tubería |
| `lolcat` | Colorea la salida en arcoíris | Es un **filtro**: no genera nada, sólo transforma lo que le llega |
| `figlet` | Texto en letras gigantes ASCII | Generador de salida para encadenar |
| `fortune` | Una cita al azar | Fuente de datos para una tubería |
| `cmatrix` | La lluvia de código de Matrix | Un proceso que ocupa el terminal: `Ctrl`+`C` para matarlo |
| `sl` | Un tren cruza la pantalla si escribes `sl` en vez de `ls` | Existe para castigar la errata. Y para hablar del `PATH` |

**La tubería obligatoria del taller:**

```bash
fortune | cowsay | lolcat
```

Léela de izquierda a derecha: `fortune` **genera** una frase, `cowsay` la **transforma** en un
dibujo, `lolcat` la **colorea**. Tres programas que no saben nada el uno del otro, encadenados
por la salida estándar. Eso es Unix.

Más combinaciones:

```bash
figlet "SMR 2027" | lolcat
date | cowsay -f tux
ls -l | lolcat
cowsay -l                       # ver todas las "vacas" disponibles
fortune | cowsay -f dragon | lolcat
whoami | figlet | lolcat
```

Y en tu `.zshrc`, al final, para que salga al abrir el terminal:

```zsh
fortune | cowsay -f tux | lolcat
```

Otros que suelen estar en AUR y merecen la pena:

```bash
paru -Ss pipes.sh          # tuberías de colores creciendo por la pantalla
paru -Ss asciiquarium      # un acuario en ASCII
paru -Ss tty-clock         # un reloj a pantalla completa
sudo pacman -S cava        # visualizador de audio en el terminal
sudo pacman -S bastet      # tetris en el terminal
sudo pacman -S nsnake      # el snake
```

> **Ejercicio real escondido en la broma.** Ejecuta `which sl` y `which ls`. Están los dos en
> `/usr/bin`. Ahora crea un script tuyo llamado `ls` en `~/bin`, dale permisos de ejecución, y
> comprueba con `which ls` cuál gana según el orden de tu `PATH`. Eso explica de una
> vez por qué el directorio actual **no** está en el `PATH` por defecto.

## Nivel 5: que se haga solo

Aquí se une la personalización con las tareas programadas y el scripting.

### 5.1 Fondo de pantalla que cambia solo

```bash
mkdir -p ~/imagenes/fondos ~/bin
nano ~/bin/cambiar-fondo.sh
```

```bash
#!/bin/bash
#===============================================================
# cambiar-fondo.sh — pone un fondo de pantalla al azar
# Uso: ./cambiar-fondo.sh   (o desde cron)
#===============================================================
set -euo pipefail

CARPETA="$HOME/imagenes/fondos"
LOG="$HOME/.local/share/cambiar-fondo.log"

if [ ! -d "$CARPETA" ]; then
    echo "No existe $CARPETA" >&2
    exit 1
fi

FONDO=$(find "$CARPETA" -type f \( -name "*.jpg" -o -name "*.png" \) | shuf -n 1)

if [ -z "$FONDO" ]; then
    echo "No hay imágenes en $CARPETA" >&2
    exit 1
fi

for PROP in $(xfconf-query -c xfce4-desktop -l | grep last-image); do
    xfconf-query -c xfce4-desktop -p "$PROP" -s "$FONDO"
done

echo "[$(date '+%F %T')] Fondo: $FONDO" >> "$LOG"
```

```bash
chmod +x ~/bin/cambiar-fondo.sh
~/bin/cambiar-fondo.sh
```

Y que se ejecute cada hora:

```bash
crontab -e
```

```
0 * * * * DISPLAY=:0 /home/alumno/bin/cambiar-fondo.sh
```

> ⚠️ **El `DISPLAY=:0` no es opcional.** `cron` se ejecuta sin sesión gráfica, así que no sabe a
> qué pantalla dirigirse y el comando falla en silencio. Es el mismo problema de las rutas
> absolutas en scripting: **cron no tiene tu entorno**. Comprueba siempre el log.

### 5.2 Aviso cuando el disco se llena

Une monitorización, condicionales y notificaciones:

```bash
nano ~/bin/aviso-disco.sh
```

```bash
#!/bin/bash
set -euo pipefail

UMBRAL=80
USO=$(df / --output=pcent | tail -n1 | tr -dc '0-9')

if [ "$USO" -ge "$UMBRAL" ]; then
    notify-send -u critical "Disco casi lleno" "La raíz está al ${USO}%"
    echo "[$(date '+%F %T')] AVISO: disco al ${USO}%" >> "$HOME/.local/share/disco.log"
fi
```

```bash
sudo pacman -S libnotify
chmod +x ~/bin/aviso-disco.sh
```

Pruébalo bajando el umbral a `1` para ver la notificación, y súbelo después.

## Nivel 6: hazlo reproducible

Éste es el nivel que separa un escritorio bonito de una configuración profesional. **El objetivo:
un solo comando deja una máquina recién instalada exactamente como la tuya.**

### 6.1 Reunir los dotfiles

```bash
mkdir -p ~/dotfiles/{config,scripts}

cp ~/.zshrc ~/.p10k.zsh ~/dotfiles/
cp -r ~/.config/fastfetch ~/dotfiles/config/
cp -r ~/.config/btop      ~/dotfiles/config/
cp -r ~/.config/conky     ~/dotfiles/config/
cp -r ~/.config/xfce4/xfconf ~/dotfiles/config/
cp ~/bin/*.sh ~/dotfiles/scripts/
```

### 6.2 La lista de paquetes

```bash
pacman -Qqe > ~/dotfiles/paquetes-oficiales.txt      # instalados explícitamente
pacman -Qqm > ~/dotfiles/paquetes-aur.txt            # los de AUR
wc -l ~/dotfiles/paquetes-*.txt
```

### 6.3 El script de instalación

```bash
nano ~/dotfiles/instalar.sh
```

```bash
#!/bin/bash
#===============================================================
# instalar.sh — deja una máquina nueva con mi configuración
# Uso: ./instalar.sh
#===============================================================
set -euo pipefail

DIR="$(cd "$(dirname "$0")" && pwd)"

echo "==> Instalando paquetes de los repositorios oficiales"
sudo pacman -S --needed --noconfirm - < "$DIR/paquetes-oficiales.txt"

echo "==> Copiando ficheros de configuración"
cp "$DIR/.zshrc" "$DIR/.p10k.zsh" "$HOME/"
mkdir -p "$HOME/.config"
cp -r "$DIR/config/"* "$HOME/.config/"

echo "==> Copiando scripts"
mkdir -p "$HOME/bin"
cp "$DIR/scripts/"*.sh "$HOME/bin/"
chmod +x "$HOME"/bin/*.sh

echo "==> Cambiando el shell a zsh"
chsh -s /bin/zsh

echo "==> Listo. Cierra sesión y vuelve a entrar."
```

```bash
chmod +x ~/dotfiles/instalar.sh
```

### 6.4 Guardarlo con Git

```bash
cd ~/dotfiles
git init
git add .
git commit -m "Mi configuración de escritorio y terminal"
```

### 6.5 **La prueba de fuego**

Restaura la instantánea `antes-del-taller`, copia la carpeta `dotfiles` a la máquina limpia y
ejecuta `./instalar.sh`. Si en diez minutos tienes tu escritorio de vuelta, el taller está
superado. Si no, el script te dirá exactamente qué te habías dejado sin documentar.

> **Esto es literalmente lo que hace un técnico** que tiene que preparar veinte puestos iguales:
> configurar uno, capturar la configuración y automatizar el resto. En el reto ETHAZI se pide
> desplegar varios puestos; llegar con esto hecho te ahorra media sesión.

## Cómo deshacerlo todo

Por si algo se tuerce, en orden de menos a más drástico:

```bash
# 1. Volver a la configuración de fábrica de XFCE (sólo tu usuario)
xfce4-panel --quit ; pkill xfconfd
rm -rf ~/.config/xfce4
xfce4-panel &

# 2. Recuperar una copia de seguridad concreta
cp ~/.zshrc.bak ~/.zshrc

# 3. Quitar el script de bienvenida del sistema
sudo rm /etc/profile.d/bienvenida.sh

# 4. Volver a Bash si zsh da problemas
chsh -s /bin/bash

# 5. Desinstalar lo que instalaste
sudo pacman -Rns cowsay lolcat figlet cmatrix

# 6. La opción nuclear: restaurar la instantánea 'antes-del-taller'
```

> Si el escritorio no arranca, **`Ctrl` + `Alt` + `F2`** te lleva a una consola de texto desde la
> que puedes ejecutar todo lo anterior. Es el mismo rescate de la instalación de Arch.

## Ampliación: gestores de ventanas en mosaico

Un **gestor de ventanas en mosaico** coloca las ventanas automáticamente sin solaparlas y se
maneja sólo con el teclado. Es lo que se ve en las capturas espectaculares de internet.

```bash
sudo pacman -S i3-wm i3status i3lock dmenu
```

Se elige en la pantalla de inicio de sesión, en el desplegable de sesión.

> **Aviso honesto, y va en serio.** Esto es un agujero de tiempo. Un i3 usable pide entre 5 y 15
> horas de configuración, y hasta que lo tengas irás **más lento** que con XFCE. Adelante si te
> engancha el tema, pero:
>
> - **No lo hagas en la máquina que usas para las prácticas evaluables.** Crea una MV nueva.
> - **No lo empieces la semana antes del reto.**
> - Y si lo haces, que sea con la configuración por defecto primero, usándola una semana entera
>   antes de tocar nada.
>
> La guía del curso anterior proponía el entorno **Yoru** (basado en AwesomeWM). Es precioso y
> tiene decenas de dependencias de AUR que se rompen en cada actualización. Si te tienta, hazlo
> sabiendo dónde te metes y con una instantánea reciente.

Alternativas más suaves si sólo quieres probar la idea: `xfce4-tiling` o los atajos de encaje de
ventanas del propio XFCE (`Super` + flechas), que ya vienen y no rompen nada.
