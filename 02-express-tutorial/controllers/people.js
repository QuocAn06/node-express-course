let { people } = require('../data');

const getPeople = (req, res) => {
    res.status(200).json({ success: true, data: people });
};

const createPerson = (req, res) => {
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
};

const createPersonPostman = (req, res) => {
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
};

const updatePerson = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const person = people.find((person) => { person.id === Number(id) });

    let result = {
        success: true
    };
    if (!person) {
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
};

const deletePerson = (req, res) => {
    const person = people.find((person) => person.id === Number(req.params.id));

    if (!person) {
        return res.status(404).json({ success: false, msg: `no person with id ${req.params.id}` });
    };

    const newPeople = people.filter((person) => person.id !== Number(req.params.id));
    return res.status(200).json({ success: true, data: newPeople });
};

module.exports = {
    getPeople,
    createPerson,
    createPersonPostman,
    updatePerson,
    deletePerson
};
