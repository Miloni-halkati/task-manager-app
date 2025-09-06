const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();

// protected: all routes require auth
router.use(auth);

// GET /api/tasks?completed=true|false
router.get('/', async (req, res) => {
  try {
    const filter = { user: req.user.id };
    if (typeof req.query.completed !== 'undefined') {
      filter.completed = req.query.completed === 'true';
    }
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    const task = await Task.create({ user: req.user.id, title, description: description || '' });
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: { ...(title !== undefined && { title }), ...(description !== undefined && { description }), ...(completed !== undefined && { completed }) } },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Task not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!deleted) return res.status(404).json({ error: 'Task not found' });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
