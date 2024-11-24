class Alumno {
    constructor(nombre, email, edad, disciplina) {
        this.nombre = nombre;
        this.email = email;
        this.edad = edad;
        this.disciplina = disciplina;
        this.reservas = [];
        this.pagos = [];
    }

    reservarClase(clase) {
        if (clase.verificarCupo()) {
            this.reservas.push(clase);
            clase.asignarAlumno(this);
            console.log(`Reserva exitosa para ${this.nombre} en la clase de ${clase.disciplina}.`);
            return true;
        } else {
            console.log(`No hay cupo en la clase de ${clase.disciplina}.`);
            return false;
        }
    }
}

class Clase {
    constructor(disciplina, horario, capacidad) {
        this.disciplina = disciplina;
        this.horario = horario;
        this.capacidad = capacidad;
        this.alumnos = [];
    }

    verificarCupo() {
        return this.alumnos.length < this.capacidad;
    }

    asignarAlumno(alumno) {
        this.alumnos.push(alumno);
    }
}

class Profesor {
    constructor(nombre, especialidad) {
        this.nombre = nombre;
        this.especialidad = especialidad;
        this.listaDeAlumnos = [];
    }

    agregarRecomendacion(alumno, recomendacion) {
        console.log(`Recomendación para ${alumno.nombre}: ${recomendacion}`);
    }
}

// Datos de prueba
const claseYoga = new Clase("Yoga", "10:00 AM", 5);
const claseDanza = new Clase("Danza", "12:00 PM", 3);

const alumno1 = new Alumno("Juan Pérez", "juan@example.com", 25, "Yoga");
const profesorYoga = new Profesor("Laura", "Yoga");