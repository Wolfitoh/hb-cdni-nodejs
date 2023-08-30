const { Client } = require('pg');

// Crea una instancia única de cliente PostgreSQL
const globalClient = new Client({
    user: 'admin-hb-cdni',
    host: 'localhost',
    database: 'bd-admin-hb-cdni',
    password: 'hb-cdni-Admin-2OZE',
    port: 5432,
});

// Conecta el cliente una vez al iniciar la aplicación
globalClient.connect()
    .then(() => {
        console.log('Conexión exitosa a PostgreSQL');
    })
    .catch(err => {
        console.error('Error al conectar a PostgreSQL', err);
    });

// Exporta la instancia global del cliente para que pueda ser utilizada en otros módulos
module.exports = globalClient;
