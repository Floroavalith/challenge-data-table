A javascript challenge.


Test
IMPORTANTE:
Crear un repositorio público GIT en alguna plataforma uccloud como ser github, bitbucket, gitlab o alguna
de su preferencia. En dicho repositorio dejar el código fuente de lo desarrollado para su revisión.
Una vez finalizado el test envíanos la URL junto con un pequeño instructivo de como instalarlo
localmente (Esto puede ser mediante un archivo README.md)
Utilizar https://jsonplaceholder.typicode.com como API.
Para el front hay que implementar una solución en JavaScript puro.
Para la construcción de la UI es recomendable implementar esta librería de Bootstrap en su última versión.
Requerimiento Home
Realizar el desarrollo de un data-table listando la información de los usuarios fake generados en la API antes mencionada teniendo en cuenta que:
El data-table debe tener un cuadro de búsqueda por nombre de usuario.
El data table debe mostrar toda la información de cada contacto.
El data-table debe tener un botón de delete, para eliminar un contacto existente.
El data-table debe tener un botón de create, para agregar un nuevo contacto.
Requerimiento Form de creación
Realizar el desarrollo de un formulario de registro para contactos con los siguientes campos (Nombre,
Apellido, Email, Fecha de nacimiento, País y Teléfono) teniendo en cuenta que:
Todos los campos son requeridos
El campo Email hay que validarlo con una expresión regular
El campo País debe ser un campo Autocomplete el cual debe levantar la información de
https://restcountries.eu/
El campo Teléfono se debe validar usando la libreria https://github.com/googlei18n/libphonenumber
Hay que validar y agregar los mensajes de error a todos los campos del formulario, validando cada
campo a campo en el focus out y al hacer submit del form.
