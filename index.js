require('dotenv').config();

const express = require('express');
const cors = require('cors');
const {dbConnection} = require('./database/config')

// Creando servidor de express
const server = express();

// Configurar CORS
server.use(cors());

// Base de datos
dbConnection();

//console.log(process.env);

//Rutas
server.get('/', (req, res) => {

    res.json({ 
        ok: true,
        msg: 'Primera ruta'
    });
});





server.listen(process.env.PORT, () => {
    console.log('Server running on port ' + process.env.PORT);
});
