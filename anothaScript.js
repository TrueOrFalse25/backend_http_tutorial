const express = require('express');
const { parse } = require('path');
const app = express();
app.get('/', (req, res) => {
    res.send('Hello there');
});
const courses = [
    {id: 1, name: 'Math'},
    {id: 2, name: 'English'},
    {id: 3, name: 'Gym'}
];
//http post requests route
app.post('/api/courses', (req, res) => {
    if (!req.body.name) {
        res.status(404).send("Missing name or genre");
        return;
    }
    if (req.body.name.length < 3) {
        res.status(404).send("Name must have at least 3 characters");
        return;
    }
    let course = {
        id: courses.length + 1,
        name: req.body.name,
    }
    courses.push(course);
    res.status(200).send(course);
});
//http put requests route
app.put('/api/courses/:id', (req, res) => {
    if (!req.body.name) {
        res.status(404).send("Missing name");
        return;
    }
    if (req.params.id < 0 || req.params.id > courses.length) {
        res.status(400).send("Invalid id");
        return;
    }
    if (req.body.name.length < 3) {
        res.status(400).send("Name must have at least 3 characters");
        return;
    }
    courses[req.params.id - 1] = {
        id: parseInt(req.params.id),
        name: req.body.name,
    }
    res.status(200).send(courses[req.params.id - 1]);
});
//http delete requests route
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send("Couldn't find course");
        return;
    }
    let objIndex = courses.indexOf(course);
    courses.splice(objIndex, 1);
    courses.forEach((obj, index) => {
        obj.id = index + 1;
    })
    res.status(200).send("Course deleted successfully");
});

app.listen(3000, () => { 
    console.log('Listening on Port 3000...'); 
});