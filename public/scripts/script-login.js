$(document).ready(function () {
    const form = document.getElementById('loginForm');
    const inputDni = document.getElementById('dni');
    const inputPassword = document.getElementById('password');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita que el formulario se envíe de manera convencional

        const dni = inputDni.value;
        const password = inputPassword.value;

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
                    Swal.fire({
                        title: 'Error!',
                        text: data.message,
                        icon: 'error',
                        confirmButtonText: 'Okey'
                    })
                } else {
                    // Guarda la cookie de sesión en localStorage
                    sessionStorage.setItem('currentUser', data.user);
                    setTimeout(function () {
                        Swal.fire({
                            title: 'Correcto!',
                            text: 'Inicio de sesión exitoso',
                            icon: 'success',
                            confirmButtonText: 'Okey'
                        })
                    }, 2000); // 2000 milisegundos = 2 segundos
                    window.location.href = '/consulta';
                }
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Quieres continuar',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
                console.log("aerror")
                console.log(error.message)
            });
    });
});
