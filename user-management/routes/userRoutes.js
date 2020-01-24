//require remote
const express = require('express');
const router = express.Router();
const swaggerUi = require("swagger-ui-express");


//require local
const validator = require('../utils/validator');
const userController = require('./../controllers/userController');
const authenticationController = require('./../controllers/authenticationController');
const sessionController = require('./../controllers/sessionController');

//swagger defination
swaggerDocument = require('../swagger.json');

router.post('/create', validator.validate('createUser'), userController.createUser);
router.post('/unpw/verify', validator.validate('unpw'), authenticationController.login);
router.post('/session/verify', validator.validate('verifySession'), sessionController.sesssionVerify);
router.use("/docs", swaggerUi.serve);

router.get("/docs", swaggerUi.setup(swaggerDocument));

module.exports = router;