const express = require('express');
const cors = require('cors');
const app = express();



app.use(express.json());

const corsOptions = {
  origin: ['https://frontend1.com', 'https://frontend2.com'], // Permitir solicitudes desde estos orígenes
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

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
