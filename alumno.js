class Alumno {
    constructor(datos) {
        this.nombre = datos.nombre;
        this.edad = datos.edad;
        this.nivelEstudio = datos.nivelEstudio;
        this.dondeEstudia = datos.dondeEstudia;
        this.queEstudia = datos.queEstudia;
        this.interesDisciplina = datos.interesDisciplina;
        this.disciplinasPrevias = datos.disciplinasPrevias;
        this.telefono = datos.telefono;
        this.matricula = datos.matricula;
        this.fechaNacimiento = datos.fechaNacimiento;
        this.estadoPagos = datos.estadoPagos;
        this.recomendaciones = datos.recomendaciones;
        this.reservas = datos.reservas;
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
        `;
    }

    // Método para editar perfil
    editarPerfil(campo, nuevoValor) {
        if (["nivelEstudio", "dondeEstudia", "queEstudia", "interesDisciplina", "disciplinasPrevias", "telefono", "fechaNacimiento"].includes(campo)) {
            if (campo === "disciplinasPrevias") {
                this[campo] = nuevoValor.split(","); // Asumimos que las disciplinas se ingresan separadas por comas
                alert("Disciplinas actualizadas exitosamente.");
            } else {
                this[campo] = nuevoValor;
                alert(`${campo} actualizado exitosamente.`);
            }
        } else {
            alert("Este campo no puede ser editado.");
        }
    }

    // Método para consultar recomendaciones
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

    // Método para gestionar pagos
    gestionarPago(mes) {
        const pago = this.estadoPagos.find(p => p.mes === mes);
        if (pago && pago.estado === "Pendiente") {
            pago.estado = "Pagado";
            alert("Pago registrado exitosamente.");
        } else {
            alert("No hay pagos pendientes para este mes.");
        }
    }
}

// Función para cargar los datos del alumno desde la base de datos simulada
async function cargarDatosAlumno() {
    try {
        // Cargar el archivo base_datos.txt
        const response = await fetch("base_datos.txt");
        const data = await response.json();

        // Verificar si los datos existen
        if (data.alumnos && data.alumnos.length > 0) {
            const datosAlumno = data.alumnos[0]; // Suponemos un solo alumno
            const alumno = new Alumno(datosAlumno);

            // Inicializa las funcionalidades
            document.addEventListener("DOMContentLoaded", () => alumno.cargarPerfil());

            // Manejo de eventos
            document.getElementById("consultarRecomendaciones").addEventListener("click", () => {
                alumno.consultarRecomendaciones();
            });

            document.getElementById("editarPerfil").addEventListener("click", () => {
                const opciones = ["nivelEstudio", "dondeEstudia", "queEstudia", "interesDisciplina", "disciplinasPrevias", "telefono", "fechaNacimiento"];
                const campo = prompt(`¿Qué campo deseas editar? Opciones: ${opciones.join(", ")}`);
                
                if (!opciones.includes(campo)) {
                    alert("Campo inválido.");
                    return;
                }

                let nuevoValor;
                if (campo === "disciplinasPrevias") {
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
        } else {
            console.error("No se encontraron datos de alumnos.");
        }
    } catch (error) {
        console.error("Error al cargar los datos del alumno:", error);
    }
}

// Llama a la función para cargar los datos
cargarDatosAlumno();