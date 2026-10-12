---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 2 · Intermedio
tema: "09"
tipo: Ejercicios
competencias: CM6
herramientas: H4 (terminal Linux)
duracion: 5 h
origen: traducción y corrección de «5-Baimenak Linuxen.md» (curso anterior)
---

# Ejercicios · Permisos en Linux: notación octal y simbólica. Root y sudo

> **Nota.** Esta página acompaña a la [explicación del tema](1-explicacion.md). Léela antes de ponerte con los ejercicios.

## Índice

- [Ejercicios · Permisos en Linux: notación octal y simbólica. Root y sudo](#ejercicios--permisos-en-linux-notación-octal-y-simbólica-root-y-sudo)
  - [Índice](#índice)
  - [Ejercicios](#ejercicios)
    - [Ejercicio 1](#ejercicio-1)
    - [Ejercicio 2](#ejercicio-2)
    - [Ejercicio 3](#ejercicio-3)
    - [Ejercicio 4](#ejercicio-4)
    - [Ejercicio 5](#ejercicio-5)
    - [Ejercicio 6](#ejercicio-6)
    - [Ejercicio 7](#ejercicio-7)
    - [Ejercicio 8 (nuevo)](#ejercicio-8-nuevo)
  - [Práctica](#práctica)
  - [Entregable](#entregable)

---

## Ejercicios

### Ejercicio 1

Relaciona cada valor octal con su notación simbólica:

| Octal | | Simbólico |
|---|---|---|
| 462 | | `rwx--x--x` |
| 123 | | `--x-w--wx` |
| 711 | | `--x-----x` |
| 333 | | `-wx-wx-wx` |
| 161 | | `r-xrw-rwx` |
| 765 | | `rwxrw-r-x` |
| 567 | | `--xrw--w-` |
| 101 | | `r--rw--w-` |
| 162 | | `--xrw---x` |

### Ejercicio 2

¿Cuáles son los permisos de este fichero en notación octal?

![Ejercicio 2](images/image-13.png)

### Ejercicio 3

Pasa a notación octal:

- `r--r-xrw-`
- `--xr-xr--`
- `r--------`
- `--------x`
- `rwsr-xr-x`
- `rwxr-sr-x`
- `r--rw---T`

### Ejercicio 4

¿Qué ocurrirá al ejecutar el siguiente comando?

![Ejercicio 4](images/image-14.png)

1. La salida de `whoami` se guardará en el fichero, porque siendo el propietario los permisos no
   me afectan.
2. La salida de `whoami` **no** se podrá guardar, porque aunque sea el propietario, el permiso
   asignado al fichero prevalece.

*Justifica la respuesta con lo que dice el [apartado 2](1-explicacion.md#2-las-tres-categorías).*

### Ejercicio 5

¿Cómo conseguirías cambiar los permisos del fichero «file» para que queden como se ve?
Da la solución **en simbólico y en octal**.

![Ejercicio 5](images/image-15.png)

### Ejercicio 6

¿Qué permisos en octal hay que asignar para que el fichero quede como se indica?

![Ejercicio 6](images/image-16.png)

### Ejercicio 7

¿Podré borrar este fichero, con los permisos que tiene configurados?

![Ejercicio 7](images/image-17.png)

1. Sí
2. No

*Pista: la pregunta no es sobre los permisos del fichero. Vuelve al
[apartado 5](1-explicacion.md#5-los-permisos-en-directorios-no-significan-lo-mismo).*

### Ejercicio 8 (nuevo)

En la máquina virtual, reproduce y explica:

```bash
mkdir ~/pruebas && cd ~/pruebas
mkdir solo-lectura && touch solo-lectura/dato.txt
chmod 444 solo-lectura
ls solo-lectura          # ¿funciona?
cd solo-lectura          # ¿funciona?
cat solo-lectura/dato.txt # ¿funciona?
chmod 111 solo-lectura
ls solo-lectura          # ¿y ahora?
cat solo-lectura/dato.txt # ¿y ahora?
```

Anota qué funciona y qué no en cada caso, y **explica por qué** con la tabla del apartado 5.

## Práctica

Sobre la máquina virtual de Linux, aplica **la misma matriz de permisos que en NTFS**
(la de NTFS), pero al estilo Linux. La empresa tiene tres departamentos: **dirección**, **ventas**
y **técnicos**.

1. Crea los grupos y añade a los usuarios que creaste en el tema de usuarios y grupos.
2. Crea la estructura:

```
/datos
├── direccion     → sólo el grupo direccion, nadie más entra
├── ventas        → el grupo ventas trabaja aquí; direccion puede leer
├── tecnicos      → el grupo tecnicos trabaja aquí; direccion puede leer
└── comun         → todos escriben, pero cada uno sólo borra lo suyo
```

3. Requisitos concretos:
   - `/datos/direccion` **no** debe ser accesible ni siquiera de lectura para los demás.
   - `/datos/ventas` y `/datos/tecnicos` deben tener **SGID** para que los ficheros nuevos
     hereden el grupo del departamento.
   - `/datos/comun` debe tener **sticky bit**.
   - Un usuario externo llamado `auditor`, que no pertenece a ningún departamento, debe poder
     **leer** `/datos/ventas`. Como no está en el grupo, hay que usar **ACL**.
4. Configura `sudo` para que el grupo `tecnicos` pueda reiniciar servicios **sin ser
   administradores de todo**.
5. **Comprueba cada requisito iniciando sesión con cada usuario** (`su - usuario`) e intentando
   lo que debe y lo que no debe poder hacer. Una configuración no comprobada no cuenta.

Comandos de verificación:

```bash
ls -ld /datos/*
getfacl /datos/ventas
sudo -l -U auditor
```

## Entregable

**Tarea Moodle: «Matriz de permisos Linux + configuración de sudo documentada»**
Calificación de 0 a 10 · Se aprueba con 5.

1. Ejercicios 1 a 8 resueltos, con la justificación de los ejercicios 4, 7 y 8.
2. **Matriz de permisos** en tabla: para cada carpeta, propietario, grupo, permisos en octal
   **y** en simbólico, y bits especiales, con una frase de justificación por fila.
3. Los comandos exactos que has usado, en bloque de código.
4. Capturas de `ls -ld /datos/*` y `getfacl /datos/ventas`.
5. **Pruebas de acceso**: por cada usuario, una captura de algo que sí puede hacer y algo que
   no puede, con el mensaje de error incluido.
6. Configuración de `sudo` con la línea que has añadido a `/etc/sudoers` explicada campo a campo.
7. La [tabla de comparación con NTFS](1-explicacion.md#12-comparación-con-ntfs) rellenada.

*Instrumento de evaluación: prueba práctica de permisos en Linux y de escalada de privilegios
con `sudo`.*
