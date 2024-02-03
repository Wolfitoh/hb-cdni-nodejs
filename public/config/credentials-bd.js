// const { Client } = require("pg");

// // Crea una instancia única de cliente PostgreSQL
// const globalClient = new Client({
//   user: "koyeb-adm",
//   host: "ep-soft-bush-53286164.eu-central-1.pg.koyeb.app",
//   database: "koyebdb",
//   password: "ylTjAm7HJ0cs",
//   port: 5432,
//   ssl: {
//     rejectUnauthorized: false, // Esta línea permite la conexión sin validar el certificado SSL (¡no se recomienda en producción!)
//   },
// });

// // Conecta el cliente una vez al iniciar la aplicación
// globalClient
//   .connect()
//   .then(() => {
//     console.log("Conexión exitosa a PostgreSQL");
//   })
//   .catch((err) => {
//     console.error("Error al conectar a PostgreSQL", err);
//   });

// // Exporta la instancia global del cliente para que pueda ser utilizada en otros módulos
// module.exports = globalClient;
