const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const usersRouter = require('./routes/users');
const formsRouter = require('./routes/forms'); // Importa el router de forms

const app = express();

// Conectar a MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Rutas
app.use('/api', usersRouter); // Define la ruta base '/api' para usuarios
app.use('/api/forms', formsRouter); // Define la ruta base '/api/forms' para formularios

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
