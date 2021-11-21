const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// crear una tarea
// api/tareas
router.post('/',
  auth,
  [
    check('name', 'El Nombre es obligatorio').not().isEmpty(),
    check('projectId', 'El proyecto es obligatorio').not().isEmpty()
  ],
  tareaController.crearTarea
);

// Obtener las tareas por proyecto
router.get('/',
  auth,
  tareaController.obtenerTareas
);

// Actualizar tarea
router.put('/:id',
  auth,
  tareaController.actualizarTarea
);

// Eliminar tarea
router.delete('/:id',
  auth,
  tareaController.eliminarTarea
);

module.exports = router;
