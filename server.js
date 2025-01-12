const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Score = require('./models/Score');

const app = express();
const port = 3000;

// Middleware to serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/snake-game', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Serve the homepage (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve the game page (game.html)
app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'game.html'));
});

// Route to save the score
app.post('/save-score', (req, res) => {
  const { username, score } = req.body;
  const newScore = new Score({ username, score });
  newScore.save()
    .then(() => res.status(200).send('Score saved'))
    .catch(err => res.status(500).send('Error saving score'));
});

// Fetch high scores from the database
app.get('/high-scores', (req, res) => {
  Score.find().sort({ score: -1 }).limit(10)
    .then(scores => res.json(scores))
    .catch(err => res.status(500).send('Error fetching scores'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
