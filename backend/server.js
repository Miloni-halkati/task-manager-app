require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const connectDB = require('./src/db');
const authRoutes = require('./src/routes/auth');
const taskRoutes = require('./src/routes/tasks');

const app = express();

// CORS
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));

// Body parser
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => res.json({ ok: true, message: 'Task Manager API' }));
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));
}).catch((err) => {
  console.error('Failed to connect DB:', err.message);
  process.exit(1);
});
