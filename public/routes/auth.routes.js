// const client = require("../config/credentials-bd.js");
const path = require("path");
const bcrypt = require("bcrypt");

module.exports = function (app) {
  app.get("/", (req, res) => {
    res.redirect("/");
  });

  app.get("/consulta", (req, res) => {
    const filePath = path.join(__dirname, "..", "consulta.html");
    res.sendFile(filePath);
  });

  const defaultUsers = [
    {
      dni: "72454145", // DNI del usuario 1
      password: "$2b$10$Zn46bTnB964RexaZF838/.BSNStnl/dj3ooGaiQ253gNjQt/BEm/q", // Contraseña encriptada con bcrypt ('Pachitea')
    },
    {
      dni: "72043733", // DNI del usuario 2
      password: "$2b$10$Zn46bTnB964RexaZF838/.BSNStnl/dj3ooGaiQ253gNjQt/BEm/q", // Contraseña encriptada con bcrypt ('Pachitea')
    },
    // Puedes agregar más usuarios según sea necesario
  ];

  app.post("/check-credentials", async (req, res) => {
    try {
      const { dni, password } = req.body;

      // Buscar el usuario en el array por el DNI
      const foundUser = defaultUsers.find((user) => user.dni === dni);

      if (foundUser) {
        // Comparar la contraseña proporcionada con la contraseña almacenada en el array
        bcrypt.compare(password, foundUser.password, (err, passwordMatch) => {
          if (err) {
            console.error("Error al comparar contraseñas:", err);
            res.status(500).send({
              success: false,
              message: "Error al autenticar usuario.",
            });
          } else if (passwordMatch) {
            // Contraseña coincidente
            // Puedes devolver información adicional sobre el usuario si es necesario
            res.status(200).send({
              success: true,
              message: "Inicio de sesión exitoso.",
              user: {
                dni: foundUser.dni,
                // Otras propiedades del usuario si es necesario
              },
            });
          } else {
            // Contraseña incorrecta
            res.status(404).send({
              success: false,
              message: "DNI del usuario o contraseña incorrectos.",
            });
          }
        });
      } else {
        // Usuario no encontrado
        console.log("no hay");
        res.status(404).send({
          success: false,
          message: "DNI del usuario o contraseña incorrectos.",
        });
      }
    } catch (error) {
      // Manejo de errores
      console.error("Error al autenticar usuario:", error);

      res.status(500).send({
        success: false,
        message: "Error al autenticar usuario.",
      });
    }
  });
};
