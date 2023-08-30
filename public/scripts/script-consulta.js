$(document).ready(function () {
    $('#loader').hide();
    $('#response').hide();
    $('#error').hide();
    $('#success').hide();
    // Cuando se envía el formulario, se activa la función para consultar el DNI
    $('#dniForm').submit(function (event) {
        event.preventDefault(); // Evitar que el formulario se envíe y recargue la página
        $('#response').hide();
        $('#error').hide();
        $('#success').hide();
        $("#result").removeClass("invisible");
        $('#loader').show();
        var dniNumber = $('#dniNumber').val(); // Obtener el número de DNI ingresado

        if (validateDniNumber(dniNumber)) {
            // Realizar la solicitud AJAX a la API para consultar el DNI

            setTimeout(function () {
                $.ajax({
                    url: `https://api.perudevs.com/api/v1/dni/complete?document=${dniNumber}&key=cGVydWRldnMucHJvZHVjdGlvbi5maXRjb2RlcnMuNjRlYWRhMTcyMmZhYjkzZjhjZjk5NTRk`,
                    type: 'GET',
                    success: function (response) {
                        $('#loader').hide();
                        $('#response').show();
                        if (response.resultado.nombres != '') {
                            $('#success').show();
                            $('#sNombres').html(response.resultado.nombre_completo);
                            $('#sDNI').html(response.resultado.id);
                            $('#sFN').html(response.resultado.fecha_nacimiento);
                            $('#sEdad').html(calcularEdad(response.resultado.fecha_nacimiento));
                        } else {
                            $('#error').show();
                            $('#error').html('El DNI ingresado no existe');
                        }
                    },
                    error: function () {
                        $('#loader').hide();
                        $('#response').show();
                        $('#error').show();
                        $('#error').html('Error en la consulta de DNI');
                    }
                });
            }, 1000);

        } else {
            $('#loader').hide();
            $('#response').show();
            $('#error').show();
            $('#error').html('¡El número de DNI es inválido!');
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

function calcularEdad(fechaNacimiento) {
    const partes = fechaNacimiento.split('/'); // Divide la fecha en partes: [DD, MM, AAAA]

    // Asegura que haya tres partes en la fecha
    if (partes.length !== 3) {
        throw new Error('El formato de fecha debe ser "DD/MM/AAAA".');
    }

    const diaNacimiento = parseInt(partes[0], 10); // Convierte el día a número
    const mesNacimiento = parseInt(partes[1], 10) - 1; // Resta 1 al mes (los meses en JavaScript son de 0 a 11)
    const añoNacimiento = parseInt(partes[2], 10);

    const fechaNacimientoObj = new Date(añoNacimiento, mesNacimiento, diaNacimiento);
    const fechaActual = new Date();

    const años = fechaActual.getFullYear() - fechaNacimientoObj.getFullYear();
    const mesActual = fechaActual.getMonth();
    const mesCumpleaños = fechaNacimientoObj.getMonth();
    const diaActual = fechaActual.getDate();
    const diaCumpleaños = fechaNacimientoObj.getDate();

    if (
        mesActual < mesCumpleaños ||
        (mesActual === mesCumpleaños && diaActual < diaCumpleaños)
    ) {
        // Resta un año si aún no ha pasado el día y el mes de cumpleaños
        return años - 1;
    } else {
        return años;
    }
}

