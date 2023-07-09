const { Router } = require('express')
const router = Router()

//todas las funciones requeridas
const { 
    renderHab,
    createNewHab,
    renderFam,
    createNewFamilia,
    renderFamilias,
    verHab,
    deleteHab,
    renderDia,
    renderReport,
    verFam,
    deleteFam,
  
} = require('../controllers/gestion.controller');

//autenticacion de usuario
const { isAuthenticated } = require('../helpers/auth')

//habitantes /verHab/
router.get('/addPaciente', isAuthenticated, renderHab);

router.get('/verHab/:id', isAuthenticated, verHab); 

router.delete('/eliminarHab/:id', isAuthenticated, deleteHab);

router.delete('/eliminarFam/:id', isAuthenticated, deleteFam);


router.get('/verFamilia/:id', isAuthenticated, verFam); 




router.post('/addPaciente', isAuthenticated, createNewHab);


router.get('/Cita', isAuthenticated, renderFam);

router.post('/addFamilia', isAuthenticated, createNewFamilia);

router.get('/Familias', isAuthenticated, renderFamilias);



router.get('/addDias', isAuthenticated, renderDia);


router.get('/report', isAuthenticated, renderReport);




module.exports = router
