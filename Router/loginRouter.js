//External Imports
const express = require('express');
const router = express.Router();

//Internal Imports
const { getLogin, handleLogin } = require('../Controller/loginController');
const { decorateHtmlResponse } = require('../middleware/common/decorateHtmlResponse');
const { loginValidator, loginValidatorResults } = require('../middleware/login/loginValidator');

//Router
router.get('/',decorateHtmlResponse("Log In"), getLogin);

router.post('/', decorateHtmlResponse("login"), loginValidator, loginValidatorResults, handleLogin);

module.exports = router;   