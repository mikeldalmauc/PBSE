---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 2 · Intermedio
tema: "09"
tipo: Chuleta
competencias: CM6
herramientas: H4 (terminal Linux)
duracion: 5 h
origen: traducción y corrección de «5-Baimenak Linuxen.md» (curso anterior)
---

# Chuleta · Permisos en Linux: notación octal y simbólica. Root y sudo

> **Nota.** Esta página acompaña a la [explicación del tema](1-explicacion.md). Tenla a mano mientras trabajas.

## Índice

- [Chuleta · Permisos en Linux: notación octal y simbólica. Root y sudo](#chuleta--permisos-en-linux-notación-octal-y-simbólica-root-y-sudo)
  - [Índice](#índice)
  - [Leer una línea de `ls -l`](#leer-una-línea-de-ls--l)
  - [Valores](#valores)
  - [Conversión rápida](#conversión-rápida)
  - [Comandos](#comandos)
  - [Permisos especiales](#permisos-especiales)
  - [ACL, atributos y sudo](#acl-atributos-y-sudo)

---

## Leer una línea de `ls -l`

```text
-rwxr-x---  1  alumno  tecnicos  1024  sep 22 10:24  informe.sh
│└┬┘└┬┘└┬┘      │        │
│ u  g  o       │        └── grupo
│               └── propietario
└── tipo: - fichero · d directorio · l enlace
```

## Valores

| Letra | Octal | En un fichero | En un directorio |
|---|---|---|---|
| `r` | 4 | Leer el contenido | Listar lo que hay dentro |
| `w` | 2 | Modificarlo | Crear, borrar y renombrar dentro |
| `x` | 1 | Ejecutarlo | Entrar (`cd`) y atravesarlo |

## Conversión rápida

| Octal | Simbólico | Uso típico |
|---|---|---|
| `755` | `rwxr-xr-x` | Scripts y carpetas públicas |
| `750` | `rwxr-x---` | Carpeta de un departamento |
| `700` | `rwx------` | Carpeta privada |
| `644` | `rw-r--r--` | Fichero normal |
| `640` | `rw-r-----` | Fichero del departamento |
| `600` | `rw-------` | Fichero privado (claves, contraseñas) |
| `2770` | `rwxrws---` | Carpeta compartida con SGID |
| `1777` | `rwxrwxrwt` | `/tmp`: todos escriben, cada uno borra lo suyo |

## Comandos

```bash
chmod 750 carpeta              # octal
chmod u+x,g-w,o= fichero       # simbólico: añadir, quitar, fijar
chmod -R g+rX carpeta          # recursivo; X = x sólo en directorios
chown alumno:tecnicos fichero  # propietario y grupo
chgrp tecnicos fichero         # sólo el grupo
umask                          # máscara actual (0022 → ficheros 644, carpetas 755)
umask 027                      # ficheros 640, carpetas 750
```

## Permisos especiales

| Permiso | Octal | Letra | Para qué |
|---|---|---|---|
| SUID | `4000` | `s` en el propietario | Se ejecuta con los permisos del dueño (`passwd`) |
| SGID | `2000` | `s` en el grupo | En carpetas: lo nuevo hereda el grupo |
| Sticky | `1000` | `t` en otros | Sólo el dueño borra sus ficheros |

> **Mayúscula o minúscula.** `s`/`t` minúscula: el permiso especial **y** la `x` debajo.
> `S`/`T` mayúscula: el especial está puesto pero **falta la `x`**, así que normalmente no sirve.

## ACL, atributos y sudo

```bash
getfacl carpeta
setfacl -m u:ana:rwx carpeta       # permiso a un usuario concreto
setfacl -d -m g:ventas:rx carpeta  # por defecto: lo que se cree dentro lo hereda
setfacl -x u:ana carpeta           # quitar
lsattr fichero
sudo chattr +i fichero             # inmutable: ni root lo borra hasta quitar la i
sudo chattr +a registro.log        # sólo se puede añadir al final
sudo visudo                        # editar sudoers SIEMPRE con visudo
su -                               # hacerse root (contraseña de root)
sudo -i                            # shell de root (tu contraseña)
```
