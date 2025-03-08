const express = require('express');
const likeController = require('./../controllers/likeController');
const valReq = require('./../utils/valReq');

const router = express.Router({mergeParams: true});

router.route('/like')
    .post(likeController.createLike);

router.route('/unlike')
    .delete(likeController.deleteLike);

module.exports = router;