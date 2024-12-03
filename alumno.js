class Alumno {
    constructor(datos) {
        Object.assign(this, datos); // Asigna las propiedades desde los datos cargados
    }

    cargarPerfil() {
        const perfilContainer = document.getElementById("perfilAlumno");
        perfilContainer.innerHTML = `
            <p><strong>Nombre:</strong> ${this.nombre}</p>
            <p><strong>Email:</strong> ${this.email}</p>
            <p><strong>Teléfono:</strong> ${this.telefono}</p>
            <p><strong>Disciplinas Previas:</strong> ${this.disciplinasPrevias.join(", ")}</p>
        `;
    }

    consultarRecomendaciones() {
        const contenedor = document.getElementById("recomendaciones");
        const tienePagosPendientes = this.estadoPagos.some(p => p.estado === "Pendiente");

        if (tienePagosPendientes) {
            contenedor.innerHTML = `<p>Acceso denegado: Regularice sus pagos.</p>`;
        } else {
            contenedor.innerHTML = this.recomendaciones.length
                ? this.recomendaciones
                      .map(rec => `<p><strong>${rec.fecha}:</strong> ${rec.texto}</p>`)
                      .join("")
                : "<p>No hay recomendaciones disponibles.</p>";
        }
    }

    editarPerfil(campo, nuevoValor) {
        if (campo in this) {
            this[campo] = nuevoValor;
            alert(`${campo} actualizado exitosamente.`);
        } else {
            alert("Campo inválido.");
        }
    }

    gestionarPago(mes) {
        const pago = this.estadoPagos.find(p => p.mes === mes);
        if (pago && pago.estado === "Pendiente") {
            pago.estado = "Pagado";
            alert("Pago registrado exitosamente.");
        } else {
            alert("No hay pagos pendientes para este mes.");
        }
    }

    subirCertificado(certificado) {
        if (certificado) {
            alert(`Certificado ${certificado.name} subido exitosamente.`);
        } else {
            alert("Por favor, seleccione un archivo válido.");
        }
    }
}

// Cargar datos desde la base simulada
async function cargarDatosAlumno() {
    try {
        const response = await fetch("base_datos.txt");
        const data = await response.json();

        // Crea una instancia del alumno
        const datosAlumno = data.alumnos[0]; // Suponemos un solo alumno
        const alumno = new Alumno(datosAlumno);

        // Inicializa las funcionalidades
        document.addEventListener("DOMContentLoaded", () => alumno.cargarPerfil());

        document.getElementById("consultarRecomendaciones").addEventListener("click", () => {
            alumno.consultarRecomendaciones();
        });

        document.getElementById("subirCertificadoForm").addEventListener("submit", e => {
            e.preventDefault();
            const certificado = document.getElementById("certificado").files[0];
            alumno.subirCertificado(certificado);
        });

        document.getElementById("editarPerfil").addEventListener("click", () => {
            const campo = prompt("¿Qué campo deseas editar? (e.g., nombre, email)");
            const nuevoValor = prompt("Ingresa el nuevo valor:");
            if (campo && nuevoValor) {
                alumno.editarPerfil(campo, nuevoValor);
            }
        });

        document.getElementById("gestionarPago").addEventListener("click", () => {
            const mes = prompt("Ingrese el mes del pago a gestionar:");
            if (mes) {
                alumno.gestionarPago(mes);
            }
        });
    } catch (error) {
        console.error("Error al cargar los datos del alumno:", error);
    }
}

// Llama a la función para cargar los datos
cargarDatosAlumno();