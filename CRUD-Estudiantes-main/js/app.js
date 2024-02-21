// Importación de la función initializeApp desde Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA7Pge-QF85I0doZKnHdE7zBG1BWsmXyfg",
    authDomain: "crud-js-394b8.firebaseapp.com",
    projectId: "crud-js-394b8",
    storageBucket: "crud-js-394b8.appspot.com",
    messagingSenderId: "260132245242",
    appId: "1:260132245242:web:6ae36a22b666d275af0343",
};

// Inicialización de la aplicación Firebase
const app = initializeApp(firebaseConfig);

// Importaciones de funciones de base de datos de Firebase
import {
    getDatabase,
    set,
    get,
    update,
    remove,
    ref,
    child,
    push,
    onValue
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Obtenemos una referencia a la base de datos
const db = getDatabase(app);

// Obtenemos referencia al formulario de registro
const registerForm = document.getElementById("register-form");

// Función asincrónica para registrar un nuevo estudiante
async function registrarNuevoEstudiante() {
    const newStudentRef = push(ref(db, "Students"));
    try {
        await set(newStudentRef, {
            nombre: registerForm["nombre"].value,
            ape1: registerForm["apellido1"].value,
            ape2: registerForm["apellido2"].value,
            telef: registerForm["telefono"].value,
            email: registerForm["email"].value,
            desc: registerForm["descripcion"].value,
        });
        alert("¡Nuevo estudiante registrado!");
    } catch (error) {
        alert(error);
    }
}

// Evento de escucha para el envío del formulario de registro
registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if(validarDatos(registerForm))
        registrarNuevoEstudiante();
});

// Obtención de referencia al formulario de edición
const editForm = document.getElementById("edit-form");

// Evento de escucha para el envío del formulario de edición
editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if(validarDatos(editForm))
        editarAlumno();
});

// Evento de escucha para cambios en los estudiantes en la base de datos
onValue(ref(db, "Students"), alumnos => {
    actualizarTabla(alumnos)
})

// Función para actualizar la tabla de estudiantes
function actualizarTabla(alumnos) {
    const tabla = document.getElementById("tabla");
    tabla.innerHTML = "";
    const alumnosJSON = alumnos.toJSON();
    for(const idAlumno in alumnosJSON) {
        const alumno = alumnosJSON[idAlumno];
        const fila = crearFila({...alumno, id: idAlumno});
        tabla.appendChild(fila);
    }
}

// Función para crear un botón
function crearBoton(tipoBoton, tipoIcono, funcionManejadora){
    const boton = document.createElement("button");
    boton.setAttribute("type", "button");
    boton.classList = `btn btn-${tipoBoton}`;
    const icono = document.createElement("i");
    icono.setAttribute("aria-hidden", "true");
    icono.classList = `fa fa-${tipoIcono}`;
    boton.appendChild(icono);
    boton.addEventListener("click", funcionManejadora);
    return boton;
}

// Función para crear una fila en la tabla de estudiantes
function crearFila ({nombre, ape1, ape2, telef, email, id, desc}) {
    const fila = document.createElement("tr");
    const campoId = document.createElement("th");    
    campoId.setAttribute("scope", "row");
    campoId.innerText = id;
    fila.appendChild(campoId);
    const campos = [nombre, ape1, ape2, telef, email];
    for(const campo of campos) {
        const insercion = document.createElement("td");
        insercion.innerText = campo;
        fila.appendChild(insercion);
    }

    const botonEditar = crearBoton("warning", "pencil", () => {
        editForm["nombre"].value = nombre
        editForm["apellido1"].value = ape1
        editForm["apellido2"].value = ape2
        editForm["telefono"].value = telef
        editForm["email"].value = email
        editForm["descripcion"].value = desc
        editForm["id"].value = id
    });

    const botonEliminar = crearBoton("danger", "trash", () => eliminarAlumno(id));

    botonEditar.setAttribute("data-bs-toggle","modal");
    botonEditar.setAttribute("data-bs-target","#editarModal");

    const botones = document.createElement("td");
    botones.classList = "btns";
    botones.appendChild(botonEditar);
    botones.appendChild(botonEliminar);
    fila.appendChild(botones);

    return fila;
}

// Función asincrónica para eliminar un estudiante
async function eliminarAlumno(id) {
    remove(ref(db, "Students/" + id))
}

// Función asincrónica para editar un estudiante
async function editarAlumno () {
    await update(ref(db, "Students/" + editForm["id"].value), {
        nombre: editForm["nombre"].value,
        ape1: editForm["apellido1"].value,
        ape2: editForm["apellido2"].value,
        telef: editForm["telefono"].value,
        email: editForm["email"].value,
        desc: editForm["descripcion"].value,
    });
    alert("¡El estudiante se ha editado!")
}

// Función para validar los datos del formulario
function validarDatos(form){
    if(!/[A-ZÀ-ÿa-z-,a-z. ']{0,20}/.test(form["nombre"].value))
        return alert("Nombre no es válido.");

    if(!/[A-ZÀ-ÿa-z-,a-z. ']{0,20}/.test(form["apellido1"].value))
        return alert("Apellido1 no es válido.");

    if(!/[A-ZÀ-ÿa-z-,a-z. ']{0,20}/.test(form["apellido2"].value))
        return alert("Apellido2 no es válido.");

    if(!/(6|7)[ -]*([0-9][ -]*){8}$/.test(form["telefono"].value))
        return alert("Telefono no es válido.");
    
    if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form["email"].value))
        return alert("Email no es válido.");
    
    return true;
}
