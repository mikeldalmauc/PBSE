---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 3 · Avanzado
tema: "12"
tipo: Chuleta
caracter: TALLER — parte obligatoria (niveles 1 a 3) y parte de ampliación (niveles 4 a 6)
competencias: CM4
herramientas: H4 (terminal Linux)
duracion: 2 sesiones + trabajo autónomo
---

# Chuleta · Taller: personaliza tu Linux

> **Nota.** Esta página acompaña a la [explicación del tema](1-explicacion.md). Tenla a mano mientras trabajas.

## Índice

- [Chuleta · Taller: personaliza tu Linux](#chuleta--taller-personaliza-tu-linux)
  - [Índice](#índice)
  - [Dónde vive cada cosa](#dónde-vive-cada-cosa)
  - [Herramientas del taller](#herramientas-del-taller)
  - [Cron en una línea](#cron-en-una-línea)
  - [Hacerlo reproducible](#hacerlo-reproducible)
  - [Deshacer](#deshacer)

---

## Dónde vive cada cosa

| Qué | Dónde | Para quién |
|---|---|---|
| Configuración de programas | `~/.config/<programa>/` | Sólo tu usuario |
| Escritorio XFCE | `~/.config/xfce4/xfconf/` | Sólo tu usuario |
| Programas al iniciar sesión | `~/.config/autostart/` | Sólo tu usuario |
| Configuración por defecto | `/etc/` | Todo el sistema |
| Mensaje tras iniciar sesión | `/etc/motd`, `/etc/profile.d/*.sh` | Todos los usuarios |
| Mensaje antes de iniciar sesión | `/etc/issue` | La consola |

> **La regla de oro.** Lo del usuario gana a lo del sistema. Si algo no cambia, busca primero
> en `~/.config/`.

## Herramientas del taller

```bash
fastfetch --gen-config            # ~/.config/fastfetch/config.jsonc
btop                              # monitor de recursos (Esc → Options)
conky &                           # información sobre el escritorio
crontab -e                        # tareas programadas del usuario
xfconf-query -c xfce4-desktop -l  # propiedades del escritorio XFCE
```

## Cron en una línea

```text
┌ minuto (0-59)
│ ┌ hora (0-23)
│ │ ┌ día del mes (1-31)
│ │ │ ┌ mes (1-12)
│ │ │ │ ┌ día de la semana (0-7, 0 y 7 = domingo)
│ │ │ │ │
*/30 * * * *  DISPLAY=:0 $HOME/bin/cambiar-fondo.sh >> $HOME/fondo.log 2>&1
```

> ⚠️ **Cron no tiene tu entorno.** Rutas absolutas siempre y, si toca la pantalla, `DISPLAY=:0`.

## Hacerlo reproducible

```bash
mkdir -p ~/dotfiles/{config,scripts}
cp -r ~/.config/{fastfetch,btop,conky} ~/dotfiles/config/
pacman -Qqe > ~/dotfiles/paquetes-oficiales.txt
pacman -Qqm > ~/dotfiles/paquetes-aur.txt
cd ~/dotfiles && git init && git add . && git commit -m "Mi escritorio"
```

## Deshacer

```bash
cp ~/.zshrc.bak ~/.zshrc          # volver a una copia
chsh -s /bin/bash                 # volver a Bash
# Ctrl + Alt + F2 → consola de texto si el escritorio no arranca
```
