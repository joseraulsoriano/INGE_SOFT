class Administrador {
    constructor() {
        this.cargarListaAlumnos();
        this.cargarListaProfesores();
        this.cargarListaClases();
    }

    async cargarDatosAdmin() {
        try {
            const response = await fetch("admin_datos.txt");
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al cargar los datos de usuarios:", error);
            return null;
        }
    }

    async cargarListaAlumnos() {
        const datos = await this.cargarDatosAdmin();
        if (!datos) return;

        const listaAlumnos = document.getElementById('listaAlumnos');
        listaAlumnos.innerHTML = datos.usuarios
            .filter(usuario => usuario.rol === 'alumno')
            .map(alumno => `
                <div>
                    <p><strong>${alumno.nombre}</strong> - ${alumno.email}</p>
                    <button onclick="administrador.editarAlumno('${alumno.email}')">Editar</button>
                    <button onclick="administrador.eliminarAlumno('${alumno.email}')">Eliminar</button>
                </div>
            `)
            .join('');
    }

    // Registrar un nuevo alumno
    async registrarAlumno() {
        const datos = await this.cargarDatosAdmin();
        if (!datos) return;

        const nuevoAlumno = {
            nombre: prompt('Nombre del alumno:'),
            email: prompt('Email del alumno:'),
            matricula: prompt('Matrícula del alumno:'),
            edad: parseInt(prompt('Edad del alumno:')),
            nivelEstudio: prompt('Nivel de estudios:'),
            certificadoMedico: confirm('¿Certificado médico recibido?'),
            deslindeFirmado: confirm('¿Deslinde firmado?'),
            rol: 'alumno',
            estadoPagos: [],
            recomendaciones: []
        };

        if (!nuevoAlumno.nombre || !nuevoAlumno.email || !nuevoAlumno.matricula || !nuevoAlumno.certificadoMedico || !nuevoAlumno.deslindeFirmado) {
            alert('Información faltante.');
            return;
        }

        const yaExiste = datos.usuarios.some(user => user.email === nuevoAlumno.email);
        if (yaExiste) {
            alert('El alumno ya está registrado.');
            return;
        }

        datos.usuarios.push(nuevoAlumno);
        await this.guardarDatosAdmin(datos);
        alert(`Alumno ${nuevoAlumno.nombre} registrado exitosamente.`);
        this.cargarListaAlumnos();
    }

    // Editar un alumno
    async editarAlumno(email) {
        const datos = await this.cargarDatosAdmin();
        if (!datos) return;

        const alumno = datos.usuarios.find(user => user.email === email);
        if (!alumno) {
            alert('Alumno no encontrado.');
            return;
        }

        // Rellenar el formulario con los datos del alumno a editar
        document.getElementById('campoEditar').innerHTML = `
            <option value="nombre">Nombre</option>
            <option value="email">Email</option>
            <option value="matricula">Matrícula</option>
            <option value="telefono">Teléfono</option>
            <option value="fechaNacimiento">Fecha de Nacimiento</option>
            <option value="domicilio">Domicilio</option>
            <option value="lugarNacimiento">Lugar de Nacimiento</option>
            <option value="peso">Peso</option>
            <option value="altura">Altura</option>
        `;
        
        document.getElementById('nuevoValor').value = "";
        document.getElementById("formularioEditar").style.display = "block";

        document.getElementById("editarFormulario").addEventListener("submit", (e) => {
            e.preventDefault();
            const campo = document.getElementById("campoEditar").value;
            const nuevoValor = document.getElementById("nuevoValor").value.trim();
            if (nuevoValor) {
                alumno[campo] = nuevoValor;
                alert(`${campo} actualizado exitosamente.`);
                this.guardarDatosAdmin(datos);
                this.cargarListaAlumnos();
                document.getElementById("formularioEditar").style.display = "none";
            } else {
                alert("Por favor ingrese un valor válido.");
            }
        });
    }

    // Eliminar un alumno
    async eliminarAlumno(email) {
        const datos = await this.cargarDatosAdmin();
        if (!datos) return;

        datos.usuarios = datos.usuarios.filter(user => user.email !== email);
        await this.guardarDatosAdmin(datos);
        this.cargarListaAlumnos();
    }

    // Cargar y mostrar la lista de profesores
    async cargarListaProfesores() {
        const datos = await this.cargarDatosAdmin();
        if (!datos) return;

        const listaProfesores = document.getElementById('listaProfesores');
        listaProfesores.innerHTML = datos.usuarios
            .filter(usuario => usuario.rol === 'maestro')
            .map(profesor => `
                <div>
                    <p><strong>${profesor.nombre}</strong> (${profesor.email})</p>
                    <p><strong>Especialidades:</strong> ${profesor.especialidades.join(', ')}</p>
                    <button onclick="administrador.editarProfesor('${profesor.email}')">Editar</button>
                    <button onclick="administrador.eliminarProfesor('${profesor.email}')">Eliminar</button>
                </div>
            `)
            .join('');
    }

    // Editar un profesor
    async editarProfesor(email) {
        const datos = await this.cargarDatosAdmin();
        if (!datos) return;

        const profesor = datos.usuarios.find(user => user.email === email && user.rol === 'maestro');
        if (!profesor) {
            alert('Profesor no encontrado.');
            return;
        }

        document.getElementById('campoEditar').innerHTML = `
            <option value="nombre">Nombre</option>
            <option value="email">Email</option>
            <option value="especialidades">Especialidades</option>
        `;
        
        document.getElementById('nuevoValor').value = "";
        document.getElementById("formularioEditar").style.display = "block";

        document.getElementById("editarFormulario").addEventListener("submit", (e) => {
            e.preventDefault();
            const campo = document.getElementById("campoEditar").value;
            const nuevoValor = document.getElementById("nuevoValor").value.trim();
            if (nuevoValor) {
                profesor[campo] = (campo === "especialidades") ? nuevoValor.split(",") : nuevoValor;
                alert(`${campo} actualizado exitosamente.`);
                this.guardarDatosAdmin(datos);
                this.cargarListaProfesores();
                document.getElementById("formularioEditar").style.display = "none";
            } else {
                alert("Por favor ingrese un valor válido.");
            }
        });
    }

    // Eliminar un profesor
    async eliminarProfesor(email) {
        const datos = await this.cargarDatosAdmin();
        if (!datos) return;

        datos.usuarios = datos.usuarios.filter(user => user.email !== email);
        await this.guardarDatosAdmin(datos);
        this.cargarListaProfesores();
    }

    // Cargar y mostrar la lista de clases
    async cargarListaClases() {
        const datos = await this.cargarDatosAdmin();
        if (!datos) return;

        const listaClases = document.getElementById('listaClases');
        listaClases.innerHTML = datos.clases
            .map(clase => `
                <div>
                    <p><strong>${clase.disciplina}</strong> - ${clase.horario}</p>
                    <p><strong>Profesor:</strong> ${clase.profesor} | <strong>Cupos:</strong> ${clase.capacidad} | <strong>Alumnos:</strong> ${clase.alumnos.length}</p>
                    <button onclick="administrador.editarClase('${clase.disciplina}')">Editar</button>
                    <button onclick="administrador.eliminarClase('${clase.disciplina}')">Eliminar</button>
                </div>
            `)
            .join('');
    }

    // Editar una clase
    async editarClase(disciplina) {
        const datos = await this.cargarDatosAdmin();
        if (!datos) return;

        const clase = datos.clases.find(c => c.disciplina === disciplina);
        if (!clase) {
            alert('Clase no encontrada.');
            return;
        }

        document.getElementById('campoEditar').innerHTML = `
            <option value="disciplina">Disciplina</option>
            <option value="horario">Horario</option>
            <option value="capacidad">Capacidad</option>
        `;
        
        document.getElementById('nuevoValor').value = "";
        document.getElementById("formularioEditar").style.display = "block";

        document.getElementById("editarFormulario").addEventListener("submit", (e) => {
            e.preventDefault();
            const campo = document.getElementById("campoEditar").value;
            const nuevoValor = document.getElementById("nuevoValor").value.trim();
            if (nuevoValor) {
                clase[campo] = (campo === "capacidad") ? parseInt(nuevoValor) : nuevoValor;
                alert(`${campo} actualizado exitosamente.`);
                this.guardarDatosAdmin(datos);
                this.cargarListaClases();
                document.getElementById("formularioEditar").style.display = "none";
            } else {
                alert("Por favor ingrese un valor válido.");
            }
        });
    }

    // Eliminar una clase
    async eliminarClase(disciplina) {
        const datos = await this.cargarDatosAdmin();
        if (!datos) return;

        datos.clases = datos.clases.filter(c => c.disciplina !== disciplina);
        await this.guardarDatosAdmin(datos);
        this.cargarListaClases();
    }

    async guardarDatosAdmin(datos) {
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
}

// Crear una instancia de Administrador al cargar la página
const administrador = new Administrador();