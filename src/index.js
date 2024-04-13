const express = require('express');
const app = express();
const morgan = require("morgan");
const database = require("./database.js")

// Configuración inicial
const port = 4000;
app.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});

// Middlewares
app.use(morgan("dev"))

// Rutas
app.get("/facultades", async (req, res) => {
  try {
    const connection = await database.connect();
    const result = await connection.query("SELECT * FROM facultades");
    console.log(result);
    res.json(result); // Envía los resultados como JSON
  } catch (error) {
    console.error("Error al obtener facultades:", error);
    res.status(500).json({ error: "Error al obtener facultades" });
  }
});

