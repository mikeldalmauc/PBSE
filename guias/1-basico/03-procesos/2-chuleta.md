---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 1 · Básico
tema: "03"
tipo: Chuleta
competencias: —
herramientas: H2 (CMD/PowerShell), H4 (terminal Linux)
duracion: 5 h
origen: traducción y ampliación de «3-Prosezu Kudeaketa.md» (curso anterior)
---

# Chuleta · Procesos, hilos y planificación de la CPU

> **Nota.** Esta página acompaña a la [explicación del tema](1-explicacion.md). Tenla a mano mientras trabajas.

## Tabla de equivalencias

| Acción | Linux | Windows (CMD) | Windows (PowerShell) |
|---|---|---|---|
| Listar procesos | `ps aux` | `tasklist` | `Get-Process` |
| Ver en tiempo real | `top` / `htop` | Administrador de tareas | `Get-Process` en bucle |
| Buscar por nombre | `pgrep -l nombre` | `tasklist /FI "..."` | `Get-Process nombre` |
| Terminar (educado) | `kill PID` | `taskkill /PID n` | `Stop-Process -Id n` |
| Terminar (forzado) | `kill -9 PID` | `taskkill /PID n /F` | `Stop-Process -Id n -Force` |
| Cambiar prioridad | `renice` | `wmic` / interfaz gráfica | `$p.PriorityClass = ...` |
| Ver el árbol | `ps -ef --forest` | — | — |
| Identificador | PID | PID | Id |
