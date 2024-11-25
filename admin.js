// Simulación de datos para el administrador
const datosAdmin = {
    alumnos: [
        { nombre: "Juan Pérez", edad: 25, email: "juan.perez@example.com" },
        { nombre: "Ana Gómez", edad: 22, email: "ana.gomez@example.com" }
    ],
    profesores: [
        { nombre: "Laura Rodríguez", especialidad: "Yoga", email: "laura.rodriguez@example.com" },
        { nombre: "Carlos Martínez", especialidad: "Danza", email: "carlos.martinez@example.com" }
    ],
    clases: [
        { clase: "Yoga", horario: "10:00 AM - 11:00 AM", cupos: 10 },
        { clase: "Danza", horario: "12:00 PM - 1:00 PM", cupos: 8 }
    ],
    pagos: [
        { alumno: "Juan Pérez", mes: "Enero", estado: "Pagado" },
        { alumno: "Ana Gómez", mes: "Febrero", estado: "Pendiente" }
    ]
};

// Gestión de alumnos
function cargarListaAlumnos() {
    const listaAlumnos = document.getElementById("listaAlumnos");
    listaAlumnos.innerHTML = datosAdmin.alumnos
        .map(
            alumno =>
                `<div>
                    <p><strong>${alumno.nombre}</strong> - ${alumno.email}</p>
                    <button onclick="editarAlumno('${alumno.nombre}')">Editar</button>
                    <button onclick="eliminarAlumno('${alumno.nombre}')">Eliminar</button>
                </div>`
        )
        .join("");
}
document.addEventListener("DOMContentLoaded", function () {
    // Vincula el botón de "Registrar Alumno" con la función
    document.getElementById("registrarAlumno").addEventListener("click", registrarAlumno);
});

function registrarAlumno() {
    // Datos del alumno
    let alumno = {};

    alumno.nombre = prompt("Ingrese el nombre del alumno:");
    alumno.apellidos = prompt("Ingrese los apellidos del alumno:");
    alumno.edad = parseInt(prompt("Ingrese la edad del alumno:"));
    alumno.disciplinasPrevias = prompt("Ingrese las disciplinas practicadas previamente (ejem. artes marciales, yoga, danza, etc.):");
    alumno.domicilio = prompt("Ingrese el domicilio del alumno:");
    alumno.telefono = prompt("Ingrese el teléfono del alumno:");
    alumno.email = prompt("Ingrese el email del alumno:");
    alumno.fechaNacimiento = prompt("Ingrese la fecha de nacimiento (YYYY-MM-DD):");
    alumno.lugarNacimiento = prompt("Ingrese el lugar de nacimiento del alumno:");
    alumno.peso = parseFloat(prompt("Ingrese el peso del alumno en kg:"));
    alumno.estatura = parseFloat(prompt("Ingrese la estatura del alumno en metros:"));
    alumno.esEstudiante = confirm("¿El alumno es estudiante?");

    if (alumno.esEstudiante) {
        alumno.nivelEstudios = prompt("Ingrese el nivel de estudios (primaria, secundaria, licenciatura, etc.):");
        alumno.lugarEstudios = prompt("¿Dónde estudia?");
        alumno.queEstudia = prompt("¿Qué estudia?");
    }

    alumno.profesion = prompt("Ingrese la profesión del alumno:");
    alumno.lugarTrabajo = prompt("Ingrese el lugar donde ejerce su profesión:");
    alumno.puesto = prompt("Ingrese el puesto que desempeña:");
    alumno.gradoMaximoEstudios = prompt("Ingrese el grado máximo de estudios alcanzado:");

    alumno.problemasSalud = confirm("¿Padece algún problema de salud?");
    if (alumno.problemasSalud) {
        alumno.detallesSalud = prompt("Describa el problema de salud:");
    }

    alumno.razonesPractica = prompt("¿Por qué desea practicar esta disciplina? (aspiraciones):");
    alumno.fechaIngreso = prompt("Ingrese la fecha de ingreso (YYYY-MM-DD):");
    alumno.horarioClase = prompt("Ingrese el horario de clase (ejem. 6:00 PM - 8:00 PM):");
    alumno.disciplina = prompt("Ingrese la disciplina que practicará:");

    // Datos administrativos
    alumno.deslindeFirmado = confirm("¿Se ha firmado el deslinde de responsabilidades?");
    if (alumno.edad < 18) {
        alumno.deslindeTutor = confirm("¿El deslinde fue firmado por un padre o tutor?");
    }

    alumno.certificadoMedico = confirm("¿El estudiante proporcionó un certificado médico digitalizado?");
    alumno.tipoPago = prompt("¿El pago será mensual, por clase o paquete?");
    alumno.vigenciaPago = prompt("Ingrese la fecha de vencimiento del paquete/clase (YYYY-MM-DD):");
    alumno.reservaPrevia = confirm("¿El estudiante deberá reservar sus clases con anticipación?");

    // Agregar el nuevo alumno al sistema
    datosAdmin.alumnos.push(alumno);
    cargarListaAlumnos(); // Actualizar la lista
    alert("Registro completado para el alumno: " + alumno.nombre + " " + alumno.apellidos);
}

