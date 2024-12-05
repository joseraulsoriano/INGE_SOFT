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
}// Función asíncrona para cargar los datos del alumno
async function cargarDatosAlumno() {
    try {
        const response = await fetch("usuarios.txt"); // Cargar los datos desde el archivo
        const data = await response.json();
        
        console.log("Usuarios cargados desde usuarios.txt:", data.usuarios);  // Verificar los usuarios cargados
        const usuarioActual = localStorage.getItem("usuario");  // Obtener el usuario actual desde localStorage
        console.log("Usuario actual en localStorage:", usuarioActual); // Verificar el valor de localStorage

        if (!usuarioActual) {
            console.error("No hay usuario guardado en localStorage");
            return;
        }

        const alumnoData = data.usuarios.find(usuario => usuario.email === usuarioActual && usuario.rol === "alumno");
        console.log("Datos del alumno encontrado:", alumnoData); // Verificar los datos del alumno

        if (alumnoData) {
            const alumno = new Alumno(alumnoData);  // Crear una instancia de Alumno
            alumno.cargarPerfil();  // Cargar el perfil del alumno en la página

            // Agregar eventos a los botones
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
                } else {
                    nuevoValor = prompt(`Ingresa el nuevo valor para ${campo}:`);
                }

                if (nuevoValor) {
                    alumno.editarPerfil(campo, nuevoValor);
                }
            });

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
            console.error("No se encontró el alumno.");
        }
    } catch (error) {
        console.error("Error al cargar los datos del alumno:", error);
    }
}

// Llama a la función para cargar los datos
cargarDatosAlumno();