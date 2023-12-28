const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const createCustomError = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });

    if (!task) {
        return next(createCustomError('No task with id : ' + taskID, 404));
    }

    res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });

    if (!task) {
        return next(createCustomError('No task with id : ' + taskID, 404));
    };

    res.status(200).json({ task })
});

const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const data = req.body;
    if (data) {
        const task = await Task.findOneAndUpdate({ _id: taskID }, data, {
            new: true,
            runValidators: true
        });

        if (!task) {
            return next(createCustomError('No task with id : ' + taskID, 404));
        }
    } else {
        return next(createCustomError('No data in request body', 400));
    }

    res.status(200).json({ task })
});

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
};