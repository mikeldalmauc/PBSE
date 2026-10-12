#!/usr/bin/env bash
# s13-laberinto.sh — Reto de la guía «Comandos y gestión de ficheros en GNU/Linux»
# Sistemas Operativos Monopuesto · SMR 1.º
# Crea ~/laberinto con un tesoro escondido. Cada ejecución lo crea de nuevo con otra clave.
# Uso:  bash s13-laberinto.sh

set -e
[ -n "$HOME" ] && [ -d "$HOME" ] || { echo "No encuentro tu carpeta personal."; exit 1; }
L="$HOME/laberinto"
rm -rf "$L"
mkdir -p "$L"/{entrada,norte/pasillo,sur/sotano,este,oeste,desvan}

cat > "$L/entrada/LEEME.txt" <<'FIN'
Bienvenido al laberinto.

Primera pista: la siguiente pista está en la carpeta «pasillo», que está dentro de «norte».
Cuidado: con un ls normal no la vas a ver.
FIN

echo "Aquí no hay nada. Sigue buscando." > "$L/norte/pasillo/puerta1.txt"
echo "Tampoco. ¿Has mirado bien?"          > "$L/norte/pasillo/puerta2.txt"
cat > "$L/norte/pasillo/.pista2.txt" <<'FIN'
¡Bien visto! Los ficheros cuyo nombre empieza por punto están ocultos.

Segunda pista: desde aquí, sube DOS niveles y entra en sur/sotano.
Allí hay cien cajas .txt y UNA sola que no es .txt. Encuéntrala con un comodín.
FIN

for i in $(seq 1 100); do echo "Caja vacía." > "$L/sur/sotano/caja$i.txt"; done
N=$(( RANDOM % 100 + 1 ))
cat > "$L/sur/sotano/caja$N.md" <<'FIN'
Tercera pista: el tesoro está en la carpeta «desvan», que cuelga de la carpeta del laberinto.
Es un fichero oculto y muy largo. La clave está en su ÚLTIMA línea: no hace falta leerlo entero.

Cuando la tengas, copia el tesoro a tu carpeta personal con el nombre tesoro-TUNOMBRE.txt
FIN

echo "Callejón sin salida." > "$L/este/nada.txt"
echo "Callejón sin salida." > "$L/oeste/nada.txt"
echo "¿Tan fácil? Éste es falso. El de verdad no se ve." > "$L/desvan/tesoro.txt"

CLAVE=$(printf '%04X-%04X' $RANDOM $RANDOM)
{
  for i in $(seq 1 300); do echo "polvo polvo polvo polvo polvo polvo polvo polvo"; done
  echo "CLAVE: $CLAVE"
} > "$L/desvan/.tesoro.txt"

echo "Laberinto creado en $L"
echo "Empieza con:  cat ~/laberinto/entrada/LEEME.txt"
