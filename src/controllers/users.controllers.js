const usersCtrl = {};

const passport = require('passport');

const Users = require('../models/Users')

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

usersCtrl.signup = async (req, res) => {
    const errors = [];
    const { name, email, password, confirm_password } = req.body;
    if (password != confirm_password) {
        errors.push({text: 'las contraseñas no coinciden'});
    }
    if (password.length < 4) {
        errors.push({text: 'La contraseña debe tener minimo 4 caracteres.'});
    } 
    if (errors.length > 0) {
        res.render('users/signup', {
            errors,
            name,
            email,
            password,
            confirm_password,
        })
    } else {
        const emailUser = await Users.findOne({email: email});
        if (emailUser) {
            req.flash('error_msg', 'El Email ya esta en uso');
            res.redirect('/users/signup');
        } else {
            const newUSer = new Users({name, email, password});
            newUSer.password = await newUSer.encryptPassword(password);
            await newUSer.save(); 
            req.flash('success_msg', 'registro exitoso. ya puede ingresar al sistema.');
            res.redirect('/users/signin');z
        }
    };
};

usersCtrl.renderSignInForm = (req, res) => {
    res.render('users/signin');
};

usersCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/',
    failureFlash: true
});

usersCtrl.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'tu sesion se ha cerrado.');
    res.redirect('/users/signin');
}

module.exports = usersCtrl;