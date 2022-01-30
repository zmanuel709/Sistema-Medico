const { Router } = require('express')
const router = Router()

const { 
    renderEsp,
    createNewEsp,
    updateEsp,
    deleteEsp,
    espToggleDone
} = require('../controllers/gestion.controller');

const { isAuthenticated } = require('../helpers/auth')

//lista especialidades
router.get('/addEsp', isAuthenticated, renderEsp);

//add especialidad
router.post('/addEsp', isAuthenticated, createNewEsp);

//editar especialidades
router.put('/addEsp/edit/:id', isAuthenticated, updateEsp);

//delete especialidades
router.delete('/addEsp/delete/:id', isAuthenticated, deleteEsp);

router.get('/addEsp/:id/toggleDone', isAuthenticated, espToggleDone);

module.exports = router