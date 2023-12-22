const express = require('express');
const app = express();
const tasksRouter = require('./routers/tasks');

//middleware
app.use(express.json());

//router
app.get('/hello', (req, res) => {
    res.send('Task Manager App');
});

app.use('/api/v1/tasks', tasksRouter);

const port = 3000;

app.listen(port, console.log(`Server is listening on port ${port}...`));