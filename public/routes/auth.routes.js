const client = require('../config/credentials-bd.js');
const path = require('path');
const bcrypt = require('bcrypt');


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
            // Consulta SQL para obtener la contraseña almacenada del usuario
            const query = 'SELECT dni, password FROM usuario WHERE dni = $1';
            const values = [dni];
            const result = await client.query(query, values);

            bcrypt.hash('Pachitea', 10, (err, hash) => {
                if (err) {
                    console.error('Error al encriptar la contraseña:', err);
                } else {
                    console.log('Contraseña encriptada:', hash);
                }
            });

            // Verificar si se encontró un usuario
            if (result.rows.length === 1) {
                const hashedPassword = result.rows[0].password;

                // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
                bcrypt.compare(password, hashedPassword, (err, passwordMatch) => {
                    if (err) {
                        console.error('Error al comparar contraseñas:', err);
                        res.status(500).send({
                            success: false,
                            message: 'Error al autenticar usuario.',
                        });
                    } else if (passwordMatch) {
                        // Contraseña coincidente
                        delete result.rows[0].password;
                        res.status(200).send({
                            success: true,
                            message: 'Inicio de sesión exitoso.',
                            user: result.rows[0],
                        });
                    } else {
                        // Contraseña incorrecta
                        res.status(404).send({
                            success: false,
                            message: 'DNI del usuario o contraseña incorrectos.',
                        });
                    }
                });
            } else {
                // Usuario no encontrado
                console.log("no hay");
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
