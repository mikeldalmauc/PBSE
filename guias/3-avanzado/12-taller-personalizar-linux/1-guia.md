---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 3 · Avanzado
tema: "12"
tipo: Guía
caracter: TALLER — parte obligatoria (niveles 0 a 3) y parte de ampliación (niveles 4 a 6)
competencias: CM4
herramientas: H4 (terminal Linux)
duracion: 2 sesiones + trabajo autónomo
---

# Taller: personaliza tu Linux

> **Antes de empezar.** Necesitas tu Arch con escritorio XFCE (instantánea `03-escritorio` de la
> [guía de Arch](../../2-intermedio/08-instalar-arch-uefi/1-guia.md)) y el terminal zsh de la
> [guía 11](../11-terminal-zsh-p10k/1-explicacion.md). Esta guía se ocupa de todo lo demás.

Vas a dejar tu Linux a tu gusto: colores, fondo, atajos, datos del sistema en pantalla, un mensaje
de bienvenida y tareas que se hacen solas. Pero el truco no está en lo bonito: está en saber **en
qué fichero vive cada ajuste**. Al final montarás tu escritorio en una máquina nueva con un solo
comando, en diez minutos. Eso es lo que hace un técnico con veinte puestos.

> **Analogía.** Tu Linux es **tu habitación en un piso compartido**. Las normas del piso están en el
> tablón de la entrada (`/etc`) y sólo las cambia el casero (root). Lo que hay dentro de tu
> habitación (tu carpeta personal `~`) lo decides tú y no molesta a nadie. Al final del taller
> harás **la mudanza**: meter tu habitación en una caja y montarla igual en otro piso.

