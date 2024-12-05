// Función para cargar los usuarios desde el archivo usuarios.txt
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

    const usuarios = await cargarUsuarios();  // Cargar los usuarios desde el archivo
    console.log("Usuarios:", usuarios); // Verificar que los usuarios se cargan correctamente

    // Verificar si el usuario existe y si la contraseña coincide
    if (usuarios && validarCredenciales(usuarios, usuario, password)) {
        redirigirPorRol(usuarios, usuario); // Llama a la función que decide el destino
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
});

// Redirigir según el rol
function redirigirPorRol(usuarios, usuario) {
    const rol = usuarios[usuario].rol;
    localStorage.setItem("usuario", usuario); // Guardamos el usuario
    localStorage.setItem("rol", rol); // Guardamos el rol
    console.log("Usuario guardado en localStorage:", usuario); // Verifica si el usuario está guardado

    if (rol === "administrador") {
        window.location.href = "admin.html"; // Redirige al panel del Administrador
    } else if (rol === "maestro") {
        window.location.href = "maestro.html"; // Redirige al panel del Maestro
    } else if (rol === "alumno") {
        window.location.href = "alumno.html"; // Redirige al panel del Alumno
    }
}