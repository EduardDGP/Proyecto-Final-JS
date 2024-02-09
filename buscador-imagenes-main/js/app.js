// Definir enlaces principales con el DOM
window.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
    formulario.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evitar el envío del formulario por defecto
        const terminoBusqueda = document.getElementById('termino').value;
        if (terminoBusqueda.trim() !== '') { // Validar que el campo de búsqueda no esté vacío
            try {
                const imagenes = await buscarImagenes(terminoBusqueda);
                mostrarImagenes(imagenes);
            } catch (error) {
                mostrarAlerta('Error al buscar imágenes');
            }
        } else {
            mostrarAlerta('Por favor, ingresa un término de búsqueda.');
        }
    });
});

// Función para buscar imágenes usando la API de Unsplash
const buscarImagenes = async (termino) => {
    const API_KEY = 'ZrJ464vFRcyMUVuMvPjgJQVU8JDvG_eEeeVbpO8vRZA'; // Tu clave de API de Unsplash
    const URL = `https://api.unsplash.com/search/photos?query=${termino}&client_id=${API_KEY}`;
    
    try {
        const response = await fetch(URL);
        if (response.ok) {
            const data = await response.json();
            return data.results;
        } else {
            throw new Error('Error al buscar imágenes');
        }
    } catch (error) {
        throw error;
    }
}

// Función para mostrar las imágenes en el DOM
const mostrarImagenes = (imagenes) => {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
    imagenes.forEach(imagen => {
        const { urls, user, views } = imagen;
        const imagenElemento = document.createElement('div');
        imagenElemento.innerHTML = `
            <img src="${urls.small}" alt="${user.username}" class="w-64 h-64 object-cover">
            <div class="mt-2 text-white">
                <p>Autor: ${user.username}</p>
                <p>Visualizaciones: ${views}</p>
            </div>
        `;
        resultado.appendChild(imagenElemento);
    });
}

// Función para mostrar una alerta
const mostrarAlerta = (mensaje) => {
    alert(mensaje);
}
