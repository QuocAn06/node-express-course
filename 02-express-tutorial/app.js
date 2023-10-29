const express = require('express');
const app = express();
let { people } = require('./data');

// static assets
app.use(express.static('./methods-public'));

// parse form data
app.use(express.urlencoded({ extended: false }));

// parse json
app.use(express.json());

app.get('/api/people', (req, res) => {
    res.status(200).json({ success: true, data: people });
});

app.post('/api/people', (req, res) => {
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
    }else{
        result.person = name;
    }

    res.status(201).json(result);
});

app.post('/login', (req, res) => {
    const { name } = req.body;
    if (name) {
        return res.status(200).send(`Welcome ${name}`);
    };

    res.status(401).send('Please Provide Credentials')
});

app.listen(5000, () => {
    console.log(`Server is listening on port 5000... `);
});
