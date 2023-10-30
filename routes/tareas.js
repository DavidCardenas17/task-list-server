const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Lista de tareas (simulación de una base de datos)
let tasks = [
    { id: 1, description: 'Tarea 1', completed: false },
    { id: 2, description: 'Tarea 2', completed: true },
];

// Endpoint para obtener todas las tareas
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Endpoint para obtener una sola tarea por su ID
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);

    if (!task) {
    res.status(404).json({ error: 'Tarea no encontrada' });
    } else {
    res.json(task);
    }
});

// Endpoint para crear una nueva tarea
app.post('/tasks', (req, res) => {
    const newTask = req.body;
    newTask.id = tasks.length + 1;
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Endpoint para actualizar una tarea
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const updatedTask = req.body;

    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
    res.status(404).json({ error: 'Tarea no encontrada' });
    } else {
    tasks[taskIndex] = updatedTask;
    res.json(updatedTask);
    }
});

// Endpoint para eliminar una tarea
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
    res.status(404).json({ error: 'Tarea no encontrada' });
    } else {
    tasks.splice(taskIndex, 1);
    res.status(204).send();
    }
});

// Endpoint para listar tareas completas e incompletas
app.get('/tasks/completed', (req, res) => {
    const completedTasks = tasks.filter(task => task.completed);
    res.json(completedTasks);
});

app.get('/tasks/incomplete', (req, res) => {
    const incompleteTasks = tasks.filter(task => !task.completed);
    res.json(incompleteTasks);
});

app.listen(port, () => {
    console.log(`Servidor Express en funcionamiento en el puerto ${port}`);
});
