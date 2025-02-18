const Task = require('./../models/tasksModel');
const catchAsync = require('./../utils/catchAsync');
const ApiFeatures = require('./../utils/apiFeatures');

exports.getAllTasks = catchAsync( async (req, res, next) => {
    const data = new ApiFeatures(Task, req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate()

    const tasks = await data.execute();

    res.status(200).json({
        status: 'success',
        result: tasks.query.length,
        tasks: tasks.query
    })
});

exports.getOneTasks = catchAsync( async (req, res, next) => {
    const data = await Task.findOne(req.body.id);

    res.status(200).json({
        status: 'success',
        data
    })
});

exports.postTasks = catchAsync( async (req, res, next) => {
    console.log(req.body);
    const {user_id, title, description, status, priority, due_date} = req.body;
    const data = await Task.create({
        user_id: user_id, 
        title: title, 
        description: description, 
        status: status, 
        priority: priority, 
        due_date: due_date
    });

    res.status(201).json({
        status: 'success',
        data
    })
});

exports.updateTasks = catchAsync( async (req, res, next) => {
    const {title, description, status, prioritu, due_date}= req.body;
    const data = await Task.findByPk(req.params.id)

    await data.update({title, description, status, prioritu, due_date})

    res.status(200).json({
        status: 'Success',
        data
    });
});

exports.deleteTasks = catchAsync( async (req, res, next) => {
    const data = await Task.findByPk(req.params.id)

    await data.destroy();
    
    res.status(204).json({
        status: 'Success',
        data: null
    })
});