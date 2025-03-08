const express = require('express');
const postController = require('../controllers/postController');
const postSchema = require('../schema/userSchema');
const userController = require('../controllers/userController');
const commentRouter = require('./commentRoutes');
const likeRouter = require('./likeRoutes');
const valReq = require('./../utils/valReq');

const router = express.Router();

router.use(userController.protect);

router.use('/:postId', likeRouter);
router.use('/:postId', commentRouter);

router.route('/')
    .post(valReq.validateRequest(postSchema.createUpdateSchema), postController.createPost)
    .get(postController.getAllPosts)

router.route('/:id')
    .get(postController.getPost)
    .patch(valReq.validateRequest(postSchema.createUpdateSchema), postController.updatePost)
    .delete(postController.deletePost)

module.exports = router;