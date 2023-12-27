const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
    try {
        const response = await Task.find({});
        res.status(200).json({ response });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const createTask = async (req, res) => {
    try {
        const response = await Task.create(req.body);
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const getTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const response = await Task.findOne({ _id: taskID });

        if(!response){
            return res.status(404).json({msg: `No task with id: ${taskID}`});
        }

        res.status(200).json({ response });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const updateTask = (req, res) => {
    res.send('update task');
}

const deleteTask = (req, res) => {
    res.send('delete task');
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
};