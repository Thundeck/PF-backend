const mongoose = require("./src/db.js"); // Reemplaza esto con la ruta a tu módulo de conexión de Mongoose
const server = require("./src/app.js");
const port = process.env.PORT || 3001;

server.listen(port, async () => {
  console.log("%s listening at 3001");
});
