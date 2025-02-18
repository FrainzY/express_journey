const express = require('express');
const tasksController = require('../controllers/tasksController');
const usersController = require('../controllers/userController');
const taskAssignmentRouter = require('../routes/taskAssignmentRoutes');
const taskAssignmentController = require('./../controllers/taskAssignmentController');
const taskSchema = require('./../Schema/taskSchema');
const valReq = require('./../utils/valReq');

const router = express.Router();

router.use(usersController.protect);

router.use('/:taskId', taskAssignmentRouter);

router.route('/')
.get(tasksController.getAllTasks)
.post(valReq.validateRequest(taskSchema.taskSchema), tasksController.postTasks);

router.route('/assigned-to-me')
    .get(taskAssignmentController.assignedToMe);

router.route('/:id')
    .get(tasksController.getOneTasks)
    .patch(valReq.validateRequest(taskSchema.updateTaskSchema), tasksController.updateTasks)
    .delete(tasksController.deleteTasks);

module.exports = router;