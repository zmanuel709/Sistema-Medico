const { Router } = require('express');
const router = Router();

const { renderSignUpForm, renderSignInForm, signup, signin, renderRecuperarForm, logout } = require('../controllers/users.controllers');

router.get('/users/signup', renderSignUpForm);

router.post('/users/signup', signup);

router.get('', renderSignInForm);

router.post('/users/signin', signin);

router.get('/users/recuperar', renderRecuperarForm);

router.get('/users/logout', logout);

module.exports = router;