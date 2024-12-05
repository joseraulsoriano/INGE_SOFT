// Clase Alumno
class Alumno {
    constructor(datos) {
        this.fechaNacimiento = datos.fechaNacimiento;
        this.domicilio = datos.domicilio;
        this.lugarNacimiento = datos.lugarNacimiento;
        this.peso = datos.peso;
        this.altura = datos.altura;
        this.nombre = datos.nombre;
        this.edad = datos.edad;
        this.nivelEstudio = datos.nivelEstudio;
        this.dondeEstudia = datos.dondeEstudia;
        this.queEstudia = datos.queEstudia;
        this.interesDisciplina = datos.interesDisciplina;
        this.disciplinasPrevias = datos.disciplinasPrevias;
        this.telefono = datos.telefono;
        this.matricula = datos.matricula;
    
        this.estadoPagos = datos.estadoPagos;
        this.recomendaciones = datos.recomendaciones;
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

    // Método para consultar recomendaciones
    consultarRecomendaciones() {
        const contenedor = document.getElementById("recomendaciones");
        const tienePagosPendientes = this.estadoPagos.some(p => p.estado === "Pendiente");

        if (tienePagosPendientes) {
            contenedor.innerHTML = `<p>Acceso Denegado: Favor de regularizar sus pagos.</p>`;
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

// Función asíncrona para cargar los datos del alumno
async function cargarDatosAlumno() {
    try {
        // Cargar el archivo base_datos.txt
        const response = await fetch("base_datos.txt");
        const data = await response.json();

        if (data.alumnos && data.alumnos.length > 0) {
            const datosAlumno = data.alumnos[0]; // Suponemos un solo alumno en la base de datos
            const alumno = new Alumno(datosAlumno);

            // Inicializar funcionalidades
            document.addEventListener("DOMContentLoaded", () => alumno.cargarPerfil());

            // Manejo de eventos para botones
            document.getElementById("consultarRecomendaciones").addEventListener("click", () => {
                alumno.consultarRecomendaciones();
            });

            // Evento de editar perfil
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
                } else {
                    nuevoValor = prompt(`Ingresa el nuevo valor para ${campo}:`);
                }

                if (nuevoValor) {
                    alumno.editarPerfil(campo, nuevoValor);
                }
            });

            // Manejo del botón para gestionar pagos
            document.getElementById("gestionarPago").addEventListener("click", () => {
                const mes = prompt("Ingrese el mes que desea pagar:");
                const monto = parseFloat(prompt("Ingrese el monto a pagar:"));
                if (mes && !isNaN(monto)) {
                    alumno.gestionarPago(mes, monto);
                } else {
                    alert("Datos inválidos.");
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