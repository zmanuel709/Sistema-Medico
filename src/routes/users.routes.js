const { Router } = require('express');
const router = Router();

const { renderSignUpForm, renderSignInForm, signup, signin, logout } = require('../controllers/users.controllers');

router.get('/users/signup', renderSignUpForm);

router.post('/users/signup', signup);

router.get('/users/signin', renderSignInForm);

router.post('/users/signin', signin);

router.get('/users/logout', logout);

module.exports = router;