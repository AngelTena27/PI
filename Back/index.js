const server = require("./src/app");
const {sequelize} = require("./src/db")

const PORT = 3001;

sequelize.sync({force: true})
  .then(() => {
    server.listen(3001, () => {
      console.log(PORT);
    });
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });