const Post = require('./../models/postModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

exports.createPost = catchAsync(async (req, res, next) => {
    const user_id = req.user.id;
    const {title, content} = req.body

    const data = await Post.create({
        title: title,
        content: content,
        user_id: user_id
    })

    res.status(201).json({
        status: 'success',
        post_id: data
    });
});

exports.getAllPosts = catchAsync(async (req, res, next) => {
    const data = new APIFeatures(Post, req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate()

    const posts = await data.execute();

    res.status(200).json({
        status: 'success',
        result: posts.query.length,
        posts: posts.query
    })
});

exports.getPost = catchAsync(async (req, res, next) => {
    console.log(req.params.id)
    const user_id = req.user.id;

    const data = await Post.findOne({
        where: {
            id: req.params.id,
            user_id: user_id
        }
    });

    if(!data) {
        return next(new AppError("You don't have any post", 400)); 
    }

    res.status(200).json({
        status: 'success',
        title: data.title,
        content: data.content,
        data
    })
});

exports.updatePost = catchAsync(async (req, res, next) => {
    const {title, content} = req.body;
    const user_id = req.user.id;

    const data = await Post.findOne({
        where: {
            id: req.params.id,
            user_id: user_id
        }
    });

    if(!data) {
        return next(new AppError("You don't have any post", 400)); 
    }

    await data.update({
        title: title,
        content: content
    });

    res.status(200).json({
        status: 'success',
        message: 'updated',
        data
    })
});

exports.deletePost = catchAsync(async (req, res, next) => {
    const user_id = req.user.id;

    const data = await Post.findOne({
        where: {
            id: req.params.id,
            user_id: user_id
        }
    });

    if(!data) {
        return next(new AppError("You don't have any post", 400)); 
    }

    await data.destroy();

    res.status(200).json({
        status: 'success',
        message: 'deleted'
    })
});