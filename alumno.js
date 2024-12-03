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
            <p><strong>Fecha de Nacimiento:</strong> ${this.fechaNacimiento}</p> <!-- Solo mostramos la fecha de nacimiento -->
        `;
    }

    // Editar perfil
    editarPerfil(campo, nuevoValor) {
        if (["telefono", "disciplinasPrevias", "descripcionDisciplinas", "fechaNacimiento"].includes(campo)) {
            if (campo === "fechaNacimiento") {
                this[campo] = nuevoValor;
                alert("Fecha de nacimiento actualizada exitosamente.");
            } else if (campo === "disciplinasPrevias") {
                this[campo] = nuevoValor.split(","); // Se asume que las disciplinas se ingresan separadas por comas
                alert("Disciplinas actualizadas exitosamente.");
            } else {
                this[campo] = nuevoValor;
                alert(`${campo} actualizado exitosamente.`);
            }
        } else {
            alert("Este campo no puede ser editado.");
        }
    }

    // Consultar recomendaciones
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

    // Otros métodos para gestionar pago y subir certificado siguen igual...
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
            const opciones = ["telefono", "disciplinasPrevias", "descripcionDisciplinas", "fechaNacimiento"];
            const campo = prompt(`¿Qué campo deseas editar? Opciones: ${opciones.join(", ")}`);
            
            if (!opciones.includes(campo)) {
                alert("Campo inválido.");
                return;
            }

            let nuevoValor;
            if (campo === "fechaNacimiento") {
                nuevoValor = prompt("Ingresa la nueva fecha de nacimiento (en formato YYYY-MM-DD):");
                if (nuevoValor) {
                    alumno.editarPerfil(campo, nuevoValor);
                    document.getElementById("perfilAlumno").innerHTML = `
                        <p><strong>Fecha de Nacimiento:</strong> ${nuevoValor}</p>
                    `;
                }
            } else if (campo === "disciplinasPrevias") {
                nuevoValor = prompt("Ingresa las nuevas disciplinas, separadas por comas:");
                if (nuevoValor) {
                    alumno.editarPerfil(campo, nuevoValor);
                }
            } else {
                nuevoValor = prompt(`Ingresa el nuevo valor para ${campo}:`);
                if (nuevoValor) {
                    alumno.editarPerfil(campo, nuevoValor);
                }
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