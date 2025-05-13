import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';

const app = express(); // Declare and initialize app first

app.use(cors());
app.use(bodyParser.json());

app.use(userRoutes);
app.use(taskRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app; // Export app after it's initialized
