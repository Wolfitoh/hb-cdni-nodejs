const client = require('../config/credentials-bd.js');
const path = require('path');

module.exports = function (app) {
    app.get('/', (req, res) => {
        res.redirect('/');
    })

    app.get('/consulta', (req, res) => {
        const filePath = path.join(__dirname, '..', 'consulta.html');
        res.sendFile(filePath);
    });

    app.post('/check-credentials', async (req, res) => {
        try {
            const { dni, password } = req.body;
            // Consulta SQL para verificar las credenciales del usuario
            const query = 'SELECT * FROM usuario WHERE dni = $1 AND password = $2';
            const values = [dni, password];
            const result = await client.query(query, values);
            // Verificar si se encontró un usuario
            if (result.rows.length === 1) {
                delete result.rows[0].password;
                res.status(200).send({
                    success: true,
                    message: 'Inicio de sesión exitoso.',
                    user: result.rows[0],
                });
            } else {
                console.log("no hay")
                // Usuario no encontrado o contraseña incorrecta
                res.status(404).send({
                    success: false,
                    message: 'DNI del usuario o contraseña incorrectos.',
                });
            }
        } catch (error) {
            // Error en la consulta o conexión a la base de datos
            console.error('Error al autenticar usuario:', error);

            res.status(500).send({
                success: false,
                message: 'Error al autenticar usuario.',
            });
        }
    });
};
