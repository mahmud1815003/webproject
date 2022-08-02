//External Imports
const express = require('express');
const router = express.Router();

//Internal Imports
const { getAdmin, addUser, deletUser } = require('../Controller/adminController');
const { decorateHtmlResponse } = require('../middleware/common/decorateHtmlResponse');
const { avatarUpload } = require('../middleware/users/avaterUploads');
const { userValidation, userValidationResult } = require('../middleware/users/userValidator');

//Router
router.get('/',decorateHtmlResponse("Admin"), getAdmin);

router.post('/', avatarUpload, userValidation, userValidationResult,addUser);

router.delete('/:_id', deletUser);


module.exports = router;