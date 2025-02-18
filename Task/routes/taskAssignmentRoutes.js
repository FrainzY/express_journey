const express = require('express');
const taskAssignmentController = require('./../controllers/taskAssignmentController');
const assignTaskSchema = require('./../Schema/assignTaskSchema');
const valReq = require('./../utils/valReq');

const router = express.Router({mergeParams: true});

router.route('/assign')
    .post(valReq.validateRequest(assignTaskSchema.assignTaskSchema), taskAssignmentController.assign)

router.route('/unassign')
    .delete(taskAssignmentController.unassign)

module.exports = router;
