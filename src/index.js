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



// --------------------------------FACULTADES----------------------------------------------

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
      const result = await connection.query("INSERT INTO facultades (nombrefacultad) VALUES (?)", [nombre]);
      console.log("Facultad creada:", result);
      res.status(201).json({ message: "Facultad creada exitosamente" });
    } catch (error) {
      console.error("Error al crear facultad:", error);
      res.status(500).json({ error: "Error al crear facultad" });
    }
});
// PUT para modificar un registro específico de la facultad
app.put("/facultades/:id", async (req, res) => {
    try {
      const id = req.params.id; // Obtener el ID del parámetro de la URL
      const { nombre } = req.body; // Obtener los datos actualizados del cuerpo de la solicitud
      
      // Verificar si el ID es válido 
      if (!id) {
        return res.status(400).json({ error: "Se requiere proporcionar un ID válido" });
      }
      
      // Realizar la actualización en la base de datos
      const connection = await database.connect();
      const result = await connection.query("UPDATE facultades SET nombrefacultad = ? WHERE idfacultad = ?", [nombre, id]);
      
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
// PATCH para modificar una columna específica de un registro de la facultad
app.patch("/facultades/:id", async (req, res) => {
  console.log("PATCH entrando");
  try {
    const id = req.params.id; // Obtener el ID de los parámetros de la solicitud
    const columna = Object.keys(req.body)[0]; // Obtener el nombre de la columna del cuerpo de la solicitud
    const valor = req.body[columna]; // Obtener el valor de la columna del cuerpo de la solicitud

    console.log('id', id);
    console.log('columna', columna);
    console.log('valor', valor);
    
    // Verificar si el ID es válido
    if (!id) {
      return res.status(400).json({ error: "Se requiere proporcionar un ID válido" });
    }
    
    // Realizar la actualización en la base de datos
    const connection = await database.connect();
    const result = await connection.query(`UPDATE facultades SET ${columna} = ? WHERE idfacultad = ?`, [valor, id]);
    
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
// DELETE para eliminar una facultad especifica
app.delete("/facultades/:id", async (req, res) => {
    try {
      const id = req.params.id; // Obtener el ID del parámetro de la URL
      
      // Verificar si el ID es válido 
      if (!id) {
        return res.status(400).json({ error: "Se requiere proporcionar un ID válido" });
      }
      
      // Realizar la eliminación en la base de datos
      const connection = await database.connect();
      const result = await connection.query("DELETE FROM facultades WHERE idfacultad = ?", [id]);
      
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



// --------------------------------CARRERAS----------------------------------------------

//GET PARA VISUALIZAR TODO LO QUE TENGA LA TABLA DE CARRERAS
app.get("/carreras", async (req, res) => {
  try {
    const connection = await database.connect();
    const result = await connection.query("SELECT * FROM carreras");
    console.log(result);
    res.json(result); // Envía los resultados como JSON
  } catch (error) {
    console.error("Error al obtener carreras:", error);
    res.status(500).json({ error: "Error al obtener carreras" });
  }
});
//POST PARA AGREGAR UNA NUEVA CARRERA
app.post("/carreras", async (req, res) => {
  try {
    const { nombre,idfacultad } = req.body; // Obtener datos del cuerpo de la solicitud
    const connection = await database.connect();
    const result = await connection.query("INSERT INTO carreras (nombrecarrera,idfacultad) VALUES (?,?)", [nombre,idfacultad]);
    console.log("carrera creada:", result);
    res.status(201).json({ message: "carrera creada exitosamente" });
  } catch (error) {
    console.error("Error al crear carrera:", error);
    res.status(500).json({ error: "Error al crear carrera" });
  }
});
// PUT PARA MODIFICAR UNA CARRERA
app.put("/carreras/:id", async (req, res) => {
  try {
    const id = req.params.id; // Obtener el ID del parámetro de la URL
    const { nombre } = req.body; // Obtener los datos actualizados del cuerpo de la solicitud
    
    // Verificar si el ID es válido 
    if (!id) {
      return res.status(400).json({ error: "Se requiere proporcionar un ID válido" });
    }
    
    // Realizar la actualización en la base de datos
    const connection = await database.connect();
    const result = await connection.query("UPDATE carreras SET nombrecarrera = ? WHERE idcarrera = ?", [nombre, id]);
    
    // Verificar si se actualizó correctamente
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "No se encontró ningún registro con el ID proporcionado" });
    }
    
    // Si todo está bien, enviar una respuesta exitosa
    res.json({ message: "Registro actualizado exitosamente" });
  } catch (error) {
    console.error("Error al modificar carrera:", error);
    res.status(500).json({ error: "Error al modificar carrera" });
  }
});
// PATCH PARA MODIFICAR UNA COLUMNA DE LA CARRERA
app.patch("/carreras/:id", async (req, res) => {
  console.log("PATCH entrando");
  try {
    const id = req.params.id; // Obtener el ID de los parámetros de la solicitud
    const columna = Object.keys(req.body)[0]; // Obtener el nombre de la columna del cuerpo de la solicitud
    const valor = req.body[columna]; // Obtener el valor de la columna del cuerpo de la solicitud

    console.log('id', id);
    console.log('columna', columna);
    console.log('valor', valor);
    
    // Verificar si el ID es válido
    if (!id) {
      return res.status(400).json({ error: "Se requiere proporcionar un ID válido" });
    }
    
    // Realizar la actualización en la base de datos
    const connection = await database.connect();
    const result = await connection.query(`UPDATE carreras SET ${columna} = ? WHERE idcarrera = ?`, [valor, id]);
    // para hacer actualizacion se da el parametro "nombre de la columna"

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
// DELETE PARA ELIMINAR UNA CARRERA ESPECIFICA
app.delete("/carreras/:id", async (req, res) => {
  try {
    const id = req.params.id; // Obtener el ID del parámetro de la URL
    
    // Verificar si el ID es válido 
    if (!id) {
      return res.status(400).json({ error: "Se requiere proporcionar un ID válido" });
    }
    
    // Realizar la eliminación en la base de datos
    const connection = await database.connect();
    const result = await connection.query("DELETE FROM carreras WHERE idcarrera = ?", [id]);
    
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



// --------------------------------MATERIAS----------------------------------------------

//GET PARA VISUALIZAR TODO LO QUE TENGA LA TABLA DE MATERIAS
app.get("/materias", async (req, res) => {
  try {
    const connection = await database.connect();
    const result = await connection.query("SELECT * FROM materias");
    console.log(result);
    res.json(result); // Envía los resultados como JSON
  } catch (error) {
    console.error("Error al obtener materias:", error);
    res.status(500).json({ error: "Error al obtener materias" });
  }
});
//POST PARA AGREGAR UNA NUEVA MATERIA
app.post("/materias", async (req, res) => {
  try {
    const { nombre,idcarrera } = req.body; // Obtener datos del cuerpo de la solicitud
    const connection = await database.connect();
    const result = await connection.query("INSERT INTO materias (nombremateria,idcarrera) VALUES (?,?)", [nombre,idcarrera]);
    console.log("materia creada:", result);
    res.status(201).json({ message: "materia creada exitosamente" });
  } catch (error) {
    console.error("Error al crear materia:", error);
    res.status(500).json({ error: "Error al crear materia" });
  }
});
// PUT PARA MODIFICAR UNA MATERIA
app.put("/materias/:id", async (req, res) => {
  try {
    const id = req.params.id; // Obtener el ID del parámetro de la URL
    const { nombre } = req.body; // Obtener los datos actualizados del cuerpo de la solicitud
    
    // Verificar si el ID es válido 
    if (!id) {
      return res.status(400).json({ error: "Se requiere proporcionar un ID válido" });
    }
    
    // Realizar la actualización en la base de datos
    const connection = await database.connect();
    const result = await connection.query("UPDATE materias SET nombremateria = ? WHERE idmateria = ?", [nombre, id]);
    
    // Verificar si se actualizó correctamente
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "No se encontró ningún registro con el ID proporcionado" });
    }
    
    // Si todo está bien, enviar una respuesta exitosa
    res.json({ message: "Registro actualizado exitosamente" });
  } catch (error) {
    console.error("Error al modificar materia:", error);
    res.status(500).json({ error: "Error al modificar materia" });
  }
});
// PATCH PARA MODIFICAR UNA COLUMNA DE LA MATERIA
app.patch("/materias/:id", async (req, res) => {
  console.log("PATCH entrando");
  try {
    const id = req.params.id; // Obtener el ID de los parámetros de la solicitud
    const columna = Object.keys(req.body)[0]; // Obtener el nombre de la columna del cuerpo de la solicitud
    const valor = req.body[columna]; // Obtener el valor de la columna del cuerpo de la solicitud

    console.log('id', id);
    console.log('columna', columna);
    console.log('valor', valor);
    
    // Verificar si el ID es válido
    if (!id) {
      return res.status(400).json({ error: "Se requiere proporcionar un ID válido" });
    }
    
    // Realizar la actualización en la base de datos
    const connection = await database.connect();
    const result = await connection.query(`UPDATE materias SET ${columna} = ? WHERE idmateria = ?`, [valor, id]);
    // para hacer actualizacion se da el parametro "nombre de la columna"

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
// DELETE PARA ELIMINAR UNA MATERIA ESPECIFICA
app.delete("/carreras/:id", async (req, res) => {
  try {
    const id = req.params.id; // Obtener el ID del parámetro de la URL
    
    // Verificar si el ID es válido 
    if (!id) {
      return res.status(400).json({ error: "Se requiere proporcionar un ID válido" });
    }
    
    // Realizar la eliminación en la base de datos
    const connection = await database.connect();
    const result = await connection.query("DELETE FROM materias WHERE idmateria = ?", [id]);
    
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


// --------------------------------PROFESORES----------------------------------------------

//GET PARA VISUALIZAR TODO LO QUE TENGA LA TABLA DE PROFESORES
app.get("/profesores", async (req, res) => {
  try {
    const connection = await database.connect();
    const result = await connection.query("SELECT * FROM profesores");
    console.log(result);
    res.json(result); // Envía los resultados como JSON
  } catch (error) {
    console.error("Error al obtener profesores:", error);
    res.status(500).json({ error: "Error al obtener profesores" });
  }
});
//POST PARA AGREGAR UN NUEVO PROFESOR
app.post("/profesores", async (req, res) => {
  try {
    const { nombre,idfacultad } = req.body; // Obtener datos del cuerpo de la solicitud
    const connection = await database.connect();
    const result = await connection.query("INSERT INTO profesores (nombreprofesor,idfacultad) VALUES (?,?)", [nombre,idfacultad]);
    console.log("profesor creado:", result);
    res.status(201).json({ message: "profesor creado exitosamente" });
  } catch (error) {
    console.error("Error al crear profesor:", error);
    res.status(500).json({ error: "Error al crear profesor" });
  }
});
// PUT PARA MODIFICAR UN PROFESOR
app.put("/profesores/:id", async (req, res) => {
  try {
    const id = req.params.id; // Obtener el ID del parámetro de la URL
    const { nombre } = req.body; // Obtener los datos actualizados del cuerpo de la solicitud
    
    // Verificar si el ID es válido 
    if (!id) {
      return res.status(400).json({ error: "Se requiere proporcionar un ID válido" });
    }
    
    // Realizar la actualización en la base de datos
    const connection = await database.connect();
    const result = await connection.query("UPDATE profesores SET nombreprofesor = ? WHERE idprofesor = ?", [nombre, id]);
    
    // Verificar si se actualizó correctamente
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "No se encontró ningún registro con el ID proporcionado" });
    }
    
    // Si todo está bien, enviar una respuesta exitosa
    res.json({ message: "Registro actualizado exitosamente" });
  } catch (error) {
    console.error("Error al modificar profesor:", error);
    res.status(500).json({ error: "Error al modificar profesor" });
  }
});
// PATCH PARA MODIFICAR UNA COLUMNA DEL PROFESOR
app.patch("/profesores/:id", async (req, res) => {
  console.log("PATCH entrando");
  try {
    const id = req.params.id; // Obtener el ID de los parámetros de la solicitud
    const columna = Object.keys(req.body)[0]; // Obtener el nombre de la columna del cuerpo de la solicitud
    const valor = req.body[columna]; // Obtener el valor de la columna del cuerpo de la solicitud

    console.log('id', id);
    console.log('columna', columna);
    console.log('valor', valor);
    
    // Verificar si el ID es válido
    if (!id) {
      return res.status(400).json({ error: "Se requiere proporcionar un ID válido" });
    }
    
    // Realizar la actualización en la base de datos
    const connection = await database.connect();
    const result = await connection.query(`UPDATE profesores SET ${columna} = ? WHERE idprofesor = ?`, [valor, id]);
    // para hacer actualizacion se da el parametro "nombre de la columna"

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
// DELETE PARA ELIMINAR UN PROFESOR ESPECIFICO
app.delete("/profesores/:id", async (req, res) => {
  try {
    const id = req.params.id; // Obtener el ID del parámetro de la URL
    
    // Verificar si el ID es válido 
    if (!id) {
      return res.status(400).json({ error: "Se requiere proporcionar un ID válido" });
    }
    
    // Realizar la eliminación en la base de datos
    const connection = await database.connect();
    const result = await connection.query("DELETE FROM profesores WHERE idprofesor = ?", [id]);
    
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



// --------------------------------ESTUDIANTES----------------------------------------------

//GET PARA VISUALIZAR TODO LO QUE TENGA LA TABLA DE ESTUDIANTES
app.get("/estudiantes", async (req, res) => {
  try {
    const connection = await database.connect();
    const result = await connection.query("SELECT * FROM estudiantes");
    console.log(result);
    res.json(result); // Envía los resultados como JSON
  } catch (error) {
    console.error("Error al obtener estudiantes:", error);
    res.status(500).json({ error: "Error al obtener estudiantes" });
  }
});
//POST PARA AGREGAR UN NUEVO ESTUDIANTE
app.post("/estudiantes", async (req, res) => {
  try {
    const { nombre,idcarrera } = req.body; // Obtener datos del cuerpo de la solicitud
    const connection = await database.connect();
    const result = await connection.query("INSERT INTO estudiantes (nombreestudiante,idcarrera) VALUES (?,?)", [nombre,idcarrera]);
    console.log("estudiante creado:", result);
    res.status(201).json({ message: "estudiante creado exitosamente" });
  } catch (error) {
    console.error("Error al crear estudiante:", error);
    res.status(500).json({ error: "Error al crear estudiante" });
  }
});
// PUT PARA MODIFICAR UN ESTUDIANTE
app.put("/estudiantes/:id", async (req, res) => {
  try {
    const id = req.params.id; // Obtener el ID del parámetro de la URL
    const { nombre } = req.body; // Obtener los datos actualizados del cuerpo de la solicitud
    
    // Verificar si el ID es válido 
    if (!id) {
      return res.status(400).json({ error: "Se requiere proporcionar un ID válido" });
    }
    
    // Realizar la actualización en la base de datos
    const connection = await database.connect();
    const result = await connection.query("UPDATE estudiantes SET nombreestudiante = ? WHERE idestudiante = ?", [nombre, id]);
    
    // Verificar si se actualizó correctamente
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "No se encontró ningún registro con el ID proporcionado" });
    }
    
    // Si todo está bien, enviar una respuesta exitosa
    res.json({ message: "Registro actualizado exitosamente" });
  } catch (error) {
    console.error("Error al modificar estudiante:", error);
    res.status(500).json({ error: "Error al modificar estudiante" });
  }
});
// PATCH PARA MODIFICAR UNA COLUMNA DEL PROFESOR
app.patch("/estudiantes/:id", async (req, res) => {
  console.log("PATCH entrando");
  try {
    const id = req.params.id; // Obtener el ID de los parámetros de la solicitud
    const columna = Object.keys(req.body)[0]; // Obtener el nombre de la columna del cuerpo de la solicitud
    const valor = req.body[columna]; // Obtener el valor de la columna del cuerpo de la solicitud

    console.log('id', id);
    console.log('columna', columna);
    console.log('valor', valor);
    
    // Verificar si el ID es válido
    if (!id) {
      return res.status(400).json({ error: "Se requiere proporcionar un ID válido" });
    }
    
    // Realizar la actualización en la base de datos
    const connection = await database.connect();
    const result = await connection.query(`UPDATE estudiantes SET ${columna} = ? WHERE idestudiante = ?`, [valor, id]);
    // para hacer actualizacion se da el parametro "nombre de la columna"

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
// DELETE PARA ELIMINAR UN PROFESOR ESPECIFICO
app.delete("/estudiantes/:id", async (req, res) => {
  try {
    const id = req.params.id; // Obtener el ID del parámetro de la URL
    
    // Verificar si el ID es válido 
    if (!id) {
      return res.status(400).json({ error: "Se requiere proporcionar un ID válido" });
    }
    
    // Realizar la eliminación en la base de datos
    const connection = await database.connect();
    const result = await connection.query("DELETE FROM estudiantes WHERE idestudiante = ?", [id]);
    
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