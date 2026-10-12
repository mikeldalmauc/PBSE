# Notas para el profesor · USB multiarranque con Ventoy: la navaja suiza del técnico


- **Ancho de banda.** Treinta alumnos descargando 30 GB cada uno son casi un terabyte por la
  conexión del centro. Deja las ISOs verificadas en una carpeta compartida del aula (con su
  `SHA256SUMS`) y que las copien desde ahí; la parte de «descargar y verificar» la hacen con una
  o dos ISOs pequeñas.
- **Equipos del aula.** Antes de la sesión comprueba que la BIOS permite el menú de arranque sin
  contraseña y que el arranque desde USB está habilitado. Si no, la prueba se hace en uno o dos
  equipos preparados, por turnos.
- **Claves MOK que se quedan.** Cada clave que los alumnos registren **se queda en el firmware**
  del equipo del aula, y con ella cualquier pincho Ventoy puede arrancar cualquier cosa saltando
  Secure Boot. Al terminar la práctica, bórrala desde un Linux instalado en ese equipo con
  `sudo mokutil --list-enrolled` y `sudo mokutil --delete <fichero.cer>`, o restablece las claves
  de Secure Boot a los valores de fábrica desde la BIOS. Es una buena demostración, en vivo, de la
  pregunta 6.4 del entregable.
- **Transparencia de Ventoy.** Desde 2024 hay una incidencia abierta en su GitHub sobre ficheros
  binarios precompilados incluidos en el repositorio. El autor publicó en 2025 la lista de esos
  binarios con su origen y cómo compilarlos, y la incidencia sigue abierta. No es motivo para no
  usarlo en el aula, pero sí para verificar siempre la huella de la descarga, y un buen tema de
  debate sobre la confianza en el software libre.
- **Enlace con el resto del curso.** Esta práctica prepara la instalación de Arch y el bloque de copias de seguridad
  (Clonezilla/Rescuezilla). El pincho vale además como material del reto final.
