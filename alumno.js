// Clase Alumno
class Alumno {
    constructor(datos) {
        Object.assign(this, datos);
    }

    // Método para cargar el perfil del alumno
    cargarPerfil() {
        const perfilContainer = document.getElementById("perfilAlumno");
        if (perfilContainer) {
            perfilContainer.innerHTML = `
                <p><strong>Nombre:</strong> ${this.nombre}</p>
                <p><strong>Nivel de Estudio:</strong> ${this.nivelEstudio}</p>
                <p><strong>Donde Estudia:</strong> ${this.dondeEstudia}</p>
                <p><strong>Qué Estudia:</strong> ${this.queEstudia}</p>
                <p><strong>Interés de Disciplina:</strong> ${this.interesDisciplina}</p>
                <p><strong>Disciplinas Previas:</strong> ${this.disciplinasPrevias.join(", ")}</p>
                <p><strong>Teléfono:</strong> ${this.telefono}</p>
                <p><strong>Fecha de Nacimiento:</strong> ${this.fechaNacimiento}</p>
                <p><strong>Domicilio:</strong> ${this.domicilio}</p>
                <p><strong>Lugar de Nacimiento:</strong> ${this.lugarNacimiento}</p>
                <p><strong>Peso:</strong> ${this.peso} kg</p>
                <p><strong>Altura:</strong> ${this.altura} cm</p>
            `;
        } else {
            console.error("No se encontró el contenedor del perfil del alumno.");
        }
    }

    // Método para consultar recomendaciones
    consultarRecomendaciones() {
        const contenedor = document.getElementById("recomendaciones");
        if (this.estadoPagos.some(p => p.estado === "Pendiente")) {
            contenedor.innerHTML = `<p>Acceso Denegado: Regularice sus pagos.</p>`;
        } else if (this.recomendaciones.length === 0) {
            contenedor.innerHTML = `<p>De momento no cuentas con ninguna recomendación.</p>`;
        } else {
            contenedor.innerHTML = this.recomendaciones
                .map(rec => `
                    <div>
                        <p><strong>Fecha:</strong> ${rec.fecha}</p>
                        <p>${rec.texto}</p>
                    </div>
                `)
                .join("");
        }
    }

    // Método para editar perfil
    editarPerfil(campo, nuevoValor) {
        if (["nivelEstudio", "dondeEstudia", "queEstudia", "interesDisciplina", "disciplinasPrevias", "telefono"].includes(campo)) {
            this[campo] = campo === "disciplinasPrevias" ? nuevoValor.split(",") : nuevoValor;
            alert(`${campo} actualizado exitosamente.`);
        } else {
            alert("Este campo no puede ser editado.");
        }
    }
}

// Función para cargar los datos desde la base de datos
async function cargarDatosAlumno() {
    try {
        const response = await fetch("base_datos.txt");
        const data = await response.json();

        if (data.alumnos && data.alumnos.length > 0) {
            const alumno = new Alumno(data.alumnos[0]);

            document.addEventListener("DOMContentLoaded", () => alumno.cargarPerfil());

            document.getElementById("consultarRecomendaciones").addEventListener("click", () => {
                alumno.consultarRecomendaciones();
            });

            document.getElementById("editarPerfil").addEventListener("click", () => {
                const campo = prompt("¿Qué campo deseas editar?");
                const nuevoValor = prompt("Ingresa el nuevo valor:");
                if (campo && nuevoValor) {
                    alumno.editarPerfil(campo, nuevoValor);
                }
            });
        } else {
            console.error("No se encontraron datos de alumnos.");
        }
    } catch (error) {
        console.error("Error al cargar los datos del alumno:", error);
    }
}

cargarDatosAlumno();