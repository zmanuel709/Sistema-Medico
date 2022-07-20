const { Router } = require('express')
const router = Router()

//aqui se importan todas las funciones requeridas por las rutas
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
    renderEmp,
    createNewEmp,
    updateEmp,
    deleteEmp,
    renderCit,
    createNewCit,
    updateCit,
    deleteCit,
    renderRep,
    renderPer,
    renderTra,
    renderAce,
    renderBit,
    renderRec,
    renderVerRec,
    renderFormCita,
    renderConfCita,
    renderVerCita,
    isModerator,
    isAdmin,
    comprobarRole,
    registraracces
} = require('../controllers/gestion.controller');

//autenticacion de usuario
const { isAuthenticated } = require('../helpers/auth')


//ruta de reportes
router.get('/reportes', isAuthenticated, renderRep);


//perfil de usuario
router.get('/perfil', isAuthenticated, renderPer);


//bitacora de transacciones
router.get('/transacciones', isAuthenticated, renderTra);


//bitacora de acceso
router.get('/acceso', isAuthenticated, renderAce);


//rutas de la billetera
router.get('/billetera', isAuthenticated, renderBit);
router.get('/recargar', isAuthenticated, renderRec);
router.get('/verRecarga', isAuthenticated, renderVerRec);


//rutas para solicitar una cita
router.get('/solicitarCita', isAuthenticated, renderFormCita);
router.get('/confCita', isAuthenticated, renderConfCita);
router.get('/verCita', isAuthenticated, renderVerCita);


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
router.get('/addPaciente', isAuthenticated, registraracces, renderPac);
//add paciente
router.post('/addPaciente', isAuthenticated, createNewPac);
//editar paciente
router.put('/addPaciente/edit/:id', isAuthenticated, isAdmin, updatePac);
//delete paciente
router.delete('/addPaciente/delete/:id', isAuthenticated, isAdmin, deletePac);
//mostrar historial
router.get('/historial/:id', isAuthenticated);


// rutas para ver los horarios
router.get('/addHrc', isAuthenticated, renderHrc);
// rutas para ver los dias
router.get('/addDias', isAuthenticated, renderDia);


//medicos

// rutas para ver los medicos
router.get('/addEmpleado', isAuthenticated, renderEmp);
//add medico
router.post('/addEmpleado', isAuthenticated, createNewEmp);
//editar medico
router.put('/addEmpleado/edit/:id', isAuthenticated, isAdmin, updateEmp);
//delete medico
router.delete('/addEmpleado/delete/:id', isAuthenticated, isAdmin, deleteEmp);


//citas

//rutas para ver las citas
router.get('/Cita', isAuthenticated, renderCit);
router.post('/Cita', isAuthenticated, createNewCit);
router.put('/Cita/edit/:id', isAuthenticated, updateCit);
router.delete('/Cita/delete/:id', isAuthenticated, deleteCit);

module.exports = router