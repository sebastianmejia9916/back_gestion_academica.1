const express = require('express');
const app = express();
const morgan = require("morgan");
const database = require("./database.js")

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());

// Configuración inicial
const port = 4000;
app.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});

// Middlewares
app.use(morgan("dev"))

//GET PARA VISUALIZAR TODO LO QUE TENGA LA TABLA DE FACULTADES
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

//POST PARA AGREGAR UNA NUEVA FACULTAD
app.post("/facultades", async (req, res) => {
    try {
      const { nombre } = req.body; // Obtener datos del cuerpo de la solicitud
      const connection = await database.connect();
      const result = await connection.query("INSERT INTO facultades (nombre) VALUES (?)", [nombre]);
      console.log("Facultad creada:", result);
      res.status(201).json({ message: "Facultad creada exitosamente" });
    } catch (error) {
      console.error("Error al crear facultad:", error);
      res.status(500).json({ error: "Error al crear facultad" });
    }
});


// PUT para modificar un registro específico
app.put("/facultades/:id", async (req, res) => {
    try {
      const id = req.params.id; // Obtener el ID del parámetro de la URL
      const { nombre } = req.body; // Obtener los datos actualizados del cuerpo de la solicitud
      
      // Verificar si el ID es válido (puedes agregar más validaciones según tus necesidades)
      if (!id) {
        return res.status(400).json({ error: "Se requiere proporcionar un ID válido" });
      }
      
      // Realizar la actualización en la base de datos
      const connection = await database.connect();
      const result = await connection.query("UPDATE facultades SET nombre = ? WHERE id = ?", [nombre, id]);
      
      // Verificar si se actualizó correctamente
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "No se encontró ningún registro con el ID proporcionado" });
      }
      
      // Si todo está bien, enviar una respuesta exitosa
      res.json({ message: "Registro actualizado exitosamente" });
    } catch (error) {
      console.error("Error al modificar facultad:", error);
      res.status(500).json({ error: "Error al modificar facultad" });
    }
});


// PATCH para modificar una columna específica de un registro
app.patch("/facultades/:id", async (req, res) => {
    try {
      const id = req.params.id; // Obtener el ID del parámetro de la URL
      const { columna, valor } = req.body; // Obtener los datos de la columna y su nuevo valor del cuerpo de la solicitud
      
      // Verificar si el ID es válido (puedes agregar más validaciones según tus necesidades)
      if (!id) {
        return res.status(400).json({ error: "Se requiere proporcionar un ID válido" });
      }
      
      // Realizar la actualización en la base de datos
      const connection = await database.connect();
      const result = await connection.query(`UPDATE facultades SET ${columna} = ? WHERE id = ?`, [valor, id]);
      
      // Verificar si se actualizó correctamente
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "No se encontró ningún registro con el ID proporcionado" });
      }
      
      // Si todo está bien, enviar una respuesta exitosa
      res.json({ message: "Columna actualizada exitosamente" });
    } catch (error) {
      console.error("Error al modificar columna:", error);
      res.status(500).json({ error: "Error al modificar columna" });
    }
});

// DELETE para eliminar un registro específico
app.delete("/facultades/:id", async (req, res) => {
    try {
      const id = req.params.id; // Obtener el ID del parámetro de la URL
      
      // Verificar si el ID es válido (puedes agregar más validaciones según tus necesidades)
      if (!id) {
        return res.status(400).json({ error: "Se requiere proporcionar un ID válido" });
      }
      
      // Realizar la eliminación en la base de datos
      const connection = await database.connect();
      const result = await connection.query("DELETE FROM facultades WHERE id = ?", [id]);
      
      // Verificar si se eliminó correctamente
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "No se encontró ningún registro con el ID proporcionado" });
      }
      
      // Si todo está bien, enviar una respuesta exitosa
      res.json({ message: "Registro eliminado exitosamente" });
    } catch (error) {
      console.error("Error al eliminar registro:", error);
      res.status(500).json({ error: "Error al eliminar registro" });
    }
});



