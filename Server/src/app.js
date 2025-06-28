const express = require('express');
const cors = require('cors');
const config = require('./config');
const clientes = require('./molulos/clientes/rutas')
const usuario = require('./molulos/users/rutas')
const puertas = require('./molulos/puertas/rutas')
const luces = require('./molulos/luces/rutas')


const app = express();
app.use(express.json());

//Configuracion
app.set('port', config.app.port);

//Permitir conexion externo 
app.use(cors());

//Rutas
app.use('/api/clientes',clientes)
app.use('/api/usuarios',usuario)
app.use('/api/puertas', puertas)
app.use('/api/luces', luces)



module.exports = app;
