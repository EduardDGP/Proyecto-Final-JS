// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection,addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyAayWzPZF9fqmw-1aZregPxWY-rCVaReKo",

    authDomain: "js-prcrud.firebaseapp.com",

    databaseURL: "https://js-prcrud-default-rtdb.europe-west1.firebasedatabase.app",

    projectId: "js-prcrud",

    storageBucket: "js-prcrud.appspot.com",

    messagingSenderId: "1002204324745",

    appId: "1:1002204324745:web:a7a335994384cc93b03758"

};


// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Obtiene la referencia de la base de datos

try {
    await setPersistence(browserLocalPersistence);
} catch (err) {
    if (err.code == 'failed-precondition') {
        // Persistencia de datos no disponible
        console.error('Persistencia de datos no disponible');
    } else if (err.code == 'unimplemented') {
        // Navegador no compatible con la persistencia de Realtime Database
        console.error('Navegador no compatible con la persistencia de Realtime Database');
    }
}

// Obtiene el formulario de registro por su ID
const registerForm = document.getElementById("register-form");

// Obtiene la tabla de estudiantes por su ID
const studentTable = document.getElementById("student-table").getElementsByTagName('tbody')[0];

// Función para agregar un estudiante a la tabla
function agregarEstudianteATabla(estudiante) {
    const newRow = studentTable.insertRow(); // Inserta una nueva fila en la tabla
    const cellNum = newRow.insertCell(0);
    const cellNombre = newRow.insertCell(1);
    const cellApellido1 = newRow.insertCell(2);
    const cellApellido2 = newRow.insertCell(3);
    const cellTelefono = newRow.insertCell(4);
    const cellEmail = newRow.insertCell(5);
    const cellOpciones = newRow.insertCell(6);

    cellNum.textContent = studentTable.rows.length; // Asigna el número de fila
    cellNombre.textContent = estudiante.nombre;
    cellApellido1.textContent = estudiante.ape1;
    cellApellido2.textContent = estudiante.ape2;
    cellTelefono.textContent = estudiante.telef;
    cellEmail.textContent = estudiante.email;

    // Crea los botones de editar y eliminar
    const btnEditar = document.createElement("button");
    btnEditar.classList.add("btn", "btn-warning");
    btnEditar.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';
    cellOpciones.appendChild(btnEditar);

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn", "btn-danger");
    btnEliminar.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    cellOpciones.appendChild(btnEliminar);

    // Agrega event listeners a los botones
    btnEditar.addEventListener("click", () => {
        // Aquí puedes implementar la lógica para editar el estudiante
        console.log("Editar estudiante:", estudiante);
        // Puedes abrir un modal para editar los datos del estudiante aquí
    });

    btnEliminar.addEventListener("click", () => {
        // Aquí puedes implementar la lógica para eliminar el estudiante
        console.log("Eliminar estudiante:", estudiante);
        // Puedes eliminar el estudiante de la base de datos aquí
    });
}

// Función para registrar un nuevo estudiante
// Función para registrar un nuevo estudiante
async function registrarNuevoEstudiante() {
    try {
        // Obtiene la referencia a la colección "Students"
        const studentsCollectionRef = collection(db, "Students");

        // Guarda los datos del formulario en la base de datos
        await addDoc(studentsCollectionRef, {
            nombre: registerForm["nombre"].value,
            ape1: registerForm["apellido1"].value,
            ape2: registerForm["apellido2"].value,
            telef: registerForm["telefono"].value,
            email: registerForm["email"].value,
            desc: registerForm["descripcion"].value,
        });

        // Crea un objeto con los datos del estudiante
        const estudiante = {
            nombre: registerForm["nombre"].value,
            ape1: registerForm["apellido1"].value,
            ape2: registerForm["apellido2"].value,
            telef: registerForm["telefono"].value,
            email: registerForm["email"].value
        };

        // Agrega una nueva fila a la tabla con los datos del estudiante
        agregarEstudianteATabla(estudiante);

        // Cierra el modal después de registrar al estudiante
        const modal = new bootstrap.Modal(document.getElementById('registerModal'));
        modal.hide();
    } catch (error) {
        // Muestra una alerta en caso de error
        alert(error);
    }
}


// Añade un evento de escucha para el envío del formulario
registerForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita que el formulario se envíe normalmente
    registrarNuevoEstudiante(); // Llama a la función para registrar un nuevo estudiante
});