// Función para cargar los datos de admin_datos.txt
async function cargarDatos() {
    try {
        const response = await fetch("admin_datos.txt");
        const data = await response.json();
        return data; // Retorna los datos completos
    } catch (error) {
        console.error("Error al cargar los datos:", error);
        return null; // Si hay un error, retorna null
    }
}

// Validar correo electrónico
function validarCorreo(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

// Validar enlace de video
function validarEnlaceVideo(url) {
    const regex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[a-zA-Z0-9\-_]+)*\/?(\?[a-zA-Z0-9&=]+)?$/;
    return regex.test(url);
}

// Función para buscar alumno
async function buscarAlumno() {
    const nombre = document.getElementById("buscarAlumno").value.trim();
    const datos = await cargarDatos();
    if (!datos) return;

    const alumnoEncontrado = datos.usuarios.filter(a => a.nombre.toLowerCase().includes(nombre.toLowerCase()));
    mostrarResultadoBusqueda(alumnoEncontrado);
}

// Mostrar resultados de búsqueda
function mostrarResultadoBusqueda(alumnos) {
    const resultadosContainer = document.getElementById("resultadosAlumno");
    resultadosContainer.innerHTML = "";

    if (alumnos.length === 0) {
        resultadosContainer.innerHTML = "<p>No se encontró ningún alumno.</p>";
        return;
    }

    alumnos.forEach(alumno => {
        resultadosContainer.innerHTML += `
            <div>
                <p><strong>${alumno.nombre}</strong> - ${alumno.email}</p>
                <p>Clases: ${alumno.clases ? alumno.clases.join(", ") : "No inscrito en ninguna clase"}</p>
            </div>
        `;
    });
}

// Registrar avances
document.getElementById("registrarAvancesForm")?.addEventListener("submit", async function (e) {
    e.preventDefault();
    const alumnoEmail = document.getElementById("alumno").value;
    const avance = document.getElementById("avance").value;

    if (!alumnoEmail || !avance) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    const datos = await cargarDatos();
    const alumno = datos.usuarios.find(a => a.email === alumnoEmail);
    if (!alumno) {
        alert("Alumno no encontrado.");
        return;
    }

    if (!verificarPago(alumno)) {
        alert("Este alumno no tiene el pago al corriente. No puede registrar avances.");
        return;
    }

    if (!alumno.avances) {
        alumno.avances = [];
    }
    alumno.avances.push(avance);

    await guardarDatos(datos);
    document.getElementById("estadoAvance").textContent = `Avance registrado para ${alumno.nombre}: ${avance}`;
    alert(`Avance registrado para ${alumno.nombre}: ${avance}`);
});

// Enviar recomendaciones
document.getElementById("enviarRecomendacionForm")?.addEventListener("submit", async function (e) {
    e.preventDefault();
    const alumnoEmail = document.getElementById("alumnoRecomendacion").value;
    const recomendacion = document.getElementById("recomendacion").value;
    const enlaceVideo = document.getElementById("enlaceVideo").value;

    if (!alumnoEmail || !recomendacion) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    const datos = await cargarDatos();
    const alumno = datos.usuarios.find(a => a.email === alumnoEmail);
    if (!alumno) {
        alert("Alumno no encontrado.");
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

    if (!alumno.recomendaciones) {
        alumno.recomendaciones = [];
    }
    alumno.recomendaciones.push({ texto: recomendacion, enlaceVideo });

    await guardarDatos(datos);
    document.getElementById("estadoRecomendacion").textContent = `Recomendación enviada a ${alumno.nombre}. ${
        enlaceVideo ? "Incluye un enlace al video." : ""
    }`;
    alert(`Recomendación enviada a ${alumno.nombre}.`);
});

// Verificar si el alumno tiene pago realizado
function verificarPago(alumno) {
    return alumno.estadoPagos.some(p => p.estado === "Pagado");
}

// Guardar los datos en el archivo admin_datos.txt
async function guardarDatos(datos) {
    try {
        await fetch("admin_datos.txt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error("Error al guardar los datos:", error);
    }
}

// Cargar clases del profesor
async function cargarClases() {
    const datos = await cargarDatos();
    const tablaClases = document.getElementById("tablaClases");

    if (!datos || !tablaClases) return;

    const clasesHTML = datos.clases.map(clase => `
        <tr>
            <td>${clase.disciplina}</td>
            <td>${clase.horario}</td>
            <td>${clase.capacidad}</td>
        </tr>
    `).join("");

    tablaClases.innerHTML = clasesHTML;
}

// Función para mostrar los alumnos con su información de clases
async function mostrarAlumnosConClases() {
    const datos = await cargarDatos();
    const listaAlumnosContainer = document.getElementById("listaAlumnos");

    if (!datos || !listaAlumnosContainer) return;

    const listaAlumnos = datos.usuarios.filter(usuario => usuario.rol === "alumno").map(alumno => {
        const clases = alumno.clases ? alumno.clases.join(", ") : "No inscrito en ninguna clase";
        return `
            <div>
                <p><strong>${alumno.nombre}</strong> - ${alumno.email}</p>
                <p>Clases: ${clases}</p>
            </div>
        `;
    });

    listaAlumnosContainer.innerHTML = listaAlumnos.join("");
}

// Llamada inicial para cargar las estadísticas de clases
window.onload = async function () {
    await cargarClases();
    await mostrarAlumnosConClases();
};

// Cerrar sesión
document.getElementById("logoutButton").addEventListener("click", () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("rol");
    window.location.href = "index.html";
});