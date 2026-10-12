---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 3 · Avanzado
tema: "11"
tipo: Chuleta
competencias: CM4 (parcialmente)
herramientas: H2 (CMD/PowerShell), H4 (terminal Linux y Bash)
duracion: 10 h
---

# Chuleta · Personalización del intérprete de comandos y del entorno de trabajo

> **Nota.** Esta página acompaña a la [explicación del tema](1-explicacion.md). Tenla a mano mientras trabajas.

## Índice

- [Chuleta · Personalización del intérprete de comandos y del entorno de trabajo](#chuleta--personalización-del-intérprete-de-comandos-y-del-entorno-de-trabajo)
  - [Índice](#índice)
  - [Qué fichero se lee y cuándo](#qué-fichero-se-lee-y-cuándo)
  - [Aplicar y comprobar](#aplicar-y-comprobar)
  - [Zsh y Powerlevel10k](#zsh-y-powerlevel10k)
  - [Piezas habituales](#piezas-habituales)
  - [PowerShell](#powershell)
  - [Dotfiles](#dotfiles)

---

## Qué fichero se lee y cuándo

| Shell | Fichero | Cuándo |
|---|---|---|
| Bash | `~/.bash_profile` (o `~/.profile`) | Al iniciar sesión (consola, SSH) |
| Bash | `~/.bashrc` | Cada terminal interactivo que abres |
| Zsh | `~/.zprofile` | Al iniciar sesión |
| Zsh | `~/.zshrc` | Cada terminal interactivo que abres |
| Todos | `/etc/profile`, `/etc/zsh/zshrc` | Para todos los usuarios |
| Nuevos usuarios | `/etc/skel/` | Se copia al `home` de cada usuario que se crea |

> **Regla práctica.** Alias, prompt y funciones → `~/.bashrc` o `~/.zshrc`.
> Variables que tienen que heredar todos los programas (`PATH`, `EDITOR`) → también ahí, con `export`.

## Aplicar y comprobar

```bash
source ~/.zshrc       # aplicar sin cerrar el terminal
echo $0               # el shell que se ejecuta ahora
echo $SHELL           # el shell asignado al usuario
alias                 # ver los alias activos
type ll               # qué es ll: alias, función o programa
```

## Zsh y Powerlevel10k

```bash
sudo pacman -S zsh zsh-autosuggestions zsh-syntax-highlighting
chsh -s /bin/zsh                     # cambiar tu shell (cierra sesión y vuelve a entrar)
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ~/.powerlevel10k
echo 'source ~/.powerlevel10k/powerlevel10k.zsh-theme' >> ~/.zshrc
p10k configure                       # asistente; se guarda en ~/.p10k.zsh
```

> 💡 **Orden en `.zshrc`.** El *instant prompt* de p10k va **lo primero** y
> `zsh-syntax-highlighting` **el último** de los plugins.

## Piezas habituales

```bash
alias ll='ls -lah'
alias ..='cd ..'
alias rm='rm -i'                     # red de seguridad
export PATH="$HOME/bin:$PATH"        # tus scripts, antes que los del sistema
export EDITOR=nano
HISTSIZE=10000                       # historial más largo
mkcd() { mkdir -p "$1" && cd "$1"; } # función: crear y entrar
```

## PowerShell

| Linux | PowerShell |
|---|---|
| `~/.bashrc` / `~/.zshrc` | `$PROFILE` |
| `source ~/.zshrc` | `. $PROFILE` |
| `alias ll='ls -l'` | `Set-Alias ll Get-ChildItem` |
| `PS1=...` | `function prompt { ... }` |
| — | `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` |

## Dotfiles

```bash
mkdir -p ~/dotfiles && cp ~/.zshrc ~/.p10k.zsh ~/dotfiles/
cd ~/dotfiles && git init && git add . && git commit -m "Mi configuración"
```
