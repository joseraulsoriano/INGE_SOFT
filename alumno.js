// Clase Alumno
class Alumno {
    constructor(datos) {
        Object.assign(this, datos);
    }

    // Método para cargar el perfil del alumno
    cargarPerfil() {
        const perfilContainer = document.getElementById("perfilAlumno");
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
                .map(
                    rec => `
                        <div class="recomendacion">
                            <p><strong>Fecha:</strong> ${rec.fecha}</p>
                            <p>${rec.texto}</p>
                        </div>
                    `
                )
                .join("");
        }
    }

    // Método para editar perfil
    editarPerfilFormulario(campo, nuevoValor) {
        if (["nivelEstudio", "dondeEstudia", "queEstudia", "interesDisciplina", "disciplinasPrevias", "telefono"].includes(campo)) {
            this[campo] = campo === "disciplinasPrevias" ? nuevoValor.split(",") : nuevoValor;
            alert(`${campo} actualizado exitosamente.`);
            this.cargarPerfil();
        } else {
            alert("Este campo no puede ser editado.");
        }
    }

    // Método para gestionar pagos
    gestionarPago(mes, monto) {
        const pago = this.estadoPagos.find(p => p.mes === mes);
        if (pago && pago.estado === "Pendiente") {
            pago.estado = "Pagado";
            alert("Pago registrado exitosamente.");
        } else {
            alert("No hay pagos pendientes para este mes.");
        }
    }
}

// Función para cargar los datos del alumno
async function cargarDatosAlumno() {
    try {
        const response = await fetch("base_datos.txt");
        if (!response.ok) {
            throw new Error(`Error al cargar base_datos.txt: ${response.statusText}`);
        }
        const data = await response.json();
        if (data.alumnos && data.alumnos.length > 0) {
            const alumno = new Alumno(data.alumnos[0]);

            document.addEventListener("DOMContentLoaded", () => {
                alumno.cargarPerfil();

                document.getElementById("consultarRecomendaciones").addEventListener("click", () => {
                    alumno.consultarRecomendaciones();
                });

                document.getElementById("editarPerfil").addEventListener("click", () => {
                    const campo = prompt("¿Qué campo deseas editar?");
                    const nuevoValor = prompt("Ingresa el nuevo valor:");
                    if (campo && nuevoValor) {
                        alumno.editarPerfilFormulario(campo, nuevoValor);
                    }
                });

                document.getElementById("gestionarPago").addEventListener("click", () => {
                    const mes = prompt("Ingrese el mes que desea pagar:");
                    const monto = parseFloat(prompt("Ingrese el monto a pagar:"));
                    if (mes && !isNaN(monto)) {
                        alumno.gestionarPago(mes, monto);
                    }
                });

                document.getElementById("logoutButton").addEventListener("click", () => {
                    window.location.href = "index.html"; // Redirige a la página de login
                });
            });
        } else {
            console.error("No se encontraron alumnos en la base de datos.");
        }
    } catch (error) {
        console.error("Error al cargar los datos del alumno:", error);
    }
}

// Llama a la función para cargar los datos
cargarDatosAlumno();