---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 1 · Básico
tema: "18"
tipo: Tarea
competencias: CM6
herramientas: Isard VDI, H4 (terminal Linux)
duracion: 3 h (dos sesiones)
evaluacion: Apto / No apto
---

# Tarea · Una máquina para toda la empresa

> **Antes de empezar.** Necesitas tu `Omarchy-SMR` de la [tarea 16](../16-omarchy/1-tarea-omarchy.md)
> y los comandos de la [guía 04](../04-comandos-y-ficheros/1-guia.md). Todo se hace en el
> terminal (`Super` + `Enter`). Los permisos a fondo (letras, números, SUID…) llegan en la
> [guía 09](../../2-intermedio/09-permisos/1-guia.md): aquí sólo usas una receta.

Hasta hoy tu Omarchy ha tenido un solo habitante: `alumno`. Pero un ordenador de empresa lo usan
muchas personas, y cada una tiene que tener **lo suyo** y no poder tocar **lo de los demás**. Vas a
convertir tu máquina en el ordenador de una empresa pequeña, con tres departamentos, cuatro
personas, un administrador y una baja 👋. Al acabar sabrás quién existe en una máquina Linux,
cómo se crea a alguien, cómo se le mete en un grupo y cómo se le da o se le quita el poder.

> **Analogía.** La máquina es un **edificio de oficinas**. Cada persona tiene su **despacho** con
> llave (su carpeta personal). Cada departamento tiene una **sala** que sólo abre la llave del
> departamento (un grupo). Y hay un **casero**, root, que abre todas las puertas: a algunos
> trabajadores les presta su llave (eso es `sudo`). Tú eres hoy el que reparte las llaves 🔑.

