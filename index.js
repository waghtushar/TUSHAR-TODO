const express = require('express');
const app = express();

const port = 4282;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

let todoItems = [
    {
        id: 1,
        task: "Buy groceries"
    },
    {
        id: 2,
        task: "Finish homework"
    },
    {
        id: 3,
        task: "Go for a run"
    }
];

app.get('/', (req, res) => {
    return res.render('todo', {
        todoItems
    });
});

app.post('/addTodo', (req, res) => {
    const newTask = req.body.task;
    const newItem = {
        id: todoItems.length + 1,
        task: newTask
    };
    todoItems.push(newItem);
    return res.redirect('/');
});

app.get('/deleteTodo', (req, res) => {
    const id = parseInt(req.query.id);
    todoItems = todoItems.filter(item => item.id !== id);
    return res.redirect('/');
});

app.get('/editTodo', (req, res) => {
    const id = parseInt(req.query.id);
    const index = todoItems.findIndex(item => item.id === id);
    if (index !== -1) {
        const item = todoItems[index];
        return res.render('edit', { item });
    }
    return res.redirect('/');
});

app.post('/editTodo', (req, res) => {
    const id = parseInt(req.body.id);
    const index = todoItems.findIndex(item => item.id === id);
    if (index !== -1) {
        todoItems[index].task = req.body.task;
    }
    return res.redirect('/');
});

app.listen(port, (err) => {
    if (err) {
        console.log("Server not started!!");
        return false;
    }
    console.log("Server started at http://localhost:" + port);
});