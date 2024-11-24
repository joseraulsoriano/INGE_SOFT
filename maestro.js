// Función para validar correo electrónico
function validarCorreo(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

// Función para validar enlace de video
function validarEnlaceVideo(url) {
    const regex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[a-zA-Z0-9\-_]+)*\/?(\?[a-zA-Z0-9&=]+)?$/;
    return regex.test(url);
}

// Validar formulario de avance
document.getElementById("registrarAvancesForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const alumno = document.getElementById("alumno").value;
    const avance = document.getElementById("avance").value;
    if (!alumno || !avance) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    if (!verificarPago(alumno)) {
        alert("Este alumno no tiene el pago al corriente. No puede registrar avances.");
        return;
    }

    document.getElementById("estadoAvance").textContent = `Avance registrado para ${alumno}: ${avance}`;
});

// Validar formulario de recomendación
document.getElementById("enviarRecomendacionForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const alumno = document.getElementById("alumnoRecomendacion").value;
    const recomendacion = document.getElementById("recomendacion").value;
    const enlaceVideo = document.getElementById("enlaceVideo").value;

    if (!alumno || !recomendacion) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    if (!verificarPago(alumno)) {
        alert("Este alumno no tiene el pago al corriente. No puede recibir recomendaciones.");
        return;
    }

    if (enlaceVideo && !validarEnlaceVideo(enlaceVideo)) {
        alert("Por favor, ingrese un enlace de video válido.");
        return;
    }

    document.getElementById("estadoRecomendacion").textContent = `Recomendación enviada a ${alumno}. ${
        enlaceVideo ? "Incluye un enlace al video." : ""
    }`;
});

// Verificar si el alumno tiene pago realizado antes de registrar avances o enviar recomendaciones
function verificarPago(alumno) {
    const alumnoData = datosMaestro.alumnos.find(a => a.nombre === alumno);
    return alumnoData ? alumnoData.pagoRealizado : false;
}

// Cargar estadísticas de clases
function cargarEstadisticas() {
    const estadisticasContainer = document.getElementById("estadisticasClases");
    const estadisticas = datosMaestro.clases.map(clase => {
        const alumnosEnClase = datosMaestro.alumnos.filter(alumno => {
            // Suponiendo que cada clase tiene una propiedad "clase" asignada a cada alumno
            return alumno.clase === clase.clase;
        });

        return `
            <p>Clase: ${clase.clase} - Alumnos inscritos: ${alumnosEnClase.length} / ${clase.cupos}</p>
        `;
    });

    estadisticasContainer.innerHTML = estadisticas.join("");
}

// Datos iniciales del maestro
const datosMaestro = {
    clases: [
        { clase: "Yoga", horario: "10:00 AM - 11:00 AM", cupos: 5 },
        { clase: "Danza", horario: "12:00 PM - 1:00 PM", cupos: 3 },
        { clase: "Artes Marciales", horario: "4:00 PM - 5:00 PM", cupos: 2 }
    ],
    alumnos: [
        { nombre: "Juan Pérez", email: "juan.perez@example.com", cumpleanios: "2024-11-25", pagoRealizado: true },
        { nombre: "Ana Gómez", email: "ana.gomez@example.com", cumpleanios: "2024-12-01", pagoRealizado: false },
        { nombre: "Carlos Ruiz", email: "carlos.ruiz@example.com", cumpleanios: "2024-11-23", pagoRealizado: true }
    ]
};

// Cargar estadísticas de clases al inicio
window.onload = cargarEstadisticas;