const { Router } = require('express')
const router = Router();

const { renderIndex, renderAbout } = require('../controllers/index.controller')

// --------estas rutas no estan en uso por ahora  -------
router.get('/inicio', renderIndex);

router.get('/about', renderAbout);

module.exports = router;