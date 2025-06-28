const express = require('express');
const router = express.Router();
const respuesta = require('../../red/respuestas')
const controlador = require('./controladorPuertas');

router.get('/', async function (req, res) {
  try {
    const items = await controlador.todos();
    respuesta.success(req, res, 200, items);
  } catch (error) {
    respuesta.error(req, res, 500, 'Error al obtener datos de puerta', error);
  }
})

router.get('/:id', async function (req, res) {
  try {
    const items = await controlador.uno(req.params.id);
    respuesta.success(req, res, 200, items);
  } catch (error) {
    respuesta.error(req, res, 500, 'Error al obtener datos de puerta', error);
  }
})

router.post('/agregar', async function (req, res) {
  try {
    const items = await controlador.agregar(req.body);
    if (req.body.id == 0) {
      mensaje = 'Puerta agregada'
    } else {
      mensaje = 'Datos de puerta actualizados'
    }
    respuesta.success(req, res, 200, mensaje); 

  } catch (error) {
    respuesta.error(req, res, 500, 'Error al obtener datos de puerta', error);
  }
})

router.post('/eliminar', async function (req, res) {
  try {
    const items = await controlador.eliminar(req.body);
    respuesta.success(req, res, 200, 'puerta eliminado');
  } catch (error) {
    respuesta.error(req, res, 500, 'Error al obtener datos de puerta', error);
  }
})



module.exports = router