// Clase Pago
class Pago {
    constructor(mes, monto, estado) {
        this.mes = mes;
        this.monto = monto;
        this.estado = estado;
    }

    esPendiente() {
        return this.estado === "Pendiente";
    }

    realizarPago() {
        if (this.esPendiente()) {
            this.estado = "Pagado";
            return true;
        }
        return false;
    }
}

// Clase Recomendacion
class Recomendacion {
    constructor(fecha, texto) {
        this.fecha = fecha;
        this.texto = texto;
    }

    mostrar() {
        return `
            <div class="recomendacion">
                <p><strong>Fecha:</strong> ${this.fecha}</p>
                <p><strong>Texto:</strong> ${this.texto}</p>
            </div>
        `;
    }
}

// Clase Alumno
class Alumno {
    constructor(datos) {
        Object.assign(this, datos);
        // Convertir datos de estadoPagos a instancias de la clase Pago
        this.estadoPagos = this.estadoPagos.map(p => new Pago(p.mes, p.monto, p.estado));
        // Convertir datos de recomendaciones a instancias de la clase Recomendacion
        this.recomendaciones = this.recomendaciones.map(r => new Recomendacion(r.fecha, r.texto));
    }

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

    consultarRecomendaciones() {
        const contenedor = document.getElementById("recomendaciones");
        const adeudos = this.estadoPagos.filter(p => p.esPendiente());

        if (adeudos.length > 0) {
            const detalleAdeudos = adeudos.map(p => `Mes: ${p.mes}, Monto: $${p.monto}`).join("<br>");
            contenedor.innerHTML = `
                <p style="color:red;"><strong>Acceso Denegado:</strong> Regularice sus pagos.</p>
                <p>Detalles de adeudos:</p>
                <p>${detalleAdeudos}</p>
            `;
        } else if (this.recomendaciones.length === 0) {
            contenedor.innerHTML = `<p>No hay recomendaciones disponibles en este momento.</p>`;
        } else {
            contenedor.innerHTML = this.recomendaciones.map((r, index) => `
                <div class="recomendacion">
                    <p><strong>Fecha:</strong> ${r.fecha}</p>
                    <button onclick="mostrarDetalleRecomendacion(${index})">Ver Detalle</button>
                </div>
            `).join("");
        }
    }

    // Mostrar el detalle de la recomendación
    mostrarDetalleRecomendacion(index) {
        const recomendacion = this.recomendaciones[index];
        const detalleContainer = document.getElementById("detalleRecomendacion");
        detalleContainer.innerHTML = recomendacion.mostrar();
        detalleContainer.style.display = "block";  // Mostrar el detalle
    }

    gestionarPago(mes, monto) {
        const pago = this.estadoPagos.find(p => p.mes === mes);
        if (!pago) {
            alert("Mes inválido. No se encontró un pago correspondiente.");
            return;
        }

        if (pago.esPendiente()) {
            if (monto >= pago.monto) {
                pago.realizarPago();
                alert("Pago registrado exitosamente.");
                this.actualizarHistorialPagos();
                document.getElementById("formPago").style.display = "none"; // Ocultar formulario de pago
            } else {
                alert(`Monto insuficiente. Debe pagar al menos $${pago.monto}.`);
            }
        } else {
            alert(`El mes ${mes} ya está pagado.`);
        }
    }

    actualizarHistorialPagos() {
        const tablaPagos = document.getElementById("tablaPagos");
        tablaPagos.innerHTML = this.estadoPagos.map(p => `
            <tr>
                <td>${p.mes}</td>
                <td>$${p.monto}</td>
                <td>${p.estado}</td>
            </tr>
        `).join("");
    }
}

// Cargar datos del alumno
async function cargarDatosAlumno() {
    try {
        const response = await fetch("admin_datos.txt");
        const data = await response.json();
        const usuarioActual = localStorage.getItem("usuario");
        const alumnoData = data.usuarios.find(u => u.email === usuarioActual && u.rol === "alumno");

        if (alumnoData) {
            const alumno = new Alumno(alumnoData);
            alumno.cargarPerfil();
            alumno.actualizarHistorialPagos();

            // Consultar recomendaciones
            document.getElementById("consultarRecomendaciones").addEventListener("click", () => {
                alumno.consultarRecomendaciones();
            });

            // Gestionar pago
            document.getElementById("gestionarPago").addEventListener("click", () => {
                const formPago = document.getElementById("formPago");
                formPago.style.display = "block"; // Mostrar formulario de pago
            });

            // Cancelar pago
            document.getElementById("cancelarPago").addEventListener("click", () => {
                const formPago = document.getElementById("formPago");
                formPago.style.display = "none"; // Ocultar formulario de pago
            });

            document.getElementById("pagoFormulario").addEventListener("submit", (e) => {
                e.preventDefault();
                const mes = document.getElementById("mesPago").value;
                const monto = parseFloat(document.getElementById("montoPago").value);
                if (mes && !isNaN(monto)) {
                    alumno.gestionarPago(mes, monto);
                } else {
                    alert("Datos inválidos.");
                }
            });

            // Editar perfil
            const formEditarPerfil = document.getElementById("formularioEditar");
            document.getElementById("editarPerfil").addEventListener("click", () => {
                formEditarPerfil.style.display = "block";
            });

            document.getElementById("cancelarEdicion").addEventListener("click", () => {
                formEditarPerfil.style.display = "none";
            });

            document.getElementById("editarFormulario").addEventListener("submit", (e) => {
                e.preventDefault();
                const campo = document.getElementById("campoEditar").value;
                const nuevoValor = document.getElementById("nuevoValor").value.trim();
                if (nuevoValor) {
                    if (campo === "disciplinasPrevias") alumno[campo] = nuevoValor.split(",");
                    else alumno[campo] = nuevoValor;
                    alert(`${campo} actualizado exitosamente.`);
                    alumno.cargarPerfil();
                    formEditarPerfil.style.display = "none";
                }
            });

            // Cerrar sesión
            document.getElementById("logoutButton").addEventListener("click", () => {
                localStorage.removeItem("usuario");
                localStorage.removeItem("rol");
                window.location.href = "index.html";
            });
        }
    } catch (error) {
        console.error("Error al cargar los datos del alumno:", error);
    }
}

cargarDatosAlumno();