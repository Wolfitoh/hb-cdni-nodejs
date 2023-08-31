$(document).ready(function () {
    const form = document.getElementById('loginForm');
    const inputDni = document.getElementById('dni');
    const inputPassword = document.getElementById('password');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita que el formulario se envíe de manera convencional

        const dni = inputDni.value;
        const password = inputPassword.value;

        if (validateDniNumber(dni)) {
            if (validarContrasena(password)) {
                // Realiza una solicitud POST al servidor Node.js
                fetch('/check-credentials', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ dni, password })
                }).then(response => response.json())
                    .then(data => {
                        if (!data.success) {
                            $("#divErrorMessage").removeClass("hidden");
                            $("#divErrorMessage").html(data.message)
                            $("#divErrorMessage").removeClass("block");
                            Swal.fire({
                                title: 'Error!',
                                text: data.message,
                                icon: 'error',
                                confirmButtonText: 'Aceptar'
                            })
                        } else {
                            confetti();
                            // Guarda la cookie de sesión en localStorage
                            sessionStorage.setItem('currentUser', data.user);
                            Swal.fire({
                                title: 'Correcto!',
                                text: 'Inicio de sesión exitoso',
                                icon: 'success',
                                confirmButtonText: 'Aceptar'
                            })
                            setTimeout(function () {
                                window.location.href = '/consulta';
                            }, 2000); // 2000 milisegundos = 2 segundos                
                        }
                    })
                    .catch(error => {
                        $("#divErrorMessage").removeClass("hidden");
                        Swal.fire({
                            title: 'Error!',
                            text: 'Algo salió mal',
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                        })
                        $("#divErrorMessage").removeClass("hidden");
                        $("#divErrorMessage").html('Algo salió mal')
                    });
            } else {
                $("#divErrorMessage").removeClass("hidden");
                $("#divErrorMessage").html('La contraseña es incorrecta')
                Swal.fire({
                    title: 'Error!',
                    text: 'La contraseña es incorrecta',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                })
            }
        } else {
            $("#divErrorMessage").removeClass("hidden");
            $("#divErrorMessage").html('El DNI es incorrecto')
            Swal.fire({
                title: 'Error!',
                text: 'El DNI es incorrecto',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        }
    });
});

function validateDniNumber(dni) {
    // Expresión regular para validar un DNI español de 8 dígitos numéricos
    const regex = /^[0-9]{8}$/;

    // Eliminar espacios en blanco
    dni = dni.replace(/\s/g, '');

    if (regex.test(dni)) {
        return true; // DNI válido
    } else {
        return false; // DNI inválido
    }
}

function validateDniNumber(dni) {
    // Expresión regular para validar un DNI español de 8 dígitos numéricos
    const regex = /^[0-9]{8}$/;

    // Eliminar espacios en blanco
    dni = dni.replace(/\s/g, '');

    if (regex.test(dni)) {
        return true; // DNI válido
    } else {
        return false; // DNI inválido
    }
}

function validarContrasena(contrasena) {
    // La expresión regular para validar la contraseña
    const regex = /^[A-Za-z0-9áéíóúÁÉÍÓÚñÑüÜ]{6,20}$/;

    // Comprueba si la contraseña coincide con la expresión regular
    return regex.test(contrasena);
}
