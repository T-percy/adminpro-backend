//var serveIndex = require('serve-index');
//app.use(express.static(__dirname + '/'))
//app.use('/uploads', serveIndex(__dirname + '/uploads'));

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const {dbConnection} = require('./database/config')

// Creando servidor de express
const server = express();

// Configurar CORS
server.use(cors());

// Carpeta pública
server.use(express.static('public'));

// Lectura y Parseo del body - Debe ir antes de las rutas
server.use(express.json());

// Base de datos
dbConnection();

//Rutas
server.use('/api/user', require('./routes/user'));
server.use('/api/login', require('./routes/auth'));
server.use('/api/hospital', require('./routes/hospital'));
server.use('/api/medico', require('./routes/medico'));
server.use('/api/todo', require('./routes/busqueda'));
server.use('/api/upload', require('./routes/upload'));

server.listen(process.env.PORT, () => {
    console.log('Server running on port ' + process.env.PORT);
});
