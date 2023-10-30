const express = require('express');
const router = express.Router();

let { people } = require('../data');

router.get('/', (req, res) => {
    res.status(200).json({ success: true, data: people });
});

router.post('/', (req, res) => {
    const { name } = req.body;
    let result = {
        success: true,
    }
    if (!name) {
        result = {
            success: false,
            msg: "please provide name value"
        };
        return res.status(400).json(result);
    } else {
        result.person = name;
    }

    res.status(201).json(result);
});

router.post('/postman', (req, res) => {
    const { name } = req.body;
    let result = {
        success: true,
    }
    if (!name) {
        result = {
            success: false,
            msg: "please provide name value"
        };

        return res.status(400).json(result);
    } else {
        result.data = [...people, name];
    }

    res.status(201).json(result);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const person = people.find((person) => { person.id === Number(id) });

    let result = {
        success: true
    };
    if (!people) {
        result = { success: false, msg: `No person with id ${id}` };
        return res.status(400).json(result);
    };

    const newPeople = people.map((person) => {
        if (person.id === Number(id)) {
            person.name = name;
        }
        return person;
    });

    res.status(200).json({ success: true, data: newPeople });
});

router.delete('/:id', (req, res) => {
    const person = people.find((person) => person.id === Number(req.params.id));

    if (!person) {
        return res.status(404).json({ success: false, msg: `no person with id ${req.params.id}` });
    };

    const newPeople = people.filter((person) => person.id !== Number(req.params.id));
    return res.status(200).json({ success: true, data: newPeople });
});

module.exports = router

