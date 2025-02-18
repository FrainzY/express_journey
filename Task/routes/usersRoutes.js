const express = require('express');
const userController = require('../controllers/userController');
const userSchema = require('./../Schema/userSchema');
const valReq = require('./../utils/valReq');

const router = express.Router();

router.route('/login').post(valReq.validateRequest(userSchema.loginSchema), userController.login);

router.route('/register').post(valReq.validateRequest(userSchema.registerSchema), userController.register);


router.route('/:id')
.delete(userController.deleteUser)

router.route('/get-me').get(userController.protect, userController.getMe);

module.exports = router;