function editarAlumno(nombre) {
    alert(`Editar datos del alumno: ${nombre}`);
}

function eliminarAlumno(nombre) {
    datosAdmin.alumnos = datosAdmin.alumnos.filter(alumno => alumno.nombre !== nombre);
    cargarListaAlumnos();
}

// Gestión de profesores
function cargarListaProfesores() {
    const listaProfesores = document.getElementById("listaProfesores");
    listaProfesores.innerHTML = datosAdmin.profesores
        .map(
            profesor =>
                `<div>
                    <p><strong>${profesor.nombre}</strong> (${profesor.especialidad}) - ${profesor.email}</p>
                    <button onclick="editarProfesor('${profesor.nombre}')">Editar</button>
                    <button onclick="eliminarProfesor('${profesor.nombre}')">Eliminar</button>
                </div>`
        )
        .join("");
}

function registrarProfesor() {
    alert("Función para registrar profesores aún en desarrollo.");
}

function editarProfesor(nombre) {
    alert(`Editar datos del profesor: ${nombre}`);
}

function eliminarProfesor(nombre) {
    datosAdmin.profesores = datosAdmin.profesores.filter(profesor => profesor.nombre !== nombre);
    cargarListaProfesores();
}

// Gestión de clases
function cargarListaClases() {
    const listaClases = document.getElementById("listaClases");
    listaClases.innerHTML = datosAdmin.clases
        .map(
            clase =>
                `<div>
                    <p><strong>${clase.clase}</strong> - ${clase.horario} - Cupos: ${clase.cupos}</p>
                    <button onclick="editarClase('${clase.clase}')">Editar</button>
                    <button onclick="eliminarClase('${clase.clase}')">Eliminar</button>
                </div>`
        )
        .join("");
}

function crearClase() {
    alert("Función para crear clases aún en desarrollo.");
}

function editarClase(clase) {
    alert(`Editar datos de la clase: ${clase}`);
}

function eliminarClase(clase) {
    datosAdmin.clases = datosAdmin.clases.filter(c => c.clase !== clase);
    cargarListaClases();
}

// Gestión de pagos
function cargarPagos() {
    const tablaPagos = document.getElementById("tablaPagos");
    tablaPagos.innerHTML = datosAdmin.pagos
        .map(
            pago =>
                `<tr>
                    <td>${pago.alumno}</td>
                    <td>${pago.mes}</td>
                    <td>${pago.estado}</td>
                </tr>`
        )
        .join("");
}

// Gráfico de estadísticas
function mostrarEstadisticas() {
    const ctx = document.getElementById('graficoEstadisticas').getContext('2d');
    const grafico = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Alumnos', 'Profesores', 'Clases', 'Pagos'],
            datasets: [{
                label: 'Estadísticas',
                data: [datosAdmin.alumnos.length, datosAdmin.profesores.length, datosAdmin.clases.length, datosAdmin.pagos.length],
                backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A6'],
                borderColor: ['#C70039', '#4CAF50', '#1976D2', '#F44336'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Cargar todo al cargar la página
window.onload = function() {
    cargarListaAlumnos();
    cargarListaProfesores();
    cargarListaClases();
    cargarPagos();
    mostrarEstadisticas();
}