| | |
|---|---|
| 🎯 **Qué vas a conseguir** | Un escritorio y un terminal a tu medida, documentados y reconstruibles en 10 minutos |
| 🧰 **Qué necesitas** | Tu Arch con XFCE y zsh configurado |
| ⏱️ **Tiempo** | 2 sesiones de taller + trabajo autónomo |
| 📦 **Qué entregas** | «Entorno de trabajo documentado» y el concurso de escritorios ([Parte 4](#parte-4--entrega)) |

**Tu misión, paso a paso:**

- [ ] Saber en qué carpeta vive cada ajuste.
- [ ] Cambiar tema, iconos, fondo, atajos y panel de XFCE.
- [ ] Poner datos del sistema en el terminal (`fastfetch`, `btop`) y sobre el fondo (`conky`).
- [ ] Escribir tu propio mensaje de bienvenida.
- [ ] *(Ampliación)* Encadenar comandos, programar tareas con `cron` y hacer la mudanza.
- [ ] Presentar tu escritorio en el concurso.

## Índice

- [Parte 1 · Aprende](#parte-1--aprende)
  - [Nivel 0 · Dónde vive la configuración](#nivel-0--dónde-vive-la-configuración)
  - [Nivel 1 · El escritorio](#nivel-1--el-escritorio)
  - [Nivel 2 · El terminal como panel de control](#nivel-2--el-terminal-como-panel-de-control)
  - [Nivel 3 · Tu mensaje de bienvenida](#nivel-3--tu-mensaje-de-bienvenida)
  - [Nivel 4 · Comandos de broma que enseñan tuberías](#nivel-4--comandos-de-broma-que-enseñan-tuberías)
  - [Nivel 5 · Que se haga solo](#nivel-5--que-se-haga-solo)
  - [Nivel 6 · Hazlo reproducible: la mudanza](#nivel-6--hazlo-reproducible-la-mudanza)
  - [Cómo deshacerlo todo](#cómo-deshacerlo-todo)
  - [Para saber más](#para-saber-más)
- [Parte 2 · Lo que te llevas](#parte-2--lo-que-te-llevas)
- [Parte 3 · Practica: el concurso de escritorios](#parte-3--practica-el-concurso-de-escritorios)
- [Parte 4 · Entrega](#parte-4--entrega)

---

## Parte 1 · Aprende

![Mapa del taller: los niveles 0 a 3 son obligatorios y valen hasta 7 puntos; los niveles 4 a 6 son de ampliación y valen hasta 3; al final, el concurso de escritorios](images/niveles-taller.svg)

Siete niveles y un concurso. Los niveles 0 a 3 son obligatorios; los 4 a 6, de ampliación. Antes
de empezar, cuatro reglas:

1. **Instantánea.** Apaga la MV y crea la instantánea `antes-del-taller`. Así experimentas sin miedo.
2. **Copia antes de tocar.** Antes de cambiar un fichero de configuración, `cp fichero{,.bak}`
   (es un atajo: copia `fichero` como `fichero.bak`).
3. **Explica cada línea.** Si no sabes qué hace una línea que has puesto, quítala.
4. **Reconstruible en 10 minutos.** El nivel 6 es justo eso.

> [!IMPORTANT]
> El taller está escrito para **XFCE**, el escritorio de la guía de Arch: `echo $XDG_CURRENT_DESKTOP`
> tiene que responder `XFCE`. Si tienes otro, lee el cuadro «Si tu escritorio no es XFCE» del nivel 1.

### Nivel 0 · Dónde vive la configuración

En Linux **la configuración son ficheros de texto**. Sólo hay dos sitios donde buscarlos:

![La configuración del sistema está en /etc y afecta a todos; la del usuario está en su carpeta personal, en .config, .local/share, .cache y los ficheros ocultos que empiezan por punto; si un ajuste está en los dos sitios, gana el del usuario](images/donde-vive-config.svg)

- **`/etc/`**: la configuración del **sistema**. Afecta a todos los usuarios y sólo la cambia root.
  Es el tablón del piso.
- **Tu carpeta personal `~`**: tu configuración, que sólo te afecta a ti. Es tu habitación.
  Dentro, `~/.config/` tiene una carpeta por programa (`xfce4`, `btop`…), y los **dotfiles** son
  ficheros ocultos que empiezan por punto, como `.zshrc`.

> [!IMPORTANT]
> **Lo tuyo gana.** Si un ajuste está en `/etc` y también en tu carpeta, manda el tuyo. Por eso
> puedes personalizar tu sesión sin ser administrador y sin molestar a nadie.

> [!TIP]
> **🧪 Pruébalo.**
>
> ```bash
> ls -a ~               # tus dotfiles: todo lo que empieza por punto
> ls ~/.config          # una carpeta por programa
> ```
>
> 👀 Verás `.zshrc` y `.p10k.zsh` de la guía anterior, y dentro de `.config` una carpeta `xfce4`.
> Ahí vive tu escritorio.

**🧠 ¿Lo has pillado?** Cambias el tema de tu escritorio. ¿Lo verá tu compañero si entra con su
usuario en la misma máquina? ¿Y dónde pondrías un ajuste que deben tener **todos**?

<details>
<summary>Ver respuesta</summary>

**No**: se ha guardado en tu `~/.config`, que sólo te afecta a ti. Lo de todos va en `/etc`, con
`sudo`.

</details>

**📌 En una frase:** lo del sistema vive en `/etc` y lo tuyo en tu carpeta personal; si están en
los dos sitios, gana lo tuyo.

### Nivel 1 · El escritorio

Los pósters y la lámpara de tu habitación: tema, iconos, fondo, atajos y panel. Primero con el
ratón; después verás dónde lo ha guardado XFCE.

**Tema, iconos, fuente y fondo.** Instala unos bonitos y elígelos en **Configuración → Apariencia**
(estilo `Arc-Dark`, iconos `Papirus-Dark`, fuente a 10 u 11 puntos). El marco de las ventanas se
elige aparte, en **Gestor de ventanas**, y el fondo en **Escritorio → Fondo**.

```bash
sudo pacman -S arc-gtk-theme papirus-icon-theme ttf-jetbrains-mono
```

**Atajos de teclado.** Es lo que más tiempo ahorra y lo que menos gente configura.
**Configuración → Teclado → Atajos de aplicación → Añadir**, uno a uno:

```text
Super + Intro   → xfce4-terminal        # abrir un terminal
Super + E       → thunar                # explorador de archivos
Super + B       → firefox               # navegador
Super + L       → xflock4               # bloquear la pantalla
Impr Pant       → xfce4-screenshooter   # captura de pantalla
```

`Super` es la tecla de Windows. En VirtualBox puede estar capturada por el anfitrión: si un atajo
no responde, usa `Ctrl` + `Alt` en su lugar.

**Panel.** Instala `xfce4-cpugraph-plugin`, `xfce4-netload-plugin` y `xfce4-whiskermenu-plugin`.
Después, clic derecho en el panel → **Panel → Preferencias → Elementos**: añade el monitor de CPU,
el de red y el menú Whisker (un menú de aplicaciones con buscador).

**¿Dónde ha ido a parar todo eso?** No es magia: XFCE lo ha escrito en ficheros de texto dentro
de `~/.config/xfce4/`. Y lo que haces con el ratón también se puede hacer con un comando:

```bash
cat ~/.config/xfce4/xfconf/xfce-perchannel-xml/xsettings.xml   # ahí está tu tema
xfconf-query -c xsettings -p /Net/ThemeName -s "Arc-Dark"      # cambiar el tema por comando
xfconf-query -c xfce4-desktop -l | grep last-image             # la propiedad del fondo
```

> [!NOTE]
> **Si tu escritorio no es XFCE.** Cambian los menús, pero todo se guarda igual en tu carpeta
> personal. KDE Plasma usa ficheros `~/.config/*rc` y comandos como `plasma-apply-colorscheme BreezeDark`
> o `plasma-apply-wallpaperimage ~/imagenes/fondo.jpg`. GNOME, Cinnamon y MATE usan una base de
> datos que se cambia con `gsettings set org.gnome.desktop.interface icon-theme 'Papirus-Dark'`
> y se exporta entera con `dconf dump / > ajustes.ini`. Los paquetes de temas son los mismos.

> [!TIP]
> **🧪 Pruébalo.** Abre **Configuración → Apariencia** y un terminal al lado. Cambia el tema con
> el ratón y ejecuta `grep ThemeName ~/.config/xfce4/xfconf/xfce-perchannel-xml/xsettings.xml`.
> 👀 El fichero ya tiene el nombre del tema nuevo. Ahora crea un usuario con `sudo useradd -m prueba`
> y `sudo passwd prueba`, cierra sesión y entra con él. 👀 Escritorio de fábrica: tu tema está en
> `/home/alumno`, no en `/home/prueba`. Es el punto 6 de la entrega: guarda las capturas.

**📌 En una frase:** todo lo que cambias con el ratón en XFCE acaba en un fichero de texto en
`~/.config/xfce4/`, y también se puede cambiar con `xfconf-query`.

### Nivel 2 · El terminal como panel de control

Tres programas que enseñan datos del sistema: dos en el terminal y uno sobre el fondo de pantalla.

**`fastfetch`**: la tarjeta de presentación de tu equipo. Instálalo (`sudo pacman -S fastfetch`),
genera su configuración con `fastfetch --gen-config` y en `~/.config/fastfetch/config.jsonc` deja
sólo lo que te interese. Lo mínimo que funciona:

```jsonc
{
  "logo": { "type": "small" },
  "modules": [
    "title", "separator",
    { "type": "os",     "key": "Sistema" },
    { "type": "kernel", "key": "Núcleo" },
    { "type": "uptime", "key": "Encendido" },
    { "type": "memory", "key": "RAM" },
    "colors"
  ]
}
```

**`btop`**: el monitor de procesos bonito (`sudo pacman -S btop`). Dentro, `Esc` → **Options**
elige tema y gráficas; lo guarda en `~/.config/btop/btop.conf`. Es con lo que se diagnostica «el
equipo va lento» ([guía de procesos](../../1-basico/03-procesos/1-guia.md)).

**`conky`**: datos del sistema dibujados sobre el fondo de pantalla (en KDE y GNOME no funciona:
usan sus propios elementos gráficos). Instálalo (`sudo pacman -S conky`), crea la carpeta
`~/.config/conky` y escribe dentro este `conky.conf`:

```lua
conky.config = {
    alignment = 'top_right', gap_x = 20, gap_y = 40,
    own_window = true, own_window_type = 'desktop', own_window_transparent = true,
    double_buffer = true, update_interval = 2.0,
    use_xft = true, font = 'JetBrains Mono:size=10', default_color = 'white',
}
conky.text = [[
${time %H:%M}   $nodename   encendido $uptime
CPU   ${cpu}%  ${cpubar 6}
RAM   $mem / $memmax
DISCO ${fs_used /} / ${fs_size /}
]]
```

Arráncalo con `conky &`. Para que arranque solo con la sesión: **Configuración → Sesión e inicio
→ Autoarranque de aplicaciones → Añadir**, con el comando `conky`. XFCE lo guarda como un fichero
en `~/.config/autostart/`: es la carpeta de Inicio de Windows, pero sólo de tu usuario.

> [!TIP]
> **🧪 Pruébalo.** Ejecuta `fastfetch`: 👀 tu tarjeta, con sólo las filas que has dejado. Mira
> `ls ~/.config/autostart`: 👀 el fichero `.desktop` que XFCE ha creado para conky. Cierra sesión
> y vuelve a entrar: 👀 `conky` aparece solo sobre el fondo.

**📌 En una frase:** `fastfetch` y `btop` enseñan el sistema en el terminal, `conky` sobre el
fondo, y los tres guardan sus ajustes en `~/.config/`.

### Nivel 3 · Tu mensaje de bienvenida

El cartel de la puerta de tu habitación. Hay dos: uno se ve **antes** de entrar y otro
**después**. Los dos viven en `/etc`, así que los ven todos los usuarios y hace falta `sudo`.

**`/etc/issue`**: se ve **antes** de iniciar sesión, encima de `login:`. Es donde las empresas
ponen el aviso legal. `\r` es la versión del núcleo y `\l` la consola. Edítalo con `sudo nano`:

```text
Arch Linux \r (\l)
Aula SMR: acceso sólo para alumnado autorizado
```

**`/etc/motd`**: el **MOTD** (*message of the day*) se ve **después** de iniciar sesión en una
consola de texto. Escribe lo que quieras:

```text
  Equipo: arch-smr · Aula SMR 1.º
  Máquina de prácticas: haz instantáneas
```

**Un mensaje que cambia solo.** Un **script** es un fichero de texto con comandos, uno por línea,
que se ejecutan en orden. Los de `/etc/profile.d/` se ejecutan al iniciar sesión, para todos los
usuarios. Crea `/etc/profile.d/bienvenida.sh` con `sudo nano`:

```bash
# Se ejecuta al iniciar sesión en consola, para TODOS los usuarios.
# Lo que va entre $( … ) es un comando: su salida se mete en la frase.
echo "  Hola, $(whoami). Son las $(date '+%H:%M')."
echo "  Equipo: $(hostname) · encendido desde hace $(uptime -p | sed 's/up //')"
echo "  Usuarios conectados: $(who | wc -l)"
```

> [!CAUTION]
> **Lo que metes en `/etc/profile.d/` lo ejecutan todos los usuarios en cada inicio de sesión.**
> Si pones algo lento, todos esperan. Si pones algo con un error, puedes romper el inicio de
> sesión. Lo que va en tu `~/.zshrc` sólo te afecta a ti.

> [!TIP]
> **🧪 Pruébalo.** Pulsa `Ctrl` + `Alt` + `F2` para ir a una consola de texto. 👀 Encima de
> `login:` está tu `/etc/issue`. Entra con tu usuario. 👀 Sale el MOTD y, debajo, el saludo con la
> hora. Vuelve al escritorio con `Ctrl` + `Alt` + `F1` (o `F7`). Haz una captura: es el punto 5
> de la entrega.

**🧠 ¿Lo has pillado?** ¿Qué diferencia hay entre `/etc/issue` y `/etc/motd`?

<details>
<summary>Ver respuesta</summary>

`/etc/issue` se ve **antes** de iniciar sesión (en la pantalla de `login:`); `/etc/motd`,
**después**.

</details>

**📌 En una frase:** `/etc/issue` se ve antes de entrar, `/etc/motd` después, y un script en
`/etc/profile.d/` saluda con datos que cambian.

### Nivel 4 · Comandos de broma que enseñan tuberías

Una vaca que habla, letras gigantes y colores arcoíris. Parece una tontería, pero sirve para
entender la idea más importante del terminal: la **tubería** (`|`), que pasa la salida de un
programa a la entrada del siguiente.

```bash
sudo pacman -S cowsay lolcat figlet fortune-mod cmatrix sl
fortune | cowsay | lolcat
```

![Una tubería de tres programas: fortune genera una frase al azar, cowsay la mete en un dibujo y lolcat la colorea en arcoíris; cada barra vertical pasa la salida de uno a la entrada del siguiente](images/tuberia-unix.svg)

Léela de izquierda a derecha: `fortune` **genera** una frase, `cowsay` la **transforma** en un
dibujo y `lolcat` la **colorea**. Ninguno sabe que los otros existen. Eso es Unix.

```bash
whoami | figlet | lolcat        # tu nombre, gigante y en arcoíris
date | cowsay -f tux            # el pingüino dice la fecha (cowsay -l lista los dibujos)
sl                              # un tren, por escribir sl en vez de ls (Ctrl + C lo para)
```

Para que salga al abrir el terminal, añade `fortune | cowsay -f tux | lolcat` al final de tu
`~/.zshrc`. Otros que gustan, en AUR: `asciiquarium`, `pipes.sh`, `tty-clock` y `cava` (`paru -Ss`).

> [!TIP]
> **🧪 Pruébalo.** Inventa una tubería de **tres** comandos que no esté en esta guía, por ejemplo
> con `ls`, `date`, `uptime` o `fortune` al principio. 👀 Si sale algo en pantalla, funciona.
> Apunta qué hace cada eslabón: es el punto 7 de la entrega.

**📌 En una frase:** la tubería `|` encadena programas: uno genera, otro transforma, otro colorea.

### Nivel 5 · Que se haga solo

El despertador de tu habitación: algo que pasa a una hora fija sin que tú hagas nada. En Linux
ese despertador es **cron**, un programa que ejecuta órdenes a la hora que le digas. **En Arch no
viene instalado**:

```bash
sudo pacman -S cronie
sudo systemctl enable --now cronie
```

![Cómo se lee una línea de cron: minuto, hora, día del mes, mes y día de la semana, seguidos de la orden con ruta absoluta; el asterisco significa «cualquiera»; ejemplos: cada hora en punto, cada media hora, a las 8 de lunes a viernes y al arrancar](images/cron-campos.svg)

**Fondo de pantalla que cambia solo.** Pon varias imágenes en `~/imagenes/fondos/` y crea el
script `~/bin/cambiar-fondo.sh` (antes, `mkdir -p ~/imagenes/fondos ~/bin`):

```bash
#!/bin/bash
# cambiar-fondo.sh — pone un fondo de pantalla al azar (XFCE)
FONDO=$(find ~/imagenes/fondos -type f | shuf -n 1)
for PROP in $(xfconf-query -c xfce4-desktop -l | grep last-image); do
    xfconf-query -c xfce4-desktop -p "$PROP" -s "$FONDO"
done
echo "[$(date '+%F %T')] Fondo: $FONDO" >> ~/fondo.log
```

Dale permiso con `chmod +x ~/bin/cambiar-fondo.sh` y lánzalo: 👀 el fondo cambia y aparece una
línea en `~/fondo.log`. En otro escritorio cambia sólo las tres líneas del `for` por su comando:
en GNOME, `gsettings set org.gnome.desktop.background picture-uri "file://$FONDO"`; en KDE,
`plasma-apply-wallpaperimage "$FONDO"`.

Ahora, que cron lo ejecute cada hora. `EDITOR=nano crontab -e` abre tu lista de tareas en nano.
Añade esta línea:

```text
0 * * * * DISPLAY=:0 DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/1000/bus /home/alumno/bin/cambiar-fondo.sh
```

> [!WARNING]
> **`DISPLAY` y `DBUS_SESSION_BUS_ADDRESS` no son opcionales.** Son dos **variables de entorno**:
> datos que un programa lee al arrancar. `cron` se ejecuta fuera de tu sesión gráfica: sin ellas
> no sabe cuál es tu pantalla ni cómo hablar con tu escritorio, y el comando falla en silencio. El
> `1000` es tu número de usuario: compruébalo con `id -u`. Si algo no va, mira el log.

> [!TIP]
> **🧪 Pruébalo.** Cambia la línea de cron a `* * * * *` (cada minuto), espera dos minutos y mira
> `cat ~/fondo.log`. 👀 Dos líneas con horas distintas: cron lo ha hecho solo. Vuelve a poner
> `0 * * * *`. Ese log con dos ejecuciones es el punto 8 de la entrega.

**📌 En una frase:** `cron` ejecuta un script a una hora fija, y desde cron hay que decirle cuál
es tu pantalla con `DISPLAY` y `DBUS_SESSION_BUS_ADDRESS`.

### Nivel 6 · Hazlo reproducible: la mudanza

Lo que separa un escritorio bonito de una configuración profesional: **un solo comando deja una
máquina recién instalada igual que la tuya**. Es la mudanza: tu habitación en una caja, con la
lista de muebles y las instrucciones de montaje.

![La mudanza: copias tu configuración a la carpeta dotfiles, con config, scripts, la lista de paquetes, instalar.sh y README; la llevas con git o un pincho a una máquina limpia y ./instalar.sh la deja igual que la tuya en menos de 10 minutos](images/dotfiles-flujo.svg)

**1. La caja: reúne tus dotfiles.**

```bash
mkdir -p ~/dotfiles/config ~/dotfiles/scripts
cp ~/.zshrc ~/.p10k.zsh ~/dotfiles/
cp -r ~/.config/fastfetch ~/.config/btop ~/.config/conky ~/dotfiles/config/
cp -r ~/.config/xfce4 ~/dotfiles/config/        # todo XFCE: tema, panel, atajos…
cp ~/bin/*.sh ~/dotfiles/scripts/
```

**2. La lista de muebles.** `pacman -Qqen > ~/dotfiles/paquetes.txt` guarda los paquetes de los
repositorios oficiales que instalaste tú. Los de AUR (los de `paru`) van aparte:
`pacman -Qqem > ~/dotfiles/paquetes-aur.txt`, y los instalas a mano en la máquina nueva.

**3. Las instrucciones de montaje.** Crea `~/dotfiles/instalar.sh` y dale permiso con `chmod +x`:

```bash
#!/bin/bash
# instalar.sh — ejecútalo DENTRO de la carpeta dotfiles: cd ~/dotfiles && ./instalar.sh
set -e                                      # si algo falla, para aquí
sudo pacman -S --needed --noconfirm - < paquetes.txt
mkdir -p ~/.config ~/bin
cp .zshrc .p10k.zsh ~/
cp -r config/* ~/.config/
cp scripts/*.sh ~/bin/ && chmod +x ~/bin/*.sh
chsh -s /bin/zsh
echo "Listo. Inicia sesión en el escritorio."
```

**4. La etiqueta de la caja: `README.md`.** Qué hay dentro, cómo se instala y cómo se deshace.
Después guárdala con `git` (`cd ~/dotfiles && git init && git add . && git commit -m "Mi escritorio"`)
o cópiala a una carpeta compartida de VirtualBox.

> [!WARNING]
> **La prueba de fuego borra la máquina.** Saca antes la carpeta `dotfiles` de la MV: si sólo
> está dentro, la pierdes. Y lanza `instalar.sh` **sin la sesión gráfica abierta**: si XFCE está
> en marcha, al cerrar sesión guarda su configuración vieja encima de la que acabas de copiar.

**🧪 Pruébalo: la prueba de fuego.**

1. Saca `~/dotfiles` de la MV (repositorio remoto o carpeta compartida).
2. Restaura la instantánea `antes-del-taller`.
3. Ve a una consola de texto (`Ctrl` + `Alt` + `F2`), recupera la carpeta y lanza
   `cd ~/dotfiles && ./instalar.sh`. Cronométralo.

👀 Si en diez minutos tienes tu escritorio de vuelta, el taller está superado. Si no, el script
te dice qué te habías dejado sin copiar. Ese vídeo o esas capturas son el punto 9 de la entrega.

**📌 En una frase:** la mudanza es una carpeta `dotfiles` con tu configuración, la lista de
paquetes y un `instalar.sh` que lo monta todo en una máquina limpia.

### Cómo deshacerlo todo

Dejar la habitación como estaba, de menos a más drástico (desde `Ctrl` + `Alt` + `F2` si el
escritorio no responde):

```bash
mv ~/.config/xfce4 ~/.config/xfce4.roto   # 1. XFCE de fábrica para tu usuario (con la sesión cerrada)
cp ~/.zshrc.bak ~/.zshrc                  # 2. recuperar una copia .bak
sudo rm /etc/profile.d/bienvenida.sh      # 3. quitar el saludo del sistema
chsh -s /bin/bash                         # 4. volver a Bash si zsh da problemas
sudo pacman -Rns cowsay lolcat figlet     # 5. desinstalar lo que instalaste
# 6. La opción nuclear: restaurar la instantánea antes-del-taller
```

En el paso 1 renombras en vez de borrar: si no era eso, lo recuperas con un `mv` al revés.

### Para saber más

- **i3, un gestor de ventanas en mosaico.** Coloca las ventanas solas, sin solaparse, y se maneja
  con el teclado. Cómo instalarlo: [guía de Arch, paso 16](../../2-intermedio/08-instalar-arch-uefi/1-guia.md#16-entorno-gráfico-elige-el-tuyo).
  Aviso en serio: un i3 usable pide de 5 a 15 horas. Hazlo en una MV nueva, nunca en la de las
  prácticas ni la semana antes del reto.
- **La trampa del `sl`.** Si creas un script tuyo llamado `ls` en `~/bin`, ¿gana el tuyo o el de
  `/usr/bin`? Depende del orden de tu `PATH` (`echo $PATH`). Por eso la carpeta actual no está en
  el `PATH`: alguien podría dejarte un `ls` trampa.

---

## Parte 2 · Lo que te llevas

**🎒 Si sólo te quedas con nueve cosas:**

1. En Linux **la configuración son ficheros de texto**.
2. Lo del **sistema** vive en `/etc` y afecta a todos; lo **tuyo** vive en tu carpeta personal
   (`~/.config/` y los **dotfiles** `.zshrc`, `.p10k.zsh`…) y sólo te afecta a ti.
3. Si un ajuste está en los dos sitios, **gana el tuyo**.
4. Todo lo que cambias con el ratón en XFCE acaba en `~/.config/xfce4/`; `xfconf-query` lo cambia
   por comando.
5. `fastfetch`, `btop` y `conky` enseñan el sistema; sus ajustes están en `~/.config/`.
6. `/etc/issue` se ve **antes** de iniciar sesión; el **MOTD** (`/etc/motd`), **después**. Un
   **script** en `/etc/profile.d/` saluda a todos los usuarios con datos que cambian.
7. La **tubería** `|` pasa la salida de un programa a la entrada del siguiente:
   `fortune | cowsay | lolcat`.
8. **cron** ejecuta órdenes a una hora fija (en Arch se instala `cronie`). Desde cron hay que
   poner las **variables de entorno** `DISPLAY` y `DBUS_SESSION_BUS_ADDRESS`: cron no tiene tu entorno.
9. La mudanza: carpeta `dotfiles` + lista de paquetes + `instalar.sh` + README, y la prueba de
   fuego en una máquina limpia.

**Chuleta: dónde vive cada cosa**

| Qué | Dónde | Para quién |
|---|---|---|
| Ajustes de un programa | `~/.config/<programa>/` | Sólo tú |
| Escritorio XFCE | `~/.config/xfce4/` | Sólo tú |
| Programas al iniciar sesión | `~/.config/autostart/` | Sólo tú |
| Tareas programadas | `crontab -e` | Sólo tú |
| Mensaje antes de entrar | `/etc/issue` | Todos |
| Mensaje después de entrar | `/etc/motd`, `/etc/profile.d/*.sh` | Todos |

```bash
# min hora día mes díasem  orden (desde cron, siempre con DISPLAY y DBUS_SESSION_BUS_ADDRESS)
0     *    *   *   *       DISPLAY=:0 DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/1000/bus /home/alumno/bin/cambiar-fondo.sh
```

---

## Parte 3 · Practica: el concurso de escritorios

Última sesión del taller: enseñas tu habitación. Cada alumno o pareja presenta su escritorio en
**3 minutos**: 30 s de escritorio, 1 min para los dos ajustes de los que estés más orgulloso (con
el fichero abierto), 1 min para lanzar `instalar.sh` y 30 s de preguntas. Ensáyalo. **No gana el
más bonito.** Puntúa el resto de la clase, con esta rúbrica:

| Criterio | Peso | Qué se mira |
|---|---|---|
| 🗣️ **Lo sabe explicar** | 35 % | Se le pregunta por dos ajustes al azar y explica qué fichero cambió y por qué |
| 🔁 **Es reproducible** | 30 % | El script del nivel 6 funciona en una máquina limpia delante de todos |
| 🛠️ **Es útil** | 20 % | Los atajos y la información en pantalla resuelven algo real, no son decoración |
| 📄 **Está documentado** | 10 % | El README explica cómo instalarlo y cómo deshacerlo |
| ✨ **Impresiona** | 5 % | Sí, cuenta. Pero sólo esto |

> [!NOTE]
> Que lo bonito valga un 5 % es a propósito. Un escritorio espectacular copiado de un vídeo, que
> se rompe en la primera actualización y que su dueño no sabe explicar, es justo lo que **no**
> queremos.

---

## Parte 4 · Entrega

**Tarea Moodle: «Taller de personalización — entorno de trabajo documentado»**
Calificación de 0 a 10 · Se aprueba con 5.

**Parte obligatoria (niveles 0 a 3) — hasta 7 puntos**

1. Capturas del escritorio **antes y después**.
2. **Tabla de cambios**: para cada ajuste, qué has cambiado, **en qué fichero o comando** y por
   qué. Sin la columna del fichero no puntúa: el taller va de saber dónde vive cada cosa.
3. Los **cinco atajos** de teclado que has configurado y en qué situación usas cada uno.
4. Tu configuración de `fastfetch` y una captura de la salida.
5. Tu **script de bienvenida** y una captura del inicio de sesión en consola.
6. **Comprobación de aislamiento**: crea un usuario nuevo, entra con él y demuestra con capturas
   que su escritorio está de fábrica. Explica por qué.

**Parte de ampliación (niveles 4 a 6) — hasta 3 puntos**

7. Una **tubería propia** de al menos tres comandos encadenados, explicando qué hace cada eslabón.
8. Un **script del nivel 5** funcionando, programado con `cron`, con el log que demuestre que se
   ha ejecutado solo al menos dos veces.
9. **La prueba de fuego del nivel 6**: vídeo o capturas de la restauración completa en una
   máquina limpia a partir de tu carpeta `dotfiles`, con el tiempo que has tardado.

Se corrige con una lista de cotejo (que cada ajuste existe y sigue ahí tras cerrar sesión) y con
la rúbrica de coevaluación del concurso.

**✅ Antes de entregar, comprueba:**

- [ ] Cada fila de la tabla de cambios tiene su **fichero o comando**.
- [ ] Explicas por qué el usuario nuevo ve el escritorio de fábrica.
- [ ] El log de `cron` tiene al menos dos ejecuciones con horas distintas.
- [ ] Tu carpeta `dotfiles` tiene `README.md` e `instalar.sh`.
- [ ] Sabes explicar cualquier línea de tu configuración: te lo preguntarán en el concurso.

*Instrumento de evaluación: lista de cotejo de la configuración y de su persistencia + rúbrica de
coevaluación del concurso de escritorios.*
