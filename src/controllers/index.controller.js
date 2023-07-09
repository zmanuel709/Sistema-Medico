const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {
    res.render('users/signin')
}


indexCtrl.renderAbout = (req, res) => {
    res.render('about')
}

module.exports = indexCtrl;