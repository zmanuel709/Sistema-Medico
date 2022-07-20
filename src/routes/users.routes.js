const { Router } = require('express');
const router = Router();

const { renderSignUpForm, renderSignInForm, signup, signin, renderRecuperarForm, logout } = require('../controllers/users.controllers');

// rutas relacionadas con el ingreso y registro de usuarios  

//mostrar formulario de registro
router.get('/users/signup', renderSignUpForm);

// enviar registro 
router.post('/users/signup', signup);

// ruta inicial redirecciona al login
router.get('', renderSignInForm);

//enviar datos del logim
router.post('/users/signin', signin);

// ruta para recuperar contraseña (aun en desarrollo)
router.get('/users/recuperar', renderRecuperarForm);

//cerrar sesion 
router.get('/users/logout', logout);

module.exports = router;