---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 3 · Avanzado
tema: "10"
tipo: Chuleta
competencias: CM4
herramientas: H4 (terminal Linux y Bash)
duracion: 2-3 h, o repartido en sesiones de 20 minutos
---

# Chuleta · Trucos y superpoderes de la consola

> **Nota.** Esta página acompaña a la [explicación del tema](1-explicacion.md). Tenla a mano mientras trabajas.

## Quince recetas de una línea

Cópialas, pruébalas y, sobre todo, **desármalas**: quita la última parte de la tubería y mira qué
sale, luego la anterior, y así. Es la mejor forma de entender cómo funcionan.

```bash
# 1. Los 10 ficheros más grandes de aquí hacia abajo
find . -type f -exec du -h {} + | sort -rh | head

# 2. Qué carpeta me está llenando el disco
du -h --max-depth=1 / 2>/dev/null | sort -rh | head

# 3. Cuántos ficheros hay de cada extensión
find . -type f | grep -o '\.[^./]*$' | sort | uniq -c | sort -rn

# 4. Los 10 comandos que más uso
history | awk '{print $2}' | sort | uniq -c | sort -rn | head

# 5. Los 5 procesos que más memoria consumen
ps aux --sort=-%mem | head -n 6

# 6. Buscar y reemplazar en todos los ficheros de un tipo
grep -rl "viejo" --include="*.txt" . | xargs sed -i.bak 's/viejo/nuevo/g'

# 7. Ficheros modificados en la última hora
find . -type f -mmin -60

# 8. Borrar ficheros vacíos
find . -type f -empty -delete

# 9. Copia de seguridad con la fecha en el nombre
tar -czf copia-$(date +%Y%m%d-%H%M).tar.gz ~/documentos

# 10. Los usuarios que pueden iniciar sesión de verdad
grep -v -e "/nologin$" -e "/false$" /etc/passwd | cut -d: -f1

# 11. Cuántas líneas de código hay en un proyecto
find . -name "*.sh" -exec cat {} + | wc -l

# 12. Renombrar en lote: quitar espacios de los nombres
for f in *\ *; do mv "$f" "${f// /_}"; done

# 13. Ver un registro en vivo filtrando sólo los errores
tail -f /var/log/syslog | grep --line-buffered -i error

# 14. Comprobar qué puertos están abiertos
ss -tulpn | column -t

# 15. Contar cuántas veces aparece cada palabra en un texto
tr -s '[:space:]' '\n' < texto.txt | tr 'A-Z' 'a-z' | sort | uniq -c | sort -rn | head
```

> **La receta 12 merece un vistazo.** `${f// /_}` es una **expansión de parámetro**: sustituye
> todos los espacios por guiones bajos sin llamar a ningún programa externo. Bash tiene una
> familia entera de estas: `${f%.txt}` quita el sufijo, `${f#pre}` quita el prefijo,
> `${f^^}` pasa a mayúsculas. Son más rápidas que `sed` y no crean procesos.

## Atajos de teclado

```
EDITAR LA LÍNEA                  HISTORIAL
  Ctrl+A   principio               !!        comando anterior
  Ctrl+E   final                   !$        último argumento
  Ctrl+W   borrar palabra          sudo !!   repetir con sudo
  Ctrl+U   borrar hasta inicio     Ctrl+R    buscar hacia atrás
  Ctrl+K   borrar hasta final      ^a^b      corregir y repetir
  Ctrl+Y   pegar                   history | grep x
  Ctrl+L   limpiar pantalla        Alt+.     último argumento
  Tab      completar               Tab Tab   ver opciones

CONTROL                          ENCADENAR
  Ctrl+C   interrumpir              ;    siempre
  Ctrl+Z   pausar                   &&   si el anterior fue bien
  Ctrl+D   fin de entrada / salir   ||   si el anterior falló
  Ctrl+S   congelar salida          &    en segundo plano
  Ctrl+Q   descongelar              |    tubería

EXPANSIONES                      TMUX  (prefijo Ctrl+B)
  {1..5}      1 2 3 4 5            d   salir dejándolo vivo
  {a,b}       dos cadenas          c   nueva ventana
  f{,.bak}    f f.bak              %   dividir vertical
  $(cmd)      salida del comando   "   dividir horizontal
  $((2+2))    aritmética           [   desplazarse
  ~           mi carpeta           ?   ayuda
  echo X      ¡probar antes!
```
