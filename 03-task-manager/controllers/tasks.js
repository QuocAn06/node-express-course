const Task = require('../models/Task');

// Get all tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

// Create a new task
const createNewTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

// Get a task by ID
const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOne({ _id: id });
        if (!task) {
            return res.status(404).json({ msg: `No task with id: ${id}` });
        }
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

// Delete a task by ID
const deleteTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findOneAndDelete({ _id: id });

        if (!deletedTask) {
            return res.status(404).json({ msg: `No task with id: ${id}` });
        };

        res.status(200).json({ task: null, status: "successful" });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

// Update a task (placeholder)
const updateTaskById = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true
        });

        if (!task) {
            return res.status(404).json({ msg: `No task with id: ${id}` });
        };

        res.status(200).json({ id, data: req.body });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

module.exports = {
    getTasks,
    createNewTask,
    getTaskById,
    updateTaskById,
    deleteTaskById
};