const User = require('./../models/usersModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');

const signToken = id => {
    return jwt.sign({id:id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION
    })
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user.id);

    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
};

exports.getMe = async (req, res, next) => {
    const getMe = await User.findByPk(req.user.id);

    res.status(200).json({
        status: "success",
        data: getMe
    })
};

exports.register = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);

    newUser.password = undefined;

    // Karena Hanya digunakan untuk register dan tidak langsung di login kan
    // createSendToken(newUser, 201, res);
    res.status(201).json({
        status: 'success',
        data: {
            newUser
        }
    })
});

exports.login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return next(new AppError('Please provide email and password', 400))
    };

    const user = await User.scope('withPassword').findOne({where: {email}});

    if(!user || !await user.correctPassword(password)) {
        return next(new AppError('Incorrect email or password'), 401);
    };

    createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return next(new AppError('You are not logged in. Please log in to get access', 401))
    };

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    console.log(decoded.id);

    const currentUser = await User.findByPk(decoded.id);

    if(!currentUser) {
        return next(new AppError('The user belong to the token no longer exists', 401))
    }

    req.user = currentUser;
    next();
});

// only delete to test if my register work or not 
exports.deleteUser = catchAsync( async (req, res, next) => {
    const user = await User.findByPk(req.params.id);

    await user.destroy();

    res.status(204).json({
        status: 'success',
        data: null
    })
})