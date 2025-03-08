const Comment = require('./../models/commentModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getComment = catchAsync( async (req, res, next) => {
    const user_id = req.user.id;
    const post_id = req.params.postId;

    const data = await Comment.findAll({
        where: {
            post_id: post_id,
            user_id: user_id
        }
    })

    if(!data) {
        return next(new AppError("You don't have any comment in this post", 400)); 
    }

    res.status(200).json({
        status: 'success',
        data
    })
});

exports.createComment = catchAsync( async (req, res, next) => {
    const user_id = req.user.id;
    const post_id = req.params.postId;
    const {content} = req.body;

    const data = await Comment.create({
        user_id: user_id,
        post_id: post_id,
        content: content
    })

    res.status(201).json({
        status: 'success',
        comment_id: data
    });
});

exports.deleteComment = catchAsync( async (req, res, next) => {
    const user_id = req.user.id;
    const comment_id = req.params.id;

    const data = await Comment.findOne({
        where: {
            id: comment_id,
            user_id: user_id,
        }
    })

    if(!data) {
        return next(new AppError("You don't have any comment in this post", 400)); 
    }

    await data.destroy();

    res.status(200).json({
        status: 'success',
        message: 'deleted'
    })
});