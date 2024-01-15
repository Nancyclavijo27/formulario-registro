const express = require('express');
const router = express.Router();

router.post('/register', (req, res, next) => {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const { name, email, password } = req.body;

    // Validaciones
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Validar contraseña con expresiones regulares
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula, una letra minúscula y un número' });
    }

    // Lógica de registro (aquí puedes realizar la inserción en la base de datos, etc.)
    // En este ejemplo, simplemente enviamos un mensaje de éxito
    res.json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    next(error); // Pasa el error al siguiente middleware de manejo de errores
  }
});

module.exports = router;
