const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Aun no has iniciado sesion en esta pagina...');
    res.redirect('/users/signin');
}

module.exports = helpers;