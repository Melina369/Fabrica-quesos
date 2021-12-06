# Fabrica-quesos

Guía de Inicialización del proyecto

1.	Para iniciar el proyecto, se necesitan los siguientes requisitos de instalación: Node.js y MongoDB.
2.	Una vez instalado, dirigirse a la carpeta del proyecto mediante la terminal:
 
3.	Luego, ejecutar el comando npm run dev para correr el programa:
 
4.	Se debe importar la base de datos manualmente, de lo contrario, el programa no funcionará.
Para esto, creamos la carpeta “schemas” donde se encuentran, que se encuentra en la raíz del programa principal para importar los archivos json.
Hicimos un video tutorial que muestra como importarlos:
https://drive.google.com/file/d/1RGarZ85a4uSXjbSgDmhd_aY97etP1KAE/view?usp=sharing

La explicación del video es:
Gracias a la configuración del programa, las colecciones de bases de datos que necesitamos se crean automáticamente pero vacías, por lo que debemos importar los datos. Seleccionamos “Import file”, seleccionan nuestra carpeta “schemas” y elijan el archivo que corresponde al nombre de la colección (Ejemplo, en el caso de curados, debemos seleccionar el archivo que dice “curados”) e importarlo. De todas estas colecciones, la más importarte es la de “users”, porque allí se encuentran los datos de ingreso al sistema (sin ellos, no se puede ingresar).

5.	Después de importar todos los datos, al refrescar la página, el sistema habrá almacenado los datos y podrá ingresar.
## de esta forma iniciamos el sistema. Si lo queremos implementar, tenemos una guía para eso en la carpeta, cuyo título es “Manual de Usuario del Proyecto”
##Para detener el proyecto, debe tocar el cmd de Windows y hacer “Control + C”
