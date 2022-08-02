//External Imports
const express = require('express');
const router = express.Router();

//Internal Imports
const { getIndex } = require('../Controller/indexController');
const { decorateHtmlResponse } = require('../middleware/common/decorateHtmlResponse');

//Router
router.get('/',decorateHtmlResponse("Home"), getIndex);


module.exports = router;