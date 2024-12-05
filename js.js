// Función para cargar los datos de usuarios desde usuarios.txt
async function cargarUsuarios() {
    try {
        const response = await fetch("usuarios.txt");
        const data = await response.json();
        return data.usuarios;
    } catch (error) {
        console.error("Error al cargar los datos de usuarios:", error);
        return null;
    }
}

// Login y validación
document.getElementById("loginForm")?.addEventListener("submit", async function (e) {
    e.preventDefault();
    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;

    const usuarios = await cargarUsuarios();
    if (usuarios && validarCredenciales(usuarios, usuario, password)) {
        redirigirPorRol(usuarios, usuario); // Llama a la función que decide el destino
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
});

function validarCredenciales(usuarios, usuario, password) {
    return usuarios[usuario] && usuarios[usuario].password === password;
}

// Redirigir según el rol
function redirigirPorRol(usuarios, usuario) {
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