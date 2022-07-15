const usersCtrl = {};

const passport = require('passport');

const Users = require('../models/Users')
const Role = require('../models/role')

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

usersCtrl.signup = async (req, res) => {
    const errors = [];
    const { name, email, password, confirm_password, roles } = req.body;
    if (password != confirm_password) {
        errors.push({text: 'las contraseñas no coinciden'});
    }
    if (password.length < 6) {
        errors.push({text: 'La contraseña debe tener minimo 6 caracteres.'});
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

            // checking for roles
            if (req.body.roles) {
                const foundRoles = await Role.find({ name: { $in: roles } });
                newUSer.roles = foundRoles.map((role) => role._id);
            } else {
                const role = await Role.findOne({ name: "Paciente" });
                newUSer.roles = [role._id];
            }

            await newUSer.save(); 
            console.log(newUSer);
            req.flash('success_msg', 'registro exitoso. ya puede ingresar al sistema.');
            res.redirect('/');
        }
    };
};

usersCtrl.renderSignInForm = (req, res) => {
    res.render('users/signin');
};

usersCtrl.renderRecuperarForm = (req, res) => {
    res.render('users/recuperar');
};

usersCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect: '/addPaciente',
    failureFlash: true
});

usersCtrl.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'tu sesion se ha cerrado.');
    res.redirect('/');
}



module.exports = usersCtrl;