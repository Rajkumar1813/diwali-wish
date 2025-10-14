const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// CORS Configuration - Frontend ka URL allow karo
app.use(cors({
  origin: ['https://diwali-frontend.onrender.com/'],
  credentials: true
}));

app.use(express.json());

// MongoDB Connection
const MONGODB_URI ='mongodb+srv://ohiabhist:duFoybPfg3hbfJPY@ohiabhist.zjaxj.mongodb.net/diwali-wishes?retryWrites=true&w=majority&appName=ohiabhist';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Counter Schema
const counterSchema = new mongoose.Schema({
  type: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

// Wish Schema
const wishSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  message: { type: String },
  timestamp: { type: Date, default: Date.now }
});

const Wish = mongoose.model('Wish', wishSchema);

// Initialize counters
const initializeCounters = async () => {
  try {
    const created = await Counter.findOne({ type: 'created' });
    if (!created) {
      await Counter.create({ type: 'created', count: 0 });
    }
    const opened = await Counter.findOne({ type: 'opened' });
    if (!opened) {
      await Counter.create({ type: 'opened', count: 0 });
    }
  } catch (error) {
    console.error('Error initializing counters:', error);
  }
};

initializeCounters();

// Health check route
app.get('/', (req, res) => {
  res.json({ message: '🪔 Diwali Wishes API is running!' });
});

// API Routes
app.get('/api/counters', async (req, res) => {
  try {
    const counters = await Counter.find();
    const created = counters.find(c => c.type === 'created')?.count || 0;
    const opened = counters.find(c => c.type === 'opened')?.count || 0;
    res.json({ created, opened });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/counters/created', async (req, res) => {
  try {
    const counter = await Counter.findOneAndUpdate(
      { type: 'created' },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
    res.json({ count: counter.count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/counters/opened', async (req, res) => {
  try {
    const counter = await Counter.findOneAndUpdate(
      { type: 'opened' },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
    res.json({ count: counter.count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/wishes', async (req, res) => {
  try {
    const { from, to, message } = req.body;
    const wish = new Wish({ from, to, message });
    await wish.save();
    res.json(wish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/wishes', async (req, res) => {
  try {
    const wishes = await Wish.find().sort({ timestamp: -1 }).limit(10);
    res.json(wishes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});




