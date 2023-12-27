const express = require('express');
const router = express.Router();

const {getTasks, createNewTask, getTaskById, updateTaskById, deleteTaskById} = require('../controllers/tasks');


router.route('/').get(getTasks).post(createNewTask);
router.route('/:id').get(getTaskById).patch(updateTaskById).delete(deleteTaskById);

module.exports = router;