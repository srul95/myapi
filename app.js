const express = require('express')
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

// Helper function to read
function readTasks() {
    const data = fs.readFileSync('tasks.json'); //read the json
    return JSON.parse(data) // turn json to an array
}
// Helper function to write
function writeTasks(tasks) {
    fs.readFileSync('tasks.json', JSON.stringify(tasks)); //read the json
    return JSON.parse(data) // turn json to an array
}

// Create a new task
app.post('/api/tasks', (req, res) => {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
  
    const tasks = readTasks();
    const newTask = {
      id: Date.now(), // Use the timestamp as the unique identifier
      title,
      description,
      timestamp: Date.now(),
    };
  
    tasks.push(newTask);
    writeTasks(tasks);
  
    res.json(newTask);
  });
  
  // Read all tasks
  app.get('/api/tasks', (req, res) => {
    const tasks = readTasks();
    res.json(tasks);
  });
  
  // Read a specific task by ID
  app.get('/api/tasks/:id', (req, res) => {
    const tasks = readTasks();
    const taskId = parseInt(req.params.id);
  
    const task = tasks.find((t) => t.id === taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
  
    res.json(task);
  });
  
  // Update a task
  app.put('/api/tasks/:id', (req, res) => {
    const tasks = readTasks();
    const taskId = parseInt(req.params.id);
  
    const taskIndex = tasks.findIndex((t) => t.id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
  
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
  
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      title,
      description,
    };
    writeTasks(tasks);
  
    res.json(tasks[taskIndex]);
  });
  
  // Delete a task
  app.delete('/api/tasks/:id', (req, res) => {
    const tasks = readTasks();
    const taskId = parseInt(req.params.id);
  
    const taskIndex = tasks.findIndex((t) => t.id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
  
    const deletedTask = tasks.splice(taskIndex, 1);
    writeTasks(tasks);
  
    res.json(deletedTask[0]);
  });


  
app.listen(PORT, () => {
    console.log(` my server now running on http://localhost:${PORT}`);
})