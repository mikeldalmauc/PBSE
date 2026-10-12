---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 2 · Intermedio
tema: "06"
tipo: Chuleta
competencias: CM3, CM4
herramientas: H4 (terminal Linux y Bash)
duracion: a tu ritmo
---

# Chuleta · Ampliación: buscar, encadenar y empaquetar en GNU/Linux

> **Nota.** Esta página acompaña a la [explicación del tema](1-explicacion.md). Tenla a mano mientras trabajas.

## Equivalencias con Windows

Para tenerlo al lado de lo que ya sabes hacer en CMD y PowerShell.

| Acción | Linux | CMD | PowerShell |
|---|---|---|---|
| Dónde estoy | `pwd` | `cd` | `Get-Location` |
| Listar | `ls -l` | `dir` | `Get-ChildItem` |
| Cambiar de carpeta | `cd` | `cd` | `Set-Location` |
| Crear carpeta | `mkdir -p` | `md` | `New-Item -ItemType Directory` |
| Crear fichero vacío | `touch` | `type nul > f` | `New-Item` |
| Ver contenido | `cat` / `less` | `type` / `more` | `Get-Content` |
| Copiar | `cp -r` | `copy` / `xcopy` | `Copy-Item -Recurse` |
| Mover / renombrar | `mv` | `move` / `ren` | `Move-Item` / `Rename-Item` |
| Borrar | `rm` | `del` | `Remove-Item` |
| Borrar carpeta | `rm -r` | `rd /s` | `Remove-Item -Recurse` |
| Buscar ficheros | `find` | `dir /s` | `Get-ChildItem -Recurse` |
| Buscar en el texto | `grep` | `findstr` | `Select-String` |
| Espejo / sincronizar | `rsync -a --delete` | `robocopy /MIR` | `robocopy /MIR` |
| Comprimir | `tar -czvf` | — | `Compress-Archive` |
| Espacio libre | `df -h` | `wmic logicaldisk` | `Get-PSDrive` |
| Atributos | `chattr` / `lsattr` | `attrib` | `Set-ItemProperty` |
| Ayuda | `man` | `comando /?` | `Get-Help` |
| Enlace simbólico | `ln -s` | `mklink` | `New-Item -ItemType SymbolicLink` |
| Limpiar pantalla | `clear` | `cls` | `Clear-Host` |
| Comodín «todo» | `*` | `*` | `*` |
| Comodín «un carácter» | `?` | `?` | `?` |

> **Tres diferencias de fondo**, más allá de los nombres:
> 1. En Windows los comodines los expande **cada programa**; en Linux los expande **el shell**,
>    igual para todos.
> 2. PowerShell pasa **objetos** por la tubería; Bash pasa **texto**. Por eso en PowerShell puedes
>    hacer `Where-Object {$_.Length -gt 1MB}` y en Bash tienes que recortar columnas con `cut`.
> 3. Linux distingue mayúsculas de minúsculas. Windows, no.

## Resumen de comandos
```
BUSCAR                                       TUBERÍAS
  find . -name "*.txt"         por nombre      cmd > f            guardar
  find . -size +10M            por tamaño      cmd >> f           añadir
  find . -mtime -7             por fecha       cmd 2>/dev/null    callar errores
  find . -type f -exec X {} +  con cada uno    a | b              encadenar
  grep -rn "texto" .           dentro          tee f              guardar y seguir
  locate nombre                por índice      sort | uniq -c | sort -rn

EMPAQUETAR                                   DISCO Y ENLACES
  tar -czvf c.tar.gz dir/      crear           df -h              particiones
  tar -tzvf c.tar.gz           listar          du -sh */          carpetas
  tar -xzvf c.tar.gz           extraer         ncdu /             interactivo
  rsync -avh --delete o/ d/    espejo          ln -s dest nombre  simbólico
  rsync ... --dry-run          simular         ls -li             ver inodos
```
