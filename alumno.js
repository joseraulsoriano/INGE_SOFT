// Simulación de datos del alumno
const datosAlumno = {
    nombre: "Juan Pérez",
    edad: 25,
    disciplinasPrevias: ["Yoga", "Danza"],
    email: "juan.perez@example.com",
    telefono: "1234567890",
    aspiraciones: "Mejorar mi condición física",
    matricula: "2023456", // Matricula asociada al alumno
    estadoPagos: [
        { mes: "Enero", monto: "$500", estado: "Pagado" },
        { mes: "Febrero", monto: "$500", estado: "Pendiente" },
        { mes: "Marzo", monto: "$500", estado: "Pagado" }
    ],
    recomendaciones: [
        { fecha: "2024-11-20", texto: "Mejorar posturas en Yoga" },
        { fecha: "2024-11-22", texto: "Practicar técnicas de respiración" }
    ],
    reservas: 3 // Número de reservas realizadas
};

// Cargar perfil del alumno
function cargarPerfil() {
    const perfilContainer = document.getElementById("perfilAlumno");
    perfilContainer.innerHTML = `
        <p><strong>Nombre:</strong> ${datosAlumno.nombre}</p>
        <p><strong>Edad:</strong> ${datosAlumno.edad}</p>
        <p><strong>Disciplinas Previas:</strong> ${datosAlumno.disciplinasPrevias.join(", ")}</p>
        <p><strong>Email:</strong> ${datosAlumno.email}</p>
        <p><strong>Teléfono:</strong> ${datosAlumno.telefono}</p>
        <p><strong>Aspiraciones:</strong> ${datosAlumno.aspiraciones}</p>
        <p><strong>Matricula:</strong> ${datosAlumno.matricula}</p> <!-- Aquí está la matrícula -->
    `;
}

// Esperar a que el DOM esté completamente cargado para llamar a cargarPerfil
document.addEventListener("DOMContentLoaded", function () {
    cargarPerfil();
});

// Editar perfil (simulación)
document.getElementById("editarPerfil")?.addEventListener("click", function () {
    alert("Función para editar perfil aún en desarrollo.");
});

// Reservar clase
document.getElementById("reservarClaseForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const clase = document.getElementById("clase").value;

    // Verificar si las reservas no han pasado más de 5 veces
    if (datosAlumno.reservas < 5) {
        datosAlumno.reservas++;
        document.getElementById("estadoReserva").textContent = `Clase de ${clase} reservada exitosamente.`;
    } else {
        document.getElementById("estadoReserva").textContent = "Espacio no disponible, clase llena.";
    }
});

// Consultar recomendaciones
document.getElementById("consultarRecomendaciones").addEventListener("click", function () {
    const contenedorRecomendaciones = document.getElementById("recomendaciones");
    
    // Verificar si hay recomendaciones
    if (datosAlumno.recomendaciones.length === 0) {
        contenedorRecomendaciones.innerHTML = "<p>No hay recomendaciones disponibles.</p>";
    } else {
        contenedorRecomendaciones.innerHTML = datosAlumno.recomendaciones
            .map(rec => `<p><strong>${rec.fecha}:</strong> ${rec.texto}</p>`)
            .join("");
        
        // Si hay más de dos recomendaciones, mostrar el botón
        if (datosAlumno.recomendaciones.length > 2) {
            document.getElementById("mostrarRecomendacionesButton").style.display = "block";
        }
    }
});

// Historial de pagos
function cargarHistorialPagos() {
    const tablaPagos = document.getElementById("tablaPagos");
    tablaPagos.innerHTML = datosAlumno.estadoPagos
        .map(
            pago =>
                `<tr>
                    <td>${pago.mes}</td>
                    <td>${pago.monto}</td>
                    <td>${pago.estado}</td>
                </tr>`
        )
        .join("");
}

// Subir certificado médico
document.getElementById("subirCertificadoForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const certificado = document.getElementById("certificado").files[0];
    if (certificado) {
        // Aquí podrías manejar la carga real del archivo
        alert("Documento subido exitosamente.");
    } else {
        alert("Por favor, seleccione un archivo.");
    }
});

// Cerrar sesión
document.getElementById("logoutButton").addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "index.html";
});