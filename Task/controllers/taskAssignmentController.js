const catchAsync = require('../utils/catchAsync');
const taskAssign = require('./../models/task_assignmentModel');
const AppError = require('../utils/appError');

exports.assign = catchAsync(async (req, res, next) => {
    const task_id = req.params.taskId;
    const {assigned_to} = req.body;

    const usertask_assign = await taskAssign.findOne({
        where:{
            assigned_to: assigned_to,
            task_id: task_id
        }
    });

    if(usertask_assign){
        return next(
            res.status(400).json({
                status: 'error',
                message: 'user already assigned'
            })
        );
    };

    const data = await taskAssign.create({
        task_id: task_id,
        assigned_to: assigned_to
    });

    res.status(201).json({
        status: 'success',
        data
    })
});

exports.assignedToMe = catchAsync(async (req, res, next) => {
    const data = await taskAssign.findOne({where:{
            assigned_to: req.user.id
        }
    });

    if(!data){
        return next(
            res.status(400).json({
                status: 'success',
                message: 'no data retrieved'
            })
        );
    }

    res.status(200).json({
        status: 'success',
        results: data.length,
        data
    })
});

exports.unassign = catchAsync(async (req, res, next) => {
    const task_id = req.params.taskId;

    const usertask_unassign = await taskAssign.findAll({
        where:{
            task_id: task_id
        }
    });

    if(!usertask_unassign){
        return next(
            res.status(400).json({
                status: 'error',
                message: 'task already unassigned'
            })
        );
    };

    await Promise.all(usertask_unassign.map(task => task.destroy()));

    res.status(200).json({
        status: 'success',
        message: 'task successfully unassigned'
    })
});