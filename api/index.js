const express = require('express');
const cors = require('cors');
const app = express();

// Configurar CORS para permitir cualquier origen
app.use(cors({
  origin: 'http://localhost:3000',  // Reemplaza con la URL de tu aplicación React
  optionsSuccessStatus: 200
}));

app.use(express.json());

const PORT = process.env.PORT || 5000;

// Configurar ruta de usuario
const userRoutes = require('./src/routes/users');
app.use('/api/users', userRoutes);

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
