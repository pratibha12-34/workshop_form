import express from 'express';
const trouter = express.Router();
// In-memory / JSON store for demo backend server
let tasks = [
  {
    id: '1',
    title: 'Morning Yoga & Meditation',
    titleHi: 'सुबह का योग और ध्यान',
    description: 'Start the day with focus and discipline',
    category: 'Health',
    priority: 'High',
    completed: true,
    createdAt: new Date().toISOString(),
    dueDate: new Date().toISOString().split('T')[0]
  },
  {
    id: '2',
    title: 'Study Freedom Fighter Biographies',
    titleHi: 'स्वतंत्रता सेनानियों की जीवनी का अध्ययन करें',
    description: 'Read about Bhagat Singh and Netaji Subhas Chandra Bose',
    category: 'Mission',
    priority: 'High',
    completed: true,
    createdAt: new Date().toISOString(),
    dueDate: new Date().toISOString().split('T')[0]
  },
  {
    id: '3',
    title: 'Complete Project Presentation',
    titleHi: 'प्रोजेक्ट प्रस्तुति पूरी करें',
    description: 'Prepare slides for daily team review',
    category: 'Work',
    priority: 'Medium',
    completed: false,
    createdAt: new Date().toISOString(),
    dueDate: new Date().toISOString().split('T')[0]
  },
  {
    id: '4',
    title: 'Help a Neighbor / Community Service',
    titleHi: 'पड़ोसी की मदद करें / समाज सेवा',
    description: 'Spread kindness and unity in the neighborhood',
    category: 'Personal',
    priority: 'Medium',
    completed: false,
    createdAt: new Date().toISOString(),
    dueDate: new Date().toISOString().split('T')[0]
  }
];
// GET all tasks
trouter.get('/', (req, res) => {
  res.json({ success: true, count: tasks.length, data: tasks });
});
// POST add new task
trouter.post('/', (req, res) => {
  const { title, titleHi, description, category, priority, dueDate } = req.body;
  if (!title) {
    return res.status(400).json({ success: false, message: 'Title is required' });
  }
  const newTask = {
    id: Date.now().toString(),
    title,
    titleHi: titleHi || title,
    description: description || '',
    category: category || 'Personal',
    priority: priority || 'Medium',
    completed: false,
    createdAt: new Date().toISOString(),
    dueDate: dueDate || new Date().toISOString().split('T')[0]
  };
  tasks.unshift(newTask);
  res.status(201).json({ success: true, data: newTask });
});
// PUT update task
trouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Task not found' });
  }
  tasks[index] = {
    ...tasks[index],
    ...req.body
  };
  res.json({ success: true, data: tasks[index] });
});
// DELETE task
trouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Task not found' });
  }
  const deletedTask = tasks.splice(index, 1);
  res.json({ success: true, data: deletedTask[0] });
});
// POST toggle complete all tasks for today
trouter.post('/reset-daily', (req, res) => {
  const todayStr = new Date().toISOString().split('T')[0];
  tasks = tasks.map(t => ({
    ...t,
    completed: false,
    dueDate: todayStr
  }));
  res.json({ success: true, message: 'Daily tasks reset', data: tasks });
});
export default trouter;