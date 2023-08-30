function validarSesion(req, res, next) {
    const sesionActiva = sessionStorage.getItem('currentUser');
    console.log(sesionActiva)
    if (sesionActiva) {
        next();
    } else {
        res.redirect('/'); // Redirige al usuario a la página de inicio de sesión
    }
}

module.exports = validarSesion;