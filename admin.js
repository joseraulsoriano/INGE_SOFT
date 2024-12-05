class Administrador {
    constructor() {
        // Inicializamos el cargado de las listas de alumnos, profesores y clases
        this.cargarListaAlumnos();
        this.cargarListaProfesores();
        this.cargarListaClases();
    }

    async cargarDatosAdmin() {
        try {
            const response = await fetch("admin_datos.txt");
            const data = await response.json();
            return data; // Retorna los datos completos
        } catch (error) {
            console.error("Error al cargar los datos de usuarios:", error);
            return null; // Si hay un error, retorna null
        }
    }

    // Guardar los datos en el archivo admin_datos.txt
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
            console.error("Error al guardar los datos de usuarios:", error);
        }
    }

    // Cargar y mostrar la lista de alumnos
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
            recomendaciones: [],
            reservas: []
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

        alumno.nombre = prompt('Nombre:', alumno.nombre) || alumno.nombre;
        alumno.nivelEstudio = prompt('Nivel de estudios:', alumno.nivelEstudio) || alumno.nivelEstudio;
        alumno.matricula = prompt('Matrícula:', alumno.matricula) || alumno.matricula;

        await this.guardarDatosAdmin(datos);
        alert(`Alumno ${alumno.nombre} actualizado exitosamente.`);
        this.cargarListaAlumnos();
    }

    // Eliminar un alumno
    async eliminarAlumno(email) {
        const datos = await this.cargarDatosAdmin();
        if (!datos) return;

        datos.usuarios = datos.usuarios.filter(user => user.email !== email);
        await this.guardarDatosAdmin(datos);
        alert('Alumno eliminado exitosamente.');
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

    // Registrar un nuevo profesor
    async registrarProfesor() {
        const datos = await this.cargarDatosAdmin();
        if (!datos) return;

        const nuevoProfesor = {
            nombre: prompt('Nombre del profesor:'),
            email: prompt('Email del profesor:'),
            especialidades: prompt('Especialidades (separadas por comas):').split(','),
            rol: 'maestro',
            clases: []
        };

        if (!nuevoProfesor.nombre || !nuevoProfesor.email || nuevoProfesor.especialidades.length === 0) {
            alert('Información faltante.');
            return;
        }

        const yaExiste = datos.usuarios.some(user => user.email === nuevoProfesor.email);
        if (yaExiste) {
            alert('El profesor ya está registrado.');
            return;
        }

        datos.usuarios.push(nuevoProfesor);
        await this.guardarDatosAdmin(datos);
        alert(`Profesor ${nuevoProfesor.nombre} registrado exitosamente.`);
        this.cargarListaProfesores();
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

        profesor.nombre = prompt('Nombre:', profesor.nombre) || profesor.nombre;
        profesor.especialidades = prompt('Especialidades (separadas por comas):', profesor.especialidades.join(',')).split(',');

        await this.guardarDatosAdmin(datos);
        alert(`Profesor ${profesor.nombre} actualizado exitosamente.`);
        this.cargarListaProfesores();
    }

    // Eliminar un profesor
    async eliminarProfesor(email) {
        const datos = await this.cargarDatosAdmin();
        if (!datos) return;

        datos.usuarios = datos.usuarios.filter(user => user.email !== email);
        await this.guardarDatosAdmin(datos);
        alert('Profesor eliminado exitosamente.');
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

    // Crear una nueva clase
    async crearClase() {
        const datos = await this.cargarDatosAdmin();
        if (!datos) return;

        const nuevaClase = {
            disciplina: prompt('Disciplina:'),
            horario: prompt('Horario:'),
            capacidad: parseInt(prompt('Capacidad:')),
            profesor: prompt('Profesor encargado:'),
            alumnos: []
        };

        if (!nuevaClase.disciplina || !nuevaClase.horario || isNaN(nuevaClase.capacidad) || !nuevaClase.profesor) {
            alert('Información faltante.');
            return;
        }

        datos.clases.push(nuevaClase);
        await this.guardarDatosAdmin(datos);
        alert('Clase creada exitosamente.');
        this.cargarListaClases();
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

        clase.disciplina = prompt('Disciplina:', clase.disciplina) || clase.disciplina;
        clase.horario = prompt('Horario:', clase.horario) || clase.horario;
        clase.capacidad = parseInt(prompt('Capacidad:', clase.capacidad)) || clase.capacidad;

        await this.guardarDatosAdmin(datos);
        alert(`Clase ${clase.disciplina} actualizada exitosamente.`);
        this.cargarListaClases();
    }

    // Eliminar una clase
    async eliminarClase(disciplina) {
        const datos = await this.cargarDatosAdmin();
        if (!datos) return;

        datos.clases = datos.clases.filter(c => c.disciplina !== disciplina);
        await this.guardarDatosAdmin(datos);
        alert('Clase eliminada exitosamente.');
        this.cargarListaClases();
    }
}

// Crear una instancia de Administrador al cargar la página
const administrador = new Administrador();

// Cerrar sesión
document.getElementById("logoutButton").addEventListener("click", () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("rol");
    window.location.href = "index.html";
});