const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log(req.user.id);
        return next();
    }
    req.flash('error_msg', 'Aun no has iniciado sesion en esta pagina...');
    res.redirect('/');
}

module.exports = helpers;