const express = require('express');
const router = express.Router();
const respuesta = require('../../red/respuestas')
const controlador = require('./controladorLuces');

router.get('/', async function (req, res) {
  try {
    const items = await controlador.todos();
    respuesta.success(req, res, 200, items);
  } catch (error) {
    respuesta.error(req, res, 500, 'Error al obtener datos de la luz', error);
  }
})

// Endpoint para obtener una luz específica por ID
router.get('/:id', async function (req, res) {
  try {
    const items = await controlador.uno(req.params.id);
    respuesta.success(req, res, 200, items);
  } catch (error) {
    respuesta.error(req, res, 500, 'Error al obtener datos de la luz', error);
  }
})

// Endpoint para obtener las luces de un usuario específico
router.post('/agregar', async function (req, res) {
  try {
    const items = await controlador.agregar(req.body);
    if (req.body.id == 0) {
      mensaje = 'Luz creada'
    } else {
      mensaje = 'Luz actualizada '
    }
    respuesta.success(req, res, 200, mensaje); 

  } catch (error) {
    respuesta.error(req, res, 500, 'Error al obtener luz', error);
  }
})

// Endpoint para eliminar una luz
router.post('/eliminar', async function (req, res) {
  try {
    const items = await controlador.eliminar(req.body);
    respuesta.success(req, res, 200, 'luz eliminado');
  } catch (error) {
    respuesta.error(req, res, 500, 'Error al obtener la luz', error);
  }
})



module.exports = router