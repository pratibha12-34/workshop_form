import express from 'express';
import cors from 'cors';
import trouter from './routes/api/tasks.js';
import srouter from './routes/api/stats.js';
const app = express();

app.use(express.json());
app.use(cors());
// API Routes
app.use('/api/tasks', trouter);
app.use('/api/stats', srouter);
app.get('/', (req, res) => {
  res.json({ message: 'Jai Hind! Azadi Task Manager API is running 🇮🇳' });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});