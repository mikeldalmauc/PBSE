---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 1 · Básico
tema: "04"
tipo: Chuleta
competencias: CM3, CM4
herramientas: H4 (terminal Linux y Bash)
duracion: 5 h
---

# Chuleta · Comandos y gestión de ficheros en GNU/Linux

> **Nota.** Esta página acompaña a la [explicación del tema](1-explicacion.md). Tenla a mano mientras trabajas.

## Resumen de comandos
```
AYUDA                               VER
  cmd --help    resumen               cat f         todo de golpe
  man cmd       manual (q=salir)      less f        página a página
  Tab           completar             head -n 5 f   primeras líneas
  ↑             comando anterior      tail -n 5 f   últimas líneas
  Ctrl+C        parar                 wc -l f       contar líneas

NAVEGAR                             CREAR
  pwd           dónde estoy           touch f       fichero vacío
  cd ruta       ir                    mkdir -p a/b  carpetas
  cd            a mi carpeta          echo x > f    escribir (borra)
  cd ..         subir                 echo x >> f   añadir al final
  cd -          volver                nano f        editar
  ls -lah       listar todo
  tree -L 2     árbol

COPIAR / MOVER / BORRAR             COMODINES
  cp o d        copiar                *             lo que sea
  cp -r o d     copiar carpeta        ?             un carácter
  mv o d        mover o renombrar     [0-9]         un dígito
  rm -i f       borrar preguntando    {a,b}         varias opciones
  rm -r c       borrar carpeta        echo *.txt    ¡probar antes!
  rmdir c       borrar si está vacía
```
