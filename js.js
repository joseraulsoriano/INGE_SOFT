// Simulación de usuarios en la base de datos
const usuarios = {
    admin: { rol: "administrador", password: "admin123" },
    DOC1234: { rol: "maestro", password: "docpass" },
    2023456: { rol: "alumno", password: "alupass" }
};

// Login y validación
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;

    if (validarCredenciales(usuario, password)) {
        redirigirPorRol(usuario); // Llama a la función que decide el destino
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
});

function validarCredenciales(usuario, password) {
    return usuarios[usuario] && usuarios[usuario].password === password;
}

// Redirigir según el rol
function redirigirPorRol(usuario) {
    const rol = usuarios[usuario].rol;
    localStorage.setItem("usuario", usuario); // Guardamos el usuario
    localStorage.setItem("rol", rol); // Guardamos el rol

    if (rol === "administrador") {
        window.location.href = "admin.html"; // Redirige al panel del Administrador
    } else if (rol === "maestro") {
        window.location.href = "maestro.html"; // Redirige al panel del Maestro
    } else if (rol === "alumno") {
        window.location.href = "alumno.html"; // Redirige al panel del Alumno
    }
}