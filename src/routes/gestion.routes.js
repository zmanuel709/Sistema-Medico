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
    renderHabForm,
    renderReport,
    verFam,
    deleteFam,
  
} = require('../controllers/gestion.controller');

//autenticacion de usuario
const { isAuthenticated } = require('../helpers/auth')

//habitantes 
router.get('/habitante', isAuthenticated, renderHab);

router.get('/verHab/:id', isAuthenticated, verHab); 

router.delete('/eliminarHab/:id', isAuthenticated, deleteHab);

router.post('/habitante', isAuthenticated, createNewHab);

router.get('/habFom', isAuthenticated, renderHabForm);




//famlias
router.delete('/eliminarFam/:id', isAuthenticated, deleteFam);

router.get('/verFamilia/:id', isAuthenticated, verFam); 

router.get('/famForm', isAuthenticated, renderFam);

router.post('/addFamilia', isAuthenticated, createNewFamilia);

router.get('/Familias', isAuthenticated, renderFamilias);



//reportes
router.get('/report', isAuthenticated, renderReport);



module.exports = router
