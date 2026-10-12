---
modulo: Sistemas Operativos Monopuesto (SMR 1.º)
nivel: 2 · Intermedio
tema: "07"
tipo: Chuleta
competencias: CM2 (particiones y sistemas de archivos, en un disco real)
herramientas: Ventoy 1.1.17, H4 (terminal Linux) y PowerShell para las comprobaciones
duracion: 5 h (2 sesiones en el aula + descargas)
---

# Chuleta · USB multiarranque con Ventoy: la navaja suiza del técnico

> **Nota.** Esta página acompaña a la [explicación del tema](1-explicacion.md). Tenla a mano mientras trabajas.

## Qué herramienta saco en cada situación

Esta es la parte que convierte un pincho con ISOs en una navaja suiza: saber **qué hoja abrir**.

| Situación | Herramienta | Qué harías |
|---|---|---|
| Windows no arranca y hay que salvar las fotos del usuario | **Hiren's** | Arrancar, abrir el explorador, copiar la carpeta del usuario a un disco externo |
| El portátil va lentísimo y quieres pasar el sistema a un SSD nuevo | **Clonezilla** o **Rescuezilla** | Clonar disco a disco (*device-device*) |
| Pantallazos azules al azar, sin patrón | **Memtest86+** | Dejarlo varias pasadas; un solo error ya significa RAM defectuosa |
| Quieres instalar Linux junto a Windows y no hay espacio libre | **GParted Live** | Reducir la partición de Windows (desfragmentada y sin hibernar antes) |
| Tras instalar Windows, desaparece el GRUB de Arch | **SystemRescue** o **Arch** *live* | Montar las particiones, `arch-chroot` y reinstalar GRUB |
| Vas a donar un equipo con disco mecánico | **ShredOS** | `nwipe` con una pasada; con discos SSD, mejor el borrado seguro del fabricante (un SSD reparte las escrituras y sobrescribir no garantiza nada) |
| Ordenador de 2012 que ya no mueve Windows | **Linux Mint** | Probar en *live*; si va fino, instalar |
| Quieres saber si la wifi de un portátil funciona en Linux antes de instalar | **Ubuntu** *live* | Arrancar y probar sin tocar el disco |
| Hay que hacer una copia completa del sistema antes de tocar nada | **Clonezilla** | Guardar una imagen del disco en un disco externo (*device-image*) |
