const express = require ('express');
const userController = require('../controllers/userController');
const userSchema = require('../schema/userSchema');
const valReq = require('./../utils/valReq');

const router = express.Router();

router.route('/signUp')
    .post(valReq.validateRequest(userSchema.signUpSchema), userController.signUp);

router.route('/login')
    .post(valReq.validateRequest(userSchema.loginSchema), userController.login);

router.route('/:id')
    .delete(userController.deleteUser)

module.exports = router;