| | |
|---|---|
| 🎯 **Qué vas a conseguir** | Una máquina con cuatro usuarios, tres departamentos, un administrador más y una baja hecha bien |
| 🧰 **Qué necesitas** | `Omarchy-SMR` y el terminal |
| ⏱️ **Tiempo** | 3 horas en dos sesiones: las personas y los grupos · las salas, el casero y la baja |
| 📦 **Qué entregas** | Seis capturas ([8. Entrega](#8-entrega)) |
| ✅ **Calificación** | Apto / No apto |

## Índice

- [1. Quién eres tú](#1-quién-eres-tú)
- [2. Las personas](#2-las-personas)
- [3. Los departamentos](#3-los-departamentos)
- [4. Ponte en la piel de otro](#4-ponte-en-la-piel-de-otro)
- [5. La sala de cada departamento](#5-la-sala-de-cada-departamento)
- [6. Prestar la llave del casero](#6-prestar-la-llave-del-casero)
- [7. Una baja](#7-una-baja)
- [8. Entrega](#8-entrega)
- [9. Si vas rápido](#9-si-vas-rápido)

En cada apartado **haz** lo que te damos y **mira** lo que pasa. Las ❓ son para pensar y
comentarlas en clase. Lo que se entrega son **capturas** de que cada paso está hecho: ve
haciéndolas por el camino.

![El edificio de la empresa: arriba el casero, root, con el llavero de todas las puertas; en cada planta una sala de departamento que abre la llave del grupo, dirección, ventas o técnicos; en cada planta los despachos de las personas, uno por usuario, con su propia llave; alumno y ane, además, tienen una copia de la llave del casero, que es sudo](images/empresa-llaves.svg)

> [!IMPORTANT]
> **Antes de tocar nada, instantánea.** En Isard, apaga el escritorio y haz una instantánea
> «antes-de-usuarios». Vas a crear y borrar personas: si te lías, vuelves aquí.

---

## 1. Quién eres tú

```bash
whoami              # tu nombre de usuario
id                  # tu número (uid), tu grupo y los grupos en los que estás
groups              # sólo los grupos, más cómodo
```

👀 En `id` verás `uid=1000(alumno)` y, entre los grupos, **`wheel`**: en Arch y en Omarchy es el
grupo de los que pueden usar `sudo`. El instalador te metió en él sin preguntar.

Todas las personas de la máquina están apuntadas en un fichero de texto, una por línea:

```bash
grep alumno /etc/passwd     # tu línea
tail -n 3 /etc/passwd       # las tres últimas personas (hay muchas que son programas, no gente)
```

![La línea alumno:x:1000:1000:Alumno SMR,,,:/home/alumno:/bin/bash separada en sus siete campos: usuario, contraseña (la x dice que está en /etc/shadow), uid, gid, nombre, carpeta personal y shell](../99-repaso-examen/images/passwd-campos.svg)

❓ ¿Cuántos campos tiene tu línea y qué pone en el de la carpeta personal? ¿Por qué `cat
/etc/shadow` te dice «Permission denied» y `sudo cat /etc/shadow` no?

---

## 2. Las personas

La empresa tiene cuatro trabajadores: **Ane** (dirección), **Jon** (ventas), **Maite**
(técnicos) y **Unai** (ventas). Crearlos es un comando por persona:

```bash
sudo useradd -m -s /bin/bash ane      # -m: crea su carpeta /home/ane · -s: su shell
sudo useradd -m -s /bin/bash jon
sudo useradd -m -s /bin/bash maite
sudo useradd -m -s /bin/bash unai
```

Y una contraseña para cada uno (te la pide dos veces, no se ve mientras la escribes):

```bash
sudo passwd ane       # repite con jon, maite y unai; para la práctica vale la misma
```

```bash
ls -l /home                 # 👀 cuatro despachos nuevos, cada uno de su dueño
tail -n 4 /etc/passwd       # 👀 las cuatro líneas nuevas, con uid 1001, 1002, 1003, 1004
```

> [!NOTE]
> **En Mint era `adduser`.** Ese comando es de Debian y Ubuntu y hace preguntas. En Arch y
> Omarchy está `useradd`, que no pregunta nada: por eso hay que darle `-m` y `-s`, y la
> contraseña aparte.

❓ ¿Qué pasa si creas a alguien sin `-m`? *(prueba con `sudo useradd prueba`, mira `/home` y
bórralo con `sudo userdel prueba`)*. ¿Por qué cada persona tiene un número además del nombre?

---

## 3. Los departamentos

Un **grupo** es una llave que pueden tener varias personas. Crea los tres departamentos y
reparte las llaves:

```bash
sudo groupadd direccion
sudo groupadd ventas
sudo groupadd tecnicos
sudo usermod -aG direccion ane
sudo usermod -aG ventas jon
sudo usermod -aG tecnicos maite
sudo usermod -aG ventas unai
```

> [!WARNING]
> **La `-a` es la más importante.** `usermod -G ventas jon` sin la `-a` le quita a Jon todos los
> demás grupos y le deja sólo `ventas`. Con `-aG` (**a**ñadir al **G**rupo) se suma a lo que ya
> tenía. Si se te olvida en `alumno`, te quedas sin `wheel` y sin `sudo`.

```bash
groups jon                  # 👀 jon ventas
getent group ventas         # 👀 ventas:x:1002:jon,unai  → los miembros, al final
grep -E "direccion|ventas|tecnicos" /etc/group
```

❓ Mira la línea de `ventas` en `/etc/group`. ¿Quién está dentro? Si mañana entra alguien nuevo
en ventas, ¿qué dos comandos hacen falta?

---

## 4. Ponte en la piel de otro

Para comprobar que las llaves funcionan hay que **ser** otra persona. `su -` te cambia de usuario
(pide **su** contraseña, no la tuya):

```bash
su - jon            # ahora eres Jon; fíjate en el prompt
whoami; pwd         # 👀 jon · /home/jon
touch ~/pedidos.txt
ls /home/ane        # 👀 Permission denied: el despacho de Ane no es tuyo
sudo ls /root       # 👀 «jon is not in the sudoers file»: Jon no tiene la llave del casero
exit                # vuelves a ser alumno
```

❓ Captura la pantalla con los dos «denied». ¿Qué diferencia hay entre «no puedo entrar en
/home/ane» y «no puedo usar sudo»? ¿Cuál de los dos arreglarías y cuál no?

> [!TIP]
> **Entrar de verdad como Jon.** Pulsa `Ctrl` + `Alt` + `F3`: una consola de texto, como en la
> instalación de Arch que harás el trimestre que viene. Entra con `jon` y su contraseña, mira
> `ls -a`, sal con `exit` y vuelve al escritorio con `Ctrl` + `Alt` + `F1` (o `F2`, el que lo
> tenga). Si Isard se queda las teclas, usa el visor SPICE.

---

## 5. La sala de cada departamento

Cada departamento necesita una carpeta donde **sólo su gente** entre. La receta son tres
comandos por sala; el porqué de cada número está en la guía 09:

```bash
sudo mkdir -p /srv/empresa/direccion /srv/empresa/ventas /srv/empresa/tecnicos
sudo chgrp direccion /srv/empresa/direccion     # la sala es del grupo
sudo chgrp ventas /srv/empresa/ventas
sudo chgrp tecnicos /srv/empresa/tecnicos
sudo chmod 2770 /srv/empresa/direccion          # 7: el dueño todo · 7: el grupo todo · 0: los demás nada
sudo chmod 2770 /srv/empresa/ventas             # y el 2 delante: lo que se cree dentro hereda el grupo
sudo chmod 2770 /srv/empresa/tecnicos
ls -l /srv/empresa                              # 👀 drwxrws--- root ventas … (la s es el 2)
```

![Sin el 2 delante, el fichero que crea Ana en la sala de ventas lleva su grupo personal y Luis, que es de ventas, no puede modificarlo; con el 2, el fichero nace con el grupo ventas y Luis sí puede](../../2-intermedio/09-permisos/images/sgid-herencia.svg)

Ahora, la prueba de fuego, siendo Jon:

```bash
su - jon
touch /srv/empresa/ventas/pedido-1.txt          # 👀 funciona
ls -l /srv/empresa/ventas                       # 👀 el fichero es de jon, grupo ventas
touch /srv/empresa/direccion/plan.txt           # 👀 Permission denied
ls /srv/empresa/tecnicos                        # 👀 Permission denied
exit
```

❓ Entra como Unai y cambia el `pedido-1.txt` de Jon (`echo hola >> …`). ¿Puede? ¿Por qué? ¿Y
Maite? Captura el `ls -l /srv/empresa`.

---

## 6. Prestar la llave del casero

Ane es la directora y tiene que poder instalar programas. Eso es darle **`sudo`**: meterla en
`wheel`.

```bash
sudo usermod -aG wheel ane
su - ane
sudo whoami                 # 👀 pide la contraseña de ane y responde: root
sudo pacman -Syu --noconfirm cowsay && cowsay "ya soy admin" 🐄
exit
```

> [!WARNING]
> **Con `sudo`, Ane puede hacerlo todo**: leer el despacho de Jon, borrar a Maite, apagar la
> máquina. Se da a quien tiene que administrar, y a nadie más. En una empresa real, esto se
> apunta y se revisa.

❓ ¿Por qué `sudo` le pide a Ane **su** contraseña y no la de root? ¿Cuántas personas tienen hoy
la llave del casero en tu máquina (`getent group wheel`)?

---

## 7. Una baja

Unai se va de la empresa. Primero se le **cierra la puerta** (no puede entrar, pero sus cosas
siguen ahí), y cuando el departamento ha recogido lo suyo, se **borra**:

```bash
sudo passwd -l unai             # -l: bloquea la contraseña
su - unai                       # 👀 «Authentication failure»: ya no entra
sudo userdel -r unai            # -r: borra también /home/unai
ls /home                        # 👀 sin unai
grep unai /etc/passwd           # 👀 nada
ls -l /srv/empresa/ventas       # 👀 si Unai había creado algo, el dueño ahora es un NÚMERO
```

❓ Ese número que ha quedado como dueño, ¿qué es? ¿Qué harías con esos ficheros antes de borrar
a alguien en una empresa de verdad? ¿Por qué se bloquea primero en vez de borrar directamente?

---

## 8. Entrega

Entrega en Moodle **«Tarea · Una máquina para toda la empresa»** estas **seis capturas**, cada una
con una línea que diga qué enseña. En todas tiene que verse el prompt con el usuario y
`omarchy-smr`:

1. 🪪 `id` de `alumno` y las cuatro líneas nuevas de `/etc/passwd`.
2. 🗝️ `/etc/group` con `direccion`, `ventas` y `tecnicos` y sus miembros.
3. 🚪 Jon dentro de su cuenta con los dos «Permission denied» (el despacho de Ane y `sudo`).
4. 🏢 `ls -l /srv/empresa` con las tres salas en `drwxrws---` y su grupo, y el `pedido-1.txt` de Jon.
5. 👑 Ane haciendo `sudo whoami` y la vaca.
6. 👋 Unai bloqueado, borrado y ausente de `/etc/passwd`.

Es **Apto** si están las seis capturas, son de **tu** máquina, y sabes explicar, cuando se te
pregunte, qué hace `-m`, `-aG`, `2770` y `-r`.

**Antes de entregar, comprueba:**

- [ ] `getent group wheel` dice `alumno,ane` y nadie más.
- [ ] Jon puede escribir en `ventas` y no en `direccion` ni en `tecnicos`.
- [ ] Unai no existe y su carpeta tampoco.
- [ ] Ninguna captura enseña una contraseña.

## 9. Si vas rápido

> **Reto.** Lo que recibe cada persona nueva. Mira `ls -a /etc/skel`: todo lo que hay ahí se copia
> al despacho de cada usuario que se crea con `-m`. Deja en `/etc/skel` un `BIENVENIDA.txt` con
> las normas de la empresa, crea a `leire` y compruébalo en `/home/leire`.

> **Reto.** Una sala para todos. Crea el grupo `empresa` con las cuatro personas y la carpeta
> `/srv/empresa/comun`, donde cualquiera puede dejar ficheros pero **sólo el dueño borra los
> suyos**. La pista está en la guía 09: el bit que tiene `/tmp`.
