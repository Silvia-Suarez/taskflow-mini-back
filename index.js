require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const tareasRouter = require("./routes/tareas");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(express.json());
app.use("/tareas", tareasRouter);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a mongoDB correctamente"))
  .catch((err) => console.error(`Error al conectar con mongoDB ${err}`));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
