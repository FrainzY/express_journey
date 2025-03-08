const express = require('express');
const commentController = require('./../controllers/commentController');
const userController = require('../controllers/userController');
const commentSchema = require('../schema/commentSchema');
const valReq = require('./../utils/valReq');

const router = express.Router({mergeParams: true});

router.route('/comments')
    .get(commentController.getComment)
    .post(valReq.validateRequest(commentSchema.addCommentSchema), commentController.createComment);

router.use(userController.protect);

router.route('/:id')
    .delete(commentController.deleteComment);

module.exports = router;