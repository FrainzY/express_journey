const Like = require('./../models/likeModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.createLike = catchAsync(async (req, res, next) => {
    const post_id = req.params.postId;
    const user_id = req.user.id;

    const checkData = await Like.findOne({
        where: {
            post_id: post_id,
            user_id: user_id
        }
    });

    if(checkData) {
        return next(new AppError('Already Liked', 400)); 
    }

    const data = await Like.create({
        post_id: post_id,
        user_id: user_id
    });

    res.status(200).json({
        status: 'success',
        message: 'liked',
        data
    });
});

exports.deleteLike = catchAsync(async (req, res, next) => {
    const post_id = req.params.postId;
    const user_id = req.user.id;

    const data = await Like.findOne({
        where: {
            post_id: post_id,
            user_id: user_id
        }
    });

    if(!data) {
        return next(new AppError("Post Isn't Liked Yet", 400)); 
    }
    
    await data.destroy();

    res.status(200).json({
        status: 'success',
        message: 'unliked',
        data
    });
});