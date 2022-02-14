const { Router } = require('express')
const router = Router()

//todas las funciones requeridas
const { 
    renderEsp,
    createNewEsp,
    updateEsp,
    deleteEsp,
    espToggleDone,
    renderPac,
    createNewPac,
    updatePac,
    deletePac,
    renderHrc,
    renderDia,
    renderDoc,
    renderCitas
} = require('../controllers/gestion.controller');

//autenticacion de usuario
const { isAuthenticated } = require('../helpers/auth')

//especialidades

//lista especialidades
router.get('/addEsp', isAuthenticated, renderEsp);

//add especialidad
router.post('/addEsp', isAuthenticated, createNewEsp);

//editar especialidades
router.put('/addEsp/edit/:id', isAuthenticated, updateEsp);

//delete especialidades
router.delete('/addEsp/delete/:id', isAuthenticated, deleteEsp);

//marcar como activas o inactivas
router.get('/addEsp/:id/toggleDone', isAuthenticated, espToggleDone);


//pacientes

//lista pacientes
router.get('/addPaciente', isAuthenticated, renderPac);

//add paciente
router.post('/addPaciente', isAuthenticated, createNewPac);

//editar paciente
router.put('/addPaciente/edit/:id', isAuthenticated, updatePac);

//delete paciente
router.delete('/addPaciente/delete/:id', isAuthenticated, deletePac);

//historiales medicos

//mostrar historial
router.get('/historial/:id', isAuthenticated);

// rutas para ver los horarios
router.get('/addHrc', isAuthenticated, renderHrc);

// rutas para ver los dias
router.get('/addDias', isAuthenticated, renderDia);

// rutas para ver los doctores
router.get('/addDoc', isAuthenticated, renderDoc);

//rutas para ver las citas
router.get('/addCitas', isAuthenticated, renderCitas);

module.exports = router