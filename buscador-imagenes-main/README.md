## Buscador de imágenes

Se trata de desarrollar un ejemplo de buscador de imágenes en el servicio Unsplash. Tendrás que registrarte como desarrollador/a y leer la documentación que tienes aquí: https://unsplash.com/documentation

### Indicaciones

- La aplicación tiene la estructura habitual de una aplicación Vanilla JS. Puedes descargarte los archivos necesarios (HTML y CSS) aquí:

#### Desarrollo de la app JS

Más o menos tendrás que seguir estos pasos:

- Definir los enlaces principales con el DOM
- Encierra el loop principal de la aplicación en un bloque `windows.onload`, como ya has hecho en otras ocasiones
- El loop principal es sencillo:
  - Leer el formulario de búsqueda
  - Gestionar el evento Submit
  - Gestionar el paso de la paginación

#### Funciones auxiliares

El script necesita de algunas funciones auxiliares:

- Una función que valide el formulario (No puede mandarse un texto vacío)
- Una función que gestione la alerta cuando no se valide el formulario
- Una función que busca las imágenes usando la API
  - En la API usar los patrones `fetch` o `Async/await`
  - Estudia bien la documentación de la API para ver como tienes que hacer la petición
  - Revisar las propiedades del objeto JSON para ver con cuáles tenemos que quedarnos: Principalmente el enlace a la imagen, autor, o número de visualizaciones
  - El resultado de esta función tendrá que ser llamar a la función que muestra las imágenes
- Una función que muestre las imágenes. Cada imagen debe mostrar el autor y el número de visualizaciones al menos
- Una función que gestione la paginación

