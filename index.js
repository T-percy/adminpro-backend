require('dotenv').config();

const express = require('express');
const cors = require('cors');
const {dbConnection} = require('./database/config')

// Creando servidor de express
const server = express();

// Configurar CORS
server.use(cors());

// Lectura y Parseo del body - Debe ir antes de las rutas
server.use(express.json());

// Base de datos
dbConnection();

//Rutas
server.use('/api/users', require('./routes/users'));
server.use('/api/login', require('./routes/auth'));

server.listen(process.env.PORT, () => {
    console.log('Server running on port ' + process.env.PORT);
});
